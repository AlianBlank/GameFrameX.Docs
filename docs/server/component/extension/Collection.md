# 集合处理

[[toc]]
---

## 集合处理(CollectionExtensions)

### `Merge<TKey, TValue>`

#### 功能描述

合并字典中的键值对。如果字典中已存在指定的键，则使用指定的函数对原有值和新值进行合并；否则直接添加键值对。

#### 参数

- `Dictionary<TKey, TValue> self`：要合并的字典。
- `TKey k`：要添加或合并的键。
- `TValue v`：要添加或合并的值。
- `Func<TValue, TValue, TValue> func`：用于合并值的函数。

#### 返回值

无返回值，直接修改传入的字典。

#### 应用场景

当需要在字典中添加或更新键值对，并在更新时根据特定逻辑合并值时使用。

#### 示例代码

```csharp
public static void Merge<TKey, TValue>(this Dictionary<TKey, TValue> self, TKey k, TValue v, Func<TValue, TValue, TValue> func)
{
    self[k] = self.TryGetValue(k, out var value) ? func(value, v) : v;
}

// 使用示例
var dictionary = new Dictionary<string, int>();
dictionary.Merge("key1", 10, (x, y) => x + y);
dictionary.Merge("key2", 20, (x, y) => x + y);
```

### `GetOrAdd<TKey, TValue>`

#### 功能描述

获取指定键的值，如果字典中不存在该键，则使用指定的函数获取值并添加到字典中。

#### 参数

- `Dictionary<TKey, TValue> self`：要操作的字典。
- `TKey key`：要获取值的键。
- `Func<TKey, TValue> valueGetter`：用于获取值的函数。

#### 返回值

返回指定键的值，类型为`TValue`。

#### 应用场景

当需要在字典中获取值，且在键不存在时自动添加键值对时使用。

#### 示例代码

```csharp
public static TValue GetOrAdd<TKey, TValue>(this Dictionary<TKey, TValue> self, TKey key, Func<TKey, TValue> valueGetter)
{
    if (!self.TryGetValue(key, out var value))
    {
        value = valueGetter(key);
        self[key] = value;
    }

    return value;
}

// 使用示例
var dictionary = new Dictionary<string, int>();
var value = dictionary.GetOrAdd("key1", k => k.GetHashCode());
```

### `GetOrAdd<TKey, TValue>`

#### 功能描述

获取指定键的值，如果字典中不存在该键，则使用无参构造函数创建一个新的值并添加到字典中。

#### 参数

- `Dictionary<TKey, TValue> self`：要操作的字典。
- `TKey key`：要获取值的键。

#### 返回值

返回指定键的值，类型为`TValue`。

#### 应用场景

当需要在字典中获取值，且在键不存在时自动添加键值对，且值类型具有无参构造函数时使用。

#### 示例代码

```csharp
public static TValue GetOrAdd<TKey, TValue>(this Dictionary<TKey, TValue> self, TKey key) where TValue : new()
{
    return GetOrAdd(self, key, k => new TValue());
}

// 使用示例
var dictionary = new Dictionary<string, int>();
var value = dictionary.GetOrAdd("key1");
```

### `RemoveIf<TKey, TValue>`

#### 功能描述

根据指定条件从字典中移除键值对。

#### 参数

- `Dictionary<TKey, TValue> self`：要操作的字典。
- `Func<TKey, TValue, bool> predict`：判断是否移除键值对的条件。

#### 返回值

返回移除的键值对数量，类型为`int`。

#### 应用场景

当需要根据特定条件从字典中移除元素时使用。

#### 示例代码

```csharp
public static int RemoveIf<TKey, TValue>(this Dictionary<TKey, TValue> self, Func<TKey, TValue, bool> predict)
{
    int count = 0;
    foreach (var kv in self)
    {
        if (predict(kv.Key, kv.Value))
        {
            self.Remove(kv.Key);
            count++;
        }
    }

    return count;
}

// 使用示例
var dictionary = new Dictionary<string, int>();
dictionary.Add("key1", 10);
dictionary.Add("key2", 20);
var removedCount = dictionary.RemoveIf((k, v) => v > 15);
```

### `IsNullOrEmpty<T>`

#### 功能描述

检查集合是否为 null 或空。

#### 参数

- `ICollection<T> self`：要检查的集合。

#### 返回值

如果集合为 null 或空，则为 true；否则为 false，类型为`bool`。

#### 应用场景

用于在操作集合前检查其是否为空，避免空引用异常。

#### 示例代码

```csharp
public static bool IsNullOrEmpty<T>(this ICollection<T> self)
{
    return self == null || self.Count <= 0;
}

// 使用示例
var list = new List<int>();
bool isEmpty = list.IsNullOrEmpty();
```

### `Random<T>`

#### 功能描述

从列表中随机获取一个对象。

#### 参数

- `List<T> list`：要随机的列表。

#### 返回值

返回随机获取的对象，类型为`T`。

#### 应用场景

当需要从列表中随机选择一个元素时使用。

#### 示例代码

```csharp
public static T Random<T>(this List<T> list)
{
    int n = list.Count;
    var r = ThreadLocalRandom.Current;
    int index = r.Next(n);
    return list[index];
}

// 使用示例
var list = new List<int> { 1, 2, 3, 4, 5 };
var randomItem = list.Random();
```

### `Shuffer<T>`

#### 功能描述

打乱列表中的元素顺序。

#### 参数

- `List<T> list`：要打乱顺序的列表。

#### 返回值

无返回值，直接修改传入的列表。

#### 应用场景

当需要随机打乱列表元素顺序时使用。

#### 示例代码

```csharp
public static void Shuffer<T>(this List<T> list)
{
    int n = list.Count;
    var r = ThreadLocalRandom.Current;
    for (int i = 0; i < n; i++)
    {
        int rand = r.Next(i, n);
        (list[i], list[rand]) = (list[rand], list[i]);
    }
}

// 使用示例
var list = new List<int> { 1, 2, 3, 4, 5 };
list.Shuffer();
```

### `RemoveIf<T>`

#### 功能描述

从列表中移除满足条件的元素。

#### 参数

- `List<T> list`：要操作的列表。
- `Predicate<T> condition`：用于判断元素是否满足移除条件的委托。

#### 返回值

无返回值，直接修改传入的列表。

#### 应用场景

当需要根据特定条件从列表中移除元素时使用。

#### 示例代码

```csharp
public static void RemoveIf<T>(this List<T> list, Predicate<T> condition)
{
    var idx = list.FindIndex(condition);
    while (idx >= 0)
    {
        list.RemoveAt(idx);
        idx = list.FindIndex(condition);
    }
}

// 使用示例
var list = new List<int> { 1, 2, 3, 4, 5 };
list.RemoveIf(x => x % 2 == 0);
```

### `AddRange<T>`

#### 功能描述

将一个可枚举集合的元素添加到哈希集合中。

#### 参数

- `HashSet<T> c`：要添加元素的哈希集合。
- `IEnumerable<T> e`：要添加的元素的可枚举集合。

#### 返回值

无返回值，直接修改传入的哈希集合。

#### 应用场景

当需要将多个元素添加到哈希集合中时使用。

#### 示例代码

```csharp
public static void AddRange<T>(this HashSet<T> c, IEnumerable<T> e)
{
    foreach (var item in e)
    {
        c.Add(item);
    }
}

// 使用示例
var set = new HashSet<int>();
set.AddRange(new List<int> { 1, 2, 3, 4, 5 });
```
