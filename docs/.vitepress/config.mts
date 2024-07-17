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
            {text: '🏡Home', link: '/'},
            {text: '🥰Unity客户端', link: '/unity/'},
            {text: '🍻服务器', link: '/server/'},
            {text: '🚀工具', link: '/tools/'},
            {text: '🛸协议', link: '/protobuf/'},
            {text: '🐳Docker', link: '/docker/'},
            {text: '🎆配置文件', link: '/config/'},
        ],

        sidebar: [
            {
                text: '简介',
                base: '/guide/',
                collapsed: false,
                items: [
                    {text: '什么是GameFrameX?', link: '/introduce'},
                    {text: '准备工作', link: '/ready'},
                    {text: '开始', link: '/start'},
                ]
            },
            {
                text: 'Unity客户端',
                base: '/unity/',
                collapsed: false,
                items: [
                    {text: '准备工作', link: '/ready'},
                ]
            },
            {
                text: '服务器',
                base: '/server/',
                collapsed: false,
                items: [
                    {text: '开始', link: '/start'},
                    {text: '启动模式', link: '/launcher-params'},
                    {text: '消息ID设计', link: '/message-id-design'},
                    {text: 'HTTP处理器', link: '/http-handler'},
                    {text: '网络通信协议', link: '/network-proto'},
                    {
                        text: '组件',
                        base: '/server/component/',
                        collapsed: false,
                        items: [
                            {text: '内核', link: '/core'},
                            {text: '内核基础', link: '/core-abstractions'},
                            {text: '扩展', link: '/extension'},
                            {text: '日志', link: '/log'},
                            {text: '监控', link: '/monitor'},
                            {text: '网络基础', link: '/network-abstractions'},
                            {text: '网络', link: '/network'},
                            {text: 'HTTP网络消息', link: '/network-http'},
                            {text: '网络消息', link: '/network-message'},
                            {text: '服务器管理', link: '/server-manager'},
                            {text: '设置', link: '/setting'},
                            {text: '启动器', link: '/start-up'},
                            {text: '工具集', link: '/utility'},
                            {text: '数据库服务', link: '/dbserver'},
                            {text: '数据库MongoDB', link: '/dbserver-mongo'},
                            {text: '数据库非关系型服务', link: '/dbserver-nosql'},
                            {text: '数据库非关系型服务Redis', link: '/dbserver-nosql-redis'},
                            {text: '数据库服务', link: '/dbserver'},
                        ]
                    },
                ]
            },
            {
                text: '工具',
                base: '/tools/',
                collapsed: false,
                items: [
                    {
                        text: '协议工具',
                        base: '/tools/proto/',
                        collapsed: false,
                        items: [
                            {text: '导出模式', link: '/export-mode'},
                            {text: '启动参数', link: '/launcher-params'},
                        ]
                    },
                ]
            },
            {
                text: '协议',
                base: '/protobuf/',
                collapsed: false,
                items: [
                    {text: '注意事项!!!', link: '/note'},
                    {text: '规范及使用', link: '/require'},
                ]
            },
            {
                text: 'Docker',
                base: '/docker/',
                collapsed: false,
                items: [
                    {text: '构建', link: '/build'},
                    {text: '发布', link: '/publish'},
                    {text: '部署', link: '/deployment'},
                ]
            },
            {
                text: '配置文件',
                base: '/config/',
                collapsed: false,
                items: [
                    {text: '开始', link: '/start'},
                ]
            }
        ],

        socialLinks: [
            {icon: 'github', link: 'https://github.com/alianblank/gameframex'}
        ],
        editLink: {
            text: '🤣编辑纠错🤣',
            pattern: ({filePath}) => {
                return `https://github.com/AlianBlank/GameFrameX.Docs/edit/main/docs/${filePath}`
            }
        },
        footer: {
            message: '<a href="https://github.com/AlianBlank/GameFrameX/blob/main/LICENSE.md">Apache License</a>.',
            copyright: `Copyright ©️ 2019-${new Date().getFullYear()} <a href="https://github.com/AlianBlank">Blank</a>`
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
        },
        logo: '/logo.png',

    },
    head: [
        ['link', {rel: 'icon', href: '/logo.png'}],
        ['script', {src: '/live2d.js'}],
    ],
    markdown: {
        image: {
            // 默认禁用图片懒加载
            lazyLoading: true
        }
        ,
        // 行号
        lineNumbers: true,
        container:
            {
                tipLabel: '提示',
                warningLabel:
                    '警告',
                dangerLabel:
                    '危险',
                infoLabel:
                    '信息',
                detailsLabel:
                    '详细信息'
            }
    }
})
