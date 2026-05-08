# HTTP 확장 (HttpClient에 통합 요청 확장을 제공하는 기반 라이브러리)

[![.NET](https://img.shields.io/badge/.NET-8.0-blue.svg)](https://dotnet.microsoft.com/download)
[![License](https://img.shields.io/badge/license-Apache--2.0-green.svg)]()

GameFrameX.Foundation.Http.Extension은 HttpClient에 확장 메서드를 제공하는 기반 라이브러리로, 통합된 GET 및 POST 요청 인터페이스를 제공하여 HTTP 요청 작업을 간소화합니다. 다양한 데이터 형식과 응답 형식을 지원합니다.

## 특징

- **GET 요청 확장** - 다양한 GET 요청 메서드 제공, 문자열, 바이트 배열, 스트림 등의 응답 형식 지원
- **POST 요청 확장** - JSON, 폼, 파일 등 다양한 POST 요청 방식 지원
- **형식 안전성** - 제네릭 지원으로 데이터 형식 안전성 보장
- **유연한 설정** - 사용자 정의 요청 헤더, 타임아웃, 직렬화 옵션 지원
- **다양한 응답 형식** - 문자열, 바이트 배열, 스트림 등 다양한 응답 형식 지원
- **파일 업로드** - 단일 파일 및 Multipart 폼 파일 업로드 지원
- **비동기 지원** - 비동기 작업 및 취소 토큰 완전 지원
- **오류 처리** - 완전한 매개변수 검증 및 예외 처리

## 설치

```bash
dotnet add package GameFrameX.Foundation.Http.Extension
```

## 빠른 시작

### 기본 사용

```csharp
using GameFrameX.Foundation.Http.Extension;

// HttpClient 인스턴스 생성
using var httpClient = new HttpClient();

// GET 요청으로 문자열 가져오기
string response = await httpClient.GetToStringAsync<string>("https://api.example.com/users");
Console.WriteLine(response);

// POST JSON 데이터
var userData = new { Name = "홍길동", Age = 25 };
string postResponse = await httpClient.PostJsonToStringAsync("https://api.example.com/users", userData);
Console.WriteLine(postResponse);
```

### 요청 헤더 및 타임아웃이 포함된 요청

```csharp
// 사용자 정의 요청 헤더
var headers = new Dictionary<string, string>
{
    ["Authorization"] = "Bearer your-token",
    ["User-Agent"] = "MyApp/1.0"
};

// 요청 헤더와 타임아웃이 포함된 GET 요청
string response = await httpClient.GetToStringAsync<string>(
    "https://api.example.com/protected",
    headers,
    timeout: 30);

// 요청 헤더와 타임아웃이 포함된 POST 요청
string postResponse = await httpClient.PostJsonToStringAsync(
    "https://api.example.com/data",
    userData,
    headers,
    timeout: 30);
```

## 상세 사용법

### 1. GET 요청 확장 메서드

#### 문자열 응답 가져오기

```csharp
// 기본 GET 요청
string response1 = await httpClient.GetToStringAsync<string>("https://api.example.com/data");

// 요청 헤더와 타임아웃이 포함된 GET 요청
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

#### 바이트 배열 응답 가져오기

```csharp
// 기본 GET 요청으로 바이트 배열 가져오기
byte[] data1 = await httpClient.GetToByteArrayAsync<byte[]>("https://api.example.com/file");

// 요청 헤더가 포함된 GET 요청으로 바이트 배열 가져오기
byte[] data2 = await httpClient.GetToByteArrayAsync<byte[]>(
    "https://api.example.com/file",
    headers,
    timeout: 60);
```

#### 스트림 응답 가져오기

```csharp
// 기본 GET 요청으로 스트림 가져오기
using Stream stream1 = await httpClient.GetToStreamAsync<Stream>("https://api.example.com/download");

// 요청 헤더가 포함된 GET 요청으로 스트림 가져오기
using Stream stream2 = await httpClient.GetToStreamAsync<Stream>(
    "https://api.example.com/download",
    headers,
    timeout: 120);
```

### 2. POST 요청 확장 메서드

#### JSON 데이터 POST 요청

```csharp
// 데이터 모델 정의
public class UserInfo
{
    public string Name { get; set; }
    public int Age { get; set; }
    public string Email { get; set; }
}

var user = new UserInfo
{
    Name = "홍길동",
    Age = 25,
    Email = "hong@example.com"
};

// 기본 JSON POST 요청
string response1 = await httpClient.PostJsonToStringAsync("https://api.example.com/users", user);

// 사용자 정의 직렬화 옵션이 포함된 POST 요청
var jsonOptions = new JsonSerializerOptions
{
    PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
    WriteIndented = true
};
string response2 = await httpClient.PostJsonToStringAsync(
    "https://api.example.com/users",
    user,
    jsonOptions);

// 요청 헤더와 타임아웃이 포함된 POST 요청
string response3 = await httpClient.PostJsonToStringAsync(
    "https://api.example.com/users",
    user,
    headers,
    timeout: 30);

// 전체 설정이 포함된 POST 요청
string response4 = await httpClient.PostJsonToStringAsync(
    "https://api.example.com/users",
    user,
    headers,
    jsonOptions,
    timeout: 30);
```

#### 다양한 형식의 POST 응답 가져오기

```csharp
// 바이트 배열 응답 가져오기
byte[] responseBytes = await httpClient.PostJsonToByteArrayAsync(
    "https://api.example.com/data",
    user);

// 스트림 응답 가져오기
using Stream responseStream = await httpClient.PostJsonToStreamAsync(
    "https://api.example.com/data",
    user);
```

#### 폼 데이터 POST 요청

```csharp
// 폼 데이터
var formData = new Dictionary<string, string>
{
    ["username"] = "honggildong",
    ["password"] = "123456",
    ["email"] = "hong@example.com"
};

// 기본 폼 POST 요청
string response1 = await httpClient.PostFormToStringAsync(
    "https://api.example.com/login",
    formData);

// 요청 헤더와 타임아웃이 포함된 폼 POST 요청
string response2 = await httpClient.PostFormToStringAsync(
    "https://api.example.com/login",
    formData,
    headers,
    timeout: 30);
```

### 3. 파일 업로드

#### 단일 파일 업로드

```csharp
// 기본 파일 업로드
string response1 = await httpClient.PostFileToStringAsync(
    "https://api.example.com/upload",
    @"C:\temp\document.pdf");

// 요청 헤더와 타임아웃이 포함된 파일 업로드
string response2 = await httpClient.PostFileToStringAsync(
    "https://api.example.com/upload",
    @"C:\temp\document.pdf",
    headers,
    timeout: 300);
```

#### Multipart 폼 파일 업로드

```csharp
// 추가 폼 데이터
var additionalData = new Dictionary<string, string>
{
    ["description"] = "사용자 아바타",
    ["category"] = "avatar"
};

// Multipart 파일 업로드
string response = await httpClient.PostMultipartFileToStringAsync(
    "https://api.example.com/upload",
    "file",                    // 파일 필드명
    @"C:\temp\avatar.jpg",     // 파일 경로
    additionalData);           // 추가 폼 데이터
```

## 고급 사용법

### 1. 사용자 정의 JSON 직렬화 설정

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

// 사용자 정의 직렬화 옵션 사용
string response = await httpClient.PostJsonToStringAsync(
    "https://api.example.com/data",
    userData,
    CustomJsonOptions.CamelCase);
```

### 2. 일괄 요청 처리

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

### 3. 재시도 메커니즘

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
                delay = TimeSpan.FromMilliseconds(delay.TotalMilliseconds * 2); // 지수 백오프
            }
        }

        throw new InvalidOperationException($"요청 실패, {maxRetries}회 재시도 완료");
    }
}
```

### 4. 응답 캐싱

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

### 5. 사용자 정의 응답 처리기

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

### 6. 요청 인터셉터

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

        // 요청 인터셉터 실행
        foreach (var interceptor in requestInterceptors)
        {
            await interceptor(request);
        }

        var response = await httpClient.SendAsync(request);

        // 응답 인터셉터 실행
        foreach (var interceptor in responseInterceptors)
        {
            await interceptor(response);
        }

        return await response.Content.ReadAsStringAsync();
    }
}
```

### 7. 동시성 제한

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

## 모범 사례

### HttpClient 수명 주기 관리

소켓 고갈을 방지하기 위해 `IHttpClientFactory`를 사용하여 HttpClient 수명 주기를 관리하는 것을 권장합니다:

```csharp
// 권장: IHttpClientFactory 사용
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

// Startup.cs 또는 Program.cs에 등록
services.AddHttpClient("ApiClient", client =>
{
    client.BaseAddress = new Uri("https://api.example.com/");
    client.DefaultRequestHeaders.Add("User-Agent", "MyApp/1.0");
});
```

### 통합 오류 처리

통합된 예외 처리 로직을 캡슐화하여 네트워크 오류, 타임아웃 및 직렬화 문제를 구분합니다:

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
            logger.LogError(ex, "HTTP 요청 실패: {Url}", url);
            throw new ApiException($"요청 실패: {ex.Message}", ex);
        }
        catch (TaskCanceledException ex)
        {
            logger.LogError(ex, "요청 시간 초과: {Url}", url);
            throw new ApiException("요청 시간 초과", ex);
        }
        catch (JsonException ex)
        {
            logger.LogError(ex, "JSON 역직렬화 실패: {Url}", url);
            throw new ApiException("데이터 형식 오류", ex);
        }
    }
}

public class ApiException : Exception
{
    public ApiException(string message) : base(message) { }
    public ApiException(string message, Exception innerException) : base(message, innerException) { }
}
```

### 설정 관리

API 주소, 타임아웃 및 기본 요청 헤더 등의 설정을 외부화합니다:

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

        // 설정 적용
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

### 요청/응답 로깅

요청 소요 시간과 응답 정보를 기록하여 문제 해결을 용이하게 합니다:

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

        logger.LogInformation("GET 요청 시작: {Url}", url);

        try
        {
            var response = await httpClient.GetToStringAsync<T>(url);

            stopwatch.Stop();
            logger.LogInformation("GET 요청 성공: {Url}, 소요 시간: {ElapsedMs}ms, 응답 길이: {Length}",
                url, stopwatch.ElapsedMilliseconds, response.Length);

            return response;
        }
        catch (Exception ex)
        {
            stopwatch.Stop();
            logger.LogError(ex, "GET 요청 실패: {Url}, 소요 시간: {ElapsedMs}ms",
                url, stopwatch.ElapsedMilliseconds);
            throw;
        }
    }
}
```

## API 레퍼런스

| 메서드 | 반환 형식 | 설명 |
|------|----------|------|
| `GetToStringAsync<T>(url)` | `Task<string>` | GET 요청, 문자열 응답 반환 |
| `GetToStringAsync<T>(url, headers, timeout)` | `Task<string>` | GET 요청, 사용자 정의 헤더 및 타임아웃 지원 |
| `GetToByteArrayAsync<T>(url)` | `Task<byte[]>` | GET 요청, 바이트 배열 응답 반환 |
| `GetToStreamAsync<T>(url)` | `Task<Stream>` | GET 요청, 스트림 응답 반환 |
| `PostJsonToStringAsync(url, data)` | `Task<string>` | POST JSON 데이터, 문자열 반환 |
| `PostJsonToStringAsync(url, data, options)` | `Task<string>` | POST JSON 데이터, 사용자 정의 직렬화 옵션 |
| `PostJsonToStringAsync(url, data, headers, timeout)` | `Task<string>` | POST JSON 데이터, 헤더 및 타임아웃 지원 |
| `PostJsonToByteArrayAsync(url, data)` | `Task<byte[]>` | POST JSON 데이터, 바이트 배열 반환 |
| `PostJsonToStreamAsync(url, data)` | `Task<Stream>` | POST JSON 데이터, 스트림 반환 |
| `PostFormToStringAsync(url, formData)` | `Task<string>` | POST 폼 데이터 |
| `PostFormToStringAsync(url, formData, headers, timeout)` | `Task<string>` | POST 폼 데이터, 헤더 및 타임아웃 지원 |
| `PostFileToStringAsync(url, filePath)` | `Task<string>` | 단일 파일 업로드 |
| `PostFileToStringAsync(url, filePath, headers, timeout)` | `Task<string>` | 단일 파일 업로드, 헤더 및 타임아웃 지원 |
| `PostMultipartFileToStringAsync(url, fieldName, filePath, formData)` | `Task<string>` | Multipart 폼 파일 업로드 |
