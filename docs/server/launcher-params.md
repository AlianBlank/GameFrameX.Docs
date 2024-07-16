# 启动模式

[[toc]]

---

解析多种启动方式的优先级参数解析

## 参数优先级

命令行参数 > 环境变量 > 配置文件 > 默认内部配置

## 参数解析

| 参数定义                | 参数名称              | 必须 | 具体描述                                               |
|---------------------|-------------------|----|----------------------------------------------------|
| ServerType          | 服务器类型             | 是  | 启动的服务器类型.从枚举`ServerType`中获取.                       |
| APMPort             | APM监控端口           | 否  | 不配置将不会启动.配置建议29091                                 |
| IsDebug             | 是否是Debug模式        | 是  | 打印消息的开关.不开将不会记录                                    |
| IsDebugSend         | 是否打印发送的消息内容       | 否  | 打印发送消息的内容.必须在开始`IsDebug` 的情况下生效                    |
| IsDebugReceive      | 是否打印接收的消息内容       | 否  | 打印接收消息的内容.必须在开始`IsDebug` 的情况下生效                    |
| ServerId            | 服务器ID             | 是  | 服务器ID.每个服唯一.                                       |
| SaveDataInterval    | 数据落地的间隔           | 是  | 数据存档的时间间隔.单位毫秒.建议配置`5`分钟                           |
| InnerIp             | 监听的IP             | 是  | 监听的本地IP.建议配置`0.0.0.0` 或`127.0.0.1`                 |
| InnerPort           | 本地端口              | 是  | 监听的本地端口                                            |
| OuterIp             | 外部IP              | 是  | 给外部访问的IP.只有发现中心启用的时候才有效                            |
| OuterPort           | 外部端口              | 是  | 给外部访问的端口.只有发现中心启用的时候才有效                            |
| HttpCode            | HTTP代码            | 是  | HTTP的内部代码.建议配置为:`inner_httpcode`                   |
| HttpUrl             | HTTP地址            | 是  | HTTP的管理地址                                          |
| HttpPort            | HTTP端口            | 是  | HTTP的管理端口                                          |
| HttpsPort           | Https端口           | 否  | HTTPS的管理端口,目前保留                                    |
| WsPort              | WebSocket 端口      | 否  | WebSocket 端口.不配置将不会启动WebSocket 服务                  |
| WssPort             | WebSocket 加密端口    | 否  | WebSocket 加密端口.不配置将不会启动WebSocket 服务                |
| WssCertFilePath     | WebSocket 加密端口的证书 | 否  | WebSocket 加密证书地址                                   |
| MinModuleId         | 最小的处理消息模块ID       | 是  | 游戏逻辑模块的最小消息模块ID,从10-30000                          |
| MaxModuleId         | 最大的处理消息模块ID       | 是  | 游戏逻辑模块的最大消息模块ID,从10-30000,建议配置成一样.如果是单服务器.则配置范围为最大 |
| DataBaseUrl         | 数据库连接地址           | 是  | 数据库的连接字符串地址                                        |
| DataBaseName        | 数据库的名称            | 是  | 数据库的名称                                             |
| Language            | 服务器的语言.           | 否  | 服务器可能在不同的国家或者不同地区的玩家服务.可能依照这个来区分.目前没有实际用途          |
| DataCenter          | 数据中心,保留           | 否  | 数据中心.                                              |
| DiscoveryCenterIp   | 发现中心IP或地址         | 否  | 连接到发现中心的地址.只有在多进程完备的情况下生效                          |
| DiscoveryCenterPort | 发现中心端口            | 否  | 连接到发现中心的端口.只有在多进程完备的情况下生效                          |
| DBIp                | 数据库IP或地址          | 否  | 数据服务器地址.只有在多进程完备的情况下生效                             |
| DBPort              | 数据库端口             | 否  | 数据服务器端口.只有在多进程完备的情况下生效                             |

## 最佳实践

### 命令行参数(主要是在本地或命令行方式启动)

使用方式.

```shell

GameFrameX.Launcher.exe --ServerType Game --ServerId 9000 --APMPort 29090 --InnerIp 127.0.0.1 --InnerPort 29001 --OuterIp 127.0.0.1 --OuterPort 29010 --MinModuleId 1 --MaxModuleId 9999 --WsPort 29110 --DiscoveryCenterIp 127.0.0.1 --DiscoveryCenterPort 21001 --HttpCode inner_httpcode --DataBaseUrl "mongodb+srv://gameframex:xxx@gameframex.db.mongodb.net/?retryWrites=true&w=majority" --DataBaseName gameframex

```

### 环境变量(主要是给Docker使用)

```yaml
services:
  server.game:
    image: registry.cn-shenzhen.aliyuncs.com/gameframex/server.launcher:1.0.0
    container_name: game
    ports:
      - 20001:20001
      - 8898:8898
      - 25001:25001
    environment:
      - ServerType=Game
      - ServerId=000
      - APMPort=9090
      - InnerIp=127.0.0.1
      - InnerPort=9001
      - OuterIp=127.0.0.1
      - OuterPort=9010
      - MinModuleId=
      - MaxModuleId=999
      - WsPort=9110
      - DiscoveryCenterIp=127.0.0.1
      - DiscoveryCenterPort=1001
      - HttpCode=inner_httpcode
      - DataBaseUrl="mongodb+srv://gameframex:xxx@gameframex.db.mongodb.net/?retryWrites=true&w=majority"
      - DataBaseName=gameframex
    volumes:
      - "./running/hotfix:/app/hotfix"
      - "./running/json:/app/json"

```

### 配置文件

文件路径`GameFrameX.Launcher/Configs/app_config.json`

```json
{
  "IsDebug": true,
  "ServerId": 1001,
  "ServerType": "All",
  "ServerName": "gfx_server",
  "LocalIp": "127.0.0.1",
  "TcpPort": 8898,
  "HttpCode": "inner_httpcode",
  "HttpPort": 20001,
  "WsPort": 25001,
  "WssPort": 0,
  "WssCertFilePath": "certs/cert.pem",
  "GrpcPort": 30001,
  "SDKType": 0,
  "DataBaseUrl": "mongodb+srv://gameframex:xxx@gameframex.db.mongodb.net/?retryWrites=true&w=majority",
  "DataBaseName": "gameframex"
}

```


