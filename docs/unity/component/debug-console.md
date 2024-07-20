# 调试控制台

帮助您在构建中查看调试消息（日志、警告、错误、异常）运行时（以及编辑器中的断言），并使用其内置控制台执行命令。它还支持在Android平台上将logcat消息记录到控制台。

用户界面是使用uGUI创建的，当启用Sprite
Packing时，需要调用1次SetPass（以及6到10次批处理）。在游戏过程中可以调整或隐藏控制台窗口。一旦控制台被隐藏，一个小弹出窗口将取而代之（可以拖动）。弹出窗口将显示
自它出现以来到达的原木数量。单击弹出窗口后，控制台窗口将重新出现。

---

[[toc]]

## 使用方式(三种方式)

1. 直接在 `manifest.json` 文件中添加以下内容
   ```json
      {"com.gameframex.unity.yasirkula.debugconsole": "https://github.com/AlianBlank/com.gameframex.unity.yasirkula.debugconsole.git"}
    ```
2. 在Unity 的`Packages Manager` 中使用`Git URL`
   的方式添加库,地址为：https://github.com/AlianBlank/com.gameframex.unity.yasirkula.debugconsole.git

3. 直接下载仓库放置到Unity 项目的`Packages` 目录下。会自动加载识别
