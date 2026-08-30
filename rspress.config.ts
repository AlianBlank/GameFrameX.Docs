import { defineConfig } from '@rspress/core';
import { pluginContainerSyntax } from '@rspress/plugin-container-syntax';
import { pluginLastUpdated } from '@rspress/plugin-last-updated';
import { pluginClientRedirects } from '@rspress/plugin-client-redirects';
import mermaid from 'rspress-plugin-mermaid';
import path from 'path';

export default defineConfig({
  root: 'docs',
  themeDir: path.join(__dirname, 'theme'),
  title: 'Game Frame X',
  description: 'Game Frame X Documentation',
  icon: '/favicon.ico',
  logo: '/logo.png',
  logoText: 'Game Frame X',
  lang: 'en',
  outDir: 'dist',
  ssg: false,
  // glob 默认不匹配点开头目录；.auto/ 是自动生成文档的落位前缀（gfx-config 规范，位于各语言目录内），需显式包含
  route: {
    include: ['**/.auto/**/*.md', '**/.auto/**/*.mdx'],
  },
  search: {
    codeBlocks: false,
  },
  mediumZoom: { selector: '.rspress-doc img' },
  markdown: {
    link: {
      checkDeadLinks: false,
    },
  },

  locales: [
    {
      lang: 'en',
      label: 'English',
      title: 'Game Frame X',
      description: 'Game Frame X Documentation',
    },
    {
      lang: 'zh-CN',
      label: '简体中文',
      title: 'Game Frame X',
      description: 'Game Frame X 文档',
      outlineTitle: '页面导航',
      lastUpdatedText: '最后更新于',
      editLinkText: '编辑此页面',
      prevPageText: '上一页',
      nextPageText: '下一页',
      notFoundText: '页面未找到',
      takeMeHomeText: '返回首页',
    },
    {
      lang: 'zh-TW',
      label: '繁體中文',
      title: 'Game Frame X',
      description: 'Game Frame X 文件',
      outlineTitle: '頁面導航',
      lastUpdatedText: '最後更新於',
      editLinkText: '編輯此頁',
      prevPageText: '上一頁',
      nextPageText: '下一頁',
      notFoundText: '頁面未找到',
      takeMeHomeText: '返回首頁',
    },
    {
      lang: 'ja',
      label: '日本語',
      title: 'Game Frame X',
      description: 'Game Frame X ドキュメント',
      outlineTitle: 'ページナビゲーション',
      lastUpdatedText: '最終更新',
      editLinkText: 'このページを編集',
      prevPageText: '前のページ',
      nextPageText: '次のページ',
      notFoundText: 'ページが見つかりません',
      takeMeHomeText: 'ホームに戻る',
    },
    {
      lang: 'ko',
      label: '한국어',
      title: 'Game Frame X',
      description: 'Game Frame X 문서',
      outlineTitle: '페이지 탐색',
      lastUpdatedText: '마지막 업데이트',
      editLinkText: '이 페이지 편집',
      prevPageText: '이전 페이지',
      nextPageText: '다음 페이지',
      notFoundText: '페이지를 찾을 수 없습니다',
      takeMeHomeText: '홈으로 돌아가기',
    },
  ],

  plugins: [
    pluginContainerSyntax(),
    pluginLastUpdated(),
    pluginClientRedirects({
      redirects: [],
    }),
    mermaid(),
  ],

  themeConfig: {
    footer: {
      message: `<a href="https://github.com/GameFrameX/GameFrameX/blob/main/LICENSE.md">Apache License</a>. Copyright © 2019-${new Date().getFullYear()} <a href="https://github.com/AlianBlank">Blank</a>`,
    },
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/GameFrameX/gameframex',
      },
      {
        icon: 'discord',
        mode: 'link',
        content: 'https://discord.gg/VDWUjWMDw9',
      },
      {
        icon: 'bilibili',
        mode: 'link',
        content: 'https://www.bilibili.com/video/BV1yrpeepEn7',
      },
      {
        icon: 'qq',
        mode: 'link',
        content: 'https://qm.qq.com/cgi-bin/qm/qr?k=sYFd1nv6m2KZIWFLorZ5pBR0AE5ZhbuL&jump_from=webapi&authKey=oCu+uoL3n35fT5SEt7iLgGtROPxh31n/rHUxRlp0w1f+j38W4tKBuWyRH3KEdwHN',
      },
      {
        icon: {
          svg: '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M512 1024A512 512 0 1 1 512 0a512 512 0 0 1 0 1024z m259.2-568.896H480.32a25.28 25.28 0 0 0-25.28 25.28v63.232c0 13.952 11.328 25.28 25.28 25.28h177.024c13.952 0 25.28 11.328 25.28 25.28v12.672c0 41.856-33.92 75.84-75.84 75.84H366.592a25.28 25.28 0 0 1-25.28-25.28V417.216c0-41.92 33.92-75.84 75.84-75.84h353.92a25.28 25.28 0 0 0 25.28-25.344l0.064-63.168a25.28 25.28 0 0 0-25.216-25.28H417.152a189.632 189.632 0 0 0-189.632 189.632v353.92c0 14.016 11.328 25.28 25.28 25.28h372.992a170.624 170.624 0 0 0 170.624-170.624V480.384a25.28 25.28 0 0 0-25.28-25.28z" fill="#C71D23"/></svg>',
        },
        mode: 'link',
        content: 'https://gitee.com/GameFrameX/gameframex',
      },
      {
        icon: 'linkedin',
        mode: 'link',
        content: 'https://www.linkedin.com/in/alianblank',
      },
      {
        icon: {
          svg: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M12 0C5.373 0 0 5.373 0 12c0 3.314 1.343 6.314 3.515 8.485l-2.286 2.286C.775 23.225 1.097 24 1.738 24H12c6.627 0 12-5.373 12-12S18.627 0 12 0Zm4.388 3.199c1.104 0 1.999.895 1.999 1.999 0 1.105-.895 2-1.999 2-.946 0-1.739-.657-1.947-1.539v.002c-1.147.162-2.032 1.15-2.032 2.341v.007c1.776.067 3.4.567 4.686 1.363.473-.363 1.064-.58 1.707-.58 1.547 0 2.802 1.254 2.802 2.802 0 1.117-.655 2.081-1.601 2.531-.088 3.256-3.637 5.876-7.997 5.876-4.361 0-7.905-2.617-7.998-5.87-.954-.447-1.614-1.415-1.614-2.538 0-1.548 1.255-2.802 2.803-2.802.645 0 1.239.218 1.712.585 1.275-.79 2.881-1.291 4.64-1.365v-.01c0-1.663 1.263-3.034 2.88-3.207.188-.911.993-1.595 1.959-1.595Zm-8.085 8.376c-.784 0-1.459.78-1.506 1.797-.047 1.016.64 1.429 1.426 1.429.786 0 1.371-.369 1.418-1.385.047-1.017-.553-1.841-1.338-1.841Zm7.406 0c-.786 0-1.385.824-1.338 1.841.047 1.017.634 1.385 1.418 1.385.785 0 1.473-.413 1.426-1.429-.046-1.017-.721-1.797-1.506-1.797Zm-3.703 4.013c-.974 0-1.907.048-2.77.135-.147.015-.241.168-.183.305.483 1.154 1.622 1.964 2.953 1.964 1.33 0 2.47-.81 2.953-1.964.057-.137-.037-.29-.184-.305-.863-.087-1.795-.135-2.769-.135Z"/></svg>',
        },
        mode: 'link',
        content: 'https://www.reddit.com/r/GameFrameX/',
      },
      {
        icon: {
          svg: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z"/></svg>',
        },
        mode: 'link',
        content: 'https://x.com/alian_blank',
      },
      {
        icon: 'youtube',
        mode: 'link',
        content: 'https://www.youtube.com/channel/UCD9QhSFJ5xZkn5NTSV-DVAw',
      },
      {
        icon: {
          svg: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M5.202 2.857C7.954 4.922 10.913 9.11 12 11.358c1.087-2.247 4.046-6.436 6.798-8.501C20.783 1.366 24 .213 24 3.883c0 .732-.42 6.156-.667 7.037-.856 3.061-3.978 3.842-6.755 3.37 4.854.826 6.089 3.562 3.422 6.299-5.065 5.196-7.28-1.304-7.847-2.97-.104-.305-.152-.448-.153-.327 0-.121-.05.022-.153.327-.568 1.666-2.782 8.166-7.847 2.97-2.667-2.737-1.432-5.473 3.422-6.3-2.777.473-5.899-.308-6.755-3.369C.42 10.04 0 4.615 0 3.883c0-3.67 3.217-2.517 5.202-1.026"/></svg>',
        },
        mode: 'link',
        content: 'https://bsky.app/profile/alianblank.bsky.social',
      },
    ],
    editLink: {
      docRepoBaseUrl:
        'https://github.com/AlianBlank/GameFrameX.Docs/edit/main/docs',
    },
    darkMode: true,
    enableContentAnimation: true,
  },

  head: [
    // Auto-redirect to browser language on first visit
    `<script>(function(){var k='rspress-locale';if(localStorage.getItem(k)!==null)return;var bl=navigator.language||'',tl='en';if(bl.startsWith('zh')){tl=bl.includes('TW')||bl.includes('Hant')||bl.includes('HK')||bl.includes('MO')?'zh-TW':'zh-CN'}else if(bl.startsWith('ja'))tl='ja';else if(bl.startsWith('ko'))tl='ko';localStorage.setItem(k,tl);var p=location.pathname;if(['/en/','/zh-CN/','/zh-TW/','/ja/','/ko/'].some(function(l){return p.startsWith(l)}))return;if(tl!=='en')location.replace('/'+tl+'/')})()</script>`,
    // Third-party analytics are skipped for local preview.
    `<script>(function(){var h=location.hostname;if(h==='localhost'||h==='127.0.0.1'||h==='0.0.0.0')return;window._hmt=window._hmt||[];var b=document.createElement('script');b.async=true;b.src='https://hm.baidu.com/hm.js?bb98fe196aa7f73b90177c872e5644ab';document.head.appendChild(b);var u=document.createElement('script');u.async=true;u.src='https://cloud.umami.is/script.js';u.setAttribute('data-website-id','92a468c9-7c0e-4e55-bea3-0e3c3bb0330e');document.head.appendChild(u)})()</script>`,
  ],

  globalStyles: path.join(__dirname, 'styles/global.css'),
});
