# 环境准备

跑通 GameFrameX 需要装几样东西。这一篇教你**每样是什么、为什么需要、怎么装、怎么确认装好了**。

## 总览

| 要装什么 | 版本 | 必须吗 | 干什么用 |
|---------|------|--------|---------|
| .NET SDK | **10.0 或以上** | ✅ 必须 | 编译运行服务器、跑配置/协议工具 |
| Unity 编辑器 | **最低 2019.4**，推荐 **2022.3.62f2** | ✅ 必须（跑 Unity 客户端） | 打开和运行 Unity 客户端工程 |
| Godot 编辑器（.NET 版） | **最低 4.5.1**，推荐 **4.7** | ✅ 必须（跑 Godot 客户端） | 打开和运行 Godot 客户端工程 |
| Git | 任意新版 | 🔸 可选 | 下载项目用；不用 Git 也可以直接下 ZIP |
| 代码编辑器 | - | 🔸 可选 | 写代码用（Rider / VS / VSCode） |
| Docker Desktop | 任意新版 | 🔸 可选 | 一条命令启动本地 MongoDB（**研发期不装也行**，见下） |

::: tip Unity 和 Godot 装哪个？
两个客户端工程功能对齐，**二选一即可**跑通教程，连的是同一套服务器。推荐新手从 Unity 开始（文档和生态更全），已有 Godot 经验的直接用 Godot。
:::

## ① .NET SDK（必须）

**是什么**：微软的开发平台，服务器就是用它写的。Godot 客户端是 C# 工程，也依赖它。

**怎么装**：

1. 打开 https://dotnet.microsoft.com/download
2. 下载 **.NET SDK 10.0**（注意是 SDK，不是 Runtime）
3. 安装时一路默认即可

**验证装好了**——打开终端（Windows 用 PowerShell），输入：

```shell
dotnet --version
```

输出 `10.x.x` 开头的数字就成功了。

::: warning 常见问题
- 提示 `dotnet: command not found`：重开一个终端窗口再试；还不行就重装
- 输出的是 6/7/8 等其他数字：说明装了旧版或只装了 Runtime，需要装 **SDK 10**
:::

## ② 客户端引擎：Unity 或 Godot（二选一，必须）

### 方案 A：Unity（推荐新手）

**版本口径**：

| 类型 | 版本 | 说明 |
|------|------|------|
| **最低支持** | **2019.4** | 框架全部 UPM 包声明的最低版本；建议用该系列最终版 **2019.4.40f1** |
| **推荐** | **2022.3.62f2** | 工程锁定的版本（`ProjectVersion.txt`），开箱零警告 |

::: tip 不强制用新版本
用 2019.4.40f1 也能跑通本教程。区别只是：旧版打开工程时 Unity 会提示「工程由更新版本创建」，一路 Continue 即可。**已经装了别的版本？先试直接打开，跑不通再换推荐版。**
:::

**怎么装指定版本（2022.3.62f2）**：

1. 安装 [Unity Hub](https://unity.com/download)
2. Unity Hub → **Installs（安装）** → **Install Editor（安装编辑器）**
3. 找不到 2022.3.62f2？点下方的 **Archive → Download archive**，在官网归档页找到 2022.3.62f2 点 **Unity Hub** 链接安装
4. 安装时保持默认模块即可

**验证装好了**：Unity Hub 的 Installs 列表里出现对应版本。

### 方案 B：Godot

**版本口径**：

| 类型 | 版本 | 说明 |
|------|------|------|
| **最低支持** | **4.5.1** | 主仓声明的要求 |
| **推荐** | **4.7** | 工程锁定的版本（`project.godot` features） |

::: warning 必须下载「.NET 版」
Godot 官网同一版本有两个包：标准版（GDScript）和 **.NET 版（C# 支持）**。本项目是 C# 工程，**务必下载 .NET 版**——文件名带 `_mono` 或页面标注 `.NET` 的那个。
:::

**怎么装**：

1. 打开 https://godotengine.org/download
2. 下载 **Godot 4.x（.NET 版）**——免安装，解压即用

**验证装好了**：双击打开 Godot，能正常进项目管理器即可；打开本项目后编辑器有 C# 构建能力。

## ③ Git（可选）

**是什么**：代码版本管理工具，这里只用来下载项目。

**怎么装**：https://git-scm.com/downloads ，一路默认。

**验证**：

```shell
git --version
```

::: tip 不想装 Git？
直接去 https://github.com/GameFrameX/GameFrameX 页面点 **Code → Download ZIP** 解压，效果一样。
:::

## ④ 代码编辑器（可选）

写代码需要顺手的编辑器，三选一：

| 编辑器 | 下载 | 适合 |
|--------|------|------|
| Rider（推荐） | https://www.jetbrains.com/rider/download/ | 服务器 + Unity/Godot 一把梭，对 C# 支持最好 |
| Visual Studio | https://visualstudio.microsoft.com/downloads/ | Windows 用户常用，装「.NET 桌面开发」+「Unity」负载 |
| VS Code | https://code.visualstudio.com/ | 轻量免费，装 C# Dev Kit 扩展 |

## ⑤ Docker Desktop（可选，研发期不装也行）

**是什么**：容器工具，用来一条命令起本地 MongoDB 数据库。

::: tip 不想装 Docker？有官方免费替代
数据库不是研发期的硬性依赖，三种方式任选其一（[快速上手第 2 步](./quick-start.md)会详细讲）：

1. **装 Docker**：本地一条命令起 MongoDB（本教程主线，最省心）
2. **不装任何东西**：注册 [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) 官方云库，**免费 512MB**，学习开发完全够用
3. **自己装 MongoDB**：[官网社区版](https://www.mongodb.com/try/download/community)直装，配置略繁琐
:::

**怎么装（选 Docker 方案时）**：

1. 打开 https://www.docker.com/products/docker-desktop/
2. 下载对应系统的 Docker Desktop 并安装
3. 安装完**启动一次 Docker Desktop**（它是常驻应用，要让它在后台跑着）

**验证装好了**：

```shell
docker --version
docker compose version
```

两个命令都有版本输出即可。

::: warning 常见问题
- `docker: command not found`：Docker Desktop 没装或没启动
- `Cannot connect to the Docker daemon`：Docker Desktop 没在运行，打开它等状态栏图标变绿
- Windows 上要求开启 WSL2：按 Docker 安装器提示操作后重启
:::

## 装完了？自测一下

```shell
dotnet --version      # 应输出 10.x.x
git --version         # 应输出 git version ...（可选）
```

加上引擎二选一（Unity Hub 里装好编辑器，或 Godot .NET 版解压可用），就可以进入 [快速上手](./quick-start.md) 了。
