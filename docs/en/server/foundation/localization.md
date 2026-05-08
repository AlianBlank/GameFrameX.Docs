# Localization Framework

A lightweight localization framework that provides lazy loading, zero-configuration usage, and thread-safe localization solutions.

## Features

- **Zero Configuration**: No initialization configuration required; automatically discovers and loads localization resources
- **High Performance Design**: Lazy loading mechanism that loads resources only on first use, with multi-layer caching for optimized access performance
- **Multi-language Support**: Built-in Chinese (Simplified) and English support, extensible to more languages, with smart language fallback mechanism
- **Highly Extensible**: Supports custom resource providers, flexible priority management, and modular component design

## Installation

```bash
dotnet add package GameFrameX.Foundation.Localization
```

## Quick Start

### Basic Usage

```csharp
using GameFrameX.Foundation.Localization.Core;

// Get localized string
var message = LocalizationService.GetString("Utility.Exceptions.TimestampOutOfRange");

// Formatted message with parameters
var formattedMessage = LocalizationService.GetString("Encryption.InvalidKeySize", 128, 256);

// If key does not exist, returns the key name itself
var unknown = LocalizationService.GetString("Some.Unknown.Key"); // Returns: "Some.Unknown.Key"
```

### Preload Resources (Optional)

```csharp
// Preload all localization resources at application startup
LocalizationService.EnsureLoaded();

// Subsequent usage will have no first-access delay
var message = LocalizationService.GetString("ArgumentNull");
```

## Detailed Usage

### Core Components

```
GameFrameX.Foundation.Localization
├── Core/                    # Core interfaces and management classes
│   ├── IResourceProvider.cs         # Resource provider interface
│   ├── ResourceManager.cs           # Resource manager
│   └── ResourceManagerStatistics.cs # Statistics
└── Providers/               # Concrete implementations
    ├── DefaultResourceProvider.cs   # Default resource provider
    └── AssemblyResourceProvider.cs  # Assembly resource provider
```

### Resource Resolution Priority

1. **Custom Providers** (highest priority)
2. **Assembly Resource Providers**
3. **Default Provider** (fallback)

### Integrating Localization in Existing Modules

#### Step 1: Define Localization Keys

```csharp
// GameFrameX.Foundation.YourModule/Localization/Keys.cs
namespace GameFrameX.Foundation.YourModule.Localization;

public static class LocalizationKeys
{
    public static class Exceptions
    {
        public const string InvalidArgument = "YourModule.Exceptions.InvalidArgument";
        public const string OperationFailed = "YourModule.Exceptions.OperationFailed";
    }

    public static class Messages
    {
        public const string Success = "YourModule.Messages.Success";
        public const string Processing = "YourModule.Messages.Processing";
    }
}
```

#### Step 2: Create Resource Files

Create `Localization/Messages/Resources.resx` (default English) and `Resources.zh-CN.resx` (Chinese):

```xml
<?xml version="1.0" encoding="utf-8"?>
<root>
  <data name="YourModule.Exceptions.InvalidArgument" xml:space="preserve">
    <value>Invalid argument provided for {0}</value>
  </data>
  <data name="YourModule.Messages.Success" xml:space="preserve">
    <value>Operation completed successfully</value>
  </data>
</root>
```

#### Step 3: Update Project File

```xml
<PropertyGroup>
  <EnableDefaultEmbeddedResourceItems>false</EnableDefaultEmbeddedResourceItems>
</PropertyGroup>

<ItemGroup>
  <EmbeddedResource Include="Localization\Messages\*.resx" />
</ItemGroup>
```

#### Step 4: Use in Code

```csharp
using GameFrameX.Foundation.Localization.Core;
using GameFrameX.Foundation.YourModule.Localization;

public class YourService
{
    public void ProcessData(string input)
    {
        if (string.IsNullOrEmpty(input))
        {
            throw new ArgumentException(
                LocalizationService.GetString(LocalizationKeys.Exceptions.InvalidArgument, nameof(input)));
        }

        var successMessage = LocalizationService.GetString(LocalizationKeys.Messages.Success);
        Console.WriteLine(successMessage);
    }
}
```

### Custom Resource Provider

```csharp
public class DatabaseResourceProvider : IResourceProvider
{
    private readonly IDbConnection _connection;

    public DatabaseResourceProvider(IDbConnection connection)
    {
        _connection = connection;
    }

    public string GetString(string key)
    {
        var sql = "SELECT localized_text FROM localization_strings WHERE key = @key AND culture = @culture";
        return _connection.ExecuteScalar<string>(sql, new { key, culture = CultureInfo.CurrentCulture.Name });
    }
}

// Register custom provider
var dbProvider = new DatabaseResourceProvider(yourDbConnection);
LocalizationService.RegisterProvider(dbProvider);
```

### Monitoring and Statistics

```csharp
var stats = LocalizationService.GetStatistics();
Console.WriteLine($"Providers loaded: {stats.ProvidersLoaded}");
Console.WriteLine($"Total provider count: {stats.TotalProviderCount}");
Console.WriteLine($"Assembly provider count: {stats.AssemblyProviderCount}");

var providers = LocalizationService.GetProviders();
foreach (var provider in providers)
{
    Console.WriteLine($"Provider type: {provider.GetType().Name}");
}
```

### Localization in Exception Handling

```csharp
using GameFrameX.Foundation.Utility.Localization;

public class ExceptionExamples
{
    public void ValidateTimestamp(long timestamp)
    {
        if (timestamp <= 0)
        {
            throw new ArgumentOutOfRangeException(
                nameof(timestamp),
                LocalizationService.GetString(LocalizationKeys.Exceptions.TimestampOutOfRange));
        }
    }
}
```

### Dynamic Language Switching

```csharp
public class LocalizationManager
{
    public void SwitchLanguage(string cultureCode)
    {
        Thread.CurrentThread.CurrentUICulture = new CultureInfo(cultureCode);
        Thread.CurrentThread.CurrentCulture = new CultureInfo(cultureCode);
        LocalizationService.EnsureLoaded();
    }
}
```

### Resource File Organization

```
{AssemblyName}/Localization/Messages/Resources.{CultureCode}.resx

Examples:
GameFrameX.Foundation.Localization/Localization/Messages/Resources.zh-CN.resx
GameFrameX.Foundation.Utility/Localization/Messages/Resources.resx
GameFrameX.Foundation.Encryption/Localization/Messages/Resources.zh-CN.resx
```

### Integrated Modules

| Module | Localization Key Count | Status |
|--------|------------------------|--------|
| GameFrameX.Foundation.Utility | 4 | Complete |
| GameFrameX.Foundation.Encryption | 20+ | Complete |
| GameFrameX.Foundation.Extensions | 7 | Complete |
| GameFrameX.Foundation.Hash | 2 | Complete |

### FAQ

#### How to add new language support?

Create a `Resources.{language-code}.resx` file in the `Localization/Messages/` directory of the corresponding module, for example `Resources.fr.resx` (French), `Resources.ja.resx` (Japanese).

#### Resource files are not taking effect?

Check:
1. Whether the resource file is set as "Embedded Resource"
2. Whether the file naming is correct (`Resources.{culture-code}.resx`)
3. Whether the project file includes the resource file configuration
4. Rebuild the project

## Best Practices

### Key Naming Conventions

- **Pattern**: `{ModuleName}.{Category}.{SpecificKeyName}`
- **Examples**: `Utility.Exceptions.TimestampOutOfRange`, `Encryption.InvalidKeySize`

### Parameterized Messages

```csharp
// Define in resource file
// <value>Password for user '{0}' is invalid, length should be between {1}-{2} characters</value>

// Use in code
var message = LocalizationService.GetString("User.InvalidPassword", username, minLength, maxLength);
```

### Performance Optimization

```csharp
// Preload at application startup (optional)
LocalizationService.EnsureLoaded();
```

## API Reference

### LocalizationService

| Method | Description |
|------|------|
| `GetString(string key, params object[] args)` | Get localized string, supports parameterized formatting |
| `EnsureLoaded()` | Preload all localization resources |
| `RegisterProvider(IResourceProvider provider)` | Register custom resource provider |
| `GetStatistics()` | Get localization statistics |
| `GetProviders()` | Get all registered resource providers |

### IResourceProvider Interface

| Method | Description |
|------|------|
| `GetString(string key)` | Get localized string by key |

## License

MIT + Apache 2.0
