# 快速上手：五步跑通

这一篇带你把 **数据库 → 服务器 → 客户端** 全链路跑起来。

- **预计耗时**：10~15 分钟（含引擎首次导入时间）
- **开始前**：先完成 [环境准备](./environment.md)（.NET 10 必装；客户端引擎 Unity / Godot 二选一）
- **成功标准**：点运行，看到登录界面，创建角色进入主城 🎉

每一步末尾都有「✅ 验证」，做完检查一下再走下一步，出了问题能立刻定位是哪一步的事。

## 第 1 步：下载项目

任选一种方式：

```shell
# 方式 A：git（推荐，以后好更新）
git clone https://github.com/GameFrameX/GameFrameX.git
cd GameFrameX
```

```text
方式 B：浏览器打开 https://github.com/GameFrameX/GameFrameX
       点绿色按钮 Code → Download ZIP，解压到任意目录
```

国内网络慢可以用镜像：https://gitee.com/GameFrameX/GameFrameX

::: tip 记住三条规则
下载下来的是聚合仓，自带全部生成产物、开箱即跑。但**别改文件夹名字、别挪位置**；改代码要去源仓库。原因见[项目结构详解](./project-structure.md)。
:::

**✅ 验证**：目录里有 `Server/`、`Unity/`、`Godot/`、`Config/`、`Protobuf/`、`docker/` 这些文件夹。

## 第 2 步：准备一个数据库（三种方式任选）

服务器要把玩家存档写进 MongoDB。**拿一个自己的数据库**有三种方式，按你的情况选：

| 方式 | 适合谁 | 要装什么 |
|------|--------|---------|
| A. Docker 本地起（**主线**） | 装了/愿意装 Docker 的人 | Docker Desktop |
| B. MongoDB Atlas 免费云库 | 不想装任何数据库软件的人 | 只需注册个账号 |
| C. 本地直装 MongoDB | 电脑上已有 MongoDB 的人 | 无 |

### 方式 A：Docker 一条命令起（主线）

```shell
cd docker/mongo
docker compose up -d
```

起来的是 MongoDB，账号 `admin` / 密码 `admin`，数据落在 `docker/mongo/database/`。本教程后续命令默认用这条连接串：

```text
mongodb://admin:admin@localhost:27017/?authSource=admin
```

**✅ 验证**：`docker ps` 列表里有一个 mongo 容器、状态 `Up`。

### 方式 B：MongoDB Atlas 官方免费云库（不装 Docker）

[MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) 是 MongoDB 官方云服务，**免费档 512MB**，学习开发完全够用：

1. 注册账号（支持 Google / GitHub 登录）
2. 创建 Cluster 时选 **M0（Free）** 档位，云商和区域随意
3. Database Access 里创建一个数据库用户（记住用户名密码）
4. Network Access 里把 `0.0.0.0/0` 加入白名单（学习用最省事）
5. Clusters → Connect → Drivers，复制连接串，形如：

```text
mongodb+srv://你的用户名:你的密码@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**✅ 验证**：拿到了一条 `mongodb+srv://` 开头、包含你自己用户名密码的连接串。

### 方式 C：本地直装 MongoDB

[官网社区版](https://www.mongodb.com/try/download/community) 安装后保持默认端口 27017，连接串同方式 A。

::: tip 为什么强调「自己的数据库」？
因为第 3 步服务器**默认连的是内置的公网演示库**——那是全世界新手共用的，务必换成你自己的，原因看下一步的红字警告。
:::

## 第 3 步：编译并启动服务器

::: danger ⚠️ 强烈要求：换成你自己的数据库地址
服务器代码里内置的默认数据库地址是**作者提供的公网演示库，可能同时有很多新手在共用它**：你创建的角色别人看得见、别人的数据也会混进来，甚至互相覆盖、随时可能被清空。

**请不要用默认地址跑任何正经测试。** 启动命令里的 `--DataBaseUrl` 参数换成你自己在第 2 步拿到的连接串——这是本地学习环境最重要的一条安全线。
:::

新开一个终端：

```shell
cd Server
dotnet build
cd bin/app_debug
dotnet GameFrameX.Launcher.dll --DataBaseUrl="第2步拿到的连接串"
```

用方式 A（Docker 本地库）时就是：

```shell
dotnet GameFrameX.Launcher.dll --DataBaseUrl="mongodb://admin:admin@localhost:27017/?authSource=admin"
```

**✅ 验证**：浏览器打开 http://localhost:29090/health ，有响应就是活了；同时终端里会滚动打印服务器启动日志。

::: tip 其他端口不用管
TCP 29100 / HTTP 28080 / WS 29110 / 健康检查 29090 默认配置已开好。唯一要换的就是 `--DataBaseUrl`。
:::

::: warning 别关这个终端
服务器是前台进程，关掉终端 = 关掉服务器。第 4 步要用新终端或直接回到引擎编辑器。
:::

### 想用 IDE 启动？（可选）

用 Rider / Visual Studio 打开 `Server/Server.slnx`（打不开就开 `Server/Server.sln`）：

1. 启动项目选 `GameFrameX.Launcher`
2. **把 Working directory（工作目录）设为 `Server/bin/app_debug`**——热更程序集从「当前目录/hotfix」加载，不设会闪退
3. 命令行参数填 `--DataBaseUrl="你的连接串"`

## 第 4 步：客户端连上来（Unity 或 Godot 二选一）

两个客户端功能对齐、默认都连 `127.0.0.1`（TCP 29100 / HTTP 28080），和服务器默认端口正好对上，**不用改任何配置**。

### 4A. Unity

1. 打开 Unity Hub，用装好的编辑器打开项目根目录下的 `Unity/` 文件夹（版本口径见[环境准备](./environment.md)：最低 2019.4，推荐 2022.3.62f2；旧版打开时提示工程由更新版本创建，一路 Continue）
2. 首次打开会自动拉取 Package，**需要联网，耐心等进度条走完**
3. 打开场景：`Assets/Scenes/Launcher.unity`（Project 面板里找到它双击）
4. 点顶部的 **Play ▶️** 按钮

### 4B. Godot

1. 用 **Godot 4.x（.NET 版）** 打开项目根目录下的 `Godot/` 文件夹（Import → 选择 `Godot/project.godot`）
2. 首次打开后先**构建 C#**：点编辑器右上角的 **Build** 按钮（快捷键过程耐心等编译完成）
3. 按 **F5**（或点右上角 ▶️ 运行）——主场景 `Launcher.tscn` 已设为默认，直接跑

::: tip Godot 的插件包要另外下载吗？
不用。框架插件已随仓库放在 `Godot/addons/` 里，开箱即用。只有需要升级框架包时才运行 `python3 tools/sync_packages.py` 重新同步。
:::

**✅ 验证**：游戏窗口里出现登录界面。

## 第 5 步：登录进主城 = 通关

1. 在登录界面注册 / 输入账号
2. 创建角色
3. 进入主城

**🎉 恭喜！客户端 → 服务器 → 数据库全链路已打通。** 你刚创建的角色信息，此刻正存在**你自己的**数据库里。

## 卡住了？速查表

| 现象 | 原因 & 解法 |
|---|---|
| `dotnet` 提示命令不存在 | 没装 .NET SDK 10 或没重开终端，回[环境准备](./environment.md) |
| 服务器启动报连不上数据库 | `--DataBaseUrl` 没带或连接串写错；Atlas 用户检查密码特殊字符是否需要 URL 编码、白名单是否放行 |
| `docker compose` 报错连不上 daemon | Docker Desktop 没启动，打开它等图标变绿 |
| IDE 里启动就闪退 / 找不到 hotfix | Working directory 没设成 `Server/bin/app_debug` |
| Unity 首次打开一直卡在拉包 | 需要联网访问 UPM 私有源和 gitee；检查代理/网络后重试，或用镜像加速 |
| Unity 打开时提示版本不匹配 | 正常现象，Continue 即可；跑不通再换推荐版本 2022.3.62f2 |
| Godot 提示版本过旧 / 脚本报错 | Godot 需要 **4.5.1+** 且必须是 **.NET 版**；打开后先点 Build 再 F5 |
| 点运行后连不上服务器 | 确认第 3 步的服务器终端还开着；核对端口 TCP 29100 / HTTP 28080 |
| 服务器在线但登录失败 | 浏览器访问 http://localhost:29090/health 确认在线；再看服务器终端日志里的报错 |
| 登录进去发现一堆陌生角色 | 你连到内置公网演示库了！停服重启，`--DataBaseUrl` 换成自己的数据库（见第 3 步红字警告） |
| 在本仓库改了代码，第二天没了 | 聚合仓每日同步会覆盖，改动请提交到对应源仓库（见[项目结构详解](./project-structure.md)） |

连远程服务器 / 换机器运行时，客户端连接地址改这些地方：

- **Unity** TCP 地址：`Unity/Assets/Hotfix/UI/Logic/UILogin/UIPlayerList.cs`（`serverIp` / `serverPort`）；HTTP 地址全文搜 `127.0.0.1:28080`（`UILogin.cs` 等）
- **Godot** TCP 地址：`Godot/Assets/Hotfix/UI/` 下对应 UILogin 文件里的 `tcp://127.0.0.1:29100`

## 下一步

→ 去 [跑通之后](./next-steps.md)：学会日常开发三件事（改配置、改协议、改 UI）。
