# 啟動參數解析器（命令列參數與環境變數自動映射）

一個強大的命令列參數和環境變數解析庫，支援將命令列參數和環境變數自動映射到強型別設定物件。

## 特性

- **參數優先級處理**: 命令列參數 > 環境變數 > 預設值
- **泛型支援**: 支援任意強型別設定類別
- **多種啟動方式相容**: 支援 Docker、exe、shell 等啟動方式
- **自動前綴處理**: 自動為參數新增 `--` 前綴
- **布林參數支援**: 支援多種布林參數格式
- **環境變數映射**: 自動映射環境變數到設定屬性
- **型別轉換**: 自動轉換字串參數到目標型別
- **特性支援**: 支援豐富的設定特性

## 安裝

```bash
dotnet add package GameFrameX.Foundation.Options
```

## 快速開始

### 1. 定義設定類別

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

### 2. 使用 OptionsBuilder

```csharp
using GameFrameX.Foundation.Options;

class Program
{
    static void Main(string[] args)
    {
        // 建立選項建構器
        var builder = new OptionsBuilder<AppConfig>(args);
        
        // 建構設定物件
        var config = builder.Build();
        
        // 使用設定
        Console.WriteLine($"伺服器: {config.Host}:{config.Port}");
        Console.WriteLine($"偵錯模式: {config.Debug}");
        Console.WriteLine($"日誌級別: {config.LogLevel}");
        Console.WriteLine($"逾時時間: {config.Timeout} 秒");
    }
}
```

## 詳細用法

### 命令列參數

支援多種參數格式：

```bash
# 鍵值對格式
myapp.exe --host=example.com --port=9090 --debug=true

# 分離格式
myapp.exe --host example.com --port 9090 --debug true

# 布林旗標格式
myapp.exe --host example.com --port 9090 --debug

# 混合格式
myapp.exe --host=example.com --port 9090 --debug
```

### 環境變數

```bash
# 設定環境變數
export HOST=example.com
export PORT=9090
export DEBUG=true

# 執行程式
myapp.exe
```

### Docker 支援

```dockerfile
# Dockerfile
FROM mcr.microsoft.com/dotnet/runtime:8.0
COPY . /app
WORKDIR /app
ENTRYPOINT ["dotnet", "MyApp.dll"]
```

```bash
# Docker 執行
docker run myapp --host example.com --port 9090 --debug

# 或使用環境變數
docker run -e HOST=example.com -e PORT=9090 -e DEBUG=true myapp
```

## 進階用法

### 使用特性設定

```csharp
using GameFrameX.Foundation.Options.Attributes;

public class AdvancedConfig
{
    [Option("h", "host", Required = false, DefaultValue = "localhost")]
    [HelpText("伺服器主機位址")]
    public string Host { get; set; }

    [Option("p", "port", Required = true)]
    [HelpText("伺服器連接埠號")]
    public int Port { get; set; }

    [FlagOption("d", "debug")]
    [HelpText("啟用偵錯模式")]
    public bool Debug { get; set; }

    [RequiredOption("api-key", Required = true)]
    [EnvironmentVariable("API_KEY")]
    [HelpText("API 金鑰")]
    public string ApiKey { get; set; }

    [DefaultValue(30.0)]
    public double Timeout { get; set; }
}
```

### 建構器選項

```csharp
var builder = new OptionsBuilder<AppConfig>(
    args: args,
    boolFormat: BoolArgumentFormat.Flag,        // 布林參數格式
    ensurePrefixedKeys: true,                   // 確保參數有前綴
    useEnvironmentVariables: true              // 使用環境變數
);

var config = builder.Build(skipValidation: false); // 是否跳過驗證
```

### 參數優先級

參數按以下優先級套用（高優先級覆蓋低優先級）：

1. **命令列參數** (最高優先級)
2. **環境變數**
3. **預設值** (最低優先級)

#### 範例

```csharp
public class Config
{
    public string Host { get; set; } = "localhost";  // 預設值
    public int Port { get; set; } = 8080;           // 預設值
}
```

```bash
# 設定環境變數
export HOST=env.example.com
export PORT=7070

# 執行程式（命令列參數覆蓋環境變數）
myapp.exe --host cmd.example.com

# 結果：
# Host = "cmd.example.com"  (來自命令列參數)
# Port = 7070               (來自環境變數)
```

### 布林參數處理

支援多種布林參數格式：

```bash
# 旗標格式（建議）
myapp.exe --debug                    # debug = true

# 鍵值對格式
myapp.exe --debug=true               # debug = true
myapp.exe --debug=false              # debug = false

# 分離格式
myapp.exe --debug true               # debug = true
myapp.exe --debug false              # debug = false

# 支援的布林值
true, false, 1, 0, yes, no, on, off
```

### 型別轉換

自動支援以下型別轉換：

- `string` - 直接使用
- `int`, `int?` - 整數轉換
- `bool`, `bool?` - 布林值轉換
- `double`, `double?` - 雙精度浮點數轉換
- `float`, `float?` - 單精度浮點數轉換
- `decimal`, `decimal?` - 十進位數轉換
- `DateTime`, `DateTime?` - 日期時間轉換
- `Guid`, `Guid?` - GUID 轉換
- `Enum` - 列舉轉換

#### 範例

```csharp
public class TypedConfig
{
    public int Port { get; set; }
    public bool Debug { get; set; }
    public DateTime StartTime { get; set; }
    public LogLevel Level { get; set; }  // 列舉
}

public enum LogLevel
{
    Debug, Info, Warning, Error
}
```

```bash
myapp.exe --port 9090 --debug true --start-time "2024-01-01 10:00:00" --level Info
```

### 錯誤處理

#### 必要參數驗證

```csharp
public class Config
{
    [RequiredOption("api-key", Required = true)]
    public string ApiKey { get; set; }
}
```

如果缺少必要參數，會擲回 `ArgumentException`：

```
缺少必要的選項: api-key
```

#### 型別轉換錯誤

當參數值無法轉換為目標型別時，會使用預設值並在主控台輸出警告資訊。

### 偵錯模式

在開發過程中，可以透過啟用偵錯模式來檢視參數解析的詳細過程，便於排查設定問題。

## 最佳實踐

### 1. 設定類別設計

```csharp
public class AppConfig
{
    // 使用有意義的預設值
    public string Host { get; set; } = "localhost";
    public int Port { get; set; } = 8080;
    
    // 布林屬性預設為 false
    public bool Debug { get; set; } = false;
    
    // 使用特性提供更多資訊
    [RequiredOption("database-url", Required = true)]
    [EnvironmentVariable("DATABASE_URL")]
    public string DatabaseUrl { get; set; }
}
```

### 2. 錯誤處理

```csharp
try
{
    var builder = new OptionsBuilder<AppConfig>(args);
    var config = builder.Build();
    
    // 使用設定啟動應用
    StartApplication(config);
}
catch (ArgumentException ex)
{
    Console.WriteLine($"設定錯誤: {ex.Message}");
    Environment.Exit(1);
}
```

### 3. Docker 整合

```csharp
// Program.cs
public class Program
{
    public static void Main(string[] args)
    {
        var builder = new OptionsBuilder<AppConfig>(args);
        var config = builder.Build();
        
        // 在 Docker 中，通常使用環境變數
        // 在開發中，通常使用命令列參數
        
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

## API 參考

### `OptionsBuilder<T>`

| 方法 | 說明 |
|------|------|
| `OptionsBuilder<T>(args)` | 建立建構器，傳入命令列參數 |
| `Build()` | 建構設定物件 |
| `Build(skipValidation)` | 建構設定物件，可選跳過驗證 |

### 特性 (Attributes)

| 特性 | 說明 |
|------|------|
| `[Option(shortName, longName)]` | 設定選項映射 |
| `[FlagOption(shortName, longName)]` | 布林旗標選項 |
| `[RequiredOption(longName)]` | 必要選項 |
| `[EnvironmentVariable(name)]` | 環境變數映射 |
| `[DefaultValue(value)]` | 預設值 |
| `[HelpText(text)]` | 說明文字描述 |

### CommandLineArgumentConverter

`CommandLineArgumentConverter` 提供底層的命令列參數轉換功能，支援將字串參數轉換為目標型別。通常透過 `OptionsBuilder` 間接使用，無需直接呼叫。

### 完整範例

```csharp
using GameFrameX.Foundation.Options;
using GameFrameX.Foundation.Options.Attributes;

namespace MyApp
{
    public class ServerConfig
    {
        [Option("h", "host", DefaultValue = "localhost")]
        [EnvironmentVariable("SERVER_HOST")]
        [HelpText("伺服器主機位址")]
        public string Host { get; set; }

        [Option("p", "port", DefaultValue = 8080)]
        [EnvironmentVariable("SERVER_PORT")]
        [HelpText("伺服器連接埠號")]
        public int Port { get; set; }

        [FlagOption("d", "debug")]
        [EnvironmentVariable("DEBUG")]
        [HelpText("啟用偵錯模式")]
        public bool Debug { get; set; }

        [RequiredOption("database-url", Required = true)]
        [EnvironmentVariable("DATABASE_URL")]
        [HelpText("資料庫連線字串")]
        public string DatabaseUrl { get; set; }

        [Option("timeout", DefaultValue = 30.0)]
        [EnvironmentVariable("REQUEST_TIMEOUT")]
        [HelpText("請求逾時時間（秒）")]
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

                Console.WriteLine("伺服器設定:");
                Console.WriteLine($"  主機: {config.Host}");
                Console.WriteLine($"  連接埠: {config.Port}");
                Console.WriteLine($"  偵錯: {config.Debug}");
                Console.WriteLine($"  資料庫: {config.DatabaseUrl}");
                Console.WriteLine($"  逾時: {config.Timeout} 秒");

                // 啟動伺服器
                StartServer(config);
            }
            catch (ArgumentException ex)
            {
                Console.WriteLine($"設定錯誤: {ex.Message}");
                ShowHelp();
                Environment.Exit(1);
            }
        }

        static void StartServer(ServerConfig config)
        {
            // 伺服器啟動邏輯
            Console.WriteLine($"伺服器啟動在 {config.Host}:{config.Port}");
        }

        static void ShowHelp()
        {
            Console.WriteLine("用法:");
            Console.WriteLine("  myapp.exe --host <主機> --port <連接埠> --database-url <資料庫 URL> [選項]");
            Console.WriteLine();
            Console.WriteLine("選項:");
            Console.WriteLine("  -h, --host <主機>           伺服器主機位址 (預設: localhost)");
            Console.WriteLine("  -p, --port <連接埠>         伺服器連接埠號 (預設: 8080)");
            Console.WriteLine("  -d, --debug                 啟用偵錯模式");
            Console.WriteLine("      --database-url <URL>    資料庫連線字串 (必要)");
            Console.WriteLine("      --timeout <秒>          請求逾時時間 (預設: 30.0)");
        }
    }
}
```
