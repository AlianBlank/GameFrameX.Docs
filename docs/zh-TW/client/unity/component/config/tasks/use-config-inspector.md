# 如何在 Unity Inspector 中查看與管理 ConfigComponent

在掛載了 `ConfigComponent` 的 GameObject 上，Unity Inspector 會自動使用自訂 Inspector 展示該元件的介面與實作類型對應。你可以在不撰寫程式碼的情況下查看目前設定元件對應的 `IConfigManager` 介面以及實作類別完整名稱，並在需要時手動指定自訂實作。

## 前置條件

- 已安裝 `com.gameframex.unity.config` 套件，專案中存在 `ConfigComponent` 類別。
- 場景中存在一個掛載了 `ConfigComponent` 的 GameObject（元件選單位於 `GameFrameX/Config`）。

## 操作步驟

1. 在場景中選取掛載 `ConfigComponent` 的 GameObject，Inspector 會自動切換為自訂 Inspector。自訂 Inspector 透過 `CustomEditor(typeof(ConfigComponent))` 特性綁定。

    ```csharp
    [CustomEditor(typeof(ConfigComponent))]
    internal sealed class ConfigComponentInspector : ComponentTypeComponentInspector
    {
        protected override void RefreshTypeNames()
        {
            RefreshComponentTypeNames(typeof(IConfigManager));
        }
    }
    ```

    Source: [Editor/Inspector/ConfigComponentInspector.cs#L38-L45](/src/Editor/Inspector/ConfigComponentInspector.cs#L38-L45)

2. Inspector 頂部會展示與元件類型相關的唯讀欄位，包括 `InterfaceComponentType`（固定為 `IConfigManager`）與 `ImplementationComponentType`（由 `Awake()` 時依 `componentType` 字串解析取得）。這是判斷執行時設定管理器實作是否正確的最快方式。

    ```csharp
    protected override void Awake()
    {
        m_ConfigNameTypeMap.Clear();
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
    ```

    Source: [Runtime/Config/ConfigComponent.cs#L73-L85](/src/Runtime/Config/ConfigComponent.cs#L73-L85)

3. 若執行時出現 `Config manager is invalid.` 致命日誌，表示 `IConfigManager` 模組尚未註冊，請先返回 Game Framework 的模組註冊流程進行修正。

4. 在執行時（Play Mode）讀取 `Count` 屬性，即可驗證目前已載入的設定項目數量：

    ```csharp
    var configComponent = GameEntry.GetComponent<ConfigComponent>();
    int count = configComponent.Count;
    ```

    Source: [Runtime/Config/ConfigComponent.cs#L62-L65](/src/Runtime/Config/ConfigComponent.cs#L62-L65)

5. 在腳本中依類型取得、檢查、移除及清空設定項目（這些 API 也會間接用於執行時偵錯）：

    ```csharp
    // 取得設定項目（類型必須實作 IDataTable）
    var cfg = configComponent.GetConfig<MyConfig>();

    // 檢查是否存在
    bool exists = configComponent.HasConfig<MyConfig>();

    // 移除單項 / 清空全部
    configComponent.RemoveConfig<MyConfig>();
    configComponent.RemoveAllConfigs();

    // 直接以名稱新增
    configComponent.Add("MyConfig", dataTableInstance);
    ```

    Source: [Runtime/Config/ConfigComponent.cs#L117-L185](/src/Runtime/Config/ConfigComponent.cs#L117-L185)

## 常見變體

- 若要使用自訂實作類別，請在 `componentType` 欄位填入完整的 `IConfigManager` 實作類別名稱（包含命名空間）。`Awake()` 會透過 `Utility.Assembly.GetType` 進行解析；解析結果會顯示在 Inspector 的 `ImplementationComponentType` 中，方便核對。
- 若要排查裁剪問題，可在建置腳本中確認 `GameFrameXConfigCroppingHelper` 已觸發對 `ConfigComponent` 與 `BaseDataTable<>` 的參照保留（由 `[Preserve]` 特性與裁剪輔助工具共同保證）。

    ```csharp
    _ = typeof(BaseDataTable<>);
    _ = typeof(ConfigComponent);
    ```

    Source: [Runtime/GameFrameXConfigCroppingHelper.cs#L20-L22](/src/Runtime/GameFrameXConfigCroppingHelper.cs#L20-L22)

## 常見錯誤

| 症狀 | 原因 | 修正方式 |
|------|------|------|
| Console 印出 `Config manager is invalid.` | `IConfigManager` 模組未註冊或已被裁剪 | 確認實作類別存在且已由框架自動註冊；必要時明確引用 `GameFrameX.Runtime` 以避免被裁剪 |
| Inspector 的 `ImplementationComponentType` 顯示空白 | `componentType` 字串拼寫錯誤或程式集尚未載入 | 檢查 `componentType` 是否與實作類別的完整名稱完全一致 |
| `GetConfig<T>` 傳回 `default` | 對應名稱的設定項目尚未透過 `Add` 註冊 | 先呼叫 `configComponent.LoadConfig("...")` 或 `Add(...)` 後再讀取 |

## 背景（選填）

`ConfigComponent` 是繼承自 `GameFrameworkComponent` 的 MonoBehaviour，框架透過 `[GameFrameXAutoComponent(-5000)]` 自動註冊，優先級為 -5000。Inspector 衍生自 `ComponentTypeComponentInspector`，其核心職責是在編輯器中將介面與實作類別的完整名稱視覺化，方便在不執行遊戲的情況下確認模組的組裝狀況。