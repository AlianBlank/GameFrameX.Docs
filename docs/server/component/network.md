# 网络

[[toc]]
---

网络消息的处理

## 网络渠道(INetWorkChannel)

定义了常用的网络渠道的接口和函数

- `Session` 消息会话
- `Write` 写入消息返回给请求方
- `WriteAsync` 异步写入消息返回给请求方
- `Close` 关闭网络渠道
- `IsClose` 获取网络渠道是否已经处于关闭状态

## 消息处理器

定义了消息处理器的基础接口约束.

:::tip

不要直接使用该接口.请继承 `BaseMessageHandler` 实现业务

:::

## 消息ID处理器(MessageManager)

对消息的消息ID进行处理的帮助类.具体规则请参考 : [消息ID设计](../message-id-design.md)

## 消息类型处理器标记(MessageTypeHandlerAttribute)

用于标记通信消息协议的消息ID标记.消息规则请参考: [消息ID设计](../message-id-design.md)

该标记不建议自行使用.请使用协议导出工具进行处理

## 消息类型映射处理标记(MessageMappingAttribute)

用于处理消息协议的标记.在程序启动的时候将会扫描所有标记了该标记的类型.用于消息处理器分发

### 参数解析

- `messageType` 该类型必须为标记了 `MessageTypeHandlerAttribute` 并且实现了请求消息 `IRequestMessage` 的类型.不然会出现处理异常的问题

## 消息分类

对消息的类型进行了常用分类

### 请求消息(IRequestMessage)

定义了消息请求的基础约束.

### 响应消息(IResponseMessage)

定义了消息响应的基础约束.

- `ErrorCode` 每个消息都有一个错误码返回.非0标识业务发生异常,建议定义为枚举

### 通知消息(INotifyMessage)

定义了通知消息基础约束

### 心跳消息(IHeartBeatMessage)

定义了心跳消息基础约束
