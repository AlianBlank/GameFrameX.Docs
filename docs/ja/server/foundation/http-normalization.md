# HTTPメッセージ標準化（統一HTTPレスポンス構造インフラストラクチャライブラリ）

[![.NET](https://img.shields.io/badge/.NET-8.0-blue.svg)](https://dotnet.microsoft.com/download) [![License](https://img.shields.io/badge/license-Apache--2.0-green.svg)]()

GameFrameX.Foundation.Http.Normalization は、HTTP レスポンス構造を統一するためのインフラストラクチャライブラリです。標準化された JSON レスポンス形式と処理ツールを提供し、フレームワーク全体の HTTP レスポンス構造の一貫性を確保します。

## 特徴

- **統一レスポンス構造** - 標準化された HTTP JSON レスポンス形式を提供
- **複数のレスポンスステータス** - 成功、失敗、エラーなど複数のレスポンスステータスをサポート
- **型安全性** - ジェネリックサポートによるデータ型の安全性を確保
- **便利なメソッド** - レスポンスを素早く作成する豊富な静的メソッドを提供
- **拡張サポート** - カスタムステータスコードとメッセージをサポート
- **シリアライズ最適化** - System.Text.Json に基づく高性能シリアライズ
- **エラー処理** - 完備した例外処理とログ記録
- **属性サポート** - ドキュメント生成用の説明属性を提供

## インストール

```bash
dotnet add package GameFrameX.Foundation.Http.Normalization
```

## クイックスタート

### 基本的な使用方法

```csharp
using GameFrameX.Foundation.Http.Normalization;

// 成功レスポンスの作成
var successResponse = HttpJsonResult.Success();
Console.WriteLine(successResponse.ToString());
// 出力: {"code":0,"message":"","data":null}

// データ付き成功レスポンスの作成
var user = new { Name = "張三", Age = 25 };
var successWithData = HttpJsonResult.Success(user);
Console.WriteLine(successWithData.ToString());
// 出力: {"code":0,"message":"","data":"{\"Name\":\"張三\",\"Age\":25}"}

// 失敗レスポンスの作成
var failResponse = HttpJsonResult.Fail("ユーザーが存在しません");
Console.WriteLine(failResponse.ToString());
// 出力: {"code":-1,"message":"ユーザーが存在しません","data":null}
```

### JSON文字列の直接取得

```csharp
// 成功レスポンスのJSON文字列を取得
string successJson = HttpJsonResult.SuccessString();

// データ付き成功レスポンスのJSON文字列を取得
string successWithDataJson = HttpJsonResult.SuccessString(user);

// 失敗レスポンスのJSON文字列を取得
string failJson = HttpJsonResult.FailString("操作に失敗しました");
```

## 詳細な使い方

### 1. HttpJsonResult レスポンスクラス

#### 基本プロパティ

```csharp
public sealed class HttpJsonResult
{
    public int Code { get; set; }        // レスポンスコード、0は成功を示す
    public string Message { get; set; }  // レスポンスメッセージ
    public string Data { get; set; }     // レスポンスデータ（JSON文字列）
}
```

#### 一般的なレスポンスコード

- `0` - 成功
- `-1` - 一般的な失敗
- `400` - 検証失敗
- `401` - 未認証
- `403` - パラメータエラー
- `404` - リソース未検出
- `500` - サーバー内部エラー

### 2. 成功レスポンスメソッド

```csharp
// 基本成功レスポンス
var response1 = HttpJsonResult.Success();

// データ付き成功レスポンス
var response2 = HttpJsonResult.Success(userData);

// JSON文字列データ付き成功レスポンス
var response3 = HttpJsonResult.Success("{\"id\":1,\"name\":\"test\"}");

// カスタムステータスコードとメッセージ付き成功レスポンス
var response4 = HttpJsonResult.Success(200, "操作成功", jsonData);

// カスタムメッセージ付き成功レスポンス
var response5 = HttpJsonResult.Success("作成成功", jsonData);
```

### 3. エラーレスポンスメソッド

```csharp
// 一般的な失敗レスポンス
var failResponse = HttpJsonResult.Fail("操作に失敗しました");

// カスタムエラーコードとメッセージ
var errorResponse = HttpJsonResult.Error(1001, "ビジネスロジックエラー");

// 検証失敗レスポンス
var validationResponse = HttpJsonResult.ValidationError();

// 未認証レスポンス
var unauthorizedResponse = HttpJsonResult.Unauthorized();

// リソース未検出レスポンス
var notFoundResponse = HttpJsonResult.NotFound();

// サーバーエラーレスポンス
var serverErrorResponse = HttpJsonResult.ServerError();

// パラメータエラーレスポンス
var paramErrorResponse = HttpJsonResult.ParamError();

// 不正リクエストレスポンス
var illegalResponse = HttpJsonResult.Illegal();
```

### 4. HttpJsonResultData&lt;T&gt; ジェネリックレスポンスクラス

```csharp
public sealed class HttpJsonResultData<T>
{
    public bool IsSuccess { get; set; }  // 成功かどうか
    public int Code { get; set; }        // レスポンスコード
    public string Message { get; set; }  // エラーメッセージ
    public T Data { get; set; }          // 型指定されたデータ
}
```

### 5. レスポンス変換と処理

```csharp
using GameFrameX.Foundation.Http.Normalization;

// データモデルの定義
public class UserInfo
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
}

// JSONレスポンスを型指定された結果に変換
string jsonResponse = HttpJsonResult.SuccessString(new UserInfo 
{ 
    Id = 1, 
    Name = "張三", 
    Email = "zhangsan@example.com" 
});

// 拡張メソッドを使用して変換
HttpJsonResultData<UserInfo> result = jsonResponse.ToHttpJsonResultData<UserInfo>();

if (result.IsSuccess)
{
    Console.WriteLine($"ユーザー名: {result.Data.Name}");
    Console.WriteLine($"メールアドレス: {result.Data.Email}");
}
else
{
    Console.WriteLine($"リクエスト失敗: {result.Message} (エラーコード: {result.Code})");
}
```

### 6. カスタムレスポンスステータスコード

```csharp
// ビジネスカスタムステータスコード
public static class BusinessCodes
{
    public const int UserNotFound = 1001;
    public const int InsufficientBalance = 1002;
    public const int OrderExpired = 1003;
}

// カスタムステータスコードを使用
var response = HttpJsonResult.Error(BusinessCodes.UserNotFound, "ユーザーが存在しません");
```

### 7. レスポンスデータカプセル化

```csharp
public class ApiResponse<T>
{
    public static HttpJsonResult Success(T data)
    {
        return HttpJsonResult.Success(new
        {
            success = true,
            timestamp = DateTime.UtcNow,
            data = data
        });
    }
    
    public static HttpJsonResult Error(string message)
    {
        return HttpJsonResult.Fail(new
        {
            success = false,
            timestamp = DateTime.UtcNow,
            error = message
        }.ToString());
    }
}
```

### 8. バッチデータ処理

```csharp
public class PagedResult<T>
{
    public List<T> Items { get; set; }
    public int TotalCount { get; set; }
    public int PageIndex { get; set; }
    public int PageSize { get; set; }
}

// ページングデータレスポンス
var pagedUsers = new PagedResult<UserInfo>
{
    Items = userList,
    TotalCount = 100,
    PageIndex = 1,
    PageSize = 10
};

var response = HttpJsonResult.Success(pagedUsers);
```

### 9. 説明属性の使用

```csharp
public enum ApiErrorCode
{
    [HttpJsonCodeDescription("操作成功")]
    Success = 0,
    
    [HttpJsonCodeDescription("ユーザーが存在しません")]
    UserNotFound = 1001,
    
    [HttpJsonCodeDescription("残高不足")]
    InsufficientBalance = 1002,
    
    [HttpJsonCodeDescription("注文の有効期限切れ")]
    OrderExpired = 1003
}

// 列挙型を使用してレスポンスを作成
var response = HttpJsonResult.Error((int)ApiErrorCode.UserNotFound, "ユーザーが存在しません");
```

## 高度な使い方

### カスタムシリアライズオプション

```csharp
public static class CustomHttpJsonResult
{
    private static readonly JsonSerializerOptions Options = new JsonSerializerOptions
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        WriteIndented = true
    };
    
    public static string SerializeWithOptions(object data)
    {
        return JsonSerializer.Serialize(data, Options);
    }
}
```

### レスポンス時間統計

```csharp
public class TimedHttpJsonResult : HttpJsonResult
{
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    public long ProcessingTimeMs { get; set; }
    
    public static TimedHttpJsonResult TimedSuccess(object data, long processingTime)
    {
        return new TimedHttpJsonResult
        {
            Code = 0,
            Message = string.Empty,
            Data = JsonSerializer.Serialize(data),
            ProcessingTimeMs = processingTime
        };
    }
}
```

### 多言語サポート

```csharp
public static class LocalizedMessages
{
    private static readonly Dictionary<string, Dictionary<int, string>> Messages = new()
    {
        ["zh-CN"] = new Dictionary<int, string>
        {
            [0] = "操作成功",
            [400] = "検証失敗",
            [401] = "未認証アクセス",
            [404] = "リソース未検出",
            [500] = "サーバー内部エラー"
        },
        ["en-US"] = new Dictionary<int, string>
        {
            [0] = "Success",
            [400] = "Validation failed",
            [401] = "Unauthorized access",
            [404] = "Resource not found",
            [500] = "Internal server error"
        }
    };
    
    public static string GetMessage(int code, string culture = "zh-CN")
    {
        return Messages.TryGetValue(culture, out var cultureMessages) && 
               cultureMessages.TryGetValue(code, out var message) 
               ? message 
               : "Unknown error";
    }
}
```

## ベストプラクティス

### 統一エラー処理

グローバル例外ハンドラーで標準化されたエラーレスポンスを使用し、APIの動作を一貫させます：

```csharp
public class GlobalExceptionHandler
{
    public static HttpJsonResult HandleException(Exception ex)
    {
        return ex switch
        {
            ArgumentNullException => HttpJsonResult.ParamError(),
            UnauthorizedAccessException => HttpJsonResult.Unauthorized(),
            FileNotFoundException => HttpJsonResult.NotFound(),
            _ => HttpJsonResult.ServerError()
        };
    }
}
```

### APIコントローラー統合

コントローラーメソッドは統一して `HttpJsonResult` を返し、クライアントは一つの形式だけを解析します：

```csharp
[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser(int id)
    {
        try
        {
            var user = await userService.GetUserAsync(id);
            if (user == null)
            {
                return Ok(HttpJsonResult.NotFoundString());
            }
            
            return Ok(HttpJsonResult.SuccessString(user));
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "ユーザー情報の取得に失敗しました");
            return Ok(HttpJsonResult.ServerErrorString());
        }
    }
    
    [HttpPost]
    public async Task<IActionResult> CreateUser([FromBody] CreateUserRequest request)
    {
        if (!ModelState.IsValid)
        {
            return Ok(HttpJsonResult.ValidationErrorString());
        }
        
        try
        {
            var user = await userService.CreateUserAsync(request);
            return Ok(HttpJsonResult.SuccessString("ユーザー作成成功", JsonSerializer.Serialize(user)));
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "ユーザー作成に失敗しました");
            return Ok(HttpJsonResult.FailString("ユーザー作成に失敗しました"));
        }
    }
}
```

### クライアントレスポンス処理

クライアントは `ToHttpJsonResultData<T>` 拡張メソッドを使用して型安全なデシリアライズを行います：

```csharp
public class ApiClient
{
    private readonly HttpClient httpClient;
    
    public async Task<HttpJsonResultData<T>> GetAsync<T>(string url) where T : class, new()
    {
        try
        {
            var response = await httpClient.GetStringAsync(url);
            return response.ToHttpJsonResultData<T>();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "APIリクエストに失敗しました");
            return new HttpJsonResultData<T>
            {
                IsSuccess = false,
                Code = 500,
                Message = "ネットワークリクエストに失敗しました"
            };
        }
    }
}
```

### レスポンスキャッシュ

高頻度で使用される静的レスポンスをキャッシュし、繰り返しのシリアライズオーバーヘッドを削減します：

```csharp
public static class ResponseCache
{
    private static readonly ConcurrentDictionary<string, string> Cache = new();
    
    public static string GetCachedResponse(string key, Func<string> factory)
    {
        return Cache.GetOrAdd(key, _ => factory());
    }
    
    // よく使用されるレスポンスをキャッシュ
    public static readonly string SuccessResponse = HttpJsonResult.SuccessString();
    public static readonly string UnauthorizedResponse = HttpJsonResult.UnauthorizedString();
    public static readonly string NotFoundResponse = HttpJsonResult.NotFoundString();
}
```

## API リファレンス

### HttpJsonResult 静的メソッド

| メソッド | 戻り値の型 | 説明 |
|------|----------|------|
| `Success()` | `HttpJsonResult` | 空の成功レスポンスを作成 (code=0) |
| `Success(data)` | `HttpJsonResult` | データ付き成功レスポンスを作成 |
| `Success(message, data)` | `HttpJsonResult` | メッセージとデータ付き成功レスポンスを作成 |
| `Success(code, message, data)` | `HttpJsonResult` | カスタムステータスコード付き成功レスポンスを作成 |
| `Fail(message)` | `HttpJsonResult` | 失敗レスポンスを作成 (code=-1) |
| `Error(code, message)` | `HttpJsonResult` | カスタムエラーコード付きエラーレスポンスを作成 |
| `ValidationError()` | `HttpJsonResult` | 検証失敗レスポンス (code=400) |
| `Unauthorized()` | `HttpJsonResult` | 未認証レスポンス (code=401) |
| `NotFound()` | `HttpJsonResult` | リソース未検出レスポンス (code=404) |
| `ServerError()` | `HttpJsonResult` | サーバー内部エラーレスポンス (code=500) |
| `ParamError()` | `HttpJsonResult` | パラメータエラーレスポンス (code=403) |
| `Illegal()` | `HttpJsonResult` | 不正リクエストレスポンス |
| `SuccessString(...)` | `string` | 上記成功メソッドの JSON 文字列版 |
| `FailString(...)` | `string` | 上記失敗メソッドの JSON 文字列版 |
| `NotFoundString()` | `string` | リソース未検出の JSON 文字列版 |
| `UnauthorizedString()` | `string` | 未認証の JSON 文字列版 |
| `ServerErrorString()` | `string` | サーバーエラーの JSON 文字列版 |
| `ValidationErrorString()` | `string` | 検証失敗の JSON 文字列版 |

### HttpJsonResultData&lt;T&gt; プロパティ

| プロパティ | 型 | 説明 |
|------|------|------|
| `IsSuccess` | `bool` | 成功かどうか (code=0) |
| `Code` | `int` | レスポンスステータスコード |
| `Message` | `string` | レスポンスメッセージ |
| `Data` | `T` | 型指定されたレスポンスデータ |

### 拡張メソッド

| メソッド | 説明 |
|------|------|
| `string.ToHttpJsonResultData<T>()` | JSON 文字列を `HttpJsonResultData<T>` にデシリアライズ |
