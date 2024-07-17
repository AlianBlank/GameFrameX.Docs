# 定长队列

[[toc]]
---

## 定长队列(ConcurrentLimitedQueue)

### ConcurrentLimitedQueue<T>

#### 功能描述

`ConcurrentLimitedQueue<T>` 是一个线程安全的定长队列实现，它继承自 `ConcurrentQueue<T>`
。该队列在达到其限制长度时会自动移除旧元素以保持队列长度不超过设定的值。

#### 参数

- `int limit`：队列的最大长度限制。
- `IEnumerable<T> list`：初始化队列的元素集合。

#### 返回值

无返回值。

#### 应用场景

适用于需要限制队列长度的场景，例如缓存管理、数据流处理等。

#### 示例代码

```csharp
ConcurrentLimitedQueue<int> queue = new ConcurrentLimitedQueue<int>(3);
queue.Enqueue(1);
queue.Enqueue(2);
queue.Enqueue(3);
queue.Enqueue(4); // 此时队列将移除1，队列内容变为[2, 3, 4]
```

---

### .ctor(int limit)

#### 功能描述

构造一个具有指定长度限制的 `ConcurrentLimitedQueue<T>`。

#### 参数

- `int limit`：队列的最大长度限制。

#### 返回值

无返回值。

#### 应用场景

在创建队列时需要指定其最大长度。

#### 示例代码

```csharp
ConcurrentLimitedQueue<int> queue = new ConcurrentLimitedQueue<int>(5);
```

---

### .ctor(IEnumerable<T> list)

#### 功能描述

构造一个 `ConcurrentLimitedQueue<T>` 并初始化其元素。

#### 参数

- `IEnumerable<T> list`：初始化队列的元素集合。

#### 返回值

无返回值。

#### 应用场景

在创建队列时需要从已有的集合中初始化元素。

#### 示例代码

```csharp
List<int> list = new List<int> { 1, 2, 3 };
ConcurrentLimitedQueue<int> queue = new ConcurrentLimitedQueue<int>(list);
```

---

### Enqueue(T item)

#### 功能描述

向队列中添加一个元素。如果队列已满，则自动移除队列头部的元素以确保队列长度不超过限制。

#### 参数

- `T item`：要添加到队列的元素。

#### 返回值

无返回值。

#### 应用场景

在需要向队列添加元素并自动管理队列长度的场景中使用。

#### 示例代码

```csharp
ConcurrentLimitedQueue<int> queue = new ConcurrentLimitedQueue<int>(3);
queue.Enqueue(1);
queue.Enqueue(2);
queue.Enqueue(3);
queue.Enqueue(4); // 此时队列将移除1，队列内容变为[2, 3, 4]
```

---

### static implicit operator ConcurrentLimitedQueue<T>(List<T> list)

#### 功能描述

允许将 `List<T>` 类型隐式转换为 `ConcurrentLimitedQueue<T>` 类型。

#### 参数

- `List<T> list`：要转换的列表。

#### 返回值

返回一个 `ConcurrentLimitedQueue<T>` 类型的实例。

#### 应用场景

在需要将列表转换为定长队列时使用。

#### 示例代码

```csharp
List<int> list = new List<int> { 1, 2, 3 };
ConcurrentLimitedQueue<int> queue = list; // 隐式转换
```
