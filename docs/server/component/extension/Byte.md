# 字节处理

[[toc]]
---

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
