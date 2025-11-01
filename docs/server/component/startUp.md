# 启动器

[[toc]]
---

游戏进程启动器。处理进程的启动和退出和异常监控

## 启动标记(StartUpTagAttribute)

标记启动服务器的类型和启动优先级.
该标记需要配合 `IAppStartUp` 接口使用.

- 启动优先级.值越小越优先
- 服务器类型: 参考 `ServerType` 类型

## 启动器基础接口(IAppStartUp)

定义了启动器的常用函数
实现该接口的子类必须标记 `StartUpTagAttribute` 才会进入启动队列

### 初始化

初始化服务器的相关配置和启动参数

### 启动

使用启动参数和配置启动

### 终止

终止服务器的运行.可选终止原因

## 启动器

用于启动游戏服务器实例对象.其中会监控程序的异常退出和其他的退出方式

所有的游戏服务器都通过该接口启动.


### 游戏逻辑服务器

```csharp

using GameFrameX.Core.Components;
using GameFrameX.DataBase.Abstractions;
using GameFrameX.DataBase.Mongo;

namespace GameFrameX.Launcher.StartUp;

/// <summary>
/// 游戏服务器
/// </summary>
[StartUpTag(GlobalConst.GameServiceName)]
internal sealed class AppStartUpGame : AppStartUpBase
{
    public override async Task StartAsync()
    {
        Exception exception = null;
        try
        {
            LogHelper.InfoConsole($"开始启动服务器{Setting.ServerType}");
            var hotfixPath = Directory.GetCurrentDirectory() + "/hotfix";
            if (!Directory.Exists(hotfixPath))
            {
                Directory.CreateDirectory(hotfixPath);
            }

            LogHelper.DebugConsole("开始配置Actor限制逻辑...");
            ActorLimit.Init(ActorLimit.RuleType.None);
            LogHelper.DebugConsole("配置Actor限制逻辑结束...");

            LogHelper.DebugConsole("开始启动数据库服务...");
            var initResult = await GameDb.Init<MongoDbService>(new DbOptions { ConnectionString = Setting.DataBaseUrl, Name = Setting.DataBaseName });
            if (initResult == false)
            {
                throw new InvalidOperationException("数据库服务启动失败");
            }

            LogHelper.DebugConsole("启动数据库服务 结束...");

            LogHelper.DebugConsole("注册组件开始...");
            await ComponentRegister.Init(typeof(AppsHandler).Assembly);
            LogHelper.DebugConsole("注册组件结束...");

            LogHelper.DebugConsole("开始加载热更新模块...");
            await HotfixManager.LoadHotfixModule(Setting);
            LogHelper.DebugConsole("加载热更新模块结束...");

            LogHelper.DebugConsole("进入游戏主循环...");
            GlobalSettings.LaunchTime = DateTime.Now;
            GlobalSettings.IsAppRunning = true;

            LogHelper.InfoConsole($"服务器 {Setting.ServerType} 启动结束...");
            await AppExitToken;
        }
        catch (Exception e)
        {
            LogHelper.InfoConsole($"服务器执行异常，e:{e}");
            LogHelper.Fatal(e);
            exception = e;
        }

        LogHelper.InfoConsole("退出服务器开始");
        if (exception != null)
        {
            await HotfixManager.Stop(exception.Message + exception.StackTrace);
        }
        else
        {
            await HotfixManager.Stop("正常退出服务器");
        }

        LogHelper.InfoConsole("退出服务器成功");
    }

    protected override void Init()
    {
        if (Setting == null)
        {
            Setting = new AppSetting
            {
                ServerId = GlobalConst.GameServiceServerId,
                ServerType = GlobalConst.GameServiceName,
                ServerInstanceId = 40970283642695,
                InnerPort = 29100,
                OuterPort = 29100,
                MetricsPort = 29090,
                HttpPort = 28080,
                WsPort = 29110,
                MinModuleId = 1,
                MaxModuleId = short.MaxValue,
                HttpIsDevelopment = true,
                IsDebug = true,
                IsDebugSend = true,
                IsDebugReceive = true,
                IsDebugReceiveHeartBeat = false,
                IsDebugSendHeartBeat = false,
                DataBaseUrl = "mongodb://mongo_axzMtb:mongo_xx1@127.0.0.1:27017/?authSource=admin",
                DataBaseName = "gameframex"
            };
        }

        base.Init();
    }
}

```