import {defineConfig} from 'vitepress'

import timeline from "vitepress-markdown-timeline";
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
                    {
                        text: '组件',
                        base: '/unity/component/',
                        collapsed: false,
                        items: [
                            {text: '事件', link: '/event'},
                            {text: '镜像地址', link: '/sync-image'},
                            {text: '资源', link: '/asset'},
                            {text: '配置表', link: '/config'},
                            {text: '协程', link: '/coroutine'},
                            {text: '有限状态机', link: '/fsm'},
                            {text: '调试控制台', link: '/debug-console'},
                            {text: 'DoTween', link: '/do-tween'},
                            {text: '下载', link: '/download'},
                            {text: '实体对象', link: '/entity'},
                            {text: 'FairyGUI', link: '/fairygui'},
                            {text: '全局配置', link: '/global-config'},
                            {text: 'LitJson', link: '/litjson'},
                            {text: '本地化', link: '/localization'},
                            {text: 'mono生命周期', link: '/mono'},
                            {text: '网络', link: '/network'},
                            {text: '广告', link: '/advertisement'},
                            {text: '对象存储', link: '/object-storage'},
                            {text: '数据统计', link: '/game-analytics'},
                            {text: '粘贴板操作', link: '/operation-clipboard'},
                            {text: '寻路', link: '/pathfinding'},
                            {text: '流程', link: '/procedure'},
                            {text: 'ProtoBuf.Net', link: '/protobuf-net'},
                            {text: '场景', link: '/scene'},
                            {text: '设置', link: '/setting'},
                            {text: '声音', link: '/sound'},
                            {text: '计时器', link: '/timer'},
                            {text: 'HTTP', link: '/web'},
                            {text: '微信小游戏', link: '/wechat-mini-game'},
                            {text: '抖音小游戏', link: '/douyin-mini-game'},
                        ]
                    },
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
                            {
                                text: '扩展',
                                base: '/server/component/extension/',
                                collapsed: false,
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
                            {text: '基础核心', link: '/core-abstractions'},
                            {text: '配置核心', link: '/core-config'},
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
                            {text: '数据库服务', link: '/database'},
                            {text: '数据库MongoDB', link: '/database-mongo'},
                            {text: '数据库非关系型服务', link: '/database-nosql'},
                            {text: '数据库非关系型服务Redis', link: '/database-nosql-redis'},
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
            },
            {
                text: '发展历程',
                base: '/development-history/',
                collapsed: false,
                items: [
                    {text: '发展历程', link: '/history'},
                    {text: '商业案例', link: '/case'},
                    {text: '打赏记录', link: '/reward-list'},
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
        // 百度统计
        [
            'script',
            {},
            `
      window._hmt = window._hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?bb98fe196aa7f73b90177c872e5644ab";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
      `,
        ],
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
            },

        //时间线
        config: (md) => {
            md.use(timeline);
        },
    }
})
