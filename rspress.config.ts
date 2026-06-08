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
