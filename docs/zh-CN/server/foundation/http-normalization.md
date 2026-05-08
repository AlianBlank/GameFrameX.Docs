# HTTP消息标准化（统一HTTP响应结构的基础设施库）

[![.NET](https://img.shields.io/badge/.NET-8.0-blue.svg)](https://dotnet.microsoft.com/download) [![License](https://img.shields.io/badge/license-Apache--2.0-green.svg)]()

GameFrameX.Foundation.Http.Normalization 是一个用于统一HTTP响应结构的基础设施库，提供了标准化的JSON响应格式和处理工具，确保整个框架的HTTP响应结构一致性。

## 特性

- **统一响应结构** - 提供标准化的HTTP JSON响应格式
- **多种响应状态** - 支持成功、失败、错误等多种响应状态
- **类型安全** - 泛型支持，确保数据类型安全
- **便捷方法** - 提供丰富的静态方法快速创建响应
- **扩展支持** - 支持自定义状态码和消息
- **序列化优化** - 基于System.Text.Json的高性能序列化
- **错误处理** - 完善的异常处理和日志记录
- **特性支持** - 提供描述特性用于文档生成

## 安装

```bash
dotnet add package GameFrameX.Foundation.Http.Normalization
```

## 快速开始

### 基本使用

```csharp
using GameFrameX.Foundation.Http.Normalization;

// 创建成功响应
var successResponse = HttpJsonResult.Success();
Console.WriteLine(successResponse.ToString());
// 输出: {"code":0,"message":"","data":null}

// 创建带数据的成功响应
var user = new { Name = "张三", Age = 25 };
var successWithData = HttpJsonResult.Success(user);
Console.WriteLine(successWithData.ToString());
// 输出: {"code":0,"message":"","data":"{\"Name\":\"张三\",\"Age\":25}"}

// 创建失败响应
var failResponse = HttpJsonResult.Fail("用户不存在");
Console.WriteLine(failResponse.ToString());
// 输出: {"code":-1,"message":"用户不存在","data":null}
```

### 直接获取JSON字符串

```csharp
// 获取成功响应的JSON字符串
string successJson = HttpJsonResult.SuccessString();

// 获取带数据的成功响应JSON字符串
string successWithDataJson = HttpJsonResult.SuccessString(user);

// 获取失败响应的JSON字符串
string failJson = HttpJsonResult.FailString("操作失败");
```

## 详细用法

### 1. HttpJsonResult 响应类

#### 基本属性

```csharp
public sealed class HttpJsonResult
{
    public int Code { get; set; }        // 响应码，0表示成功
    public string Message { get; set; }  // 响应消息
    public string Data { get; set; }     // 响应数据（JSON字符串）
}
```

#### 常用响应码

- `0` - 成功
- `-1` - 一般性失败
- `400` - 验证失败
- `401` - 未授权
- `403` - 参数错误
- `404` - 资源未找到
- `500` - 服务器内部错误

### 2. 成功响应方法

```csharp
// 基本成功响应
var response1 = HttpJsonResult.Success();

// 带数据的成功响应
var response2 = HttpJsonResult.Success(userData);

// 带JSON字符串数据的成功响应
var response3 = HttpJsonResult.Success("{\"id\":1,\"name\":\"test\"}");

// 自定义状态码和消息的成功响应
var response4 = HttpJsonResult.Success(200, "操作成功", jsonData);

// 自定义消息的成功响应
var response5 = HttpJsonResult.Success("创建成功", jsonData);
```

### 3. 错误响应方法

```csharp
// 一般失败响应
var failResponse = HttpJsonResult.Fail("操作失败");

// 自定义错误码和消息
var errorResponse = HttpJsonResult.Error(1001, "业务逻辑错误");

// 验证失败响应
var validationResponse = HttpJsonResult.ValidationError();

// 未授权响应
var unauthorizedResponse = HttpJsonResult.Unauthorized();

// 资源未找到响应
var notFoundResponse = HttpJsonResult.NotFound();

// 服务器错误响应
var serverErrorResponse = HttpJsonResult.ServerError();

// 参数错误响应
var paramErrorResponse = HttpJsonResult.ParamError();

// 非法请求响应
var illegalResponse = HttpJsonResult.Illegal();
```

### 4. HttpJsonResultData&lt;T&gt; 泛型响应类

```csharp
public sealed class HttpJsonResultData<T>
{
    public bool IsSuccess { get; set; }  // 是否成功
    public int Code { get; set; }        // 响应码
    public string Message { get; set; }  // 错误消息
    public T Data { get; set; }          // 强类型数据
}
```

### 5. 响应转换和处理

```csharp
using GameFrameX.Foundation.Http.Normalization;

// 定义数据模型
public class UserInfo
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
}

// 将JSON响应转换为强类型结果
string jsonResponse = HttpJsonResult.SuccessString(new UserInfo 
{ 
    Id = 1, 
    Name = "张三", 
    Email = "zhangsan@example.com" 
});

// 使用扩展方法转换
HttpJsonResultData<UserInfo> result = jsonResponse.ToHttpJsonResultData<UserInfo>();

if (result.IsSuccess)
{
    Console.WriteLine($"用户姓名: {result.Data.Name}");
    Console.WriteLine($"用户邮箱: {result.Data.Email}");
}
else
{
    Console.WriteLine($"请求失败: {result.Message} (错误码: {result.Code})");
}
```

### 6. 自定义响应状态码

```csharp
// 业务自定义状态码
public static class BusinessCodes
{
    public const int UserNotFound = 1001;
    public const int InsufficientBalance = 1002;
    public const int OrderExpired = 1003;
}

// 使用自定义状态码
var response = HttpJsonResult.Error(BusinessCodes.UserNotFound, "用户不存在");
```

### 7. 响应数据封装

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

### 8. 批量数据处理

```csharp
public class PagedResult<T>
{
    public List<T> Items { get; set; }
    public int TotalCount { get; set; }
    public int PageIndex { get; set; }
    public int PageSize { get; set; }
}

// 分页数据响应
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
    
    [HttpJsonCodeDescription("用户不存在")]
    UserNotFound = 1001,
    
    [HttpJsonCodeDescription("余额不足")]
    InsufficientBalance = 1002,
    
    [HttpJsonCodeDescription("订单已过期")]
    OrderExpired = 1003
}

// 使用枚举创建响应
var response = HttpJsonResult.Error((int)ApiErrorCode.UserNotFound, "用户不存在");
```

## 高级用法

### 自定义序列化选项

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

### 响应时间统计

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

### 多语言支持

```csharp
public static class LocalizedMessages
{
    private static readonly Dictionary<string, Dictionary<int, string>> Messages = new()
    {
        ["zh-CN"] = new Dictionary<int, string>
        {
            [0] = "操作成功",
            [400] = "验证失败",
            [401] = "未授权访问",
            [404] = "资源未找到",
            [500] = "服务器内部错误"
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

## 最佳实践

### 统一错误处理

在全局异常处理器中使用标准化的错误响应，保持 API 行为一致：

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

### API控制器集成

控制器方法统一返回 `HttpJsonResult`，客户端只需解析一种格式：

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
            logger.LogError(ex, "获取用户信息失败");
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
            return Ok(HttpJsonResult.SuccessString("用户创建成功", JsonSerializer.Serialize(user)));
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "创建用户失败");
            return Ok(HttpJsonResult.FailString("创建用户失败"));
        }
    }
}
```

### 客户端响应处理

客户端使用 `ToHttpJsonResultData<T>` 扩展方法进行类型安全的反序列化：

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
            logger.LogError(ex, "API请求失败");
            return new HttpJsonResultData<T>
            {
                IsSuccess = false,
                Code = 500,
                Message = "网络请求失败"
            };
        }
    }
}
```

### 响应缓存

对高频使用的静态响应进行缓存，减少重复序列化开销：

```csharp
public static class ResponseCache
{
    private static readonly ConcurrentDictionary<string, string> Cache = new();
    
    public static string GetCachedResponse(string key, Func<string> factory)
    {
        return Cache.GetOrAdd(key, _ => factory());
    }
    
    // 缓存常用响应
    public static readonly string SuccessResponse = HttpJsonResult.SuccessString();
    public static readonly string UnauthorizedResponse = HttpJsonResult.UnauthorizedString();
    public static readonly string NotFoundResponse = HttpJsonResult.NotFoundString();
}
```

## API 参考

### HttpJsonResult 静态方法

| 方法 | 返回类型 | 说明 |
|------|----------|------|
| `Success()` | `HttpJsonResult` | 创建空成功响应 (code=0) |
| `Success(data)` | `HttpJsonResult` | 创建带数据的成功响应 |
| `Success(message, data)` | `HttpJsonResult` | 创建带消息和数据的成功响应 |
| `Success(code, message, data)` | `HttpJsonResult` | 创建自定义状态码的成功响应 |
| `Fail(message)` | `HttpJsonResult` | 创建失败响应 (code=-1) |
| `Error(code, message)` | `HttpJsonResult` | 创建自定义错误码的错误响应 |
| `ValidationError()` | `HttpJsonResult` | 验证失败响应 (code=400) |
| `Unauthorized()` | `HttpJsonResult` | 未授权响应 (code=401) |
| `NotFound()` | `HttpJsonResult` | 资源未找到响应 (code=404) |
| `ServerError()` | `HttpJsonResult` | 服务器内部错误响应 (code=500) |
| `ParamError()` | `HttpJsonResult` | 参数错误响应 (code=403) |
| `Illegal()` | `HttpJsonResult` | 非法请求响应 |
| `SuccessString(...)` | `string` | 上述成功方法的 JSON 字符串版本 |
| `FailString(...)` | `string` | 上述失败方法的 JSON 字符串版本 |
| `NotFoundString()` | `string` | 资源未找到的 JSON 字符串版本 |
| `UnauthorizedString()` | `string` | 未授权的 JSON 字符串版本 |
| `ServerErrorString()` | `string` | 服务器错误的 JSON 字符串版本 |
| `ValidationErrorString()` | `string` | 验证失败的 JSON 字符串版本 |

### HttpJsonResultData&lt;T&gt; 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `IsSuccess` | `bool` | 是否成功 (code=0) |
| `Code` | `int` | 响应状态码 |
| `Message` | `string` | 响应消息 |
| `Data` | `T` | 强类型响应数据 |

### 扩展方法

| 方法 | 说明 |
|------|------|
| `string.ToHttpJsonResultData<T>()` | 将 JSON 字符串反序列化为 `HttpJsonResultData<T>` |
