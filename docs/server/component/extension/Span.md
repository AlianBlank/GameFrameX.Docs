# 切片

[[toc]]
---

## 切片(SpanExtension)

定义了关于切片的扩展函数

### 1. WriteInt

功能描述：将整数值写入到指定的字节跨度中。如果指定的偏移量加上整数大小超过了字节跨度的长度，则抛出异常。以网络字节顺序存储整数值。

参数：

- `buffer`: 字节缓冲区。
- `value`: 要写入的整数值。
- `offset`: 写入的起始偏移量，会在调用后增加整数的大小。

返回值：无

应用场景：用于将整数值写入字节缓冲区

示例代码：

```csharp
Span<byte> buffer = new Span<byte>(new byte[10]);
int offset = 0;
buffer.WriteInt(123456, ref offset);
```

### 2. WriteLong

功能描述：将长整数值写入到指定的字节跨度中。如果指定的偏移量加上长整数大小超过了字节跨度的长度，则抛出异常。以网络字节顺序存储长整数值。

参数：

- `buffer`: 字节缓冲区。
- `value`: 要写入的长整数值。
- `offset`: 写入的起始偏移量，会在调用后增加长整数的大小。

返回值：无

应用场景：用于将长整数值写入字节缓冲区

示例代码：

```csharp
Span<byte> buffer = new Span<byte>(new byte[10]);
int offset = 0;
buffer.WriteLong(123456789012345L, ref offset);
```

### 3. WriteBytesWithoutLength

功能描述：在给定的偏移量位置，向缓冲区中写入字节序列，不包含长度信息。

参数：

- `buffer`: 目标字节缓冲区。
- `value`: 需要写入的字节序列。
- `offset`: 偏移量，写入后更新此偏移量。

返回值：无

应用场景：用于向缓冲区中写入字节序列，不包含长度信息

示例代码：

```csharp
Span<byte> buffer = new Span<byte>(new byte[10]);
int offset = 0;
byte[] value = new byte[] { 1, 2, 3, 4, 5 };
buffer.WriteBytesWithoutLength(value, ref offset);
```

### 4. ReadInt

功能描述：从指定的byte缓冲区和偏移量读取一个int值。

参数：

- `buffer`: 字节缓冲区。
- `offset`: 开始读取的偏移量，读取后将更新此偏移量。

返回值：读取到的int值。

应用场景：用于从字节缓冲区中读取int值

示例代码：

```csharp
Span<byte> buffer = new Span<byte>(new byte[10]);
int offset = 0;
buffer.WriteInt(123456, ref offset);
int result = buffer.ReadInt(ref offset);
```

### 5. ReadShort

功能描述：从给定的字节缓存区读取一个短整型值（16位）。

参数：

- `buffer`: 字节缓冲区
- `offset`: 偏移量，读取结束后会更新此偏移量。

返回值：读取出的短整型值

应用场景：用于从字节缓冲区中读取短整型值

示例代码：

```csharp
Span<byte> buffer = new Span<byte>(new byte[10]);
int offset = 0;
buffer.WriteShort((short)12345, ref offset);
short result = buffer.ReadShort(ref offset);
```

### 6. ReadUInt

功能描述：从Span字节数组中读取32位无符号整数，并将偏移量向前移动。

参数：

- `buffer`: 要读取的Span字节数组。
- `offset`: 引用偏移量。

返回值：返回读取的32位无符号整数。

应用场景：用于从Span字节数组中读取32位无符号整数
