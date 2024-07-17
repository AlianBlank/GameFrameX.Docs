# 迭代器

[[toc]]
---

## 迭代器(IEnumerableExtensions)

### IntersectBy

#### 功能描述

按字段属性判等取交集。

#### 参数

- `IEnumerable<TFirst> first`：第一个序列。
- `IEnumerable<TSecond> second`：第二个序列。
- `Func<TFirst, TSecond, bool> condition`：比较两个元素是否相等的条件函数。

#### 返回值

返回两个序列的交集，类型为 `IEnumerable<TFirst>`。

#### 应用场景

用于需要根据某些条件找出两个序列共有元素的场景。

#### 示例代码

```csharp
public static IEnumerable<TFirst> IntersectBy<TFirst, TSecond>(this IEnumerable<TFirst> first, IEnumerable<TSecond> second, Func<TFirst, TSecond, bool> condition)
{
    return first.Where(f => second.Any(s => condition(f, s)));
}

// 使用示例
var firstList = new List<Person> { /* ... */ };
var secondList = new List<Person> { /* ... */ };

var intersection = firstList.IntersectBy(secondList, (f, s) => f.Id == s.Id);
```

---

### IntersectBy (with keySelector)

#### 功能描述

按字段属性判等取交集。

#### 参数

- `IEnumerable<TSource> first`：第一个序列。
- `IEnumerable<TSource> second`：第二个序列。
- `Func<TSource, TKey> keySelector`：选择用于比较的键的函数。
- `IEqualityComparer<TKey> comparer`（可选）：比较键时使用的比较器。

#### 返回值

返回两个序列的交集，类型为 `IEnumerable<TSource>`。

#### 应用场景

用于需要根据某个键找出两个序列共有元素的场景。

#### 示例代码

```csharp
public static IEnumerable<TSource> IntersectBy<TSource, TKey>(this IEnumerable<TSource> first, IEnumerable<TSource> second, Func<TSource, TKey> keySelector)
{
    return first.IntersectBy(second, keySelector, null);
}

// 使用示例
var firstList = new List<Person> { /* ... */ };
var secondList = new List<Person> { /* ... */ };

var intersection = firstList.IntersectBy(secondList, p => p.Id);
```

---

### IntersectAll

#### 功能描述

多个集合取交集元素。

#### 参数

- `IEnumerable<IEnumerable<T>> source`：包含多个序列的序列。
- `Func<TSource, TKey> keySelector`（可选）：选择用于比较的键的函数。
- `IEqualityComparer<TKey> comparer`（可选）：比较键时使用的比较器。

#### 返回值

返回多个序列的交集，类型为 `IEnumerable<T>` 或 `IEnumerable<TSource>`。

#### 应用场景

用于需要找出多个序列共有元素的场景。

#### 示例代码

```csharp
public static IEnumerable<T> IntersectAll<T>(this IEnumerable<IEnumerable<T>> source)
{
    return source.Aggregate((current, item) => current.Intersect(item));
}

// 使用示例
var list1 = new List<int> { 1, 2, 3 };
var list2 = new List<int> { 2, 3, 4 };
var list3 = new List<int> { 3, 4, 5 };

var allIntersection = new List<IEnumerable<int>> { list1, list2, list3 }.IntersectAll();
```

---

### ExceptBy

#### 功能描述

按字段属性判等取差集。

#### 参数

- `IEnumerable<TFirst> first`：第一个序列。
- `IEnumerable<TSecond> second`：第二个序列。
- `Func<TFirst, TSecond, bool> condition`：比较两个元素是否相等的条件函数。

#### 返回值

返回第一个序列中不包含第二个序列元素的差集，类型为 `IEnumerable<TFirst>`。

#### 应用场景

用于需要找出一个序列中独有的元素的场景。

#### 示例代码

```csharp
public static IEnumerable<TFirst> ExceptBy<TFirst, TSecond>(this IEnumerable<TFirst> first, IEnumerable<TSecond> second, Func<TFirst, TSecond, bool> condition)
{
    return first.Where(f => !second.Any(s => condition(f, s)));
}

// 使用示例
var firstList = new List<Person> { /* ... */ };
var secondList = new List<Person> { /* ... */ };

var difference = firstList.ExceptBy(secondList, (f, s) => f.Id == s.Id);
```

---

### DistinctBy

#### 功能描述

按字段去重。

#### 参数

- `IEnumerable<TSource> source`：原始序列。
- `Func<TSource, TKey> keySelector`：选择用于比较的键的函数。

#### 返回值

返回去重后的序列，类型为 `IEnumerable<TSource>`。

#### 应用场景

用于需要去除序列中重复元素的场景。

#### 示例代码

```csharp
public static IEnumerable<TSource> DistinctBy<TSource, TKey>(this IEnumerable<TSource> source, Func<TSource, TKey> keySelector)
{
    if (source == null) throw new ArgumentNullException(nameof(source));
    if (keySelector == null) throw new ArgumentNullException(nameof(keySelector));
    var set = new HashSet<TKey>();
    return source.Where(item => set.Add(keySelector(item)));
}

// 使用示例
var list = new List<Person> { /* ... */ };

var distinctList = list.DistinctBy(p => p.Id);
```

---

### AddRange

#### 功能描述

添加多个元素。

#### 参数

- `ICollection<T> @this`：目标集合。
- `params T[] values`：要添加的元素数组。

#### 返回值

无返回值，直接修改集合。

#### 应用场景

用于需要一次性向集合中添加多个元素的场景。

#### 示例代码

```csharp
public static void AddRange<T>(this ICollection<T> @this, params T[] values)
{
    foreach (var obj in values)
    {
        @this.Add(obj);
    }
}

// 使用示例
var list = new List<int>();
list.AddRange(1, 2, 3, 4);
```

---

### AddRangeIf

#### 功能描述

添加符合条件的多个元素。

#### 参数

- `ICollection<T> @this`：目标集合。
- `Func<T, bool> predicate`：筛选条件。
- `params T[] values`：要添加的元素数组。

#### 返回值

无返回值，直接修改集合。

#### 应用场景

用于需要向集合中添加满足特定条件的多个元素的场景。

#### 示例代码

```csharp
public static void AddRangeIf<T>(this ICollection<T> @this, Func<T, bool> predicate, params T[] values)
{
    foreach (var obj in values.Where(predicate))
    {
        @this.Add(obj);
    }
}

// 使用示例
var list = new List<int>();
list.AddRangeIf(x => x > 2, 1, 2, 3, 4);
```

---

### RemoveWhere

#### 功能描述

移除符合条件的元素。

#### 参数

- `ICollection<T> @this`：目标集合。
- `Func<T, bool> @where`：筛选条件。

#### 返回值

无返回值，直接修改集合。

#### 应用场景

用于需要从集合中移除满足特定条件的元素的场景。

#### 示例代码

```csharp
public static void RemoveWhere<T>(this ICollection<T> @this, Func<T, bool> @where)
{
    foreach (var obj in @this.Where(where).ToList())
    {
        @this.Remove(obj);
    }
}

// 使用示例
var list = new List<int> { 1, 2, 3, 4 };
list.RemoveWhere(x => x > 2);
```

---

### InsertAfter

#### 功能描述

在元素之后添加元素。

#### 参数

- `IList<T> list`：目标列表。
- `Func<T, bool> condition`（可选）：定位元素的条件。
- `int index`（可选）：定位元素的索引。
- `T value`：要插入的元素。

#### 返回值

无返回值，直接修改列表。

#### 应用场景

用于需要在列表中特定元素之后插入新元素的场景。

#### 示例代码

```csharp
public static void InsertAfter<T>(this IList<T> list, Func<T, bool> condition, T value)
{
    foreach (var index in list.Select((item, index) => new
    {
        item,
        index
    }).Where(p => condition(p.item)).OrderByDescending(p => p.index).Select(t => t.index))
    {
        if (index + 1 == list.Count)
        {
            list.Add(value);
        }
        else
        {
            list.Insert(index + 1, value);
        }
    }
}

// 使用示例
var list = new List<int> { 1, 2, 3, 4 };
list.InsertAfter(x => x == 3, 5);
```

---

### ToHashSet

#### 功能描述

转HashSet。

#### 参数

- `IEnumerable<T> source`：原始序列。
- `Func<T, TResult> selector`：选择用于创建HashSet的键的函数。

#### 返回值

返回一个 `HashSet<TResult>`。

#### 应用场景

用于需要从序列中创建一个不包含重复元素的HashSet的场景。

#### 示例代码

```csharp
public static HashSet<TResult> ToHashSet<T, TResult>(this IEnumerable<T> source, Func<T, TResult> selector)
{
    return new HashSet<TResult>(source.Select(selector));
}

// 使用示例
var list = new List<Person> { /* ... */ };

var hashSet = list.ToHashSet(p => p.Id);
```

---

### ForEach

#### 功能描述

遍历IEnumerable。

#### 参数

- `IEnumerable<T> objs`：要遍历的序列。
- `Action<T> action`：对每个元素执行的操作。

#### 返回值

无返回值，直接执行操作。

#### 应用场景

用于需要对序列中的每个元素执行特定操作的场景。

#### 示例代码

```csharp
public static void ForEach<T>(this IEnumerable<T> objs, Action<T> action)
{
    foreach (var o in objs)
    {
        action(o);
    }
}

// 使用示例
var list = new List<int> { 1, 2, 3, 4 };
list.ForEach(Console.WriteLine);
```

---

### ForeachAsync

#### 功能描述

异步foreach。

#### 参数

- `IEnumerable<T> source`：要遍历的序列。
- `Func<T, Task> action`：对每个元素执行的异步操作。
- `int maxParallelCount`：最大并行数。
- `CancellationToken cancellationToken`（可选）：取消口令。

#### 返回值

返回一个 `Task`。

#### 应用场景

用于需要异步处理序列中每个元素的场景。

#### 示例代码

```csharp
public static async Task ForeachAsync<T>(this IEnumerable<T> source, Func<T, Task> action, int maxParallelCount, CancellationToken cancellationToken = default)
{
    if (Debugger.IsAttached)
    {
        foreach (var item in source)
        {
            await action(item);
        }

        return;
    }

    var list = new List<Task>();
    foreach (var item in source)
    {
        if (cancellationToken.IsCancellationRequested)
        {
            return;
        }

        list.Add(action(item));
        if (list.Count(t => !t.IsCompleted) >= maxParallelCount)
        {
            await Task.WhenAny(list);
            list.RemoveAll(t => t.IsCompleted);
        }
    }

    await Task.WhenAll(list);
}

// 使用示例
var list = new List<int> { 1, 2, 3, 4 };
await list.ForEachAsync(async x => 
{
    await Task.Delay(1000);
    Console.WriteLine(x);
}, 2);
```

---

### SelectAsync

#### 功能描述

异步Select。

#### 参数

- `IEnumerable<T> source`：原始序列。
- `Func<T, Task<TResult>> selector`：选择操作，返回异步结果。
- `int maxParallelCount`（可选）：最大并行数。

#### 返回值

返回一个 `Task<TResult[]>` 或 `Task<List<TResult>>`。

#### 应用场景

用于需要异步处理序列并生成新序列的场景。

#### 示例代码

```csharp
public static Task<TResult[]> SelectAsync<T, TResult>(this IEnumerable<T> source, Func<T, Task<TResult>> selector)
{
    return Task.WhenAll(source.Select(selector));
}

// 使用示例
var list = new List<int> { 1, 2, 3, 4 };
var results = await list.SelectAsync(async x => 
{
    await Task.Delay(1000);
    return x * x;
});
```

---

### ForAsync

#### 功能描述

异步For。

#### 参数

- `IEnumerable<T> source`：原始序列。
- `Func<T, int, Task> selector`：选择操作，返回异步结果。
- `int maxParallelCount`：最大并行数。
- `CancellationToken cancellationToken`（可选）：取消口令。

#### 返回值

返回一个 `Task`。

#### 应用场景

用于需要异步处理序列中每个元素的场景。

#### 示例代码

```csharp
public static async Task ForAsync<T>(this IEnumerable<T> source, Func<T, int, Task> selector, int maxParallelCount, CancellationToken cancellationToken = default)
{
    int index = 0;
    if (Debugger.IsAttached)
    {
        foreach (var item in source)
        {
            await selector(item, index);
            index++;
        }

        return;
    }

    var list = new List<Task>();
    foreach (var item in source)
    {
        if (cancellationToken.IsCancellationRequested)
        {
            return;
        }

        list.Add(selector(item, index));
        Interlocked.Add(ref index, 1);
        if (list.Count >= maxParallelCount)
        {
            await Task.WhenAny(list);
            list.RemoveAll(t => t.IsCompleted);
        }
    }

    await Task.WhenAll(list);
}

// 使用示例
var list = new List<int> { 1, 2, 3, 4 };
await list.ForAsync(async (x, i) => 
{
    await Task.Delay(1000);
    Console.WriteLine($"Index: {i}, Value: {x}");
}, 2);
```

---

### MaxOrDefault

#### 功能描述

取最大值。

#### 参数

- `IQueryable<TSource> source`：原始序列。
- `Expression<Func<TSource, TResult>> selector`（可选）：选择操作。
- `TResult defaultValue`（可选）：默认值。

#### 返回值

返回序列中的最大值或默认值。

#### 应用场景

用于需要找出序列中最大值的场景。

#### 示例代码

```csharp
public static TResult MaxOrDefault<TSource, TResult>(this IQueryable<TSource> source, Expression<Func<TSource, TResult>> selector, TResult defaultValue)
{
    return source.Select(selector).DefaultIfEmpty(defaultValue).Max();
}

// 使用示例
var list = new List<int> { 1, 2, 3, 4 };
var max = list.AsQueryable().MaxOrDefault(x => x * x, 0);
```

---

### MinOrDefault

#### 功能描述

取最小值。

#### 参数

- `IQueryable<TSource> source`：原始序列。
- `Expression<Func<TSource, TResult>> selector`（可选）：选择操作。
- `TResult defaultValue`（可选）：默认值。

#### 返回值

返回序列中的最小值或默认值。

#### 应用场景

用于需要找出序列中最小值的场景。

#### 示例代码

```csharp
public static TResult MinOrDefault<TSource, TResult>(this IQueryable<TSource> source, Expression<Func<TSource, TResult>> selector, TResult defaultValue)
{
    return source.Select(selector).DefaultIfEmpty(defaultValue).Min();
}

// 使用示例
var list = new List<int> { 1, 2, 3, 4 };
var min = list.AsQueryable().MinOrDefault(x => x * x, 0);
```

---

### StandardDeviation

#### 功能描述

计算标准差。

#### 参数

- `IEnumerable<double> source`：原始序列。

#### 返回值

返回序列的标准差。

#### 应用场景

用于需要计算数据集标准差的场景。

#### 示例代码

```csharp
public static double StandardDeviation(this IEnumerable<double> source)
{
    double result = 0;
    var list = source as ICollection<double> ?? source.ToList();
    int count = list.Count;
    if (count > 1)
    {
        var avg = list.Average();
        var sum = list.Sum(d => (d - avg) * (d - avg));
        result = Math.Sqrt(sum / count);
    }

    return result;
}

// 使用示例
var list = new List<double> { 1.0, 2.0, 3.0, 4.0 };
var stdDev = list.StandardDeviation();
```

---

### OrderByRandom

#### 功能描述

随机排序。

#### 参数

- `IEnumerable<T> source`：原始序列。

#### 返回值

返回一个随机排序的 `IOrderedEnumerable<T>`。

#### 应用场景

用于需要对序列进行随机排序的场景。

#### 示例代码

```csharp
public static IOrderedEnumerable<T> OrderByRandom<T>(this IEnumerable<T> source)
{
    return source.OrderBy(_ => Guid.NewGuid());
}

// 使用示例
var list = new List<int> { 1, 2, 3, 4 };
var randomList = list.OrderByRandom();
```

---

### SequenceEqual

#### 功能描述

序列相等。

#### 参数

- `IEnumerable<T> first`：第一个序列。
- `IEnumerable<T> second`：第二个序列。
- `Func<T, T, bool> condition`：比较两个元素是否相等的条件函数。

#### 返回值

返回一个布尔值，表示两个序列是否相等。

#### 应用场景

用于需要比较两个序列是否相等的场景。

#### 示例代码

```csharp
public static bool SequenceEqual<T>(this IEnumerable<T> first, IEnumerable<T> second, Func<T, T, bool> condition)
{
    if (first is ICollection<T> source1 && second is ICollection<T> source2)
    {
        if (source1.Count != source2.Count)
        {
            return false;
        }

        if (source1 is IList<T> list1 && source2 is IList<T> list2)
        {
            int count = source1.Count;
            for (int index = 0; index < count; ++index)
            {
                if (!condition(list1[index], list2[index]))
                {
                   return false;
                }
            }

            return true;
        }
    }

    using IEnumerator<T> enumerator1 = first.GetEnumerator();
    using IEnumerator<T> enumerator2 = second.GetEnumerator();
    while (enumerator1.MoveNext())
    {
        if (!enumerator2.MoveNext() || !condition(enumerator1.Current, enumerator2.Current))
        {
            return false;
        }
    }

    return !enumerator2.MoveNext();
}

// 使用示例
var list1 = new List<int> { 1, 2, 3, 4 };
var list2 = new List<int> { 1, 2, 3, 4 };
var areEqual = list1.SequenceEqual(list2, (x, y) => x == y);
```

---

### CompareChanges

#### 功能描述

对比两个集合哪些是新增的、删除的、修改的。

#### 参数

- `IEnumerable<T1> first`：第一个序列。
- `IEnumerable<T2> second`：第二个序列。
- `Func<T1, T2, bool> condition`：对比因素条件。

#### 返回值

返回一个包含新增元素、删除元素和修改元素的元组。

#### 应用场景

用于需要对比两个集合变化的场景。

#### 示例代码

```csharp
public static (List<T1> adds, List<T2> remove, List<T1> updates) CompareChanges<T1, T2>(this IEnumerable<T1> first, IEnumerable<T2> second, Func<T1, T2, bool> condition)
{
    first ??= new List<T1>();
    second ??= new List<T2>();
    var firstSource = first as ICollection<T1> ?? first.ToList();
    var secondSource = second as ICollection<T2> ?? second.ToList();
    var add = firstSource.ExceptBy(secondSource, condition).ToList();
    var remove = secondSource.ExceptBy(firstSource, (s, f) => condition(f, s)).ToList();
    var update = firstSource.IntersectBy(secondSource, condition).ToList();
    return (add, remove, update);
}

// 使用示例
var list1 = new List<Person> { /* ... */ };
var list2 = new List<Person> { /* ... */ };
var changes = list1.CompareChanges(list2, (p1, p2) => p1.Id == p2.Id);
```

---

### CompareChangesPlus

#### 功能描述

对比两个集合哪些是新增的、删除的、修改的，并返回修改元素的详细信息。

#### 参数

- `IEnumerable<T1> first`：第一个序列。
- `IEnumerable<T2> second`：第二个序列。
- `Func<T1, T2, bool> condition`：对比因素条件。

#### 返回值

返回一个包含新增元素、删除元素和修改元素详细信息的元组。

#### 应用场景

用于需要详细对比两个集合变化的场景。

#### 示例代码

```csharp
public static (List<T1> adds, List<T2> remove, List<(T1 first, T2 second)> updates) CompareChangesPlus<T1, T2>(this IEnumerable<T1> first, IEnumerable<T2> second, Func<T1, T2, bool> condition)
{
    first ??= new List<T1>();
    second ??= new List<T2>();
    var firstSource = first as ICollection<T1> ?? first.ToList();
    var secondSource = second as ICollection<T2> ?? second.ToList();
    var add = firstSource.ExceptBy(secondSource, condition).ToList();
    var remove = secondSource.ExceptBy(firstSource, (s, f) => condition(f, s)).ToList();
    var updates = firstSource.IntersectBy(secondSource, condition).Select(t1 => (t1, secondSource.FirstOrDefault(t2 => condition(t1, t2)))).ToList();
    return (add, remove, updates);
}

// 使用示例
var list1 = new List<Person> { /* ... */ };
var list2 = new List<Person> { /* ... */ };
var changes = list1.CompareChangesPlus(list2, (p1, p2) => p1.Id == p2.Id);
```

---

### AsNotNull

#### 功能描述

将集合声明为非null集合。

#### 参数

- `List<T> list` 或 `IEnumerable<T> list`：原始序列。

#### 返回值

返回一个非null的集合。

#### 应用场景

用于确保集合在使用前不为null的场景。

#### 示例代码

```csharp
public static List<T> AsNotNull<T>(this List<T> list)
{
    return list ?? new List<T>();
}

public static IEnumerable<T> AsNotNull<T>(this IEnumerable<T> list)
{
    return list ?? new List<T>();
}

// 使用示例
var list = new List<int>();
var nonNullList = list.AsNotNull();
```

---

### WhereIf

#### 功能描述

满足条件时执行筛选条件。

#### 参数

- `IEnumerable<T> source` 或 `IQueryable<T> source`：原始序列。
- `bool condition` 或 `Func<bool> condition`：条件。
- `Func<T, bool> where` 或 `Expression<Func<T, bool>> where`：筛选条件。

#### 返回值

返回一个满足条件的序列。

#### 应用场景

用于需要根据条件执行筛选的场景。

#### 示例代码

```csharp
public static IEnumerable<T> WhereIf<T>(this IEnumerable<T> source, bool condition, Func<T, bool> where)
{
    return condition ? source.Where(where) : source;
}

public static IQueryable<T> WhereIf<T>(this IQueryable<T> source, bool condition, Expression<Func<T, bool>> where)
{
    return condition ? source.Where(where) : source;
}

// 使用示例
var list = new List<int> { 1, 2, 3, 4 };
var filteredList = list.WhereIf(true, x => x > 2);
```

---

### ChangeIndex

#### 功能描述

改变元素的索引位置。

#### 参数

- `IList<T> list`：目标列表。
- `T item` 或 `Func<T, bool> condition`：要改变位置的元素或条件。
- `int index`：新的索引值。

#### 返回值

返回修改后的列表。

#### 应用场景

用于需要改变列表中元素索引位置的场景。

#### 示例代码

```csharp
public static IList<T> ChangeIndex<T>(this IList<T> list, T item, int index)
{
    if (item is null)
    {
        throw new ArgumentNullException(nameof(item));
    }

    ChangeIndexInternal(list, item, index);
    return list;
}

public static IList<T> ChangeIndex<T>(this IList<T> list, Func<T, bool> condition, int index)
{
    var item = list.FirstOrDefault(condition);
    if (item != null)
    {
        ChangeIndexInternal(list, item, index);
    }

    return list;
}

private static void ChangeIndexInternal<T>(IList<T> list, T item, int index)
{
    index = Math.Max(0, index);
    index = Math.Min(list.Count - 1, index);
    list.Remove(item);
    list.Insert(index, item);
}

// 使用示例
var list = new List<int> { 1, 2, 3, 4 };
list.ChangeIndex(3, 1);
```
