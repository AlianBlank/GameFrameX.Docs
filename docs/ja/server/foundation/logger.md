# ログ（Serilogベース高性能ログ記録ライブラリ）

Serilogベースの高性能ログ記録ライブラリで、GameFrameXフレームワークに統一されたログ記録インターフェースと豊富なログ出力機能を提供します。

## 特徴

- **複数ログレベル対応** - Verbose、Debug、Info、Warn、Error、Fatalの6つのログレベルをサポート
- **複数出力先** - ファイル、コンソール、Grafana Lokiなど複数の出力方式をサポート
- **柔軟な設定** - LogOptionsクラスによる豊富な設定オプションを提供
- **ファイルローテーション** - 時間間隔とファイルサイズによるログファイルローテーションをサポート
- **タグサポート** - ログにタグを追加し、分類とフィルタリングに活用
- **例外記録** - 完全なスタックトレース情報を含む専用の例外記録メソッド
- **コンソール出力** - ログファイルとコンソールへの同時出力をサポート
- **高性能** - Serilogベースで構築され、高性能なログ記録機能を提供

## インストール

```bash
dotnet add package GameFrameX.Foundation.Logger
```

## クイックスタート

### 1. 基本的な使用方法

```csharp
using GameFrameX.Foundation.Logger;

// デフォルト設定でログシステムを初期化
var logger = LogHandler.Create(LogOptions.Default);

// 異なるレベルのログを記録
LogHelper.Info("アプリケーション起動");
LogHelper.Warn("これは警告メッセージです");
LogHelper.Error("エラーが発生しました");
```

### 2. カスタム設定

```csharp
using GameFrameX.Foundation.Logger;

// カスタムログ設定の作成
var logOptions = new LogOptions("mylogs")
{
    LogType = "WebApi",
    LogTagName = "Production",
    LogEventLevel = LogEventLevel.Information,
    IsConsole = true,
    RollingInterval = RollingInterval.Hour,
    FileSizeLimitBytes = 50 * 1024 * 1024, // 50MB
    RetainedFileCountLimit = 7 // 7ファイルを保持
};

// ログシステムの初期化
var logger = LogHandler.Create(logOptions);

// ログの使用
LogHelper.Info("サーバー", "ポート {Port} でサーバー起動", 8080);
LogHelper.InfoConsole("ファイルとコンソールの両方に出力されるメッセージ");
```

## 詳細な使い方

### ログレベル

6つの標準ログレベルをサポートしています：

```csharp
// Verbose - 最も詳細なログ情報
LogHelper.Verbose("詳細なデバッグ情報");

// Debug - デバッグ情報
LogHelper.Debug("デバッグ情報: 変数値 = {Value}", someValue);

// Information - 一般情報
LogHelper.Info("ユーザー {UserId} がログインに成功", userId);

// Warning - 警告情報
LogHelper.Warn("ディスク容量不足、残り: {FreeSpace}MB", freeSpace);

// Error - エラー情報
LogHelper.Error("データベース接続失敗: {Error}", errorMessage);

// Fatal - 致命的エラー
LogHelper.Fatal("アプリケーションがクラッシュ直前: {Reason}", reason);
```

### 例外記録

専用の例外記録メソッドにより、スタックトレースが自動的に含まれます：

```csharp
try
{
    // 例外をスローする可能性のあるコード
    DoSomething();
}
catch (Exception ex)
{
    // 例外の記録
    LogHelper.Error(ex);
    
    // タグ付き例外記録
    LogHelper.Error("データベース", ex);
    
    // カスタム例外メッセージ
    LogHelper.Error("ユーザーリクエスト処理中にエラーが発生しました: {Message}", ex.Message);
}
```

### タグサポート

ログにタグを追加し、分類とフィルタリングに活用します：

```csharp
// タグ付きログ記録
LogHelper.Info("ユーザー管理", "ユーザー {UserId} の作成に成功", userId);
LogHelper.Warn("セキュリティ", "不審なログイン試行を検出、IP: {IP}", ipAddress);
LogHelper.Error("決済", "決済処理失敗、注文番号: {OrderId}", orderId);

// タグ付きコンソール出力
LogHelper.InfoConsole("起動", "サーバー起動完了、リスニングポート: {Port}", port);
```

### コンソール出力

ログファイルとコンソールへの同時出力をサポートします：

```csharp
// ログファイルのみに出力
LogHelper.Info("このメッセージはログファイルにのみ書き込まれます");

// ログファイルとコンソールの両方に出力
LogHelper.InfoConsole("このメッセージはコンソールとログファイルの両方に表示されます");

// エラーメッセージのコンソール出力（赤色で表示）
LogHelper.ErrorConsole("これはエラーメッセージで、コンソールに赤色で表示されます");

// コンソールのみに出力（ログファイルには書き込まない）
LogHelper.Console("このメッセージはコンソールにのみ表示されます");
```

## 設定

### LogOptions 設定クラス

```csharp
var logOptions = new LogOptions("logs") // ログディレクトリ名
{
    // 基本設定
    LogType = "WebServer",              // サーバー種別識別子
    LogTagName = "Production",          // ログタグ名
    LogEventLevel = LogEventLevel.Info, // 最低ログレベル
    
    // 出力設定
    IsConsole = true,                   // コンソール出力の有無
    
    // ファイル設定
    RollingInterval = RollingInterval.Day,    // ローテーション間隔（日）
    IsFileSizeLimit = true,                   // ファイルサイズ制限の有無
    FileSizeLimitBytes = 100 * 1024 * 1024,   // ファイルサイズ制限（100MB）
    RetainedFileCountLimit = 31,              // 保持ファイル数（31ファイル）
    
    // Grafana Loki 設定
    IsGrafanaLoki = false,                    // Loki有効フラグ
    GrafanaLokiUrl = "http://localhost:3100", // Lokiサービスアドレス
    GrafanaLokiLabels = new Dictionary<string, string>
    {
        ["app"] = "myapp",
        ["env"] = "production"
    },
    GrafanaLokiUsername = "admin",            // Lokiユーザー名
    GrafanaLokiPassword = "password"          // Lokiパスワード
};
```

### ローテーション間隔オプション

```csharp
// サポートされるローテーション間隔
RollingInterval.Infinite    // ローテーションなし
RollingInterval.Year        // 年単位でローテーション
RollingInterval.Month       // 月単位でローテーション
RollingInterval.Day         // 日単位でローテーション（デフォルト）
RollingInterval.Hour        // 時間単位でローテーション
RollingInterval.Minute      // 分単位でローテーション
```

### ログレベル設定

```csharp
// サポートされるログレベル
LogEventLevel.Verbose       // 最も詳細
LogEventLevel.Debug         // デバッグ（デフォルト）
LogEventLevel.Information   // 情報
LogEventLevel.Warning       // 警告
LogEventLevel.Error         // エラー
LogEventLevel.Fatal         // 致命的エラー
```

## 高度な使い方

### Grafana Loki 統合

ログを Grafana Loki に送信して、集中化されたログ管理が可能です：

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

### カスタムログ設定

コールバック関数を使用したより高度なカスタム設定をサポートします：

```csharp
var logger = LogHandler.Create(logOptions, true, config =>
{
    // カスタムSinkの追加
    config.WriteTo.Email(
        fromEmail: "noreply@example.com",
        toEmail: "admin@example.com",
        outputTemplate: "{Timestamp} [{Level}] {Message}{NewLine}{Exception}",
        restrictedToMinimumLevel: LogEventLevel.Error
    );
    
    // カスタムEnricherの追加
    config.Enrich.WithProperty("MachineName", Environment.MachineName);
    config.Enrich.WithProperty("ProcessId", Environment.ProcessId);
});
```

### カスタムLoggerインスタンスの使用

```csharp
// 複数のLoggerインスタンスの作成
var webLogger = LogHandler.Create(webLogOptions, false);
var dbLogger = LogHandler.Create(dbLogOptions, false);

// 特定のLoggerインスタンスを使用
LogHelper.Info(webLogger, "Webリクエスト処理完了");
LogHelper.Error(dbLogger, "データベース接続例外", exception);
```

### パフォーマンス最適化

#### 非同期ログフラッシュ

```csharp
// 同期フラッシュ（ブロックあり）
LogHelper.FlushAndSave();

// 非同期フラッシュ（ノンブロッキング）
LogHelper.CloseAndFlushAsync();
```

#### 条件付きログ記録

```csharp
// 不要な文字列フォーマットを回避
if (logger.IsEnabled(LogEventLevel.Debug))
{
    LogHelper.Debug("複雑なデバッグ情報: {Data}", ExpensiveOperation());
}
```

## ベストプラクティス

### 構造化ログ

構造化されたログメッセージを使用し、後続の分析に役立てます：

```csharp
// 良い実践 - 構造化ログ
LogHelper.Info("ユーザーログイン成功、ユーザーID: {UserId}, IP: {IP}, 所要時間: {Duration}ms", 
    userId, ipAddress, duration);

// 避けるべき - 文字列連結
LogHelper.Info($"ユーザーログイン成功、ユーザーID: {userId}, IP: {ipAddress}, 所要時間: {duration}ms");
```

### ログレベルの適切な使用

```csharp
// Debug - 開発時のデバッグ情報
LogHelper.Debug("ProcessOrder メソッドに入りました。パラメータ: {OrderId}", orderId);

// Info - 重要なビジネスイベント
LogHelper.Info("注文作成成功、注文番号: {OrderId}, ユーザー: {UserId}", orderId, userId);

// Warn - 復旧可能な問題
LogHelper.Warn("データベース接続をリトライ中、{Attempt} 回目の試行", attemptCount);

// Error - 注意が必要なエラー
LogHelper.Error("決済処理失敗、注文: {OrderId}, エラー: {Error}", orderId, error);

// Fatal - アプリケーション終了を引き起こす深刻なエラー
LogHelper.Fatal("データベース接続プール枯渇、アプリケーションを終了します");
```

### タグによる分類

```csharp
// 機能モジュール別に分類
LogHelper.Info("ユーザー管理", "ユーザー登録成功: {Email}", email);
LogHelper.Info("注文処理", "注文ステータス更新: {OrderId} -> {Status}", orderId, status);
LogHelper.Info("決済システム", "決済完了: {Amount} 元", amount);

// 環境別に分類
LogHelper.Info("本番環境", "サーバー起動完了");
LogHelper.Debug("開発環境", "デバッグ情報: {Data}", debugData);
```

### 例外処理

```csharp
try
{
    await ProcessOrderAsync(orderId);
    LogHelper.Info("注文処理", "注文 {OrderId} の処理完了", orderId);
}
catch (BusinessException ex)
{
    // ビジネス例外は警告として記録
    LogHelper.Warn("注文処理", "ビジネスルール検証失敗: {Message}", ex.Message);
    throw;
}
catch (Exception ex)
{
    // システム例外はエラーとして記録
    LogHelper.Error("注文処理", ex);
    throw;
}
```

### 設定管理

```csharp
// 開発環境の設定
var devLogOptions = new LogOptions("logs")
{
    LogEventLevel = LogEventLevel.Debug,
    IsConsole = true,
    RollingInterval = RollingInterval.Hour
};

// 本番環境の設定
var prodLogOptions = new LogOptions("logs")
{
    LogEventLevel = LogEventLevel.Information,
    IsConsole = false,
    RollingInterval = RollingInterval.Day,
    IsGrafanaLoki = true,
    GrafanaLokiUrl = "http://loki.prod.com:3100"
};

// 環境に応じて設定を選択
var logOptions = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development" 
    ? devLogOptions 
    : prodLogOptions;
```

## API リファレンス

### LogHandler

| メソッド | 説明 |
|------|------|
| `LogHandler.Create(LogOptions)` | 指定した設定で Logger インスタンスを作成 |
| `LogHandler.Create(LogOptions, bool)` | Logger インスタンスを作成。第2パラメータはグローバルデフォルトに設定するかどうか |
| `LogHandler.Create(LogOptions, bool, ``Action<LoggerConfiguration>``)` | Logger インスタンスを作成し、コールバックで Serilog 設定をカスタマイズ |

### LogHelper ログ記録メソッド

| メソッド | 説明 |
|------|------|
| `LogHelper.Verbose(message)` | Verbose レベルのログを記録 |
| `LogHelper.Debug(message)` | Debug レベルのログを記録 |
| `LogHelper.Info(message)` | Information レベルのログを記録 |
| `LogHelper.Warn(message)` | Warning レベルのログを記録 |
| `LogHelper.Error(message)` | Error レベルのログを記録 |
| `LogHelper.Fatal(message)` | Fatal レベルのログを記録 |
| `LogHelper.Info(tag, message, args)` | タグ付き Info ログ |
| `LogHelper.Warn(tag, message, args)` | タグ付き Warn ログ |
| `LogHelper.Error(tag, message, args)` | タグ付き Error ログ |
| `LogHelper.Error(Exception)` | 例外を記録（スタックトレース付き） |
| `LogHelper.Error(tag, Exception)` | タグ付き例外記録 |
| `LogHelper.InfoConsole(message)` | コンソールにも出力する Info ログ |
| `LogHelper.ErrorConsole(message)` | コンソールにも出力する Error ログ（赤色） |
| `LogHelper.Console(message)` | コンソールのみに出力 |
| `LogHelper.FlushAndSave()` | 同期フラッシュしてログを保存 |
| `LogHelper.CloseAndFlushAsync()` | 非同期でクローズしてフラッシュ |

### LogOptions 主なプロパティ

| プロパティ | 型 | 説明 |
|------|------|------|
| `LogSavePath` | `string` | ログディレクトリパス |
| `LogType` | `string` | サーバー種別識別子 |
| `LogTagName` | `string` | ログタグ名 |
| `LogEventLevel` | `LogEventLevel` | 最低ログレベル |
| `IsConsole` | `bool` | コンソール出力の有無 |
| `RollingInterval` | `RollingInterval` | ファイルローテーション間隔 |
| `FileSizeLimitBytes` | `long` | 単一ログファイルのサイズ制限 |
| `RetainedFileCountLimit` | `int` | 保持するログファイル数 |
| `IsGrafanaLoki` | `bool` | Grafana Loki の有効フラグ |
| `GrafanaLokiUrl` | `string` | Loki サービスアドレス |
| `GrafanaLokiLabels` | ``Dictionary<string, string>`` | Loki ラベル |
| `GrafanaLokiUsername` | `string` | Loki 認証ユーザー名 |
| `GrafanaLokiPassword` | `string` | Loki 認証パスワード |

### 依存関係

- **Serilog.AspNetCore** (9.0.0) - コアログフレームワーク
- **Serilog.Sinks.Console** (6.0.0) - コンソール出力
- **Serilog.Sinks.File** (7.0.0) - ファイル出力
- **Serilog.Sinks.Grafana.Loki** (8.3.1) - Grafana Loki 統合
- **GameFrameX.Foundation.Json** - JSON シリアライズサポート
