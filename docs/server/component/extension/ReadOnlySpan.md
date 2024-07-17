# 只读切片

[[toc]]
---

## 只读切片(ReadOnlySpanExtension)

定义了关于只读切片的扩展函数

### ReadUInt

功能描述：从字节数组中以指定偏移量读取无符号整型。

参数：

- `buffer`：`ReadOnlySpan<byte>`类型的参数，表示要从中读取数据的字节数组。
- `offset`：`ref int`类型的参数，表示读取数据的起始偏移量，此偏移量在读取后会自动增加。

返回值：

- 读取的无符号整型，若读取长度小于等于0或偏移量超出数组长度，返回0。

应用场景：

- 当需要从字节数组中读取无符号整型数据时。

示例代码：

```csharp
ReadOnlySpan<byte> buffer = new byte[] { 0x12, 0x34, 0x56, 0x78 };
int offset = 0;
uint result = buffer.ReadUInt(ref offset);
// result will be 0x12345678
```

### ReadInt

功能描述：从字节数组中以指定偏移量读取整型。

参数：

- `buffer`：`ReadOnlySpan<byte>`类型的参数，表示要从中读取数据的字节数组。
- `offset`：`ref int`类型的参数，表示读取数据的起始偏移量，此偏移量在读取后会自动增加。

返回值：

- 读取的整型，若读取长度小于等于0或偏移量超出数组长度，返回0。

应用场景：

- 当需要从字节数组中读取整型数据时。

示例代码：

```csharp
ReadOnlySpan<byte> buffer = new byte[] { 0x12, 0x34, 0x56, 0x78 };
int offset = 0;
int result = buffer.ReadInt(ref offset);
// result will be 0x12345678
```

### ReadULong

功能描述：从字节数组中以指定偏移量读取无符号长整型。

参数：

- `buffer`：`ReadOnlySpan<byte>`类型的参数，表示要从中读取数据的字节数组。
- `offset`：`ref int`类型的参数，表示读取数据的起始偏移量，此偏移量在读取后会自动增加。

返回值：

- 读取的无符号长整型，若读取长度小于等于0或偏移量超出数组长度，返回0。

应用场景：

- 当需要从字节数组中读取无符号长整型数据时。

示例代码：

```csharp
ReadOnlySpan<byte> buffer = new byte[] { 0x12, 0x34, 0x56, 0x78, 0x9A, 0xBC, 0xDE, 0xF0 };
int offset = 0;
ulong result = buffer.ReadULong(ref offset);
// result will be 0x123456789ABCDEF0
```

### ReadLong

功能描述：从字节数组中以指定偏移量读取长整型。

参数：

- `buffer`：`ReadOnlySpan<byte>`类型的参数，表示要从中读取数据的字节数组。
- `offset`：`ref int`类型的参数，表示读取数据的起始偏移量，此偏移量在读取后会自动增加。

返回值：

- 读取的长整型，若读取长度小于等于0或偏移量超出数组长度，返回0。

应用场景：

- 当需要从字节数组中读取长整型数据时。

示例代码：

```csharp
ReadOnlySpan<byte> buffer = new byte[] { 0x12, 0x34, 0x56, 0x78, 0x9A, 0xBC, 0xDE, 0xF0 };
int offset = 0;
long result = buffer.ReadLong(ref offset);
// result will be 0x123456789ABCDEF0
```
