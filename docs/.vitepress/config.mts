import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "GameFrameX文档",
    description: "GameFrameX.Docs",
    titleTemplate: ':title',
    cleanUrls: true,
    lastUpdated: true,
    srcExclude: [
        '**/README.md',
        '**/TODO.md'
    ],
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        sidebar: [
            {
                base: '/unity/',
                text: 'Unity',
                items: [
                    {text: '开始', link: '/start'},
                ]
            },
            {
                text: '服务器',
                base: '/server/',
                items: [
                    {text: '开始', link: '/start'},
                    {text: 'Runtime API Examples', link: '/api-examples'}
                ]
            },
            {
                base: '/tools/',
                text: '工具',
                items: [
                    {text: '开始', link: '/start'},

                ]
            },
            {
                base: '/protobuf/',
                text: '协议',
                items: [
                    {text: '开始', link: '/start'},
                ]
            },
            {
                base: '/docker/',
                text: 'Docker',
                items: [
                    {text: '开始', link: '/start'},
                ]
            },
            {
                base: '/config/',
                text: '配置文件',
                items: [
                    {text: '开始', link: '/start'},
                ]
            },
        ],
        nav: [
            {text: 'Unity客户端', link: '/unity/'},
            {text: '服务器', link: '/server/'},
            {text: '工具', link: '/tools/'},
            {text: '协议', link: '/protobuf/'},
            {text: 'Docker', link: '/docker/'},
            {text: '配置文件', link: '/config/'},
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
        lastUpdated: {
            text: '最后更新于',
            formatOptions: {
                dateStyle: 'short',
                timeStyle: 'medium'
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

