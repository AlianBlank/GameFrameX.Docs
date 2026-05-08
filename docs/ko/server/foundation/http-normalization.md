# HTTP 메시지 표준화 (통합 HTTP 응답 구조 기반 라이브러리)

[![.NET](https://img.shields.io/badge/.NET-8.0-blue.svg)](https://dotnet.microsoft.com/download) [![License](https://img.shields.io/badge/license-Apache--2.0-green.svg)]()

GameFrameX.Foundation.Http.Normalization은 통합 HTTP 응답 구조를 위한 기반 라이브러리로, 표준화된 JSON 응답 형식과 처리 도구를 제공하여 전체 프레임워크의 HTTP 응답 구조 일관성을 보장합니다.

## 특징

- **통합 응답 구조** - 표준화된 HTTP JSON 응답 형식 제공
- **다양한 응답 상태** - 성공, 실패, 오류 등 다양한 응답 상태 지원
- **형식 안전성** - 제네릭 지원으로 데이터 형식 안전성 보장
- **편의 메서드** - 풍부한 정적 메서드로 빠른 응답 생성 지원
- **확장 지원** - 사용자 정의 상태 코드 및 메시지 지원
- **직렬화 최적화** - System.Text.Json 기반의 고성능 직렬화
- **오류 처리** - 완전한 예외 처리 및 로그 기록
- **특성 지원** - 문서 생성을 위한 설명 특성 제공

## 설치

```bash
dotnet add package GameFrameX.Foundation.Http.Normalization
```

## 빠른 시작

### 기본 사용

```csharp
using GameFrameX.Foundation.Http.Normalization;

// 성공 응답 생성
var successResponse = HttpJsonResult.Success();
Console.WriteLine(successResponse.ToString());
// 출력: {"code":0,"message":"","data":null}

// 데이터가 포함된 성공 응답 생성
var user = new { Name = "홍길동", Age = 25 };
var successWithData = HttpJsonResult.Success(user);
Console.WriteLine(successWithData.ToString());
// 출력: {"code":0,"message":"","data":"{\"Name\":\"홍길동\",\"Age\":25}"}

// 실패 응답 생성
var failResponse = HttpJsonResult.Fail("사용자를 찾을 수 없습니다");
Console.WriteLine(failResponse.ToString());
// 출력: {"code":-1,"message":"사용자를 찾을 수 없습니다","data":null}
```

### JSON 문자열 직접 가져오기

```csharp
// 성공 응답의 JSON 문자열 가져오기
string successJson = HttpJsonResult.SuccessString();

// 데이터가 포함된 성공 응답 JSON 문자열 가져오기
string successWithDataJson = HttpJsonResult.SuccessString(user);

// 실패 응답의 JSON 문자열 가져오기
string failJson = HttpJsonResult.FailString("작업 실패");
```

## 상세 사용법

### 1. HttpJsonResult 응답 클래스

#### 기본 속성

```csharp
public sealed class HttpJsonResult
{
    public int Code { get; set; }        // 응답 코드, 0은 성공
    public string Message { get; set; }  // 응답 메시지
    public string Data { get; set; }     // 응답 데이터 (JSON 문자열)
}
```

#### 일반적인 응답 코드

- `0` - 성공
- `-1` - 일반적인 실패
- `400` - 유효성 검사 실패
- `401` - 인증되지 않음
- `403` - 매개변수 오류
- `404` - 리소스를 찾을 수 없음
- `500` - 서버 내부 오류

### 2. 성공 응답 메서드

```csharp
// 기본 성공 응답
var response1 = HttpJsonResult.Success();

// 데이터가 포함된 성공 응답
var response2 = HttpJsonResult.Success(userData);

// JSON 문자열 데이터가 포함된 성공 응답
var response3 = HttpJsonResult.Success("{\"id\":1,\"name\":\"test\"}");

// 사용자 정의 상태 코드와 메시지가 포함된 성공 응답
var response4 = HttpJsonResult.Success(200, "작업 성공", jsonData);

// 사용자 정의 메시지가 포함된 성공 응답
var response5 = HttpJsonResult.Success("생성 성공", jsonData);
```

### 3. 오류 응답 메서드

```csharp
// 일반 실패 응답
var failResponse = HttpJsonResult.Fail("작업 실패");

// 사용자 정의 오류 코드와 메시지
var errorResponse = HttpJsonResult.Error(1001, "비즈니스 로직 오류");

// 유효성 검사 실패 응답
var validationResponse = HttpJsonResult.ValidationError();

// 인증되지 않음 응답
var unauthorizedResponse = HttpJsonResult.Unauthorized();

// 리소스를 찾을 수 없음 응답
var notFoundResponse = HttpJsonResult.NotFound();

// 서버 오류 응답
var serverErrorResponse = HttpJsonResult.ServerError();

// 매개변수 오류 응답
var paramErrorResponse = HttpJsonResult.ParamError();

// 잘못된 요청 응답
var illegalResponse = HttpJsonResult.Illegal();
```

### 4. HttpJsonResultData&lt;T&gt; 제네릭 응답 클래스

```csharp
public sealed class HttpJsonResultData<T>
{
    public bool IsSuccess { get; set; }  // 성공 여부
    public int Code { get; set; }        // 응답 코드
    public string Message { get; set; }  // 오류 메시지
    public T Data { get; set; }          // 강력한 형식의 데이터
}
```

### 5. 응답 변환 및 처리

```csharp
using GameFrameX.Foundation.Http.Normalization;

// 데이터 모델 정의
public class UserInfo
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
}

// JSON 응답을 강력한 형식의 결과로 변환
string jsonResponse = HttpJsonResult.SuccessString(new UserInfo
{
    Id = 1,
    Name = "홍길동",
    Email = "hong@example.com"
});

// 확장 메서드를 사용한 변환
HttpJsonResultData<UserInfo> result = jsonResponse.ToHttpJsonResultData<UserInfo>();

if (result.IsSuccess)
{
    Console.WriteLine($"사용자 이름: {result.Data.Name}");
    Console.WriteLine($"사용자 이메일: {result.Data.Email}");
}
else
{
    Console.WriteLine($"요청 실패: {result.Message} (오류 코드: {result.Code})");
}
```

### 6. 사용자 정의 응답 상태 코드

```csharp
// 비즈니스 사용자 정의 상태 코드
public static class BusinessCodes
{
    public const int UserNotFound = 1001;
    public const int InsufficientBalance = 1002;
    public const int OrderExpired = 1003;
}

// 사용자 정의 상태 코드 사용
var response = HttpJsonResult.Error(BusinessCodes.UserNotFound, "사용자를 찾을 수 없습니다");
```

### 7. 응답 데이터 캡슐화

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

### 8. 일괄 데이터 처리

```csharp
public class PagedResult<T>
{
    public List<T> Items { get; set; }
    public int TotalCount { get; set; }
    public int PageIndex { get; set; }
    public int PageSize { get; set; }
}

// 페이징 데이터 응답
var pagedUsers = new PagedResult<UserInfo>
{
    Items = userList,
    TotalCount = 100,
    PageIndex = 1,
    PageSize = 10
};

var response = HttpJsonResult.Success(pagedUsers);
```

### 9. 설명 특성 사용

```csharp
public enum ApiErrorCode
{
    [HttpJsonCodeDescription("작업 성공")]
    Success = 0,

    [HttpJsonCodeDescription("사용자를 찾을 수 없음")]
    UserNotFound = 1001,

    [HttpJsonCodeDescription("잔액 부족")]
    InsufficientBalance = 1002,

    [HttpJsonCodeDescription("주문이 만료됨")]
    OrderExpired = 1003
}

// 열거형을 사용한 응답 생성
var response = HttpJsonResult.Error((int)ApiErrorCode.UserNotFound, "사용자를 찾을 수 없습니다");
```

## 고급 사용법

### 사용자 정의 직렬화 옵션

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

### 응답 시간 통계

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

### 다국어 지원

```csharp
public static class LocalizedMessages
{
    private static readonly Dictionary<string, Dictionary<int, string>> Messages = new()
    {
        ["ko-KR"] = new Dictionary<int, string>
        {
            [0] = "작업 성공",
            [400] = "유효성 검사 실패",
            [401] = "인증되지 않은 접근",
            [404] = "리소스를 찾을 수 없음",
            [500] = "서버 내부 오류"
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

    public static string GetMessage(int code, string culture = "ko-KR")
    {
        return Messages.TryGetValue(culture, out var cultureMessages) &&
               cultureMessages.TryGetValue(code, out var message)
               ? message
               : "알 수 없는 오류";
    }
}
```

## 모범 사례

### 통합 오류 처리

전역 예외 처리기에서 표준화된 오류 응답을 사용하여 API 동작의 일관성을 유지합니다:

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

### API 컨트롤러 통합

컨트롤러 메서드는 통합적으로 `HttpJsonResult`를 반환하며, 클라이언트는 하나의 형식만 파싱하면 됩니다:

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
            logger.LogError(ex, "사용자 정보 가져오기 실패");
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
            return Ok(HttpJsonResult.SuccessString("사용자 생성 성공", JsonSerializer.Serialize(user)));
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "사용자 생성 실패");
            return Ok(HttpJsonResult.FailString("사용자 생성 실패"));
        }
    }
}
```

### 클라이언트 응답 처리

클라이언트는 `ToHttpJsonResultData<T>` 확장 메서드를 사용하여 형식이 안전한 역직렬화를 수행합니다:

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
            logger.LogError(ex, "API 요청 실패");
            return new HttpJsonResultData<T>
            {
                IsSuccess = false,
                Code = 500,
                Message = "네트워크 요청 실패"
            };
        }
    }
}
```

### 응답 캐싱

빈번하게 사용되는 정적 응답을 캐싱하여 반복적인 직렬화 비용을 줄입니다:

```csharp
public static class ResponseCache
{
    private static readonly ConcurrentDictionary<string, string> Cache = new();

    public static string GetCachedResponse(string key, Func<string> factory)
    {
        return Cache.GetOrAdd(key, _ => factory());
    }

    // 자주 사용되는 응답 캐싱
    public static readonly string SuccessResponse = HttpJsonResult.SuccessString();
    public static readonly string UnauthorizedResponse = HttpJsonResult.UnauthorizedString();
    public static readonly string NotFoundResponse = HttpJsonResult.NotFoundString();
}
```

## API 레퍼런스

### HttpJsonResult 정적 메서드

| 메서드 | 반환 형식 | 설명 |
|------|----------|------|
| `Success()` | `HttpJsonResult` | 빈 성공 응답 생성 (code=0) |
| `Success(data)` | `HttpJsonResult` | 데이터가 포함된 성공 응답 생성 |
| `Success(message, data)` | `HttpJsonResult` | 메시지와 데이터가 포함된 성공 응답 생성 |
| `Success(code, message, data)` | `HttpJsonResult` | 사용자 정의 상태 코드의 성공 응답 생성 |
| `Fail(message)` | `HttpJsonResult` | 실패 응답 생성 (code=-1) |
| `Error(code, message)` | `HttpJsonResult` | 사용자 정의 오류 코드의 오류 응답 생성 |
| `ValidationError()` | `HttpJsonResult` | 유효성 검사 실패 응답 (code=400) |
| `Unauthorized()` | `HttpJsonResult` | 인증되지 않음 응답 (code=401) |
| `NotFound()` | `HttpJsonResult` | 리소스를 찾을 수 없음 응답 (code=404) |
| `ServerError()` | `HttpJsonResult` | 서버 내부 오류 응답 (code=500) |
| `ParamError()` | `HttpJsonResult` | 매개변수 오류 응답 (code=403) |
| `Illegal()` | `HttpJsonResult` | 잘못된 요청 응답 |
| `SuccessString(...)` | `string` | 위 성공 메서드의 JSON 문자열 버전 |
| `FailString(...)` | `string` | 위 실패 메서드의 JSON 문자열 버전 |
| `NotFoundString()` | `string` | 리소스를 찾을 수 없음의 JSON 문자열 버전 |
| `UnauthorizedString()` | `string` | 인증되지 않음의 JSON 문자열 버전 |
| `ServerErrorString()` | `string` | 서버 오류의 JSON 문자열 버전 |
| `ValidationErrorString()` | `string` | 유효성 검사 실패의 JSON 문자열 버전 |

### HttpJsonResultData&lt;T&gt; 속성

| 속성 | 형식 | 설명 |
|------|------|------|
| `IsSuccess` | `bool` | 성공 여부 (code=0) |
| `Code` | `int` | 응답 상태 코드 |
| `Message` | `string` | 응답 메시지 |
| `Data` | `T` | 강력한 형식의 응답 데이터 |

### 확장 메서드

| 메서드 | 설명 |
|------|------|
| `string.ToHttpJsonResultData<T>()` | JSON 문자열을 `HttpJsonResultData<T>`로 역직렬화 |
