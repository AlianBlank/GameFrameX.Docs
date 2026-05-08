# 日誌（基於 Serilog 的高效能日誌記錄庫）

一個基於 Serilog 的高效能日誌記錄庫，為 GameFrameX 框架提供統一的日誌記錄介面和豐富的日誌輸出功能。

## 特性

- **多級別日誌支援** - 支援 Verbose、Debug、Info、Warn、Error、Fatal 六個日誌級別
- **多輸出目標** - 支援檔案、主控台、Grafana Loki 等多種輸出方式
- **彈性設定** - 透過 LogOptions 類別提供豐富的設定選項
- **檔案滾動** - 支援按時間間隔和檔案大小進行日誌檔案滾動
- **標籤支援** - 支援為日誌新增標籤，便於分類和篩選
- **例外記錄** - 專門的例外記錄方法，包含完整的堆疊追蹤資訊
- **主控台輸出** - 支援同時輸出到日誌檔案和主控台
- **高效能** - 基於 Serilog 建構，提供高效能的日誌記錄能力

## 安裝

```bash
dotnet add package GameFrameX.Foundation.Logger
```

## 快速開始

### 1. 基本使用

```csharp
using GameFrameX.Foundation.Logger;

// 使用預設設定初始化日誌系統
var logger = LogHandler.Create(LogOptions.Default);

// 記錄不同級別的日誌
LogHelper.Info("應用程式啟動");
LogHelper.Warn("這是一個警告訊息");
LogHelper.Error("發生了一個錯誤");
```

### 2. 自訂設定

```csharp
using GameFrameX.Foundation.Logger;

// 建立自訂日誌設定
var logOptions = new LogOptions("mylogs")
{
    LogType = "WebApi",
    LogTagName = "Production",
    LogEventLevel = LogEventLevel.Information,
    IsConsole = true,
    RollingInterval = RollingInterval.Hour,
    FileSizeLimitBytes = 50 * 1024 * 1024, // 50MB
    RetainedFileCountLimit = 7 // 保留 7 個檔案
};

// 初始化日誌系統
var logger = LogHandler.Create(logOptions);

// 使用日誌
LogHelper.Info("伺服器", "伺服器啟動在連接埠 {Port}", 8080);
LogHelper.InfoConsole("同時輸出到檔案和主控台的訊息");
```

## 詳細用法

### 日誌級別

支援六個標準的日誌級別：

```csharp
// Verbose - 最詳細的日誌資訊
LogHelper.Verbose("詳細的偵錯資訊");

// Debug - 偵錯資訊
LogHelper.Debug("偵錯資訊: 變數值 = {Value}", someValue);

// Information - 一般資訊
LogHelper.Info("使用者 {UserId} 登入成功", userId);

// Warning - 警告資訊
LogHelper.Warn("磁碟空間不足，剩餘: {FreeSpace}MB", freeSpace);

// Error - 錯誤資訊
LogHelper.Error("資料庫連線失敗: {Error}", errorMessage);

// Fatal - 嚴重錯誤
LogHelper.Fatal("應用程式即將當機: {Reason}", reason);
```

### 例外記錄

專門的例外記錄方法，自動包含堆疊追蹤：

```csharp
try
{
    // 可能擲回例外的程式碼
    DoSomething();
}
catch (Exception ex)
{
    // 記錄例外
    LogHelper.Error(ex);
    
    // 帶標籤的例外記錄
    LogHelper.Error("資料庫", ex);
    
    // 自訂例外訊息
    LogHelper.Error("處理使用者請求時發生錯誤: {Message}", ex.Message);
}
```

### 標籤支援

為日誌新增標籤，便於分類和篩選：

```csharp
// 帶標籤的日誌記錄
LogHelper.Info("使用者管理", "使用者 {UserId} 建立成功", userId);
LogHelper.Warn("安全", "偵測到可疑登入嘗試，IP: {IP}", ipAddress);
LogHelper.Error("支付", "支付處理失敗，訂單號: {OrderId}", orderId);

// 帶標籤的主控台輸出
LogHelper.InfoConsole("啟動", "伺服器啟動完成，監聽連接埠: {Port}", port);
```

### 主控台輸出

支援同時輸出到日誌檔案和主控台：

```csharp
// 僅輸出到日誌檔案
LogHelper.Info("這條訊息只會寫入日誌檔案");

// 同時輸出到日誌檔案和主控台
LogHelper.InfoConsole("這條訊息會同時顯示在主控台和日誌檔案中");

// 錯誤訊息的主控台輸出（紅色顯示）
LogHelper.ErrorConsole("這是一個錯誤訊息，主控台中會以紅色顯示");

// 僅輸出到主控台（不寫入日誌檔案）
LogHelper.Console("這條訊息只會顯示在主控台");
```

## 設定

### LogOptions 設定類別

```csharp
var logOptions = new LogOptions("logs") // 日誌目錄名稱
{
    // 基本設定
    LogType = "WebServer",              // 伺服器型別識別
    LogTagName = "Production",          // 日誌標籤名稱
    LogEventLevel = LogEventLevel.Info, // 最低日誌級別
    
    // 輸出設定
    IsConsole = true,                   // 是否輸出到主控台
    
    // 檔案設定
    RollingInterval = RollingInterval.Day,    // 滾動間隔（天）
    IsFileSizeLimit = true,                   // 是否限制檔案大小
    FileSizeLimitBytes = 100 * 1024 * 1024,   // 檔案大小限制（100MB）
    RetainedFileCountLimit = 31,              // 保留檔案數量（31 個）
    
    // Grafana Loki 設定
    IsGrafanaLoki = false,                    // 是否啟用 Loki
    GrafanaLokiUrl = "http://localhost:3100", // Loki 服務位址
    GrafanaLokiLabels = new Dictionary<string, string>
    {
        ["app"] = "myapp",
        ["env"] = "production"
    },
    GrafanaLokiUsername = "admin",            // Loki 使用者名稱
    GrafanaLokiPassword = "password"          // Loki 密碼
};
```

### 滾動間隔選項

```csharp
// 支援的滾動間隔
RollingInterval.Infinite    // 不滾動
RollingInterval.Year        // 按年滾動
RollingInterval.Month       // 按月滾動
RollingInterval.Day         // 按天滾動（預設）
RollingInterval.Hour        // 按小時滾動
RollingInterval.Minute      // 按分鐘滾動
```

### 日誌級別設定

```csharp
// 支援的日誌級別
LogEventLevel.Verbose       // 最詳細
LogEventLevel.Debug         // 偵錯（預設）
LogEventLevel.Information   // 資訊
LogEventLevel.Warning       // 警告
LogEventLevel.Error         // 錯誤
LogEventLevel.Fatal         // 嚴重錯誤
```

## 進階用法

### Grafana Loki 整合

支援將日誌發送到 Grafana Loki 進行集中化日誌管理：

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

### 自訂日誌設定

支援透過回呼函式進行更進階的自訂設定：

```csharp
var logger = LogHandler.Create(logOptions, true, config =>
{
    // 新增自訂的 Sink
    config.WriteTo.Email(
        fromEmail: "noreply@example.com",
        toEmail: "admin@example.com",
        outputTemplate: "{Timestamp} [{Level}] {Message}{NewLine}{Exception}",
        restrictedToMinimumLevel: LogEventLevel.Error
    );
    
    // 新增自訂的 Enricher
    config.Enrich.WithProperty("MachineName", Environment.MachineName);
    config.Enrich.WithProperty("ProcessId", Environment.ProcessId);
});
```

### 使用自訂 Logger 實例

```csharp
// 建立多個 Logger 實例
var webLogger = LogHandler.Create(webLogOptions, false);
var dbLogger = LogHandler.Create(dbLogOptions, false);

// 使用特定的 Logger 實例
LogHelper.Info(webLogger, "Web 請求處理完成");
LogHelper.Error(dbLogger, "資料庫連線例外", exception);
```

### 效能最佳化

#### 非同步日誌清除

```csharp
// 同步清除（阻塞）
LogHelper.FlushAndSave();

// 非同步清除（非阻塞）
LogHelper.CloseAndFlushAsync();
```

#### 條件日誌記錄

```csharp
// 避免不必要的字串格式化
if (logger.IsEnabled(LogEventLevel.Debug))
{
    LogHelper.Debug("複雜的偵錯資訊: {Data}", ExpensiveOperation());
}
```

## 最佳實踐

### 結構化日誌

使用結構化的日誌訊息，便於後續分析：

```csharp
// 好的做法 - 結構化日誌
LogHelper.Info("使用者登入成功，使用者 ID: {UserId}, IP: {IP}, 耗時: {Duration}ms", 
    userId, ipAddress, duration);

// 避免的做法 - 字串拼接
LogHelper.Info($"使用者登入成功，使用者 ID: {userId}, IP: {ipAddress}, 耗時: {duration}ms");
```

### 合理使用日誌級別

```csharp
// Debug - 開發偵錯資訊
LogHelper.Debug("進入方法 ProcessOrder，參數: {OrderId}", orderId);

// Info - 重要的業務事件
LogHelper.Info("訂單建立成功，訂單號: {OrderId}, 使用者: {UserId}", orderId, userId);

// Warn - 可恢復的問題
LogHelper.Warn("重試連線資料庫，第 {Attempt} 次嘗試", attemptCount);

// Error - 需要關注的錯誤
LogHelper.Error("處理支付失敗，訂單: {OrderId}, 錯誤: {Error}", orderId, error);

// Fatal - 導致應用程式終止的嚴重錯誤
LogHelper.Fatal("資料庫連線集區耗盡，應用程式即將關閉");
```

### 使用標籤分類

```csharp
// 按功能模組分類
LogHelper.Info("使用者管理", "使用者註冊成功: {Email}", email);
LogHelper.Info("訂單處理", "訂單狀態更新: {OrderId} -> {Status}", orderId, status);
LogHelper.Info("支付系統", "支付完成: {Amount} 元", amount);

// 按環境分類
LogHelper.Info("正式環境", "伺服器啟動完成");
LogHelper.Debug("開發環境", "偵錯資訊: {Data}", debugData);
```

### 例外處理

```csharp
try
{
    await ProcessOrderAsync(orderId);
    LogHelper.Info("訂單處理", "訂單 {OrderId} 處理完成", orderId);
}
catch (BusinessException ex)
{
    // 業務例外，記錄為警告
    LogHelper.Warn("訂單處理", "業務規則驗證失敗: {Message}", ex.Message);
    throw;
}
catch (Exception ex)
{
    // 系統例外，記錄為錯誤
    LogHelper.Error("訂單處理", ex);
    throw;
}
```

### 設定管理

```csharp
// 開發環境設定
var devLogOptions = new LogOptions("logs")
{
    LogEventLevel = LogEventLevel.Debug,
    IsConsole = true,
    RollingInterval = RollingInterval.Hour
};

// 正式環境設定
var prodLogOptions = new LogOptions("logs")
{
    LogEventLevel = LogEventLevel.Information,
    IsConsole = false,
    RollingInterval = RollingInterval.Day,
    IsGrafanaLoki = true,
    GrafanaLokiUrl = "http://loki.prod.com:3100"
};

// 根據環境選擇設定
var logOptions = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development" 
    ? devLogOptions 
    : prodLogOptions;
```

## API 參考

### LogHandler

| 方法 | 說明 |
|------|------|
| `LogHandler.Create(LogOptions)` | 使用指定設定建立 Logger 實例 |
| `LogHandler.Create(LogOptions, bool)` | 建立 Logger 實例，第二個參數控制是否設為全域預設 |
| `LogHandler.Create(LogOptions, bool, ``Action<LoggerConfiguration>``)` | 建立 Logger 實例並透過回呼自訂 Serilog 設定 |

### LogHelper 日誌記錄方法

| 方法 | 說明 |
|------|------|
| `LogHelper.Verbose(message)` | 記錄 Verbose 級別日誌 |
| `LogHelper.Debug(message)` | 記錄 Debug 級別日誌 |
| `LogHelper.Info(message)` | 記錄 Information 級別日誌 |
| `LogHelper.Warn(message)` | 記錄 Warning 級別日誌 |
| `LogHelper.Error(message)` | 記錄 Error 級別日誌 |
| `LogHelper.Fatal(message)` | 記錄 Fatal 級別日誌 |
| `LogHelper.Info(tag, message, args)` | 帶標籤的 Info 日誌 |
| `LogHelper.Warn(tag, message, args)` | 帶標籤的 Warn 日誌 |
| `LogHelper.Error(tag, message, args)` | 帶標籤的 Error 日誌 |
| `LogHelper.Error(Exception)` | 記錄例外（含堆疊追蹤） |
| `LogHelper.Error(tag, Exception)` | 帶標籤的例外記錄 |
| `LogHelper.InfoConsole(message)` | 同時輸出到主控台的 Info 日誌 |
| `LogHelper.ErrorConsole(message)` | 同時輸出到主控台的 Error 日誌（紅色） |
| `LogHelper.Console(message)` | 僅輸出到主控台 |
| `LogHelper.FlushAndSave()` | 同步清除並儲存日誌 |
| `LogHelper.CloseAndFlushAsync()` | 非同步關閉並清除日誌 |

### LogOptions 主要屬性

| 屬性 | 型別 | 說明 |
|------|------|------|
| `LogSavePath` | `string` | 日誌目錄路徑 |
| `LogType` | `string` | 伺服器型別識別 |
| `LogTagName` | `string` | 日誌標籤名稱 |
| `LogEventLevel` | `LogEventLevel` | 最低日誌級別 |
| `IsConsole` | `bool` | 是否輸出到主控台 |
| `RollingInterval` | `RollingInterval` | 檔案滾動間隔 |
| `FileSizeLimitBytes` | `long` | 單一日誌檔案大小限制 |
| `RetainedFileCountLimit` | `int` | 保留的日誌檔案數量 |
| `IsGrafanaLoki` | `bool` | 是否啟用 Grafana Loki |
| `GrafanaLokiUrl` | `string` | Loki 服務位址 |
| `GrafanaLokiLabels` | ``Dictionary<string, string>`` | Loki 標籤 |
| `GrafanaLokiUsername` | `string` | Loki 認證使用者名稱 |
| `GrafanaLokiPassword` | `string` | Loki 認證密碼 |

### 相依套件

- **Serilog.AspNetCore** (9.0.0) - 核心日誌框架
- **Serilog.Sinks.Console** (6.0.0) - 主控台輸出
- **Serilog.Sinks.File** (7.0.0) - 檔案輸出
- **Serilog.Sinks.Grafana.Loki** (8.3.1) - Grafana Loki 整合
- **GameFrameX.Foundation.Json** - JSON 序列化支援
