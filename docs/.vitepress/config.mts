import {defineConfig} from 'vitepress'
import * as fs from "fs";
import * as path from "path";

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "GameFrameX文档",
    description: "GameFrameX.Docs",
    titleTemplate: ':title',
    base: '/docs/',
    lang: 'zh-CN',
    cleanUrls: true,
    lastUpdated: true,
    srcExclude: [
        '**/README.md',
        '**/TODO.md'
    ],
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        sidebar: getSideBars(),
        nav: [
            {text: 'Unity客户端', link: '/docs/unity/'},
            {text: '服务器', link: '/docs/server/'},
            {text: '工具', link: '/docs/tools/'},
            {text: '协议', link: '/docs/protobuf/'},
            {text: 'Docker', link: '/docs/docker/'},
            {text: '配置文件', link: '/docs/config/'},
        ],
        socialLinks: [
            {icon: 'github', link: 'https://github.com/alianblank'}
        ],
        editLink: {
            text: '编辑纠错',
            pattern: ({filePath}) => {
                return `https://github.com/AlianBlank/GameFrameX.Docs/edit/main/docs/${filePath}`
            }
        },
        footer: {
            message: '<a href="https://github.com/AlianBlank/GameFrameX/blob/main/LICENSE.md">Apache License</a>.',
            copyright: `Copyright © 2019-${new Date().getFullYear()} <a href="https://github.com/AlianBlank">Blank</a>`
        },
        docFooter: {
            prev: '上一页',
            next: '下一页'
        },
        outline: {
            label: '页面导航'
        },
        lastUpdated: {
            text: '最后更新于',
            formatOptions: {
                forceLocale: true,
            }
        },
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式',
        returnToTopLabel: '回到顶部',
        search: {
            provider: 'local'
        }
    },
    head: [
        [
            'script', {}, '<script>var _hmt = _hmt || [];(function() {var hm = document.createElement("script");hm.src = "https://hm.baidu.com/hm.js?03c5721e4ea2defb6320b799780d7d30";var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(hm, s);})();</script>'
        ]
    ],
    markdown: {
        image: {
            // 默认禁用图片懒加载
            lazyLoading: true
        },
        // 行号
        lineNumbers: true,
        container: {
            tipLabel: '提示',
            warningLabel: '警告',
            dangerLabel: '危险',
            infoLabel: '信息',
            detailsLabel: '详细信息'
        }
    }
})

function getSideBars(): any[] {
    let sidebars = []
    const docsPath = path.dirname(__dirname); // docs 目录路径

    (function getSlideBar(docsPath, link = "") {
        let sidebar = [];
        const files = fs.readdirSync(docsPath);
        files.forEach((fileName, index) => {
            if (fileName.startsWith('.') || !fileName) {
                return;
            }
            const filePath = path.join(docsPath, fileName);
            const stat = fs.statSync(filePath);
            const extname = path.extname(filePath);
            const basename = path.basename(filePath, extname);
            if (stat.isDirectory()) {
                getSlideBar(filePath, `/${fileName}`);
            } else {
                if (extname === '.md' && fileName !== "index.md") {
                    let content = fs.readFileSync(filePath, {encoding: 'utf-8', flag: 'r'});
                    let title = content.split('\n')[0].replace('#', '').trim()
                    sidebar.push({
                        text: title,
                        link: `${link}/${basename}`,
                    })
                }
            }
        })

        sidebars.push({
            text: link.replace("/", ""),
            items: sidebar,
        })
    })(docsPath)
    return sidebars;
}

