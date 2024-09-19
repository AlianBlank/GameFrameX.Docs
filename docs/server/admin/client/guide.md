# 客户端接口

当前项目为客户端访问的接口API项目.有且仅有次功能.

---
[[toc]]

## 运行条件

默认连接的数据库为MySQL, 请提前安装对应的环境

运行环境为跨平台环境，包括：macOS、Windows、Linux 等等.只要 NET CORE 支持的平台都可以运行

## 运行说明

运行环境需要有NET8 的环境

下载项目，直接运行即可

## 常见问题

- 为什么连接不上数据库?

  请检查连接字符串是否配置正确.检查appsettings.json是否配置正确

- 为什么无法访问网页?

  因为是API.所以没有页面

- 为什么没有页面?

  因为是API.所以没有页面

- 为什么正常之后接口返回错误?

  请确认数据库是否存在和表是否存在和表内容是否正确

- 启动之后报错数据库或表不存在?

  导入sql文件，执行创建数据库和表

- 启动之后端口提示被占用了?

  请使用命令参数指定一个没有被占用的端口,官方文档地址: https://learn.microsoft.com/zh-cn/aspnet/core/fundamentals/servers/kestrel/endpoints?view=aspnetcore-8.0