# 字符串

[[toc]]
---

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
