# 网络

GameFrameX 的 Network 长连接网络组件

**Network 长连接网络组件 (Network Component)** - 提供长连接网络组件相关的接口。

---
[[toc]]

## 心跳消息

心跳消息有些时候每个用户可能会有自己业务的特殊需求。故开放了心跳消息的自定义实现和接收

心跳发送实现 `BasePacketHeartBeatHandler` 基础定义类

为了避免不必要的心跳消息发送，故设计心跳消息为滑动发送机制

实现类可以重写父类的心跳间隔和心跳丢失几次断开链接

- 心跳间隔(`HeartBeatInterval`): 默认为5秒发送一次
- 心跳丢失(`MissHeartBeatCountByClose`): 默认为5次丢失心跳，即触发网络断开

### 最佳实践

```csharp
    public sealed class DefaultPacketHeartBeatHandler : BasePacketHeartBeatHandler
    {
        private readonly ReqHeartBeat _reqHeartBeat;

        public DefaultPacketHeartBeatHandler()
        {
            _reqHeartBeat = new ReqHeartBeat();
        }

        public override MessageObject Handler()
        {
            _reqHeartBeat.Timestamp = GameTimeHelper.UnixTimeMilliseconds();
            _reqHeartBeat.UpdateUniqueId();
            return _reqHeartBeat;
        }
    }
```

## 消息日志打印

### 宏定义

由于大量的日志打印.可能会找不到自己的内容.所以增加了打印日志的宏定义

- `ENABLE_GAMEFRAMEX_NETWORK_RECEIVE_LOG`  接收消息日志的打印
- `ENABLE_GAMEFRAMEX_NETWORK_SEND_LOG`  发送消息日志的打印

宏定义的快捷开关可以通过菜单 `GameFrameX` > `Log Scripting Define Symbols` > 下的Network组.快捷设置

### 消息ID打印忽略

::: tip

必须在开启宏定义打印的情况才会生效

:::

由于有些时候可能不需要打印干扰的日志.故增加了根据ID忽略打印的功能

在Network 组件上配置.可以多个配置.当接收到该消息ID的时候.跳过日志打印

## 推送消息接收(`INotifyMessage`)

::: tip
个人建议。该消息主要为服务器通知消息触发。建议做成单例类。收到消息之后，组装完自己的消息结构之后二次分发事件。
:::

你也可以在页面中初始化的时候注册。界面关闭的时候取消注册

### 注意点

- 实现类必须继承实现`IMessageHandler` 接口。
- 在函数上标记 `MessageHandler` 第一个参数为消息类型`必须`实现`INotifyMessage`. 第二个参数为接收的函数名称。 `注意`： 不是消息类型。
- 在一个类中。不要监听一个消息多次。不然可能会出现未知错误

### 最佳实践

```csharp

    /// <summary>
    /// 背包 管理器
    /// </summary>
    public sealed class BagManager : GameFrameworkSingleton<BagManager>, IMessageHandler
    {
        /// <summary>
        /// 监听道具变化通知
        /// </summary>
        /// <param name="msg"></param>
        [MessageHandler(typeof(NotifyBagInfoChanged), nameof(OnNotifyBagInfoChanged))]
        private void OnNotifyBagInfoChanged(NotifyBagInfoChanged msg)
        {
            Log.Debug(msg);
        }

        /// <summary>
        /// 由于是单例对象。所以在初始化的时候自动调用一次注册消息
        /// </summary>
        public BagManager()
        {
            Register();
        }
        
        /// <summary>
        /// 注册消息。请勿多次调用
        /// </summary>
        public void Register()
        {
            ProtoMessageHandler.Add(this);
        }
    }

```

## 使用方式(任选其一)

1. 直接在 `manifest.json` 的文件中的 `dependencies` 节点下添加以下内容
   ```json
      {"com.gameframex.unity.network": "https://github.com/GameFrameX/com.gameframex.unity.network.git"}
    ```
2. 在Unity 的`Packages Manager` 中使用`Git URL`
   的方式添加库,地址为：https://github.com/GameFrameX/com.gameframex.unity.network.git

3. 直接下载仓库放置到Unity 项目的`Packages` 目录下。会自动加载识别
