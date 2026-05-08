# HTTP 擴充（為 HttpClient 提供統一請求擴充的基礎設施庫）

[![.NET](https://img.shields.io/badge/.NET-8.0-blue.svg)](https://dotnet.microsoft.com/download)
[![License](https://img.shields.io/badge/license-Apache--2.0-green.svg)]()

GameFrameX.Foundation.Http.Extension 是一個為 HttpClient 提供擴充方法的基礎設施庫，提供了統一的 GET 和 POST 請求介面，簡化 HTTP 請求操作，支援多種資料格式和回應型別。

## 特性

- **GET 請求擴充** - 提供多種 GET 請求方法，支援字串、位元組陣列、串流等回應格式
- **POST 請求擴充** - 支援 JSON、表單、檔案等多種 POST 請求方式
- **型別安全** - 泛型支援，確保資料型別安全
- **彈性設定** - 支援自訂請求標頭、逾時時間、序列化選項
- **多種回應格式** - 支援字串、位元組陣列、串流等多種回應格式
- **檔案上傳** - 支援單檔案和 Multipart 表單檔案上傳
- **非同步支援** - 全面支援非同步操作和取消令牌
- **錯誤處理** - 完善的參數驗證和例外處理

## 安裝

```bash
dotnet add package GameFrameX.Foundation.Http.Extension
```

## 快速開始

### 基本使用

```csharp
using GameFrameX.Foundation.Http.Extension;

// 建立 HttpClient 實例
using var httpClient = new HttpClient();

// GET 請求取得字串
string response = await httpClient.GetToStringAsync<string>("https://api.example.com/users");
Console.WriteLine(response);

// POST JSON 資料
var userData = new { Name = "張三", Age = 25 };
string postResponse = await httpClient.PostJsonToStringAsync("https://api.example.com/users", userData);
Console.WriteLine(postResponse);
```

### 帶請求標頭和逾時的請求

```csharp
// 自訂請求標頭
var headers = new Dictionary<string, string>
{
    ["Authorization"] = "Bearer your-token",
    ["User-Agent"] = "MyApp/1.0"
};

// GET 請求帶請求標頭和逾時
string response = await httpClient.GetToStringAsync<string>(
    "https://api.example.com/protected", 
    headers, 
    timeout: 30);

// POST 請求帶請求標頭和逾時
string postResponse = await httpClient.PostJsonToStringAsync(
    "https://api.example.com/data", 
    userData, 
    headers, 
    timeout: 30);
```

## 詳細用法

### 1. GET 請求擴充方法

#### 取得字串回應

```csharp
// 基本 GET 請求
string response1 = await httpClient.GetToStringAsync<string>("https://api.example.com/data");

// 帶請求標頭和逾時的 GET 請求
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

#### 取得位元組陣列回應

```csharp
// 基本 GET 請求取得位元組陣列
byte[] data1 = await httpClient.GetToByteArrayAsync<byte[]>("https://api.example.com/file");

// 帶請求標頭的 GET 請求取得位元組陣列
byte[] data2 = await httpClient.GetToByteArrayAsync<byte[]>(
    "https://api.example.com/file", 
    headers, 
    timeout: 60);
```

#### 取得串流回應

```csharp
// 基本 GET 請求取得串流
using Stream stream1 = await httpClient.GetToStreamAsync<Stream>("https://api.example.com/download");

// 帶請求標頭的 GET 請求取得串流
using Stream stream2 = await httpClient.GetToStreamAsync<Stream>(
    "https://api.example.com/download", 
    headers, 
    timeout: 120);
```

### 2. POST 請求擴充方法

#### JSON 資料 POST 請求

```csharp
// 定義資料模型
public class UserInfo
{
    public string Name { get; set; }
    public int Age { get; set; }
    public string Email { get; set; }
}

var user = new UserInfo 
{ 
    Name = "張三", 
    Age = 25, 
    Email = "zhangsan@example.com" 
};

// 基本 JSON POST 請求
string response1 = await httpClient.PostJsonToStringAsync("https://api.example.com/users", user);

// 帶自訂序列化選項的 POST 請求
var jsonOptions = new JsonSerializerOptions
{
    PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
    WriteIndented = true
};
string response2 = await httpClient.PostJsonToStringAsync(
    "https://api.example.com/users", 
    user, 
    jsonOptions);

// 帶請求標頭和逾時的 POST 請求
string response3 = await httpClient.PostJsonToStringAsync(
    "https://api.example.com/users", 
    user, 
    headers, 
    timeout: 30);

// 完整設定的 POST 請求
string response4 = await httpClient.PostJsonToStringAsync(
    "https://api.example.com/users", 
    user, 
    headers, 
    jsonOptions, 
    timeout: 30);
```

#### 取得不同格式的 POST 回應

```csharp
// 取得位元組陣列回應
byte[] responseBytes = await httpClient.PostJsonToByteArrayAsync(
    "https://api.example.com/data", 
    user);

// 取得串流回應
using Stream responseStream = await httpClient.PostJsonToStreamAsync(
    "https://api.example.com/data", 
    user);
```

#### 表單資料 POST 請求

```csharp
// 表單資料
var formData = new Dictionary<string, string>
{
    ["username"] = "zhangsan",
    ["password"] = "123456",
    ["email"] = "zhangsan@example.com"
};

// 基本表單 POST 請求
string response1 = await httpClient.PostFormToStringAsync(
    "https://api.example.com/login", 
    formData);

// 帶請求標頭和逾時的表單 POST 請求
string response2 = await httpClient.PostFormToStringAsync(
    "https://api.example.com/login", 
    formData, 
    headers, 
    timeout: 30);
```

### 3. 檔案上傳

#### 單檔案上傳

```csharp
// 基本檔案上傳
string response1 = await httpClient.PostFileToStringAsync(
    "https://api.example.com/upload", 
    @"C:\temp\document.pdf");

// 帶請求標頭和逾時的檔案上傳
string response2 = await httpClient.PostFileToStringAsync(
    "https://api.example.com/upload", 
    @"C:\temp\document.pdf", 
    headers, 
    timeout: 300);
```

#### Multipart 表單檔案上傳

```csharp
// 額外的表單資料
var additionalData = new Dictionary<string, string>
{
    ["description"] = "使用者頭像",
    ["category"] = "avatar"
};

// Multipart 檔案上傳
string response = await httpClient.PostMultipartFileToStringAsync(
    "https://api.example.com/upload", 
    "file",                    // 檔案欄位名稱
    @"C:\temp\avatar.jpg",     // 檔案路徑
    additionalData);           // 額外表單資料
```

## 進階用法

### 1. 自訂 JSON 序列化設定

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

// 使用自訂序列化選項
string response = await httpClient.PostJsonToStringAsync(
    "https://api.example.com/data", 
    userData, 
    CustomJsonOptions.CamelCase);
```

### 2. 批次請求處理

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

### 3. 重試機制

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
                delay = TimeSpan.FromMilliseconds(delay.TotalMilliseconds * 2); // 指數退避
            }
        }
        
        throw new InvalidOperationException($"請求失敗，已重試 {maxRetries} 次");
    }
}
```

### 4. 回應快取

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

### 5. 自訂回應處理器

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

### 6. 請求攔截器

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
        
        // 執行請求攔截器
        foreach (var interceptor in requestInterceptors)
        {
            await interceptor(request);
        }
        
        var response = await httpClient.SendAsync(request);
        
        // 執行回應攔截器
        foreach (var interceptor in responseInterceptors)
        {
            await interceptor(response);
        }
        
        return await response.Content.ReadAsStringAsync();
    }
}
```

### 7. 並行限制

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

## 最佳實踐

### HttpClient 生命週期管理

建議使用 `IHttpClientFactory` 管理 HttpClient 生命週期，避免通訊端耗盡：

```csharp
// 建議：使用 IHttpClientFactory
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

// 在 Startup.cs 或 Program.cs 中註冊
services.AddHttpClient("ApiClient", client =>
{
    client.BaseAddress = new Uri("https://api.example.com/");
    client.DefaultRequestHeaders.Add("User-Agent", "MyApp/1.0");
});
```

### 統一錯誤處理

封裝統一的例外處理邏輯，區分網路錯誤、逾時和序列化問題：

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
            logger.LogError(ex, "HTTP 請求失敗: {Url}", url);
            throw new ApiException($"請求失敗: {ex.Message}", ex);
        }
        catch (TaskCanceledException ex)
        {
            logger.LogError(ex, "請求逾時: {Url}", url);
            throw new ApiException("請求逾時", ex);
        }
        catch (JsonException ex)
        {
            logger.LogError(ex, "JSON 反序列化失敗: {Url}", url);
            throw new ApiException("資料格式錯誤", ex);
        }
    }
}

public class ApiException : Exception
{
    public ApiException(string message) : base(message) { }
    public ApiException(string message, Exception innerException) : base(message, innerException) { }
}
```

### 設定管理

將 API 位址、逾時時間和預設請求標頭等設定外部化：

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
        
        // 套用設定
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

### 請求/回應日誌記錄

記錄請求耗時和回應資訊，便於排查問題：

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
        
        logger.LogInformation("開始 GET 請求: {Url}", url);
        
        try
        {
            var response = await httpClient.GetToStringAsync<T>(url);
            
            stopwatch.Stop();
            logger.LogInformation("GET 請求成功: {Url}, 耗時: {ElapsedMs}ms, 回應長度: {Length}", 
                url, stopwatch.ElapsedMilliseconds, response.Length);
            
            return response;
        }
        catch (Exception ex)
        {
            stopwatch.Stop();
            logger.LogError(ex, "GET 請求失敗: {Url}, 耗時: {ElapsedMs}ms", 
                url, stopwatch.ElapsedMilliseconds);
            throw;
        }
    }
}
```

## API 參考

| 方法 | 回傳型別 | 說明 |
|------|----------|------|
| `GetToStringAsync<T>(url)` | ``Task<string>`` | GET 請求，回傳字串回應 |
| `GetToStringAsync<T>(url, headers, timeout)` | ``Task<string>`` | GET 請求，支援自訂請求標頭和逾時 |
| `GetToByteArrayAsync<T>(url)` | ``Task<byte[]>`` | GET 請求，回傳位元組陣列回應 |
| `GetToStreamAsync<T>(url)` | ``Task<Stream>`` | GET 請求，回傳串流回應 |
| `PostJsonToStringAsync(url, data)` | ``Task<string>`` | POST JSON 資料，回傳字串 |
| `PostJsonToStringAsync(url, data, options)` | ``Task<string>`` | POST JSON 資料，自訂序列化選項 |
| `PostJsonToStringAsync(url, data, headers, timeout)` | ``Task<string>`` | POST JSON 資料，支援請求標頭和逾時 |
| `PostJsonToByteArrayAsync(url, data)` | ``Task<byte[]>`` | POST JSON 資料，回傳位元組陣列 |
| `PostJsonToStreamAsync(url, data)` | ``Task<Stream>`` | POST JSON 資料，回傳串流 |
| `PostFormToStringAsync(url, formData)` | ``Task<string>`` | POST 表單資料 |
| `PostFormToStringAsync(url, formData, headers, timeout)` | ``Task<string>`` | POST 表單資料，支援請求標頭和逾時 |
| `PostFileToStringAsync(url, filePath)` | ``Task<string>`` | 上傳單一檔案 |
| `PostFileToStringAsync(url, filePath, headers, timeout)` | ``Task<string>`` | 上傳單一檔案，支援請求標頭和逾時 |
| `PostMultipartFileToStringAsync(url, fieldName, filePath, formData)` | ``Task<string>`` | Multipart 表單檔案上傳 |
