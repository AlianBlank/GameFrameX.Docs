# JSON (High-Performance Serialization Library)

[![.NET](https://img.shields.io/badge/.NET-8.0-blue.svg)](https://dotnet.microsoft.com/download) [![License](https://img.shields.io/badge/license-MIT-green.svg)]()

GameFrameX.Foundation.Json is a high-performance JSON serialization and deserialization library based on System.Text.Json, providing rich configuration options and special value handling capabilities.

## Features

- **High-Performance Serialization** - High-performance implementation based on System.Text.Json
- **Special Floating-Point Value Support** - Perfectly handles special floating-point values such as NaN, Infinity, -Infinity
- **Multiple Configuration Options** - Provides both default and formatted pre-configured options
- **Strong Fault Tolerance** - Multiple fault-tolerance mechanisms to ensure serialization/deserialization stability
- **UTF8 Byte Array Support** - Supports direct operations on UTF8 byte arrays
- **Try Pattern** - Provides safe try-serialize/try-deserialize methods
- **Enum String Serialization** - Enum values are automatically serialized as strings
- **Circular Reference Handling** - Automatically ignores circular references to avoid serialization exceptions

## Installation

```bash
dotnet add package GameFrameX.Foundation.Json
```

## Quick Start

```csharp
using GameFrameX.Foundation.Json;

// Define data model
public class User
{
    public string Name { get; set; }
    public int Age { get; set; }
    public bool IsActive { get; set; }
    public double Score { get; set; }
}

// Serialize object
var user = new User 
{ 
    Name = "张三", 
    Age = 25, 
    IsActive = true, 
    Score = 95.5 
};

string json = JsonHelper.Serialize(user);
Console.WriteLine(json);
// 输出: {"Name":"张三","Age":25,"IsActive":true,"Score":95.5}

// Deserialize object
User deserializedUser = JsonHelper.Deserialize<User>(json);
Console.WriteLine($"姓名: {deserializedUser.Name}, 年龄: {deserializedUser.Age}");

// Formatted serialization
string formattedJson = JsonHelper.SerializeFormat(user);
```

## Detailed Usage

### Serialization Methods

#### Basic Serialization

```csharp
// Serialize using default configuration
string json = JsonHelper.Serialize(obj);

// Serialize using custom configuration
var customOptions = new JsonSerializerOptions { WriteIndented = true };
string json = JsonHelper.Serialize(obj, customOptions);

// Formatted serialization (auto-indent)
string formattedJson = JsonHelper.SerializeFormat(obj);
```

#### UTF8 Byte Array Serialization

```csharp
// Serialize to UTF8 byte array
byte[] utf8Bytes = JsonHelper.SerializeToUtf8Bytes(obj);

// Formatted serialization to UTF8 byte array
byte[] formattedUtf8Bytes = JsonHelper.SerializeToUtf8BytesFormat(obj);
```

### Deserialization Methods

#### Basic Deserialization

```csharp
// Generic deserialization
User user = JsonHelper.Deserialize<User>(json);

// Type-based deserialization
object obj = JsonHelper.Deserialize(json, typeof(User));

// Deserialize using custom configuration
User user = JsonHelper.Deserialize<User>(json, customOptions);
```

#### UTF8 Byte Array Deserialization

```csharp
// Deserialize from UTF8 byte array
User user = JsonHelper.DeserializeFromUtf8Bytes<User>(utf8Bytes);

// Deserialize from UTF8 byte array using custom configuration
User user = JsonHelper.DeserializeFromUtf8Bytes<User>(utf8Bytes, customOptions);
```

### Safe Try Methods

```csharp
// Safe serialization
if (JsonHelper.TrySerialize(user, out string result))
{
    Console.WriteLine($"Serialization succeeded: {result}");
}
else
{
    Console.WriteLine("Serialization failed");
}

// Safe deserialization
if (JsonHelper.TryDeserialize<User>(json, out User user))
{
    Console.WriteLine($"Deserialization succeeded: {user.Name}");
}
else
{
    Console.WriteLine("Deserialization failed");
}
```

### Configuration Options

#### Default Configuration (DefaultOptions)

```csharp
public static readonly JsonSerializerOptions DefaultOptions = new JsonSerializerOptions
{
    // Ignore null value properties
    DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
    // Ignore circular references
    ReferenceHandler = ReferenceHandler.IgnoreCycles,
    // Ignore JSON comments
    ReadCommentHandling = JsonCommentHandling.Skip,
    // Use relaxed JavaScript encoder
    Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping,
    // Allow trailing commas
    AllowTrailingCommas = true,
    // Case-insensitive property names
    PropertyNameCaseInsensitive = true,
    // Allow reading numbers from strings and special floating-point values
    NumberHandling = JsonNumberHandling.AllowReadingFromString | 
                    JsonNumberHandling.AllowNamedFloatingPointLiterals,
    // Custom converters
    Converters = {
        new JsonStringEnumConverter(), // Enum string conversion
        new SpecialFloatingPointConverter(), // Special floating-point value conversion (double)
        new SpecialFloatingPointConverterFloat(), // Special floating-point value conversion (float)
        new SpecialFloatingPointDocumentConverter(), // JSON document special floating-point value conversion
    }
};
```

#### Format Configuration (FormatOptions)

The format configuration adds `WriteIndented = true` on top of the default configuration to produce formatted JSON output.

### Special Features

#### Special Floating-Point Value Handling

The library includes built-in comprehensive support for special floating-point values:

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
// 输出: {"NaNValue":"NaN","InfinityValue":"Infinity","NegativeInfinityValue":"-Infinity","FloatNaN":"NaN"}

TestData deserializedData = JsonHelper.Deserialize<TestData>(json);
// Special values are correctly restored
```

#### Enum Handling

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
// 输出: {"Status":"Active"}  (as a string, not a number)
```

#### Fault Tolerance Mechanism

The library provides multiple fault-tolerance mechanisms:

1. **Configuration Fallback** - Automatically tries the format configuration when the default configuration fails
2. **Special Value Preprocessing** - Automatically handles non-standard format special floating-point values
3. **Multiple Retries** - Retries with various approaches on failure

```csharp
// Even if JSON contains non-standard special values, they are handled correctly
string problematicJson = @"{""value"": NaN, ""score"": Infinity}";
var result = JsonHelper.Deserialize<Dictionary<string, double>>(problematicJson);
// Successfully deserialized, NaN and Infinity are correctly handled
```

## Advanced Usage

### Custom Configuration

```csharp
var customOptions = new JsonSerializerOptions
{
    PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
    WriteIndented = true,
    DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingDefault
};

// Add GameFrameX special converters
customOptions.Converters.Add(new SpecialFloatingPointConverter());
customOptions.Converters.Add(new JsonStringEnumConverter());

string json = JsonHelper.Serialize(data, customOptions);
```

### Batch Processing

```csharp
var users = new List<User>
{
    new User { Name = "张三", Age = 25 },
    new User { Name = "李四", Age = 30 },
    new User { Name = "王五", Age = 35 }
};

// Serialize list
string json = JsonHelper.Serialize(users);

// Deserialize list
List<User> deserializedUsers = JsonHelper.Deserialize<List<User>>(json);
```

### Performance Optimization

```csharp
// For large amounts of data, using UTF8 byte arrays can improve performance
byte[] utf8Data = JsonHelper.SerializeToUtf8Bytes(largeDataSet);

// Deserialize directly from byte array, avoiding string conversion overhead
var result = JsonHelper.DeserializeFromUtf8Bytes<LargeDataSet>(utf8Data);
```

## Best Practices

### Choosing the Right Serialization Method

```csharp
// For debugging and logging, use formatted serialization
string debugJson = JsonHelper.SerializeFormat(debugData);

// For network transmission and storage, use default serialization (more compact)
string compactJson = JsonHelper.Serialize(networkData);

// For high-performance scenarios, use UTF8 byte arrays
byte[] highPerfData = JsonHelper.SerializeToUtf8Bytes(data);
```

### Error Handling

```csharp
// For operations that may fail, use Try methods
if (!JsonHelper.TryDeserialize<User>(userJson, out User user))
{
    // Log the error
    logger.LogError("User data deserialization failed: {Json}", userJson);
    // Use default value or throw a business exception
    user = new User { Name = "Unknown User" };
}
```

### Data Model Design

```csharp
public class ApiResponse<T>
{
    public bool Success { get; set; }
    public string Message { get; set; }
    public T Data { get; set; }
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    
    // For properties that may be null, mark them explicitly
    public string ErrorCode { get; set; } = null;
}
```

### Configuration Management

```csharp
// Create dedicated configurations for different scenarios
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

### Troubleshooting

#### Common Issues

**Special Floating-Point Value Serialization Issue**
Issue: Error when serializing objects containing NaN or Infinity
Solution: Use GameFrameX.Foundation.Json, which has built-in special floating-point value handling

**Circular Reference Issue**
Issue: Circular references between objects cause serialization to fail
Solution: The library's default configuration has `ReferenceHandler.IgnoreCycles` enabled

**Enum Serialization Issue**
Issue: Want enums to be serialized as strings instead of numbers
Solution: The library includes `JsonStringEnumConverter` by default

**Performance Issue**
Issue: Poor serialization performance with large data volumes
Solution: Use UTF8 byte array methods to avoid string conversion overhead

#### Debugging Tips

```csharp
// Enable detailed error information
try
{
    var result = JsonHelper.Deserialize<ComplexObject>(json);
}
catch (JsonException ex)
{
    Console.WriteLine($"JSON parse error: {ex.Message}");
    Console.WriteLine($"Error location: Line {ex.LineNumber}, Position {ex.BytePositionInLine}");
    Console.WriteLine($"Problem path: {ex.Path}");
}
```

## API Reference

| Method | Parameters | Return Value | Description |
|------|------|--------|------|
| Serialize | `T` | `string` | Serialize object using default configuration |
| Serialize | `T, JsonSerializerOptions` | `string` | Serialize using custom configuration |
| SerializeFormat | `T` | `string` | Formatted serialization (auto-indent) |
| SerializeToUtf8Bytes | `T` | `byte[]` | Serialize to UTF8 byte array |
| SerializeToUtf8BytesFormat | `T` | `byte[]` | Formatted serialization to UTF8 byte array |
| Deserialize\<T\> | `string` | `T` | Generic deserialization |
| Deserialize | `string, Type` | `object` | Deserialize by type |
| Deserialize\<T\> | `string, JsonSerializerOptions` | `T` | Deserialize using custom configuration |
| DeserializeFromUtf8Bytes\<T\> | `byte[]` | `T` | Deserialize from UTF8 byte array |
| DeserializeFromUtf8Bytes\<T\> | `byte[], JsonSerializerOptions` | `T` | Deserialize from UTF8 byte array using custom configuration |
| TrySerialize | `T, out string` | `bool` | Safe serialization attempt |
| TryDeserialize\<T\> | `string, out T` | `bool` | Safe deserialization attempt |
| DefaultOptions | none | `JsonSerializerOptions` | Default configuration (static property) |
| FormatOptions | none | `JsonSerializerOptions` | Format configuration (static property) |
