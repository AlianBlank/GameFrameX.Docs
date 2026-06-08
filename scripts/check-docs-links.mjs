import { access, readdir } from 'node:fs/promises';
import path from 'node:path';

const docsDir = path.resolve('docs');
const publicDir = path.join(docsDir, 'public');
const strict = process.argv.includes('--strict') || process.env.CHECK_DOCS_STRICT === '1';
const maxReportedIssues = Number(process.env.CHECK_DOCS_MAX_REPORT ?? 120);
const ignoredSchemes = /^(https?:|mailto:|tel:|data:|javascript:)/i;
const assetExtensions = new Set([
  '.apng',
  '.avif',
  '.bmp',
  '.css',
  '.drawio',
  '.gif',
  '.ico',
  '.jpeg',
  '.jpg',
  '.js',
  '.json',
  '.pdf',
  '.png',
  '.svg',
  '.webp',
  '.zip',
]);

async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function readText(filePath) {
  const { readFile } = await import('node:fs/promises');
  return readFile(filePath, 'utf8');
}

async function collectFiles(dir, predicate) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const filePath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await collectFiles(filePath, predicate));
    } else if (entry.isFile() && predicate(filePath)) {
      files.push(filePath);
    }
  }

  return files;
}

async function getLocaleDirs() {
  const entries = await readdir(docsDir, { withFileTypes: true });
  return entries
    .filter(entry => entry.isDirectory() && entry.name !== 'public')
    .map(entry => entry.name)
    .sort();
}

function normalizeTarget(rawTarget) {
  let target = rawTarget.trim();
  if (!target || target.startsWith('#') || ignoredSchemes.test(target)) return null;
  if (target.includes('{{') || target.includes('}}')) return null;
  if (target.startsWith('<') && target.endsWith('>')) target = target.slice(1, -1);

  const hashIndex = target.indexOf('#');
  if (hashIndex >= 0) target = target.slice(0, hashIndex);

  const queryIndex = target.indexOf('?');
  if (queryIndex >= 0) target = target.slice(0, queryIndex);

  target = target.trim();
  return target && !target.startsWith('#') ? target : null;
}

function extractLinks(content) {
  const links = [];
  const markdownLink = /(?<!!)\[[^\]]*]\(([^)\n]+)\)/g;
  const htmlHref = /\bhref=["']([^"']+)["']/g;

  for (const match of content.matchAll(markdownLink)) {
    const target = match[1].replace(/\s+["'][^"']*["']\s*$/, '');
    links.push({ target, index: match.index ?? 0 });
  }

  for (const match of content.matchAll(htmlHref)) {
    links.push({ target: match[1], index: match.index ?? 0 });
  }

  return links;
}

function lineNumberAt(content, index) {
  return content.slice(0, index).split('\n').length;
}

function candidatesFor(basePath, target, lang, locales) {
  const cleanTarget = decodeURIComponent(target);
  const candidates = [];
  const targetExt = path.extname(cleanTarget);

  function pushDocCandidates(baseCandidate) {
    if (targetExt) {
      candidates.push(baseCandidate);
      if (targetExt === '.html') {
        candidates.push(baseCandidate.slice(0, -'.html'.length) + '.md');
      }
      return;
    }

    candidates.push(`${baseCandidate}.md`);
    candidates.push(path.join(baseCandidate, 'index.md'));
  }

  if (cleanTarget.startsWith('/')) {
    const withoutSlash = cleanTarget.slice(1);
    const firstSegment = withoutSlash.split('/')[0];

    if (firstSegment === 'images' || firstSegment === 'favicon.ico' || firstSegment === 'logo.png') {
      candidates.push(path.join(publicDir, withoutSlash));
      return candidates;
    }

    if (locales.includes(firstSegment)) {
      pushDocCandidates(path.join(docsDir, withoutSlash));
    } else {
      pushDocCandidates(path.join(docsDir, lang, withoutSlash));
    }

    return candidates;
  }

  const resolved = path.resolve(path.dirname(basePath), cleanTarget);

  if (targetExt && assetExtensions.has(targetExt)) {
    candidates.push(resolved);
    return candidates;
  }

  pushDocCandidates(resolved);
  return candidates;
}

function possibleNormalizedNames(name) {
  const names = new Set();
  const lower = name.toLowerCase();
  names.add(lower);

  const numbered = lower.match(/^0*(\d+)[.-](.+)$/);
  if (numbered) {
    const normalizedNumbered = `${Number(numbered[1])}-${numbered[2]}`;
    names.add(normalizedNumbered);
    names.add(numbered[2]);

    const sectionLike = numbered[2].match(/^([^.]+)\..+$/);
    if (sectionLike) {
      names.add(`${Number(numbered[1])}-${sectionLike[1]}`);
      names.add(sectionLike[1]);
    }
  }

  return names;
}

async function matchesFuzzyMarkdownFile(baseCandidate) {
  const dir = path.dirname(baseCandidate);
  const targetName = path.basename(baseCandidate, path.extname(baseCandidate));
  const targetNames = possibleNormalizedNames(targetName);

  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return false;
  }

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.md')) continue;

    const fileName = path.basename(entry.name, '.md');
    const fileNames = possibleNormalizedNames(fileName);
    for (const name of targetNames) {
      if (fileNames.has(name)) return true;
    }
  }

  return false;
}

async function targetExists(basePath, target, lang, locales) {
  const candidates = candidatesFor(basePath, target, lang, locales);
  const exists = await Promise.all(candidates.map(candidate => fileExists(candidate)));
  if (exists.some(Boolean)) return true;

  const targetExt = path.extname(target);
  if (targetExt && targetExt !== '.md' && targetExt !== '.html') return false;

  for (const candidate of candidates) {
    if (await matchesFuzzyMarkdownFile(candidate)) return true;
  }

  return false;
}

const locales = await getLocaleDirs();
const markdownFiles = [];

for (const lang of locales) {
  markdownFiles.push(...await collectFiles(path.join(docsDir, lang), file => file.endsWith('.md')));
}

const issues = [];

for (const filePath of markdownFiles) {
  const content = await readText(filePath);
  const relative = path.relative(docsDir, filePath).split(path.sep).join('/');
  const lang = relative.split('/')[0];

  for (const link of extractLinks(content)) {
    const target = normalizeTarget(link.target);
    if (!target) continue;

    if (await targetExists(filePath, target, lang, locales)) continue;

    issues.push({
      file: relative,
      line: lineNumberAt(content, link.index),
      target,
    });
  }
}

if (!issues.length) {
  console.log('[links] No broken internal Markdown links found.');
  process.exit(0);
}

console.log(`[links] Found ${issues.length} possible broken internal link(s):`);
for (const issue of issues.slice(0, maxReportedIssues)) {
  console.log(`  - ${issue.file}:${issue.line} -> ${issue.target}`);
}

if (issues.length > maxReportedIssues) {
  console.log(`  ... ${issues.length - maxReportedIssues} more not shown. Set CHECK_DOCS_MAX_REPORT to change this limit.`);
}

if (strict) {
  console.error('\n[links] Failed in strict mode.');
  process.exit(1);
}

console.log('\n[links] Report-only mode. Use --strict to fail on these links.');
