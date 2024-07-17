# 简易的双向字典

[[toc]]
---

### TryGetKey

#### 功能描述

尝试根据提供的值在双向字典中获取对应的键。

#### 参数

- `TValue value`：要查找的值。

#### 返回值

- 返回类型为`bool`，如果成功找到键，则返回`true`；否则返回`false`。
- `TKey key`：输出参数，存储查找到的键。

#### 应用场景

当需要根据值来反向查找键的场景，例如在某些映射关系中需要从结果反推原因或来源。

#### 示例代码

```csharp
BidirectionalDictionary<int, string> dict = new BidirectionalDictionary<int, string>();
dict.TryAdd(1, "One");
TKey key;
bool found = dict.TryGetKey("One", out key);

if (found)
{
    Console.WriteLine("Key found: " + key);
}
else
{
    Console.WriteLine("Key not found.");
}
```

### TryGetValue

#### 功能描述

尝试根据提供的键在双向字典中获取对应的值。

#### 参数

- `TKey key`：要查找的键。

#### 返回值

- 返回类型为`bool`，如果成功找到值，则返回`true`；否则返回`false`。
- `TValue value`：输出参数，存储查找到的值。

#### 应用场景

当需要根据键来获取值的场景，例如在配置映射、数据索引等。

#### 示例代码

```csharp
BidirectionalDictionary<int, string> dict = new BidirectionalDictionary<int, string>();
dict.TryAdd(1, "One");
TValue value;
bool found = dict.TryGetValue(1, out value);

if (found)
{
    Console.WriteLine("Value found: " + value);
}
else
{
    Console.WriteLine("Value not found.");
}
```

### Clear

#### 功能描述

清空双向字典中的所有键值对。

#### 参数

无。

#### 返回值

无。

#### 应用场景

当需要重置字典状态，移除所有键值对以重新使用字典的场景。

#### 示例代码

```csharp
BidirectionalDictionary<int, string> dict = new BidirectionalDictionary<int, string>();
dict.TryAdd(1, "One");
dict.Clear();

// 此时字典为空
```

### TryAdd

#### 功能描述

尝试向双向字典中添加键值对。

#### 参数

- `TKey key`：要添加的键。
- `TValue value`：要添加的值。

#### 返回值

返回类型为`bool`，如果成功添加键值对，则返回`true`；否则返回`false`。

#### 应用场景

用于需要添加新键值对到字典中的场景，同时保证键和值的双向映射关系。

#### 示例代码

```csharp
BidirectionalDictionary<int, string> dict = new BidirectionalDictionary<int, string>();
bool added = dict.TryAdd(1, "One");

if (added)
{
    Console.WriteLine("Key-value pair added successfully.");
}
else
{
    Console.WriteLine("Failed to add key-value pair.");
}
```
