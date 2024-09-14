# 构建发布

## Android

### 先决条件:

- Unity必须安装IL2CPP的组件库(Windows Build Support(IL2CPP)).
- 必须安装HybridCLR的IL2CPP 支持库.在菜单 HybridCLR->Installer 打开窗口. 看见 Package Version和 Install Version 一致才行.
- 如果是发布到WebGL.且版本在2020.3.5 版本以下需要单独处理.请看官方文档部分

### 准备内容

先检查启动场景中.`GFX`对象物体下的`Asset`对象上的`资源运行模式`
是否是你想要的模式,首次打包测试推荐使用 `Offline Play Mode`

1. 执行 HybridCLR->CompileDLl->ActiveBuildTarget
2. 执行 HybridCLR->Generate->All
3. 执行 GameFrameX->Build->Copy Hotfix Code
4. 执行 GameFrameX->Build->Copy Aot Code
5. 执行 YooAsset->AssetBundle Builder->打开资源打包界面.首次请将 `Build Mode` 设置为 `ForceRebuild`
6. 点击 Click Build .弹窗.点击 `Yes`
7. 构建对应平台的包即可,可以通过 GameFrameX->Build-> 对应平台的快捷打包设置菜单
