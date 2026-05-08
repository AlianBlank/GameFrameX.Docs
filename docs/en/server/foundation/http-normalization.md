# HTTP Message Normalization (Infrastructure Library for Unified HTTP Response Structures)

[![.NET](https://img.shields.io/badge/.NET-8.0-blue.svg)](https://dotnet.microsoft.com/download) [![License](https://img.shields.io/badge/license-Apache--2.0-green.svg)]()

GameFrameX.Foundation.Http.Normalization is an infrastructure library for unifying HTTP response structures. It provides standardized JSON response formats and processing tools, ensuring consistent HTTP response structures across the entire framework.

## Features

- **Unified Response Structure** - Provides a standardized HTTP JSON response format
- **Multiple Response Statuses** - Supports success, failure, error, and other response statuses
- **Type Safety** - Generic support ensures data type safety
- **Convenience Methods** - Provides rich static methods for quickly creating responses
- **Extension Support** - Supports custom status codes and messages
- **Serialization Optimization** - High-performance serialization based on System.Text.Json
- **Error Handling** - Comprehensive exception handling and logging
- **Attribute Support** - Provides description attributes for documentation generation

## Installation

```bash
dotnet add package GameFrameX.Foundation.Http.Normalization
```

## Quick Start

### Basic Usage

```csharp
using GameFrameX.Foundation.Http.Normalization;

// Create a success response
var successResponse = HttpJsonResult.Success();
Console.WriteLine(successResponse.ToString());
// Output: {"code":0,"message":"","data":null}

// Create a success response with data
var user = new { Name = "张三", Age = 25 };
var successWithData = HttpJsonResult.Success(user);
Console.WriteLine(successWithData.ToString());
// Output: {"code":0,"message":"","data":"{\"Name\":\"张三\",\"Age\":25}"}

// Create a failure response
var failResponse = HttpJsonResult.Fail("User not found");
Console.WriteLine(failResponse.ToString());
// Output: {"code":-1,"message":"User not found","data":null}
```

### Getting JSON Strings Directly

```csharp
// Get the JSON string of a success response
string successJson = HttpJsonResult.SuccessString();

// Get the JSON string of a success response with data
string successWithDataJson = HttpJsonResult.SuccessString(user);

// Get the JSON string of a failure response
string failJson = HttpJsonResult.FailString("Operation failed");
```

## Detailed Usage

### 1. HttpJsonResult Response Class

#### Basic Properties

```csharp
public sealed class HttpJsonResult
{
    public int Code { get; set; }        // Response code, 0 indicates success
    public string Message { get; set; }  // Response message
    public string Data { get; set; }     // Response data (JSON string)
}
```

#### Common Response Codes

- `0` - Success
- `-1` - General failure
- `400` - Validation failure
- `401` - Unauthorized
- `403` - Parameter error
- `404` - Resource not found
- `500` - Internal server error

### 2. Success Response Methods

```csharp
// Basic success response
var response1 = HttpJsonResult.Success();

// Success response with data
var response2 = HttpJsonResult.Success(userData);

// Success response with JSON string data
var response3 = HttpJsonResult.Success("{\"id\":1,\"name\":\"test\"}");

// Success response with custom status code and message
var response4 = HttpJsonResult.Success(200, "Operation succeeded", jsonData);

// Success response with custom message
var response5 = HttpJsonResult.Success("Created successfully", jsonData);
```

### 3. Error Response Methods

```csharp
// General failure response
var failResponse = HttpJsonResult.Fail("Operation failed");

// Custom error code and message
var errorResponse = HttpJsonResult.Error(1001, "Business logic error");

// Validation failure response
var validationResponse = HttpJsonResult.ValidationError();

// Unauthorized response
var unauthorizedResponse = HttpJsonResult.Unauthorized();

// Resource not found response
var notFoundResponse = HttpJsonResult.NotFound();

// Server error response
var serverErrorResponse = HttpJsonResult.ServerError();

// Parameter error response
var paramErrorResponse = HttpJsonResult.ParamError();

// Illegal request response
var illegalResponse = HttpJsonResult.Illegal();
```

### 4. HttpJsonResultData&lt;T&gt; Generic Response Class

```csharp
public sealed class HttpJsonResultData<T>
{
    public bool IsSuccess { get; set; }  // Whether the operation succeeded
    public int Code { get; set; }        // Response code
    public string Message { get; set; }  // Error message
    public T Data { get; set; }          // Strongly typed data
}
```

### 5. Response Conversion and Processing

```csharp
using GameFrameX.Foundation.Http.Normalization;

// Define data model
public class UserInfo
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
}

// Convert JSON response to strongly typed result
string jsonResponse = HttpJsonResult.SuccessString(new UserInfo 
{ 
    Id = 1, 
    Name = "张三", 
    Email = "zhangsan@example.com" 
});

// Use extension method to convert
HttpJsonResultData<UserInfo> result = jsonResponse.ToHttpJsonResultData<UserInfo>();

if (result.IsSuccess)
{
    Console.WriteLine($"User name: {result.Data.Name}");
    Console.WriteLine($"User email: {result.Data.Email}");
}
else
{
    Console.WriteLine($"Request failed: {result.Message} (Error code: {result.Code})");
}
```

### 6. Custom Response Status Codes

```csharp
// Business custom status codes
public static class BusinessCodes
{
    public const int UserNotFound = 1001;
    public const int InsufficientBalance = 1002;
    public const int OrderExpired = 1003;
}

// Use custom status codes
var response = HttpJsonResult.Error(BusinessCodes.UserNotFound, "User not found");
```

### 7. Response Data Encapsulation

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

### 8. Batch Data Processing

```csharp
public class PagedResult<T>
{
    public List<T> Items { get; set; }
    public int TotalCount { get; set; }
    public int PageIndex { get; set; }
    public int PageSize { get; set; }
}

// Paged data response
var pagedUsers = new PagedResult<UserInfo>
{
    Items = userList,
    TotalCount = 100,
    PageIndex = 1,
    PageSize = 10
};

var response = HttpJsonResult.Success(pagedUsers);
```

### 9. Using Description Attributes

```csharp
public enum ApiErrorCode
{
    [HttpJsonCodeDescription("Operation succeeded")]
    Success = 0,
    
    [HttpJsonCodeDescription("User not found")]
    UserNotFound = 1001,
    
    [HttpJsonCodeDescription("Insufficient balance")]
    InsufficientBalance = 1002,
    
    [HttpJsonCodeDescription("Order expired")]
    OrderExpired = 1003
}

// Use enum to create response
var response = HttpJsonResult.Error((int)ApiErrorCode.UserNotFound, "User not found");
```

## Advanced Usage

### Custom Serialization Options

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

### Response Time Tracking

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

### Multi-Language Support

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

## Best Practices

### Unified Error Handling

Use standardized error responses in a global exception handler to keep API behavior consistent:

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

### API Controller Integration

Controller methods uniformly return `HttpJsonResult`, so clients only need to parse one format:

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
            logger.LogError(ex, "Failed to get user information");
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
            return Ok(HttpJsonResult.SuccessString("User created successfully", JsonSerializer.Serialize(user)));
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Failed to create user");
            return Ok(HttpJsonResult.FailString("Failed to create user"));
        }
    }
}
```

### Client Response Processing

Clients use the `ToHttpJsonResultData<T>` extension method for type-safe deserialization:

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
            logger.LogError(ex, "API request failed");
            return new HttpJsonResultData<T>
            {
                IsSuccess = false,
                Code = 500,
                Message = "Network request failed"
            };
        }
    }
}
```

### Response Caching

Cache high-frequency static responses to reduce repeated serialization overhead:

```csharp
public static class ResponseCache
{
    private static readonly ConcurrentDictionary<string, string> Cache = new();
    
    public static string GetCachedResponse(string key, Func<string> factory)
    {
        return Cache.GetOrAdd(key, _ => factory());
    }
    
    // Cache commonly used responses
    public static readonly string SuccessResponse = HttpJsonResult.SuccessString();
    public static readonly string UnauthorizedResponse = HttpJsonResult.UnauthorizedString();
    public static readonly string NotFoundResponse = HttpJsonResult.NotFoundString();
}
```

## API Reference

### HttpJsonResult Static Methods

| Method | Return Type | Description |
|--------|-------------|-------------|
| `Success()` | `HttpJsonResult` | Create an empty success response (code=0) |
| `Success(data)` | `HttpJsonResult` | Create a success response with data |
| `Success(message, data)` | `HttpJsonResult` | Create a success response with message and data |
| `Success(code, message, data)` | `HttpJsonResult` | Create a success response with custom status code |
| `Fail(message)` | `HttpJsonResult` | Create a failure response (code=-1) |
| `Error(code, message)` | `HttpJsonResult` | Create an error response with custom error code |
| `ValidationError()` | `HttpJsonResult` | Validation failure response (code=400) |
| `Unauthorized()` | `HttpJsonResult` | Unauthorized response (code=401) |
| `NotFound()` | `HttpJsonResult` | Resource not found response (code=404) |
| `ServerError()` | `HttpJsonResult` | Internal server error response (code=500) |
| `ParamError()` | `HttpJsonResult` | Parameter error response (code=403) |
| `Illegal()` | `HttpJsonResult` | Illegal request response |
| `SuccessString(...)` | `string` | JSON string version of the success methods above |
| `FailString(...)` | `string` | JSON string version of the failure methods above |
| `NotFoundString()` | `string` | JSON string version for resource not found |
| `UnauthorizedString()` | `string` | JSON string version for unauthorized |
| `ServerErrorString()` | `string` | JSON string version for server error |
| `ValidationErrorString()` | `string` | JSON string version for validation failure |

### HttpJsonResultData&lt;T&gt; Properties

| Property | Type | Description |
|----------|------|-------------|
| `IsSuccess` | `bool` | Whether the operation succeeded (code=0) |
| `Code` | `int` | Response status code |
| `Message` | `string` | Response message |
| `Data` | `T` | Strongly typed response data |

### Extension Methods

| Method | Description |
|--------|-------------|
| `string.ToHttpJsonResultData<T>()` | Deserialize a JSON string into `HttpJsonResultData<T>` |
