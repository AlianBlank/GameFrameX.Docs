# 工作原理:Config 元件架構速覽

Config 元件以 `ConfigComponent` 為入口,透過 `IConfigManager` 介面把設定項交給 `ConfigManager` 模組統一管理;執行階段時按 `IDataTable` 介面非同步載入、快取並向業務層提供鍵值存取。本頁用一張圖說明「元件—模組—資料表」三層關係,以及一段從載入到讀取的最小程式碼路徑。

## 快速開始

1. 在場景裡給 `GameFramework` GameObject 新增 `ConfigComponent`(元件選單:`GameFrameX/Config`)。
2. 業務側透過 `GameEntry.GetComponent<ConfigComponent>()` 取得元件。
3. 元件在 `Awake()` 中呼叫 `GameFrameworkEntry.GetModule<IConfigManager>()` 解析出 `ConfigManager` 執行個體([ConfigComponent.cs#L73-L85](/Runtime/Config/ConfigComponent.cs#L73-L85))。
4. 任意 `IDataTable` 子類別呼叫自身的 `LoadAsync()`,載入完成後透過 `ConfigManager.AddConfig(configName, table)` 註冊,後續可用 `HasConfig` / `GetConfig` 查詢。

```csharp
var configComp = GameEntry.GetComponent<ConfigComponent>();
var module = GameFrameworkEntry.GetModule<IConfigManager>();
module.AddConfig("MyTable", myDataTable);   // IDataTable 由 BaseDataTable<T> 衍生
```

## 工作原理速覽

整體分為三層:**Unity 元件層**(`ConfigComponent`)、**框架模組層**(`IConfigManager` / `ConfigManager`)、**資料表層**(`IDataTable` / `BaseDataTable<T>`)。元件層負責在 Unity 生命週期裡把模組解析出來,模組層負責以 `ConcurrentDictionary<string, IDataTable>` 維護設定集合,資料表層負責具體的載入、解析、鍵值查詢。

```mermaid
flowchart TD
    subgraph 元件層["Unity 元件層"]
        CC[ConfigComponent]
    end
    subgraph 模組層["框架模組層"]
        ICM[IConfigManager]
        CM[ConfigManager]
    end
    subgraph 資料表層["資料表層"]
        IDT[IDataTable]
        BDT[BaseDataTable T]
    end
    subgraph 事件層["事件層"]
        LCS[LoadConfigSuccessEventArgs]
        LCF[LoadConfigFailureEventArgs]
        LCU[LoadConfigUpdateEventArgs]
    end
    CC -->|GetModule| ICM
    ICM --> CM
    CM -->|AddConfig / HasConfig / GetConfig| IDT
    IDT <|.. BDT
    IDT -.->|LoadAsync 觸發| LCS
    IDT -.->|載入失敗| LCF
    IDT -.->|載入進度| LCU
```

各層職責一覽:

| 層 | 關鍵類型 | 檔案 | 主要職責 |
|----|----------|------|----------|
| 元件層 | `ConfigComponent` | [ConfigComponent.cs](/Runtime/Config/ConfigComponent.cs) | 在 `Awake()` 中解析 `IConfigManager` 模組;透過 `[GameFrameXAutoComponent(-5000)]` 自動注入到 GameFramework |
| 模組層 | `IConfigManager`、`ConfigManager` | [IConfigManager.cs](/Runtime/Config/Config/IConfigManager.cs)、[ConfigManager.cs](/Runtime/Config/Config/ConfigManager.cs) | 以 `ConcurrentDictionary<string, IDataTable>` 維護設定項,提供 `Add` / `Remove` / `Has` / `Get` 介面 |
| 資料表層 | `IDataTable`、`BaseDataTable<T>` | [IDataTable.cs](/Runtime/Config/Config/IDataTable.cs)、[BaseDataTable.cs](/Runtime/Config/Config/BaseDataTable.cs) | 負責單張表的非同步載入、鍵索引與查詢 |
| 事件層 | `LoadConfigSuccessEventArgs` 等 | [LoadConfigSuccessEventArgs.cs](/Runtime/EventArgs/LoadConfigSuccessEventArgs.cs) | 載入成功 / 失敗 / 進度事件,業務側訂閱即可感知 |

## 關鍵 API 與預設值

`IConfigManager` 是模組層的對外契約,簽章直接來自於原始碼:

| 成員 | 簽章 | 預設值 / 說明 |
|------|------|---------------|
| `Count` | `int Count { get; }` | 目前已註冊的設定項數量,取自內部字典 `m_ConfigDatas.Count` |
| `HasConfig` | `bool HasConfig(string configName)` | 名稱比對使用 `StringComparer.Ordinal` |
| `AddConfig` | `void AddConfig(string configName, IDataTable configValue)` | 寫入 `m_ConfigDatas` |
| `RemoveConfig` | `bool RemoveConfig(string configName)` | 從字典中移除指定設定項 |
| `GetConfig` | `IDataTable GetConfig(string configName)` | 按名稱取回 `IDataTable` |
| `RemoveAllConfigs` | `void RemoveAllConfigs()` | 清空全部設定項 |
| `Shutdown` | `void Shutdown()` | 釋放所有 `IDataTable` 並清空字典 |

`ConfigComponent` 的相關關鍵程式碼:

```csharp
[DisallowMultipleComponent]
[AddComponentMenu("GameFrameX/Config")]
[GameFrameXAutoComponent(-5000)]
public sealed class ConfigComponent : GameFrameworkComponent
{
    protected override void Awake()
    {
        ImplementationComponentType = Utility.Assembly.GetType(componentType);
        InterfaceComponentType = typeof(IConfigManager);
        base.Awake();
        m_ConfigManager = GameFrameworkEntry.GetModule<IConfigManager>();
        if (m_ConfigManager == null)
        {
            Log.Fatal("Config manager is invalid.");
            return;
        }
    }
}
```

Source: [ConfigComponent.cs#L46-L85](/Runtime/Config/ConfigComponent.cs#L46-L85)

`ConfigManager` 用 `ConcurrentDictionary<string, IDataTable>` 存放所有表,並發安全;每個 key 的字串比對採用 `StringComparer.Ordinal`,大小寫敏感:

```csharp
public sealed partial class ConfigManager : GameFrameworkModule, IConfigManager
{
    private readonly ConcurrentDictionary<string, IDataTable> m_ConfigDatas;

    public ConfigManager()
    {
        m_ConfigDatas = new ConcurrentDictionary<string, IDataTable>(StringComparer.Ordinal);
    }
}
```

Source: [ConfigManager.cs#L46-L61](/Runtime/Config/Config/ConfigManager.cs#L46-L61)

`IDataTable` 是非泛型資料表介面,核心方法 `LoadAsync()` 傳回 `Task`,用於非同步載入:

```csharp
[Preserve]
public interface IDataTable
{
    [Preserve]
    Task LoadAsync();
    int Count { get; }
    // ... 取行 / 索引 等成員
}
```

Source: [IDataTable.cs#L46-L57](/Runtime/Config/Config/IDataTable.cs#L46-L57)

## 接下來

- 編寫自訂資料表:見《如何實作自訂 Config 資料表》。
- 處理載入回呼:見《Config 載入成功 / 失敗事件》。
- 安裝與 Inspector 設定:見《Editor/ConfigDefineSymbols 與 Inspector 使用》。