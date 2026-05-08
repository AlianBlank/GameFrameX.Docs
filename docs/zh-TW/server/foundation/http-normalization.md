# HTTP 訊息標準化（統一 HTTP 回應結構的基礎設施庫）

[![.NET](https://img.shields.io/badge/.NET-8.0-blue.svg)](https://dotnet.microsoft.com/download) [![License](https://img.shields.io/badge/license-Apache--2.0-green.svg)]()

GameFrameX.Foundation.Http.Normalization 是一個用於統一 HTTP 回應結構的基礎設施庫，提供了標準化的 JSON 回應格式和處理工具，確保整個框架的 HTTP 回應結構一致性。

## 特性

- **統一回應結構** - 提供標準化的 HTTP JSON 回應格式
- **多種回應狀態** - 支援成功、失敗、錯誤等多種回應狀態
- **型別安全** - 泛型支援，確保資料型別安全
- **便捷方法** - 提供豐富的靜態方法快速建立回應
- **擴充支援** - 支援自訂狀態碼和訊息
- **序列化最佳化** - 基於 System.Text.Json 的高效能序列化
- **錯誤處理** - 完善的例外處理和日誌記錄
- **特性支援** - 提供描述特性用於文件產生

## 安裝

```bash
dotnet add package GameFrameX.Foundation.Http.Normalization
```

## 快速開始

### 基本使用

```csharp
using GameFrameX.Foundation.Http.Normalization;

// 建立成功回應
var successResponse = HttpJsonResult.Success();
Console.WriteLine(successResponse.ToString());
// 輸出: {"code":0,"message":"","data":null}

// 建立帶資料的成功回應
var user = new { Name = "張三", Age = 25 };
var successWithData = HttpJsonResult.Success(user);
Console.WriteLine(successWithData.ToString());
// 輸出: {"code":0,"message":"","data":"{\"Name\":\"張三\",\"Age\":25}"}

// 建立失敗回應
var failResponse = HttpJsonResult.Fail("使用者不存在");
Console.WriteLine(failResponse.ToString());
// 輸出: {"code":-1,"message":"使用者不存在","data":null}
```

### 直接取得 JSON 字串

```csharp
// 取得成功回應的 JSON 字串
string successJson = HttpJsonResult.SuccessString();

// 取得帶資料的成功回應 JSON 字串
string successWithDataJson = HttpJsonResult.SuccessString(user);

// 取得失敗回應的 JSON 字串
string failJson = HttpJsonResult.FailString("操作失敗");
```

## 詳細用法

### 1. HttpJsonResult 回應類別

#### 基本屬性

```csharp
public sealed class HttpJsonResult
{
    public int Code { get; set; }        // 回應碼，0 表示成功
    public string Message { get; set; }  // 回應訊息
    public string Data { get; set; }     // 回應資料（JSON 字串）
}
```

#### 常用回應碼

- `0` - 成功
- `-1` - 一般性失敗
- `400` - 驗證失敗
- `401` - 未授權
- `403` - 參數錯誤
- `404` - 資源未找到
- `500` - 伺服器內部錯誤

### 2. 成功回應方法

```csharp
// 基本成功回應
var response1 = HttpJsonResult.Success();

// 帶資料的成功回應
var response2 = HttpJsonResult.Success(userData);

// 帶 JSON 字串資料的成功回應
var response3 = HttpJsonResult.Success("{\"id\":1,\"name\":\"test\"}");

// 自訂狀態碼和訊息的成功回應
var response4 = HttpJsonResult.Success(200, "操作成功", jsonData);

// 自訂訊息的成功回應
var response5 = HttpJsonResult.Success("建立成功", jsonData);
```

### 3. 錯誤回應方法

```csharp
// 一般失敗回應
var failResponse = HttpJsonResult.Fail("操作失敗");

// 自訂錯誤碼和訊息
var errorResponse = HttpJsonResult.Error(1001, "業務邏輯錯誤");

// 驗證失敗回應
var validationResponse = HttpJsonResult.ValidationError();

// 未授權回應
var unauthorizedResponse = HttpJsonResult.Unauthorized();

// 資源未找到回應
var notFoundResponse = HttpJsonResult.NotFound();

// 伺服器錯誤回應
var serverErrorResponse = HttpJsonResult.ServerError();

// 參數錯誤回應
var paramErrorResponse = HttpJsonResult.ParamError();

// 非法請求回應
var illegalResponse = HttpJsonResult.Illegal();
```

### 4. HttpJsonResultData&lt;T&gt; 泛型回應類別

```csharp
public sealed class HttpJsonResultData<T>
{
    public bool IsSuccess { get; set; }  // 是否成功
    public int Code { get; set; }        // 回應碼
    public string Message { get; set; }  // 錯誤訊息
    public T Data { get; set; }          // 強型別資料
}
```

### 5. 回應轉換和處理

```csharp
using GameFrameX.Foundation.Http.Normalization;

// 定義資料模型
public class UserInfo
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
}

// 將 JSON 回應轉換為強型別結果
string jsonResponse = HttpJsonResult.SuccessString(new UserInfo 
{ 
    Id = 1, 
    Name = "張三", 
    Email = "zhangsan@example.com" 
});

// 使用擴充方法轉換
HttpJsonResultData<UserInfo> result = jsonResponse.ToHttpJsonResultData<UserInfo>();

if (result.IsSuccess)
{
    Console.WriteLine($"使用者姓名: {result.Data.Name}");
    Console.WriteLine($"使用者信箱: {result.Data.Email}");
}
else
{
    Console.WriteLine($"請求失敗: {result.Message} (錯誤碼: {result.Code})");
}
```

### 6. 自訂回應狀態碼

```csharp
// 業務自訂狀態碼
public static class BusinessCodes
{
    public const int UserNotFound = 1001;
    public const int InsufficientBalance = 1002;
    public const int OrderExpired = 1003;
}

// 使用自訂狀態碼
var response = HttpJsonResult.Error(BusinessCodes.UserNotFound, "使用者不存在");
```

### 7. 回應資料封裝

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

### 8. 批次資料處理

```csharp
public class PagedResult<T>
{
    public List<T> Items { get; set; }
    public int TotalCount { get; set; }
    public int PageIndex { get; set; }
    public int PageSize { get; set; }
}

// 分頁資料回應
var pagedUsers = new PagedResult<UserInfo>
{
    Items = userList,
    TotalCount = 100,
    PageIndex = 1,
    PageSize = 10
};

var response = HttpJsonResult.Success(pagedUsers);
```

### 9. 使用描述特性

```csharp
public enum ApiErrorCode
{
    [HttpJsonCodeDescription("操作成功")]
    Success = 0,
    
    [HttpJsonCodeDescription("使用者不存在")]
    UserNotFound = 1001,
    
    [HttpJsonCodeDescription("餘額不足")]
    InsufficientBalance = 1002,
    
    [HttpJsonCodeDescription("訂單已過期")]
    OrderExpired = 1003
}

// 使用列舉建立回應
var response = HttpJsonResult.Error((int)ApiErrorCode.UserNotFound, "使用者不存在");
```

## 進階用法

### 自訂序列化選項

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

### 回應時間統計

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

### 多語言支援

```csharp
public static class LocalizedMessages
{
    private static readonly Dictionary<string, Dictionary<int, string>> Messages = new()
    {
        ["zh-CN"] = new Dictionary<int, string>
        {
            [0] = "操作成功",
            [400] = "驗證失敗",
            [401] = "未授權存取",
            [404] = "資源未找到",
            [500] = "伺服器內部錯誤"
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

## 最佳實踐

### 統一錯誤處理

在全域例外處理器中使用標準化的錯誤回應，保持 API 行為一致：

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

### API 控制器整合

控制器方法統一回傳 `HttpJsonResult`，用戶端只需解析一種格式：

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
            logger.LogError(ex, "取得使用者資訊失敗");
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
            return Ok(HttpJsonResult.SuccessString("使用者建立成功", JsonSerializer.Serialize(user)));
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "建立使用者失敗");
            return Ok(HttpJsonResult.FailString("建立使用者失敗"));
        }
    }
}
```

### 用戶端回應處理

用戶端使用 `ToHttpJsonResultData<T>` 擴充方法進行型別安全的反序列化：

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
            logger.LogError(ex, "API 請求失敗");
            return new HttpJsonResultData<T>
            {
                IsSuccess = false,
                Code = 500,
                Message = "網路請求失敗"
            };
        }
    }
}
```

### 回應快取

對高頻使用的靜態回應進行快取，減少重複序列化開銷：

```csharp
public static class ResponseCache
{
    private static readonly ConcurrentDictionary<string, string> Cache = new();
    
    public static string GetCachedResponse(string key, Func<string> factory)
    {
        return Cache.GetOrAdd(key, _ => factory());
    }
    
    // 快取常用回應
    public static readonly string SuccessResponse = HttpJsonResult.SuccessString();
    public static readonly string UnauthorizedResponse = HttpJsonResult.UnauthorizedString();
    public static readonly string NotFoundResponse = HttpJsonResult.NotFoundString();
}
```

## API 參考

### HttpJsonResult 靜態方法

| 方法 | 回傳型別 | 說明 |
|------|----------|------|
| `Success()` | `HttpJsonResult` | 建立空成功回應 (code=0) |
| `Success(data)` | `HttpJsonResult` | 建立帶資料的成功回應 |
| `Success(message, data)` | `HttpJsonResult` | 建立帶訊息和資料的成功回應 |
| `Success(code, message, data)` | `HttpJsonResult` | 建立自訂狀態碼的成功回應 |
| `Fail(message)` | `HttpJsonResult` | 建立失敗回應 (code=-1) |
| `Error(code, message)` | `HttpJsonResult` | 建立自訂錯誤碼的錯誤回應 |
| `ValidationError()` | `HttpJsonResult` | 驗證失敗回應 (code=400) |
| `Unauthorized()` | `HttpJsonResult` | 未授權回應 (code=401) |
| `NotFound()` | `HttpJsonResult` | 資源未找到回應 (code=404) |
| `ServerError()` | `HttpJsonResult` | 伺服器內部錯誤回應 (code=500) |
| `ParamError()` | `HttpJsonResult` | 參數錯誤回應 (code=403) |
| `Illegal()` | `HttpJsonResult` | 非法請求回應 |
| `SuccessString(...)` | `string` | 上述成功方法的 JSON 字串版本 |
| `FailString(...)` | `string` | 上述失敗方法的 JSON 字串版本 |
| `NotFoundString()` | `string` | 資源未找到的 JSON 字串版本 |
| `UnauthorizedString()` | `string` | 未授權的 JSON 字串版本 |
| `ServerErrorString()` | `string` | 伺服器錯誤的 JSON 字串版本 |
| `ValidationErrorString()` | `string` | 驗證失敗的 JSON 字串版本 |

### HttpJsonResultData&lt;T&gt; 屬性

| 屬性 | 型別 | 說明 |
|------|------|------|
| `IsSuccess` | `bool` | 是否成功 (code=0) |
| `Code` | `int` | 回應狀態碼 |
| `Message` | `string` | 回應訊息 |
| `Data` | `T` | 強型別回應資料 |

### 擴充方法

| 方法 | 說明 |
|------|------|
| `string.ToHttpJsonResultData<T>()` | 將 JSON 字串反序列化為 `HttpJsonResultData<T>` |
