# 环境准备

跑通 GameFrameX 需要装 4 样东西。这一篇教你**每样是什么、为什么需要、怎么装、怎么确认装好了**。

## 总览

| 要装什么 | 版本 | 必须吗 | 干什么用 |
|---------|------|--------|---------|
| .NET SDK | **10.0 或以上** | ✅ 必须 | 编译运行服务器、跑配置/协议工具 |
| Docker Desktop | 任意新版 | ✅ 必须 | 一条命令启动本地 MongoDB 数据库 |
| Unity 编辑器 | **2022.3.62f2** | ✅ 必须（要跑客户端） | 打开和运行 Unity 客户端工程 |
| Git | 任意新版 | 🔸 可选 | 下载项目用；不用 Git 也可以直接下 ZIP |
| 代码编辑器 | - | 🔸 可选 | 写代码用（Rider / VS / VSCode） |

::: tip 版本从哪来的？
- .NET 10 是服务器和工具链的硬要求，装低版本后面全卡
- Unity 版本以工程文件 `Unity/ProjectSettings/ProjectVersion.txt` 锁定的为准，装别的版本打开会提示升级工程，可能引入兼容问题
:::

## ① .NET SDK（必须）

**是什么**：微软的开发平台，服务器就是用它写的。

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

## ② Docker Desktop（必须）

**是什么**：容器工具。项目用它一键启动 MongoDB 数据库，你不用自己去官网下载安装配置 MongoDB。

**怎么装**：

1. 打开 https://www.docker.com/products/docker-desktop/
2. 下载对应系统的 Docker Desktop 并安装
3. 安装完**启动一次 Docker Desktop**（ macOS / Windows 上它是常驻应用，要让它在后台跑着）

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

## ③ Unity 编辑器（要跑客户端就必须）

**是什么**：游戏引擎编辑器，客户端工程用它打开。

**怎么装指定版本（2022.3.62f2）**：

1. 安装 [Unity Hub](https://unity.com/download)
2. Unity Hub → **Installs（安装）** → **Install Editor（安装编辑器）**
3. 找不到 2022.3.62f2？点下方的 **Archive → Download archive**，在官网归档页找到 2022.3.62f2 点 **Unity Hub** 链接安装
4. 安装时保持默认模块即可（Windows 上如后续要打包可补装对应 Build Support 模块）

**验证装好了**：Unity Hub 的 Installs 列表里出现 2022.3.62f2。

::: tip 网络提示
Unity 首次打开工程需要联网拉取 Package（含私有源和 gitee），网络受限会卡住，见[快速上手](./quick-start.md)的速查表。
:::

## ④ Git（可选）

**是什么**：代码版本管理工具，这里只用来下载项目。

**怎么装**：https://git-scm.com/downloads ，一路默认。

**验证**：

```shell
git --version
```

::: tip 不想装 Git？
直接去 https://github.com/GameFrameX/GameFrameX 页面点 **Code → Download ZIP** 解压，效果一样。
:::

## ⑤ 代码编辑器（可选）

写代码需要顺手的编辑器，三选一：

| 编辑器 | 下载 | 适合 |
|--------|------|------|
| Rider（推荐） | https://www.jetbrains.com/rider/download/ | 服务器 + Unity 一把梭，对 .NET 和 Unity 支持最好 |
| Visual Studio | https://visualstudio.microsoft.com/downloads/ | Windows 用户常用，装「.NET 桌面开发」+「Unity」负载 |
| VS Code | https://code.visualstudio.com/ | 轻量免费，装 C# Dev Kit 扩展 |

## 装完了？自测一下

四条命令全部有正常输出，环境就绪：

```shell
dotnet --version      # 应输出 10.x.x
docker --version      # 应输出 Docker version ...
git --version         # 应输出 git version ...（可选）
```

加上 Unity Hub 里装好 2022.3.62f2，就可以进入 [快速上手](./quick-start.md) 了。
