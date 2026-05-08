# HTTP拡張（HttpClient向け統一リクエスト拡張インフラストラクチャライブラリ）

[![.NET](https://img.shields.io/badge/.NET-8.0-blue.svg)](https://dotnet.microsoft.com/download)
[![License](https://img.shields.io/badge/license-Apache--2.0-green.svg)]()

GameFrameX.Foundation.Http.Extension は、HttpClient のための拡張メソッドを提供するインフラストラクチャライブラリです。統一された GET および POST リクエストインターフェースを提供し、HTTP リクエスト操作を簡素化し、複数のデータ形式とレスポンスタイプをサポートします。

## 特徴

- **GETリクエスト拡張** - 複数の GET リクエストメソッドを提供し、文字列、バイト配列、ストリームなどのレスポンス形式をサポート
- **POSTリクエスト拡張** - JSON、フォーム、ファイルなど複数の POST リクエスト方式をサポート
- **型安全性** - ジェネリックサポートによるデータ型の安全性を確保
- **柔軟な設定** - カスタムリクエストヘッダー、タイムアウト時間、シリアライズオプションをサポート
- **複数のレスポンス形式** - 文字列、バイト配列、ストリームなど複数のレスポンス形式をサポート
- **ファイルアップロード** - 単一ファイルおよび Multipart フォームファイルアップロードをサポート
- **非同期サポート** - 非同期操作とキャンセルトークンを全面的にサポート
- **エラー処理** - 完備したパラメータ検証と例外処理

## インストール

```bash
dotnet add package GameFrameX.Foundation.Http.Extension
```

## クイックスタート

### 基本的な使用方法

```csharp
using GameFrameX.Foundation.Http.Extension;

// HttpClientインスタンスの作成
using var httpClient = new HttpClient();

// GETリクエストで文字列を取得
string response = await httpClient.GetToStringAsync<string>("https://api.example.com/users");
Console.WriteLine(response);

// POST JSONデータ
var userData = new { Name = "張三", Age = 25 };
string postResponse = await httpClient.PostJsonToStringAsync("https://api.example.com/users", userData);
Console.WriteLine(postResponse);
```

### リクエストヘッダーとタイムアウト付きリクエスト

```csharp
// カスタムリクエストヘッダー
var headers = new Dictionary<string, string>
{
    ["Authorization"] = "Bearer your-token",
    ["User-Agent"] = "MyApp/1.0"
};

// リクエストヘッダーとタイムアウト付きGETリクエスト
string response = await httpClient.GetToStringAsync<string>(
    "https://api.example.com/protected", 
    headers, 
    timeout: 30);

// リクエストヘッダーとタイムアウト付きPOSTリクエスト
string postResponse = await httpClient.PostJsonToStringAsync(
    "https://api.example.com/data", 
    userData, 
    headers, 
    timeout: 30);
```

## 詳細な使い方

### 1. GETリクエスト拡張メソッド

#### 文字列レスポンスの取得

```csharp
// 基本GETリクエスト
string response1 = await httpClient.GetToStringAsync<string>("https://api.example.com/data");

// リクエストヘッダーとタイムアウト付きGETリクエスト
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

#### バイト配列レスポンスの取得

```csharp
// 基本GETリクエストでバイト配列を取得
byte[] data1 = await httpClient.GetToByteArrayAsync<byte[]>("https://api.example.com/file");

// リクエストヘッダー付きGETリクエストでバイト配列を取得
byte[] data2 = await httpClient.GetToByteArrayAsync<byte[]>(
    "https://api.example.com/file", 
    headers, 
    timeout: 60);
```

#### ストリームレスポンスの取得

```csharp
// 基本GETリクエストでストリームを取得
using Stream stream1 = await httpClient.GetToStreamAsync<Stream>("https://api.example.com/download");

// リクエストヘッダー付きGETリクエストでストリームを取得
using Stream stream2 = await httpClient.GetToStreamAsync<Stream>(
    "https://api.example.com/download", 
    headers, 
    timeout: 120);
```

### 2. POSTリクエスト拡張メソッド

#### JSONデータPOSTリクエスト

```csharp
// データモデルの定義
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

// 基本JSON POSTリクエスト
string response1 = await httpClient.PostJsonToStringAsync("https://api.example.com/users", user);

// カスタムシリアライズオプション付きPOSTリクエスト
var jsonOptions = new JsonSerializerOptions
{
    PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
    WriteIndented = true
};
string response2 = await httpClient.PostJsonToStringAsync(
    "https://api.example.com/users", 
    user, 
    jsonOptions);

// リクエストヘッダーとタイムアウト付きPOSTリクエスト
string response3 = await httpClient.PostJsonToStringAsync(
    "https://api.example.com/users", 
    user, 
    headers, 
    timeout: 30);

// 完全設定のPOSTリクエスト
string response4 = await httpClient.PostJsonToStringAsync(
    "https://api.example.com/users", 
    user, 
    headers, 
    jsonOptions, 
    timeout: 30);
```

#### 異なる形式のPOSTレスポンスの取得

```csharp
// バイト配列レスポンスの取得
byte[] responseBytes = await httpClient.PostJsonToByteArrayAsync(
    "https://api.example.com/data", 
    user);

// ストリームレスポンスの取得
using Stream responseStream = await httpClient.PostJsonToStreamAsync(
    "https://api.example.com/data", 
    user);
```

#### フォームデータPOSTリクエスト

```csharp
// フォームデータ
var formData = new Dictionary<string, string>
{
    ["username"] = "zhangsan",
    ["password"] = "123456",
    ["email"] = "zhangsan@example.com"
};

// 基本フォームPOSTリクエスト
string response1 = await httpClient.PostFormToStringAsync(
    "https://api.example.com/login", 
    formData);

// リクエストヘッダーとタイムアウト付きフォームPOSTリクエスト
string response2 = await httpClient.PostFormToStringAsync(
    "https://api.example.com/login", 
    formData, 
    headers, 
    timeout: 30);
```

### 3. ファイルアップロード

#### 単一ファイルアップロード

```csharp
// 基本ファイルアップロード
string response1 = await httpClient.PostFileToStringAsync(
    "https://api.example.com/upload", 
    @"C:\temp\document.pdf");

// リクエストヘッダーとタイムアウト付きファイルアップロード
string response2 = await httpClient.PostFileToStringAsync(
    "https://api.example.com/upload", 
    @"C:\temp\document.pdf", 
    headers, 
    timeout: 300);
```

#### Multipartフォームファイルアップロード

```csharp
// 追加フォームデータ
var additionalData = new Dictionary<string, string>
{
    ["description"] = "ユーザーアバター",
    ["category"] = "avatar"
};

// Multipartファイルアップロード
string response = await httpClient.PostMultipartFileToStringAsync(
    "https://api.example.com/upload", 
    "file",                    // ファイルフィールド名
    @"C:\temp\avatar.jpg",     // ファイルパス
    additionalData);           // 追加フォームデータ
```

## 高度な使い方

### 1. カスタムJSONシリアライズ設定

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

// カスタムシリアライズオプションを使用
string response = await httpClient.PostJsonToStringAsync(
    "https://api.example.com/data", 
    userData, 
    CustomJsonOptions.CamelCase);
```

### 2. バッチリクエスト処理

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

### 3. リトライ機構

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
                delay = TimeSpan.FromMilliseconds(delay.TotalMilliseconds * 2); // 指数バックオフ
            }
        }
        
        throw new InvalidOperationException($"リクエストに失敗しました。{maxRetries} 回リトライ済み");
    }
}
```

### 4. レスポンスキャッシュ

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

### 5. カスタムレスポンスハンドラー

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

### 6. リクエストインターセプター

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
        
        // リクエストインターセプターを実行
        foreach (var interceptor in requestInterceptors)
        {
            await interceptor(request);
        }
        
        var response = await httpClient.SendAsync(request);
        
        // レスポンスインターセプターを実行
        foreach (var interceptor in responseInterceptors)
        {
            await interceptor(response);
        }
        
        return await response.Content.ReadAsStringAsync();
    }
}
```

### 7. 同時実行制限

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

## ベストプラクティス

### HttpClientライフサイクル管理

`IHttpClientFactory` を使用して HttpClient のライフサイクルを管理し、ソケット枯渇を防止することを推奨します：

```csharp
// 推奨：IHttpClientFactoryを使用
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

// Startup.csまたはProgram.csで登録
services.AddHttpClient("ApiClient", client =>
{
    client.BaseAddress = new Uri("https://api.example.com/");
    client.DefaultRequestHeaders.Add("User-Agent", "MyApp/1.0");
});
```

### 統一エラー処理

統一された例外処理ロジックをカプセル化し、ネットワークエラー、タイムアウト、シリアライズの問題を区別します：

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
            logger.LogError(ex, "HTTPリクエストに失敗しました: {Url}", url);
            throw new ApiException($"リクエストに失敗しました: {ex.Message}", ex);
        }
        catch (TaskCanceledException ex)
        {
            logger.LogError(ex, "リクエストがタイムアウトしました: {Url}", url);
            throw new ApiException("リクエストがタイムアウトしました", ex);
        }
        catch (JsonException ex)
        {
            logger.LogError(ex, "JSONデシリアライズに失敗しました: {Url}", url);
            throw new ApiException("データ形式エラー", ex);
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

APIアドレス、タイムアウト、デフォルトリクエストヘッダーなどの設定を外部化します：

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
        
        // 設定を適用
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

### リクエスト/レスポンスログ記録

リクエストの所要時間とレスポンス情報を記録し、問題の切り分けに役立てます：

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
        
        logger.LogInformation("GETリクエスト開始: {Url}", url);
        
        try
        {
            var response = await httpClient.GetToStringAsync<T>(url);
            
            stopwatch.Stop();
            logger.LogInformation("GETリクエスト成功: {Url}, 所要時間: {ElapsedMs}ms, レスポンス長: {Length}", 
                url, stopwatch.ElapsedMilliseconds, response.Length);
            
            return response;
        }
        catch (Exception ex)
        {
            stopwatch.Stop();
            logger.LogError(ex, "GETリクエスト失敗: {Url}, 所要時間: {ElapsedMs}ms", 
                url, stopwatch.ElapsedMilliseconds);
            throw;
        }
    }
}
```

## API リファレンス

| メソッド | 戻り値の型 | 説明 |
|------|----------|------|
| `GetToStringAsync<T>(url)` | ``Task<string>`` | GET リクエスト、文字列レスポンスを返す |
| `GetToStringAsync<T>(url, headers, timeout)` | ``Task<string>`` | GET リクエスト、カスタムヘッダーとタイムアウトをサポート |
| `GetToByteArrayAsync<T>(url)` | ``Task<byte[]>`` | GET リクエスト、バイト配列レスポンスを返す |
| `GetToStreamAsync<T>(url)` | ``Task<Stream>`` | GET リクエスト、ストリームレスポンスを返す |
| `PostJsonToStringAsync(url, data)` | ``Task<string>`` | POST JSON データ、文字列を返す |
| `PostJsonToStringAsync(url, data, options)` | ``Task<string>`` | POST JSON データ、カスタムシリアライズオプション |
| `PostJsonToStringAsync(url, data, headers, timeout)` | ``Task<string>`` | POST JSON データ、ヘッダーとタイムアウトをサポート |
| `PostJsonToByteArrayAsync(url, data)` | ``Task<byte[]>`` | POST JSON データ、バイト配列を返す |
| `PostJsonToStreamAsync(url, data)` | ``Task<Stream>`` | POST JSON データ、ストリームを返す |
| `PostFormToStringAsync(url, formData)` | ``Task<string>`` | POST フォームデータ |
| `PostFormToStringAsync(url, formData, headers, timeout)` | ``Task<string>`` | POST フォームデータ、ヘッダーとタイムアウトをサポート |
| `PostFileToStringAsync(url, filePath)` | ``Task<string>`` | 単一ファイルのアップロード |
| `PostFileToStringAsync(url, filePath, headers, timeout)` | ``Task<string>`` | 単一ファイルのアップロード、ヘッダーとタイムアウトをサポート |
| `PostMultipartFileToStringAsync(url, fieldName, filePath, formData)` | ``Task<string>`` | Multipart フォームファイルアップロード |
