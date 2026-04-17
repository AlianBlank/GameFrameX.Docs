import {generateSidebar} from 'vitepress-sidebar';

const sidebarOptions = {
    useTitleFromFileHeading: true,
    useFolderTitleFromIndexFile: true,
    collapseDepth: 3,
    removePrefixAfterOrdering: true,
    prefixSeparator: '.',
};

export const ja = {
    label: '日本語',
    lang: 'ja',
    link: '/ja/',
    themeConfig: {
        sidebar: generateSidebar([
            {
                ...sidebarOptions,
                documentRootPath: 'docs/ja',
                scanStartPath: '/',
                resolvePath: '/ja/',
                manualSortFileNameByPriority: ['guide', 'client', 'server', 'tools', 'protobuf', 'fqa', 'docker', 'config', 'development-history'],
            },
        ]),
        nav: [
            {
                text: 'クライアント',
                items: [
                    {text: 'Unity', link: '/ja/client/unity/'},
                    {text: 'Godot', link: '/ja/client/godot/'},
                ]
            },
            {text: 'サーバー', link: '/ja/server/'},
            {text: 'ツール', link: '/ja/tools/'},
            {text: 'Protobuf', link: '/ja/protobuf/'},
            {text: 'Docker', link: '/ja/docker/'},
            {text: '設定', link: '/ja/config/'},
            {
                text: 'コミュニティ',
                items: [
                    {text: 'QQグループ (467608841)', link: 'https://qm.qq.com/cgi-bin/qm/qr?k=sYFd1nv6m2KZIWFLorZ5pBR0AE5ZhbuL&jump_from=webapi&authKey=oCu+uoL3n35fT5SEt7iLgGtROPxh31n/rHUxRlp0w1f+j38W4tKBuWyRH3KEdwHN'}
                ]
            },
            {text: 'API', link: 'https://gameframex.github.io/GameFrameX.Server/index.html'},
        ],
        outline: {
            level: 'deep',
            label: 'このページの内容'
        },
        lastUpdated: {
            text: '最終更新',
            formatOptions: {
                dateStyle: 'full',
                timeStyle: 'medium',
            }
        },
        editLink: {
            text: 'このページを編集',
            pattern: ({filePath}) => {
                return `https://github.com/AlianBlank/GameFrameX.Docs/edit/main/docs/${filePath}`
            }
        },
        docFooter: {
            prev: false,
            next: false
        },
        lightModeSwitchTitle: 'ライトモードに切り替え',
        darkModeSwitchTitle: 'ダークモードに切り替え',
        returnToTopLabel: 'トップに戻る',
        search: {
            provider: 'local',
            options: {
                detailedCompilation: true
            }
        },
    },
}
