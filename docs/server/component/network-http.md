# HTTP短连接

[[toc]]
---

HTTP短连接的处理。提供游戏进程对外的操作接口

## HTTP 消息处理器(HttpMessageMappingAttribute)

定义了HTTP消息处理器的命令地址和规范检查

## HTTP 消息结果的统一结果返回规范(HttpResult)

所有的HTTP处理器结果都必须准守该规则.便于接口规范

## HTTP 服务器

定义了HTTP服务器的处理程序的业务逻辑和指令分发和参数解析

## HTTP消息处理器基类(BaseHttpHandler)

所有要处理HTTP消息都需要继承该类型.不然不会执行

- `IsCheckSign` 是否检查参数的签名. 强烈建议开启.

## 最佳实践

[参考HTTP处理器](../http-handler.md)
