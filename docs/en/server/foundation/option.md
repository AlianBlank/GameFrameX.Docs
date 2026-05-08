# Startup Argument Parser (Automatic Mapping of Command-Line Arguments and Environment Variables)

A powerful command-line argument and environment variable parsing library that supports automatic mapping of command-line arguments and environment variables to strongly typed configuration objects.

## Features

- **Argument Priority Handling**: Command-line arguments > Environment variables > Default values
- **Generic Support**: Supports any strongly typed configuration class
- **Multiple Launch Mode Compatibility**: Supports Docker, exe, shell, and other launch methods
- **Automatic Prefix Handling**: Automatically adds the `--` prefix to arguments
- **Boolean Argument Support**: Supports multiple boolean argument formats
- **Environment Variable Mapping**: Automatically maps environment variables to configuration properties
- **Type Conversion**: Automatically converts string arguments to target types
- **Attribute Support**: Supports a rich set of configuration attributes

## Installation

```bash
dotnet add package GameFrameX.Foundation.Options
```

## Quick Start

### 1. Define a Configuration Class

```csharp
public class AppConfig
{
    public string Host { get; set; } = "localhost";
    public int Port { get; set; } = 8080;
    public bool Debug { get; set; } = false;
    public string LogLevel { get; set; } = "info";
    public double Timeout { get; set; } = 30.5;
}
```

### 2. Use OptionsBuilder

```csharp
using GameFrameX.Foundation.Options;

class Program
{
    static void Main(string[] args)
    {
        // Create options builder
        var builder = new OptionsBuilder<AppConfig>(args);
        
        // Build configuration object
        var config = builder.Build();
        
        // Use configuration
        Console.WriteLine($"服务器: {config.Host}:{config.Port}");
        Console.WriteLine($"调试模式: {config.Debug}");
        Console.WriteLine($"日志级别: {config.LogLevel}");
        Console.WriteLine($"超时时间: {config.Timeout}秒");
    }
}
```

## Detailed Usage

### Command-Line Arguments

Multiple argument formats are supported:

```bash
# Key-value pair format
myapp.exe --host=example.com --port=9090 --debug=true

# Separated format
myapp.exe --host example.com --port 9090 --debug true

# Boolean flag format
myapp.exe --host example.com --port 9090 --debug

# Mixed format
myapp.exe --host=example.com --port 9090 --debug
```

### Environment Variables

```bash
# Set environment variables
export HOST=example.com
export PORT=9090
export DEBUG=true

# Run the program
myapp.exe
```

### Docker Support

```dockerfile
# Dockerfile
FROM mcr.microsoft.com/dotnet/runtime:8.0
COPY . /app
WORKDIR /app
ENTRYPOINT ["dotnet", "MyApp.dll"]
```

```bash
# Docker run
docker run myapp --host example.com --port 9090 --debug

# Or use environment variables
docker run -e HOST=example.com -e PORT=9090 -e DEBUG=true myapp
```

## Advanced Usage

### Using Attributes for Configuration

```csharp
using GameFrameX.Foundation.Options.Attributes;

public class AdvancedConfig
{
    [Option("h", "host", Required = false, DefaultValue = "localhost")]
    [HelpText("Server host address")]
    public string Host { get; set; }

    [Option("p", "port", Required = true)]
    [HelpText("Server port number")]
    public int Port { get; set; }

    [FlagOption("d", "debug")]
    [HelpText("Enable debug mode")]
    public bool Debug { get; set; }

    [RequiredOption("api-key", Required = true)]
    [EnvironmentVariable("API_KEY")]
    [HelpText("API key")]
    public string ApiKey { get; set; }

    [DefaultValue(30.0)]
    public double Timeout { get; set; }
}
```

### Builder Options

```csharp
var builder = new OptionsBuilder<AppConfig>(
    args: args,
    boolFormat: BoolArgumentFormat.Flag,        // Boolean argument format
    ensurePrefixedKeys: true,                   // Ensure arguments have prefixes
    useEnvironmentVariables: true              // Use environment variables
);

var config = builder.Build(skipValidation: false); // Whether to skip validation
```

### Argument Priority

Arguments are applied with the following priority (higher priority overrides lower priority):

1. **Command-line arguments** (highest priority)
2. **Environment variables**
3. **Default values** (lowest priority)

#### Example

```csharp
public class Config
{
    public string Host { get; set; } = "localhost";  // Default value
    public int Port { get; set; } = 8080;           // Default value
}
```

```bash
# Set environment variables
export HOST=env.example.com
export PORT=7070

# Run the program (command-line arguments override environment variables)
myapp.exe --host cmd.example.com

# Result:
# Host = "cmd.example.com"  (from command-line argument)
# Port = 7070               (from environment variable)
```

### Boolean Argument Handling

Multiple boolean argument formats are supported:

```bash
# Flag format (recommended)
myapp.exe --debug                    # debug = true

# Key-value pair format
myapp.exe --debug=true               # debug = true
myapp.exe --debug=false              # debug = false

# Separated format
myapp.exe --debug true               # debug = true
myapp.exe --debug false              # debug = false

# Supported boolean values
true, false, 1, 0, yes, no, on, off
```

### Type Conversion

The following type conversions are automatically supported:

- `string` - Used directly
- `int`, `int?` - Integer conversion
- `bool`, `bool?` - Boolean conversion
- `double`, `double?` - Double-precision floating point conversion
- `float`, `float?` - Single-precision floating point conversion
- `decimal`, `decimal?` - Decimal conversion
- `DateTime`, `DateTime?` - DateTime conversion
- `Guid`, `Guid?` - GUID conversion
- `Enum` - Enum conversion

#### Example

```csharp
public class TypedConfig
{
    public int Port { get; set; }
    public bool Debug { get; set; }
    public DateTime StartTime { get; set; }
    public LogLevel Level { get; set; }  // Enum
}

public enum LogLevel
{
    Debug, Info, Warning, Error
}
```

```bash
myapp.exe --port 9090 --debug true --start-time "2024-01-01 10:00:00" --level Info
```

### Error Handling

#### Required Argument Validation

```csharp
public class Config
{
    [RequiredOption("api-key", Required = true)]
    public string ApiKey { get; set; }
}
```

If a required argument is missing, an `ArgumentException` is thrown:

```
缺少必需的选项: api-key
```

#### Type Conversion Errors

When an argument value cannot be converted to the target type, the default value is used and a warning message is printed to the console.

### Debug Mode

During development, you can enable debug mode to view detailed argument parsing information, making it easier to troubleshoot configuration issues.

## Best Practices

### 1. Configuration Class Design

```csharp
public class AppConfig
{
    // Use meaningful default values
    public string Host { get; set; } = "localhost";
    public int Port { get; set; } = 8080;
    
    // Boolean properties default to false
    public bool Debug { get; set; } = false;
    
    // Use attributes to provide more information
    [RequiredOption("database-url", Required = true)]
    [EnvironmentVariable("DATABASE_URL")]
    public string DatabaseUrl { get; set; }
}
```

### 2. Error Handling

```csharp
try
{
    var builder = new OptionsBuilder<AppConfig>(args);
    var config = builder.Build();
    
    // Use configuration to start the application
    StartApplication(config);
}
catch (ArgumentException ex)
{
    Console.WriteLine($"Configuration error: {ex.Message}");
    Environment.Exit(1);
}
```

### 3. Docker Integration

```csharp
// Program.cs
public class Program
{
    public static void Main(string[] args)
    {
        var builder = new OptionsBuilder<AppConfig>(args);
        var config = builder.Build();
        
        // In Docker, environment variables are typically used
        // In development, command-line arguments are typically used
        
        var app = CreateApplication(config);
        app.Run();
    }
}
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  myapp:
    image: myapp:latest
    environment:
      - HOST=0.0.0.0
      - PORT=8080
      - DEBUG=false
    command: ["--log-level", "info"]
```

## API Reference

### `OptionsBuilder<T>`

| Method | Description |
|--------|-------------|
| `OptionsBuilder<T>(args)` | Create a builder, passing in command-line arguments |
| `Build()` | Build the configuration object |
| `Build(skipValidation)` | Build the configuration object, optionally skipping validation |

### Attributes

| Attribute | Description |
|-----------|-------------|
| `[Option(shortName, longName)]` | Configure option mapping |
| `[FlagOption(shortName, longName)]` | Boolean flag option |
| `[RequiredOption(longName)]` | Required option |
| `[EnvironmentVariable(name)]` | Environment variable mapping |
| `[DefaultValue(value)]` | Default value |
| `[HelpText(text)]` | Help text description |

### CommandLineArgumentConverter

`CommandLineArgumentConverter` provides low-level command-line argument conversion functionality, supporting conversion of string arguments to target types. It is typically used indirectly through `OptionsBuilder` and does not need to be called directly.

### Complete Example

```csharp
using GameFrameX.Foundation.Options;
using GameFrameX.Foundation.Options.Attributes;

namespace MyApp
{
    public class ServerConfig
    {
        [Option("h", "host", DefaultValue = "localhost")]
        [EnvironmentVariable("SERVER_HOST")]
        [HelpText("Server host address")]
        public string Host { get; set; }

        [Option("p", "port", DefaultValue = 8080)]
        [EnvironmentVariable("SERVER_PORT")]
        [HelpText("Server port number")]
        public int Port { get; set; }

        [FlagOption("d", "debug")]
        [EnvironmentVariable("DEBUG")]
        [HelpText("Enable debug mode")]
        public bool Debug { get; set; }

        [RequiredOption("database-url", Required = true)]
        [EnvironmentVariable("DATABASE_URL")]
        [HelpText("Database connection string")]
        public string DatabaseUrl { get; set; }

        [Option("timeout", DefaultValue = 30.0)]
        [EnvironmentVariable("REQUEST_TIMEOUT")]
        [HelpText("Request timeout in seconds")]
        public double Timeout { get; set; }
    }

    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                var builder = new OptionsBuilder<ServerConfig>(args);
                var config = builder.Build();

                Console.WriteLine("Server configuration:");
                Console.WriteLine($"  Host: {config.Host}");
                Console.WriteLine($"  Port: {config.Port}");
                Console.WriteLine($"  Debug: {config.Debug}");
                Console.WriteLine($"  Database: {config.DatabaseUrl}");
                Console.WriteLine($"  Timeout: {config.Timeout}s");

                // Start the server
                StartServer(config);
            }
            catch (ArgumentException ex)
            {
                Console.WriteLine($"Configuration error: {ex.Message}");
                ShowHelp();
                Environment.Exit(1);
            }
        }

        static void StartServer(ServerConfig config)
        {
            // Server startup logic
            Console.WriteLine($"Server starting at {config.Host}:{config.Port}");
        }

        static void ShowHelp()
        {
            Console.WriteLine("Usage:");
            Console.WriteLine("  myapp.exe --host <host> --port <port> --database-url <database-url> [options]");
            Console.WriteLine();
            Console.WriteLine("Options:");
            Console.WriteLine("  -h, --host <host>           Server host address (default: localhost)");
            Console.WriteLine("  -p, --port <port>           Server port number (default: 8080)");
            Console.WriteLine("  -d, --debug                 Enable debug mode");
            Console.WriteLine("      --database-url <url>    Database connection string (required)");
            Console.WriteLine("      --timeout <seconds>     Request timeout (default: 30.0)");
        }
    }
}
```
