# 通用工具庫

通用實用工具庫，提供主控台操作、環境管理、時間處理和 Snowflake ID 產生等功能。

## 特性

- **主控台增強輸出**：支援多級別彩色文字輸出（Info、Success、Warning、Error）
- **環境管理**：便捷判斷執行環境，取得環境變數設定
- **時間處理**：Unix 時間戳轉換、時區支援、日期邊界計算、時間差統計
- **Snowflake ID 產生**：分散式唯一 ID 產生器，高效能、趨勢遞增、無外部依賴

## 安裝

```bash
dotnet add package GameFrameX.Foundation.Utility
```

## 快速開始

```csharp
using GameFrameX.Foundation.Utility;

// 產生 Snowflake ID
long id = SnowFlakeIdHelper.GenerateId();

// 取得目前 Unix 時間戳
long timestamp = TimerHelper.UnixTimeSeconds();

// 主控台輸出
ConsoleHelper.WriteSuccess("操作成功！");
```

## 詳細用法

### ConsoleHelper

提供主控台相關的輔助功能，例如在主控台中顯示不同顏色的文字。

```csharp
ConsoleHelper.WriteLine("這是一條普通訊息。");
ConsoleHelper.WriteInfo("這是一條資訊訊息。");
ConsoleHelper.WriteSuccess("操作成功！");
ConsoleHelper.WriteWarning("這是一個警告。");
ConsoleHelper.WriteError("發生了一個錯誤。");
```

### EnvironmentHelper

提供與應用程式執行環境相關的輔助功能。

```csharp
// 判斷目前是否為開發環境
if (EnvironmentHelper.IsDevelopment())
{
    // 執行僅在開發環境中執行的程式碼
}

// 取得目前環境名稱
string environmentName = EnvironmentHelper.GetEnvironmentName();
```

### TimerHelper

提供強大的時間處理功能，支援自訂時區、Unix 時間戳轉換、日期邊界計算等。

**核心特性：**

- **時區支援**：`CurrentTimeZone` 取得或設定目前時區（預設為系統本地時區）
- **時間戳處理**：`UnixTimeSeconds()`、`UnixTimeMilliseconds()` 取得目前時間戳
- **日期邊界計算**：取得今日/本週/本月/本年的開始和結束時間
- **時間差計算**：`GetElapsedSeconds()`、`GetTimeDifference()`
- **測試輔助**：`SetTimeOffset()` 設定時間偏移量

```csharp
using GameFrameX.Foundation.Utility;

// Unix 時間戳常數
DateTime epochLocal = TimerHelper.EpochLocal;
DateTime epochUtc = TimerHelper.EpochUtc;

// 取得目前時間戳
long unixSeconds = TimerHelper.UnixTimeSeconds();
long unixMilliseconds = TimerHelper.UnixTimeMilliseconds();

// 設定時區（可選）
TimerHelper.SetTimeZone(TimeZoneInfo.FindSystemTimeZoneById("China Standard Time"));

// 日期邊界計算
DateTime weekStart = TimerHelper.GetWeekStartTime();
DateTime weekEnd = TimerHelper.GetWeekEndTime();
DateTime monthStart = TimerHelper.GetMonthStartTime();

// 計算經過時間
long elapsed = TimerHelper.GetElapsedSeconds(timestamp);

// 判斷是否為同一週
bool isSameWeek = TimerHelper.IsNowSameWeek(lastLoginTime);
```

### Snowflake ID 產生器

基於 Snowflake 演算法的分散式唯一 ID 產生器。

```csharp
using GameFrameX.Foundation.Utility;

// 產生 ID
long id1 = SnowFlakeIdHelper.GenerateId();
long id2 = SnowFlakeIdHelper.GenerateId();

// 設定 Worker ID 和資料中心 ID
SnowFlakeIdHelper.WorkId = 1;        // Worker ID (0-31)
SnowFlakeIdHelper.DataCenterId = 1;  // 資料中心 ID (0-31)

long configuredId = SnowFlakeIdHelper.GenerateId();
```

#### Snowflake ID 演算法詳情

Snowflake ID 是 Twitter 開源的分散式 ID 產生演算法，具有以下特點：

- **全域唯一**：確保分散式環境下 ID 唯一性
- **趨勢遞增**：產生的 ID 大致按時間遞增，有利於資料庫索引
- **高效能**：單機每秒可產生數百萬個 ID
- **無依賴**：不依賴資料庫或其他外部系統

ID 結構（64 位元）：

```
0 - 0000000000 0000000000 0000000000 0000000000 0 - 00000 - 00000 - 000000000000
|   |                                             |   |       |       |
|   |<-------------- 41 位元時間戳 ----------------->|   |<-5位元->|<-5位元->|<--12位元--->
|                                                 |           |       |
符號位(1位元)                                        |      資料中心ID  序列號
                                                  |      (5位元)      (12位元)
                                               Worker ID
                                                (5位元)
```

- **1 位元符號位**：始終為 0
- **41 位元時間戳**：毫秒精度，約 69 年使用期
- **5 位元資料中心 ID**：支援 32 個資料中心
- **5 位元 Worker ID**：每個資料中心支援 32 個工作節點
- **12 位元序列號**：每毫秒支援 4096 個 ID

## 進階用法

```csharp
using GameFrameX.Foundation.Utility;

namespace MyApplication
{
    class Program
    {
        static void Main(string[] args)
        {
            // 列印應用程式 Logo
            ConsoleHelper.PrintLogo();

            // 檢查執行環境
            string env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? Environments.Development;
            Console.WriteLine($"Current environment: {env}");

            // 設定 Snowflake ID 產生器
            SnowFlakeIdHelper.WorkId = 1;
            SnowFlakeIdHelper.DataCenterId = 1;

            // 產生唯一 ID
            for (int i = 0; i < 5; i++)
            {
                long id = SnowFlakeIdHelper.GenerateId();
                long timestamp = TimerHelper.UnixTimeMilliseconds();
                Console.WriteLine($"ID: {id}, Timestamp: {timestamp}");
                Thread.Sleep(1);
            }

            // 時間處理
            Console.WriteLine($"Unix epoch (UTC): {TimerHelper.EpochUtc}");
            Console.WriteLine($"Unix epoch (local): {TimerHelper.EpochLocal}");
            Console.WriteLine($"Current Unix timestamp (seconds): {TimerHelper.UnixTimeSeconds()}");
            Console.WriteLine($"Current Unix timestamp (ms): {TimerHelper.UnixTimeMilliseconds()}");
        }
    }
}
```

## 最佳實踐

1. **時區設定**：應用程式啟動時統一設定時區，避免跨時區計算不一致（`TimerHelper.SetTimeZone()`）
2. **Snowflake ID 初始化**：每個服務實例使用不同的 Worker ID 和 DataCenter ID 組合，確保 ID 全域唯一
3. **環境判斷**：使用 `EnvironmentHelper.IsDevelopment()` 而非手動檢查環境變數，保持程式碼一致性
4. **主控台輸出**：正式環境建議僅使用 `WriteError` 和 `WriteWarning`，避免過多日誌輸出

## API 參考

| 類別 | 方法/屬性 | 說明 |
|----|-----------|------|
| `ConsoleHelper` | `WriteLine(string)` | 普通文字輸出 |
| `ConsoleHelper` | `WriteInfo(string)` | 資訊級別輸出 |
| `ConsoleHelper` | `WriteSuccess(string)` | 成功訊息輸出 |
| `ConsoleHelper` | `WriteWarning(string)` | 警告訊息輸出 |
| `ConsoleHelper` | `WriteError(string)` | 錯誤訊息輸出 |
| `ConsoleHelper` | `PrintLogo()` | 列印應用程式 Logo |
| `EnvironmentHelper` | `IsDevelopment()` | 判斷是否為開發環境 |
| `EnvironmentHelper` | `GetEnvironmentName()` | 取得目前環境名稱 |
| `TimerHelper` | `UnixTimeSeconds()` | 取得目前 Unix 時間戳（秒） |
| `TimerHelper` | `UnixTimeMilliseconds()` | 取得目前 Unix 時間戳（毫秒） |
| `TimerHelper` | `SetTimeZone(TimeZoneInfo)` | 設定時區 |
| `TimerHelper` | `GetWeekStartTime()` | 取得本週開始時間 |
| `TimerHelper` | `GetWeekEndTime()` | 取得本週結束時間 |
| `TimerHelper` | `GetMonthStartTime()` | 取得本月開始時間 |
| `TimerHelper` | `GetElapsedSeconds(long)` | 計算經過秒數 |
| `TimerHelper` | `IsNowSameWeek(DateTime)` | 判斷是否與目前同一週 |
| `TimerHelper` | `EpochUtc` | Unix 紀元時間（UTC） |
| `TimerHelper` | `EpochLocal` | Unix 紀元時間（本地） |
| `SnowFlakeIdHelper` | `GenerateId()` | 產生 Snowflake ID |
| `SnowFlakeIdHelper` | `WorkId` | Worker ID（0-31） |
| `SnowFlakeIdHelper` | `DataCenterId` | 資料中心 ID（0-31） |

## 授權條款

MIT + Apache 2.0
