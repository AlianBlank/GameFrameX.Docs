# 汎用ユーティリティライブラリ

コンソール操作、環境管理、時間処理、Snowflake ID 生成などの機能を提供する汎用ユーティリティライブラリです。

## 特徴

- **コンソール拡張出力** - 複数レベルのカラーテキスト出力をサポート（Info、Success、Warning、Error）
- **環境管理** - 実行環境の判定、環境変数設定の取得を簡単に行える
- **時間処理** - Unix タイムスタンプ変換、タイムゾーンサポート、日付境界計算、経過時間集計
- **Snowflake ID 生成** - 分散ユニーク ID ジェネレーター、高性能、傾向増加、外部依存なし

## インストール

```bash
dotnet add package GameFrameX.Foundation.Utility
```

## クイックスタート

```csharp
using GameFrameX.Foundation.Utility;

// Snowflake ID の生成
long id = SnowFlakeIdHelper.GenerateId();

// 現在の Unix タイムスタンプの取得
long timestamp = TimerHelper.UnixTimeSeconds();

// コンソール出力
ConsoleHelper.WriteSuccess("操作成功！");
```

## 詳細な使い方

### ConsoleHelper

コンソールに関する補助機能を提供します。コンソールに異なる色のテキストを表示する場合に使用します。

```csharp
ConsoleHelper.WriteLine("これは通常のメッセージです。");
ConsoleHelper.WriteInfo("これは情報メッセージです。");
ConsoleHelper.WriteSuccess("操作成功！");
ConsoleHelper.WriteWarning("これは警告です。");
ConsoleHelper.WriteError("エラーが発生しました。");
```

### EnvironmentHelper

アプリケーションの実行環境に関する補助機能を提供します。

```csharp
// 現在開発環境かどうかを判定
if (EnvironmentHelper.IsDevelopment())
{
    // 開発環境でのみ実行するコード
}

// 現在の環境名を取得
string environmentName = EnvironmentHelper.GetEnvironmentName();
```

### TimerHelper

カスタムタイムゾーン、Unix タイムスタンプ変換、日付境界計算などをサポートする強力な時間処理機能を提供します。

**コア機能：**

- **タイムゾーンサポート**：`CurrentTimeZone` で現在のタイムゾーンを取得または設定（デフォルトはシステムローカルタイムゾーン）
- **タイムスタンプ処理**：`UnixTimeSeconds()`、`UnixTimeMilliseconds()` で現在のタイムスタンプを取得
- **日付境界計算**：今日/今週/今月/今年の開始時刻と終了時刻を取得
- **経過時間計算**：`GetElapsedSeconds()`、`GetTimeDifference()`
- **テスト補助**：`SetTimeOffset()` で時間オフセットを設定

```csharp
using GameFrameX.Foundation.Utility;

// Unix タイムスタンプ定数
DateTime epochLocal = TimerHelper.EpochLocal;
DateTime epochUtc = TimerHelper.EpochUtc;

// 現在のタイムスタンプを取得
long unixSeconds = TimerHelper.UnixTimeSeconds();
long unixMilliseconds = TimerHelper.UnixTimeMilliseconds();

// タイムゾーンの設定（オプション）
TimerHelper.SetTimeZone(TimeZoneInfo.FindSystemTimeZoneById("China Standard Time"));

// 日付境界計算
DateTime weekStart = TimerHelper.GetWeekStartTime();
DateTime weekEnd = TimerHelper.GetWeekEndTime();
DateTime monthStart = TimerHelper.GetMonthStartTime();

// 経過時間の計算
long elapsed = TimerHelper.GetElapsedSeconds(timestamp);

// 同一週かどうかの判定
bool isSameWeek = TimerHelper.IsNowSameWeek(lastLoginTime);
```

### Snowflake ID ジェネレーター

Snowflake アルゴリズムに基づく分散ユニーク ID ジェネレーターです。

```csharp
using GameFrameX.Foundation.Utility;

// ID の生成
long id1 = SnowFlakeIdHelper.GenerateId();
long id2 = SnowFlakeIdHelper.GenerateId();

// Worker ID とデータセンター ID の設定
SnowFlakeIdHelper.WorkId = 1;        // Worker ID (0-31)
SnowFlakeIdHelper.DataCenterId = 1;  // データセンター ID (0-31)

long configuredId = SnowFlakeIdHelper.GenerateId();
```

#### Snowflake ID アルゴリズムの詳細

Snowflake ID は Twitter がオープンソース化した分散 ID 生成アルゴリズムで、以下の特徴があります：

- **グローバルユニーク** - 分散環境での ID の一意性を保証
- **傾向増加** - 生成される ID は概ね時間順に増加し、データベースのインデックスに有利
- **高性能** - 単一マシンで毎秒数百万の ID を生成可能
- **依存なし** - データベースやその他の外部システムに依存しない

ID 構造（64 ビット）：

```
0 - 0000000000 0000000000 0000000000 0000000000 0 - 00000 - 00000 - 000000000000
|   |                                             |   |       |       |
|   |<-------------- 41ビットタイムスタンプ ---------------->|   |<-5ビット->|<-5ビット->|<--12ビット--->
|                                                 |           |       |
符号ビット(1ビット)                                 |      データセンターID  シーケンス番号
                                                  |      (5ビット)      (12ビット)
                                               Worker ID
                                                (5ビット)
```

- **1ビット符号ビット** - 常に 0
- **41ビットタイムスタンプ** - ミリ秒精度、約69年間使用可能
- **5ビットデータセンター ID** - 32のデータセンターをサポート
- **5ビット Worker ID** - 各データセンターで32のワーカーノードをサポート
- **12ビットシーケンス番号** - 同一ミリ秒内で4096の ID をサポート

## 高度な使い方

```csharp
using GameFrameX.Foundation.Utility;

namespace MyApplication
{
    class Program
    {
        static void Main(string[] args)
        {
            // アプリケーションロゴの表示
            ConsoleHelper.PrintLogo();

            // 実行環境の確認
            string env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? Environments.Development;
            Console.WriteLine($"現在の環境: {env}");

            // Snowflake ID ジェネレーターの設定
            SnowFlakeIdHelper.WorkId = 1;
            SnowFlakeIdHelper.DataCenterId = 1;

            // ユニーク ID の生成
            for (int i = 0; i < 5; i++)
            {
                long id = SnowFlakeIdHelper.GenerateId();
                long timestamp = TimerHelper.UnixTimeMilliseconds();
                Console.WriteLine($"ID: {id}, タイムスタンプ: {timestamp}");
                Thread.Sleep(1);
            }

            // 時間処理
            Console.WriteLine($"Unixエポック(UTC): {TimerHelper.EpochUtc}");
            Console.WriteLine($"Unixエポック(ローカル): {TimerHelper.EpochLocal}");
            Console.WriteLine($"現在のUnixタイムスタンプ(秒): {TimerHelper.UnixTimeSeconds()}");
            Console.WriteLine($"現在のUnixタイムスタンプ(ミリ秒): {TimerHelper.UnixTimeMilliseconds()}");
        }
    }
}
```

## ベストプラクティス

1. **タイムゾーン設定** - アプリケーション起動時にタイムゾーンを統一して設定し、クロスタイムゾーン計算の不一致を回避（`TimerHelper.SetTimeZone()`）
2. **Snowflake ID の初期化** - 各サービスインスタンスで異なる Worker ID と DataCenter ID の組み合わせを使用し、ID のグローバルな一意性を確保
3. **環境判定** - 手動で環境変数をチェックするのではなく、`EnvironmentHelper.IsDevelopment()` を使用してコードの一貫性を維持
4. **コンソール出力** - 本番環境では `WriteError` と `WriteWarning` のみを使用し、過剰なログ出力を避ける

## API リファレンス

| クラス | メソッド/プロパティ | 説明 |
|----|-----------|------|
| `ConsoleHelper` | `WriteLine(string)` | 通常テキスト出力 |
| `ConsoleHelper` | `WriteInfo(string)` | 情報レベル出力 |
| `ConsoleHelper` | `WriteSuccess(string)` | 成功メッセージ出力 |
| `ConsoleHelper` | `WriteWarning(string)` | 警告メッセージ出力 |
| `ConsoleHelper` | `WriteError(string)` | エラーメッセージ出力 |
| `ConsoleHelper` | `PrintLogo()` | アプリケーションロゴの表示 |
| `EnvironmentHelper` | `IsDevelopment()` | 開発環境かどうかの判定 |
| `EnvironmentHelper` | `GetEnvironmentName()` | 現在の環境名の取得 |
| `TimerHelper` | `UnixTimeSeconds()` | 現在の Unix タイムスタンプ（秒）の取得 |
| `TimerHelper` | `UnixTimeMilliseconds()` | 現在の Unix タイムスタンプ（ミリ秒）の取得 |
| `TimerHelper` | `SetTimeZone(TimeZoneInfo)` | タイムゾーンの設定 |
| `TimerHelper` | `GetWeekStartTime()` | 今週の開始日時の取得 |
| `TimerHelper` | `GetWeekEndTime()` | 今週の終了日時の取得 |
| `TimerHelper` | `GetMonthStartTime()` | 今月の開始日時の取得 |
| `TimerHelper` | `GetElapsedSeconds(long)` | 経過秒数の計算 |
| `TimerHelper` | `IsNowSameWeek(DateTime)` | 現在と同じ週かどうかの判定 |
| `TimerHelper` | `EpochUtc` | Unix エポック時間（UTC） |
| `TimerHelper` | `EpochLocal` | Unix エポック時間（ローカル） |
| `SnowFlakeIdHelper` | `GenerateId()` | Snowflake ID の生成 |
| `SnowFlakeIdHelper` | `WorkId` | Worker ID（0-31） |
| `SnowFlakeIdHelper` | `DataCenterId` | データセンター ID（0-31） |

## ライセンス

MIT + Apache 2.0
