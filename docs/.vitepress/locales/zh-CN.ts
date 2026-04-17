import {generateSidebar} from 'vitepress-sidebar';

const sidebarOptions = {
    useTitleFromFileHeading: true,
    useFolderTitleFromIndexFile: true,
    collapseDepth: 3,
    removePrefixAfterOrdering: true,
    prefixSeparator: '.',
};

export const zhCN = {
    label: '简体中文',
    lang: 'zh-CN',
    link: '/zh-CN/',
    themeConfig: {
        nav: [
            {
                text: '客户端',
                items: [
                    {text: 'Unity', link: '/zh-CN/client/unity/'},
                    {text: 'Godot', link: '/zh-CN/client/godot/'},
                ]
            },
            {text: '服务器', link: '/zh-CN/server/'},
            {text: '工具', link: '/zh-CN/tools/'},
            {text: '协议', link: '/zh-CN/protobuf/'},
            {text: 'Docker', link: '/zh-CN/docker/'},
            {text: '配置文件', link: '/zh-CN/config/'},
            {
                text: '加入讨论',
                items: [
                    {text: 'QQ群(467608841)', link: 'https://qm.qq.com/cgi-bin/qm/qr?k=sYFd1nv6m2KZIWFLorZ5pBR0AE5ZhbuL&jump_from=webapi&authKey=oCu+uoL3n35fT5SEt7iLgGtROPxh31n/rHUxRlp0w1f+j38W4tKBuWyRH3KEdwHN'}
                ]
            },
            {text: 'API', link: 'https://gameframex.github.io/GameFrameX.Server/index.html'},
        ],
        outline: {
            level: 'deep',
            label: '页面导航'
        },
        lastUpdated: {
            text: '最后更新于',
            formatOptions: {
                dateStyle: 'full',
                timeStyle: 'medium',
            }
        },
        editLink: {
            text: '编辑纠错',
            pattern: ({filePath}) => {
                return `https://github.com/AlianBlank/GameFrameX.Docs/edit/main/docs/${filePath}`
            }
        },
        docFooter: {
            prev: false,
            next: false
        },
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式',
        returnToTopLabel: '回到顶部',
        search: {
            provider: 'local',
            options: {
                detailedCompilation: true
            }
        },
        sidebar: generateSidebar([
            {
                ...sidebarOptions,
                documentRootPath: 'docs/zh-CN',
                scanStartPath: '/',
                resolvePath: '/zh-CN/',
                manualSortFileNameByPriority: ['guide', 'client', 'server', 'tools', 'protobuf', 'fqa', 'docker', 'config', 'development-history'],
            },
        ]),
    },
}
