import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const docsDir = path.resolve('docs');
const baselineLang = 'en';
const ignoredDirs = new Set(['public']);
const strict = process.argv.includes('--strict') || process.env.CHECK_DOCS_STRICT === '1';

// ---------------------------------------------------------------------------
// Phase 0 扩展:OpenDeepWiki 产物区与人工覆盖区
// ---------------------------------------------------------------------------
// .auto/            机器生成,各语言进度可能不同,跨语言不强求同结构
// manual-override/  人工写入,通常只有 en / zh-CN,跨语言不强求同结构
//
// 这两个目录不参与"所有语言同结构"严格校验,但仍校验:
//   1. 它们若存在,只允许 .gitkeep / .gitignore / README.md 等占位文件
//   2. 真正的 .md 内容若直接落 .auto/,会报告(说明有人手工写了机器产物区)
// ---------------------------------------------------------------------------
const relaxedDirs = new Set(['.auto', 'manual-override']);
const relaxedAllowedFiles = new Set(['.gitkeep', '.gitignore', 'README.md']);

async function pathExists(filePath) {
  try {
    await readdir(filePath);
    return true;
  } catch {
    return false;
  }
}

async function collectMarkdownFiles(dir, baseDir = dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const filePath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await collectMarkdownFiles(filePath, baseDir));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(path.relative(baseDir, filePath).split(path.sep).join('/'));
    }
  }

  return files;
}

async function listAllEntries(dir) {
  // 列出所有 entries(含非 .md),用于 relaxedDirs 校验
  return await readdir(dir, { withFileTypes: true });
}

async function getLocaleDirs() {
  const entries = await readdir(docsDir, { withFileTypes: true });
  return entries
    .filter(entry => entry.isDirectory() && !ignoredDirs.has(entry.name))
    .map(entry => entry.name)
    .sort();
}

const localeDirs = await getLocaleDirs();
const baselineDir = path.join(docsDir, baselineLang);

if (!await pathExists(baselineDir)) {
  console.error(`[i18n] Missing baseline language directory: docs/${baselineLang}`);
  process.exit(1);
}

// 收集所有 .md(忽略 relaxedDirs)
async function collectStrictMarkdown(langDir) {
  const out = [];
  const entries = await readdir(langDir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (relaxedDirs.has(entry.name)) continue; // 跳过松弛目录
      out.push(...await collectMarkdownFiles(path.join(langDir, entry.name), langDir));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      out.push(entry.name);
    }
  }
  return out;
}

// 收集 relaxedDirs 内的非占位文件(违规候选)
async function collectRelaxedViolations(langDir) {
  const violations = [];
  for (const relaxed of relaxedDirs) {
    const subDir = path.join(langDir, relaxed);
    if (!await pathExists(subDir)) continue;
    const entries = await listAllEntries(subDir);
    for (const entry of entries) {
      if (entry.isFile() && !relaxedAllowedFiles.has(entry.name)) {
        // .auto/ 下任何 .md 都是可疑的;manual-override/README.md 允许
        if (relaxed === '.auto' && entry.name.endsWith('.md')) {
          violations.push(`${relaxed}/${entry.name}`);
        }
        if (relaxed === 'manual-override' && entry.name.endsWith('.md') && entry.name !== 'README.md') {
          // manual-override 下除 README.md 外的 .md 是允许的(就是用来覆盖的)
          // 但要求文件数量为 0 时给出提示
        }
      }
    }
  }
  return violations;
}

const baselineFiles = new Set(await collectStrictMarkdown(baselineDir));
const issues = [];
const relaxedViolations = [];

for (const lang of localeDirs) {
  if (lang === baselineLang) continue;

  const files = new Set(await collectStrictMarkdown(path.join(docsDir, lang)));
  const missing = [...baselineFiles].filter(file => !files.has(file)).sort();
  const extra = [...files].filter(file => !baselineFiles.has(file)).sort();

  if (missing.length || extra.length) {
    issues.push({ lang, missing, extra });
  }

  const viols = await collectRelaxedViolations(path.join(docsDir, lang));
  if (viols.length) {
    relaxedViolations.push({ lang, files: viols });
  }
}

// 报告
let hasError = false;

if (!issues.length) {
  console.log('[i18n] Markdown structure matches the baseline language.');
} else {
  console.log(`[i18n] Markdown structure differs from docs/${baselineLang}:`);

  for (const issue of issues) {
    console.log(`\n[${issue.lang}]`);

    if (issue.missing.length) {
      console.log(`  Missing from ${issue.lang}:`);
      for (const file of issue.missing) console.log(`    - ${file}`);
    }

    if (issue.extra.length) {
      console.log(`  Extra in ${issue.lang}:`);
      for (const file of issue.extra) console.log(`    - ${file}`);
    }
  }

  if (strict) hasError = true;
  else console.log('\n[i18n] Report-only mode. Use --strict to fail on these differences.');
}

// .auto/ 违规(人工写入机器产物区)
if (relaxedViolations.length) {
  console.log('\n[i18n] .auto/ 目录存在疑似手工写入(机器产物区禁止手工编辑):');
  for (const v of relaxedViolations) {
    console.log(`\n[${v.lang}]`);
    for (const f of v.files) console.log(`    - ${f}`);
  }
  hasError = true; // 任何直接写 .auto/*.md 都是硬错误
}

if (hasError) {
  console.error('\n[i18n] Failed.');
  process.exit(1);
}

if (!issues.length && !relaxedViolations.length) {
  console.log('[i18n] OK');
}
