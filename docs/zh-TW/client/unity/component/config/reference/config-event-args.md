# EventArgs 參考:LoadConfigSuccess / Failure / Update

本頁收錄 GameFrameX 配置模組在載入全域設定過程中派發的三個事件參數類型:`LoadConfigSuccessEventArgs`、`LoadConfigFailureEventArgs`、`LoadConfigUpdateEventArgs`,均位於 `GameFrameX.Config.Runtime` 命名空間下,繼承自 `GameFrameX.Event.Runtime.GameEventArgs`,並由 `ReferencePool` 管理生命週期。

## LoadConfigSuccessEventArgs

載入全域設定成功時派發,可透過訂閱 `EventId` 監聽。

| 成員 | 類型 | 說明 |
|------|------|------|
| `EventId` | `static readonly string` | 事件編號,值為類型全名 `GameFrameX.Config.Runtime.LoadConfigSuccessEventArgs` |
| `Id` | `string`(覆寫) | 傳回 `EventId` |
| `ConfigAssetName` | `string` | 全域設定資源名稱 |
| `Duration` | `float` | 載入持續時間(秒) |
| `UserData` | `object` | 使用者自訂資料 |
| `Create(string, float, object)` | `static LoadConfigSuccessEventArgs` | 從引用池建立執行個體 |
| `Clear()` | `void`(覆寫) | 重設欄位:`ConfigAssetName = null`、`Duration = 0f`、`UserData = null` |

使用範例:

```csharp
var args = LoadConfigSuccessEventArgs.Create("GlobalConfig", 1.25f, userData);
GameFrameX.Event.Runtime.GameEntry.Event.Fire(args);
// 監聽
GameEntry.Event.Subscribe(LoadConfigSuccessEventArgs.EventId, e =>
{
    var s = (LoadConfigSuccessEventArgs)e;
    Debug.Log($"設定 {s.ConfigAssetName} 載入完成,耗時 {s.Duration}s");
});
```

Source: [LoadConfigSuccessEventArgs.cs](/Runtime/EventArgs/LoadConfigSuccessEventArgs.cs#L43-L137)

## LoadConfigFailureEventArgs

載入全域設定失敗時派發,可透過訂閱 `EventId` 監聽。

| 成員 | 類型 | 說明 |
|------|------|------|
| `EventId` | `static readonly string` | 事件編號,值為類型全名 `GameFrameX.Config.Runtime.LoadConfigFailureEventArgs` |
| `Id` | `string`(覆寫) | 傳回 `EventId` |
| `ConfigAssetName` | `string` | 全域設定資源名稱 |
| `ErrorMessage` | `string` | 錯誤資訊 |
| `UserData` | `object` | 使用者自訂資料 |
| `Create(string, string, object)` | `static LoadConfigFailureEventArgs` | 從引用池建立執行個體 |
| `Clear()` | `void`(覆寫) | 重設欄位:`ConfigAssetName = null`、`ErrorMessage = null`、`UserData = null` |

使用範例:

```csharp
var args = LoadConfigFailureEventArgs.Create("GlobalConfig", exception.Message, userData);
GameEntry.Event.Fire(args);
```

Source: [LoadConfigFailureEventArgs.cs](/Runtime/EventArgs/LoadConfigFailureEventArgs.cs#L43-L137)

## LoadConfigUpdateEventArgs

載入全域設定過程中按進度派發,可透過訂閱 `EventId` 監聽。

| 成員 | 類型 | 說明 |
|------|------|------|
| `EventId` | `static readonly string` | 事件編號,值為類型全名 `GameFrameX.Config.Runtime.LoadConfigUpdateEventArgs` |
| `Id` | `string`(覆寫) | 傳回 `EventId` |
| `ConfigAssetName` | `string` | 全域設定資源名稱 |
| `Progress` | `float` | 載入進度,範圍 `0.0` 到 `1.0` |
| `UserData` | `object` | 使用者自訂資料 |
| `Create(string, float, object)` | `static LoadConfigUpdateEventArgs` | 從引用池建立執行個體 |
| `Clear()` | `void`(覆寫) | 重設欄位:`ConfigAssetName = null`、`Progress = 0f`、`UserData = null` |

使用範例:

```csharp
var args = LoadConfigUpdateEventArgs.Create("GlobalConfig", 0.5f, userData);
GameEntry.Event.Fire(args);
```

Source: [LoadConfigUpdateEventArgs.cs](/Runtime/EventArgs/LoadConfigUpdateEventArgs.cs#L43-L137)

## 共同約定

| 項 | 值 |
|----|----|
| 命名空間 | `GameFrameX.Config.Runtime` |
| 基類 | `GameFrameX.Event.Runtime.GameEventArgs` |
| 執行個體化方式 | 必須透過靜態 `Create(...)` 方法,從 `ReferencePool` 取得 |
| 釋放方式 | 框架內部在事件分發完成後呼叫 `Clear()` 並歸還引用池,業務端無需手動釋放 |
| 監聽鍵 | 使用 `typeof(XXXEventArgs).FullName`,即每個類別自身的 `EventId` 靜態欄位 |