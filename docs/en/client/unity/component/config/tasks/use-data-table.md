# How to Use the Data Table (BaseDataTable) to Read Configuration Items

`BaseDataTable<T>` is the framework's generic base class for configuration data tables, encapsulating common operations such as ID-based queries, traversal, and filtering. After reading this page, you will be able to retrieve any configuration entry by ID in your business code and use methods like `TryGet`, `FirstOrDefault`, `All`, `ToList`, and `Find` to perform common queries.

## Prerequisites

- The data table assembly has been imported via the `GameFrameX.Config.Runtime` namespace.
- The data table instance has been registered through `ConfigManager` and completed asynchronous loading via `LoadAsync()`.
- `T` must be a reference type (`where T : class`).

## Steps

### 1. Get the Data Table Instance via ConfigManager

Data tables are uniformly held by `ConfigManager`, which returns an `IDataTable` interface by table name (string key).

```csharp
var dataTable = GameFrameX.Runtime.GameFrameXEntry.GetModule<IConfigManager>()
    .GetDataTable<MyConfig>("MyConfig");
```

Source: [ConfigManager.cs](/Runtime/Config/Config/ConfigManager.cs#L49-L60)

### 2. Read a Single Configuration by ID

`TryGet` is recommended — it returns `false` instead of `null` when not found, avoiding null reference exceptions:

```csharp
if (dataTable.TryGet(1001, out var item))
{
    // Hit configuration with id=1001
    Debug.Log(item.Name);
}
```

`int` is implicitly converted to `long`, sharing the same dictionary with `long` queries; string keys go through `StringDataMaps`.

Source: [BaseDataTable.cs](/Runtime/Config/Config/BaseDataTable.cs#L148-L181)

You can also use the indexer in one line (returns `null` if not found):

```csharp
var item = dataTable[1001];
```

Source: [BaseDataTable.cs](/Runtime/Config/Config/BaseDataTable.cs#L192-L223)

### 3. Traverse or Filter Multiple Configurations

When a collection view is needed, prefer `All` (array) or `ToList()` (list) — both produce an independent copy:

```csharp
foreach (var entry in dataTable.All)
{
    // Process each entry
}
```

Find the first match by condition:

```csharp
var firstHit = dataTable.Find(x => x.Level >= 10);
```

Source: [IDataTable.cs](/Runtime/Config/Config/IDataTable.cs#L233-L249)

### 4. Synchronize the Entire Data Table

Call `LoadAsync()` and wait for asynchronous loading to complete; `Count` returns the number of entries, `FirstOrDefault` / `LastOrDefault` retrieves the first/last element:

```csharp
await dataTable.LoadAsync();
Debug.Log($"Total {dataTable.Count} entries");
Debug.Log(dataTable.FirstOrDefault?.Name);
```

Source: [BaseDataTable.cs](/Runtime/Config/Config/BaseDataTable.cs#L84-L242)

## Common Variations

| Scenario | Usage |
|------|------|
| String primary key | `dataTable.TryGet("key_001", out var item)` or `dataTable["key_001"]` |
| long primary key | `dataTable.TryGet(1001L, out var item)` |
| Copy as list | `List<MyConfig> list = dataTable.ToList();` |
| Copy as array | `MyConfig[] arr = dataTable.ToArray();` |
| Count entries | `int n = dataTable.Count;` |
| First/last element | `T first = dataTable.FirstOrDefault;` `T last = dataTable.LastOrDefault;` |

## Common Mistakes

- **Still using `Get(int/long/string)`**: These three overloads are marked as `[Obsolete("请使用TryGet方法")]`, producing compiler warnings. Please switch to `TryGet` or the indexer.
  Source: [BaseDataTable.cs](/Runtime/Config/Config/BaseDataTable.cs#L97-L134)
- **Querying before awaiting `LoadAsync()`**: When data is not yet loaded, the dictionary is empty, `TryGet` directly returns `false`, and the indexer returns `null`. Always `await` to completion.
- **Forgetting `InvalidateCache()` after subclasses modify the collection**: If a derived class directly modifies `DataList`/`LongDataMaps`/`StringDataMaps`, you must call `InvalidateCache()`, otherwise `Count`, `FirstOrDefault`, `LastOrDefault` will read stale cached values.
  Source: [BaseDataTable.cs](/Runtime/Config/Config/BaseDataTable.cs#L67-L74)
- **Using a value type for `T`**: The base class constraint is `where T : class`; value types will be rejected by the compiler.

## Background (Optional)

`BaseDataTable<T>` internally maintains three structures: `LongDataMaps` (`Dictionary<long, T>`), `StringDataMaps` (`Dictionary<string, T>`), and `DataList`. First/last elements and `Count` are accelerated through cached fields; any modification must trigger `InvalidateCache()` to ensure consistency. `IConfigManager` is responsible for registration and dispatch by table name, while the actual table content is produced by the generator and populates the three collections above.

For details on the loading and initialization flow, see `ConfigComponent` and `LoadConfigSuccessEventArgs`.