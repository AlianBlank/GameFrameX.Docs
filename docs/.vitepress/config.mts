import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Game Frame X Doc",
    description: "Game Frame X 文档",
    titleTemplate: ':title',
    lang: 'zh-CN',
    cleanUrls: true,
    lastUpdated: true,
    srcExclude: [
        '**/README.md',
        '**/TODO.md'
    ],
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {text: 'Home', link: '/'},
            {text: 'Examples', link: '/markdown-examples'},
            {text: 'Unity客户端', link: '/unity/'},
            {text: '服务器', link: '/docs/server/'},
            {text: '工具', link: '/docs/tools/'},
            {text: '协议', link: '/docs/protobuf/'},
            {text: 'Docker', link: '/docs/docker/'},
            {text: '配置文件', link: '/docs/config/'},
        ],

        sidebar: [
            {
                text: 'Examples',
                items: [
                    {text: 'Markdown Examples', link: '/markdown-examples'},
                    {text: 'Runtime API Examples', link: '/api-examples'}
                ]
            }
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
