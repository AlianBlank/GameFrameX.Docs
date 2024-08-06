# 操作粘贴板

Unity 读写Android 和 iOS 的粘贴板插件。在编辑器中的时候使用引擎自带的接口。理论上支持大部分平台。

::: tip
没有对WebGL 平台进行测试.
:::

---
[[toc]]



## 使用示例

```csharp

using UnityEngine;

public class BlankOperationClipboardDemo : MonoBehaviour
{
    private string text = "demoText";
    private string result = "";
    void OnGUI()
    {
        text = GUILayout.TextField(text, GUILayout.Width(500), GUILayout.Height(100));
        if (GUILayout.Button("SetValue", GUILayout.Width(500), GUILayout.Height(100)))
        {
            BlankOperationClipboard.SetValue(text);
        }
        if (GUILayout.Button("GetValue", GUILayout.Width(500), GUILayout.Height(100)))
        {
            result = BlankOperationClipboard.GetValue();
        }
        GUILayout.Label(result);
    }
}

```

## 使用方式(三种方式)

1. 直接在 `manifest.json` 文件中添加以下内容
   ```json
      {"com.gameframex.unity.operationclipboard": "https://github.com/GameFrameX/com.gameframex.unity.operationclipboard.git"}
    ```
2. 在Unity 的`Packages Manager` 中使用`Git URL`
   的方式添加库,地址为：https://github.com/GameFrameX/com.gameframex.unity.operationclipboard.git

3. 直接下载仓库放置到Unity 项目的`Packages` 目录下。会自动加载识别

