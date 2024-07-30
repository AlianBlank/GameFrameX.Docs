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
            {
                text: '镜像站点',
                items: [
                    {text: '码云(gitee)', link: 'https://gitee.com/gameframex'},
                    {text: '开放原子开源基金会(atomgit)', link: 'https://atomgit.com/gameframex'},
                    {text: 'CSDN(gitcode)', link: 'https://gitcode.net/gameframex'},
                    {text: 'GitLab官方(gitlab)', link: 'https://gitlab.com/gameframex'},
                    {text: '法国公司 基于GitLab(framagit)', link: 'https://framagit.org/gameframex'},
                    {
                        text: '中国计算机学会-开源发展委员会(www.gitlink.org.cn)',
                        link: 'https://gitlink.org.cn/GameFrameX'
                    },
                ]
            }
        ],

        // 左侧侧边栏配置
        sidebar: [
            {
                text: '简介',
                collapsed: false,
                items: [
                    {text: '什么是GameFrameX?', link: '/guide/introduce'},
                    {text: '准备工作', link: '/guide/ready'},
                    {text: '开始', link: '/guide/start'},
                ]
            },
            {
                text: 'Unity客户端',
                collapsed: false,
                items: [
                    {text: '准备工作', link: '/ready'},
                    {
                        text: '组件',
                        collapsed: false,
                        items: [
                            {text: '事件', link: '/unity/component/event'},
                            {text: '镜像地址', link: '/unity/component/sync-image'},
                            {text: '资源', link: '/unity/component/asset'},
                            {text: '配置表', link: '/unity/component/config'},
                            {text: '协程', link: '/unity/component/coroutine'},
                            {text: '有限状态机', link: '/unity/component/fsm'},
                            {text: '调试控制台', link: '/unity/component/debug-console'},
                            {text: 'DoTween', link: '/unity/component/do-tween'},
                            {text: '下载', link: '/unity/component/download'},
                            {text: '实体对象', link: '/unity/component/entity'},
                            {text: 'FairyGUI', link: '/unity/component/fairygui'},
                            {text: '全局配置', link: '/unity/component/global-config'},
                            {text: 'LitJson', link: '/unity/component/litjson'},
                            {text: '本地化', link: '/unity/component/localization'},
                            {text: 'mono生命周期', link: '/unity/component/mono'},
                            {text: '网络', link: '/unity/component/network'},
                            {text: '广告', link: '/unity/component/advertisement'},
                            {text: '对象存储', link: '/unity/component/object-storage'},
                            {text: '数据统计', link: '/unity/component/game-analytics'},
                            {text: '粘贴板操作', link: '/unity/component/operation-clipboard'},
                            {text: '寻路', link: '/unity/component/pathfinding'},
                            {text: '流程', link: '/unity/component/procedure'},
                            {text: 'ProtoBuf.Net', link: '/unity/component/protobuf-net'},
                            {text: '场景', link: '/unity/component/scene'},
                            {text: '设置', link: '/unity/component/setting'},
                            {text: '声音', link: '/unity/component/sound'},
                            {text: '计时器', link: '/unity/component/timer'},
                            {text: 'HTTP', link: '/unity/component/web'},
                            {text: '微信小游戏', link: '/unity/component/wechat-mini-game'},
                            {text: '抖音小游戏', link: '/unity/component/douyin-mini-game'},
                        ]
                    },
                ]
            },
            {
                text: '服务器',
                collapsed: false,
                items: [
                    {text: '开始', link: '/server/start'},
                    {text: '启动模式', link: '/server/launcher-params'},
                    {text: '消息ID设计', link: '/server/message-id-design'},
                    {text: 'HTTP处理器', link: '/server/http-handler'},
                    {text: '网络通信协议', link: '/server/network-proto'},
                    {
                        text: '组件',
                        collapsed: false,
                        items: [
                            {
                                text: '扩展',
                                collapsed: false,
                                items: [
                                    {text: '双向字典', link: '/server/component/extension/BidirectionalDictionary'},
                                    {text: '字节处理', link: '/server/component/extension/Byte'},
                                    {text: '集合处理', link: '/server/component/extension/Collection'},
                                    {text: '定长队列', link: '/server/component/extension/ConcurrentLimitedQueue'},
                                    {text: '时间', link: '/server/component/extension/DateTime'},
                                    {text: '迭代器', link: '/server/component/extension/Enumerable'},
                                    {text: '表达式', link: '/server/component/extension/Expression'},
                                    {text: '基础对象', link: '/server/component/extension/object'},
                                    {text: '只读内存', link: '/server/component/extension/ReadOnlyMemory'},
                                    {text: '只读切片', link: '/server/component/extension/ReadOnlySpan'},
                                    {text: '切片', link: '/server/component/extension/Span'},
                                    {text: '字符串', link: '/server/component/extension/String'},
                                    {text: '系统计时器', link: '/server/component/extension/Timer'},
                                    {text: '类型', link: '/server/component/extension/Type'},
                                ],
                            },
                            {text: '内核', link: '/server/component/core'},
                            {text: '基础核心', link: '/server/component/core-abstractions'},
                            {text: '配置核心', link: '/server/component/core-config'},
                            {text: '日志', link: '/server/component/log'},
                            {text: '监控', link: '/server/component/monitor'},
                            {text: '网络基础', link: '/server/component/network-abstractions'},
                            {text: '网络', link: '/server/component/network'},
                            {text: 'HTTP网络消息', link: '/server/component/network-http'},
                            {text: '网络消息', link: '/server/component/network-message'},
                            {text: '服务器管理', link: '/server/component/server-manager'},
                            {text: '设置', link: '/server/component/setting'},
                            {text: '启动器', link: '/server/component/startUp'},
                            {text: '工具集', link: '/server/component/utility'},
                            {text: '数据库服务', link: '/server/component/database'},
                            {text: '数据库MongoDB', link: '/server/component/database-mongo'},
                            {text: '数据库非关系型服务', link: '/server/component/database-nosql'},
                            {text: '数据库非关系型服务Redis', link: '/server/component/database-nosql-redis'},
                        ]
                    },
                ]
            },
            {
                text: '工具',
                collapsed: false,
                items: [
                    {
                        text: '协议工具',
                        collapsed: false,
                        items: [
                            {text: '导出模式', link: '/tools/proto/export-mode'},
                            {text: '启动参数', link: '/tools/proto/launcher-params'},
                        ]
                    },
                ]
            },
            {
                text: '协议',
                collapsed: false,
                items: [
                    {text: '注意事项!!!', link: '/protobuf/note'},
                    {text: '规范及使用', link: '/protobuf/require'},
                ]
            },
            {
                text: 'Docker',
                collapsed: false,
                items: [
                    {text: '构建', link: '/docker/build'},
                    {text: '发布', link: '/docker/publish'},
                    {text: '部署', link: '/docker/deployment'},
                ]
            },
            {
                text: '配置文件',
                collapsed: false,
                items: [
                    {text: '开始', link: '/config/start'},
                ]
            },
            {
                text: '常见问题',
                collapsed: false,
                items: [
                    {text: '协议工具', link: '/fqa/tools-proto'},
                    {text: 'Unity', link: '/fqa/unity'},
                    {text: '服务器', link: '/fqa/server'},
                    {text: 'Docker', link: '/fqa/docker'},
                ]
            },
            {
                text: '发展历程',
                collapsed: false,
                items: [
                    {text: '发展历程', link: '/development-history/history'},
                    {text: '商业案例', link: '/development-history/case'},
                    {text: '打赏记录', link: '/development-history/reward-list'},
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
