# 如何訂閱設定載入事件(成功 / 失敗 / 熱更新)

透過 GameFrameX 的全域事件管理器訂閱 `LoadConfigSuccessEventArgs`、`LoadConfigFailureEventArgs`、`LoadConfigUpdateEventArgs` 三個事件,即可在設定載入成功、失敗、熱更新進度變化時收到回呼,無需直接依賴 `ConfigComponent`。

## 前置條件

- 已初始化 GameFrameX 框架,並透過 `GameFrameworkEntry.GetModule<IConfigManager>()` 能拿到設定管理器。
- 專案裡能找到 `GameFrameX.Config.Runtime` 命名空間下的三個 `EventArgs` 類別(框架內建,無需自行建立)。

## 事件總覽

| 事件類型 | EventId 來源 | 關鍵欄位 | 觸發時機 |
|----------|--------------|----------|----------|
| `LoadConfigSuccessEventArgs` | `typeof(LoadConfigSuccessEventArgs).FullName` | `ConfigAssetName`、`Duration`、`UserData` | 單一設定載入完成且成功 |
| `LoadConfigFailureEventArgs` | `typeof(LoadConfigFailureEventArgs).FullName` | `ConfigAssetName`、`ErrorMessage`、`UserData` | 設定載入拋出例外或失敗 |
| `LoadConfigUpdateEventArgs` | `typeof(LoadConfigUpdateEventArgs).FullName` | `ConfigAssetName`、`Progress`(0~1)、`UserData` | 設定載入/熱更新進度變化 |

事件 ID、欄位定義均來自原始碼中的 EventArgs 類別。Source: [Runtime/EventArgs/LoadConfigSuccessEventArgs.cs](/Runtime/EventArgs/LoadConfigSuccessEventArgs.cs#L42-L137), [Runtime/EventArgs/LoadConfigFailureEventArgs.cs](/Runtime/EventArgs/LoadConfigFailureEventArgs.cs#L43-L137), [Runtime/EventArgs/LoadConfigUpdateEventArgs.cs](/Runtime/EventArgs/LoadConfigUpdateEventArgs.cs#L43-L137)。

## 操作步驟

1. 取得全域事件訂閱器(任選一種 GameFrameX 專案裡提供的入口,常見為 `GameFrameXEntry.GetModule<IEventManager>()` 或封裝後的 `GameEntry.Event`,訂閱 API 都是 `Subscribe(eventId, handler)`)。
2. 在初始化階段呼叫 `Subscribe`,把回呼註冊到對應 `EventId`(直接用 `EventArgs` 類別的 `EventId` 靜態欄位,避免硬編碼字串)。
3. 在回呼裡強轉 `GameEventArgs` 到具體的 `LoadConfigXxxEventArgs`,讀取欄位。
4. 框架內部使用 `ReferencePool.Acquire` 建立事件實例,透過 `GameEntry.Event.Fire(this, EventId, e)` 投遞,訂閱回呼執行完畢後框架會自動呼叫 `Clear()` 並回收,不要在回呼裡長期持有參考。Source: [Runtime/EventArgs/LoadConfigSuccessEventArgs.cs](/Runtime/EventArgs/LoadConfigSuccessEventArgs.cs#L116-L136)
5. 不再需要時呼叫對應的 `Unsubscribe(eventId, handler)`,否則會造成記憶體洩漏或重複觸發。

最小訂閱範例(虛擬程式碼,具體 `IEventManager` 入口以專案實際封裝為準):

```csharp
using GameFrameX.Config.Runtime;
using GameFrameX.Event.Runtime;
using GameFrameX.Runtime;

var eventManager = GameFrameXEntry.GetModule<IEventManager>();

// 成功
eventManager.Subscribe(LoadConfigSuccessEventArgs.EventId, OnLoadConfigSuccess);
// 失敗
eventManager.Subscribe(LoadConfigFailureEventArgs.EventId, OnLoadConfigFailure);
// 進度/熱更新
eventManager.Subscribe(LoadConfigUpdateEventArgs.EventId, OnLoadConfigUpdate);
```

```csharp
private void OnLoadConfigSuccess(object sender, GameEventArgs e)
{
    var args = (LoadConfigSuccessEventArgs)e;
    // args.ConfigAssetName / args.Duration / args.UserData
}

private void OnLoadConfigFailure(object sender, GameEventArgs e)
{
    var args = (LoadConfigFailureEventArgs)e;
    // args.ErrorMessage 包含失敗原因
}

private void OnLoadConfigUpdate(object sender, GameEventArgs e)
{
    var args = (LoadConfigUpdateEventArgs)e;
    // args.Progress 數值範圍 0.0 ~ 1.0
}
```

取消訂閱:

```csharp
eventManager.Unsubscribe(LoadConfigSuccessEventArgs.EventId, OnLoadConfigSuccess);
eventManager.Unsubscribe(LoadConfigFailureEventArgs.EventId, OnLoadConfigFailure);
eventManager.Unsubscribe(LoadConfigUpdateEventArgs.EventId, OnLoadConfigUpdate);
```

## 常見變體

- **依 `ConfigAssetName` 過濾**:成功/失敗/進度事件都帶 `ConfigAssetName`,可在回呼裡 `switch` 判斷後只處理關心的設定表。
- **攜帶業務參數**:載入設定時傳入的 `userData` 會原樣回傳到 `UserData` 欄位,可用於關聯請求內容。
- **熱更新監聽**:把 `LoadConfigUpdateEventArgs` 的 `Progress` 接到進度條 UI;`Progress` 到 1.0 後通常緊接一條同 `ConfigAssetName` 的 `LoadConfigSuccessEventArgs`。

## 常見錯誤

- **手動 `new` 事件物件**:EventArgs 必須用各自的 `Create(...)` 靜態方法建立,框架內部走 `ReferencePool.Acquire`;直接 `new` 會繞過物件池。Source: [Runtime/EventArgs/LoadConfigFailureEventArgs.cs](/Runtime/EventArgs/LoadConfigFailureEventArgs.cs#L116-L123)
- **在回呼裡長期持有事件實例**:事件回呼結束後會被 `Clear()` 並回收至引用池,業務程式碼只應在回呼作用域內使用 `args`。
- **硬編碼 EventId 字串**:用 `LoadConfigXxxEventArgs.EventId` 靜態欄位,類別被重新命名時不會失效。
- **重複訂閱同一回呼**:會觸發多次;`Unsubscribe` 時確保傳入的委派參考與訂閱時一致。

## 背景(選用)

`ConfigComponent` 只負責讀寫快取,不直接暴露事件;設定在載入/熱更新過程中由底層模組透過全域 `IEventManager` 投遞這三類 `EventArgs`,訂閱方依 `EventId` 區分即可。Source: [Runtime/Config/ConfigComponent.cs](/Runtime/Config/ConfigComponent.cs#L49-L186)