#!/usr/bin/env node
/**
 * wiki-pipeline.mjs — GameFrameX 文档生成管线驱动(脚本先行版,C3/P3)
 *
 * 流程:login → 读 registry(active 条目)→ 缺失则提交(git / local)
 *      → 轮询生成状态 → export-rspress → 按 docsPath 落位 → 注入机器区 frontmatter
 *
 * 用法:
 *   node scripts/wiki-pipeline.mjs [--group gfx-packages] [--lang zh]
 *        [--only com.gameframex.unity.config] [--wait-mins 120] [--skip-submit] [--dry-run]
 *
 * 环境变量:
 *   WIKI_API       OpenDeepWiki API 地址(默认 http://localhost:18081)
 *   WIKI_EMAIL     登录邮箱(默认 admin@admin.com)
 *   WIKI_PASS      登录密码(默认 admin)
 *   ODW_EXPORT_DIR 宿主侧导出暂存目录(默认 <Docs仓>/../OpenDeepWiki/gfx-doc-output)
 *
 * 注意:RspressPathMapper 的 repoSlug 取包名最后一段,Unity/Godot 同名包 slug 相同
 *      (如 config)。因此逐仓「导出→立即搬走→清暂存」,绝不让两个同名包同时留在暂存区。
 */
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, rmSync, cpSync } from 'node:fs';
import { join, dirname, resolve, basename } from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const DOCS_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const REGISTRY = join(DOCS_ROOT, 'gfx-config', 'repo-registry.json');
const DOCS_DIR = join(DOCS_ROOT, 'docs');

// ---- 参数 ----
const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const opt = (name, def) => {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? args[i + 1] : def;
};
const GROUP = opt('--group', 'gfx-packages');
// --only:只跑指定 pkg(可逗号分隔多个),用于单包验证/逐包激活,不连带重跑其余 active 条目
const ONLY = opt('--only', '');
const LANG = opt('--lang', 'zh');
const WAIT_MINS = Number(opt('--wait-mins', '120'));
const API = process.env.WIKI_API || 'http://localhost:18081';
const EMAIL = process.env.WIKI_EMAIL || 'admin@routin.ai';
const PASS = process.env.WIKI_PASS || 'Admin@123';
const EXPORT_DIR = resolve(DOCS_ROOT, process.env.ODW_EXPORT_DIR || '../../OpenDeepWiki/gfx-doc-output');
const ORG = 'GameFrameX';

// OpenDeepWiki 语言码 → Rspress 语言目录(RspressPathMapper.LangMap 同款)
const LANG_DIR = { zh: 'zh-CN', 'zh-CN': 'zh-CN', 'zh-TW': 'zh-TW', en: 'en', ja: 'ja', ko: 'ko' };
const langDir = LANG_DIR[LANG] || LANG;

const log = (msg) => console.log(`[${new Date().toISOString().slice(11, 19)}] ${msg}`);

// ---- API ----
async function api(path, { method = 'GET', token, body } = {}) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { json = { raw: text }; }
  if (!res.ok) throw new Error(`${method} ${path} → HTTP ${res.status}: ${text.slice(0, 300)}`);
  return json;
}

async function login() {
  const r = await api('/api/auth/login', { method: 'POST', body: { email: EMAIL, password: PASS } });
  const token = r?.data?.accessToken;
  if (!token) throw new Error(`登录失败: ${JSON.stringify(r).slice(0, 200)}`);
  return token;
}

// ---- registry ----
function loadEntries() {
  const doc = JSON.parse(readFileSync(REGISTRY, 'utf8'));
  const group = doc.groups?.[GROUP];
  if (!group) throw new Error(`registry 无分组 '${GROUP}',可用: ${Object.keys(doc.groups || {})}`);
  const active = (group.repositories || []).filter((r) => r.active);
  if (ONLY) {
    const want = new Set(ONLY.split(',').map((s) => s.trim()));
    return active.filter((r) => want.has(r.pkg));
  }
  if (active.length === 0) throw new Error(`分组 '${GROUP}' 无 active 条目`);
  return active;
}

// 本地路径:registry 相对路径(相对 Docs 仓)→ 宿主绝对 → 容器内(/host-home/…)
function hostToContainer(p) {
  const abs = resolve(DOCS_ROOT, p);
  const home = process.env.HOME;
  if (home && abs.startsWith(home)) return abs.replace(home, '/host-home');
  throw new Error(`localPath '${p}' 解析为 '${abs}',不在 ${home} 下,容器无法映射(检查 AllowedLocalPathRoots)`);
}

// ---- 生成状态 ----
// tree 响应的 status 是数字枚举(Pending=0/Processing=1/Completed=2/Failed=3),归一化为字符串
const STATUS_NAMES = ['Pending', 'Processing', 'Completed', 'Failed'];
function normStatus(s) {
  if (typeof s === 'number') return STATUS_NAMES[s] ?? String(s);
  return s;
}

async function tree(token, repoName) {
  const t = await api(`/api/v1/repos/${ORG}/${repoName}/tree?branch=main&lang=${LANG}`, { token });
  t.status = normStatus(t.status);
  return t;
}

async function waitCompleted(token, repoName, { allowRetry = true } = {}) {
  const deadline = Date.now() + WAIT_MINS * 60_000;
  while (Date.now() < deadline) {
    const t = await tree(token, repoName);
    if (!t.exists) throw new Error(`${repoName}: 仓库不存在(提交失败?)`);
    if (t.status === 'Completed') return t;
    if (t.status === 'Failed') {
      if (!allowRetry) throw new Error(`${repoName}: 生成失败(查 processing-logs)`);
      log(`  ${repoName}: Failed → 触发 regenerate 重试一次`);
      await api('/api/v1/repositories/regenerate', {
        method: 'POST', token, body: { owner: ORG, repo: repoName },
      });
      return waitCompleted(token, repoName, { allowRetry: false });
    }
    log(`  ${repoName}: ${t.status} …`);
    await new Promise((r) => setTimeout(r, 30_000));
  }
  throw new Error(`${repoName}: 等待超时(${WAIT_MINS} 分钟)`);
}

// repositoryId:admin 列表按 OrgName/RepoName 匹配
async function findRepoId(token, repoName) {
  // 端点签名:GET /api/admin/repositories/?page=&pageSize=&search=(page/pageSize 必填,缺省 400)
  const r = await api(`/api/admin/repositories/?page=1&pageSize=50&search=${encodeURIComponent(repoName)}`, { token });
  // ponytail: data.items/data 两层包装猜测;列表大时(>50 仓)需加分页翻页
  const list = r?.data?.items || r?.data || r?.items || [];
  const hit = (Array.isArray(list) ? list : []).find(
    (x) => x.repoName === repoName && x.orgName === ORG,
  );
  if (!hit) throw new Error(`admin 列表未找到 ${ORG}/${repoName}: ${JSON.stringify(r).slice(0, 300)}`);
  return hit.id;
}

// ---- 导出 + 落位 ----
function countStubs(dir) {
  // 翻译部分失败时 DocFile 无内容,exporter 写占位;Completed ≠ 全部翻好,落位后必须复检
  let n = 0;
  const walk = (d) => {
    for (const name of readdirSync(d)) {
      const p = join(d, name);
      if (statSync(p).isDirectory()) { walk(p); continue; }
      if (name.endsWith('.md') && readFileSync(p, 'utf8').includes('尚未生成')) n++;
    }
  };
  walk(dir);
  return n;
}

function injectFrontmatter(dir, pkg) {
  const now = new Date().toISOString().slice(0, 19) + 'Z';
  let count = 0;
  const walk = (d) => {
    for (const name of readdirSync(d)) {
      const p = join(d, name);
      if (statSync(p).isDirectory()) { walk(p); continue; }
      if (!name.endsWith('.md')) continue;
      let content = readFileSync(p, 'utf8');
      if (content.startsWith('---')) continue; // 已有 frontmatter,不重复注入
      const h1 = content.match(/^#\s+(.+)$/m)?.[1] || name.replace(/\.md$/, '');
      const fm = `---\ntitle: ${h1.replace(/["\\]/g, '')}\nsource:\n  repo: ${pkg}\n  generator: OpenDeepWiki\n  generatedAt: ${now}\n---\n\n`;
      writeFileSync(p, fm + content);
      count++;
    }
  };
  walk(dir);
  return count;
}

async function exportAndPlace(token, entry) {
  const repoName = entry.pkg;
  const repoId = await findRepoId(token, repoName);
  log(`  导出 ${repoName} (id=${repoId.slice(0, 8)}…)`);
  // exporter 的 language 匹配大小写敏感(DB 行是小写,如 zh-tw);落位目录才用规范形态(zh-TW)
  await api(`/api/admin/repositories/${repoId}/export-rspress?outputRoot=/gfx-docs&language=${LANG.toLowerCase()}`, {
    method: 'POST',
    token,
  });

  // exporter 的 repoSlug(RspressPathMapper.NormalizeRepoSlug):去 com.gameframex. 前缀 →
  // 取最后点段 → 小写连字符。与 registry alias 规则(全段连字符)不同——unity.config → config,
  // ui.fairygui → fairygui。同名包(unity/godot 的 config)slug 相同,故逐仓导出后立即搬走清暂存
  const exportSlug = entry.pkg.replace(/^com\.gameframex\./i, '').split(/[./]/).pop().toLowerCase();
  const src = join(EXPORT_DIR, langDir, exportSlug);
  const dst = join(DOCS_DIR, langDir, entry.docsPath);
  if (!existsSync(src)) throw new Error(`导出产物不存在: ${src}(检查导出结果与 EXPORT_DIR)`);
  if (existsSync(dst)) rmSync(dst, { recursive: true }); // 机器区整体替换
  cpSync(src, dst, { recursive: true });
  rmSync(src, { recursive: true }); // 立即清暂存,防同名包(unity/godot 同 slug)覆盖
  const injected = injectFrontmatter(dst, repoName);
  const stubs = countStubs(dst);
  if (stubs > 0) {
    // 空壳占位混入产物:翻译/生成部分失败。落位已发生但必须显式报警,不能静默带病发布
    throw new Error(`${repoName}: 落位后发现 ${stubs} 个空壳文档(「尚未生成」占位),需清理 DB 残行后重翻`);
  }
  log(`  落位 ${langDir}/${entry.docsPath}/,frontmatter 注入 ${injected} 个文件,空壳 0`);
}

// ---- main ----
const entries = loadEntries();
log(`registry '${GROUP}' active ${entries.length} 条: ${entries.map((e) => e.pkg).join(', ')}`);
log(`API=${API} lang=${LANG} 导出暂存=${EXPORT_DIR}`);
if (flag('--dry-run')) { log('dry-run 结束'); process.exit(0); }

const token = await login();
log('登录成功');

for (const entry of entries) {
  log(`▸ ${entry.pkg}(docsPath=${entry.docsPath})`);
  const t = await tree(token, entry.pkg);
  if (!t.exists) {
    if (flag('--skip-submit')) { log('  仓库不存在且 --skip-submit,跳过'); continue; }
    if (entry.gitUrl) {
      await api('/api/v1/repositories/submit', {
        method: 'POST', token,
        body: { gitUrl: entry.gitUrl, orgName: ORG, repoName: entry.pkg, branchName: entry.branch || 'main', languageCode: LANG },
      });
      log('  已提交(git)');
    } else if (entry.localPath) {
      const containerPath = hostToContainer(entry.localPath);
      await api('/api/v1/repositories/submit-local', {
        method: 'POST', token,
        body: { orgName: ORG, repoName: entry.pkg, localPath: containerPath, branchName: entry.branch || 'main', languageCode: LANG },
      });
      log(`  已提交(local:${containerPath})`);
    } else {
      throw new Error(`${entry.pkg}: 无 gitUrl/localPath,无法提交`);
    }
  } else {
    log(`  已存在(status=${t.status})`);
  }

  await waitCompleted(token, entry.pkg);
  await exportAndPlace(token, entry);
}

log(`全部完成:${entries.length} 个仓库已生成并落位到 docs/${langDir}/`);
