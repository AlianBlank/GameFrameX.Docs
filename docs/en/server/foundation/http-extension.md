# HTTP Extension (Infrastructure Library Providing Unified Request Extensions for HttpClient)

[![.NET](https://img.shields.io/badge/.NET-8.0-blue.svg)](https://dotnet.microsoft.com/download)
[![License](https://img.shields.io/badge/license-Apache--2.0-green.svg)]()

GameFrameX.Foundation.Http.Extension is an infrastructure library that provides extension methods for HttpClient. It offers unified GET and POST request interfaces, simplifies HTTP request operations, and supports multiple data formats and response types.

## Features

- **GET Request Extensions** - Provides various GET request methods supporting string, byte array, stream, and other response formats
- **POST Request Extensions** - Supports JSON, form, file upload, and other POST request styles
- **Type Safety** - Generic support ensures data type safety
- **Flexible Configuration** - Supports custom request headers, timeout settings, and serialization options
- **Multiple Response Formats** - Supports string, byte array, stream, and other response formats
- **File Upload** - Supports single file and Multipart form file uploads
- **Async Support** - Full support for asynchronous operations and cancellation tokens
- **Error Handling** - Comprehensive parameter validation and exception handling

## Installation

```bash
dotnet add package GameFrameX.Foundation.Http.Extension
```

## Quick Start

### Basic Usage

```csharp
using GameFrameX.Foundation.Http.Extension;

// Create HttpClient instance
using var httpClient = new HttpClient();

// GET request to retrieve a string
string response = await httpClient.GetToStringAsync<string>("https://api.example.com/users");
Console.WriteLine(response);

// POST JSON data
var userData = new { Name = "张三", Age = 25 };
string postResponse = await httpClient.PostJsonToStringAsync("https://api.example.com/users", userData);
Console.WriteLine(postResponse);
```

### Requests with Headers and Timeout

```csharp
// Custom request headers
var headers = new Dictionary<string, string>
{
    ["Authorization"] = "Bearer your-token",
    ["User-Agent"] = "MyApp/1.0"
};

// GET request with headers and timeout
string response = await httpClient.GetToStringAsync<string>(
    "https://api.example.com/protected", 
    headers, 
    timeout: 30);

// POST request with headers and timeout
string postResponse = await httpClient.PostJsonToStringAsync(
    "https://api.example.com/data", 
    userData, 
    headers, 
    timeout: 30);
```

## Detailed Usage

### 1. GET Request Extension Methods

#### Getting a String Response

```csharp
// Basic GET request
string response1 = await httpClient.GetToStringAsync<string>("https://api.example.com/data");

// GET request with headers and timeout
var headers = new Dictionary<string, string>
{
    ["Accept"] = "application/json",
    ["Authorization"] = "Bearer token"
};
string response2 = await httpClient.GetToStringAsync<string>(
    "https://api.example.com/data", 
    headers, 
    timeout: 30);
```

#### Getting a Byte Array Response

```csharp
// Basic GET request returning a byte array
byte[] data1 = await httpClient.GetToByteArrayAsync<byte[]>("https://api.example.com/file");

// GET request with headers returning a byte array
byte[] data2 = await httpClient.GetToByteArrayAsync<byte[]>(
    "https://api.example.com/file", 
    headers, 
    timeout: 60);
```

#### Getting a Stream Response

```csharp
// Basic GET request returning a stream
using Stream stream1 = await httpClient.GetToStreamAsync<Stream>("https://api.example.com/download");

// GET request with headers returning a stream
using Stream stream2 = await httpClient.GetToStreamAsync<Stream>(
    "https://api.example.com/download", 
    headers, 
    timeout: 120);
```

### 2. POST Request Extension Methods

#### JSON Data POST Request

```csharp
// Define data model
public class UserInfo
{
    public string Name { get; set; }
    public int Age { get; set; }
    public string Email { get; set; }
}

var user = new UserInfo 
{ 
    Name = "张三", 
    Age = 25, 
    Email = "zhangsan@example.com" 
};

// Basic JSON POST request
string response1 = await httpClient.PostJsonToStringAsync("https://api.example.com/users", user);

// POST request with custom serialization options
var jsonOptions = new JsonSerializerOptions
{
    PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
    WriteIndented = true
};
string response2 = await httpClient.PostJsonToStringAsync(
    "https://api.example.com/users", 
    user, 
    jsonOptions);

// POST request with headers and timeout
string response3 = await httpClient.PostJsonToStringAsync(
    "https://api.example.com/users", 
    user, 
    headers, 
    timeout: 30);

// Fully configured POST request
string response4 = await httpClient.PostJsonToStringAsync(
    "https://api.example.com/users", 
    user, 
    headers, 
    jsonOptions, 
    timeout: 30);
```

#### Getting POST Responses in Different Formats

```csharp
// Get byte array response
byte[] responseBytes = await httpClient.PostJsonToByteArrayAsync(
    "https://api.example.com/data", 
    user);

// Get stream response
using Stream responseStream = await httpClient.PostJsonToStreamAsync(
    "https://api.example.com/data", 
    user);
```

#### Form Data POST Request

```csharp
// Form data
var formData = new Dictionary<string, string>
{
    ["username"] = "zhangsan",
    ["password"] = "123456",
    ["email"] = "zhangsan@example.com"
};

// Basic form POST request
string response1 = await httpClient.PostFormToStringAsync(
    "https://api.example.com/login", 
    formData);

// Form POST request with headers and timeout
string response2 = await httpClient.PostFormToStringAsync(
    "https://api.example.com/login", 
    formData, 
    headers, 
    timeout: 30);
```

### 3. File Upload

#### Single File Upload

```csharp
// Basic file upload
string response1 = await httpClient.PostFileToStringAsync(
    "https://api.example.com/upload", 
    @"C:\temp\document.pdf");

// File upload with headers and timeout
string response2 = await httpClient.PostFileToStringAsync(
    "https://api.example.com/upload", 
    @"C:\temp\document.pdf", 
    headers, 
    timeout: 300);
```

#### Multipart Form File Upload

```csharp
// Additional form data
var additionalData = new Dictionary<string, string>
{
    ["description"] = "用户头像",
    ["category"] = "avatar"
};

// Multipart file upload
string response = await httpClient.PostMultipartFileToStringAsync(
    "https://api.example.com/upload", 
    "file",                    // File field name
    @"C:\temp\avatar.jpg",     // File path
    additionalData);           // Additional form data
```

## Advanced Usage

### 1. Custom JSON Serialization Configuration

```csharp
public static class CustomJsonOptions
{
    public static readonly JsonSerializerOptions CamelCase = new JsonSerializerOptions
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        WriteIndented = true,
        DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull
    };
    
    public static readonly JsonSerializerOptions SnakeCase = new JsonSerializerOptions
    {
        PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower,
        WriteIndented = false
    };
}

// Use custom serialization options
string response = await httpClient.PostJsonToStringAsync(
    "https://api.example.com/data", 
    userData, 
    CustomJsonOptions.CamelCase);
```

### 2. Batch Request Processing

```csharp
public class BatchRequestProcessor
{
    private readonly HttpClient httpClient;
    
    public BatchRequestProcessor(HttpClient httpClient)
    {
        this.httpClient = httpClient;
    }
    
    public async Task<List<string>> ProcessBatchGetRequests(List<string> urls)
    {
        var tasks = urls.Select(url => 
            httpClient.GetToStringAsync<string>(url)).ToList();
        
        return (await Task.WhenAll(tasks)).ToList();
    }
    
    public async Task<List<string>> ProcessBatchPostRequests<T>(
        string baseUrl, 
        List<T> dataList)
    {
        var tasks = dataList.Select(data => 
            httpClient.PostJsonToStringAsync(baseUrl, data)).ToList();
        
        return (await Task.WhenAll(tasks)).ToList();
    }
}
```

### 3. Retry Mechanism

```csharp
public static class HttpClientRetryExtensions
{
    public static async Task<string> GetWithRetryAsync<T>(
        this HttpClient httpClient, 
        string url, 
        int maxRetries = 3, 
        TimeSpan delay = default)
    {
        if (delay == default) delay = TimeSpan.FromSeconds(1);
        
        for (int i = 0; i < maxRetries; i++)
        {
            try
            {
                return await httpClient.GetToStringAsync<T>(url);
            }
            catch (HttpRequestException) when (i < maxRetries - 1)
            {
                await Task.Delay(delay);
                delay = TimeSpan.FromMilliseconds(delay.TotalMilliseconds * 2); // Exponential backoff
            }
        }
        
        throw new InvalidOperationException($"Request failed after {maxRetries} retries");
    }
}
```

### 4. Response Caching

```csharp
public class CachedHttpClient
{
    private readonly HttpClient httpClient;
    private readonly MemoryCache cache;
    
    public CachedHttpClient(HttpClient httpClient)
    {
        this.httpClient = httpClient;
        this.cache = new MemoryCache(new MemoryCacheOptions
        {
            SizeLimit = 100
        });
    }
    
    public async Task<string> GetWithCacheAsync<T>(
        string url, 
        TimeSpan? expiration = null)
    {
        if (cache.TryGetValue(url, out string cachedResponse))
        {
            return cachedResponse;
        }
        
        var response = await httpClient.GetToStringAsync<T>(url);
        
        var cacheOptions = new MemoryCacheEntryOptions
        {
            AbsoluteExpirationRelativeToNow = expiration ?? TimeSpan.FromMinutes(5),
            Size = 1
        };
        
        cache.Set(url, response, cacheOptions);
        return response;
    }
}
```

### 5. Custom Response Handler

```csharp
public static class HttpClientResponseExtensions
{
    public static async Task<ApiResponse<T>> GetApiResponseAsync<T>(
        this HttpClient httpClient, 
        string url) where T : class
    {
        try
        {
            var response = await httpClient.GetToStringAsync<T>(url);
            var apiResponse = JsonSerializer.Deserialize<ApiResponse<T>>(response);
            return apiResponse;
        }
        catch (Exception ex)
        {
            return new ApiResponse<T>
            {
                Success = false,
                Message = ex.Message,
                Data = null
            };
        }
    }
}

public class ApiResponse<T>
{
    public bool Success { get; set; }
    public string Message { get; set; }
    public T Data { get; set; }
}
```

### 6. Request Interceptor

```csharp
public class InterceptorHttpClient
{
    private readonly HttpClient httpClient;
    private readonly List<Func<HttpRequestMessage, Task>> requestInterceptors;
    private readonly List<Func<HttpResponseMessage, Task>> responseInterceptors;
    
    public InterceptorHttpClient(HttpClient httpClient)
    {
        this.httpClient = httpClient;
        this.requestInterceptors = new List<Func<HttpRequestMessage, Task>>();
        this.responseInterceptors = new List<Func<HttpResponseMessage, Task>>();
    }
    
    public void AddRequestInterceptor(Func<HttpRequestMessage, Task> interceptor)
    {
        requestInterceptors.Add(interceptor);
    }
    
    public void AddResponseInterceptor(Func<HttpResponseMessage, Task> interceptor)
    {
        responseInterceptors.Add(interceptor);
    }
    
    public async Task<string> GetWithInterceptorsAsync(string url)
    {
        var request = new HttpRequestMessage(HttpMethod.Get, url);
        
        // Execute request interceptors
        foreach (var interceptor in requestInterceptors)
        {
            await interceptor(request);
        }
        
        var response = await httpClient.SendAsync(request);
        
        // Execute response interceptors
        foreach (var interceptor in responseInterceptors)
        {
            await interceptor(response);
        }
        
        return await response.Content.ReadAsStringAsync();
    }
}
```

### 7. Concurrency Limiting

```csharp
public class ThrottledHttpClient
{
    private readonly HttpClient httpClient;
    private readonly SemaphoreSlim semaphore;
    
    public ThrottledHttpClient(HttpClient httpClient, int maxConcurrency = 10)
    {
        this.httpClient = httpClient;
        this.semaphore = new SemaphoreSlim(maxConcurrency, maxConcurrency);
    }
    
    public async Task<string> GetWithThrottleAsync<T>(string url)
    {
        await semaphore.WaitAsync();
        try
        {
            return await httpClient.GetToStringAsync<T>(url);
        }
        finally
        {
            semaphore.Release();
        }
    }
}
```

## Best Practices

### HttpClient Lifecycle Management

It is recommended to use `IHttpClientFactory` to manage the HttpClient lifecycle and avoid socket exhaustion:

```csharp
// Recommended: Use IHttpClientFactory
public class ApiService
{
    private readonly HttpClient httpClient;
    
    public ApiService(IHttpClientFactory httpClientFactory)
    {
        httpClient = httpClientFactory.CreateClient("ApiClient");
    }
    
    public async Task<string> GetDataAsync()
    {
        return await httpClient.GetToStringAsync<string>("https://api.example.com/data");
    }
}

// Register in Startup.cs or Program.cs
services.AddHttpClient("ApiClient", client =>
{
    client.BaseAddress = new Uri("https://api.example.com/");
    client.DefaultRequestHeaders.Add("User-Agent", "MyApp/1.0");
});
```

### Unified Error Handling

Encapsulate unified exception handling logic to distinguish between network errors, timeouts, and serialization issues:

```csharp
public class ApiClient
{
    private readonly HttpClient httpClient;
    private readonly ILogger<ApiClient> logger;
    
    public ApiClient(HttpClient httpClient, ILogger<ApiClient> logger)
    {
        this.httpClient = httpClient;
        this.logger = logger;
    }
    
    public async Task<T> GetAsync<T>(string url) where T : class
    {
        try
        {
            var response = await httpClient.GetToStringAsync<T>(url);
            return JsonSerializer.Deserialize<T>(response);
        }
        catch (HttpRequestException ex)
        {
            logger.LogError(ex, "HTTP request failed: {Url}", url);
            throw new ApiException($"Request failed: {ex.Message}", ex);
        }
        catch (TaskCanceledException ex)
        {
            logger.LogError(ex, "Request timed out: {Url}", url);
            throw new ApiException("Request timed out", ex);
        }
        catch (JsonException ex)
        {
            logger.LogError(ex, "JSON deserialization failed: {Url}", url);
            throw new ApiException("Data format error", ex);
        }
    }
}

public class ApiException : Exception
{
    public ApiException(string message) : base(message) { }
    public ApiException(string message, Exception innerException) : base(message, innerException) { }
}
```

### Configuration Management

Externalize configuration such as API addresses, timeout settings, and default request headers:

```csharp
public class ApiConfiguration
{
    public string BaseUrl { get; set; }
    public int TimeoutSeconds { get; set; } = 30;
    public Dictionary<string, string> DefaultHeaders { get; set; } = new();
}

public class ConfiguredApiClient
{
    private readonly HttpClient httpClient;
    private readonly ApiConfiguration config;
    
    public ConfiguredApiClient(HttpClient httpClient, IOptions<ApiConfiguration> config)
    {
        this.httpClient = httpClient;
        this.config = config.Value;
        
        // Apply configuration
        httpClient.BaseAddress = new Uri(this.config.BaseUrl);
        httpClient.Timeout = TimeSpan.FromSeconds(this.config.TimeoutSeconds);
        
        foreach (var header in this.config.DefaultHeaders)
        {
            httpClient.DefaultRequestHeaders.Add(header.Key, header.Value);
        }
    }
    
    public async Task<string> GetAsync(string endpoint)
    {
        return await httpClient.GetToStringAsync<string>(endpoint);
    }
}
```

### Request/Response Logging

Log request duration and response information for easier troubleshooting:

```csharp
public class LoggingHttpClient
{
    private readonly HttpClient httpClient;
    private readonly ILogger<LoggingHttpClient> logger;
    
    public LoggingHttpClient(HttpClient httpClient, ILogger<LoggingHttpClient> logger)
    {
        this.httpClient = httpClient;
        this.logger = logger;
    }
    
    public async Task<string> GetWithLoggingAsync<T>(string url)
    {
        var stopwatch = Stopwatch.StartNew();
        
        logger.LogInformation("Starting GET request: {Url}", url);
        
        try
        {
            var response = await httpClient.GetToStringAsync<T>(url);
            
            stopwatch.Stop();
            logger.LogInformation("GET request succeeded: {Url}, duration: {ElapsedMs}ms, response length: {Length}", 
                url, stopwatch.ElapsedMilliseconds, response.Length);
            
            return response;
        }
        catch (Exception ex)
        {
            stopwatch.Stop();
            logger.LogError(ex, "GET request failed: {Url}, duration: {ElapsedMs}ms", 
                url, stopwatch.ElapsedMilliseconds);
            throw;
        }
    }
}
```

## API Reference

| Method | Return Type | Description |
|--------|-------------|-------------|
| `GetToStringAsync<T>(url)` | `Task<string>` | GET request, returns a string response |
| `GetToStringAsync<T>(url, headers, timeout)` | `Task<string>` | GET request, supports custom headers and timeout |
| `GetToByteArrayAsync<T>(url)` | `Task<byte[]>` | GET request, returns a byte array response |
| `GetToStreamAsync<T>(url)` | `Task<Stream>` | GET request, returns a stream response |
| `PostJsonToStringAsync(url, data)` | `Task<string>` | POST JSON data, returns a string |
| `PostJsonToStringAsync(url, data, options)` | `Task<string>` | POST JSON data, custom serialization options |
| `PostJsonToStringAsync(url, data, headers, timeout)` | `Task<string>` | POST JSON data, supports headers and timeout |
| `PostJsonToByteArrayAsync(url, data)` | `Task<byte[]>` | POST JSON data, returns a byte array |
| `PostJsonToStreamAsync(url, data)` | `Task<Stream>` | POST JSON data, returns a stream |
| `PostFormToStringAsync(url, formData)` | `Task<string>` | POST form data |
| `PostFormToStringAsync(url, formData, headers, timeout)` | `Task<string>` | POST form data, supports headers and timeout |
| `PostFileToStringAsync(url, filePath)` | `Task<string>` | Upload a single file |
| `PostFileToStringAsync(url, filePath, headers, timeout)` | `Task<string>` | Upload a single file, supports headers and timeout |
| `PostMultipartFileToStringAsync(url, fieldName, filePath, formData)` | `Task<string>` | Multipart form file upload |
