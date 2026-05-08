# 通用工具库

通用实用工具库，提供控制台操作、环境管理、时间处理和 Snowflake ID 生成等功能。

## 特性

- **控制台增强输出**：支持多级别彩色文本输出（Info、Success、Warning、Error）
- **环境管理**：便捷判断运行环境，获取环境变量配置
- **时间处理**：Unix 时间戳转换、时区支持、日期边界计算、时间差统计
- **Snowflake ID 生成**：分布式唯一 ID 生成器，高性能、趋势递增、无外部依赖

## 安装

```bash
dotnet add package GameFrameX.Foundation.Utility
```

## 快速开始

```csharp
using GameFrameX.Foundation.Utility;

// 生成 Snowflake ID
long id = SnowFlakeIdHelper.GenerateId();

// 获取当前 Unix 时间戳
long timestamp = TimerHelper.UnixTimeSeconds();

// 控制台输出
ConsoleHelper.WriteSuccess("操作成功！");
```

## 详细用法

### ConsoleHelper

提供控制台相关的辅助功能，例如在控制台中显示不同颜色的文本。

```csharp
ConsoleHelper.WriteLine("这是一条普通消息。");
ConsoleHelper.WriteInfo("这是一条信息消息。");
ConsoleHelper.WriteSuccess("操作成功！");
ConsoleHelper.WriteWarning("这是一个警告。");
ConsoleHelper.WriteError("发生了一个错误。");
```

### EnvironmentHelper

提供与应用程序运行环境相关的辅助功能。

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

提供强大的时间处理功能，支持自定义时区、Unix 时间戳转换、日期边界计算等。

**核心特性：**

- **时区支持**：`CurrentTimeZone` 获取或设置当前时区（默认为系统本地时区）
- **时间戳处理**：`UnixTimeSeconds()`、`UnixTimeMilliseconds()` 获取当前时间戳
- **日期边界计算**：获取今日/本周/本月/本年的开始和结束时间
- **时间差计算**：`GetElapsedSeconds()`、`GetTimeDifference()`
- **测试辅助**：`SetTimeOffset()` 设置时间偏移量

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

### Snowflake ID 生成器

基于 Snowflake 算法的分布式唯一 ID 生成器。

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

#### Snowflake ID 算法详情

Snowflake ID 是 Twitter 开源的分布式 ID 生成算法，具有以下特点：

- **全局唯一**：确保分布式环境下 ID 唯一性
- **趋势递增**：生成的 ID 大致按时间递增，有利于数据库索引
- **高性能**：单机每秒可生成数百万个 ID
- **无依赖**：不依赖数据库或其他外部系统

ID 结构（64 位）：

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

- **1位符号位**：始终为 0
- **41位时间戳**：毫秒精度，约 69 年使用期
- **5位数据中心 ID**：支持 32 个数据中心
- **5位 Worker ID**：每个数据中心支持 32 个工作节点
- **12位序列号**：每毫秒支持 4096 个 ID

## 高级用法

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

## 最佳实践

1. **时区配置**：应用启动时统一设置时区，避免跨时区计算不一致（`TimerHelper.SetTimeZone()`）
2. **Snowflake ID 初始化**：每个服务实例使用不同的 Worker ID 和 DataCenter ID 组合，确保 ID 全局唯一
3. **环境判断**：使用 `EnvironmentHelper.IsDevelopment()` 而非手动检查环境变量，保持代码一致性
4. **控制台输出**：生产环境建议仅使用 `WriteError` 和 `WriteWarning`，避免过多日志输出

## API 参考

| 类 | 方法/属性 | 说明 |
|----|-----------|------|
| `ConsoleHelper` | `WriteLine(string)` | 普通文本输出 |
| `ConsoleHelper` | `WriteInfo(string)` | 信息级别输出 |
| `ConsoleHelper` | `WriteSuccess(string)` | 成功消息输出 |
| `ConsoleHelper` | `WriteWarning(string)` | 警告消息输出 |
| `ConsoleHelper` | `WriteError(string)` | 错误消息输出 |
| `ConsoleHelper` | `PrintLogo()` | 打印应用 Logo |
| `EnvironmentHelper` | `IsDevelopment()` | 判断是否为开发环境 |
| `EnvironmentHelper` | `GetEnvironmentName()` | 获取当前环境名称 |
| `TimerHelper` | `UnixTimeSeconds()` | 获取当前 Unix 时间戳（秒） |
| `TimerHelper` | `UnixTimeMilliseconds()` | 获取当前 Unix 时间戳（毫秒） |
| `TimerHelper` | `SetTimeZone(TimeZoneInfo)` | 设置时区 |
| `TimerHelper` | `GetWeekStartTime()` | 获取本周开始时间 |
| `TimerHelper` | `GetWeekEndTime()` | 获取本周结束时间 |
| `TimerHelper` | `GetMonthStartTime()` | 获取本月开始时间 |
| `TimerHelper` | `GetElapsedSeconds(long)` | 计算经过秒数 |
| `TimerHelper` | `IsNowSameWeek(DateTime)` | 判断是否与当前同一周 |
| `TimerHelper` | `EpochUtc` | Unix 纪元时间（UTC） |
| `TimerHelper` | `EpochLocal` | Unix 纪元时间（本地） |
| `SnowFlakeIdHelper` | `GenerateId()` | 生成 Snowflake ID |
| `SnowFlakeIdHelper` | `WorkId` | Worker ID（0-31） |
| `SnowFlakeIdHelper` | `DataCenterId` | 数据中心 ID（0-31） |

## 许可证

MIT + Apache 2.0
