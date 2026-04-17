import {generateSidebar} from 'vitepress-sidebar';

const sidebarOptions = {
    useTitleFromFileHeading: true,
    useFolderTitleFromIndexFile: true,
    collapseDepth: 3,
    removePrefixAfterOrdering: true,
    prefixSeparator: '.',
};

export const en = {
    label: 'English',
    lang: 'en',
    link: '/en/',
    themeConfig: {
        sidebar: generateSidebar([
            {
                ...sidebarOptions,
                documentRootPath: 'docs/en',
                scanStartPath: '/',
                resolvePath: '/en/',
                manualSortFileNameByPriority: ['guide', 'client', 'server', 'tools', 'protobuf', 'fqa', 'docker', 'config', 'development-history'],
            },
        ]),
        nav: [
            {
                text: 'Client',
                items: [
                    {text: 'Unity', link: '/en/client/unity/'},
                    {text: 'Godot', link: '/en/client/godot/'},
                ]
            },
            {text: 'Server', link: '/en/server/'},
            {text: 'Tools', link: '/en/tools/'},
            {text: 'Protobuf', link: '/en/protobuf/'},
            {text: 'Docker', link: '/en/docker/'},
            {text: 'Config', link: '/en/config/'},
            {
                text: 'Community',
                items: [
                    {text: 'QQ Group (467608841)', link: 'https://qm.qq.com/cgi-bin/qm/qr?k=sYFd1nv6m2KZIWFLorZ5pBR0AE5ZhbuL&jump_from=webapi&authKey=oCu+uoL3n35fT5SEt7iLgGtROPxh31n/rHUxRlp0w1f+j38W4tKBuWyRH3KEdwHN'}
                ]
            },
            {text: 'API', link: 'https://gameframex.github.io/GameFrameX.Server/index.html'},
        ],
        outline: {
            level: 'deep',
            label: 'On This Page'
        },
        lastUpdated: {
            text: 'Last updated',
            formatOptions: {
                dateStyle: 'full',
                timeStyle: 'medium',
            }
        },
        editLink: {
            text: 'Edit this page',
            pattern: ({filePath}) => {
                return `https://github.com/AlianBlank/GameFrameX.Docs/edit/main/docs/${filePath}`
            }
        },
        docFooter: {
            prev: false,
            next: false
        },
        lightModeSwitchTitle: 'Switch to light mode',
        darkModeSwitchTitle: 'Switch to dark mode',
        returnToTopLabel: 'Return to top',
        search: {
            provider: 'local',
            options: {
                detailedCompilation: true
            }
        },
    },
}
