# JSON（高效能序列化庫）

[![.NET](https://img.shields.io/badge/.NET-8.0-blue.svg)](https://dotnet.microsoft.com/download) [![License](https://img.shields.io/badge/license-MIT-green.svg)]()

GameFrameX.Foundation.Json 是一個基於 System.Text.Json 的高效能 JSON 序列化和反序列化庫，提供了豐富的設定選項和特殊值處理能力。

## 特性

- **高效能序列化** - 基於 System.Text.Json 的高效能實作
- **特殊浮點值支援** - 完美處理 NaN、Infinity、-Infinity 等特殊浮點值
- **多種設定選項** - 提供預設和格式化兩種預先設定選項
- **容錯性強** - 多重容錯機制，確保序列化/反序列化的穩定性
- **UTF8 位元組陣列支援** - 支援直接操作 UTF8 位元組陣列
- **Try 模式** - 提供安全的嘗試序列化/反序列化方法
- **列舉字串化** - 列舉值自動序列化為字串形式
- **循環參考處理** - 自動忽略循環參考，避免序列化例外

## 安裝

```bash
dotnet add package GameFrameX.Foundation.Json
```

## 快速開始

```csharp
using GameFrameX.Foundation.Json;

// 定義資料模型
public class User
{
    public string Name { get; set; }
    public int Age { get; set; }
    public bool IsActive { get; set; }
    public double Score { get; set; }
}

// 序列化物件
var user = new User 
{ 
    Name = "張三", 
    Age = 25, 
    IsActive = true, 
    Score = 95.5 
};

string json = JsonHelper.Serialize(user);
Console.WriteLine(json);
// 輸出: {"Name":"張三","Age":25,"IsActive":true,"Score":95.5}

// 反序列化物件
User deserializedUser = JsonHelper.Deserialize<User>(json);
Console.WriteLine($"姓名: {deserializedUser.Name}, 年齡: {deserializedUser.Age}");

// 格式化序列化
string formattedJson = JsonHelper.SerializeFormat(user);
```

## 詳細用法

### 序列化方法

#### 基本序列化

```csharp
// 使用預設設定序列化
string json = JsonHelper.Serialize(obj);

// 使用自訂設定序列化
var customOptions = new JsonSerializerOptions { WriteIndented = true };
string json = JsonHelper.Serialize(obj, customOptions);

// 格式化序列化（自動縮排）
string formattedJson = JsonHelper.SerializeFormat(obj);
```

#### UTF8 位元組陣列序列化

```csharp
// 序列化為 UTF8 位元組陣列
byte[] utf8Bytes = JsonHelper.SerializeToUtf8Bytes(obj);

// 格式化序列化為 UTF8 位元組陣列
byte[] formattedUtf8Bytes = JsonHelper.SerializeToUtf8BytesFormat(obj);
```

### 反序列化方法

#### 基本反序列化

```csharp
// 泛型反序列化
User user = JsonHelper.Deserialize<User>(json);

// Type 型別反序列化
object obj = JsonHelper.Deserialize(json, typeof(User));

// 使用自訂設定反序列化
User user = JsonHelper.Deserialize<User>(json, customOptions);
```

#### UTF8 位元組陣列反序列化

```csharp
// 從 UTF8 位元組陣列反序列化
User user = JsonHelper.DeserializeFromUtf8Bytes<User>(utf8Bytes);

// 使用自訂設定從 UTF8 位元組陣列反序列化
User user = JsonHelper.DeserializeFromUtf8Bytes<User>(utf8Bytes, customOptions);
```

### 安全的 Try 方法

```csharp
// 安全序列化
if (JsonHelper.TrySerialize(user, out string result))
{
    Console.WriteLine($"序列化成功: {result}");
}
else
{
    Console.WriteLine("序列化失敗");
}

// 安全反序列化
if (JsonHelper.TryDeserialize<User>(json, out User user))
{
    Console.WriteLine($"反序列化成功: {user.Name}");
}
else
{
    Console.WriteLine("反序列化失敗");
}
```

### 設定選項

#### 預設設定 (DefaultOptions)

```csharp
public static readonly JsonSerializerOptions DefaultOptions = new JsonSerializerOptions
{
    // 忽略 null 值屬性
    DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
    // 忽略循環參考
    ReferenceHandler = ReferenceHandler.IgnoreCycles,
    // 忽略 JSON 註解
    ReadCommentHandling = JsonCommentHandling.Skip,
    // 使用寬鬆的 JavaScript 編碼器
    Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping,
    // 允許尾隨逗號
    AllowTrailingCommas = true,
    // 屬性名稱大小寫不敏感
    PropertyNameCaseInsensitive = true,
    // 允許從字串讀取數字和特殊浮點值
    NumberHandling = JsonNumberHandling.AllowReadingFromString | 
                    JsonNumberHandling.AllowNamedFloatingPointLiterals,
    // 自訂轉換器
    Converters = {
        new JsonStringEnumConverter(), // 列舉字串轉換
        new SpecialFloatingPointConverter(), // 特殊浮點值轉換 (double)
        new SpecialFloatingPointConverterFloat(), // 特殊浮點值轉換 (float)
        new SpecialFloatingPointDocumentConverter(), // JSON 文件特殊浮點值轉換
    }
};
```

#### 格式化設定 (FormatOptions)

格式化設定在預設設定基礎上增加了 `WriteIndented = true`，用於產生格式化的 JSON 輸出。

### 特殊功能

#### 特殊浮點值處理

庫內建了對特殊浮點值的完整支援：

```csharp
public class TestData
{
    public double NaNValue { get; set; } = double.NaN;
    public double InfinityValue { get; set; } = double.PositiveInfinity;
    public double NegativeInfinityValue { get; set; } = double.NegativeInfinity;
    public float FloatNaN { get; set; } = float.NaN;
}

var data = new TestData();
string json = JsonHelper.Serialize(data);
// 輸出: {"NaNValue":"NaN","InfinityValue":"Infinity","NegativeInfinityValue":"-Infinity","FloatNaN":"NaN"}

TestData deserializedData = JsonHelper.Deserialize<TestData>(json);
// 特殊值正確還原
```

#### 列舉處理

```csharp
public enum Status
{
    Active,
    Inactive,
    Pending
}

public class Order
{
    public Status Status { get; set; } = Status.Active;
}

var order = new Order();
string json = JsonHelper.Serialize(order);
// 輸出: {"Status":"Active"} （字串形式，而非數字）
```

#### 容錯機制

庫提供了多重容錯機制：

1. **設定容錯** - 預設設定失敗時自動嘗試格式化設定
2. **特殊值預處理** - 自動處理非標準格式的特殊浮點值
3. **多次嘗試** - 失敗時進行多種方式的重試

```csharp
// 即使 JSON 包含非標準格式的特殊值，也能正確處理
string problematicJson = @"{""value"": NaN, ""score"": Infinity}";
var result = JsonHelper.Deserialize<Dictionary<string, double>>(problematicJson);
// 成功反序列化，NaN 和 Infinity 被正確處理
```

## 進階用法

### 自訂設定

```csharp
var customOptions = new JsonSerializerOptions
{
    PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
    WriteIndented = true,
    DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingDefault
};

// 新增 GameFrameX 的特殊轉換器
customOptions.Converters.Add(new SpecialFloatingPointConverter());
customOptions.Converters.Add(new JsonStringEnumConverter());

string json = JsonHelper.Serialize(data, customOptions);
```

### 批次處理

```csharp
var users = new List<User>
{
    new User { Name = "張三", Age = 25 },
    new User { Name = "李四", Age = 30 },
    new User { Name = "王五", Age = 35 }
};

// 序列化清單
string json = JsonHelper.Serialize(users);

// 反序列化清單
List<User> deserializedUsers = JsonHelper.Deserialize<List<User>>(json);
```

### 效能最佳化

```csharp
// 對於大量資料，使用 UTF8 位元組陣列可以提高效能
byte[] utf8Data = JsonHelper.SerializeToUtf8Bytes(largeDataSet);

// 直接從位元組陣列反序列化，避免字串轉換開銷
var result = JsonHelper.DeserializeFromUtf8Bytes<LargeDataSet>(utf8Data);
```

## 最佳實踐

### 選擇合適的序列化方法

```csharp
// 對於偵錯和日誌，使用格式化序列化
string debugJson = JsonHelper.SerializeFormat(debugData);

// 對於網路傳輸和儲存，使用預設序列化（更緊湊）
string compactJson = JsonHelper.Serialize(networkData);

// 對於高效能場景，使用 UTF8 位元組陣列
byte[] highPerfData = JsonHelper.SerializeToUtf8Bytes(data);
```

### 錯誤處理

```csharp
// 對於可能失敗的操作，使用 Try 方法
if (!JsonHelper.TryDeserialize<User>(userJson, out User user))
{
    // 記錄錯誤日誌
    logger.LogError("使用者資料反序列化失敗: {Json}", userJson);
    // 使用預設值或擲回業務例外
    user = new User { Name = "未知使用者" };
}
```

### 資料模型設計

```csharp
public class ApiResponse<T>
{
    public bool Success { get; set; }
    public string Message { get; set; }
    public T Data { get; set; }
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    
    // 對於可能為 null 的屬性，明確標記
    public string ErrorCode { get; set; } = null;
}
```

### 設定管理

```csharp
// 為不同場景建立專用設定
public static class JsonConfigurations
{
    public static readonly JsonSerializerOptions ApiOptions = new JsonSerializerOptions
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
        Converters = { new JsonStringEnumConverter() }
    };
    
    public static readonly JsonSerializerOptions LoggingOptions = new JsonSerializerOptions
    {
        WriteIndented = true,
        Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping
    };
}
```

### 故障排除

#### 常見問題

**特殊浮點值序列化問題**
問題: 序列化包含 NaN 或 Infinity 的物件時出錯
解決方案: 使用 GameFrameX.Foundation.Json，它內建了特殊浮點值處理

**循環參考問題**
問題: 物件間存在循環參考導致序列化失敗
解決方案: 庫的預設設定已啟用 `ReferenceHandler.IgnoreCycles`

**列舉序列化問題**
問題: 希望列舉序列化為字串而非數字
解決方案: 庫預設包含 `JsonStringEnumConverter`

**效能問題**
問題: 大資料量序列化效能不佳
解決方案: 使用 UTF8 位元組陣列方法，避免字串轉換開銷

#### 偵錯技巧

```csharp
// 啟用詳細的錯誤資訊
try
{
    var result = JsonHelper.Deserialize<ComplexObject>(json);
}
catch (JsonException ex)
{
    Console.WriteLine($"JSON 解析錯誤: {ex.Message}");
    Console.WriteLine($"錯誤位置: Line {ex.LineNumber}, Position {ex.BytePositionInLine}");
    Console.WriteLine($"問題路徑: {ex.Path}");
}
```

## API 參考

| 方法 | 參數 | 回傳值 | 說明 |
|------|------|--------|------|
| Serialize | `T` | `string` | 使用預設設定序列化物件 |
| Serialize | `T, JsonSerializerOptions` | `string` | 使用自訂設定序列化 |
| SerializeFormat | `T` | `string` | 格式化序列化（自動縮排） |
| SerializeToUtf8Bytes | `T` | `byte[]` | 序列化為 UTF8 位元組陣列 |
| SerializeToUtf8BytesFormat | `T` | `byte[]` | 格式化序列化為 UTF8 位元組陣列 |
| Deserialize\<T\> | `string` | `T` | 泛型反序列化 |
| Deserialize | `string, Type` | `object` | 按型別反序列化 |
| Deserialize\<T\> | `string, JsonSerializerOptions` | `T` | 使用自訂設定反序列化 |
| DeserializeFromUtf8Bytes\<T\> | `byte[]` | `T` | 從 UTF8 位元組陣列反序列化 |
| DeserializeFromUtf8Bytes\<T\> | `byte[], JsonSerializerOptions` | `T` | 使用自訂設定從 UTF8 位元組陣列反序列化 |
| TrySerialize | `T, out string` | `bool` | 安全序列化嘗試 |
| TryDeserialize\<T\> | `string, out T` | `bool` | 安全反序列化嘗試 |
| DefaultOptions | 無 | `JsonSerializerOptions` | 預設設定（靜態屬性） |
| FormatOptions | 無 | `JsonSerializerOptions` | 格式化設定（靜態屬性） |
