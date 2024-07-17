# 日志

[[toc]]
---

基于 `Serilog` 的处理日志相关的接口和存档

## 日志记录器(LogHelper)

提供了常用的打印接口.如果不够.强烈建议提交PR.

## 日志处理器(LoggerHandler)

定义了基础的基于 `Serilog` 的启动配置.

### 函数原型

`public static bool Start(string serverType = null, string logSavePath = null, bool isDebug = true, RollingInterval rollingInterval = RollingInterval.Hour)`

### 参数解析

- `serverType` 服务器类型
- `logSavePath` 日志存储地址,默认为`.` 当前目录
- `isDebug` 是否是Debug模式,默认true,如果发布到服务器上建议.修改为false .因为这个是输出到控制台
- `rollingInterval` 日志滚动间隔,默认为Hour,可以修改.请参考 `RollingInterval` 枚举
