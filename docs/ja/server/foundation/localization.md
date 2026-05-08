# ローカリゼーションフレームワーク

軽量ローカリゼーションフレームワークです。遅延読み込み機構、ゼロ設定使用、スレッドセーフなローカリゼーションソリューションを提供します。

## 特徴

- **ゼロ設定使用** - 初期化設定不要で、ローカリゼーションリソースを自動検出・読み込み
- **高性能設計** - 遅延読み込み機構により、初回使用時にのみリソースを読み込み、多層キャッシュでアクセス性能を最適化
- **多言語サポート** - 中国語（簡体）と英語を内蔵し、より多くの言語に拡張可能。スマートな言語フォールバック機構
- **高い拡張性** - カスタムリソースプロバイダーをサポート、柔軟な優先度管理、モジュール化されたコンポーネント設計

## インストール

```bash
dotnet add package GameFrameX.Foundation.Localization
```

## クイックスタート

### 基本的な使用方法

```csharp
using GameFrameX.Foundation.Localization.Core;

// ローカライズ文字列の取得
var message = LocalizationService.GetString("Utility.Exceptions.TimestampOutOfRange");

// パラメータ付きフォーマットメッセージ
var formattedMessage = LocalizationService.GetString("Encryption.InvalidKeySize", 128, 256);

// キーが存在しない場合、キー名自体を返す
var unknown = LocalizationService.GetString("Some.Unknown.Key"); // 戻り値: "Some.Unknown.Key"
```

### リソースの事前読み込み（オプション）

```csharp
// アプリケーション起動時にすべてのローカリゼーションリソースを事前読み込み
LocalizationService.EnsureLoaded();

// 以降の使用で初回アクセスの遅延が発生しない
var message = LocalizationService.GetString("ArgumentNull");
```

## 詳細な使い方

### コアコンポーネント

```
GameFrameX.Foundation.Localization
├── Core/                    # コアインターフェースと管理クラス
│   ├── IResourceProvider.cs         # リソースプロバイダーインターフェース
│   ├── ResourceManager.cs           # リソースマネージャー
│   └── ResourceManagerStatistics.cs # 統計情報
└── Providers/               # 具体的な実装
    ├── DefaultResourceProvider.cs   # デフォルトリソースプロバイダー
    └── AssemblyResourceProvider.cs  # アセンブリリソースプロバイダー
```

### リソース解決の優先度

1. **カスタムプロバイダー**（最高優先度）
2. **アセンブリリソースプロバイダー**
3. **デフォルトプロバイダー**（フォールバック）

### 既存モジュールへのローカリゼーション統合

#### ステップ1：ローカリゼーションキーの定義

```csharp
// GameFrameX.Foundation.YourModule/Localization/Keys.cs
namespace GameFrameX.Foundation.YourModule.Localization;

public static class LocalizationKeys
{
    public static class Exceptions
    {
        public const string InvalidArgument = "YourModule.Exceptions.InvalidArgument";
        public const string OperationFailed = "YourModule.Exceptions.OperationFailed";
    }

    public static class Messages
    {
        public const string Success = "YourModule.Messages.Success";
        public const string Processing = "YourModule.Messages.Processing";
    }
}
```

#### ステップ2：リソースファイルの作成

`Localization/Messages/Resources.resx`（デフォルト英語）と `Resources.zh-CN.resx`（中国語）を作成します：

```xml
<?xml version="1.0" encoding="utf-8"?>
<root>
  <data name="YourModule.Exceptions.InvalidArgument" xml:space="preserve">
    <value>Invalid argument provided for {0}</value>
  </data>
  <data name="YourModule.Messages.Success" xml:space="preserve">
    <value>Operation completed successfully</value>
  </data>
</root>
```

#### ステップ3：プロジェクトファイルの更新

```xml
<PropertyGroup>
  <EnableDefaultEmbeddedResourceItems>false</EnableDefaultEmbeddedResourceItems>
</PropertyGroup>

<ItemGroup>
  <EmbeddedResource Include="Localization\Messages\*.resx" />
</ItemGroup>
```

#### ステップ4：コードでの使用

```csharp
using GameFrameX.Foundation.Localization.Core;
using GameFrameX.Foundation.YourModule.Localization;

public class YourService
{
    public void ProcessData(string input)
    {
        if (string.IsNullOrEmpty(input))
        {
            throw new ArgumentException(
                LocalizationService.GetString(LocalizationKeys.Exceptions.InvalidArgument, nameof(input)));
        }

        var successMessage = LocalizationService.GetString(LocalizationKeys.Messages.Success);
        Console.WriteLine(successMessage);
    }
}
```

### カスタムリソースプロバイダー

```csharp
public class DatabaseResourceProvider : IResourceProvider
{
    private readonly IDbConnection _connection;

    public DatabaseResourceProvider(IDbConnection connection)
    {
        _connection = connection;
    }

    public string GetString(string key)
    {
        var sql = "SELECT localized_text FROM localization_strings WHERE key = @key AND culture = @culture";
        return _connection.ExecuteScalar<string>(sql, new { key, culture = CultureInfo.CurrentCulture.Name });
    }
}

// カスタムプロバイダーの登録
var dbProvider = new DatabaseResourceProvider(yourDbConnection);
LocalizationService.RegisterProvider(dbProvider);
```

### 監視と統計

```csharp
var stats = LocalizationService.GetStatistics();
Console.WriteLine($"プロバイダー読み込み済み: {stats.ProvidersLoaded}");
Console.WriteLine($"総プロバイダー数: {stats.TotalProviderCount}");
Console.WriteLine($"アセンブリプロバイダー数: {stats.AssemblyProviderCount}");

var providers = LocalizationService.GetProviders();
foreach (var provider in providers)
{
    Console.WriteLine($"プロバイダーの種類: {provider.GetType().Name}");
}
```

### 例外処理でのローカリゼーション

```csharp
using GameFrameX.Foundation.Utility.Localization;

public class ExceptionExamples
{
    public void ValidateTimestamp(long timestamp)
    {
        if (timestamp <= 0)
        {
            throw new ArgumentOutOfRangeException(
                nameof(timestamp),
                LocalizationService.GetString(LocalizationKeys.Exceptions.TimestampOutOfRange));
        }
    }
}
```

### 動的言語切り替え

```csharp
public class LocalizationManager
{
    public void SwitchLanguage(string cultureCode)
    {
        Thread.CurrentThread.CurrentUICulture = new CultureInfo(cultureCode);
        Thread.CurrentThread.CurrentCulture = new CultureInfo(cultureCode);
        LocalizationService.EnsureLoaded();
    }
}
```

### リソースファイルの構成

```
{アセンブリ名}/Localization/Messages/Resources.{カルチャコード}.resx

例:
GameFrameX.Foundation.Localization/Localization/Messages/Resources.zh-CN.resx
GameFrameX.Foundation.Utility/Localization/Messages/Resources.resx
GameFrameX.Foundation.Encryption/Localization/Messages/Resources.zh-CN.resx
```

### 統合済みモジュール

| モジュール | ローカリゼーションキー数 | ステータス |
|------|-------------|------|
| GameFrameX.Foundation.Utility | 4 | 完了 |
| GameFrameX.Foundation.Encryption | 20+ | 完了 |
| GameFrameX.Foundation.Extensions | 7 | 完了 |
| GameFrameX.Foundation.Hash | 2 | 完了 |

### よくある質問

#### 新しい言語サポートの追加方法

該当モジュールの `Localization/Messages/` ディレクトリに `Resources.{言語コード}.resx` ファイルを作成します。例：`Resources.fr.resx`（フランス語）、`Resources.ja.resx`（日本語）。

#### リソースファイルが反映されない場合

以下を確認してください：
1. リソースファイルが「埋め込みリソース」に設定されているか
2. ファイル名が正しいか（`Resources.{カルチャコード}.resx`）
3. プロジェクトファイルにリソースファイルの設定が含まれているか
4. プロジェクトを再ビルドする

## ベストプラクティス

### キー命名規則

- **パターン**：`{モジュール名}.{カテゴリ}.{具体的なキー名}`
- **例**：`Utility.Exceptions.TimestampOutOfRange`、`Encryption.InvalidKeySize`

### パラメータ付きメッセージ

```csharp
// リソースファイルでの定義
// <value>ユーザー '{0}' のパスワードが無効です。長さは {1}～{2} 文字の間にしてください</value>

// コードでの使用
var message = LocalizationService.GetString("User.InvalidPassword", username, minLength, maxLength);
```

### パフォーマンス最適化

```csharp
// アプリケーション起動時の事前読み込み（オプション）
LocalizationService.EnsureLoaded();
```

## API リファレンス

### LocalizationService

| メソッド | 説明 |
|------|------|
| `GetString(string key, params object[] args)` | ローカライズ文字列を取得。パラメータ付きフォーマットをサポート |
| `EnsureLoaded()` | すべてのローカリゼーションリソースを事前読み込み |
| `RegisterProvider(IResourceProvider provider)` | カスタムリソースプロバイダーを登録 |
| `GetStatistics()` | ローカリゼーション統計情報を取得 |
| `GetProviders()` | 登録済みのすべてのリソースプロバイダーのリストを取得 |

### IResourceProvider インターフェース

| メソッド | 説明 |
|------|------|
| `GetString(string key)` | キーに基づいてローカライズ文字列を取得 |

## ライセンス

MIT + Apache 2.0
