# 系統擴充（功能豐富的 .NET 擴充方法庫）

GameFrameX.Foundation.Extensions 是一個功能豐富的 .NET 擴充方法庫，提供了大量實用的擴充方法和工具類別，用於簡化日常開發工作。該庫包含字串處理、集合操作、型別轉換、物件操作等多個方面的擴充功能。

## 特性

- **豐富的擴充方法** - 提供字串、集合、物件、型別等多種擴充方法
- **高效能** - 最佳化的演算法實作，確保高效執行
- **型別安全** - 完整的泛型支援和型別檢查
- **輕量級** - 無外部依賴，易於整合
- **雙向映射** - 提供雙向字典等進階資料結構
- **執行緒安全** - 部分元件支援並行操作

## 安裝

```bash
dotnet add package GameFrameX.Foundation.Extensions
```

## 快速開始

以下範例展示了最常見的擴充方法用法：

```csharp
using GameFrameX.Foundation.Extensions;

// 字串操作
string email = "user@example.com";
bool isValid = email.IsValidEmail(); // true

string text = "hello world";
string pascalCase = text.ToPascalCase(); // "HelloWorld"

// 集合操作
List<int> numbers = new List<int> { 1, 2, 3 };
bool isEmpty = numbers.IsNullOrEmpty(); // false

// 位元組陣列轉換
byte[] bytes = { 0x48, 0x65, 0x6C, 0x6C, 0x6F }; // "Hello" in ASCII
string decoded = bytes.ToUtf8String(); // "Hello"
```

## 詳細用法

### 字串擴充 (StringExtensions)

提供豐富的字串處理擴充方法：

```csharp
using GameFrameX.Foundation.Extensions;

// 字串驗證
string email = "user@example.com";
bool isValid = email.IsValidEmail(); // true

string url = "https://www.example.com";
bool isValidUrl = url.IsValidUrl(); // true

// 字串轉換
string text = "hello world";
string camelCase = text.ToCamelCase(); // "helloWorld"
string pascalCase = text.ToPascalCase(); // "HelloWorld"
string kebabCase = text.ToKebabCase(); // "hello-world"

// 字串擷取
string longText = "This is a very long text";
string truncated = longText.Truncate(10); // "This is a..."
string truncatedCustom = longText.Truncate(10, "***"); // "This is a***"

// 安全轉換
string numberStr = "123";
int number = numberStr.ToIntOrDefault(); // 123
int defaultValue = "abc".ToIntOrDefault(999); // 999

// 字串清理
string dirtyText = "  Hello\t\nWorld  ";
string cleaned = dirtyText.CleanWhitespace(); // "Hello World"

// Base64 編碼/解碼
string original = "Hello World";
string encoded = original.ToBase64(); // "SGVsbG8gV29ybGQ="
string decoded = encoded.FromBase64(); // "Hello World"
```

### 集合擴充 (CollectionExtensions & IEnumerableExtensions)

提供強大的集合操作擴充：

```csharp
using GameFrameX.Foundation.Extensions;

// 集合判斷
List<int> numbers = new List<int> { 1, 2, 3, 4, 5 };
bool isEmpty = numbers.IsNullOrEmpty(); // false
bool hasElements = numbers.IsNotNullOrEmpty(); // true

// 安全操作
List<string> items = null;
items.AddIfNotNull("test"); // 不會擲回例外

List<string> validItems = new List<string> { "a", "b", "c" };
validItems.AddIfNotNull("d"); // 新增成功

// 批次操作
var moreItems = new[] { "e", "f", "g" };
validItems.AddRange(moreItems);

// 去重操作
var duplicates = new[] { 1, 2, 2, 3, 3, 4 };
var unique = duplicates.Distinct().ToList(); // [1, 2, 3, 4]

// 分頁操作
var allItems = Enumerable.Range(1, 100);
var page1 = allItems.Skip(0).Take(10); // 第 1 頁，每頁 10 筆
var page2 = allItems.Skip(10).Take(10); // 第 2 頁，每頁 10 筆

// 隨機選擇
var randomItem = numbers.RandomElement(); // 隨機選擇一個元素
var randomItems = numbers.RandomElements(3); // 隨機選擇 3 個元素

// 分組操作
var people = new[]
{
    new { Name = "Alice", Age = 25 },
    new { Name = "Bob", Age = 30 },
    new { Name = "Charlie", Age = 25 }
};
var groupedByAge = people.GroupBy(p => p.Age);
```

### 物件擴充 (ObjectExtensions)

提供物件操作和轉換的擴充方法：

```csharp
using GameFrameX.Foundation.Extensions;

// 空值檢查
object obj = null;
bool isNull = obj.IsNull(); // true
bool isNotNull = obj.IsNotNull(); // false

// 型別檢查和轉換
object value = "123";
bool isString = value.Is<string>(); // true
string stringValue = value.As<string>(); // "123"

// 安全轉換
object numberObj = 42;
int? intValue = numberObj.AsOrDefault<int>(); // 42
string stringFromInt = numberObj.AsOrDefault<string>(); // null

// 深拷貝（如果物件支援序列化）
var original = new { Name = "Test", Value = 123 };
var copy = original.DeepClone(); // 深拷貝物件

// 屬性複製
public class Source { public string Name { get; set; } public int Age { get; set; } }
public class Target { public string Name { get; set; } public int Age { get; set; } }

var source = new Source { Name = "Alice", Age = 25 };
var target = new Target();
source.CopyPropertiesTo(target); // target.Name = "Alice", target.Age = 25
```

### 型別擴充 (TypeExtensions)

提供型別資訊和反射操作的擴充：

```csharp
using GameFrameX.Foundation.Extensions;

// 型別檢查
Type stringType = typeof(string);
bool isNullable = stringType.IsNullable(); // false

Type nullableIntType = typeof(int?);
bool isNullableInt = nullableIntType.IsNullable(); // true

// 取得預設值
Type intType = typeof(int);
object defaultValue = intType.GetDefaultValue(); // 0

// 型別比較
bool isAssignable = typeof(string).IsAssignableFrom(typeof(object)); // false
bool isAssignableReverse = typeof(object).IsAssignableFrom(typeof(string)); // true

// 取得泛型參數
Type listType = typeof(List<string>);
Type[] genericArgs = listType.GetGenericArguments(); // [typeof(string)]

// 檢查是否為集合型別
bool isList = typeof(List<int>).IsCollection(); // true
bool isArray = typeof(int[]).IsCollection(); // true
bool isString = typeof(string).IsCollection(); // false（字串不被視為集合）
```

### 位元組擴充 (ByteExtensions)

提供位元組陣列處理的擴充方法：

```csharp
using GameFrameX.Foundation.Extensions;

// 位元組陣列轉換
byte[] bytes = { 0x48, 0x65, 0x6C, 0x6C, 0x6F }; // "Hello" in ASCII
string text = bytes.ToUtf8String(); // "Hello"
string hex = bytes.ToHexString(); // "48656C6C6F"
string hexWithSeparator = bytes.ToHexString("-"); // "48-65-6C-6C-6F"

// 字串轉位元組陣列
string message = "Hello World";
byte[] utf8Bytes = message.ToUtf8Bytes();
byte[] asciiBytes = message.ToAsciiBytes();

// 十六進位字串轉位元組陣列
string hexString = "48656C6C6F";
byte[] fromHex = hexString.FromHexString(); // [0x48, 0x65, 0x6C, 0x6C, 0x6F]

// Base64 轉換
byte[] data = { 1, 2, 3, 4, 5 };
string base64 = data.ToBase64String(); // "AQIDBAU="
byte[] fromBase64 = base64.FromBase64String(); // [1, 2, 3, 4, 5]
```

### 雙向字典 (BidirectionalDictionary)

提供鍵值雙向映射的高效資料結構：

```csharp
using GameFrameX.Foundation.Extensions;

// 建立雙向字典
var biDict = new BidirectionalDictionary<string, int>();

// 新增鍵值對
bool added1 = biDict.TryAdd("one", 1); // true
bool added2 = biDict.TryAdd("two", 2); // true
bool added3 = biDict.TryAdd("one", 3); // false - 鍵已存在
bool added4 = biDict.TryAdd("three", 1); // false - 值已存在

// 雙向查找
if (biDict.TryGetValue("one", out int value))
{
    Console.WriteLine($"Key 'one' maps to value {value}"); // 輸出: 1
}

if (biDict.TryGetKey(2, out string key))
{
    Console.WriteLine($"Value 2 maps to key '{key}'"); // 輸出: "two"
}

// 清空字典
biDict.Clear();

// 使用初始容量最佳化效能
var optimizedBiDict = new BidirectionalDictionary<string, int>(100);
```

### 並行限制佇列 (ConcurrentLimitedQueue)

提供執行緒安全的定長佇列實作：

```csharp
using GameFrameX.Foundation.Extensions;

// 建立定長佇列
var queue = new ConcurrentLimitedQueue<string>(3); // 最大容量為 3

// 新增元素
queue.Enqueue("first");
queue.Enqueue("second");
queue.Enqueue("third");
Console.WriteLine(queue.Count); // 3

// 新增第 4 個元素，會自動移除最舊的元素
queue.Enqueue("fourth");
Console.WriteLine(queue.Count); // 仍然是 3

// 檢查佇列內容
if (queue.TryDequeue(out string item))
{
    Console.WriteLine(item); // "second"（first 被自動移除了）
}

// 從現有集合建立
var initialData = new List<string> { "a", "b", "c" };
var queueFromList = new ConcurrentLimitedQueue<string>(initialData);

// 隱式轉換
List<int> numbers = new List<int> { 1, 2, 3, 4, 5 };
ConcurrentLimitedQueue<int> numberQueue = numbers; // 隱式轉換

// 動態調整限制
queue.Limit = 5; // 調整佇列最大容量
```

## 進階用法

### 鏈式呼叫

擴充方法支援鏈式呼叫，讓程式碼更加簡潔：

```csharp
var result = "  Hello World  "
    .Trim()
    .ToLowerInvariant()
    .ToPascalCase()
    .Truncate(8); // "HelloWor"

var processedList = new[] { 1, 2, 2, 3, 4, 4, 5 }
    .Where(x => x > 2)
    .Distinct()
    .OrderByDescending(x => x)
    .ToList(); // [5, 4, 3]
```

### 效能最佳化建議

```csharp
// 1. 使用合適的初始容量
var biDict = new BidirectionalDictionary<string, int>(expectedSize);

// 2. 批次操作優於單個操作
var items = new List<string>();
items.AddRange(newItems); // 優於多次呼叫 Add

// 3. 使用 TryXxx 方法避免例外
if (biDict.TryGetValue(key, out var value))
{
    // 處理找到的值
}
else
{
    // 處理未找到的情況
}

// 4. 合理使用並行集合
var concurrentQueue = new ConcurrentLimitedQueue<Task>(maxConcurrency);
```

### 錯誤處理

```csharp
// 安全的型別轉換
object unknownValue = GetValueFromSomewhere();
int safeInt = unknownValue.AsOrDefault<int>(); // 轉換失敗回傳預設值

// 安全的字串操作
string input = null;
string safe = input.IsNullOrEmpty() ? "default" : input.Trim();

// 安全的集合操作
List<string> items = null;
int count = items.IsNullOrEmpty() ? 0 : items.Count;
```

### 擴充和自訂

如果需要新增自訂擴充方法，建議遵循以下模式：

```csharp
public static class CustomExtensions
{
    public static TResult SafeExecute<T, TResult>(this T obj, Func<T, TResult> func, TResult defaultValue = default)
    {
        try
        {
            return obj != null ? func(obj) : defaultValue;
        }
        catch
        {
            return defaultValue;
        }
    }
}

// 使用範例
string result = someObject.SafeExecute(x => x.ToString().ToUpper(), "DEFAULT");
```

## 最佳實踐

### 命名空間使用

```csharp
// 建議：明確引用命名空間
using GameFrameX.Foundation.Extensions;

// 避免：使用全域 using（除非整個專案都需要）
```

### 效能考量

```csharp
// 好的做法：預先分配容量
var biDict = new BidirectionalDictionary<string, int>(1000);

// 好的做法：使用合適的資料結構
var limitedQueue = new ConcurrentLimitedQueue<LogEntry>(maxLogEntries);

// 避免：在迴圈中進行昂貴的操作
foreach (var item in items)
{
    // 避免在這裡進行複雜的字串操作或反射
}
```

### 執行緒安全

```csharp
// ConcurrentLimitedQueue 是執行緒安全的
var queue = new ConcurrentLimitedQueue<WorkItem>(100);

// 可以在多執行緒環境中安全使用
Parallel.ForEach(workItems, item =>
{
    queue.Enqueue(item); // 執行緒安全
});

// BidirectionalDictionary 不是執行緒安全的，需要外部同步
var biDict = new BidirectionalDictionary<string, int>();
lock (biDict)
{
    biDict.TryAdd(key, value);
}
```

### 記憶體管理

```csharp
// 及時清理大型集合
largeBidirectionalDictionary.Clear();

// 合理設定佇列限制
var logQueue = new ConcurrentLimitedQueue<LogEntry>(1000); // 避免無限增長
```

## API 參考

| 類別 / 模組 | 說明 |
|-----------|------|
| `StringExtensions` | 字串驗證、轉換、擷取、Base64 編解碼 |
| `CollectionExtensions` / `IEnumerableExtensions` | 集合判空、安全新增、去重、分頁、隨機選擇 |
| `ObjectExtensions` | 空值檢查、型別轉換、深拷貝、屬性複製 |
| `TypeExtensions` | 可空型別判斷、預設值取得、集合型別偵測 |
| `ByteExtensions` | 位元組陣列與字串、十六進位、Base64 互轉 |
| `BidirectionalDictionary<TKey, TValue>` | 雙向映射字典 |
| `ConcurrentLimitedQueue<T>` | 執行緒安全的定長佇列 |
