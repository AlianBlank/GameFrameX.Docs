import { execSync } from 'child_process';
import { cpSync, mkdirSync, rmSync, existsSync, writeFileSync } from 'fs';
import { join } from 'path';

const LOCALES = ['en', 'ja', 'ko', 'zh-CN', 'zh-TW'];
const DIST_DIR = join(import.meta.dirname, '..', 'docs', '.vitepress', 'dist');
const NODE_OPTIONS = process.env.NODE_OPTIONS || '--max-old-space-size=4096';

// Clean previous build output
if (existsSync(DIST_DIR)) {
  rmSync(DIST_DIR, { recursive: true });
}
mkdirSync(DIST_DIR, { recursive: true });

// Build each locale separately
for (const locale of LOCALES) {
  const localeDist = join(import.meta.dirname, '..', 'docs', '.vitepress', `dist-${locale}`);

  console.log(`\n===== Building locale: ${locale} =====\n`);

  execSync(
    `BUILD_LOCALE=${locale} npx vitepress build docs`,
    {
      stdio: 'inherit',
      cwd: join(import.meta.dirname, '..'),
      env: { ...process.env, BUILD_LOCALE: locale, NODE_OPTIONS },
    }
  );

  // Merge assets from every locale (each build generates locale-specific page JS)
  const assetsDir = join(localeDist, 'assets');
  if (existsSync(assetsDir)) {
    cpSync(assetsDir, join(DIST_DIR, 'assets'), { recursive: true });
  }

  // Merge HTML files for this locale
  const localeHtmlDir = join(localeDist, locale);
  if (existsSync(localeHtmlDir)) {
    cpSync(localeHtmlDir, join(DIST_DIR, locale), { recursive: true });
  }

  // Copy root index.html if present (redirect page)
  const rootIndex = join(localeDist, 'index.html');
  if (locale === LOCALES[0] && existsSync(rootIndex)) {
    cpSync(rootIndex, join(DIST_DIR, 'index.html'));
  }

  // Clean up temporary locale dist
  if (existsSync(localeDist)) {
    rmSync(localeDist, { recursive: true });
  }
}

// Ensure root index.html exists with a redirect
if (!existsSync(join(DIST_DIR, 'index.html'))) {
  writeFileSync(
    join(DIST_DIR, 'index.html'),
    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0;url=/zh-CN/">
  <title>GameFrameX Docs</title>
</head>
<body>
  <p>Redirecting to <a href="/zh-CN/">GameFrameX Docs</a></p>
</body>
</html>`
  );
}

console.log('\n===== Split build complete =====\n');
console.log(`Output: ${DIST_DIR}`);
