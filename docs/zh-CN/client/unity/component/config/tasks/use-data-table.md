# 如何使用数据表(BaseDataTable)读取配置项

`BaseDataTable<T>` 是框架提供的配置数据表泛型基类,封装了按 ID 查询、遍历、过滤等常用操作。读完本页你能在业务代码里通过 ID 拿到任意配置条目,并使用 `TryGet`、`FirstOrDefault`、`All`、`ToList`、`Find` 等方法完成常见查询。

## 前置条件

- 已通过 `GameFrameX.Config.Runtime` 命名空间引入数据表程序集。
- 数据表实例已通过 `ConfigManager` 注册并完成 `LoadAsync()` 异步加载。
- `T` 必须为引用类型(`where T : class`)。

## 操作步骤

### 1. 通过 ConfigManager 获取数据表实例

数据表统一由 `ConfigManager` 持有,通过表名(字符串键)返回 `IDataTable` 接口。

```csharp
var dataTable = GameFrameX.Runtime.GameFrameXEntry.GetModule<IConfigManager>()
    .GetDataTable<MyConfig>("MyConfig");
```

Source: [ConfigManager.cs](/Runtime/Config/Config/ConfigManager.cs#L49-L60)

### 2. 按 ID 读取单条配置

推荐使用 `TryGet`,找不到时返回 `false` 而不是 `null`,避免空引用异常:

```csharp
if (dataTable.TryGet(1001, out var item))
{
    // 命中 id=1001 的配置
    Debug.Log(item.Name);
}
```

`int` 会隐式转换为 `long`,与 `long` 查询共用同一个字典;字符串键走 `StringDataMaps`。

Source: [BaseDataTable.cs](/Runtime/Config/Config/BaseDataTable.cs#L148-L181)

也可用索引器一行搞定(命中失败返回 `null`):

```csharp
var item = dataTable[1001];
```

Source: [BaseDataTable.cs](/Runtime/Config/Config/BaseDataTable.cs#L192-L223)

### 3. 遍历或过滤多条配置

需要集合视图时,优先用 `All`(数组)或 `ToList()`(列表),二者都会复制出独立容器:

```csharp
foreach (var entry in dataTable.All)
{
    // 处理每一条
}
```

按条件找第一条命中:

```csharp
var firstHit = dataTable.Find(x => x.Level >= 10);
```

Source: [IDataTable.cs](/Runtime/Config/Config/IDataTable.cs#L233-L249)

### 4. 同步整个数据表

调用 `LoadAsync()` 等待异步加载完成;`Count` 返回条目数量,`FirstOrDefault` / `LastOrDefault` 拿首尾元素:

```csharp
await dataTable.LoadAsync();
Debug.Log($"共 {dataTable.Count} 条");
Debug.Log(dataTable.FirstOrDefault?.Name);
```

Source: [BaseDataTable.cs](/Runtime/Config/Config/BaseDataTable.cs#L84-L242)

## 常见变体

| 场景 | 用法 |
|------|------|
| 字符串主键 | `dataTable.TryGet("key_001", out var item)` 或 `dataTable["key_001"]` |
| long 主键 | `dataTable.TryGet(1001L, out var item)` |
| 复制为列表 | `List<MyConfig> list = dataTable.ToList();` |
| 复制为数组 | `MyConfig[] arr = dataTable.ToArray();` |
| 统计条目 | `int n = dataTable.Count;` |
| 首/尾元素 | `T first = dataTable.FirstOrDefault;` `T last = dataTable.LastOrDefault;` |

## 常见错误

- **继续用 `Get(int/long/string)`**:这三个重载被标记为 `[Obsolete("请使用TryGet方法")]`,编译时会发出警告,请改用 `TryGet` 或索引器。
  Source: [BaseDataTable.cs](/Runtime/Config/Config/BaseDataTable.cs#L97-L134)
- **未等待 `LoadAsync()` 就查询**:数据未加载完时字典为空,`TryGet` 会直接返回 `false`,索引器返回 `null`。务必 `await` 完成。
- **子类修改集合后忘记 `InvalidateCache()`**:若派生类直接改 `DataList`/`LongDataMaps`/`StringDataMaps`,必须调用 `InvalidateCache()`,否则 `Count`、`FirstOrDefault`、`LastOrDefault` 会读到旧的缓存值。
  Source: [BaseDataTable.cs](/Runtime/Config/Config/BaseDataTable.cs#L67-L74)
- **把 `T` 写成值类型**:基类约束为 `where T : class`,值类型会被编译器拒绝。

## 背景(可选)

`BaseDataTable<T>` 内部维护三份结构:`LongDataMaps`(`Dictionary<long, T>`)、`StringDataMaps`(`Dictionary<string, T>`)和 `DataList`,首/尾元素与 `Count` 通过缓存字段加速读取;任何修改都要触发 `InvalidateCache()` 才能保证一致。`IConfigManager` 负责按表名注册与派发,具体表内容由生成器产出并填充上述三个集合。

关于加载与初始化流程,见 `ConfigComponent` 与 `LoadConfigSuccessEventArgs`。