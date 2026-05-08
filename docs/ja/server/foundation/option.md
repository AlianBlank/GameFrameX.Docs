# 起動パラメーターパーサー（コマンドライン引数と環境変数の自動マッピング）

コマンドライン引数と環境変数を強く型付けされた設定オブジェクトに自動マッピングする、強力なコマンドライン引数・環境変数解析ライブラリです。

## 特徴

- **パラメーター優先度処理**: コマンドライン引数 > 環境変数 > デフォルト値
- **ジェネリックサポート**: 任意の強く型付けされた設定クラスをサポート
- **複数起動方式互換**: Docker、exe、shellなどの起動方式をサポート
- **自動プレフィックス処理**: パラメーターに自動的に`--`プレフィックスを追加
- **ブールパラメーターサポート**: 複数のブールパラメーター形式をサポート
- **環境変数マッピング**: 環境変数を設定プロパティに自動マッピング
- **型変換**: 文字列パラメーターをターゲット型に自動変換
- **属性サポート**: 豊富な設定属性をサポート

## インストール

```bash
dotnet add package GameFrameX.Foundation.Options
```

## クイックスタート

### 1. 設定クラスの定義

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

### 2. OptionsBuilderの使用

```csharp
using GameFrameX.Foundation.Options;

class Program
{
    static void Main(string[] args)
    {
        // オプションビルダーの作成
        var builder = new OptionsBuilder<AppConfig>(args);
        
        // 設定オブジェクトの構築
        var config = builder.Build();
        
        // 設定の使用
        Console.WriteLine($"サーバー: {config.Host}:{config.Port}");
        Console.WriteLine($"デバッグモード: {config.Debug}");
        Console.WriteLine($"ログレベル: {config.LogLevel}");
        Console.WriteLine($"タイムアウト: {config.Timeout}秒");
    }
}
```

## 詳細な使い方

### コマンドライン引数

複数のパラメーター形式をサポートしています：

```bash
# キー・バリュー形式
myapp.exe --host=example.com --port=9090 --debug=true

# セパレータ形式
myapp.exe --host example.com --port 9090 --debug true

# ブールフラグ形式
myapp.exe --host example.com --port 9090 --debug

# 混合形式
myapp.exe --host=example.com --port 9090 --debug
```

### 環境変数

```bash
# 環境変数の設定
export HOST=example.com
export PORT=9090
export DEBUG=true

# プログラムの実行
myapp.exe
```

### Dockerサポート

```dockerfile
# Dockerfile
FROM mcr.microsoft.com/dotnet/runtime:8.0
COPY . /app
WORKDIR /app
ENTRYPOINT ["dotnet", "MyApp.dll"]
```

```bash
# Dockerでの実行
docker run myapp --host example.com --port 9090 --debug

# または環境変数を使用
docker run -e HOST=example.com -e PORT=9090 -e DEBUG=true myapp
```

## 高度な使い方

### 属性による設定

```csharp
using GameFrameX.Foundation.Options.Attributes;

public class AdvancedConfig
{
    [Option("h", "host", Required = false, DefaultValue = "localhost")]
    [HelpText("サーバーのホストアドレス")]
    public string Host { get; set; }

    [Option("p", "port", Required = true)]
    [HelpText("サーバーのポート番号")]
    public int Port { get; set; }

    [FlagOption("d", "debug")]
    [HelpText("デバッグモードを有効化")]
    public bool Debug { get; set; }

    [RequiredOption("api-key", Required = true)]
    [EnvironmentVariable("API_KEY")]
    [HelpText("APIキー")]
    public string ApiKey { get; set; }

    [DefaultValue(30.0)]
    public double Timeout { get; set; }
}
```

### ビルダーオプション

```csharp
var builder = new OptionsBuilder<AppConfig>(
    args: args,
    boolFormat: BoolArgumentFormat.Flag,        // ブールパラメーター形式
    ensurePrefixedKeys: true,                   // パラメーターにプレフィックスがあることを確認
    useEnvironmentVariables: true              // 環境変数を使用
);

var config = builder.Build(skipValidation: false); // 検証をスキップするかどうか
```

### パラメーター優先度

パラメーターは以下の優先度で適用されます（高優先度が低優先度を上書きします）：

1. **コマンドライン引数**（最高優先度）
2. **環境変数**
3. **デフォルト値**（最低優先度）

#### 例

```csharp
public class Config
{
    public string Host { get; set; } = "localhost";  // デフォルト値
    public int Port { get; set; } = 8080;           // デフォルト値
}
```

```bash
# 環境変数の設定
export HOST=env.example.com
export PORT=7070

# プログラムの実行（コマンドライン引数が環境変数を上書き）
myapp.exe --host cmd.example.com

# 結果：
# Host = "cmd.example.com"  （コマンドライン引数から）
# Port = 7070               （環境変数から）
```

### ブールパラメーター処理

複数のブールパラメーター形式をサポートしています：

```bash
# フラグ形式（推奨）
myapp.exe --debug                    # debug = true

# キー・バリュー形式
myapp.exe --debug=true               # debug = true
myapp.exe --debug=false              # debug = false

# セパレータ形式
myapp.exe --debug true               # debug = true
myapp.exe --debug false              # debug = false

# サポートされるブール値
true, false, 1, 0, yes, no, on, off
```

### 型変換

以下の型変換を自動的にサポートします：

- `string` - そのまま使用
- `int`, `int?` - 整数変換
- `bool`, `bool?` - ブール値変換
- `double`, `double?` - 倍精度浮動小数点数変換
- `float`, `float?` - 単精度浮動小数点数変換
- `decimal`, `decimal?` - 10進数変換
- `DateTime`, `DateTime?` - 日時変換
- `Guid`, `Guid?` - GUID変換
- `Enum` - 列挙型変換

#### 例

```csharp
public class TypedConfig
{
    public int Port { get; set; }
    public bool Debug { get; set; }
    public DateTime StartTime { get; set; }
    public LogLevel Level { get; set; }  // 列挙型
}

public enum LogLevel
{
    Debug, Info, Warning, Error
}
```

```bash
myapp.exe --port 9090 --debug true --start-time "2024-01-01 10:00:00" --level Info
```

### エラー処理

#### 必須パラメーターの検証

```csharp
public class Config
{
    [RequiredOption("api-key", Required = true)]
    public string ApiKey { get; set; }
}
```

必須パラメーターが不足している場合、`ArgumentException` がスローされます：

```
必須オプションが不足しています: api-key
```

#### 型変換エラー

パラメーター値をターゲット型に変換できない場合、デフォルト値が使用され、コンソールに警告メッセージが出力されます。

### デバッグモード

開発中にデバッグモードを有効にすると、パラメーター解析の詳細なプロセスを確認でき、設定問題の切り分けに役立ちます。

## ベストプラクティス

### 1. 設定クラスの設計

```csharp
public class AppConfig
{
    // 意味のあるデフォルト値を使用
    public string Host { get; set; } = "localhost";
    public int Port { get; set; } = 8080;
    
    // ブールプロパティのデフォルトはfalse
    public bool Debug { get; set; } = false;
    
    // 属性を使用して詳細情報を提供
    [RequiredOption("database-url", Required = true)]
    [EnvironmentVariable("DATABASE_URL")]
    public string DatabaseUrl { get; set; }
}
```

### 2. エラー処理

```csharp
try
{
    var builder = new OptionsBuilder<AppConfig>(args);
    var config = builder.Build();
    
    // 設定を使用してアプリケーションを起動
    StartApplication(config);
}
catch (ArgumentException ex)
{
    Console.WriteLine($"設定エラー: {ex.Message}");
    Environment.Exit(1);
}
```

### 3. Docker統合

```csharp
// Program.cs
public class Program
{
    public static void Main(string[] args)
    {
        var builder = new OptionsBuilder<AppConfig>(args);
        var config = builder.Build();
        
        // Dockerでは通常、環境変数を使用
        // 開発では通常、コマンドライン引数を使用
        
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

## API リファレンス

### `OptionsBuilder<T>`

| メソッド | 説明 |
|------|------|
| `OptionsBuilder<T>(args)` | ビルダーを作成し、コマンドライン引数を渡す |
| `Build()` | 設定オブジェクトを構築 |
| `Build(skipValidation)` | 設定オブジェクトを構築。検証スキップの選択可能 |

### 属性 (Attributes)

| 属性 | 説明 |
|------|------|
| `[Option(shortName, longName)]` | 設定オプションのマッピング |
| `[FlagOption(shortName, longName)]` | ブールフラグオプション |
| `[RequiredOption(longName)]` | 必須オプション |
| `[EnvironmentVariable(name)]` | 環境変数マッピング |
| `[DefaultValue(value)]` | デフォルト値 |
| `[HelpText(text)]` | ヘルプテキストの説明 |

### CommandLineArgumentConverter

`CommandLineArgumentConverter` は低レイヤーのコマンドライン引数変換機能を提供し、文字列パラメーターをターゲット型に変換します。通常は `OptionsBuilder` を通じて間接的に使用されるため、直接呼び出す必要はありません。

### 完全な例

```csharp
using GameFrameX.Foundation.Options;
using GameFrameX.Foundation.Options.Attributes;

namespace MyApp
{
    public class ServerConfig
    {
        [Option("h", "host", DefaultValue = "localhost")]
        [EnvironmentVariable("SERVER_HOST")]
        [HelpText("サーバーのホストアドレス")]
        public string Host { get; set; }

        [Option("p", "port", DefaultValue = 8080)]
        [EnvironmentVariable("SERVER_PORT")]
        [HelpText("サーバーのポート番号")]
        public int Port { get; set; }

        [FlagOption("d", "debug")]
        [EnvironmentVariable("DEBUG")]
        [HelpText("デバッグモードを有効化")]
        public bool Debug { get; set; }

        [RequiredOption("database-url", Required = true)]
        [EnvironmentVariable("DATABASE_URL")]
        [HelpText("データベース接続文字列")]
        public string DatabaseUrl { get; set; }

        [Option("timeout", DefaultValue = 30.0)]
        [EnvironmentVariable("REQUEST_TIMEOUT")]
        [HelpText("リクエストタイムアウト時間（秒）")]
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

                Console.WriteLine("サーバー設定:");
                Console.WriteLine($"  ホスト: {config.Host}");
                Console.WriteLine($"  ポート: {config.Port}");
                Console.WriteLine($"  デバッグ: {config.Debug}");
                Console.WriteLine($"  データベース: {config.DatabaseUrl}");
                Console.WriteLine($"  タイムアウト: {config.Timeout}秒");

                // サーバーの起動
                StartServer(config);
            }
            catch (ArgumentException ex)
            {
                Console.WriteLine($"設定エラー: {ex.Message}");
                ShowHelp();
                Environment.Exit(1);
            }
        }

        static void StartServer(ServerConfig config)
        {
            // サーバー起動ロジック
            Console.WriteLine($"サーバーを起動: {config.Host}:{config.Port}");
        }

        static void ShowHelp()
        {
            Console.WriteLine("使用方法:");
            Console.WriteLine("  myapp.exe --host <ホスト> --port <ポート> --database-url <データベースURL> [オプション]");
            Console.WriteLine();
            Console.WriteLine("オプション:");
            Console.WriteLine("  -h, --host <ホスト>           サーバーのホストアドレス (デフォルト: localhost)");
            Console.WriteLine("  -p, --port <ポート>           サーバーのポート番号 (デフォルト: 8080)");
            Console.WriteLine("  -d, --debug                 デバッグモードを有効化");
            Console.WriteLine("      --database-url <URL>    データベース接続文字列 (必須)");
            Console.WriteLine("      --timeout <秒>          リクエストタイムアウト時間 (デフォルト: 30.0)");
        }
    }
}
```
