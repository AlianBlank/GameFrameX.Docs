# 网络消息

[[toc]]
---

网络消息的基础实现

## 消息协议的处理器(MessageProtoHelper)

用于扫描协议程序集的协议.并添加到列表中.

## 消息对象解析处理器(MessageObjectPipelineFilter)

该类是SuperSocket 的消息处理流水线的实现.
其中实现了消息头的解析和沾包处理

## 基础消息编码处理器(BaseMessageEncoderHandler)

实现了基础的消息编码的规则.可以自行重写实现

其中实现了消息压缩的规则处理

- 当没有调用设置压缩器的接口的时候.压缩功能将会不生效

## 基础消息解码处理器(BaseMessageDecoderHandler)

实现了基础的消息解码的规则.可以自行重写实现

其中实现了消息解压缩的规则处理

- 当没有调用设置解压缩器的接口的时候.解压缩将会不生效

## 默认的消息压缩处理器(BaseMessageCompressHandler)

实现了基于Deflate 算法的消息压缩

- 可以自行重写实现

## 默认的消息解压缩处理器(BaseMessageDecompressHandler)

实现了基于Deflate 算法的消息解压缩

- 可以自行重写实现
