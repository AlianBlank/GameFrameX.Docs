# System Extensions (Feature-Rich .NET Extension Method Library)

GameFrameX.Foundation.Extensions is a feature-rich .NET extension method library that provides a wide range of practical extension methods and utility classes for simplifying everyday development work. The library covers string processing, collection operations, type conversion, object manipulation, and many other areas of extension functionality.

## Features

- **Rich Extension Methods** - Provides string, collection, object, type, and other extension methods
- **High Performance** - Optimized algorithm implementations for efficient execution
- **Type Safety** - Complete generic support and type checking
- **Lightweight** - No external dependencies, easy to integrate
- **Bidirectional Mapping** - Provides advanced data structures such as bidirectional dictionaries
- **Thread Safety** - Some components support concurrent operations

## Installation

```bash
dotnet add package GameFrameX.Foundation.Extensions
```

## Quick Start

The following examples demonstrate the most common extension method usage:

```csharp
using GameFrameX.Foundation.Extensions;

// String operations
string email = "user@example.com";
bool isValid = email.IsValidEmail(); // true

string text = "hello world";
string pascalCase = text.ToPascalCase(); // "HelloWorld"

// Collection operations
List<int> numbers = new List<int> { 1, 2, 3 };
bool isEmpty = numbers.IsNullOrEmpty(); // false

// Byte array conversion
byte[] bytes = { 0x48, 0x65, 0x6C, 0x6C, 0x6F }; // "Hello" in ASCII
string decoded = bytes.ToUtf8String(); // "Hello"
```

## Detailed Usage

### String Extensions (StringExtensions)

Provides a rich set of string processing extension methods:

```csharp
using GameFrameX.Foundation.Extensions;

// String validation
string email = "user@example.com";
bool isValid = email.IsValidEmail(); // true

string url = "https://www.example.com";
bool isValidUrl = url.IsValidUrl(); // true

// String conversion
string text = "hello world";
string camelCase = text.ToCamelCase(); // "helloWorld"
string pascalCase = text.ToPascalCase(); // "HelloWorld"
string kebabCase = text.ToKebabCase(); // "hello-world"

// String truncation
string longText = "This is a very long text";
string truncated = longText.Truncate(10); // "This is a..."
string truncatedCustom = longText.Truncate(10, "***"); // "This is a***"

// Safe conversion
string numberStr = "123";
int number = numberStr.ToIntOrDefault(); // 123
int defaultValue = "abc".ToIntOrDefault(999); // 999

// String cleaning
string dirtyText = "  Hello\t\nWorld  ";
string cleaned = dirtyText.CleanWhitespace(); // "Hello World"

// Base64 encoding/decoding
string original = "Hello World";
string encoded = original.ToBase64(); // "SGVsbG8gV29ybGQ="
string decoded = encoded.FromBase64(); // "Hello World"
```

### Collection Extensions (CollectionExtensions & IEnumerableExtensions)

Provides powerful collection operation extensions:

```csharp
using GameFrameX.Foundation.Extensions;

// Collection checks
List<int> numbers = new List<int> { 1, 2, 3, 4, 5 };
bool isEmpty = numbers.IsNullOrEmpty(); // false
bool hasElements = numbers.IsNotNullOrEmpty(); // true

// Safe operations
List<string> items = null;
items.AddIfNotNull("test"); // Will not throw an exception

List<string> validItems = new List<string> { "a", "b", "c" };
validItems.AddIfNotNull("d"); // Added successfully

// Batch operations
var moreItems = new[] { "e", "f", "g" };
validItems.AddRange(moreItems);

// Deduplication
var duplicates = new[] { 1, 2, 2, 3, 3, 4 };
var unique = duplicates.Distinct().ToList(); // [1, 2, 3, 4]

// Pagination
var allItems = Enumerable.Range(1, 100);
var page1 = allItems.Skip(0).Take(10); // Page 1, 10 items per page
var page2 = allItems.Skip(10).Take(10); // Page 2, 10 items per page

// Random selection
var randomItem = numbers.RandomElement(); // Randomly select one element
var randomItems = numbers.RandomElements(3); // Randomly select 3 elements

// Grouping
var people = new[]
{
    new { Name = "Alice", Age = 25 },
    new { Name = "Bob", Age = 30 },
    new { Name = "Charlie", Age = 25 }
};
var groupedByAge = people.GroupBy(p => p.Age);
```

### Object Extensions (ObjectExtensions)

Provides extension methods for object manipulation and conversion:

```csharp
using GameFrameX.Foundation.Extensions;

// Null checks
object obj = null;
bool isNull = obj.IsNull(); // true
bool isNotNull = obj.IsNotNull(); // false

// Type checking and conversion
object value = "123";
bool isString = value.Is<string>(); // true
string stringValue = value.As<string>(); // "123"

// Safe conversion
object numberObj = 42;
int? intValue = numberObj.AsOrDefault<int>(); // 42
string stringFromInt = numberObj.AsOrDefault<string>(); // null

// Deep clone (if the object supports serialization)
var original = new { Name = "Test", Value = 123 };
var copy = original.DeepClone(); // Deep clone the object

// Property copying
public class Source { public string Name { get; set; } public int Age { get; set; } }
public class Target { public string Name { get; set; } public int Age { get; set; } }

var source = new Source { Name = "Alice", Age = 25 };
var target = new Target();
source.CopyPropertiesTo(target); // target.Name = "Alice", target.Age = 25
```

### Type Extensions (TypeExtensions)

Provides extensions for type information and reflection operations:

```csharp
using GameFrameX.Foundation.Extensions;

// Type checking
Type stringType = typeof(string);
bool isNullable = stringType.IsNullable(); // false

Type nullableIntType = typeof(int?);
bool isNullableInt = nullableIntType.IsNullable(); // true

// Getting default values
Type intType = typeof(int);
object defaultValue = intType.GetDefaultValue(); // 0

// Type comparison
bool isAssignable = typeof(string).IsAssignableFrom(typeof(object)); // false
bool isAssignableReverse = typeof(object).IsAssignableFrom(typeof(string)); // true

// Getting generic arguments
Type listType = typeof(List<string>);
Type[] genericArgs = listType.GetGenericArguments(); // [typeof(string)]

// Check if a type is a collection type
bool isList = typeof(List<int>).IsCollection(); // true
bool isArray = typeof(int[]).IsCollection(); // true
bool isString = typeof(string).IsCollection(); // false (strings are not considered collections)
```

### Byte Extensions (ByteExtensions)

Provides extension methods for byte array processing:

```csharp
using GameFrameX.Foundation.Extensions;

// Byte array conversion
byte[] bytes = { 0x48, 0x65, 0x6C, 0x6C, 0x6F }; // "Hello" in ASCII
string text = bytes.ToUtf8String(); // "Hello"
string hex = bytes.ToHexString(); // "48656C6C6F"
string hexWithSeparator = bytes.ToHexString("-"); // "48-65-6C-6C-6F"

// String to byte array
string message = "Hello World";
byte[] utf8Bytes = message.ToUtf8Bytes();
byte[] asciiBytes = message.ToAsciiBytes();

// Hex string to byte array
string hexString = "48656C6C6F";
byte[] fromHex = hexString.FromHexString(); // [0x48, 0x65, 0x6C, 0x6C, 0x6F]

// Base64 conversion
byte[] data = { 1, 2, 3, 4, 5 };
string base64 = data.ToBase64String(); // "AQIDBAU="
byte[] fromBase64 = base64.FromBase64String(); // [1, 2, 3, 4, 5]
```

### Bidirectional Dictionary (BidirectionalDictionary)

Provides an efficient data structure for bidirectional key-value mapping:

```csharp
using GameFrameX.Foundation.Extensions;

// Create a bidirectional dictionary
var biDict = new BidirectionalDictionary<string, int>();

// Add key-value pairs
bool added1 = biDict.TryAdd("one", 1); // true
bool added2 = biDict.TryAdd("two", 2); // true
bool added3 = biDict.TryAdd("one", 3); // false - key already exists
bool added4 = biDict.TryAdd("three", 1); // false - value already exists

// Bidirectional lookup
if (biDict.TryGetValue("one", out int value))
{
    Console.WriteLine($"Key 'one' maps to value {value}"); // Output: 1
}

if (biDict.TryGetKey(2, out string key))
{
    Console.WriteLine($"Value 2 maps to key '{key}'"); // Output: "two"
}

// Clear the dictionary
biDict.Clear();

// Use initial capacity for performance optimization
var optimizedBiDict = new BidirectionalDictionary<string, int>(100);
```

### Concurrent Limited Queue (ConcurrentLimitedQueue)

Provides a thread-safe fixed-length queue implementation:

```csharp
using GameFrameX.Foundation.Extensions;

// Create a fixed-length queue
var queue = new ConcurrentLimitedQueue<string>(3); // Maximum capacity of 3

// Add elements
queue.Enqueue("first");
queue.Enqueue("second");
queue.Enqueue("third");
Console.WriteLine(queue.Count); // 3

// Adding a 4th element will automatically remove the oldest element
queue.Enqueue("fourth");
Console.WriteLine(queue.Count); // Still 3

// Check queue contents
if (queue.TryDequeue(out string item))
{
    Console.WriteLine(item); // "second" (first was automatically removed)
}

// Create from an existing collection
var initialData = new List<string> { "a", "b", "c" };
var queueFromList = new ConcurrentLimitedQueue<string>(initialData);

// Implicit conversion
List<int> numbers = new List<int> { 1, 2, 3, 4, 5 };
ConcurrentLimitedQueue<int> numberQueue = numbers; // Implicit conversion

// Dynamically adjust the limit
queue.Limit = 5; // Adjust the queue maximum capacity
```

## Advanced Usage

### Method Chaining

Extension methods support chaining for more concise code:

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

### Performance Optimization Tips

```csharp
// 1. Use appropriate initial capacity
var biDict = new BidirectionalDictionary<string, int>(expectedSize);

// 2. Batch operations over single operations
var items = new List<string>();
items.AddRange(newItems); // Better than multiple Add calls

// 3. Use TryXxx methods to avoid exceptions
if (biDict.TryGetValue(key, out var value))
{
    // Process the found value
}
else
{
    // Handle the not-found case
}

// 4. Use concurrent collections judiciously
var concurrentQueue = new ConcurrentLimitedQueue<Task>(maxConcurrency);
```

### Error Handling

```csharp
// Safe type conversion
object unknownValue = GetValueFromSomewhere();
int safeInt = unknownValue.AsOrDefault<int>(); // Returns default value on conversion failure

// Safe string operations
string input = null;
string safe = input.IsNullOrEmpty() ? "default" : input.Trim();

// Safe collection operations
List<string> items = null;
int count = items.IsNullOrEmpty() ? 0 : items.Count;
```

### Extension and Customization

If you need to add custom extension methods, it is recommended to follow this pattern:

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

// Usage example
string result = someObject.SafeExecute(x => x.ToString().ToUpper(), "DEFAULT");
```

## Best Practices

### Namespace Usage

```csharp
// Recommended: Explicitly reference the namespace
using GameFrameX.Foundation.Extensions;

// Avoid: Using global using (unless the entire project needs it)
```

### Performance Considerations

```csharp
// Good practice: Pre-allocate capacity
var biDict = new BidirectionalDictionary<string, int>(1000);

// Good practice: Use appropriate data structures
var limitedQueue = new ConcurrentLimitedQueue<LogEntry>(maxLogEntries);

// Avoid: Performing expensive operations in loops
foreach (var item in items)
{
    // Avoid complex string operations or reflection here
}
```

### Thread Safety

```csharp
// ConcurrentLimitedQueue is thread-safe
var queue = new ConcurrentLimitedQueue<WorkItem>(100);

// Can be safely used in multi-threaded environments
Parallel.ForEach(workItems, item =>
{
    queue.Enqueue(item); // Thread-safe
});

// BidirectionalDictionary is not thread-safe and requires external synchronization
var biDict = new BidirectionalDictionary<string, int>();
lock (biDict)
{
    biDict.TryAdd(key, value);
}
```

### Memory Management

```csharp
// Clean up large collections promptly
largeBidirectionalDictionary.Clear();

// Set reasonable queue limits
var logQueue = new ConcurrentLimitedQueue<LogEntry>(1000); // Prevent unbounded growth
```

## API Reference

| Class / Module | Description |
|----------------|-------------|
| `StringExtensions` | String validation, conversion, truncation, Base64 encoding/decoding |
| `CollectionExtensions` / `IEnumerableExtensions` | Collection null checks, safe add, deduplication, pagination, random selection |
| `ObjectExtensions` | Null checks, type conversion, deep clone, property copying |
| `TypeExtensions` | Nullable type detection, default value retrieval, collection type detection |
| `ByteExtensions` | Byte array to/from string, hex, and Base64 conversions |
| `BidirectionalDictionary<TKey, TValue>` | Bidirectional mapping dictionary |
| `ConcurrentLimitedQueue<T>` | Thread-safe fixed-length queue |
