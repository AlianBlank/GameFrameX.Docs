# 调试控制台

帮助您在构建中查看调试消息（日志、警告、错误、异常）运行时（以及编辑器中的断言），并使用其内置控制台执行命令。它还支持在Android平台上将logcat消息记录到控制台。

用户界面是使用uGUI创建的，当启用Sprite
Packing时，需要调用1次SetPass（以及6到10次批处理）。在游戏过程中可以调整或隐藏控制台窗口。一旦控制台被隐藏，一个小弹出窗口将取而代之（可以拖动）。弹出窗口将显示
自它出现以来到达的原木数量。单击弹出窗口后，控制台窗口将重新出现。

---

[[toc]]

## 帮助(help)

- `help` 打印所有命令
- `help [命令名称]` 打印匹配的命令

## 系统信息(sysinfo)

- `sysinfo` 打印设备的信息

## 时间控制(time.scale)

- `time.scale [float 时间缩放值]` 设置或获取当前的时间缩放

## 场景

- `scene.load [场景名称]` 以单个场景的方式`同步`加载指定名称的场景
- `scene.loadasync [场景名称]` 以单个场景的方式`异步`加载指定名称的场景
- `scene.load [场景名称] [加载模式]` 以指定加载模式的方式`同步`加载指定名称的场景
- `scene.loadasync [场景名称] [加载模式]` 以指定加载模式的方式`异步`加载指定名称的场景
- `scene.unload [场景名称]` 以异步的方式卸载指定的场景
- `scene.restart` 以单个场景的方式重新加载当前场景

## 用户配置

- `prefs.int [key] [value]` 获取或设置 指定Key的 int 值
- `prefs.float [key] [value]` 获取或设置 指定Key的 float 值
- `prefs.string [key] [value]` 获取或设置 指定Key的 string 值
- `prefs.delete [key]` 删除 指定Key和值
- `prefs.clear` 删除 所有Key和值

## 日志存档

- `logs.save [存储路径]` 将日志写入到文件.后面可选路径

## 使用方式(三种方式)

1. 直接在 `manifest.json` 文件中添加以下内容
   ```json
      {"com.gameframex.unity.yasirkula.debugconsole": "https://github.com/GameFrameX/com.gameframex.unity.yasirkula.debugconsole.git"}
    ```
2. 在Unity 的`Packages Manager` 中使用`Git URL`
   的方式添加库,地址为：https://github.com/GameFrameX/com.gameframex.unity.yasirkula.debugconsole.git

3. 直接下载仓库放置到Unity 项目的`Packages` 目录下。会自动加载识别
