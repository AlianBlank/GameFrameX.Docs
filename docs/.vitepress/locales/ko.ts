import {generateSidebar} from 'vitepress-sidebar';

const sidebarOptions = {
    useTitleFromFileHeading: true,
    useFolderTitleFromIndexFile: true,
    collapseDepth: 3,
    removePrefixAfterOrdering: true,
    prefixSeparator: '.',
};

export const ko = {
    label: '한국어',
    lang: 'ko',
    link: '/ko/',
    themeConfig: {
        sidebar: generateSidebar([
            {
                ...sidebarOptions,
                documentRootPath: 'docs/ko',
                scanStartPath: '/',
                resolvePath: '/ko/',
                manualSortFileNameByPriority: ['guide', 'client', 'server', 'tools', 'protobuf', 'fqa', 'docker', 'config', 'development-history'],
            },
        ]),
        nav: [
            {
                text: '클라이언트',
                items: [
                    {text: 'Unity', link: '/ko/client/unity/'},
                    {text: 'Godot', link: '/ko/client/godot/'},
                ]
            },
            {text: '서버', link: '/ko/server/'},
            {text: '도구', link: '/ko/tools/'},
            {text: 'Protobuf', link: '/ko/protobuf/'},
            {text: 'Docker', link: '/ko/docker/'},
            {text: '설정', link: '/ko/config/'},
            {
                text: '커뮤니티',
                items: [
                    {text: 'QQ 그룹 (467608841)', link: 'https://qm.qq.com/cgi-bin/qm/qr?k=sYFd1nv6m2KZIWFLorZ5pBR0AE5ZhbuL&jump_from=webapi&authKey=oCu+uoL3n35fT5SEt7iLgGtROPxh31n/rHUxRlp0w1f+j38W4tKBuWyRH3KEdwHN'}
                ]
            },
            {text: 'API', link: 'https://gameframex.github.io/GameFrameX.Server/index.html'},
        ],
        outline: {
            level: 'deep',
            label: '이 페이지에서'
        },
        lastUpdated: {
            text: '마지막 업데이트',
            formatOptions: {
                dateStyle: 'full',
                timeStyle: 'medium',
            }
        },
        editLink: {
            text: '이 페이지 편집',
            pattern: ({filePath}) => {
                return `https://github.com/AlianBlank/GameFrameX.Docs/edit/main/docs/${filePath}`
            }
        },
        docFooter: {
            prev: false,
            next: false
        },
        lightModeSwitchTitle: '라이트 모드로 전환',
        darkModeSwitchTitle: '다크 모드로 전환',
        returnToTopLabel: '맨 위로 돌아가기',
        search: {
            provider: 'local',
            options: {
                detailedCompilation: true
            }
        },
    },
}
