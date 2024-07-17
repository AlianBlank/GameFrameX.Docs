# 扩展

[[toc]]
---

针对系统库的扩展

## 建议的双向字典(BidirectionalDictionary)

## 字节处理(ByteExtension)

### ToHex

#### 功能描述

将单个字节或字节数组转换为16进制表示形式的字符串。

#### 参数

- `byte b`：要转换的单个字节。
- `byte[] bytes`：要转换的字节数组。

#### 返回值

返回一个字节或字节数组的16进制字符串表示。

#### 应用场景

适用于需要将字节数据以16进制形式展示或存储的场景。

#### 示例代码

```csharp
public string ToHex(byte b)
{
    return b.ToString("X2");
}

// 使用示例
byte singleByte = 10;
string hexString = singleByte.ToHex();
// hexString的值为"0A"
```

### ToArrayString

#### 功能描述

将字节数组转换为每个字节之间用空格分隔的字符串。

#### 参数

- `byte[] bytes`：要转换的字节数组。

#### 返回值

返回一个包含字节数组中每个字节，字节之间用空格分隔的字符串。

#### 应用场景

适用于需要将字节数组以可读形式展示的场景。

#### 示例代码

```csharp
public string ToArrayString(byte[] bytes)
{
    StringBuilder stringBuilder = new StringBuilder();
    foreach (byte b in bytes)
    {
        stringBuilder.Append(b + " ");
    }
    return stringBuilder.ToString();
}

// 使用示例
byte[] byteArray = {10, 255, 3};
string arrayString = byteArray.ToArrayString();
// arrayString的值为"10 255 3 "
```

### ToHex (with format)

#### 功能描述

将字节数组根据指定的格式转换为字符串。

#### 参数

- `byte[] bytes`：要转换的字节数组。
- `string format`：指定的格式字符串。

#### 返回值

返回根据指定格式转换后的字节数组字符串表示。

#### 应用场景

适用于需要将字节数组按照特定格式（如16进制、二进制等）展示的场景。

#### 示例代码

```csharp
public string ToHex(byte[] bytes, string format)
{
    StringBuilder stringBuilder = new StringBuilder();
    foreach (byte b in bytes)
    {
        stringBuilder.Append(b.ToString(format));
    }
    return stringBuilder.ToString();
}

// 使用示例
byte[] byteArray = {10, 255};
string hexString = byteArray.ToHex("X2");
// hexString的值为"0AFF"
```

### ToHex (with offset and count)

#### 功能描述

将字节数组中指定范围的字节转换为16进制字符串。

#### 参数

- `byte[] bytes`：要转换的字节数组。
- `int offset`：字节数组中开始转换的偏移量。
- `int count`：要转换的字节数量。

#### 返回值

返回指定范围内字节的16进制字符串表示。

#### 应用场景

适用于需要处理字节数组的一部分并将其以16进制形式展示的场景。

#### 示例代码

```csharp
public string ToHex(byte[] bytes, int offset, int count)
{
    StringBuilder stringBuilder = new StringBuilder();
    for (int i = offset; i < offset + count; ++i)
    {
        stringBuilder.Append(bytes[i].ToString("X2"));
    }
    return stringBuilder.ToString();
}

// 使用示例
byte[] byteArray = {10, 255, 3, 100};
string hexString = byteArray.ToHex(1, 2);
// hexString的值为"FF03"
```

### ToDefaultString

#### 功能描述

将字节数组转换为默认编码（通常是ASCII）的字符串。

#### 参数

- `byte[] bytes` ：要转换的字节数组。

#### 返回值

返回字节数组转换为的默认编码字符串。

#### 应用场景

适用于需要将字节数组解码为字符串的场景，特别是在不确定编码类型时。

#### 示例代码

```csharp
public string ToDefaultString(byte[] bytes)
{
    return Encoding.Default.GetString(bytes);
}

// 使用示例
byte[] byteArray = {72, 101, 108, 108, 111};
string defaultString = byteArray.ToDefaultString();
// defaultString的值为"Hello"
```

### ToDefaultString

#### 功能描述

将字节数组中指定范围的字节转换为默认编码的字符串。

#### 参数

- `byte[] bytes`：要转换的字节数组。
- `int index`：字节数组中开始转换的偏移量。
- `int count`：要转换的字节数量。

#### 返回值

返回指定范围内字节的默认编码字符串。

#### 应用场景

适用于需要从字节数组中提取特定部分并解码为字符串的场景。

#### 示例代码

```csharp
public string ToDefaultString(byte[] bytes, int index, int count)
{
    return Encoding.Default.GetString(bytes, index, count);
}

// 使用示例
byte[] byteArray = {72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100};
string defaultString = byteArray.ToDefaultString(7, 5);
// defaultString的值为"World"
```

### ToUtf8String

#### 功能描述

将字节数组转换为UTF-8 编码的字符串。

#### 参数

- `byte[] bytes`：要转换的字节数组。

#### 返回值

返回字节数组转换为的UTF-8编码字符串。

#### 应用场景

适用于需要将字节数组解码为UTF-8 字符串的场景，特别是在处理国际化文本时。

#### 示例代码

```csharp
public string ToUtf8String(byte[] bytes)
{
    return Encoding.UTF8.GetString(bytes);
}

// 使用示例
byte[] byteArray = {72, 101, 108, 108, 111};
string utf8String = byteArray.ToUtf8String();
// utf8String的值为"Hello"
```

### ToUtf8String (with index and count)

#### 功能描述

将字节数组中指定范围的字节转换为UTF-8 编码的字符串。

#### 参数

- `byte[] bytes`：要转换的字节数组。
- `int index`：字节数组中开始转换的偏移量。
- `int count`：要转换的字节数量。

#### 返回值

返回指定范围内字节的UTF-8编码字符串。

#### 应用场景

适用于需要从字节数组中提取特定部分并解码为UTF-8 字符串的场景。

#### 示例代码

```csharp
public string ToUtf8String(byte[] bytes, int index, int count)
{
    return Encoding.UTF8.GetString(bytes, index, count);
}

// 使用示例
byte[] byteArray = {72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100};
string utf8String = byteArray.ToUtf8String(7, 5);
// utf8String的值为"World"
```

### WriteUInt

#### 功能描述

将一个32位无符号整数写入指定的缓冲区，并更新偏移量。

#### 参数

- `byte[] buffer`：要写入的缓冲区。
- `uint value`：要写入的值。
- `ref int offset`：要写入值的缓冲区中的偏移量。

#### 返回值

无返回值，但会更新`offset`参数。

#### 应用场景

适用于需要在字节缓冲区中存储整数并跟踪写入位置的场景。

#### 示例代码

```csharp
public void WriteUInt(byte[] buffer, uint value, ref int offset)
{
    BinaryPrimitives.WriteUInt32BigEndian(buffer.AsSpan()[offset..], value);
    offset += ConstSize.UIntSize;
}

// 使用示例
byte[] buffer = new byte[10];
int offset = 0;
buffer.WriteUInt(1234567890, ref offset);
// buffer的内容和offset的值会被更新
```

### WriteInt

#### 功能描述

将一个32位整数写入指定的缓冲区，并更新偏移量。

#### 参数

- `byte[] buffer`：要写入的缓冲区。
- `int value`：要写入的值。
- `ref int offset`：要写入值的缓冲区中的偏移量。

#### 返回值

无返回值，但会更新`offset`参数。

#### 应用场景

适用于需要在字节缓冲区中存储整数并跟踪写入位置的场景。

#### 示例代码

```csharp
public void WriteInt(byte[] buffer, int value, ref int offset)
{
    BinaryPrimitives.WriteInt32BigEndian(buffer.AsSpan()[offset..], value);
    offset += ConstSize.IntSize;
}

// 使用示例
byte[] buffer = new byte[10];
int offset = 0;
buffer.WriteInt(-1234567890, ref offset);
// buffer的内容和offset的值会被更新
```

### WriteByte

#### 功能描述

将一个8位整数写入指定的缓冲区，并更新偏移量。

#### 参数

- `byte[] buffer`：要写入的缓冲区。
- `byte value`：要写入的值。
- `ref int offset`：要写入值的缓冲区中的偏移量。

#### 返回值

无返回值，但会更新`offset`参数。

#### 应用场景

适用于需要在字节缓冲区中存储单个字节并跟踪写入位置的场景。

#### 示例代码

```csharp
public void WriteByte(byte[] buffer, byte value, ref int offset)
{
    buffer[offset] = value;
    offset += ConstSize.ByteSize;
}

// 使用示例
byte[] buffer = new byte[10];
int offset = 0;
buffer.WriteByte(255, ref offset);
// buffer的内容和offset的值会被更新
```

### WriteShort

#### 功能描述

将一个16位整数写入指定的缓冲区，并更新偏移量。

#### 参数

- `byte[] buffer`：要写入的缓冲区。
- `short value`：要写入的值。
- `ref int offset`：要写入值的缓冲区中的偏移量。

#### 返回值

无返回值，但会更新`offset`参数。

#### 应用场景

适用于需要在字节缓冲区中存储短整数并跟踪写入位置的场景。

#### 示例代码

```csharp
public void WriteShort(byte[] buffer, short value, ref int offset)
{
    BinaryPrimitives.WriteInt16BigEndian(buffer.AsSpan()[offset..], value);
    offset += ConstSize.ShortSize;
}

// 使用示例
byte[] buffer = new byte[10];
int offset = 0;
buffer.WriteShort(-12345, ref offset);
// buffer的内容和offset的值会被更新
```

### WriteUShort

#### 功能描述

将一个16位无符号整数写入指定的缓冲区，并更新偏移量。

#### 参数

- `byte[] buffer`：要写入的缓冲区。
- `ushort value`：要写入的值。
- `ref int offset`：要写入值的缓冲区中的偏移量。

#### 返回值

无返回值，但会更新`offset`参数。

#### 应用场景

适用于需要在字节缓冲区中存储无符号短整数并跟踪写入位置的场景。

#### 示例代码

```csharp
public void WriteUShort(byte[] buffer, ushort value, ref int offset)
{
    BinaryPrimitives.WriteUInt16BigEndian(buffer.AsSpan()[offset..], value);
    offset += ConstSize.UShortSize;
}

// 使用示例
byte[] buffer = new byte[10];
int offset = 0;
buffer.WriteUShort(12345, ref offset);
// buffer的内容和offset的值会被更新
```

### WriteLong

#### 功能描述

将一个64位整数写入指定的缓冲区，并更新偏移量。

#### 参数

- `byte[] buffer`：要写入的缓冲区。
- `long value`：要写入的值。
- `ref int offset`：要写入值的缓冲区中的偏移量。

#### 返回值

无返回值，但会更新`offset`参数。

#### 应用场景

适用于需要在字节缓冲区中存储长整数并跟踪写入位置的场景。

#### 示例代码

```csharp
public void WriteLong(byte[] buffer, long value, ref int offset)
{
    BinaryPrimitives.WriteInt64BigEndian(buffer.AsSpan()[offset..], value);
    offset += ConstSize.LongSize;
}

// 使用示例
byte[] buffer = new byte[10];
int offset = 0;
buffer.WriteLong(-1234567890123456789, ref offset);
// buffer的内容和offset的值会被更新
```

### WriteULong

#### 功能描述

将一个64位无符号整数写入指定的缓冲区，并更新偏移量。

#### 参数

- `byte[] buffer`：要写入的缓冲区。
- `ulong value`：要写入的值。
- `ref int offset`：要写入值的缓冲区中的偏移量。

#### 返回值

无返回值，但会更新`offset`参数。

#### 应用场景

适用于需要在字节缓冲区中存储无符号长整数并跟踪写入位置的场景。

#### 示例代码

```csharp
public void WriteULong(byte[] buffer, ulong value, ref int offset)
{
    BinaryPrimitives.WriteUInt64BigEndian(buffer.AsSpan()[offset..], value);
    offset += ConstSize.ULongSize;
}

// 使用示例
byte[] buffer = new byte[10];
int offset = 0;
buffer.WriteULong(1234567890123456789, ref offset);
// buffer的内容和offset的值会被更新
```

### ReadUShort

#### 功能描述

从字节数组中读取16位无符号整数，并将偏移量向前移动。

#### 参数

- `byte[] buffer`：要读取的字节数组。
- `ref int offset`：引用偏移量。

#### 返回值

返回读取的16位无符号整数。

#### 应用场景

适用于需要从字节数组中读取16位无符号整数的场景。

#### 示例代码

```csharp
public ushort ReadUShort(byte[] buffer, ref int offset)
{
    var value = BinaryPrimitives.ReadUInt16BigEndian(buffer.AsSpan()[offset..]);
    offset += ConstSize.UShortSize;
    return value;
}

// 使用示例
byte[] buffer = {0x01, 0x00};
int offset = 0;
ushort value = buffer.ReadUShort(ref offset);
// value的值为256，offset的值更新为2
```

### ReadShort

#### 功能描述

从字节数组读取16位有符号整数，并将偏移量前移。

#### 参数

- `byte[] buffer`：要读取的字节数组。
- `ref int offset`：引用偏移量。

#### 返回值

返回读取的16位有符号整数。

#### 应用场景

适用于需要从字节数组中读取16位有符号整数的场景。

#### 示例代码

```csharp
public short ReadShort(byte[] buffer, ref int offset)
{
    var value = BinaryPrimitives.ReadInt16BigEndian(buffer.AsSpan()[offset..]);
    offset += ConstSize.ShortSize;
    return value;
}

// 使用示例
byte[] buffer = {0xFF, 0x7F};
int offset = 0;
short value = buffer.ReadShort(ref offset);
// value的值为32767，offset的值更新为2
```

### ReadUInt

#### 功能描述

从字节数组中读取32位无符号整数，并将偏移量向前移动。

#### 参数

- `byte[] buffer`：要读取的字节数组。
- `ref int offset`：引用偏移量。

#### 返回值

返回读取的32位无符号整数。

#### 应用场景

适用于需要从字节数组中读取32位无符号整数的场景。

#### 示例代码

```csharp
public uint ReadUInt(byte[] buffer, ref int offset)
{
    var value = BinaryPrimitives.ReadUInt32BigEndian(buffer.AsSpan()[offset..]);
    offset += ConstSize.UIntSize;
    return value;
}

// 使用示例
byte[] buffer = {0x00, 0x00, 0x00, 0x01};
int offset = 0;
uint value = buffer.ReadUInt(ref offset);
// value的值为1，offset的值更新为4
```

### ReadInt

#### 功能描述

从字节数组中读取32位有符号整数，并将偏移量向前移动。

#### 参数

- `byte[] buffer`：要读取的字节数组。
- `ref int offset`：引用偏移量。

#### 返回值

返回读取的32位有符号整数。

#### 应用场景

适用于需要从字节数组中读取32位有符号整数的场景。

#### 示例代码

```csharp
public int ReadInt(byte[] buffer, ref int offset)
{
    var value = BinaryPrimitives.ReadInt32BigEndian(buffer.AsSpan()[offset..]);
    offset += ConstSize.IntSize;
    return value;
}

// 使用示例
byte[] buffer = {0xFF, 0xFF, 0xFF, 0x7F};
int offset = 0;
int value = buffer.ReadInt(ref offset);
// value的值为2147483647，offset的值更新为4
```

### ReadULong

#### 功能描述

从字节数组中读取64位无符号整数，并将偏移量向前移动。

#### 参数

- `byte[] buffer`：要读取的字节数组。
- `ref int offset`：引用偏移量。

#### 返回值

返回读取的64位无符号整数。

#### 应用场景

适用于需要从字节数组中读取64位无符号整数的场景。

#### 示例代码

```csharp
public ulong ReadULong(byte[] buffer, ref int offset)
{
    var value = BinaryPrimitives.ReadUInt64BigEndian(buffer.AsSpan()[offset..]);
    offset += ConstSize.ULongSize;
    return value;
}

// 使用示例
byte[] buffer = {0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01};
int offset = 0;
ulong value = buffer.ReadULong(ref offset);
// value的值为1，offset的值更新为8
```

### ReadLong

#### 功能描述

从字节数组中读取64位有符号整数，并将偏移量向前移动。

#### 参数

- `byte[] buffer`：要读取的字节数组。
- `ref int offset`：引用偏移量。

#### 返回值

返回读取的64位有符号整数。

#### 应用场景

适用于需要从字节数组中读取64位有符号整数的场景。

#### 示例代码

```csharp
public long ReadLong(byte[] buffer, ref int offset)
{
    var value = BinaryPrimitives.ReadInt64BigEndian(buffer.AsSpan()[offset..]);
    offset += ConstSize.LongSize;
    return value;
}

// 使用示例
byte[] buffer = {0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x7F};
int offset = 0;
long value = buffer.ReadLong(ref offset);
// value的值为9223372036854775807，offset的值更新为8
```

### WriteFloat

#### 功能描述

将一个单精度浮点数写入指定的缓冲区，并更新偏移量。

#### 参数

- `byte[] buffer`：要写入的缓冲区。
- `float value`：要写入的值。
- `ref int offset`：要写入值的缓冲区中的偏移量。

#### 返回值

无返回值，但会更新`offset`参数。

#### 应用场景

适用于需要在字节缓冲区中存储单精度浮点数并跟踪写入位置的场景。

#### 示例代码

```csharp
public unsafe void WriteFloat(byte[] buffer, float value, ref int offset)
{
    if (offset + ConstSize.FloatSize > buffer.Length)
    {
        offset += ConstSize.FloatSize;
        return;
    }

    fixed (byte* ptr = buffer)
    {
        *(float*)(ptr + offset) = value;
        *(int*)(ptr + offset) = System.Net.IPAddress.HostToNetworkOrder(*(int*)(ptr + offset));
        offset += ConstSize.FloatSize;
    }
}

// 使用示例
byte[] buffer = new byte[10];
int offset = 0;
buffer.WriteFloat(1.23f, ref offset);
// buffer的内容和offset的值会被更新
```

### WriteDouble

#### 功能描述

将一个双精度浮点数写入指定的缓冲区，并更新偏移量。

#### 参数

- `byte[] buffer`：要写入的缓冲区。
- `double value`：要写入的值。
- `ref int offset`：要写入值的缓冲区中的偏移量。

#### 返回值

无返回值，但会更新`offset`参数。

#### 应用场景

适用于需要在字节缓冲区中存储双精度浮点数并跟踪写入位置的场景。

#### 示例代码

```csharp
public unsafe void WriteDouble(byte[] buffer, double value, ref int offset)
{
    if (offset + ConstSize.DoubleSize > buffer.Length)
    {
        offset += ConstSize.DoubleSize;
        return;
    }

    fixed (byte* ptr = buffer)
    {
        *(double*)(ptr + offset) = value;
        *(long*)(ptr + offset) = System.Net.IPAddress.HostToNetworkOrder(*(long*)(ptr + offset));
        offset += ConstSize.DoubleSize;
    }
}

// 使用示例
byte[] buffer = new byte[10];
int offset = 0;
buffer.WriteDouble(1.23, ref offset);
// buffer的内容和offset的值会被更新
```

### WriteBytes

#### 功能描述

将一个字节数组写入指定的缓冲区，并更新偏移量。

#### 参数

- `byte[] buffer`：要写入的缓冲区。
- `byte[] value`：要写入的值。
- `ref int offset`：要写入值的缓冲区中的偏移量。

#### 返回值

无返回值，但会更新`offset`参数。

#### 应用场景

适用于需要在字节缓冲区中存储字节数组并跟踪写入位置的场景。

#### 示例代码

```csharp
public unsafe void WriteBytes(byte[] buffer, byte[] value, ref int offset)
{
    if (value == null)
    {
        buffer.WriteInt(0, ref offset);
        return;
    }

    if (offset + value.Length + ConstSize.IntSize > buffer.Length)
    {
        offset += value.Length + ConstSize.IntSize;
        return;
    }

    buffer.WriteInt(value.Length, ref offset);
    System.Array.Copy(value, 0, buffer, offset, value.Length);
    offset += value.Length;
}

// 使用示例
byte[] buffer = new byte[20];
int offset = 0;
byte[] data = {1, 2, 3};
buffer.WriteBytes(data, ref offset);
// buffer的内容和offset的值会被更新
```

### WriteBytesWithoutLength

#### 功能描述

将一个字节数组写入指定的缓冲区，不写入长度，并更新偏移量。

#### 参数

- `byte[] buffer`：要写入的缓冲区。
- `byte[] value`：要写入的值。
- `ref int offset`：要写入值的缓冲区中的偏移量。

#### 返回值

无返回值，但会更新`offset`参数。

#### 应用场景

适用于需要在字节缓冲区中存储字节数组而不记录其长度的场景。

#### 示例代码

```csharp
public unsafe void WriteBytesWithoutLength(byte[] buffer, byte[] value, ref int offset)
{
    if (value == null)
    {
        buffer.WriteInt(0, ref offset);
        return;
    }

    if (offset + value.Length > buffer.Length)
    {
        throw new ArgumentException($"buffer write out of index {offset + value.Length + ConstSize.IntSize}, {buffer.Length}");
    }

    fixed (byte* ptr = buffer, valPtr = value)
    {
        Buffer.MemoryCopy(valPtr, ptr + offset, value.Length, value.Length);
        offset += value.Length;
    }
}

// 使用示例
byte[] buffer = new byte[20];
int offset = 0;
byte[] data = {1, 2, 3};
buffer.WriteBytesWithoutLength(data, ref offset);
// buffer的内容和offset的值会被更新
```

### WriteSByte

#### 功能描述

将一个有符号字节写入指定的缓冲区，并更新偏移量。

#### 参数

- `byte[] buffer`：要写入的缓冲区。
- `sbyte value`：要写入的值。
- `ref int offset`：要写入值的缓冲区中的偏移量。

#### 返回值

无返回值，但会更新`offset`参数。

#### 应用场景

适用于需要在字节缓冲区中存储有符号字节并跟踪写入位置的场景。

#### 示例代码

```csharp
public unsafe void WriteSByte(byte[] buffer, sbyte value, ref int offset)
{
    if (offset + ConstSize.SbyteSize > buffer.Length)
    {
        offset += ConstSize.SbyteSize;
        return;
    }

    fixed (byte* ptr = buffer)
    {
        *(sbyte*)(ptr + offset) = value;
        offset += ConstSize.SbyteSize;
    }
}

// 使用示例
byte[] buffer = new byte[10];
int offset = 0;
buffer.WriteSByte(127, ref offset);
// buffer的内容和offset的值会被更新
```

### WriteString

#### 功能描述

将一个字符串写入指定的缓冲区，并更新偏移量。

#### 参数

- `byte[] buffer`：要写入的缓冲区。
- `string value`：要写入的值。
- `ref int offset`：要写入值的缓冲区中的偏移量。

#### 返回值

无返回值，但会更新`offset`参数。

#### 应用场景

适用于需要在字节缓冲区中存储字符串并跟踪写入位置的场景。

#### 示例代码

```csharp
public unsafe void WriteString(byte[] buffer, string value, ref int offset)
{
    if (value == null)
        value = string.Empty;

    int len = System.Text.Encoding.UTF8.GetByteCount(value);

    if (len > short.MaxValue)
    {
        throw new ArgumentException($"string length exceed short.MaxValue {len}, {short.MaxValue}");
    }

    if (offset + len + ConstSize.ShortSize > buffer.Length)
    {
        offset += len + ConstSize.ShortSize;
        return;
    }

    fixed (byte* ptr = buffer)
    {
        System.Text.Encoding.UTF8.GetBytes(value, 0, value.Length, buffer, offset + ConstSize.ShortSize);
        WriteShort(buffer, (short)len, ref offset);
        offset += len;
    }
}

// 使用示例
byte[] buffer = new byte[20];
int offset = 0;
buffer.WriteString("Hello", ref offset);
// buffer的内容和offset的值会被更新
```

### WriteBool

#### 功能描述

将一个布尔值写入指定的缓冲区，并更新偏移量。

#### 参数

- `byte[] buffer`：要写入的缓冲区。
- `bool value`：要写入的值。
- `ref int offset`：要写入值的缓冲区中的偏移量。

#### 返回值

无返回值，但会更新`offset`参数。

#### 应用场景

适用于需要在字节缓冲区中存储布尔值并跟踪写入位置的场景。

#### 示例代码

```csharp
public unsafe void WriteBool(byte[] buffer, bool value, ref int offset)
{
    if (offset + ConstSize.BoolSize > buffer.Length)
    {
        offset += ConstSize.BoolSize;
        return;
    }

    fixed (byte* ptr = buffer)
    {
        *(bool*)(ptr + offset) = value;
        offset += ConstSize.BoolSize;
    }
}

// 使用示例
byte[] buffer = new byte[10];
int offset = 0;
buffer.WriteBool(true, ref offset);
// buffer的内容和offset的值会被更新
```

### ReadFloat

#### 功能描述

从给定的字节缓冲区中读取浮点数，并更新偏移量。

#### 参数

- `byte[] buffer`：包含了要读取数据的字节缓冲区。
- `ref int offset`：读取数据的起始位置，该方法会更新该值。

#### 返回值

从字节缓冲区中读取的浮点数。

#### 应用场景

适用于需要从字节缓冲区中读取单精度浮点数的场景。

#### 示例代码

```csharp
public unsafe float ReadFloat(byte[] buffer, ref int offset)
{
    if (offset > buffer.Length + ConstSize.FloatSize)
    {
        throw new Exception("buffer read out of index");
    }

    fixed (byte* ptr = buffer)
    {
        *(int*)(ptr + offset) = System.Net.IPAddress.NetworkToHostOrder(*(int*)(ptr + offset));
        var value = *(float*)(ptr + offset);
        offset += ConstSize.FloatSize;
        return value;
    }
}

// 使用示例
byte[] buffer = {0x40, 0x49, 0x0F, 0xD0};
int offset = 0;
float value = buffer.ReadFloat(ref offset);
// value的值为3.141592，offset的值更新为4
```

### ReadDouble

#### 功能描述

从指定偏移量读取双精度浮点数，并更新偏移量。

#### 参数

- `byte[] buffer`：要操作的字节缓冲区。
- `ref int offset`：操作的起始偏移量，操作完成后，会自动累加双精度浮点数的字节数。

#### 返回值

返回从缓冲区读取的双精度浮点数。

#### 应用场景

适用于需要从字节缓冲区中读取双精度浮点数的场景。

#### 示例代码

```csharp
public unsafe double ReadDouble(byte[] buffer, ref int offset)
{
    if (offset > buffer.Length + ConstSize.DoubleSize)
    {
        throw new Exception("buffer read out of index");
    }

    fixed (byte* ptr = buffer)
    {
        *(long*)(ptr + offset) = System.Net.IPAddress.NetworkToHostOrder(*(long*)(ptr + offset));
        var value = *(double*)(ptr + offset);
        offset += ConstSize.DoubleSize;
        return value;
    }
}

// 使用示例
byte[] buffer = {0x40, 0x09, 0x21, 0x0F, 0xD0, 0x4C, 0x4A, 0x00};
int offset = 0;
double value = buffer.ReadDouble(ref offset);
// value的值为3.141592653589793，offset的值更新为8
```

### ReadByte

#### 功能描述

从指定偏移量读取字节，并更新偏移量。

#### 参数

- `byte[] buffer`：要操作的字节缓冲区。
- `ref int offset`：操作的起始偏移量，操作完成后，会自动累加字节的字节数。

#### 返回值

返回从缓冲区读取的字节。

#### 应用场景

适用于需要从字节缓冲区中读取字节的场景。

#### 示例代码

```csharp
public unsafe byte ReadByte(byte[] buffer, ref int offset)
{
    if (offset > buffer.Length + ConstSize.ByteSize)
    {
        throw new Exception("buffer read out of index");
    }

    fixed (byte* ptr = buffer)
    {
        var value = *(ptr + offset);
        offset += ConstSize.ByteSize;
        return value;
    }
}

// 使用示例
byte[] buffer = {0x01};
int offset = 0;
byte value = buffer.ReadByte(ref offset);
// value的值为1，offset的值更新为1
```

### ReadBytes

#### 功能描述

从指定偏移量开始读取指定长度的字节数组，并更新偏移量。

#### 参数

- `byte[] buffer`：要操作的字节缓冲区。
- `offset`：操作的起始偏移量。
- `len`：需要读取的字节数组长度。

#### 返回值

返回从缓冲区读取的字节数组。

#### 应用场景

适用于需要从字节缓冲区中读取字节数组的场景。

#### 示例代码

```csharp
public unsafe byte[] ReadBytes(byte[] buffer, int offset, int len)
{
    if (len <= 0 || offset > buffer.Length + len * ConstSize.ByteSize)
    {
        return Array.Empty<byte>();
    }

    var data = new byte[len];
    System.Array.Copy(buffer, offset, data, 0, len);
    offset += len;
    return data;
}

// 使用示例
byte[] buffer = {0x01, 0x02, 0x03};
int offset = 0;
byte[] data = buffer.ReadBytes(offset, 3);
// data的值为{0x01, 0x02, 0x03}，offset的值更新为3
```

### ReadBytes (with ref offset)

#### 功能描述

从指定偏移量开始读取指定长度的字节数组，长度作为 int 类型数据在字节数组的开头，并更新偏移量。

#### 参数

- `byte[] buffer`：要操作的字节缓冲区。
- `ref int offset`：操作的起始偏移量，操作完成后，会自动累加读取的字节长度以及 int 类型长度。

#### 返回值

返回从缓冲区读取的字节数组。

#### 应用场景

适用于需要从字节缓冲区中读取字节数组，且字节数组长度存储在缓冲区开头的场景。

#### 示例代码

```csharp
public unsafe byte[] ReadBytes(byte[] buffer, ref int offset)
{
    var len = ReadInt(buffer, ref offset);

    if (len <= 0 || offset > buffer.Length + len * ConstSize.ByteSize)
    {
        return Array.Empty<byte>();
    }

    var data = new byte[len];
    System.Array.Copy(buffer, offset, data, 0, len);
    offset += len;
    return data;
}

// 使用示例
byte[] buffer = {0x00, 0x00, 0x00, 0x03, 0x01, 0x02, 0x03};
int offset = 0;
byte[] data = buffer.ReadBytes(ref offset);
// data的值为{0x01, 0x02, 0x03}，offset的值更新为7
```

### ReadSByte

#### 功能描述

从字节数组中以指定偏移量读取有符号字节，并更新偏移量。

#### 参数

- `byte[] buffer`：要从中读取数据的字节数组。
- `ref int offset`：读取数据的起始偏移量，此偏移量在读取后会自动增加。

#### 返回值

读取的有符号字节。

#### 应用场景

适用于需要从字节数组中读取有符号字节的场景。

#### 示例代码

```csharp
public unsafe sbyte ReadSByte(byte[] buffer, ref int offset)
{
    if (offset > buffer.Length + ConstSize.ByteSize)
    {
        throw new Exception("buffer read out of index");
    }

    fixed (byte* ptr = buffer)
    {
        var value = *(sbyte*)(ptr + offset);
        offset += ConstSize.ByteSize;
        return value;
    }
}

// 使用示例
byte[] buffer = {0x7F};
int offset = 0;
sbyte value = buffer.ReadSByte(ref offset);
// value的值为127，offset的值更新为1
```

### ReadString

#### 功能描述

从字节数组中以指定偏移量读取字符串，并更新偏移量。

#### 参数

- `byte[] buffer`：要从中读取数据的字节数组。
- `ref int offset`：读取数据的起始偏移量，此偏移量在读取后会自动增加。

#### 返回值

读取的字符串，若读取长度小于等于0或偏移量超出数组长度，返回空字符串。

#### 应用场景

适用于需要从字节数组中读取字符串的场景。

#### 示例代码

```csharp
public unsafe string ReadString(byte[] buffer, ref int offset)
{
    fixed (byte* ptr = buffer)
    {
        var len = ReadShort(buffer, ref offset);

        if (len <= 0 || offset > buffer.Length + len * ConstSize.ByteSize)
        {
            return string.Empty;
        }

        var value = System.Text.Encoding.UTF8.GetString(buffer, offset, len);
        offset += len;
        return value;
    }
}

// 使用示例
byte[] buffer = {0x00, 0x05, 0x48, 0x65, 0x6C, 0x6C, 0x6F};
int offset = 0;
string value = buffer.ReadString(ref offset);
// value的值为"Hello"，offset的值更新为7
```

### ReadBool

#### 功能描述

从字节数组中以指定偏移量读取布尔值，并更新偏移量。

#### 参数

- `byte[] buffer`：要从中读取数据的字节数组。
- `ref int offset`：读取数据的起始偏移量，此偏移量在读取后会自动增加。

#### 返回值

读取的布尔值。

#### 应用场景

适用于需要从字节数组中读取布尔值的场景。

#### 示例代码

```csharp
public unsafe bool ReadBool(byte[] buffer, ref int offset)
{
    if (offset > buffer.Length + ConstSize.BoolSize)
    {
        throw new Exception("buffer read out of index");
    }

    fixed (byte* ptr = buffer)
    {
        var value = *(bool*)(ptr + offset);
        offset += ConstSize.BoolSize;
        return value;
    }
}

// 使用示例
byte[] buffer = {0x01};
int offset = 0;
bool value = buffer.ReadBool(ref offset);
// value的值为true，offset的值更新为1
```

## 集合处理(CollectionExtensions)

### Merge<TKey, TValue>

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

### GetOrAdd<TKey, TValue>

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

### GetOrAdd<TKey, TValue>

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

### RemoveIf<TKey, TValue>

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

### IsNullOrEmpty<T>

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

### Random<T>

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

### Shuffer<T>

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

### RemoveIf<T>

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

### AddRange<T>

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

## 时间(DateTimeExtensions)

### GetDaysFrom

### 功能描述

计算从指定日期到当前日期的天数差。

### 参数

- `DateTime now`：当前日期。
- `DateTime dt`：指定的日期。

### 返回值

返回从指定日期到当前日期的天数差，类型为`int`。

### 应用场景

适用于需要计算两个日期之间天数差的场景，例如统计时间间隔、计算日期差等。

### 示例代码

```csharp
public int GetDaysFrom(DateTime now, DateTime dt)
{
    return (int)(now.Date - dt).TotalDays;
}

// 使用示例
DateTime now = DateTime.Now;
DateTime dt = new DateTime(2024, 1, 1);
int daysDifference = GetDaysFrom(now, dt);
// daysDifference 将返回从2024年1月1日到当前日期的天数差
```

### GetDaysFromDefault

### 功能描述

计算从默认日期（1970年1月1日）到当前日期的天数差。

### 参数

- `DateTime now`：当前日期。

### 返回值

返回从默认日期到当前日期的天数差，类型为`int`。

### 应用场景

适用于需要从特定历史日期（如Unix纪元的开始）计算到当前日期的天数差的场景，常用于系统时间戳的转换。

### 示例代码

```csharp
public int GetDaysFromDefault(DateTime now)
{
    return now.GetDaysFrom(new DateTime(1970, 1, 1).Date);
}

// 使用示例
DateTime now = DateTime.Now;
int daysFromDefault = GetDaysFromDefault(now);
// daysFromDefault 将返回从1970年1月1日到当前日期的天数差
```

## 表达式(ExpressionExtension)

### And

#### 功能描述

`And` 方法用于将两个表达式进行逻辑与运算，生成一个新的表达式，该表达式表示两个输入表达式同时为真时结果为真。

#### 参数

- `leftExpression`：第一个表达式，类型为 `Expression<Func<T, bool>>`。
- `rightExpression`：第二个表达式，类型同样为 `Expression<Func<T, bool>>`。

#### 返回值

返回一个类型为 `Expression<Func<T, bool>>` 的新表达式，表示两个输入表达式的逻辑与。

#### 应用场景

适用于需要组合两个布尔表达式，并且要求两个表达式都满足条件的场景，例如在查询数据库时构建复杂的过滤条件。

#### 示例代码

```csharp
Expression<Func<MyEntity, bool>> left = x => x.Property1 == 1;
Expression<Func<MyEntity, bool>> right = x => x.Property2 == "Value";
Expression<Func<MyEntity, bool>> combined = left.And(right);

// 使用示例
var query = dbContext.MyEntities.Where(combined);
```

### AndIf

#### 功能描述

`AndIf` 方法根据提供的委托条件，将两个表达式进行逻辑与运算。如果条件为真，则将两个表达式逻辑与，否则只使用第一个表达式。

#### 参数

- `leftExpression`：第一个表达式，类型为 `Expression<Func<T, bool>>`。
- `condition`：一个委托，返回布尔值，用于决定是否需要进行逻辑与操作。
- `rightExpression`：第二个表达式，同样类型为 `Expression<Func<T, bool>>`。

#### 返回值

根据条件，返回一个类型为 `Expression<Func<T, bool>>` 的新表达式，可能是逻辑与的结果或仅第一个表达式。

#### 应用场景

适用于需要根据某个条件来决定是否将两个布尔表达式进行逻辑与操作的场景。

#### 示例代码

```csharp
Expression<Func<MyEntity, bool>> left = x => x.Property1 == 1;
Expression<Func<MyEntity, bool>> right = x => x.Property2 == "Value";
Func<bool> condition = () => someConditionValue;
Expression<Func<MyEntity, bool>> combined = left.AndIf(condition, right);

// 使用示例
var query = dbContext.MyEntities.Where(combined);
```

### Or

#### 功能描述

`Or` 方法用于将两个表达式进行逻辑或运算，生成一个新的表达式，该表达式表示两个输入表达式中至少有一个为真时结果为真。

#### 参数

- `leftExpression`：第一个表达式，类型为 `Expression<Func<T, bool>>`。
- `rightExpression`：第二个表达式，类型同样为 `Expression<Func<T, bool>>`。

#### 返回值

返回一个类型为 `Expression<Func<T, bool>>` 的新表达式，表示两个输入表达式的逻辑或。

#### 应用场景

适用于需要组合两个布尔表达式，并且要求两个表达式中至少一个满足条件的场景。

#### 示例代码

```csharp
Expression<Func<MyEntity, bool>> left = x => x.Property1 == 1;
Expression<Func<MyEntity, bool>> right = x => x.Property2 == "Value";
Expression<Func<MyEntity, bool>> combined = left.Or(right);

// 使用示例
var query = dbContext.MyEntities.Where(combined);
```

### OrIf

#### 功能描述

`OrIf` 方法根据提供的委托条件，将两个表达式使用逻辑或操作符进行组合。如果指定的条件为真，则使用右表达式，否则使用左表达式。

#### 参数

- `leftExpression`：左表达式，类型为 `Expression<Func<T, bool>>`。
- `condition`：一个委托，返回布尔值，用于决定是否使用右表达式。
- `rightExpression`：右表达式，同样类型为 `Expression<Func<T, bool>>`。

#### 返回值

根据条件，返回一个类型为 `Expression<Func<T, bool>>` 的新表达式，可能是逻辑或的结果或仅左表达式。

#### 应用场景

适用于需要根据某个条件来决定是否将两个布尔表达式进行逻辑或操作的场景。

#### 示例代码

```csharp
Expression<Func<MyEntity, bool>> left = x => x.Property1 == 1;
Expression<Func<MyEntity, bool>> right = x => x.Property2 == "Value";
Func<bool> condition = () => someConditionValue;
Expression<Func<MyEntity, bool>> combined = left.OrIf(condition, right);

// 使用示例
var query = dbContext.MyEntities.Where(combined);
```

### Not

#### 功能描述

`Not` 方法对一个表达式进行逻辑非运算，生成一个新的表达式，该表达式表示输入表达式的逻辑相反。

#### 参数

- `expr`：要进行逻辑非运算的表达式，类型为 `Expression<Func<T, bool>>`。

#### 返回值

返回一个类型为 `Expression<Func<T, bool>>` 的新表达式，表示输入表达式的逻辑非。

#### 应用场景

适用于需要反转布尔表达式逻辑的场景，例如在查询数据库时排除某些条件。

#### 示例代码

```csharp
Expression<Func<MyEntity, bool>> expr = x => x.Property1 == 1;
Expression<Func<MyEntity, bool>> notExpr = expr.Not();

// 使用示例
var query = dbContext.MyEntities.Where(notExpr);
```

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

## 基础对象(ObjectExtension)

### CheckNotNull

- **功能描述**：该函数用于检查传入的参数是否为 null。如果为 null，则抛出一个 `ArgumentNullException` 异常。
- **参数**：
    - `value`: 需要检查的参数值。
    - `name`: 参数的名称。
- **返回值**：无返回值。
- **应用场景**：该函数通常用于确保传入的参数不为 null，从而避免在程序运行过程中出现不必要的错误。
- **示例代码**：

```csharp
string str = null;
str.CheckNotNull(); // 抛出 ArgumentNullException 异常
```

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

## 字符串(StringExtension)

### 1. RepeatChar 函数

功能描述：该函数用于重复某个字符指定次数，生成一个新的字符串。

参数：

- c: 要重复的字符。
- count: 重复的次数。

返回值：一个新的字符串，包含指定字符重复指定次数。

应用场景：可用于生成重复字符串，例如用于填充字符串达到指定长度等。

示例代码：

```csharp
string result = "a".RepeatChar(5); // 结果："aaaaa"
```

### 2. CenterAlignedText 函数

功能描述：该函数用于将字符串居中，并在两侧填充空格，使总长度达到指定宽度。

参数：

- text: 要居中的字符串。
- width: 指定的宽度。

返回值：一个新的字符串，包含居中的字符串。

应用场景：可用于格式化输出，使文本居中显示等。

示例代码：

```csharp
string result = "Hello".CenterAlignedText(10); // 结果："  Hello  "
```

### 3. WordWrap 函数

功能描述：该函数用于将字符串按指定宽度进行换行。

参数：

- text: 要换行的字符串。
- width: 指定的宽度。

返回值：一个新的字符串，包含换行后的字符串。

应用场景：可用于文本格式化，使文本在指定宽度内换行显示等。

示例代码：

```csharp
string result = "This is a very long sentence that needs to be wrapped.".WordWrap(10);
// 结果：
// "This is a"
// "very long"
// "sentence that"
// "needs to be"
// "wrapped."
```

### 4. RemoveSuffix 函数

功能描述：该函数用于从当前字符串中移除指定字符或子字符串结尾的后缀。

参数：

- self: 当前字符串。
- toRemove: 要移除的字符或子字符串。

返回值：一个新的字符串，包含移除后缀后的字符串。

应用场景：可用于移除字符串末尾的特定字符或子字符串，例如用于文件名后缀处理等。

示例代码：

```csharp
string result = "example.txt".RemoveSuffix(".txt"); // 结果："example"
```

### 5. RemoveWhiteSpace 函数

功能描述：该函数用于移除当前字符串中的所有空白字符。

参数：

- self: 当前字符串。

返回值：一个新的字符串，包含移除空白字符后的字符串。

应用场景：可用于移除字符串中的空格、制表符等空白字符，例如用于清理用户输入等。

示例代码：

```csharp
string result = "  Hello World!  ".RemoveWhiteSpace(); // 结果："HelloWorld!"
```

### 6. IsNullOrEmpty 函数

功能描述：该函数用于检查字符串是否为 null 或空。

参数：

- str: 要检查的字符串。

返回值：如果字符串为 null 或空，则为 true；否则为 false。

应用场景：可用于判断字符串是否为空，例如用于输入验证等。

示例代码：

```csharp
bool result = string.IsNullOrEmpty(""); // 结果：true
```

### 7. IsNotNullOrEmpty 函数

功能描述：该函数用于检查字符串是否不为 null 或空。

参数：

- str: 要检查的字符串。

返回值：如果字符串不为 null 或空，则为 true；否则为 false。

应用场景：可用于判断字符串是否不为空，例如用于条件判断等。

示例代码：

```csharp
bool result = string.IsNotNullOrEmpty("Hello"); // 结果：true
```

### 8. IsNullOrWhiteSpace 函数

功能描述：该函数用于检查字符串是否为 null 或空白字符串。

参数：

- str: 要检查的字符串。

返回值：如果字符串为 null 或空，则为 true；否则为 false。

应用场景：可用于判断字符串是否为空白，例如用于输入验证等。

示例代码：

```csharp
bool result = string.IsNullOrWhiteSpace(" "); // 结果：true
```

### 9. IsNotNullOrWhiteSpace 函数

功能描述：该函数用于检查字符串是否不为 null 或空白字符串。

参数：

- str: 要检查的字符串。

返回值：如果字符串不为 null 或空，则为 true；否则为 false。

应用场景：可用于判断字符串是否不为空白，例如用于条件判断等。

示例代码：

```csharp
bool result = string.IsNotNullOrWhiteSpace("Hello"); // 结果：true
```

### 10. CheckNotNullOrEmpty 函数

功能描述：该函数用于确保指定的值不为 null 或空。

参数：

- value: 要检查的值。
- name: 值的名称。

返回值：无返回值。

应用场景：可用于输入验证，确保传入的值不为 null 或空，例如用于方法参数检查等。

示例代码：

```csharp
void ExampleMethod(string input)
{
    input.CheckNotNullOrEmpty("input");
    // 如果 input 为 null 或空，将抛出异常
}
```

### 11. SplitToIntArray 函数

功能描述：该函数用于将字符串按指定的分隔符拆分为整数数组。

参数：

- str: 要拆分的字符串。
- sep: 用于分隔字符串的字符。

返回值：拆分得到的整数数组。

应用场景：可用于将字符串形式的数字列表拆分为整数数组，例如用于解析配置文件等。

示例代码：

```csharp
int[] result = "1+2+3+4".SplitToIntArray('+'); // 结果：{1, 2, 3, 4}
```

### 12. SplitTo2IntArray 函数

功能描述：该函数用于将字符串按指定的分隔符拆分为二维整数数组。

参数：

- str: 要拆分的字符串。
- sep1: 用于第一层分隔的字符。
- sep2: 用于第二层分隔的字符。

返回值：拆分得到的二维整数数组。

应用场景：可用于将字符串形式的数字列表拆分为二维整数数组，例如用于解析复杂配置文件等。

示例代码：

```csharp
int[][] result = "1+2;3+4;5+6".SplitTo2IntArray(';', '+');
// 结果：{{1, 2}, {3, 4}, {5, 6}}
```

### 13. CreateAsDirectory 函数

功能描述：该函数用于根据字符串创建目录，递归创建。

参数：

- path: 要创建的目录路径。
- isFile: 指示是否为文件路径。

返回值：无返回值。

应用场景：可用于创建目录或文件夹，例如用于项目初始化等。

示例代码：

```csharp
void ExampleMethod()
{
    "NewDirectory".CreateAsDirectory();
    // 如果 NewDirectory 目录不存在，将创建该目录
}
```

### 14. ConvertToSnakeCase 函数

功能描述：该函数用于将字符串转换为下划线分割的小写形式，用于命名。

参数：

- input: 要转换的字符串。

返回值：一个新的字符串，包含下划线分割的小写形式。

应用场景：可用于将字符串转换为符合命名规范的形式，例如用于变量名、方法名等。

示例代码：

```csharp
string result = "ThisIsAnExample".ConvertToSnakeCase(); // 结果："this_is_an_example"
```

## 系统计时器(TimerExtension)

### Reset 方法

- **功能描述**: 重置计时器，使其重新开始计时。
- **参数**:
    - `timer`: System.Timers.Timer类型的对象，需要被重置的计时器。
- **返回值**: 无
- **应用场景**: 当需要重新开始计时，或者在特定条件下重置计时器时使用。
- **示例代码**:

```C#
using GameFrameX.Extension;
using System.Timers;

class Program
{
    static void Main(string[] args)
    {
        System.Timers.Timer timer = new System.Timers.Timer(1000);
        timer.Elapsed += Timer_Elapsed;
        timer.Enabled = true;

        // 在计时器触发3次后重置计时器
        while (true)
        {
            if (timer.ElapsedMilliseconds >= 3000)
            {
                timer.Reset();
                break;
            }
        }
    }

    private static void Timer_Elapsed(object sender, ElapsedEventArgs e)
    {
        Console.WriteLine("计时器触发，当前时间：" + e.SignalTime);
    }
}
```

## 类型(TypeExtensions)

### IsImplWithInterface 方法

#### 功能描述

该方法用于判断一个类型是否实现了指定的接口。

#### 函数签名

```csharp
public static bool IsImplWithInterface(this Type self, Type target)
```

#### 参数

- `self`：要判断的类型。
- `target`：要判断的接口类型。

#### 返回值

- 如果类型实现了指定的接口且不是接口类型或抽象类型，则为 `true`；否则为 `false`。

#### 应用场景

- 在依赖注入或者类型转换时，用于检查一个类型是否实现了某个特定的接口。

#### 示例代码

```csharp
bool result = typeof(MyClass).IsImplWithInterface(typeof(IMyInterface));
```
