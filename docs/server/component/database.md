# 数据库服务

提供对数据库服务的接口定义和基础

定义了一个名为 `IGameDbService` 的数据库服务接口，主要功能包括：

1. **数据库连接管理**：提供打开和关闭数据库连接的方法。
2. **数据加载**：根据ID加载数据，支持提供默认值。
3. **数据查询**：支持单条数据查询、列表查询、排序查询、分页查询等多种查询方式。
4. **数据操作**：提供数据添加、删除、更新、计数等功能。
5. **数据存在性检查**：支持同步和异步检查数据是否存在。

定义了主要接口 `ICacheState` 的数据存储的接口

`ICacheState` 是一个定义在 `GameFrameX.DataBase.State` 命名空间中的接口，它为缓存数据对象提供了一个标准化的操作和行为模式。以下是接口的主要功能和特点的总结：

1. **唯一ID**：通过 `Id` 属性，每个缓存对象都有一个唯一的标识符，这有助于在数据库中唯一地识别和索引对象。

2. **修改状态**：`IsModify` 属性用于标记对象是否已被修改，这对于决定是否需要将对象的更改同步回数据库至关重要。

3. **加载后处理**：`AfterLoadFromDb` 方法在对象从数据库加载后被调用，允许开发者执行一些初始化或状态设置操作。

4. **保存后处理**：`AfterSaveToDb` 方法在对象保存到数据库后被调用，可以用于执行一些后续处理，如日志记录或状态更新。

5. **序列化**：`ToBytes` 方法允许将对象序列化为字节数组，这在需要将对象数据存储到文件或通过网络传输时非常有用。

此外，`ICacheState` 接口还继承了 `ISafeDelete`、`ISafeCreate` 和 `ISafeUpdate`
接口，确保了对象在创建、更新和删除时的安全性和一致性。通过实现这个接口，开发者可以确保缓存数据对象在应用程序中的一致性和可靠性。

---

[[toc]]

## (ICacheState)接口定义和解释

### ICacheState Interface

#### 功能描述

`ICacheState` 接口定义了缓存数据对象的基本行为，包括数据的创建、更新、删除以及从数据库加载和保存后的处理。它还提供了一个方法来将对象序列化为字节数组。

#### 参数

- 无直接参数，但接口定义了需要实现的方法。

#### 返回值

- 无直接返回值，但接口定义的方法可能具有返回值。

#### 应用场景

适用于需要缓存数据并在数据库中持久化存储的场景，如游戏服务器中的数据管理。

#### 示例代码

```csharp
public class CacheData : ICacheState
{
    public long Id { get; set; }
    public bool IsModify { get; private set; }

    public void AfterLoadFromDb(bool isNew)
    {
        // 从数据库加载后的处理逻辑
    }

    public void AfterSaveToDb()
    {
        // 保存到数据库后的处理逻辑
    }

    public byte[] ToBytes()
    {
        // 将对象序列化为字节数组的逻辑
        return null;
    }
}
```

### Id Property

#### 功能描述

获取或设置对象的唯一标识符。

#### 参数

- 无参数。

#### 返回值

- 返回一个 `long` 类型的值，表示唯一ID。

#### 应用场景

用于需要唯一标识对象的场景，如数据库记录的唯一键。

#### 示例代码

```csharp
public long Id { get; set; }
```

### IsModify Property

#### 功能描述

获取一个值，指示对象是否已被修改。

#### 参数

- 无参数。

#### 返回值

- 返回一个 `bool` 类型的值，`true` 表示对象已被修改，`false` 表示未修改。

#### 应用场景

用于检测对象状态，决定是否需要更新数据库记录。

#### 示例代码

```csharp
public bool IsModify { get; }
```

### AfterLoadFromDb Method

#### 功能描述

在对象从数据库加载后调用的方法，可以进行一些初始化或状态设置。

#### 参数

- `bool isNew`：指示对象是否是新创建的。

#### 返回值

- 无返回值。

#### 应用场景

用于在对象从数据库加载后进行一些特定的处理，如初始化数据或设置状态。

#### 示例代码

```csharp
public void AfterLoadFromDb(bool isNew)
{
    // 从数据库加载后的处理逻辑
}
```

### AfterSaveToDb Method

#### 功能描述

在对象保存到数据库后调用的方法，可以进行一些后续处理。

#### 参数

- 无参数。

#### 返回值

- 无返回值。

#### 应用场景

用于在对象保存到数据库后进行一些特定的处理，如日志记录或状态更新。

#### 示例代码

```csharp
public void AfterSaveToDb()
{
    // 保存到数据库后的处理逻辑
}
```

### ToBytes Method

#### 功能描述

将对象序列化为字节数组，用于存储或传输。

#### 参数

- 无参数。

#### 返回值

- 返回一个 `byte[]` 类型的数组，包含序列化后的数据。

#### 应用场景

用于需要将对象数据存储到文件或通过网络传输的场景。

#### 示例代码

```csharp
public byte[] ToBytes()
{
    // 将对象序列化为字节数组的逻辑
    return null;
}
```

## (IGameDbService)接口定义和解释

### Open

#### 功能描述

链接数据库。

#### 参数

- `string url`：数据库的链接地址。
- `string dbName`：数据库的名称。

#### 返回值

无返回值。

#### 应用场景

在需要访问数据库之前，必须先建立数据库连接。

#### 示例代码

```csharp
public void Open(string url, string dbName)
{
    // 链接数据库的代码
}
```

### Close

#### 功能描述

关闭数据库连接。

#### 参数

无参数。

#### 返回值

无返回值。

#### 应用场景

在完成数据库操作后，需要释放资源时使用。

#### 示例代码

```csharp
public void Close()
{
    // 关闭数据库连接的代码
}
```

### `LoadState<TState>`

#### 功能描述

加载数据。

#### 参数

- `long id`：数据的唯一标识符。
- `Func<TState> defaultGetter`：当数据不存在时返回默认值的函数。

#### 返回值

返回类型为`Task<TState>`的数据。

#### 应用场景

需要从数据库中加载特定数据时使用。

#### 示例代码

```csharp
public async Task<TState> LoadState<TState>(long id, Func<TState> defaultGetter = null) where TState : ICacheState, new()
{
    // 加载数据的代码
}
```

### `FindAsync<TState>`

#### 功能描述

查询单条数据。

#### 参数

- `Expression<Func<TState, bool>> filter`：查询条件。

#### 返回值

返回类型为`Task<TState>`的数据。

#### 应用场景

需要根据特定条件查询单条数据时使用。

#### 示例代码

```csharp
public async Task<TState> FindAsync<TState>(Expression<Func<TState, bool>> filter) where TState : ICacheState, new()
{
    // 查询单条数据的代码
}
```

### `FindListAsync<TState>`

#### 功能描述

查询数据。

#### 参数

- `Expression<Func<TState, bool>> filter`：查询条件。

#### 返回值

返回类型为`Task<List<TState>>`的数据列表。

#### 应用场景

需要根据特定条件查询多条数据时使用。

#### 示例代码

```csharp
public async Task<List<TState>> FindListAsync<TState>(Expression<Func<TState, bool>> filter) where TState : ICacheState, new()
{
    // 查询数据的代码
}
```

### `FindSortAscendingFirstOneAsync<TState>`

#### 功能描述

以升序方式查找符合条件的第一个元素。

#### 参数

- `Expression<Func<TState, bool>> filter`：过滤表达式。
- `Expression<Func<TState, object>> sortExpression`：排序字段表达式。

#### 返回值

返回类型为`Task<TState>`的第一个元素。

#### 应用场景

需要按升序查找并获取符合条件的第一个元素时使用。

#### 示例代码

```csharp
public async Task<TState> FindSortAscendingFirstOneAsync<TState>(Expression<Func<TState, bool>> filter, Expression<Func<TState, object>> sortExpression) where TState : ICacheState, new()
{
    // 按升序查找第一个元素的代码
}
```

### `FindSortDescendingFirstOneAsync<TState>`

#### 功能描述

以降序方式查找符合条件的第一个元素。

#### 参数

- `Expression<Func<TState, bool>> filter`：过滤表达式。
- `Expression<Func<TState, object>> sortExpression`：排序字段表达式。

#### 返回值

返回类型为`Task<TState>`的第一个元素。

#### 应用场景

需要按降序查找并获取符合条件的第一个元素时使用。

#### 示例代码

```csharp
public async Task<TState> FindSortDescendingFirstOneAsync<TState>(Expression<Func<TState, bool>> filter, Expression<Func<TState, object>> sortExpression) where TState : ICacheState, new()
{
    // 按降序查找第一个元素的代码
}
```

### `FindSortDescendingAsync<TState>`

#### 功能描述

以降序方式查找符合条件的元素并进行分页。

#### 参数

- `Expression<Func<TState, bool>> filter`：过滤表达式。
- `Expression<Func<TState, object>> sortExpression`：排序字段表达式。
- `long pageIndex`：页码，从0开始。
- `long pageSize`：每页数量，默认为10。

#### 返回值

返回类型为`Task<List<TState>>`的数据列表。

#### 应用场景

需要按降序进行分页查询时使用。

#### 示例代码

```csharp
public async Task<List<TState>> FindSortDescendingAsync<TState>(Expression<Func<TState, bool>> filter, Expression<Func<TState, object>> sortExpression, long pageIndex = 0, long pageSize = 10) where TState : ICacheState, new()
{
    // 按降序分页查询的代码
}
```

### `FindSortAscendingAsync<TState>`

#### 功能描述

以升序方式查找符合条件的元素并进行分页。

#### 参数

- `Expression<Func<TState, bool>> filter`：过滤表达式。
- `Expression<Func<TState, object>> sortExpression`：排序字段表达式。
- `long pageIndex`：页码，从0开始。
- `long pageSize`：每页数量，默认为10。

#### 返回值

返回类型为`Task<List<TState>>`的数据列表。

#### 应用场景

需要按升序进行分页查询时使用。

#### 示例代码

```csharp
public async Task<List<TState>> FindSortAscendingAsync<TState>(Expression<Func<TState, bool>> filter, Expression<Func<TState, object>> sortExpression, long pageIndex = 0, long pageSize = 10) where TState : ICacheState, new()
{
    // 按升序分页查询的代码
}
```

### `CountAsync<TState>`

#### 功能描述

查询数据长度。

#### 参数

- `Expression<Func<TState, bool>> filter`：查询条件。

#### 返回值

返回类型为`Task<long>`的数据长度。

#### 应用场景

需要统计符合条件的数据数量时使用。

#### 示例代码

```csharp
public async Task<long> CountAsync<TState>(Expression<Func<TState, bool>> filter) where TState : ICacheState, new()
{
    // 查询数据长度的代码
}
```

### `DeleteAsync<TState>`

#### 功能描述

删除数据。

#### 参数

- `Expression<Func<TState, bool>> filter`：查询条件。
- `TState state`：要删除的数据对象。

#### 返回值

返回类型为`Task<long>`的删除数量。

#### 应用场景

需要删除符合条件的数据时使用。

#### 示例代码

```csharp
public async Task<long> DeleteAsync<TState>(Expression<Func<TState, bool>> filter) where TState : ICacheState, new()
{
    // 删除数据的代码
}

public async Task<long> DeleteAsync<TState>(TState state) where TState : ICacheState, new()
{
    // 删除数据的代码
}
```

### `AddAsync<TState>`

#### 功能描述

保存数据。

#### 参数

- `TState state`：要保存的数据对象。

#### 返回值

返回类型为`Task<long>`的保存结果。

#### 应用场景

需要添加新数据时使用。

#### 示例代码

```csharp
public async Task<long> AddAsync<TState>(TState state) where TState : ICacheState, new()
{
    // 保存数据的代码
}
```

### `AddListAsync<TState>`

#### 功能描述

保存多条数据。

#### 参数

- `IEnumerable<TState> states`：要保存的数据对象集合。

#### 返回值

无返回值。

#### 应用场景

需要批量添加数据时使用。

#### 示例代码

```csharp
public async Task AddListAsync<TState>(IEnumerable<TState> states) where TState : class, ICacheState, new()
{
    // 批量保存数据的代码
}
```

### `UpdateAsync<TState>`

#### 功能描述

保存数据,如果数据已经存在则更新,如果不存在则插入。

#### 参数

- `TState state`：要保存或更新的数据对象。

#### 返回值

返回类型为`Task<TState>`的保存或更新后的数据对象。

#### 应用场景

需要根据数据是否存在进行保存或更新操作时使用。

#### 示例代码

```csharp
public async Task<TState> UpdateAsync<TState>(TState state) where TState : ICacheState, new()
{
    // 保存或更新数据的代码
}
```

### `Any<TState>`

#### 功能描述

查询符合条件的数据是否存在。

#### 参数

- `Expression<Func<TState, bool>> filter`：查询条件。

#### 返回值

返回一个布尔值，表示是否存在符合条件的数据。

#### 应用场景

需要判断是否存在符合条件的数据时使用。

#### 示例代码

```csharp
public bool Any<TState>(Expression<Func<TState, bool>> filter) where TState : ICacheState, new()
{
    // 判断数据是否存在的代码
}
```

### `AnyAsync<TState>`

#### 功能描述

异步查询符合条件的数据是否存在。

#### 参数

- `Expression<Func<TState, bool>> filter`：查询条件。

#### 返回值

返回类型为`Task<bool>`的布尔值，表示是否存在符合条件的数据。

#### 应用场景

需要异步判断是否存在符合条件的数据时使用。

#### 示例代码

```csharp
public async Task<bool> AnyAsync<TState>(Expression<Func<TState, bool>> filter) where TState : ICacheState, new()
{
    // 异步判断数据是否存在的代码
}
```

