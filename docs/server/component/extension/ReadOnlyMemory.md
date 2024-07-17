# 只读内存

[[toc]]
---

## 只读内存(ReadOnlyMemoryExtension)

### GetArray 函数

功能描述：尝试从只读内存中获取数组段，如果不成功则抛出异常。

参数：

- `memory`: 源只读内存。

返回值：

- 返回对应的数组段。

应用场景：

- 当需要从只读内存中获取数组段时使用。

示例代码：

```csharp
ReadOnlyMemory<byte> memory = new byte[] { 1, 2, 3 };
ArraySegment<byte> array = memory.GetArray();
```
