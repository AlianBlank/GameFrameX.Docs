# 场景


GameFrameX 的 Scene 场景管理组件

**Scene 场景管理组件 (Scene Component)** - 负责管理游戏的场景，允许在场景之间切换或追加。

---

[[toc]]



## 使用方式(任选其一)

1. 直接在 `manifest.json` 的文件中的 `dependencies` 节点下添加以下内容
   ```json
      {"com.gameframex.unity.scene": "https://github.com/GameFrameX/com.gameframex.unity.scene.git"}
    ```
2. 在Unity 的`Packages Manager` 中使用`Git URL` 的方式添加库,地址为：https://github.com/GameFrameX/com.gameframex.unity.scene.git

3. 直接下载仓库放置到Unity 项目的`Packages` 目录下。会自动加载识别
