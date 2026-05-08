# GameFrameX.Docs

GameFrameX 官方文档站 —— 下一代游戏开发框架的完整技术文档。

## GameFrameX 是什么

GameFrameX 是一个全栈游戏开发框架，提供从客户端到服务端的完整解决方案：

- **C# 全端统一** — 前后端使用同一语言，无上下文切换
- **Actor 架构** — 无锁并发模型，消息驱动，状态隔离
- **真正热更新** — 基于 HybridCLR 的运行时热更新，零重启
- **Protocol Buffers** — 跨语言二进制序列化，前后向兼容
- **LuBan 配置** — Excel 驱动的配置管理，自动生成多语言代码
- **Docker 部署** — 一键容器化部署，水平扩缩容

## 支持语言

文档提供 5 种语言版本，每种语言包含 131 篇文档，完整覆盖所有模块：

| 语言 | 路径 |
|:-----|:-----|
| English | `/en/` |
| 简体中文 | `/zh-CN/` |
| 繁體中文 | `/zh-TW/` |
| 日本語 | `/ja/` |
| 한국어 | `/ko/` |

站点首页会根据浏览器语言自动跳转到对应语言版本。

## 文档内容

| 模块 | 说明 |
|:-----|:-----|
| Guide | 框架介绍、环境准备、快速开始 |
| Client - Unity | Unity 客户端集成、30+ 组件文档 |
| Client - Godot | Godot 客户端集成 |
| Server | 服务端架构、组件、扩展方法、基础库 |
| Tools | Protobuf 代码生成工具 |
| Docker | 容器化构建与部署 |
| Config | 配置系统说明 |
| FAQ | 常见问题解答 |

## 本地开发

### 环境要求

- Node.js 18+
- npm 9+

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run docs:dev
```

### 构建生产版本

```bash
npm run docs:build
```

### 预览构建结果

```bash
npm run docs:preview
```

## 技术栈

| 组件 | 技术 |
|:-----|:-----|
| 静态站生成 | [VitePress](https://vitepress.dev) 1.6+ |
| 前端框架 | Vue 3 |
| 侧边栏生成 | vitepress-sidebar |
| 图表支持 | vitepress-plugin-mermaid |
| 图片缩放 | medium-zoom |
| 评论系统 | Giscus (GitHub Discussions) |
| 搜索 | VitePress 内置本地搜索 |

## 项目结构

```
docs/
├── .vitepress/          # VitePress 配置
│   ├── config.mts       # 主配置文件
│   ├── locales/         # 各语言配置
│   └── theme/           # 自定义主题和组件
├── en/                  # English 文档
├── zh-CN/               # 简体中文文档
├── zh-TW/               # 繁體中文文档
├── ja/                  # 日本語ドキュメント
├── ko/                  # 한국어 문서
├── index.md             # 语言自动跳转页
└── public/              # 静态资源
```

## 相关链接

- 框架源码：[github.com/GameFrameX/gameframex](https://github.com/GameFrameX/gameframex)
- Gitee 镜像：[gitee.com/GameFrameX/gameframex](https://gitee.com/GameFrameX/gameframex)
- API 文档：[GameFrameX.Server API](https://gameframex.github.io/GameFrameX.Server/index.html)
- 视频教程：[Bilibili](https://www.bilibili.com/video/BV1yrpeepEn7)
- QQ 交流群：467608841

## License

- 本文档仓库：MIT License
- GameFrameX 框架：Apache License

Copyright &copy; 2019-present Blank (AlianBlank)
