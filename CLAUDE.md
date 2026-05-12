# GameFrameX Docs

GameFrameX 多语言文档站点，基于 **Rspress** 构建。

## 技术栈

- **框架**: [Rspress](https://rspress.dev/) (`@rspress/core` ^2.0.11)
- **构建**: Rspack (Rspress 内置)
- **SSG**: 已禁用 (`ssg: false`)
- **部署**: 静态站点

## 项目结构

```
├── rspress.config.ts    # 主配置（locales、plugins、themeConfig）
├── i18n.json            # UI 文案多语言映射
├── docs/                # 文档源文件（按语言分目录）
│   ├── en/              # English
│   ├── zh-CN/           # 简体中文
│   ├── zh-TW/           # 繁體中文
│   ├── ja/              # 日本語
│   ├── ko/              # 한국어
│   └── public/          # 静态资源（favicon、logo 等）
├── theme/               # 自定义主题覆盖
│   ├── index.tsx        # 主题入口（导出 DocFooter 等）
│   ├── DocFooter.tsx    # 文档页脚组件
│   └── index.css
├── styles/
│   └── global.css       # 全局样式
├── scripts/               # 构建辅助脚本
└── dist/                # 构建输出
```

## 支持的语言

| Lang Code | 语言       | 路由前缀   |
|-----------|-----------|-----------|
| `en`      | English   | `/en/`    |
| `zh-CN`   | 简体中文  | `/zh-CN/` |
| `zh-TW`   | 繁體中文  | `/zh-TW/` |
| `ja`      | 日本語    | `/ja/`    |
| `ko`      | 한국어    | `/ko/`    |

默认语言：`en`（`rspress.config.ts` 中 `lang: 'en'`）。

## 常用命令

```bash
npm run dev          # 本地开发
npm run build        # 生产构建
npm run build:ci     # CI 构建（限制内存）
npm run preview      # 预览构建结果
```

## 多语言文档规则

- 每个语言目录结构必须保持一致（相同的文件路径）
- 导航配置在各语言目录的 `_nav.json` 中定义
- `i18n.json` 存放 UI 层面的翻译文本（按钮、标签等）
- 新增文档需在所有语言目录下创建对应 `.md` 文件

## 插件

| 插件 | 用途 |
|------|------|
| `@rspress/plugin-container-syntax` | 自定义容器语法（tip、warning 等） |
| `@rspress/plugin-last-updated` | 页面最后更新时间 |
| `@rspress/plugin-client-redirects` | 客户端 URL 重定向 |
| `rspress-plugin-mermaid` | Mermaid 图表支持 |

## 注意事项

- `ssg: false` — 站点为纯 CSR 模式
- 文档中的 C# 泛型语法（如 `<T>`）需要转义，否则会被当作 HTML 标签解析
- 首次访问自动根据浏览器语言跳转（`rspress.config.ts` head 脚本）
