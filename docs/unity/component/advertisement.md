# 广告

广告组件是 GameFrameX 框架中用于管理游戏内广告展示的模块。它允许开发者轻松集成广告，并在适当的时候展示给玩家。

---

[[toc]]

## 注意

::: warn

抖音SDK com.bytedance.starksdk 版本 5.51.0 没有实现广告播放的成功和失败的回调.所以展示广告成功和失败的回调不会触发.

:::

## 使用广告组件

### 初始化广告组件

在 Unity 编辑器中，将 `AdvertisementComponent` 添加到你的游戏对象上。在组件的 Inspector 面板中设置 `AdUnitId`，这是你的广告位
ID，由广告平台提供。

```csharp
[Header("广告设置")]
[SerializeField] private string m_adUnitId = "YOUR_AD_UNIT_ID";
```

### 展示广告

使用 `Show` 方法来展示广告。你需要提供三个回调函数：展示成功、失败和展示结果的回调。

```csharp
void ShowAd()
{
    advertisementComponent.Show(
        success: (adId) => { Debug.Log($"广告展示成功: {adId}"); },
        fail: (error) => { Debug.LogError($"广告展示失败: {error}"); },
        onShowResult: (isRewarded) => {
            if (isRewarded)
            {
                Debug.Log("玩家观看完整广告，可以发放奖励");
            }
            else
            {
                Debug.Log("广告未完整播放");
            }
        }
    );
}
```

### 加载广告

在展示广告之前，通常需要先加载广告资源。使用 `Load` 方法来异步加载广告。

```csharp
void LoadAd()
{
    advertisementComponent.Load(
        success: (adId) => { Debug.Log($"广告加载成功: {adId}"); },
        fail: (error) => { Debug.LogError($"广告加载失败: {error}"); }
    );
}
```

## 事件监听

GameFrameX 框架使用事件系统来处理各种游戏逻辑。你可以监听广告相关的事件，例如广告展示、加载完成等。

```csharp
// 假设有一个事件名为 GameFrameworkEvent.AdvertisementShowSuccess
m_EventComponent.RegisterEvent(GameFrameworkEvent.AdvertisementShowSuccess, OnAdvertisementShowSuccess);

private void OnAdvertisementShowSuccess(object sender, GameEventArgs e)
{
    // 处理广告展示成功的逻辑
}
```

## 使用方式(三种方式)

1. 直接在 `manifest.json` 文件中添加以下内容
   ```json
      {"com.gameframex.unity.advertisement": "https://github.com/AlianBlank/com.gameframex.unity.advertisement.git"}
    ```
2. 在Unity 的`Packages Manager` 中使用`Git URL`
   的方式添加库,地址为：https://github.com/AlianBlank/com.gameframex.unity.advertisement.git

3. 直接下载仓库放置到Unity 项目的`Packages` 目录下。会自动加载识别
