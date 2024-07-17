import DefaultTheme from 'vitepress/theme'
// import './style/index.css'
// @ts-ignore
import Appreciate from './components/Appreciate.vue'
import {h} from 'vue'
import {useData, useRoute} from 'vitepress'

import giscusTalk from 'vitepress-plugin-comment-with-giscus';
import {useLive2d} from 'vitepress-theme-website'

export default {
    extends: DefaultTheme,

    Layout: () => {
        const props: Record<string, any> = {}
        // 获取 frontmatter
        const {frontmatter} = useData()

        /* 添加自定义 class */
        if (frontmatter.value?.layoutClass) {
            props.class = frontmatter.value.layoutClass
        }

        return h(DefaultTheme.Layout, props, {
            'doc-footer-before': () => h(Appreciate),
        })
    },

    setup() {
        const route = useRoute();

        // Get frontmatter and route
        const {frontmatter} = useData();


        // giscus配置
        giscusTalk({
                repo: 'AlianBlank/GameFrameX.Docs', //仓库
                repoId: 'R_kgDOMN61ag', //仓库ID
                category: 'Announcements', // 讨论分类
                categoryId: 'DIC_kwDOMN61as4Cgd2T', //讨论分类ID
                mapping: 'pathname',
                inputPosition: 'bottom',
                lang: 'zh-CN',
            },
            {
                frontmatter, route
            },
            //默认值为true，表示已启用，此参数可以忽略；
            //如果为false，则表示未启用
            //您可以使用“comment:true”序言在页面上单独启用它
            true
        );
        //看板娘
        useLive2d({
            enable: true,
            model: {
                // 模型更换地址:https://github.com/iCharlesZ/vscode-live2d-models#url
                url: 'https://raw.githubusercontent.com/iCharlesZ/vscode-live2d-models/master/model-library/bilibili-22/index.json'
            },
            display: {
                position: 'right',
                width: '135px',
                height: '300px',
                xOffset: '35px',
                yOffset: '5px'
            },
            mobile: {
                show: true
            },
            react: {
                opacity: 0.8
            }
        })
    },

}
