# 로그 (Serilog 기반 고성능 로깅 라이브러리)

Serilog 기반의 고성능 로깅 라이브러리로, GameFrameX 프레임워크에 통합된 로깅 인터페이스와 풍부한 로그 출력 기능을 제공합니다.

## 특징

- **다중 레벨 로그 지원** - Verbose, Debug, Info, Warn, Error, Fatal 6가지 로그 레벨 지원
- **다중 출력 대상** - 파일, 콘솔, Grafana Loki 등 다양한 출력 방식 지원
- **유연한 설정** - LogOptions 클래스를 통한 풍부한 설정 옵션 제공
- **파일 롤링** - 시간 간격 및 파일 크기 기반 로그 파일 롤링 지원
- **태그 지원** - 로그에 태그를 추가하여 분류 및 필터링 가능
- **예외 기록** - 전체 스택 추적 정보가 포함된 전용 예외 기록 메서드
- **콘솔 출력** - 로그 파일과 콘솔에 동시 출력 지원
- **고성능** - Serilog 기반으로 고성능 로깅 기능 제공

## 설치

```bash
dotnet add package GameFrameX.Foundation.Logger
```

## 빠른 시작

### 1. 기본 사용

```csharp
using GameFrameX.Foundation.Logger;

// 기본 설정으로 로그 시스템 초기화
var logger = LogHandler.Create(LogOptions.Default);

// 다양한 레벨의 로그 기록
LogHelper.Info("애플리케이션 시작");
LogHelper.Warn("경고 메시지입니다");
LogHelper.Error("오류가 발생했습니다");
```

### 2. 사용자 정의 설정

```csharp
using GameFrameX.Foundation.Logger;

// 사용자 정의 로그 설정 생성
var logOptions = new LogOptions("mylogs")
{
    LogType = "WebApi",
    LogTagName = "Production",
    LogEventLevel = LogEventLevel.Information,
    IsConsole = true,
    RollingInterval = RollingInterval.Hour,
    FileSizeLimitBytes = 50 * 1024 * 1024, // 50MB
    RetainedFileCountLimit = 7 // 7개 파일 보관
};

// 로그 시스템 초기화
var logger = LogHandler.Create(logOptions);

// 로그 사용
LogHelper.Info("서버", "서버가 포트 {Port}에서 시작됨", 8080);
LogHelper.InfoConsole("파일과 콘솔에 동시에 출력되는 메시지");
```

## 상세 사용법

### 로그 레벨

6가지 표준 로그 레벨을 지원합니다:

```csharp
// Verbose - 가장 상세한 로그 정보
LogHelper.Verbose("상세 디버그 정보");

// Debug - 디버그 정보
LogHelper.Debug("디버그 정보: 변수 값 = {Value}", someValue);

// Information - 일반 정보
LogHelper.Info("사용자 {UserId} 로그인 성공", userId);

// Warning - 경고 정보
LogHelper.Warn("디스크 공간 부족, 남은 공간: {FreeSpace}MB", freeSpace);

// Error - 오류 정보
LogHelper.Error("데이터베이스 연결 실패: {Error}", errorMessage);

// Fatal - 치명적 오류
LogHelper.Fatal("애플리케이션이 곧 충돌함: {Reason}", reason);
```

### 예외 기록

전용 예외 기록 메서드로 스택 추적이 자동으로 포함됩니다:

```csharp
try
{
    // 예외가 발생할 수 있는 코드
    DoSomething();
}
catch (Exception ex)
{
    // 예외 기록
    LogHelper.Error(ex);

    // 태그가 포함된 예외 기록
    LogHelper.Error("데이터베이스", ex);

    // 사용자 정의 예외 메시지
    LogHelper.Error("사용자 요청 처리 중 오류 발생: {Message}", ex.Message);
}
```

### 태그 지원

로그에 태그를 추가하여 분류 및 필터링을 용이하게 합니다:

```csharp
// 태그가 포함된 로그 기록
LogHelper.Info("사용자 관리", "사용자 {UserId} 생성 성공", userId);
LogHelper.Warn("보안", "의심스러운 로그인 시도 감지, IP: {IP}", ipAddress);
LogHelper.Error("결제", "결제 처리 실패, 주문 번호: {OrderId}", orderId);

// 태그가 포함된 콘솔 출력
LogHelper.InfoConsole("시작", "서버 시작 완료, 수신 포트: {Port}", port);
```

### 콘솔 출력

로그 파일과 콘솔에 동시 출력을 지원합니다:

```csharp
// 로그 파일에만 출력
LogHelper.Info("이 메시지는 로그 파일에만 기록됩니다");

// 로그 파일과 콘솔에 동시 출력
LogHelper.InfoConsole("이 메시지는 콘솔과 로그 파일에 모두 표시됩니다");

// 오류 메시지의 콘솔 출력 (빨간색으로 표시)
LogHelper.ErrorConsole("이것은 오류 메시지이며 콘솔에 빨간색으로 표시됩니다");

// 콘솔에만 출력 (로그 파일에 기록하지 않음)
LogHelper.Console("이 메시지는 콘솔에만 표시됩니다");
```

## 설정

### LogOptions 설정 클래스

```csharp
var logOptions = new LogOptions("logs") // 로그 디렉토리 이름
{
    // 기본 설정
    LogType = "WebServer",              // 서버 유형 식별자
    LogTagName = "Production",          // 로그 태그 이름
    LogEventLevel = LogEventLevel.Info, // 최소 로그 레벨

    // 출력 설정
    IsConsole = true,                   // 콘솔 출력 여부

    // 파일 설정
    RollingInterval = RollingInterval.Day,    // 롤링 간격 (일)
    IsFileSizeLimit = true,                   // 파일 크기 제한 여부
    FileSizeLimitBytes = 100 * 1024 * 1024,   // 파일 크기 제한 (100MB)
    RetainedFileCountLimit = 31,              // 보관 파일 수 (31개)

    // Grafana Loki 설정
    IsGrafanaLoki = false,                    // Loki 활성화 여부
    GrafanaLokiUrl = "http://localhost:3100", // Loki 서비스 주소
    GrafanaLokiLabels = new Dictionary<string, string>
    {
        ["app"] = "myapp",
        ["env"] = "production"
    },
    GrafanaLokiUsername = "admin",            // Loki 사용자 이름
    GrafanaLokiPassword = "password"          // Loki 비밀번호
};
```

### 롤링 간격 옵션

```csharp
// 지원되는 롤링 간격
RollingInterval.Infinite    // 롤링하지 않음
RollingInterval.Year        // 연 단위 롤링
RollingInterval.Month       // 월 단위 롤링
RollingInterval.Day         // 일 단위 롤링 (기본값)
RollingInterval.Hour        // 시간 단위 롤링
RollingInterval.Minute      // 분 단위 롤링
```

### 로그 레벨 설정

```csharp
// 지원되는 로그 레벨
LogEventLevel.Verbose       // 가장 상세함
LogEventLevel.Debug         // 디버그 (기본값)
LogEventLevel.Information   // 정보
LogEventLevel.Warning       // 경고
LogEventLevel.Error         // 오류
LogEventLevel.Fatal         // 치명적 오류
```

## 고급 사용법

### Grafana Loki 통합

Grafana Loki에 로그를 전송하여 중앙 집중식 로그 관리를 지원합니다:

```csharp
var logOptions = new LogOptions()
{
    IsGrafanaLoki = true,
    GrafanaLokiUrl = "http://loki.example.com:3100",
    GrafanaLokiLabels = new Dictionary<string, string>
    {
        ["service"] = "user-service",
        ["environment"] = "production",
        ["version"] = "1.0.0"
    },
    GrafanaLokiUsername = "your-username",
    GrafanaLokiPassword = "your-password"
};

var logger = LogHandler.Create(logOptions);
```

### 사용자 정의 로그 설정

콜백 함수를 통한 더 고급 사용자 정의 설정을 지원합니다:

```csharp
var logger = LogHandler.Create(logOptions, true, config =>
{
    // 사용자 정의 Sink 추가
    config.WriteTo.Email(
        fromEmail: "noreply@example.com",
        toEmail: "admin@example.com",
        outputTemplate: "{Timestamp} [{Level}] {Message}{NewLine}{Exception}",
        restrictedToMinimumLevel: LogEventLevel.Error
    );

    // 사용자 정의 Enricher 추가
    config.Enrich.WithProperty("MachineName", Environment.MachineName);
    config.Enrich.WithProperty("ProcessId", Environment.ProcessId);
});
```

### 사용자 정의 Logger 인스턴스 사용

```csharp
// 여러 Logger 인스턴스 생성
var webLogger = LogHandler.Create(webLogOptions, false);
var dbLogger = LogHandler.Create(dbLogOptions, false);

// 특정 Logger 인스턴스 사용
LogHelper.Info(webLogger, "웹 요청 처리 완료");
LogHelper.Error(dbLogger, "데이터베이스 연결 예외", exception);
```

### 성능 최적화

#### 비동기 로그 플러시

```csharp
// 동기 플러시 (블로킹)
LogHelper.FlushAndSave();

// 비동기 플러시 (논블로킹)
LogHelper.CloseAndFlushAsync();
```

#### 조건부 로그 기록

```csharp
// 불필요한 문자열 포맷팅 방지
if (logger.IsEnabled(LogEventLevel.Debug))
{
    LogHelper.Debug("복잡한 디버그 정보: {Data}", ExpensiveOperation());
}
```

## 모범 사례

### 구조화된 로그

후속 분석을 용이하게 하기 위해 구조화된 로그 메시지를 사용합니다:

```csharp
// 좋은 방법 - 구조화된 로그
LogHelper.Info("사용자 로그인 성공, 사용자 ID: {UserId}, IP: {IP}, 소요 시간: {Duration}ms",
    userId, ipAddress, duration);

// 피해야 할 방법 - 문자열 연결
LogHelper.Info($"사용자 로그인 성공, 사용자 ID: {userId}, IP: {ipAddress}, 소요 시간: {duration}ms");
```

### 로그 레벨의 합리적 사용

```csharp
// Debug - 개발 디버그 정보
LogHelper.Debug("ProcessOrder 메서드 진입, 매개변수: {OrderId}", orderId);

// Info - 중요한 비즈니스 이벤트
LogHelper.Info("주문 생성 성공, 주문 번호: {OrderId}, 사용자: {UserId}", orderId, userId);

// Warn - 복구 가능한 문제
LogHelper.Warn("데이터베이스 재연결, {Attempt}번째 시도", attemptCount);

// Error - 주의가 필요한 오류
LogHelper.Error("결제 처리 실패, 주문: {OrderId}, 오류: {Error}", orderId, error);

// Fatal - 애플리케이션 종료를 초래하는 심각한 오류
LogHelper.Fatal("데이터베이스 연결 풀 고갈, 애플리케이션이 곧 종료됩니다");
```

### 태그 분류 사용

```csharp
// 기능 모듈별 분류
LogHelper.Info("사용자 관리", "사용자 가입 성공: {Email}", email);
LogHelper.Info("주문 처리", "주문 상태 업데이트: {OrderId} -> {Status}", orderId, status);
LogHelper.Info("결제 시스템", "결제 완료: {Amount}원", amount);

// 환경별 분류
LogHelper.Info("프로덕션 환경", "서버 시작 완료");
LogHelper.Debug("개발 환경", "디버그 정보: {Data}", debugData);
```

### 예외 처리

```csharp
try
{
    await ProcessOrderAsync(orderId);
    LogHelper.Info("주문 처리", "주문 {OrderId} 처리 완료", orderId);
}
catch (BusinessException ex)
{
    // 비즈니스 예외, 경고로 기록
    LogHelper.Warn("주문 처리", "비즈니스 규칙 검증 실패: {Message}", ex.Message);
    throw;
}
catch (Exception ex)
{
    // 시스템 예외, 오류로 기록
    LogHelper.Error("주문 처리", ex);
    throw;
}
```

### 설정 관리

```csharp
// 개발 환경 설정
var devLogOptions = new LogOptions("logs")
{
    LogEventLevel = LogEventLevel.Debug,
    IsConsole = true,
    RollingInterval = RollingInterval.Hour
};

// 프로덕션 환경 설정
var prodLogOptions = new LogOptions("logs")
{
    LogEventLevel = LogEventLevel.Information,
    IsConsole = false,
    RollingInterval = RollingInterval.Day,
    IsGrafanaLoki = true,
    GrafanaLokiUrl = "http://loki.prod.com:3100"
};

// 환경에 따른 설정 선택
var logOptions = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development"
    ? devLogOptions
    : prodLogOptions;
```

## API 레퍼런스

### LogHandler

| 메서드 | 설명 |
|------|------|
| `LogHandler.Create(LogOptions)` | 지정된 설정으로 Logger 인스턴스 생성 |
| `LogHandler.Create(LogOptions, bool)` | Logger 인스턴스 생성, 두 번째 매개변수는 전역 기본값으로 설정할지 여부 |
| `LogHandler.Create(LogOptions, bool, Action<LoggerConfiguration>)` | Logger 인스턴스 생성 후 콜백으로 Serilog 설정 사용자 정의 |

### LogHelper 로그 기록 메서드

| 메서드 | 설명 |
|------|------|
| `LogHelper.Verbose(message)` | Verbose 레벨 로그 기록 |
| `LogHelper.Debug(message)` | Debug 레벨 로그 기록 |
| `LogHelper.Info(message)` | Information 레벨 로그 기록 |
| `LogHelper.Warn(message)` | Warning 레벨 로그 기록 |
| `LogHelper.Error(message)` | Error 레벨 로그 기록 |
| `LogHelper.Fatal(message)` | Fatal 레벨 로그 기록 |
| `LogHelper.Info(tag, message, args)` | 태그가 포함된 Info 로그 |
| `LogHelper.Warn(tag, message, args)` | 태그가 포함된 Warn 로그 |
| `LogHelper.Error(tag, message, args)` | 태그가 포함된 Error 로그 |
| `LogHelper.Error(Exception)` | 예외 기록 (스택 추적 포함) |
| `LogHelper.Error(tag, Exception)` | 태그가 포함된 예외 기록 |
| `LogHelper.InfoConsole(message)` | 콘솔에도 출력되는 Info 로그 |
| `LogHelper.ErrorConsole(message)` | 콘솔에도 출력되는 Error 로그 (빨간색) |
| `LogHelper.Console(message)` | 콘솔에만 출력 |
| `LogHelper.FlushAndSave()` | 동기 플러시 및 로그 저장 |
| `LogHelper.CloseAndFlushAsync()` | 비동기 종료 및 로그 플러시 |

### LogOptions 주요 속성

| 속성 | 형식 | 설명 |
|------|------|------|
| `LogSavePath` | `string` | 로그 디렉토리 경로 |
| `LogType` | `string` | 서버 유형 식별자 |
| `LogTagName` | `string` | 로그 태그 이름 |
| `LogEventLevel` | `LogEventLevel` | 최소 로그 레벨 |
| `IsConsole` | `bool` | 콘솔 출력 여부 |
| `RollingInterval` | `RollingInterval` | 파일 롤링 간격 |
| `FileSizeLimitBytes` | `long` | 단일 로그 파일 크기 제한 |
| `RetainedFileCountLimit` | `int` | 보관할 로그 파일 수 |
| `IsGrafanaLoki` | `bool` | Grafana Loki 활성화 여부 |
| `GrafanaLokiUrl` | `string` | Loki 서비스 주소 |
| `GrafanaLokiLabels` | `Dictionary<string, string>` | Loki 라벨 |
| `GrafanaLokiUsername` | `string` | Loki 인증 사용자 이름 |
| `GrafanaLokiPassword` | `string` | Loki 인증 비밀번호 |

### 종속성

- **Serilog.AspNetCore** (9.0.0) - 핵심 로깅 프레임워크
- **Serilog.Sinks.Console** (6.0.0) - 콘솔 출력
- **Serilog.Sinks.File** (7.0.0) - 파일 출력
- **Serilog.Sinks.Grafana.Loki** (8.3.1) - Grafana Loki 통합
- **GameFrameX.Foundation.Json** - JSON 직렬화 지원
