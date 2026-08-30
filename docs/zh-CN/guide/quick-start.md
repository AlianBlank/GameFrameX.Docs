# 快速上手：五步跑通

这一篇带你把 **数据库 → 服务器 → 客户端** 全链路跑起来。

- **预计耗时**：10~15 分钟（含 Unity 首次导入时间）
- **开始前**：先完成 [环境准备](./environment.md)（.NET 10、Docker、Unity 2022.3.62f2）
- **成功标准**：在 Unity 里点 Play，看到登录界面，创建角色进入主城 🎉

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

**✅ 验证**：目录里有 `Server/`、`Unity/`、`Config/`、`Protobuf/`、`docker/` 这些文件夹。

## 第 2 步：启动本地数据库

```shell
cd docker/mongo
docker compose up -d
```

起来的是 MongoDB 数据库，账号 `admin` / 密码 `admin`，数据落在 `docker/mongo/database/`。

**✅ 验证**：

```shell
docker ps
```

列表里有一个名为 mongo 的容器、状态 `Up` 即可。

::: tip 这一步在干嘛？
服务器的玩家存档要存进数据库。不自己装 MongoDB，用 Docker 起一个最省事。
:::

## 第 3 步：编译并启动服务器

新开一个终端（第 2 步的终端可以关掉，容器在后台跑）：

```shell
cd Server
dotnet build
cd bin/app_debug
dotnet GameFrameX.Launcher.dll --DataBaseUrl="mongodb://admin:admin@localhost:27017/?authSource=admin"
```

**✅ 验证**：浏览器打开 http://localhost:29090/health ，有响应就是活了；同时终端里会滚动打印服务器启动日志。

::: tip 为什么每次启动都要带 --DataBaseUrl？
服务器默认连的是作者演示用的**公网数据库**（方便什么都不配就能跑），本地开发请指到自己刚起的 MongoDB，也就是上面这条参数。其他端口（TCP 29100 / HTTP 28080 / WS 29110 / 健康检查 29090）默认配置已开好，不用管。
:::

::: warning 别关这个终端
服务器是前台进程，关掉终端 = 关掉服务器。第 4 步要用新终端或直接回到 Unity。
:::

### 想用 IDE 启动？（可选）

用 Rider / Visual Studio 打开 `Server/Server.slnx`（打不开就开 `Server/Server.sln`）：

1. 启动项目选 `GameFrameX.Launcher`
2. **把 Working directory（工作目录）设为 `Server/bin/app_debug`**——热更程序集从「当前目录/hotfix」加载，不设会闪退
3. 命令行参数填 `--DataBaseUrl="mongodb://admin:admin@localhost:27017/?authSource=admin"`

## 第 4 步：Unity 客户端连上来

1. 打开 Unity Hub，用 **2022.3.62f2** 打开项目根目录下的 `Unity/` 文件夹
2. 首次打开会自动拉取 Package，**需要联网，耐心等进度条走完**
3. 打开场景：`Assets/Scenes/Launcher.unity`（Project 面板里找到它双击）
4. 点顶部的 **Play ▶️** 按钮

**✅ 验证**：Game 视图里出现登录界面。

::: tip 要改连接地址吗？
不用。客户端默认连 `127.0.0.1`（TCP 29100 / HTTP 28080），和服务器默认端口正好对上。换电脑或连远程服务器时才需要改，位置见文末速查表。
:::

## 第 5 步：登录进主城 = 通关

1. 在登录界面注册 / 输入账号
2. 创建角色
3. 进入主城

**🎉 恭喜！客户端 → 服务器 → 数据库全链路已打通。** 你刚创建的角色信息，此刻正存在本地 MongoDB 里。

## 卡住了？速查表

| 现象 | 原因 & 解法 |
|---|---|
| `dotnet` 提示命令不存在 | 没装 .NET SDK 10 或没重开终端，回[环境准备](./environment.md) |
| 服务器启动报连不上数据库 | `--DataBaseUrl` 参数没带（默认连公网演示库），检查第 3 步命令是否完整 |
| `docker compose` 报错连不上 daemon | Docker Desktop 没启动，打开它等图标变绿 |
| IDE 里启动就闪退 / 找不到 hotfix | Working directory 没设成 `Server/bin/app_debug` |
| Unity 首次打开一直卡在拉包 | 需要联网访问 UPM 私有源和 gitee；检查代理/网络后重试，或用镜像加速 |
| 点 Play 后连不上服务器 | 确认第 3 步的服务器终端还开着；核对端口 TCP 29100 / HTTP 28080 |
| 服务器在线但登录失败 | 浏览器访问 http://localhost:29090/health 确认在线；再看服务器终端日志里的报错 |
| 在本仓库改了代码，第二天没了 | 聚合仓每日同步会覆盖，改动请提交到对应源仓库（见[项目结构详解](./project-structure.md)） |

连远程服务器 / 换机器运行时，客户端连接地址改这两处：

- TCP 地址：`Unity/Assets/Hotfix/UI/Logic/UILogin/UIPlayerList.cs`（`serverIp` / `serverPort`）
- HTTP 地址：`Unity/Assets/Hotfix/UI/Logic/UILogin/UILogin.cs` 等（全文搜 `127.0.0.1:28080`）

## 下一步

→ 去 [跑通之后](./next-steps.md)：学会日常开发三件事（改配置、改协议、改 UI）。
