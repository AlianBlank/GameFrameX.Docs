# JSON (고성능 직렬화 라이브러리)

[![.NET](https://img.shields.io/badge/.NET-8.0-blue.svg)](https://dotnet.microsoft.com/download) [![License](https://img.shields.io/badge/license-MIT-green.svg)]()

GameFrameX.Foundation.Json은 System.Text.Json 기반의 고성능 JSON 직렬화 및 역직렬화 라이브러리로, 풍부한 설정 옵션과 특수 값 처리 기능을 제공합니다.

## 특징

- **고성능 직렬화** - System.Text.Json 기반의 고성능 구현
- **특수 부동소수점 값 지원** - NaN, Infinity, -Infinity 등 특수 부동소수점 값 완벽 처리
- **다양한 설정 옵션** - 기본 및 포맷팅 두 가지 사전 설정 제공
- **내결함성** - 다중 내결함 메커니즘으로 직렬화/역직렬화 안정성 보장
- **UTF8 바이트 배열 지원** - UTF8 바이트 배열 직접 조작 지원
- **Try 패턴** - 안전한 직렬화/역직렬화 시도 메서드 제공
- **열거형 문자열화** - 열거형 값을 자동으로 문자열 형태로 직렬화
- **순환 참조 처리** - 순환 참조를 자동으로 무시하여 직렬화 예외 방지

## 설치

```bash
dotnet add package GameFrameX.Foundation.Json
```

## 빠른 시작

```csharp
using GameFrameX.Foundation.Json;

// 데이터 모델 정의
public class User
{
    public string Name { get; set; }
    public int Age { get; set; }
    public bool IsActive { get; set; }
    public double Score { get; set; }
}

// 객체 직렬화
var user = new User
{
    Name = "홍길동",
    Age = 25,
    IsActive = true,
    Score = 95.5
};

string json = JsonHelper.Serialize(user);
Console.WriteLine(json);
// 출력: {"Name":"홍길동","Age":25,"IsActive":true,"Score":95.5}

// 객체 역직렬화
User deserializedUser = JsonHelper.Deserialize<User>(json);
Console.WriteLine($"이름: {deserializedUser.Name}, 나이: {deserializedUser.Age}");

// 포맷팅 직렬화
string formattedJson = JsonHelper.SerializeFormat(user);
```

## 상세 사용법

### 직렬화 메서드

#### 기본 직렬화

```csharp
// 기본 설정으로 직렬화
string json = JsonHelper.Serialize(obj);

// 사용자 정의 설정으로 직렬화
var customOptions = new JsonSerializerOptions { WriteIndented = true };
string json = JsonHelper.Serialize(obj, customOptions);

// 포맷팅 직렬화 (자동 들여쓰기)
string formattedJson = JsonHelper.SerializeFormat(obj);
```

#### UTF8 바이트 배열 직렬화

```csharp
// UTF8 바이트 배열로 직렬화
byte[] utf8Bytes = JsonHelper.SerializeToUtf8Bytes(obj);

// 포맷팅된 UTF8 바이트 배열로 직렬화
byte[] formattedUtf8Bytes = JsonHelper.SerializeToUtf8BytesFormat(obj);
```

### 역직렬화 메서드

#### 기본 역직렬화

```csharp
// 제네릭 역직렬화
User user = JsonHelper.Deserialize<User>(json);

// Type 형식 역직렬화
object obj = JsonHelper.Deserialize(json, typeof(User));

// 사용자 정의 설정으로 역직렬화
User user = JsonHelper.Deserialize<User>(json, customOptions);
```

#### UTF8 바이트 배열 역직렬화

```csharp
// UTF8 바이트 배열에서 역직렬화
User user = JsonHelper.DeserializeFromUtf8Bytes<User>(utf8Bytes);

// 사용자 정의 설정으로 UTF8 바이트 배열에서 역직렬화
User user = JsonHelper.DeserializeFromUtf8Bytes<User>(utf8Bytes, customOptions);
```

### 안전한 Try 메서드

```csharp
// 안전한 직렬화
if (JsonHelper.TrySerialize(user, out string result))
{
    Console.WriteLine($"직렬화 성공: {result}");
}
else
{
    Console.WriteLine("직렬화 실패");
}

// 안전한 역직렬화
if (JsonHelper.TryDeserialize<User>(json, out User user))
{
    Console.WriteLine($"역직렬화 성공: {user.Name}");
}
else
{
    Console.WriteLine("역직렬화 실패");
}
```

### 설정 옵션

#### 기본 설정 (DefaultOptions)

```csharp
public static readonly JsonSerializerOptions DefaultOptions = new JsonSerializerOptions
{
    // null 값 속성 무시
    DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
    // 순환 참조 무시
    ReferenceHandler = ReferenceHandler.IgnoreCycles,
    // JSON 주석 무시
    ReadCommentHandling = JsonCommentHandling.Skip,
    // 완화된 JavaScript 인코더 사용
    Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping,
    // 후행 쉼표 허용
    AllowTrailingCommas = true,
    // 속성 이름 대소문자 구분 안함
    PropertyNameCaseInsensitive = true,
    // 문자열에서 숫자 및 특수 부동소수점 값 읽기 허용
    NumberHandling = JsonNumberHandling.AllowReadingFromString |
                    JsonNumberHandling.AllowNamedFloatingPointLiterals,
    // 사용자 정의 변환기
    Converters = {
        new JsonStringEnumConverter(), // 열거형 문자열 변환
        new SpecialFloatingPointConverter(), // 특수 부동소수점 값 변환 (double)
        new SpecialFloatingPointConverterFloat(), // 특수 부동소수점 값 변환 (float)
        new SpecialFloatingPointDocumentConverter(), // JSON 문서 특수 부동소수점 값 변환
    }
};
```

#### 포맷팅 설정 (FormatOptions)

포맷팅 설정은 기본 설정에 `WriteIndented = true`를 추가하여 포맷팅된 JSON 출력을 생성합니다.

### 특수 기능

#### 특수 부동소수점 값 처리

라이브러리에는 특수 부동소수점 값에 대한 완전한 지원이 내장되어 있습니다:

```csharp
public class TestData
{
    public double NaNValue { get; set; } = double.NaN;
    public double InfinityValue { get; set; } = double.PositiveInfinity;
    public double NegativeInfinityValue { get; set; } = double.NegativeInfinity;
    public float FloatNaN { get; set; } = float.NaN;
}

var data = new TestData();
string json = JsonHelper.Serialize(data);
// 출력: {"NaNValue":"NaN","InfinityValue":"Infinity","NegativeInfinityValue":"-Infinity","FloatNaN":"NaN"}

TestData deserializedData = JsonHelper.Deserialize<TestData>(json);
// 특수 값이 올바르게 복원됨
```

#### 열거형 처리

```csharp
public enum Status
{
    Active,
    Inactive,
    Pending
}

public class Order
{
    public Status Status { get; set; } = Status.Active;
}

var order = new Order();
string json = JsonHelper.Serialize(order);
// 출력: {"Status":"Active"}  (숫자가 아닌 문자열 형식)
```

#### 내결함 메커니즘

라이브러리는 다중 내결함 메커니즘을 제공합니다:

1. **설정 내결함** - 기본 설정 실패 시 포맷팅 설정으로 자동 시도
2. **특수 값 사전 처리** - 비표준 형식의 특수 부동소수점 값을 자동 처리
3. **다중 시도** - 실패 시 다양한 방식의 재시도 수행

```csharp
// 비표준 형식의 특수 값이 포함된 JSON도 올바르게 처리
string problematicJson = @"{""value"": NaN, ""score"": Infinity}";
var result = JsonHelper.Deserialize<Dictionary<string, double>>(problematicJson);
// 역직렬화 성공, NaN과 Infinity가 올바르게 처리됨
```

## 고급 사용법

### 사용자 정의 설정

```csharp
var customOptions = new JsonSerializerOptions
{
    PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
    WriteIndented = true,
    DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingDefault
};

// GameFrameX의 특수 변환기 추가
customOptions.Converters.Add(new SpecialFloatingPointConverter());
customOptions.Converters.Add(new JsonStringEnumConverter());

string json = JsonHelper.Serialize(data, customOptions);
```

### 일괄 처리

```csharp
var users = new List<User>
{
    new User { Name = "홍길동", Age = 25 },
    new User { Name = "김철수", Age = 30 },
    new User { Name = "이영희", Age = 35 }
};

// 리스트 직렬화
string json = JsonHelper.Serialize(users);

// 리스트 역직렬화
List<User> deserializedUsers = JsonHelper.Deserialize<List<User>>(json);
```

### 성능 최적화

```csharp
// 대용량 데이터의 경우 UTF8 바이트 배열을 사용하면 성능 향상
byte[] utf8Data = JsonHelper.SerializeToUtf8Bytes(largeDataSet);

// 바이트 배열에서 직접 역직렬화하여 문자열 변환 비용 절감
var result = JsonHelper.DeserializeFromUtf8Bytes<LargeDataSet>(utf8Data);
```

## 모범 사례

### 적절한 직렬화 메서드 선택

```csharp
// 디버깅 및 로깅에는 포맷팅 직렬화 사용
string debugJson = JsonHelper.SerializeFormat(debugData);

// 네트워크 전송 및 저장에는 기본 직렬화 사용 (더 간결함)
string compactJson = JsonHelper.Serialize(networkData);

// 고성능 시나리오에는 UTF8 바이트 배열 사용
byte[] highPerfData = JsonHelper.SerializeToUtf8Bytes(data);
```

### 오류 처리

```csharp
// 실패할 수 있는 작업에는 Try 메서드 사용
if (!JsonHelper.TryDeserialize<User>(userJson, out User user))
{
    // 오류 로그 기록
    logger.LogError("사용자 데이터 역직렬화 실패: {Json}", userJson);
    // 기본값 사용 또는 비즈니스 예외 발생
    user = new User { Name = "알 수 없는 사용자" };
}
```

### 데이터 모델 설계

```csharp
public class ApiResponse<T>
{
    public bool Success { get; set; }
    public string Message { get; set; }
    public T Data { get; set; }
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;

    // null일 수 있는 속성은 명시적으로 표시
    public string ErrorCode { get; set; } = null;
}
```

### 설정 관리

```csharp
// 각 시나리오별 전용 설정 생성
public static class JsonConfigurations
{
    public static readonly JsonSerializerOptions ApiOptions = new JsonSerializerOptions
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
        Converters = { new JsonStringEnumConverter() }
    };

    public static readonly JsonSerializerOptions LoggingOptions = new JsonSerializerOptions
    {
        WriteIndented = true,
        Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping
    };
}
```

### 문제 해결

#### 자주 묻는 질문

**특수 부동소수점 값 직렬화 문제**
문제: NaN이나 Infinity가 포함된 객체를 직렬화할 때 오류 발생
해결책: GameFrameX.Foundation.Json을 사용하면 특수 부동소수점 값 처리가 내장되어 있습니다

**순환 참조 문제**
문제: 객체 간 순환 참조로 인해 직렬화가 실패함
해결책: 라이브러리의 기본 설정에 `ReferenceHandler.IgnoreCycles`가 이미 활성화되어 있습니다

**열거형 직렬화 문제**
문제: 열거형을 숫자가 아닌 문자열로 직렬화하고 싶음
해결책: 라이브러리에 `JsonStringEnumConverter`가 기본 포함되어 있습니다

**성능 문제**
문제: 대용량 데이터 직렬화 성능이 좋지 않음
해결책: UTF8 바이트 배열 메서드를 사용하여 문자열 변환 비용을 절약하세요

#### 디버깅 팁

```csharp
// 상세한 오류 정보 활성화
try
{
    var result = JsonHelper.Deserialize<ComplexObject>(json);
}
catch (JsonException ex)
{
    Console.WriteLine($"JSON 파싱 오류: {ex.Message}");
    Console.WriteLine($"오류 위치: Line {ex.LineNumber}, Position {ex.BytePositionInLine}");
    Console.WriteLine($"문제 경로: {ex.Path}");
}
```

## API 레퍼런스

| 메서드 | 매개변수 | 반환값 | 설명 |
|------|------|--------|------|
| Serialize | `T` | `string` | 기본 설정으로 객체 직렬화 |
| Serialize | `T, JsonSerializerOptions` | `string` | 사용자 정의 설정으로 직렬화 |
| SerializeFormat | `T` | `string` | 포맷팅 직렬화 (자동 들여쓰기) |
| SerializeToUtf8Bytes | `T` | `byte[]` | UTF8 바이트 배열로 직렬화 |
| SerializeToUtf8BytesFormat | `T` | `byte[]` | 포맷팅된 UTF8 바이트 배열로 직렬화 |
| Deserialize\<T\> | `string` | `T` | 제네릭 역직렬화 |
| Deserialize | `string, Type` | `object` | 형식별 역직렬화 |
| Deserialize\<T\> | `string, JsonSerializerOptions` | `T` | 사용자 정의 설정으로 역직렬화 |
| DeserializeFromUtf8Bytes\<T\> | `byte[]` | `T` | UTF8 바이트 배열에서 역직렬화 |
| DeserializeFromUtf8Bytes\<T\> | `byte[], JsonSerializerOptions` | `T` | 사용자 정의 설정으로 UTF8 바이트 배열에서 역직렬화 |
| TrySerialize | `T, out string` | `bool` | 안전한 직렬화 시도 |
| TryDeserialize\<T\> | `string, out T` | `bool` | 안전한 역직렬화 시도 |
| DefaultOptions | 없음 | `JsonSerializerOptions` | 기본 설정 (정적 속성) |
| FormatOptions | 없음 | `JsonSerializerOptions` | 포맷팅 설정 (정적 속성) |
