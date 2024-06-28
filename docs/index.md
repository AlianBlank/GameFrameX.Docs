---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Game Frame X 文档"
  text: ""
  image:
    src: /logo.png
  tagline: 一体化游戏前后端解决方案
  actions:
    - theme: brand
      text: 开启 GameFrameX =>
      link: /guide/introduce
    - theme: alt
      text: 快速开始Unity客户端
      link: /unity/
    - theme: alt
      text: 快速开始服务端
      link: /server/

features:
  - title: 没有语言学习障碍
    details: 前后端统一使用C#语言进行开发
  - title: 成熟的工具链
    details: 从研发到上线的完整工具链
  - title: 更强大的包容性
    details: 前后端均可自行扩展自己的组件实现
  - title: 更少入侵的热更新解决方案
    details: 使用HyBridCLR 处理客户端的热更新
  - title: 更广泛的协议
    details: 使用Google Proto Buffer 消息通讯
  - title: 更强大的配置方案
    details: 使用LuBan 的强大游戏配置方案,支持更多的语言及代码导出
  - title: 更容易、快速部署的启动服务器
    details: 使用Docker容器来实现快速的迁移、部署、启动和扩容.可以直接结合DevOps 来快速迭代
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 60%, #41d1ff);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 1920px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 1080px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>


