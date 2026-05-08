# 현지화 프레임워크

경량급 현지화 프레임워크로, 지연 로딩 메커니즘, 제로 설정 사용, 스레드 안전한 현지화 솔루션을 제공합니다.

## 특징

- **제로 설정 사용**: 초기화 설정 없이 현지화 리소스를 자동으로 검색하고 로드
- **고성능 설계**: 지연 로딩 메커니즘으로 최초 사용 시에만 리소스를 로드하고, 다중 계층 캐시로 접근 성능 최적화
- **다국어 지원**: 중국어(간체)와 영어를 기본 지원하며, 더 많은 언어 확장 가능, 스마트 언어 폴백 메커니즘
- **높은 확장성**: 사용자 정의 리소스 제공자 지원, 유연한 우선순위 관리, 모듈형 컴포넌트 설계

## 설치

```bash
dotnet add package GameFrameX.Foundation.Localization
```

## 빠른 시작

### 기본 사용법

```csharp
using GameFrameX.Foundation.Localization.Core;

// 현지화 문자열 가져오기
var message = LocalizationService.GetString("Utility.Exceptions.TimestampOutOfRange");

// 매개변수가 있는 포맷팅 메시지
var formattedMessage = LocalizationService.GetString("Encryption.InvalidKeySize", 128, 256);

// 키가 존재하지 않는 경우 키 이름 자체를 반환
var unknown = LocalizationService.GetString("Some.Unknown.Key"); // 반환: "Some.Unknown.Key"
```

### 리소스 사전 로드 (선택 사항)

```csharp
// 애플리케이션 시작 시 모든 현지화 리소스를 사전 로드
LocalizationService.EnsureLoaded();

// 이후 사용 시 최초 접근 지연이 없음
var message = LocalizationService.GetString("ArgumentNull");
```

## 상세 사용법

### 핵심 컴포넌트

```
GameFrameX.Foundation.Localization
├── Core/                    # 핵심 인터페이스 및 관리 클래스
│   ├── IResourceProvider.cs         # 리소스 제공자 인터페이스
│   ├── ResourceManager.cs           # 리소스 관리자
│   └── ResourceManagerStatistics.cs # 통계 정보
└── Providers/               # 구체적 구현
    ├── DefaultResourceProvider.cs   # 기본 리소스 제공자
    └── AssemblyResourceProvider.cs  # 어셈블리 리소스 제공자
```

### 리소스 해석 우선순위

1. **사용자 정의 제공자** (최고 우선순위)
2. **어셈블리 리소스 제공자**
3. **기본 제공자** (폴백)

### 기존 모듈에 현지화 통합

#### 1단계: 현지화 키 정의

```csharp
// GameFrameX.Foundation.YourModule/Localization/Keys.cs
namespace GameFrameX.Foundation.YourModule.Localization;

public static class LocalizationKeys
{
    public static class Exceptions
    {
        public const string InvalidArgument = "YourModule.Exceptions.InvalidArgument";
        public const string OperationFailed = "YourModule.Exceptions.OperationFailed";
    }

    public static class Messages
    {
        public const string Success = "YourModule.Messages.Success";
        public const string Processing = "YourModule.Messages.Processing";
    }
}
```

#### 2단계: 리소스 파일 생성

`Localization/Messages/Resources.resx`(기본 영어)와 `Resources.zh-CN.resx`(중국어)를 생성합니다:

```xml
<?xml version="1.0" encoding="utf-8"?>
<root>
  <data name="YourModule.Exceptions.InvalidArgument" xml:space="preserve">
    <value>Invalid argument provided for {0}</value>
  </data>
  <data name="YourModule.Messages.Success" xml:space="preserve">
    <value>Operation completed successfully</value>
  </data>
</root>
```

#### 3단계: 프로젝트 파일 업데이트

```xml
<PropertyGroup>
  <EnableDefaultEmbeddedResourceItems>false</EnableDefaultEmbeddedResourceItems>
</PropertyGroup>

<ItemGroup>
  <EmbeddedResource Include="Localization\Messages\*.resx" />
</ItemGroup>
```

#### 4단계: 코드에서 사용

```csharp
using GameFrameX.Foundation.Localization.Core;
using GameFrameX.Foundation.YourModule.Localization;

public class YourService
{
    public void ProcessData(string input)
    {
        if (string.IsNullOrEmpty(input))
        {
            throw new ArgumentException(
                LocalizationService.GetString(LocalizationKeys.Exceptions.InvalidArgument, nameof(input)));
        }

        var successMessage = LocalizationService.GetString(LocalizationKeys.Messages.Success);
        Console.WriteLine(successMessage);
    }
}
```

### 사용자 정의 리소스 제공자

```csharp
public class DatabaseResourceProvider : IResourceProvider
{
    private readonly IDbConnection _connection;

    public DatabaseResourceProvider(IDbConnection connection)
    {
        _connection = connection;
    }

    public string GetString(string key)
    {
        var sql = "SELECT localized_text FROM localization_strings WHERE key = @key AND culture = @culture";
        return _connection.ExecuteScalar<string>(sql, new { key, culture = CultureInfo.CurrentCulture.Name });
    }
}

// 사용자 정의 제공자 등록
var dbProvider = new DatabaseResourceProvider(yourDbConnection);
LocalizationService.RegisterProvider(dbProvider);
```

### 모니터링 및 통계

```csharp
var stats = LocalizationService.GetStatistics();
Console.WriteLine($"로드된 제공자 수: {stats.ProvidersLoaded}");
Console.WriteLine($"전체 제공자 수: {stats.TotalProviderCount}");
Console.WriteLine($"어셈블리 제공자 수: {stats.AssemblyProviderCount}");

var providers = LocalizationService.GetProviders();
foreach (var provider in providers)
{
    Console.WriteLine($"제공자 형식: {provider.GetType().Name}");
}
```

### 예외 처리에서의 현지화

```csharp
using GameFrameX.Foundation.Utility.Localization;

public class ExceptionExamples
{
    public void ValidateTimestamp(long timestamp)
    {
        if (timestamp <= 0)
        {
            throw new ArgumentOutOfRangeException(
                nameof(timestamp),
                LocalizationService.GetString(LocalizationKeys.Exceptions.TimestampOutOfRange));
        }
    }
}
```

### 동적 언어 전환

```csharp
public class LocalizationManager
{
    public void SwitchLanguage(string cultureCode)
    {
        Thread.CurrentThread.CurrentUICulture = new CultureInfo(cultureCode);
        Thread.CurrentThread.CurrentCulture = new CultureInfo(cultureCode);
        LocalizationService.EnsureLoaded();
    }
}
```

### 리소스 파일 구성

```
{어셈블리 이름}/Localization/Messages/Resources.{문화 코드}.resx

예시:
GameFrameX.Foundation.Localization/Localization/Messages/Resources.zh-CN.resx
GameFrameX.Foundation.Utility/Localization/Messages/Resources.resx
GameFrameX.Foundation.Encryption/Localization/Messages/Resources.zh-CN.resx
```

### 통합된 모듈

| 모듈 | 현지화 키 수 | 상태 |
|------|-------------|------|
| GameFrameX.Foundation.Utility | 4 | 완료 |
| GameFrameX.Foundation.Encryption | 20+ | 완료 |
| GameFrameX.Foundation.Extensions | 7 | 완료 |
| GameFrameX.Foundation.Hash | 2 | 완료 |

### 자주 묻는 질문

#### 새로운 언어를 추가하려면 어떻게 하나요?

해당 모듈의 `Localization/Messages/` 디렉토리에 `Resources.{언어 코드}.resx` 파일을 생성합니다. 예를 들어 `Resources.fr.resx`(프랑스어), `Resources.ja.resx`(일본어) 등입니다.

#### 리소스 파일이 적용되지 않나요?

다음 사항을 확인하세요:
1. 리소스 파일이 "포함 리소스"로 설정되어 있는지
2. 파일 이름이 올바른지 (`Resources.{문화 코드}.resx`)
3. 프로젝트 파일에 리소스 파일 설정이 포함되어 있는지
4. 프로젝트를 다시 빌드했는지

## 모범 사례

### 키 명명 규칙

- **패턴**: `{모듈 이름}.{카테고리}.{구체적 키 이름}`
- **예시**: `Utility.Exceptions.TimestampOutOfRange`, `Encryption.InvalidKeySize`

### 매개변수화 메시지

```csharp
// 리소스 파일에 정의
// <value>사용자 '{0}'의 비밀번호가 유효하지 않습니다. 길이는 {1}-{2}자 사이여야 합니다</value>

// 코드에서 사용
var message = LocalizationService.GetString("User.InvalidPassword", username, minLength, maxLength);
```

### 성능 최적화

```csharp
// 애플리케이션 시작 시 사전 로드 (선택 사항)
LocalizationService.EnsureLoaded();
```

## API 레퍼런스

### LocalizationService

| 메서드 | 설명 |
|------|------|
| `GetString(string key, params object[] args)` | 현지화 문자열 가져오기, 매개변수화 포맷팅 지원 |
| `EnsureLoaded()` | 모든 현지화 리소스 사전 로드 |
| `RegisterProvider(IResourceProvider provider)` | 사용자 정의 리소스 제공자 등록 |
| `GetStatistics()` | 현지화 통계 정보 가져오기 |
| `GetProviders()` | 등록된 모든 리소스 제공자 목록 가져오기 |

### IResourceProvider 인터페이스

| 메서드 | 설명 |
|------|------|
| `GetString(string key)` | 키에 따라 현지화 문자열 가져오기 |

## 라이선스

MIT + Apache 2.0
