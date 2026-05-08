# Logger (High-Performance Logging Library Based on Serilog)

A high-performance logging library based on Serilog, providing a unified logging interface and rich logging output capabilities for the GameFrameX framework.

## Features

- **Multi-Level Log Support** - Supports six log levels: Verbose, Debug, Info, Warn, Error, Fatal
- **Multiple Output Targets** - Supports file, console, Grafana Loki, and other output methods
- **Flexible Configuration** - Rich configuration options through the LogOptions class
- **File Rolling** - Supports log file rolling by time interval and file size
- **Tag Support** - Supports adding tags to logs for easy categorization and filtering
- **Exception Logging** - Dedicated exception logging methods with full stack trace information
- **Console Output** - Supports simultaneous output to log files and console
- **High Performance** - Built on Serilog, providing high-performance logging capabilities

## Installation

```bash
dotnet add package GameFrameX.Foundation.Logger
```

## Quick Start

### 1. Basic Usage

```csharp
using GameFrameX.Foundation.Logger;

// Initialize the logging system with default configuration
var logger = LogHandler.Create(LogOptions.Default);

// Log at different levels
LogHelper.Info("应用程序启动");
LogHelper.Warn("这是一个警告消息");
LogHelper.Error("发生了一个错误");
```

### 2. Custom Configuration

```csharp
using GameFrameX.Foundation.Logger;

// Create custom log configuration
var logOptions = new LogOptions("mylogs")
{
    LogType = "WebApi",
    LogTagName = "Production",
    LogEventLevel = LogEventLevel.Information,
    IsConsole = true,
    RollingInterval = RollingInterval.Hour,
    FileSizeLimitBytes = 50 * 1024 * 1024, // 50MB
    RetainedFileCountLimit = 7 // Keep 7 files
};

// Initialize the logging system
var logger = LogHandler.Create(logOptions);

// Use logging
LogHelper.Info("服务器", "服务器启动在端口 {Port}", 8080);
LogHelper.InfoConsole("Message output to both file and console");
```

## Detailed Usage

### Log Levels

Six standard log levels are supported:

```csharp
// Verbose - Most detailed log information
LogHelper.Verbose("详细的调试信息");

// Debug - Debug information
LogHelper.Debug("调试信息: 变量值 = {Value}", someValue);

// Information - General information
LogHelper.Info("用户 {UserId} 登录成功", userId);

// Warning - Warning information
LogHelper.Warn("磁盘空间不足，剩余: {FreeSpace}MB", freeSpace);

// Error - Error information
LogHelper.Error("数据库连接失败: {Error}", errorMessage);

// Fatal - Fatal error
LogHelper.Fatal("应用程序即将崩溃: {Reason}", reason);
```

### Exception Logging

Dedicated exception logging methods that automatically include stack traces:

```csharp
try
{
    // Code that may throw an exception
    DoSomething();
}
catch (Exception ex)
{
    // Log the exception
    LogHelper.Error(ex);
    
    // Exception logging with tag
    LogHelper.Error("数据库", ex);
    
    // Custom exception message
    LogHelper.Error("处理用户请求时发生错误: {Message}", ex.Message);
}
```

### Tag Support

Add tags to logs for easy categorization and filtering:

```csharp
// Tagged log entries
LogHelper.Info("用户管理", "用户 {UserId} 创建成功", userId);
LogHelper.Warn("安全", "检测到可疑登录尝试，IP: {IP}", ipAddress);
LogHelper.Error("支付", "支付处理失败，订单号: {OrderId}", orderId);

// Tagged console output
LogHelper.InfoConsole("启动", "服务器启动完成，监听端口: {Port}", port);
```

### Console Output

Supports simultaneous output to log files and console:

```csharp
// Output to log file only
LogHelper.Info("这条消息只会写入日志文件");

// Output to both log file and console
LogHelper.InfoConsole("这条消息会同时显示在控制台和日志文件中");

// Error message console output (displayed in red)
LogHelper.ErrorConsole("这是一个错误消息，控制台中会以红色显示");

// Output to console only (not written to log file)
LogHelper.Console("这条消息只会显示在控制台");
```

## Configuration

### LogOptions Configuration Class

```csharp
var logOptions = new LogOptions("logs") // Log directory name
{
    // Basic configuration
    LogType = "WebServer",              // Server type identifier
    LogTagName = "Production",          // Log tag name
    LogEventLevel = LogEventLevel.Info, // Minimum log level
    
    // Output configuration
    IsConsole = true,                   // Whether to output to console
    
    // File configuration
    RollingInterval = RollingInterval.Day,    // Rolling interval (day)
    IsFileSizeLimit = true,                   // Whether to limit file size
    FileSizeLimitBytes = 100 * 1024 * 1024,   // File size limit (100MB)
    RetainedFileCountLimit = 31,              // Number of retained files (31)
    
    // Grafana Loki configuration
    IsGrafanaLoki = false,                    // Whether to enable Loki
    GrafanaLokiUrl = "http://localhost:3100", // Loki service address
    GrafanaLokiLabels = new Dictionary<string, string>
    {
        ["app"] = "myapp",
        ["env"] = "production"
    },
    GrafanaLokiUsername = "admin",            // Loki username
    GrafanaLokiPassword = "password"          // Loki password
};
```

### Rolling Interval Options

```csharp
// Supported rolling intervals
RollingInterval.Infinite    // No rolling
RollingInterval.Year        // Roll by year
RollingInterval.Month       // Roll by month
RollingInterval.Day         // Roll by day (default)
RollingInterval.Hour        // Roll by hour
RollingInterval.Minute      // Roll by minute
```

### Log Level Configuration

```csharp
// Supported log levels
LogEventLevel.Verbose       // Most detailed
LogEventLevel.Debug         // Debug (default)
LogEventLevel.Information   // Information
LogEventLevel.Warning       // Warning
LogEventLevel.Error         // Error
LogEventLevel.Fatal         // Fatal error
```

## Advanced Usage

### Grafana Loki Integration

Supports sending logs to Grafana Loki for centralized log management:

```csharp
var logOptions = new LogOptions()
{
    IsGrafanaLoki = true,
    GrafanaLokiUrl = "http://loki.example.com:3100",
    GrafanaLokiLabels = new Dictionary<string, string>
    {
        ["service"] = "user-service",
        ["environment"] = "production",
        ["version"] = "1.0.0"
    },
    GrafanaLokiUsername = "your-username",
    GrafanaLokiPassword = "your-password"
};

var logger = LogHandler.Create(logOptions);
```

### Custom Log Configuration

Supports more advanced custom configuration through callback functions:

```csharp
var logger = LogHandler.Create(logOptions, true, config =>
{
    // Add custom Sink
    config.WriteTo.Email(
        fromEmail: "noreply@example.com",
        toEmail: "admin@example.com",
        outputTemplate: "{Timestamp} [{Level}] {Message}{NewLine}{Exception}",
        restrictedToMinimumLevel: LogEventLevel.Error
    );
    
    // Add custom Enricher
    config.Enrich.WithProperty("MachineName", Environment.MachineName);
    config.Enrich.WithProperty("ProcessId", Environment.ProcessId);
});
```

### Using Custom Logger Instances

```csharp
// Create multiple Logger instances
var webLogger = LogHandler.Create(webLogOptions, false);
var dbLogger = LogHandler.Create(dbLogOptions, false);

// Use a specific Logger instance
LogHelper.Info(webLogger, "Web请求处理完成");
LogHelper.Error(dbLogger, "数据库连接异常", exception);
```

### Performance Optimization

#### Async Log Flushing

```csharp
// Synchronous flush (blocking)
LogHelper.FlushAndSave();

// Async flush (non-blocking)
LogHelper.CloseAndFlushAsync();
```

#### Conditional Logging

```csharp
// Avoid unnecessary string formatting
if (logger.IsEnabled(LogEventLevel.Debug))
{
    LogHelper.Debug("复杂的调试信息: {Data}", ExpensiveOperation());
}
```

## Best Practices

### Structured Logging

Use structured log messages for easier analysis later:

```csharp
// Good practice - structured logging
LogHelper.Info("用户登录成功，用户ID: {UserId}, IP: {IP}, 耗时: {Duration}ms", 
    userId, ipAddress, duration);

// Bad practice - string concatenation
LogHelper.Info($"用户登录成功，用户ID: {userId}, IP: {ipAddress}, 耗时: {duration}ms");
```

### Using Log Levels Appropriately

```csharp
// Debug - Development debugging information
LogHelper.Debug("进入方法 ProcessOrder，参数: {OrderId}", orderId);

// Info - Important business events
LogHelper.Info("订单创建成功，订单号: {OrderId}, 用户: {UserId}", orderId, userId);

// Warn - Recoverable issues
LogHelper.Warn("重试连接数据库，第 {Attempt} 次尝试", attemptCount);

// Error - Errors requiring attention
LogHelper.Error("处理支付失败，订单: {OrderId}, 错误: {Error}", orderId, error);

// Fatal - Severe errors causing application termination
LogHelper.Fatal("数据库连接池耗尽，应用程序即将关闭");
```

### Using Tags for Categorization

```csharp
// Categorize by functional module
LogHelper.Info("用户管理", "用户注册成功: {Email}", email);
LogHelper.Info("订单处理", "订单状态更新: {OrderId} -> {Status}", orderId, status);
LogHelper.Info("支付系统", "支付完成: {Amount} 元", amount);

// Categorize by environment
LogHelper.Info("生产环境", "服务器启动完成");
LogHelper.Debug("开发环境", "调试信息: {Data}", debugData);
```

### Exception Handling

```csharp
try
{
    await ProcessOrderAsync(orderId);
    LogHelper.Info("订单处理", "订单 {OrderId} 处理完成", orderId);
}
catch (BusinessException ex)
{
    // Business exception, log as warning
    LogHelper.Warn("订单处理", "业务规则验证失败: {Message}", ex.Message);
    throw;
}
catch (Exception ex)
{
    // System exception, log as error
    LogHelper.Error("订单处理", ex);
    throw;
}
```

### Configuration Management

```csharp
// Development environment configuration
var devLogOptions = new LogOptions("logs")
{
    LogEventLevel = LogEventLevel.Debug,
    IsConsole = true,
    RollingInterval = RollingInterval.Hour
};

// Production environment configuration
var prodLogOptions = new LogOptions("logs")
{
    LogEventLevel = LogEventLevel.Information,
    IsConsole = false,
    RollingInterval = RollingInterval.Day,
    IsGrafanaLoki = true,
    GrafanaLokiUrl = "http://loki.prod.com:3100"
};

// Select configuration based on environment
var logOptions = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development" 
    ? devLogOptions 
    : prodLogOptions;
```

## API Reference

### LogHandler

| Method | Description |
|------|------|
| `LogHandler.Create(LogOptions)` | Create a Logger instance with the specified configuration |
| `LogHandler.Create(LogOptions, bool)` | Create a Logger instance; the second parameter controls whether to set it as the global default |
| `LogHandler.Create(LogOptions, bool, ``Action<LoggerConfiguration>``)` | Create a Logger instance and customize Serilog configuration via callback |

### LogHelper Logging Methods

| Method | Description |
|------|------|
| `LogHelper.Verbose(message)` | Log at Verbose level |
| `LogHelper.Debug(message)` | Log at Debug level |
| `LogHelper.Info(message)` | Log at Information level |
| `LogHelper.Warn(message)` | Log at Warning level |
| `LogHelper.Error(message)` | Log at Error level |
| `LogHelper.Fatal(message)` | Log at Fatal level |
| `LogHelper.Info(tag, message, args)` | Tagged Info log |
| `LogHelper.Warn(tag, message, args)` | Tagged Warn log |
| `LogHelper.Error(tag, message, args)` | Tagged Error log |
| `LogHelper.Error(Exception)` | Log exception (with stack trace) |
| `LogHelper.Error(tag, Exception)` | Tagged exception logging |
| `LogHelper.InfoConsole(message)` | Info log with simultaneous console output |
| `LogHelper.ErrorConsole(message)` | Error log with simultaneous console output (red) |
| `LogHelper.Console(message)` | Console output only |
| `LogHelper.FlushAndSave()` | Synchronously flush and save logs |
| `LogHelper.CloseAndFlushAsync()` | Asynchronously close and flush logs |

### LogOptions Main Properties

| Property | Type | Description |
|------|------|------|
| `LogSavePath` | `string` | Log directory path |
| `LogType` | `string` | Server type identifier |
| `LogTagName` | `string` | Log tag name |
| `LogEventLevel` | `LogEventLevel` | Minimum log level |
| `IsConsole` | `bool` | Whether to output to console |
| `RollingInterval` | `RollingInterval` | File rolling interval |
| `FileSizeLimitBytes` | `long` | Single log file size limit |
| `RetainedFileCountLimit` | `int` | Number of log files to retain |
| `IsGrafanaLoki` | `bool` | Whether to enable Grafana Loki |
| `GrafanaLokiUrl` | `string` | Loki service address |
| `GrafanaLokiLabels` | ``Dictionary<string, string>`` | Loki labels |
| `GrafanaLokiUsername` | `string` | Loki authentication username |
| `GrafanaLokiPassword` | `string` | Loki authentication password |

### Dependencies

- **Serilog.AspNetCore** (9.0.0) - Core logging framework
- **Serilog.Sinks.Console** (6.0.0) - Console output
- **Serilog.Sinks.File** (7.0.0) - File output
- **Serilog.Sinks.Grafana.Loki** (8.3.1) - Grafana Loki integration
- **GameFrameX.Foundation.Json** - JSON serialization support
