# 如何使用資料表(BaseDataTable)讀取設定項

`BaseDataTable<T>` 是框架提供的設定資料表泛型基底類別，封裝了依 ID 查詢、遍歷、篩選等常用操作。讀完本頁你能在業務程式碼裡透過 ID 拿到任意設定條目，並使用 `TryGet`、`FirstOrDefault`、`All`、`ToList`、`Find` 等方法完成常見查詢。

## 前置條件

- 已透過 `GameFrameX.Config.Runtime` 命名空間引入資料表組件。
- 資料表執行個體已透過 `ConfigManager` 註冊並完成 `LoadAsync()` 非同步載入。
- `T` 必須為參考型別(`where T : class`)。

## 操作步驟

### 1. 透過 ConfigManager 取得資料表執行個體

資料表統一由 `ConfigManager` 持有，透過資料表名稱(字串鍵)回傳 `IDataTable` 介面。

```csharp
var dataTable = GameFrameX.Runtime.GameFrameXEntry.GetModule<IConfigManager>()
    .GetDataTable<MyConfig>("MyConfig");
```

Source: [ConfigManager.cs](/Runtime/Config/Config/ConfigManager.cs#L49-L60)

### 2. 依 ID 讀取單條設定

推薦使用 `TryGet`，找不到時回傳 `false` 而不是 `null`，避免空參考例外：

```csharp
if (dataTable.TryGet(1001, out var item))
{
    // 命中 id=1001 的設定
    Debug.Log(item.Name);
}
```

`int` 會隱含轉換為 `long`，與 `long` 查詢共用同一個字典；字串鍵走 `StringDataMaps`。

Source: [BaseDataTable.cs](/Runtime/Config/Config/BaseDataTable.cs#L148-L181)

也可用索引子一行搞定(命中失敗回傳 `null`)：

```csharp
var item = dataTable[1001];
```

Source: [BaseDataTable.cs](/Runtime/Config/Config/BaseDataTable.cs#L192-L223)

### 3. 遍歷或篩選多條設定

需要集合檢視時，優先用 `All`(陣列)或 `ToList()`(列表)，兩者都會複製出獨立容器：

```csharp
foreach (var entry in dataTable.All)
{
    // 處理每一條
}
```

依條件找第一筆命中：

```csharp
var firstHit = dataTable.Find(x => x.Level >= 10);
```

Source: [IDataTable.cs](/Runtime/Config/Config/IDataTable.cs#L233-L249)

### 4. 同步整個資料表

呼叫 `LoadAsync()` 等待非同步載入完成；`Count` 回傳條目數量，`FirstOrDefault` / `LastOrDefault` 拿首尾元素：

```csharp
await dataTable.LoadAsync();
Debug.Log($"共 {dataTable.Count} 條");
Debug.Log(dataTable.FirstOrDefault?.Name);
```

Source: [BaseDataTable.cs](/Runtime/Config/Config/BaseDataTable.cs#L84-L242)

## 常見變體

| 場景 | 用法 |
|------|------|
| 字串主鍵 | `dataTable.TryGet("key_001", out var item)` 或 `dataTable["key_001"]` |
| long 主鍵 | `dataTable.TryGet(1001L, out var item)` |
| 複製為列表 | `List<MyConfig> list = dataTable.ToList();` |
| 複製為陣列 | `MyConfig[] arr = dataTable.ToArray();` |
| 統計條目 | `int n = dataTable.Count;` |
| 首/尾元素 | `T first = dataTable.FirstOrDefault;` `T last = dataTable.LastOrDefault;` |

## 常見錯誤

- **繼續用 `Get(int/long/string)`**：這三個多載被標記為 `[Obsolete("請使用TryGet方法")]`，編譯時會發出警告，請改用 `TryGet` 或索引子。
  Source: [BaseDataTable.cs](/Runtime/Config/Config/BaseDataTable.cs#L97-L134)
- **未等待 `LoadAsync()` 就查詢**：資料未載入完時字典為空，`TryGet` 會直接回傳 `false`，索引子回傳 `null`。務必 `await` 完成。
- **子類別修改集合後忘記 `InvalidateCache()`**：若衍生類別直接改 `DataList`/`LongDataMaps`/`StringDataMaps`，必須呼叫 `InvalidateCache()`，否則 `Count`、`FirstOrDefault`、`LastOrDefault` 會讀到舊的快取值。
  Source: [BaseDataTable.cs](/Runtime/Config/Config/BaseDataTable.cs#L67-L74)
- **把 `T` 寫成實值型別**：基底類別約束為 `where T : class`，實值型別會被編譯器拒絕。

## 背景(可選)

`BaseDataTable<T>` 內部維護三份結構：`LongDataMaps`(`Dictionary<long, T>`)、`StringDataMaps`(`Dictionary<string, T>`)和 `DataList`，首/尾元素與 `Count` 透過快取欄位加速讀取；任何修改都要觸發 `InvalidateCache()` 才能保證一致。`IConfigManager` 負責依資料表名稱註冊與派發，具體資料表內容由產生器產出並填充上述三個集合。

關於載入與初始化流程，見 `ConfigComponent` 與 `LoadConfigSuccessEventArgs`。