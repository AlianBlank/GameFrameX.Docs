import DefaultTheme from 'vitepress/theme'
// import './style/index.css'
// @ts-ignore
import Appreciate from './components/Appreciate.vue'
// @ts-ignore
import Analytics from './components/Analytics.vue'
// @ts-ignore
import DocFooter from "./components/DocFooter.vue";
import {h, nextTick, onMounted, watch} from 'vue'
// import {useLive2d, useWaline} from 'vitepress-theme-website'
import {useData, useRoute} from 'vitepress'

import giscusTalk from 'vitepress-plugin-comment-with-giscus';

// 引入时间线样式
import "vitepress-markdown-timeline/dist/theme/index.css";

// 图片缩放
import mediumZoom from 'medium-zoom';

export default {
    extends: DefaultTheme,
    // 百度统计
    enhanceApp({app, router, siteData}) {
        router.onBeforeRouteChange = (to) => {
            console.log('路由将改变为: ', to);
            // @ts-ignore
            if (typeof _hmt !== 'undefined') {
                // @ts-ignore
                _hmt.push(['_trackPageview', to]);
            }
        };
    },

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
            // 文档底部
            'doc-bottom': () => h(DocFooter),
            // 数据统计分析
            'layout-bottom': () => h(Analytics),
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

        // 图片缩放
        const initZoom = () => {
            // mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }); // 默认
            mediumZoom('.main img', {background: 'var(--vp-c-bg)'}); // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
        };
        onMounted(() => {
            initZoom();
        });
        watch(
            () => route.path,
            () => nextTick(() => initZoom())
        );
        /*
        useWaline({
            serverURL: 'https://gameframex.doc.alianblank.com'
        })
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
        })*/
    },

}
