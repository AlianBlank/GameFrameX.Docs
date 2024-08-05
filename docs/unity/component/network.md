# 网络

GameFrameX 的 Network 长连接网络组件

**Network 长连接网络组件 (Network Component)** - 提供长连接网络组件相关的接口。

---
[[toc]]

## 宏定义

由于大量的日志打印.可能会找不到自己的内容.所以增加了打印日志的宏定义

- `ENABLE_GAMEFRAMEX_NETWORK_RECEIVE_LOG`  接收消息日志的打印
- `ENABLE_GAMEFRAMEX_NETWORK_SEND_LOG`  发送消息日志的打印

宏定义的快捷开关可以通过菜单 `GameFrameX` > `Log Scripting Define Symbols` > 下的Network组.快捷设置

## 消息ID打印忽略

::: tip

必须在开启宏定义打印的情况才会生效

:::

由于有些时候可能不需要打印干扰的日志.故增加了根据ID忽略打印的功能

在Network 组件上配置.可以多个配置.当接收到该消息ID的时候.跳过日志打印

## 使用方式(任选其一)

1. 直接在 `manifest.json` 的文件中的 `dependencies` 节点下添加以下内容
   ```json
      {"com.gameframex.unity.network": "https://github.com/GameFrameX/com.gameframex.unity.network.git"}
    ```
2. 在Unity 的`Packages Manager` 中使用`Git URL`
   的方式添加库,地址为：https://github.com/GameFrameX/com.gameframex.unity.network.git

3. 直接下载仓库放置到Unity 项目的`Packages` 目录下。会自动加载识别
