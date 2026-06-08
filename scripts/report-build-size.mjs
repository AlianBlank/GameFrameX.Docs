import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const distDir = path.resolve('dist');
const staticDir = path.join(distDir, 'static');
const jsDir = path.join(staticDir, 'js');

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  const units = ['KB', 'MB', 'GB'];
  let value = bytes / 1024;
  for (const unit of units) {
    if (value < 1024) return `${value.toFixed(1)} ${unit}`;
    value /= 1024;
  }
  return `${value.toFixed(1)} TB`;
}

async function getSize(filePath) {
  const info = await stat(filePath);
  return info.size;
}

async function getDirSize(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const sizes = await Promise.all(entries.map(async entry => {
    const filePath = path.join(dir, entry.name);
    if (entry.isDirectory()) return getDirSize(filePath);
    if (entry.isFile()) return getSize(filePath);
    return 0;
  }));
  return sizes.reduce((sum, size) => sum + size, 0);
}

const jsFiles = await readdir(jsDir);
const entryFiles = jsFiles.filter(file => /^index\..+\.js$/.test(file));
const searchFiles = (await readdir(staticDir)).filter(file => /^search_index\..+\.json$/.test(file));

const rows = [];

rows.push(['dist total', formatBytes(await getDirSize(distDir))]);

for (const file of entryFiles.sort()) {
  rows.push([`js/${file}`, formatBytes(await getSize(path.join(jsDir, file)))]);
}

for (const file of searchFiles.sort()) {
  rows.push([file, formatBytes(await getSize(path.join(staticDir, file)))]);
}

const labelWidth = Math.max(...rows.map(([label]) => label.length));

for (const [label, size] of rows) {
  console.log(`${label.padEnd(labelWidth)}  ${size}`);
}
