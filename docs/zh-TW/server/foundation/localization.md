# 本地化框架

輕量級本地化框架，提供延遲載入機制、零設定使用、執行緒安全的本地化解決方案。

## 特性

- **零設定使用**：無需任何初始化設定，自動發現和載入本地化資源
- **高效能設計**：延遲載入機制，首次使用時才載入資源，多層快取最佳化存取效能
- **多語言支援**：內建中文（簡體）和英文支援，可擴充更多語言，智慧語言回退機制
- **高度可擴充**：支援自訂資源提供者，彈性的優先級管理，模組化元件設計

## 安裝

```bash
dotnet add package GameFrameX.Foundation.Localization
```

## 快速開始

### 基礎用法

```csharp
using GameFrameX.Foundation.Localization.Core;

// 取得本地化字串
var message = LocalizationService.GetString("Utility.Exceptions.TimestampOutOfRange");

// 帶參數的格式化訊息
var formattedMessage = LocalizationService.GetString("Encryption.InvalidKeySize", 128, 256);

// 如果鍵不存在，回傳鍵名本身
var unknown = LocalizationService.GetString("Some.Unknown.Key"); // 回傳: "Some.Unknown.Key"
```

### 預先載入資源（可選）

```csharp
// 應用程式啟動時預先載入所有本地化資源
LocalizationService.EnsureLoaded();

// 之後的使用將沒有首次存取延遲
var message = LocalizationService.GetString("ArgumentNull");
```

## 詳細用法

### 核心元件

```
GameFrameX.Foundation.Localization
├── Core/                    # 核心介面和管理類別
│   ├── IResourceProvider.cs         # 資源提供者介面
│   ├── ResourceManager.cs           # 資源管理器
│   └── ResourceManagerStatistics.cs # 統計資訊
└── Providers/               # 具體實作
    ├── DefaultResourceProvider.cs   # 預設資源提供者
    └── AssemblyResourceProvider.cs  # 組件資源提供者
```

### 資源解析優先級

1. **自訂提供者**（最高優先級）
2. **組件資源提供者**
3. **預設提供者**（兜底）

### 在現有模組中整合本地化

#### 步驟 1：定義本地化鍵

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

#### 步驟 2：建立資源檔案

建立 `Localization/Messages/Resources.resx`（預設英文）和 `Resources.zh-CN.resx`（中文）：

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

#### 步驟 3：更新專案檔案

```xml
<PropertyGroup>
  <EnableDefaultEmbeddedResourceItems>false</EnableDefaultEmbeddedResourceItems>
</PropertyGroup>

<ItemGroup>
  <EmbeddedResource Include="Localization\Messages\*.resx" />
</ItemGroup>
```

#### 步驟 4：在程式碼中使用

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

### 自訂資源提供者

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

// 註冊自訂提供者
var dbProvider = new DatabaseResourceProvider(yourDbConnection);
LocalizationService.RegisterProvider(dbProvider);
```

### 監控和統計

```csharp
var stats = LocalizationService.GetStatistics();
Console.WriteLine($"提供者已載入: {stats.ProvidersLoaded}");
Console.WriteLine($"總提供者數量: {stats.TotalProviderCount}");
Console.WriteLine($"組件提供者數量: {stats.AssemblyProviderCount}");

var providers = LocalizationService.GetProviders();
foreach (var provider in providers)
{
    Console.WriteLine($"提供者型別: {provider.GetType().Name}");
}
```

### 例外處理中的本地化

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

### 動態語言切換

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

### 資源檔案組織

```
{組件名稱}/Localization/Messages/Resources.{文化代碼}.resx

範例:
GameFrameX.Foundation.Localization/Localization/Messages/Resources.zh-CN.resx
GameFrameX.Foundation.Utility/Localization/Messages/Resources.resx
GameFrameX.Foundation.Encryption/Localization/Messages/Resources.zh-CN.resx
```

### 已整合的模組

| 模組 | 本地化鍵數量 | 狀態 |
|------|-------------|------|
| GameFrameX.Foundation.Utility | 4 | 完成 |
| GameFrameX.Foundation.Encryption | 20+ | 完成 |
| GameFrameX.Foundation.Extensions | 7 | 完成 |
| GameFrameX.Foundation.Hash | 2 | 完成 |

### 常見問題

#### 如何新增新語言支援？

在相應模組的 `Localization/Messages/` 目錄下建立 `Resources.{語言代碼}.resx` 檔案，例如 `Resources.fr.resx`（法語）、`Resources.ja.resx`（日語）。

#### 資源檔案沒有生效？

檢查：
1. 資源檔案是否設定為「內嵌的資源」
2. 檔案命名是否正確（`Resources.{文化代碼}.resx`）
3. 專案檔案是否包含資源檔案設定
4. 重新編譯專案

## 最佳實踐

### 鍵命名規範

- **模式**：`{模組名}.{類別}.{具體鍵名}`
- **範例**：`Utility.Exceptions.TimestampOutOfRange`、`Encryption.InvalidKeySize`

### 參數化訊息

```csharp
// 資源檔案中定義
// <value>使用者 '{0}' 的密碼無效，長度應在 {1}-{2} 個字元之間</value>

// 程式碼中使用
var message = LocalizationService.GetString("User.InvalidPassword", username, minLength, maxLength);
```

### 效能最佳化

```csharp
// 應用程式啟動時預先載入（可選）
LocalizationService.EnsureLoaded();
```

## API 參考

### LocalizationService

| 方法 | 說明 |
|------|------|
| `GetString(string key, params object[] args)` | 取得本地化字串，支援參數化格式化 |
| `EnsureLoaded()` | 預先載入所有本地化資源 |
| `RegisterProvider(IResourceProvider provider)` | 註冊自訂資源提供者 |
| `GetStatistics()` | 取得本地化統計資訊 |
| `GetProviders()` | 取得所有已註冊的資源提供者清單 |

### IResourceProvider 介面

| 方法 | 說明 |
|------|------|
| `GetString(string key)` | 根據鍵取得本地化字串 |

## 授權條款

MIT + Apache 2.0
