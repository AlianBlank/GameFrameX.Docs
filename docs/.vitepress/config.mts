import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
// @ts-ignore
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
        // 顶部菜单导航栏
        nav: [
            {text: '🏡Home', link: '/'},
            {text: '🥰Unity客户端', link: '/unity/'},
            {text: '🍻服务器', link: '/server/'},
            {text: '🚀工具', link: '/tools/'},
            {text: '🛸协议', link: '/protobuf/'},
            {text: '🐳Docker', link: '/docker/'},
            {text: '🎆配置文件', link: '/config/'},
        ],

        // 左侧侧边栏配置
        sidebar: [
            {
                text: '简介',
                base: '/guide/',
                collapsed: true,
                items: [
                    {text: '什么是GameFrameX?', link: '/introduce'},
                    {text: '准备工作', link: '/ready'},
                    {text: '开始', link: '/start'},
                ]
            },
            {
                text: 'Unity客户端',
                base: '/unity/',
                collapsed: true,
                items: [
                    {text: '准备工作', link: '/ready'},
                ]
            },
            {
                text: '服务器',
                base: '/server/',
                collapsed: true,
                items: [
                    {text: '开始', link: '/start'},
                    {text: '启动模式', link: '/launcher-params'},
                    {text: '消息ID设计', link: '/message-id-design'},
                    {text: 'HTTP处理器', link: '/http-handler'},
                    {text: '网络通信协议', link: '/network-proto'},
                    {
                        text: '组件',
                        base: '/server/component/',
                        collapsed: true,
                        items: [
                            {
                                text: '扩展',
                                base: '/server/component/extension/',
                                collapsed: true,
                                items: [
                                    {text: '双向字典', link: '/BidirectionalDictionary'},
                                    {text: '字节处理', link: '/Byte'},
                                    {text: '集合处理', link: '/Collection'},
                                    {text: '定长队列', link: '/ConcurrentLimitedQueue'},
                                    {text: '时间', link: '/DateTime'},
                                    {text: '迭代器', link: '/Enumerable'},
                                    {text: '表达式', link: '/Expression'},
                                    {text: '基础对象', link: '/object'},
                                    {text: '只读内存', link: '/ReadOnlyMemory'},
                                    {text: '只读切片', link: '/ReadOnlySpan'},
                                    {text: '切片', link: '/Span'},
                                    {text: '字符串', link: '/String'},
                                    {text: '系统计时器', link: '/Timer'},
                                    {text: '类型', link: '/Type'},
                                ],
                            },
                            {text: '内核', link: '/core'},
                            {text: '内核基础', link: '/core-abstractions'},
                            {text: '日志', link: '/log'},
                            {text: '监控', link: '/monitor'},
                            {text: '网络基础', link: '/network-abstractions'},
                            {text: '网络', link: '/network'},
                            {text: 'HTTP网络消息', link: '/network-http'},
                            {text: '网络消息', link: '/network-message'},
                            {text: '服务器管理', link: '/server-manager'},
                            {text: '设置', link: '/setting'},
                            {text: '启动器', link: '/startUp'},
                            {text: '工具集', link: '/utility'},
                            {text: '数据库服务', link: '/dbserver'},
                            {text: '数据库MongoDB', link: '/dbserver-mongo'},
                            {text: '数据库非关系型服务', link: '/dbserver-nosql'},
                            {text: '数据库非关系型服务Redis', link: '/dbserver-nosql-redis'},
                        ]
                    },
                ]
            },
            {
                text: '工具',
                base: '/tools/',
                collapsed: true,
                items: [
                    {
                        text: '协议工具',
                        base: '/tools/proto/',
                        collapsed: true,
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
                collapsed: true,
                items: [
                    {text: '注意事项!!!', link: '/note'},
                    {text: '规范及使用', link: '/require'},
                ]
            },
            {
                text: 'Docker',
                base: '/docker/',
                collapsed: true,
                items: [
                    {text: '构建', link: '/build'},
                    {text: '发布', link: '/publish'},
                    {text: '部署', link: '/deployment'},
                ]
            },
            {
                text: '配置文件',
                base: '/config/',
                collapsed: true,
                items: [
                    {text: '开始', link: '/start'},
                ]
            }
        ],

        // 社交连接
        socialLinks: [
            {icon: 'github', link: 'https://github.com/alianblank/gameframex'}
        ],
        // 文档编辑纠错
        editLink: {
            text: '🤣编辑纠错🤣',
            pattern: ({filePath}) => {
                return `https://github.com/AlianBlank/GameFrameX.Docs/edit/main/docs/${filePath}`
            }
        },
        // 页脚
        footer: {
            message: '<a href="https://github.com/AlianBlank/GameFrameX/blob/main/LICENSE.md">Apache License</a>.',
            copyright: `Copyright ©️ 2019-${new Date().getFullYear()} <a href="https://github.com/AlianBlank">Blank</a>`
        },
        // 底部的上一页和下一页
        docFooter: {
            prev: false,
            next: false
        },
        // 右侧大纲
        outline: {
            level: 'deep',
            label: '页面导航'
        },
        lastUpdated: {
            text: '⏱️最后更新于🪂',
            formatOptions: {
                // @ts-ignore
                dateStyle: 'full',
                timeStyle: 'medium',
                // forceLocale: true,
            }
        },
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式',
        returnToTopLabel: '回到顶部',
        // 搜索设置
        search: {
            provider: 'local'
        },
        logo: '/logo.png',

    },
    head: [
        // Logo
        ['link', {rel: 'icon', href: '/logo.png'}],
        // 看板娘引用库
        // ['script', {src: '/live2d.js'}],
    ],
    markdown: {
        image: {
            // 默认使用图片懒加载
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
