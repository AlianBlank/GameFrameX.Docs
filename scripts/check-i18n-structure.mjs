import { readdir } from 'node:fs/promises';
import path from 'node:path';

const docsDir = path.resolve('docs');
const baselineLang = 'en';
const ignoredDirs = new Set(['public']);
const strict = process.argv.includes('--strict') || process.env.CHECK_DOCS_STRICT === '1';

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

const baselineFiles = new Set(await collectMarkdownFiles(baselineDir));
const issues = [];

for (const lang of localeDirs) {
  if (lang === baselineLang) continue;

  const files = new Set(await collectMarkdownFiles(path.join(docsDir, lang)));
  const missing = [...baselineFiles].filter(file => !files.has(file)).sort();
  const extra = [...files].filter(file => !baselineFiles.has(file)).sort();

  if (missing.length || extra.length) {
    issues.push({ lang, missing, extra });
  }
}

if (!issues.length) {
  console.log('[i18n] Markdown structure matches the baseline language.');
  process.exit(0);
}

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

if (strict) {
  console.error('\n[i18n] Failed in strict mode.');
  process.exit(1);
}

console.log('\n[i18n] Report-only mode. Use --strict to fail on these differences.');
