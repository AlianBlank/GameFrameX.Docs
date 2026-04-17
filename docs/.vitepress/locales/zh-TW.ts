import {generateSidebar} from 'vitepress-sidebar';

const sidebarOptions = {
    useTitleFromFileHeading: true,
    useFolderTitleFromIndexFile: true,
    collapseDepth: 3,
    removePrefixAfterOrdering: true,
    prefixSeparator: '.',
};

export const zhTW = {
    label: '繁體中文',
    lang: 'zh-TW',
    link: '/zh-TW/',
    themeConfig: {
        sidebar: generateSidebar([
            {
                ...sidebarOptions,
                documentRootPath: 'docs/zh-TW',
                scanStartPath: '/',
                resolvePath: '/zh-TW/',
                manualSortFileNameByPriority: ['guide', 'client', 'server', 'tools', 'protobuf', 'fqa', 'docker', 'config', 'development-history'],
            },
        ]),
        nav: [
            {
                text: '客戶端',
                items: [
                    {text: 'Unity', link: '/zh-TW/client/unity/'},
                    {text: 'Godot', link: '/zh-TW/client/godot/'},
                ]
            },
            {text: '伺服器', link: '/zh-TW/server/'},
            {text: '工具', link: '/zh-TW/tools/'},
            {text: '協議', link: '/zh-TW/protobuf/'},
            {text: 'Docker', link: '/zh-TW/docker/'},
            {text: '配置文件', link: '/zh-TW/config/'},
            {
                text: '加入討論',
                items: [
                    {text: 'QQ群(467608841)', link: 'https://qm.qq.com/cgi-bin/qm/qr?k=sYFd1nv6m2KZIWFLorZ5pBR0AE5ZhbuL&jump_from=webapi&authKey=oCu+uoL3n35fT5SEt7iLgGtROPxh31n/rHUxRlp0w1f+j38W4tKBuWyRH3KEdwHN'}
                ]
            },
            {text: 'API', link: 'https://gameframex.github.io/GameFrameX.Server/index.html'},
        ],
        outline: {
            level: 'deep',
            label: '頁面導航'
        },
        lastUpdated: {
            text: '最後更新於',
            formatOptions: {
                dateStyle: 'full',
                timeStyle: 'medium',
            }
        },
        editLink: {
            text: '編輯此頁',
            pattern: ({filePath}) => {
                return `https://github.com/AlianBlank/GameFrameX.Docs/edit/main/docs/${filePath}`
            }
        },
        docFooter: {
            prev: false,
            next: false
        },
        lightModeSwitchTitle: '切換到淺色模式',
        darkModeSwitchTitle: '切換到深色模式',
        returnToTopLabel: '回到頂部',
        search: {
            provider: 'local',
            options: {
                detailedCompilation: true
            }
        },
    },
}
