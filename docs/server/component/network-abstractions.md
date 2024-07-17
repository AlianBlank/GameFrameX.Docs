# 网络基础接口

[[toc]]
---

定义了长连接的基础接口

## 消息操作业务类型(MessageOperationType),不断增加中

定义了常用的消息的类型.方便于服务器处理不同的业务逻辑分离

## 网络消息接口(INetworkMessage)

定义了消息结构的基础字段和公用函数

## 消息编码器接口定义(IMessageEncoderHandler)

定义了消息编码的时候的接口约束.并可配置消息的压缩方式
定义了固定消息头长度的定义.子类可重写

## 消息解码器接口定义(IMessageDecoderHandler)

定义了消息解码的时候的接口约束,并可以配置消息解压处理器

## 消息解压器接口定义(IMessageDecompressHandler)

定义了解压消息的接口约束

## 消息压缩器接口定义(IMessageCompressHandler)

定义了消息压缩的接口约束
