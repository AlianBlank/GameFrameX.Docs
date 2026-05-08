# Utility Library

A general-purpose utility library providing console operations, environment management, time handling, and Snowflake ID generation.

## Features

- **Enhanced Console Output**: Supports multi-level colored text output (Info, Success, Warning, Error)
- **Environment Management**: Convenient runtime environment detection and environment variable configuration retrieval
- **Time Handling**: Unix timestamp conversion, timezone support, date boundary calculation, elapsed time tracking
- **Snowflake ID Generation**: Distributed unique ID generator with high performance, trend-incrementing, and zero external dependencies

## Installation

```bash
dotnet add package GameFrameX.Foundation.Utility
```

## Quick Start

```csharp
using GameFrameX.Foundation.Utility;

// 生成 Snowflake ID
long id = SnowFlakeIdHelper.GenerateId();

// 获取当前 Unix 时间戳
long timestamp = TimerHelper.UnixTimeSeconds();

// 控制台输出
ConsoleHelper.WriteSuccess("操作成功！");
```

## Detailed Usage

### ConsoleHelper

Provides console-related helper functionality, such as displaying text in different colors in the console.

```csharp
ConsoleHelper.WriteLine("这是一条普通消息。");
ConsoleHelper.WriteInfo("这是一条信息消息。");
ConsoleHelper.WriteSuccess("操作成功！");
ConsoleHelper.WriteWarning("这是一个警告。");
ConsoleHelper.WriteError("发生了一个错误。");
```

### EnvironmentHelper

Provides helper functionality related to the application's runtime environment.

```csharp
// 判断当前是否为开发环境
if (EnvironmentHelper.IsDevelopment())
{
    // 执行仅在开发环境中运行的代码
}

// 获取当前环境名称
string environmentName = EnvironmentHelper.GetEnvironmentName();
```

### TimerHelper

Provides powerful time handling functionality, supporting custom timezones, Unix timestamp conversion, date boundary calculation, and more.

**Core Features:**

- **Timezone Support**: `CurrentTimeZone` gets or sets the current timezone (defaults to the system local timezone)
- **Timestamp Handling**: `UnixTimeSeconds()`, `UnixTimeMilliseconds()` get the current timestamp
- **Date Boundary Calculation**: Get start and end times for today/this week/this month/this year
- **Elapsed Time Calculation**: `GetElapsedSeconds()`, `GetTimeDifference()`
- **Testing Assistance**: `SetTimeOffset()` sets a time offset

```csharp
using GameFrameX.Foundation.Utility;

// Unix 时间戳常量
DateTime epochLocal = TimerHelper.EpochLocal;
DateTime epochUtc = TimerHelper.EpochUtc;

// 获取当前时间戳
long unixSeconds = TimerHelper.UnixTimeSeconds();
long unixMilliseconds = TimerHelper.UnixTimeMilliseconds();

// 设置时区（可选）
TimerHelper.SetTimeZone(TimeZoneInfo.FindSystemTimeZoneById("China Standard Time"));

// 日期边界计算
DateTime weekStart = TimerHelper.GetWeekStartTime();
DateTime weekEnd = TimerHelper.GetWeekEndTime();
DateTime monthStart = TimerHelper.GetMonthStartTime();

// 计算经过时间
long elapsed = TimerHelper.GetElapsedSeconds(timestamp);

// 判断是否为同一周
bool isSameWeek = TimerHelper.IsNowSameWeek(lastLoginTime);
```

### Snowflake ID Generator

A distributed unique ID generator based on the Snowflake algorithm.

```csharp
using GameFrameX.Foundation.Utility;

// 生成 ID
long id1 = SnowFlakeIdHelper.GenerateId();
long id2 = SnowFlakeIdHelper.GenerateId();

// 配置 Worker ID 和数据中心 ID
SnowFlakeIdHelper.WorkId = 1;        // Worker ID (0-31)
SnowFlakeIdHelper.DataCenterId = 1;  // 数据中心 ID (0-31)

long configuredId = SnowFlakeIdHelper.GenerateId();
```

#### Snowflake ID Algorithm Details

The Snowflake ID is an open-source distributed ID generation algorithm from Twitter with the following characteristics:

- **Globally Unique**: Ensures ID uniqueness in distributed environments
- **Trend-Incrementing**: Generated IDs are roughly time-incrementing, which benefits database indexing
- **High Performance**: A single machine can generate millions of IDs per second
- **Zero Dependencies**: Does not depend on a database or any other external system

ID Structure (64 bits):

```
0 - 0000000000 0000000000 0000000000 0000000000 0 - 00000 - 00000 - 000000000000
|   |                                             |   |       |       |
|   |<-------------- 41位时间戳 ----------------->|   |<-5位->|<-5位->|<--12位--->
|                                                 |           |       |
符号位(1位)                                        |      数据中心ID  序列号
                                                  |      (5位)      (12位)
                                               Worker ID
                                                (5位)
```

- **1-bit Sign**: Always 0
- **41-bit Timestamp**: Millisecond precision, approximately 69 years of usage
- **5-bit Data Center ID**: Supports 32 data centers
- **5-bit Worker ID**: Supports 32 worker nodes per data center
- **12-bit Sequence Number**: Supports 4096 IDs per millisecond

## Advanced Usage

```csharp
using GameFrameX.Foundation.Utility;

namespace MyApplication
{
    class Program
    {
        static void Main(string[] args)
        {
            // 打印应用 Logo
            ConsoleHelper.PrintLogo();

            // 检查运行环境
            string env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? Environments.Development;
            Console.WriteLine($"Current environment: {env}");

            // 配置 Snowflake ID 生成器
            SnowFlakeIdHelper.WorkId = 1;
            SnowFlakeIdHelper.DataCenterId = 1;

            // 生成唯一 ID
            for (int i = 0; i < 5; i++)
            {
                long id = SnowFlakeIdHelper.GenerateId();
                long timestamp = TimerHelper.UnixTimeMilliseconds();
                Console.WriteLine($"ID: {id}, Timestamp: {timestamp}");
                Thread.Sleep(1);
            }

            // 时间处理
            Console.WriteLine($"Unix epoch (UTC): {TimerHelper.EpochUtc}");
            Console.WriteLine($"Unix epoch (local): {TimerHelper.EpochLocal}");
            Console.WriteLine($"Current Unix timestamp (seconds): {TimerHelper.UnixTimeSeconds()}");
            Console.WriteLine($"Current Unix timestamp (ms): {TimerHelper.UnixTimeMilliseconds()}");
        }
    }
}
```

## Best Practices

1. **Timezone Configuration**: Set the timezone uniformly at application startup to avoid cross-timezone calculation inconsistencies (`TimerHelper.SetTimeZone()`)
2. **Snowflake ID Initialization**: Each service instance should use a different combination of Worker ID and DataCenter ID to ensure globally unique IDs
3. **Environment Detection**: Use `EnvironmentHelper.IsDevelopment()` instead of manually checking environment variables to maintain code consistency
4. **Console Output**: In production environments, it is recommended to only use `WriteError` and `WriteWarning` to avoid excessive log output

## API Reference

| Class | Method/Property | Description |
|-------|-----------------|-------------|
| `ConsoleHelper` | `WriteLine(string)` | Plain text output |
| `ConsoleHelper` | `WriteInfo(string)` | Info-level output |
| `ConsoleHelper` | `WriteSuccess(string)` | Success message output |
| `ConsoleHelper` | `WriteWarning(string)` | Warning message output |
| `ConsoleHelper` | `WriteError(string)` | Error message output |
| `ConsoleHelper` | `PrintLogo()` | Print application logo |
| `EnvironmentHelper` | `IsDevelopment()` | Check if running in development environment |
| `EnvironmentHelper` | `GetEnvironmentName()` | Get current environment name |
| `TimerHelper` | `UnixTimeSeconds()` | Get current Unix timestamp (seconds) |
| `TimerHelper` | `UnixTimeMilliseconds()` | Get current Unix timestamp (milliseconds) |
| `TimerHelper` | `SetTimeZone(TimeZoneInfo)` | Set timezone |
| `TimerHelper` | `GetWeekStartTime()` | Get start time of current week |
| `TimerHelper` | `GetWeekEndTime()` | Get end time of current week |
| `TimerHelper` | `GetMonthStartTime()` | Get start time of current month |
| `TimerHelper` | `GetElapsedSeconds(long)` | Calculate elapsed seconds |
| `TimerHelper` | `IsNowSameWeek(DateTime)` | Check if the given time is in the same week as now |
| `TimerHelper` | `EpochUtc` | Unix epoch time (UTC) |
| `TimerHelper` | `EpochLocal` | Unix epoch time (local) |
| `SnowFlakeIdHelper` | `GenerateId()` | Generate a Snowflake ID |
| `SnowFlakeIdHelper` | `WorkId` | Worker ID (0-31) |
| `SnowFlakeIdHelper` | `DataCenterId` | Data center ID (0-31) |

## License

MIT + Apache 2.0
