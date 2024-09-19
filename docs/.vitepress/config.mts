import {defineConfig} from 'vitepress'

import timeline from "vitepress-markdown-timeline";
import {generateSidebar} from 'vitepress-sidebar';
// https://vitepress.dev/reference/site-config
// @ts-ignore
export default defineConfig({
    title: "Game Frame X Doc",
    description: "Game Frame X 文档",
    titleTemplate: ':title',
    lang: 'zh-CN',
    cleanUrls: false,
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
                text: '😎镜像站点',
                items: [
                    {
                        text: '码云(gitee)',
                        link: 'https://gitee.com/gameframex'
                    },
                    {
                        text: '开放原子开源基金会(atomgit)',
                        link: 'https://atomgit.com/gameframex'
                    },
                    {
                        text: 'CSDN(gitcode)',
                        link: 'https://gitcode.net/gameframex'
                    },
                    {
                        text: 'GitLab官方(gitlab)',
                        link: 'https://gitlab.com/gameframex'
                    },
                    {
                        text: '法国公司 基于GitLab(framagit)',
                        link: 'https://framagit.org/gameframex'
                    },
                    {
                        text: '中国计算机学会-开源发展委员会(www.gitlink.org.cn)',
                        link: 'https://gitlink.org.cn/GameFrameX'
                    },
                ]
            },
            {
                text: '✡️加入讨论',
                items: [
                    {
                        text: '🐧QQ群(467608841)',
                        link: 'https://qm.qq.com/cgi-bin/qm/qr?k=sYFd1nv6m2KZIWFLorZ5pBR0AE5ZhbuL&jump_from=webapi&authKey=oCu+uoL3n35fT5SEt7iLgGtROPxh31n/rHUxRlp0w1f+j38W4tKBuWyRH3KEdwHN'
                    }
                ]
            }
        ],


        // 左侧侧边栏配置
        sidebar: generateSidebar([
            /*
             {
             /!*
              * For detailed instructions, see the links below:
              * https://vitepress-sidebar.jooy2.com/guide/api
              *!/
             documentRootPath: '/docs', //文档根目录
             // scanStartPath: null,
             // resolvePath: null,
             useTitleFromFileHeading: true, //显示带有文件标题内容的标题
             // useTitleFromFrontmatter: true, //
             // frontmatterTitleFieldName: 'title', // 使用文件中的标记头来显示
             useFolderTitleFromIndexFile: true, //是否使用层级首页文件名做分级标题
             useFolderLinkFromIndexFile: true,//是否链接至层级首页文件,指向文件夹中的index.md 文件的标题
             // hyphenToSpace: true,
             // underscoreToSpace: true,
             // capitalizeFirst: false, // 标题首字母强制大写
             // capitalizeEachWords: false, // 标题单次首字母大写
             // collapsed: true,//折叠组关闭
             collapseDepth: 2,//折叠组2级菜单
             // sortMenusByName: true,
             // sortMenusByFrontmatterOrder: false,
             // sortMenusByFrontmatterDate: false,
             // sortMenusOrderByDescending: false,
             // sortMenusOrderNumericallyFromTitle: false,
             sortMenusOrderNumericallyFromLink: true,
             // frontmatterOrderDefaultValue: 0,
             // manualSortFileNameByPriority: ['/guide', '/unity', '/server', '/tools', '/protobuf', '/docker', '/development-history'],
             removePrefixAfterOrdering: true,
             prefixSeparator: '.',
             // excludeFiles: ['first.md', 'secret.md'], // 排除文件
             // excludeFilesByFrontmatterFieldName: 'exclude', // 排除文件名称
             // excludeFolders: ['secret-folder'], // 排除文件夹
             // includeDotFiles: false, // 导入.文件
             // includeRootIndexFile: false, // 导入根索引文件
             // includeFolderIndexFile: false, // 导入文件夹索引文件
             // includeEmptyFolder: false, // 导入空文件夹
             // rootGroupText: 'Contents',
             // rootGroupLink: 'https://github.com/jooy2',
             // rootGroupCollapsed: false,
             // convertSameNameSubFileToGroupIndexPage: false,
             // folderLinkNotIncludesFileName: false,
             // keepMarkdownSyntaxFromTitle: false,
             // debugPrint: false,
         }*/
            {
                documentRootPath: 'docs', //文档根目录
                scanStartPath: '/',
                resolvePath: '/',
                useTitleFromFileHeading: true, //显示带有文件标题内容的标题
                useFolderTitleFromIndexFile: true, //是否使用层级首页文件名做分级标题
                // useFolderLinkFromIndexFile: true,//是否链接至层级首页文件,指向文件夹中的index.md 文件的标题
                manualSortFileNameByPriority: ['guide', 'unity', 'server', 'tools', 'protobuf', 'fqa', 'docker', 'config', 'development-history'],
                collapseDepth: 3,//折叠组3级菜单
                removePrefixAfterOrdering: true,
                prefixSeparator: '.',
                // debugPrint: true,
            }
        ]),
        /*
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
                        text: '常见问题',
                        base: '/fqa/',
                        collapsed: false,
                        items: [
                            {text: '协议工具', link: '/tools-proto'},
                            {text: 'Unity', link: '/unity'},
                            {text: '服务器', link: '/server'},
                            {text: 'Docker', link: '/docker'},
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
        */

        // 社交连接
        socialLinks: [
            {icon: 'github', link: 'https://github.com/GameFrameX/gameframex'},
            {
                icon: {
                    svg: '<svg t="1726741715992" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1462" width="200" height="200"><path d="M0 0m184.32 0l655.36 0q184.32 0 184.32 184.32l0 655.36q0 184.32-184.32 184.32l-655.36 0q-184.32 0-184.32-184.32l0-655.36q0-184.32 184.32-184.32Z" fill="#EC5D85" p-id="1463"></path><path d="M512 241.96096h52.224l65.06496-96.31744c49.63328-50.31936 89.64096 0.43008 63.85664 45.71136l-34.31424 51.5072c257.64864 5.02784 257.64864 43.008 257.64864 325.03808 0 325.94944 0 336.46592-404.48 336.46592S107.52 893.8496 107.52 567.90016c0-277.69856 0-318.80192 253.14304-324.95616l-39.43424-58.368c-31.26272-54.90688 37.33504-90.40896 64.68608-42.37312l60.416 99.80928c18.18624-0.0512 41.18528-0.0512 65.66912-0.0512z" fill="#EF85A7" p-id="1464"></path><path d="M512 338.5856c332.8 0 332.8 0 332.8 240.64s0 248.39168-332.8 248.39168-332.8-7.75168-332.8-248.39168 0-240.64 332.8-240.64z" fill="#EC5D85" p-id="1465"></path><path d="M281.6 558.08a30.72 30.72 0 0 1-27.47392-16.97792 30.72 30.72 0 0 1 13.73184-41.216l122.88-61.44a30.72 30.72 0 0 1 41.216 13.74208 30.72 30.72 0 0 1-13.74208 41.216l-122.88 61.44a30.59712 30.59712 0 0 1-13.73184 3.23584zM752.64 558.08a30.60736 30.60736 0 0 1-12.8512-2.83648l-133.12-61.44a30.72 30.72 0 0 1-15.04256-40.7552 30.72 30.72 0 0 1 40.76544-15.02208l133.12 61.44A30.72 30.72 0 0 1 752.64 558.08zM454.656 666.88a15.36 15.36 0 0 1-12.288-6.1952 15.36 15.36 0 0 1 3.072-21.49376l68.5056-50.91328 50.35008 52.62336a15.36 15.36 0 0 1-22.20032 21.23776l-31.5904-33.024-46.71488 34.72384a15.28832 15.28832 0 0 1-9.13408 3.04128z" fill="#EF85A7" p-id="1466"></path><path d="M65.536 369.31584c15.03232 101.90848 32.84992 147.17952 44.544 355.328 14.63296 2.18112 177.70496 10.04544 204.05248-74.62912a16.14848 16.14848 0 0 0 1.64864-10.87488c-30.60736-80.3328-169.216-60.416-169.216-60.416s-10.36288-146.50368-11.49952-238.83776zM362.25024 383.03744l34.816 303.17568h34.64192L405.23776 381.1328zM309.52448 536.28928h45.48608l16.09728 158.6176-31.82592 1.85344zM446.86336 542.98624h45.80352V705.3312h-33.87392zM296.6016 457.97376h21.39136l5.2736 58.99264-18.91328 2.26304zM326.99392 457.97376h21.39136l2.53952 55.808-17.408 1.61792zM470.62016 459.88864h19.456v62.27968h-19.456zM440.23808 459.88864h22.20032v62.27968h-16.62976z" fill="#FFFFFF" p-id="1467"></path><path d="M243.56864 645.51936a275.456 275.456 0 0 1-28.4672 23.74656 242.688 242.688 0 0 1-29.53216 17.52064 2.70336 2.70336 0 0 1-4.4032-1.95584 258.60096 258.60096 0 0 1-5.12-29.57312c-1.41312-12.1856-1.95584-25.68192-2.16064-36.36224 0-0.3072 0-2.5088 3.01056-1.90464a245.92384 245.92384 0 0 1 34.22208 9.5744 257.024 257.024 0 0 1 32.3584 15.17568c0.52224 0.256 2.51904 1.4848 0.09216 3.77856z" fill="#EB5480" p-id="1468"></path><path d="M513.29024 369.31584c15.03232 101.90848 32.84992 147.17952 44.544 355.328 14.63296 2.18112 177.70496 10.04544 204.05248-74.62912a16.14848 16.14848 0 0 0 1.64864-10.87488c-30.60736-80.3328-169.216-60.416-169.216-60.416s-10.36288-146.50368-11.49952-238.83776zM810.00448 383.03744l34.816 303.17568h34.64192L852.992 381.1328zM757.27872 536.28928h45.48608l16.09728 158.6176-31.82592 1.85344zM894.6176 542.98624h45.80352V705.3312H906.5472zM744.35584 457.97376h21.39136l5.2736 58.99264-18.91328 2.26304zM774.74816 457.97376h21.39136l2.53952 55.808-17.408 1.61792zM918.3744 459.88864h19.456v62.27968h-19.456zM887.99232 459.88864h22.20032v62.27968h-16.62976z" fill="#FFFFFF" p-id="1469"></path><path d="M691.32288 645.51936a275.456 275.456 0 0 1-28.4672 23.74656 242.688 242.688 0 0 1-29.53216 17.52064 2.70336 2.70336 0 0 1-4.4032-1.95584 258.60096 258.60096 0 0 1-5.12-29.57312c-1.41312-12.1856-1.95584-25.68192-2.16064-36.36224 0-0.3072 0-2.5088 3.01056-1.90464a245.92384 245.92384 0 0 1 34.22208 9.5744 257.024 257.024 0 0 1 32.3584 15.17568c0.52224 0.256 2.51904 1.4848 0.09216 3.77856z" fill="#EB5480" p-id="1470"></path></svg>'
                }, link: 'https://www.bilibili.com/video/BV1yrpeepEn7'
            },
            {
                icon: {
                    svg: '<svg t="1726741880848" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8631" width="200" height="200"><path d="M512.568 3.632C231.842 3.632 4.266 231.206 4.266 511.934s227.574 508.302 508.302 508.302S1020.87 792.66 1020.87 511.934 793.295 3.632 512.57 3.632z m-68.241 709.061l-0.075 0.063c-8.023 6.832-13.3 13.756-16.71 20.283-5.739-0.01-11.362-0.318-16.97-0.794-49.62 27.722-135.018 18.497-156.104-0.362-16.311-14.56-15.463-33.574 3.772-49.953 5.097-4.299 14.072-8.032 24.438-11.185-16.9-18.436-29.74-40.18-37.416-63.95-4.479 7.109-8.512 13.636-11.184 18.34-10.382 18.312-23.004 20.082-30.2 0.269-8.004-21.965-5.27-55.57 9.468-93.554 9.114-23.469 24.362-43.377 35.486-56.244-4.11-7.2-6.458-14.73-6.458-22.529 0-16.283 9.577-31.47 26-44.523 8.357-84.358 76.529-150.141 159.452-150.141 44.087 0 84.014 18.614 112.993 48.728a180.666 180.666 0 0 0-35.474 26.258c-30.864 29.278-50.92 68.491-57.028 111.17-22.219 20.362-27.12 40.864-27.12 54.987 0 6.43 1.038 12.841 3.098 19.172-13.738 17.444-24.051 34.928-30.725 52.112-16.301 42.015-19.717 80.416-9.625 108.112 8.108 22.322 22.211 26.765 29.897 27.425 11.33 0.97 20.264-4.56 26.798-11.27a192.15 192.15 0 0 0 8.672 13.912 49.362 49.362 0 0 0-4.985 3.674z m377.48-55.998c-6.32 17.342-17.362 15.79-26.455-0.235-2.34-4.122-5.87-9.84-9.796-16.065-6.686 20.712-17.822 39.635-32.515 55.728 9.484 2.845 17.697 6.183 22.313 10.086 16.832 14.348 17.59 31.003 3.316 43.757-18.484 16.519-93.411 24.613-136.848 0.274-5.318 0.466-10.704 0.74-16.158 0.74-5.113 0-10.12-0.274-15.113-0.698-43.465 24.283-118.27 16.203-136.74-0.316-14.288-12.754-13.544-29.41 3.303-43.757 4.465-3.765 12.328-7.037 21.407-9.797-14.804-16.15-26.05-35.196-32.775-56.017-3.924 6.225-7.456 11.943-9.796 16.065-9.095 16.04-20.15 17.591-26.454 0.235-7.01-19.24-4.616-48.677 8.293-81.949 7.984-20.557 21.34-37.997 31.084-49.267-3.6-6.307-5.657-12.904-5.657-19.735 0-14.264 8.39-27.567 22.775-39 7.32-73.894 67.036-131.517 139.673-131.517 72.612 0 132.342 57.637 139.662 131.517 14.371 11.433 22.775 24.736 22.775 39 0 6.831-2.043 13.428-5.657 19.735 9.744 11.284 23.114 28.71 31.084 49.267h-0.014c12.907 33.272 15.302 62.71 8.292 81.95z" fill="#317BFF" p-id="8632"></path></svg>'
                },
                link: 'https://qm.qq.com/cgi-bin/qm/qr?k=sYFd1nv6m2KZIWFLorZ5pBR0AE5ZhbuL&jump_from=webapi&authKey=oCu+uoL3n35fT5SEt7iLgGtROPxh31n/rHUxRlp0w1f+j38W4tKBuWyRH3KEdwHN'
            },
            {
                icon: {
                    svg: '<svg t="1726741946890" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9603" width="200" height="200"><path d="M512 1024A512 512 0 1 1 512 0a512 512 0 0 1 0 1024z m259.2-568.896H480.32a25.28 25.28 0 0 0-25.28 25.28v63.232c0 13.952 11.328 25.28 25.28 25.28h177.024c13.952 0 25.28 11.328 25.28 25.28v12.672c0 41.856-33.92 75.84-75.84 75.84H366.592a25.28 25.28 0 0 1-25.28-25.28V417.216c0-41.92 33.92-75.84 75.84-75.84h353.92a25.28 25.28 0 0 0 25.28-25.344l0.064-63.168a25.28 25.28 0 0 0-25.216-25.28H417.152a189.632 189.632 0 0 0-189.632 189.632v353.92c0 14.016 11.328 25.28 25.28 25.28h372.992a170.624 170.624 0 0 0 170.624-170.624V480.384a25.28 25.28 0 0 0-25.28-25.28z" fill="#C71D23" p-id="9604"></path></svg>'
                }, link: 'https://gitee.com/GameFrameX/gameframex'
            }
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
            message: '<a href="https://github.com/GameFrameX/GameFrameX/blob/main/LICENSE.md">Apache License</a>.',
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
        /*[
            'script',
            {},
            `
      window._hmt = window._hmt || [];
      (function() {
        var umami = document.createElement("script");
        umami.src = "https://cloud.umami.is/script.js";
        umami.data-website-id = "92a468c9-7c0e-4e55-bea3-0e3c3bb0330e";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(umami, s);
      })();
      `,
        ],*/
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
