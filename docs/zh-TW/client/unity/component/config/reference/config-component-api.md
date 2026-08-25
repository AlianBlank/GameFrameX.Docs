# ConfigComponent API 速查

本頁收錄 `ConfigComponent` 及其底層介面 `IConfigManager` 的全部公開 API,包括簽名、參數、回傳值與行為說明,供查閱使用。

## ConfigComponent 公開 API

`ConfigComponent` 是全域設定元件,掛載在 `GameFrameworkEntry` 下;透過泛型 `T : IDataTable` 提供強型別存取。

| 名稱 | 簽名 | 說明 |
|------|------|------|
| `Count` | `int Count { get; }` | 目前已註冊的設定項總數 |
| `GetConfig<T>()` | `T GetConfig<T>() where T : IDataTable` | 依泛型類型 `T` 的型別名稱(`typeof(T).Name`)取得設定項;不存在回傳 `default(T)` |
| `HasConfig<T>()` | `bool HasConfig<T>() where T : IDataTable` | 檢查型別 `T` 對應名稱的設定項是否存在 |
| `RemoveConfig<T>()` | `bool RemoveConfig<T>() where T : IDataTable` | 移除型別 `T` 對應名稱的設定項,回傳是否成功 |
| `RemoveAllConfigs()` | `void RemoveAllConfigs()` | 清空全部設定項並重置內部型別快取 |
| `Add(string, IDataTable)` | `void Add(string configName, IDataTable dataTable)` | 以字串名稱註冊一條設定項(型別需實作 `IDataTable`) |

型別 → 名稱的解析會快取在內部 `ConcurrentDictionary<Type, string>` 中,首次存取 `T` 時寫入。

```csharp
using GameFrameX.Config.Runtime;

// 取得元件實例
var configComponent = GameFrameX.Runtime.GameFrameworkEntry.GetComponent<ConfigComponent>();

// 註冊一條設定(以字串為 Key)
configComponent.Add("MyConfig", myDataTable);

// 依強型別取得
var cfg = configComponent.GetConfig<MyConfig>();
if (configComponent.HasConfig<MyConfig>())
{
    // ...
}

// 移除與清空
configComponent.RemoveConfig<MyConfig>();
configComponent.RemoveAllConfigs();
```

Source: [ConfigComponent.cs](/src/Runtime/Config/ConfigComponent.cs#L46-L186)

## IConfigManager 公開 API

`IConfigManager` 是 `ConfigComponent` 透過 `GameFrameworkEntry.GetModule<IConfigManager>()` 取得的底層管理器介面,負責實際儲存。

| 名稱 | 簽名 | 說明 |
|------|------|------|
| `Count` | `int Count { get; }` | 全域設定項數量 |
| `HasConfig(string)` | `bool HasConfig(string configName)` | 檢查指定名稱的設定項是否存在 |
| `AddConfig(string, IDataTable)` | `void AddConfig(string configName, IDataTable configValue)` | 新增一個設定項 |
| `RemoveConfig(string)` | `bool RemoveConfig(string configName)` | 移除指定名稱的設定項,回傳是否成功 |
| `GetConfig(string)` | `IDataTable GetConfig(string configName)` | 取得指定名稱的設定項;不存在回傳 `null` |
| `RemoveAllConfigs()` | `void RemoveAllConfigs()` | 清空全部設定項 |

`GetConfig` 的回傳值型別為 `IDataTable`,呼叫端需要自行轉型;不存在時回傳 `null`(注意與 `ConfigComponent.GetConfig<T>()` 的 `default(T)` 行為區分)。

Source: [IConfigManager.cs](/src/Runtime/Config/Config/IConfigManager.cs#L40-L98)

## 相關連結

- [ConfigComponent.cs](/src/Runtime/Config/ConfigComponent.cs)
- [IConfigManager.cs](/src/Runtime/Config/Config/IConfigManager.cs)