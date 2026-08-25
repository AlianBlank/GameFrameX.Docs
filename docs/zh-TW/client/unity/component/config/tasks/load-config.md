# 如何載入設定表

透過 `ConfigComponent` 把一個或多個 `IDataTable` 設定表載入到全域設定管理器，並在遊戲任意位置按類型或名稱讀取。

## 前置條件

- 場景中已掛載 `GameFramework` 啟動元件（框架自帶），`ConfigComponent` 會由 `[GameFrameXAutoComponent(-5000)]` 自動注入，無需手動新增。
- 自訂設定類別需要實作 `IDataTable` 介面（見 [IDataTable.cs](/Runtime/Config/Config/IDataTable.cs)）。
- 已有 `IDataTable` 實例可透過 `Add` 注入；若需要從資產檔案載入，請搭配框架的 `GameFrameX.Asset` 模組讀取 ScriptableObject / 二進位後再 `Add`。

## 操作步驟

1. **拿到元件引用**。透過 `GameEntry.GetComponent<ConfigComponent>()` 取得元件，再拿到內部的 `IConfigManager`：

   ```csharp
   var configComponent = GameEntry.GetComponent<ConfigComponent>();
   var configManager   = GameFrameworkEntry.GetModule<IConfigManager>();
   ```

   Source: [ConfigComponent.cs#L73-L85](/Runtime/Config/ConfigComponent.cs#L73-L85)

2. **註冊載入事件**（可選，但建議）。框架會在載入流程中派發以下事件，訂閱它們以拿到成功 / 失敗回呼：

   ```csharp
   GameFrameXEntry.GetSubscriber().Subscribe(LoadConfigSuccessEventArgs.EventId, OnLoadConfigSuccess);
   GameFrameXEntry.GetSubscriber().Subscribe(LoadConfigFailureEventArgs.EventId, OnLoadConfigFailure);
   GameFrameXEntry.GetSubscriber().Subscribe(LoadConfigUpdateEventArgs.EventId,   OnLoadConfigUpdate);
   ```

   Source: [LoadConfigSuccessEventArgs.cs#L52](/Runtime/EventArgs/LoadConfigSuccessEventArgs.cs#L52), [LoadConfigFailureEventArgs.cs#L52](/Runtime/EventArgs/LoadConfigFailureEventArgs.cs#L52)

3. **載入並注入設定表**。先用資源模組把 `IDataTable` 實例讀到記憶體，再呼叫 `Add` 寫入管理器。例如載入一個二進位 / 文字設定表：

   ```csharp
   // 1) 用 AssetComponent 把資產讀到記憶體（不同專案載入方式不同）
   var dataTable = LoadMyConfigTable(); // 傳回一個實作 IDataTable 的實例

   // 2) 注入到全域設定管理器，名稱與型別名稱保持一致便於後續 GetConfig<T>()
   configComponent.Add(nameof(MyConfigTable), dataTable);
   ```

   Source: [ConfigComponent.cs#L182-L185](/Runtime/Config/ConfigComponent.cs#L182-L185), [ConfigManager.cs#L124-L127](/Runtime/Config/Config/ConfigManager.cs#L124-L127)

4. **讀取設定表**。建議使用泛型版本，會按 `typeof(T).Name` 自動比對設定名稱：

   ```csharp
   if (configComponent.HasConfig<MyConfigTable>())
   {
       var cfg = configComponent.GetConfig<MyConfigTable>();
       // 使用 cfg ...
   }
   ```

   也可以按字串名稱取得：

   ```csharp
   var cfg = (MyConfigTable)configManager.GetConfig("MyConfigTable");
   ```

   Source: [ConfigComponent.cs#L118-L143](/Runtime/Config/ConfigComponent.cs#L118-L143), [ConfigManager.cs#L152-L161](/Runtime/Config/Config/ConfigManager.cs#L152-L161)

5. **依需求移除 / 清空**。卸載某張表或退出場景時清理：

   ```csharp
   configComponent.RemoveConfig<MyConfigTable>(); // 移除單張
   configComponent.RemoveAllConfigs();             // 清空全部
   ```

   Source: [ConfigComponent.cs#L154-L171](/Runtime/Config/ConfigComponent.cs#L154-L171)

## 常見變體

- **批次預載**：在進入主場景前迴圈 `Add` 多張表，統一由成功事件回呼推進流程。
- **熱更新替換**：用 `Add` 覆寫同名項目即可；`AddConfig` 內部走 `TryAdd`，如需強制替換請先 `RemoveConfig` 再 `Add`。
- **不通過元件**：直接 `GameFrameworkEntry.GetModule<IConfigManager>()` 拿到 `IConfigManager`，呼叫 `AddConfig / GetConfig` 同樣可用。

## 常見錯誤

| 症狀 | 原因 | 修復 |
|------|------|------|
| `GetConfig<T>()` 傳回 `null` | 名稱與 `typeof(T).Name` 不一致，或未呼叫 `Add` | 確認 `Add` 時傳入的名稱與型別名稱一致；或改用按名稱 `GetConfig("Name")` |
| 重複 `Add` 後舊表仍生效 | `AddConfig` 走 `TryAdd`，同名不會被覆寫 | 先 `RemoveConfig`，再 `Add` |
| 事件沒有觸發 | 沒有 `Subscribe` 事件 ID | 訂閱 `LoadConfigSuccessEventArgs.EventId` 等 |
| `Config manager is invalid.` | 框架模組未註冊或被銷毀 | 確認 `GameFramework` 已啟動且未被 `Shutdown` |

## 背景（可選）

`ConfigComponent` 本身不直接解析資產，它把 `IDataTable` 容器委派給 `IConfigManager`；`ConfigManager` 用 `ConcurrentDictionary<string, IDataTable>` 儲存設定項目，`ConfigComponent` 再疊一層型別 → 名稱對應，讓 `GetConfig<T>()` 可以按型別快速定位。資產讀取部分由專案的 `AssetComponent` 負責，與本元件解耦。