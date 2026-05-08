# 시작 매개변수 파서 (명령줄 인수 및 환경 변수 자동 매핑)

강력한 명령줄 인수 및 환경 변수 파싱 라이브러리로, 명령줄 인수와 환경 변수를 강력한 형식의 설정 객체에 자동으로 매핑하는 기능을 지원합니다.

## 특징

- **매개변수 우선순위 처리**: 명령줄 인수 > 환경 변수 > 기본값
- **제네릭 지원**: 임의의 강력한 형식 설정 클래스 지원
- **다양한 시작 방식 호환**: Docker, exe, shell 등의 시작 방식 지원
- **자동 접두사 처리**: 매개변수에 `--` 접두사 자동 추가
- **불리언 매개변수 지원**: 다양한 불리언 매개변수 형식 지원
- **환경 변수 매핑**: 환경 변수를 설정 속성에 자동 매핑
- **형식 변환**: 문자열 매개변수를 대상 형식으로 자동 변환
- **특성 지원**: 풍부한 설정 특성 제공

## 설치

```bash
dotnet add package GameFrameX.Foundation.Options
```

## 빠른 시작

### 1. 설정 클래스 정의

```csharp
public class AppConfig
{
    public string Host { get; set; } = "localhost";
    public int Port { get; set; } = 8080;
    public bool Debug { get; set; } = false;
    public string LogLevel { get; set; } = "info";
    public double Timeout { get; set; } = 30.5;
}
```

### 2. OptionsBuilder 사용

```csharp
using GameFrameX.Foundation.Options;

class Program
{
    static void Main(string[] args)
    {
        // 옵션 빌더 생성
        var builder = new OptionsBuilder<AppConfig>(args);

        // 설정 객체 빌드
        var config = builder.Build();

        // 설정 사용
        Console.WriteLine($"서버: {config.Host}:{config.Port}");
        Console.WriteLine($"디버그 모드: {config.Debug}");
        Console.WriteLine($"로그 레벨: {config.LogLevel}");
        Console.WriteLine($"타임아웃: {config.Timeout}초");
    }
}
```

## 상세 사용법

### 명령줄 인수

다양한 매개변수 형식을 지원합니다:

```bash
# 키-값 쌍 형식
myapp.exe --host=example.com --port=9090 --debug=true

# 분리 형식
myapp.exe --host example.com --port 9090 --debug true

# 불리언 플래그 형식
myapp.exe --host example.com --port 9090 --debug

# 혼합 형식
myapp.exe --host=example.com --port 9090 --debug
```

### 환경 변수

```bash
# 환경 변수 설정
export HOST=example.com
export PORT=9090
export DEBUG=true

# 프로그램 실행
myapp.exe
```

### Docker 지원

```dockerfile
# Dockerfile
FROM mcr.microsoft.com/dotnet/runtime:8.0
COPY . /app
WORKDIR /app
ENTRYPOINT ["dotnet", "MyApp.dll"]
```

```bash
# Docker 실행
docker run myapp --host example.com --port 9090 --debug

# 또는 환경 변수 사용
docker run -e HOST=example.com -e PORT=9090 -e DEBUG=true myapp
```

## 고급 사용법

### 특성을 사용한 설정

```csharp
using GameFrameX.Foundation.Options.Attributes;

public class AdvancedConfig
{
    [Option("h", "host", Required = false, DefaultValue = "localhost")]
    [HelpText("서버 호스트 주소")]
    public string Host { get; set; }

    [Option("p", "port", Required = true)]
    [HelpText("서버 포트 번호")]
    public int Port { get; set; }

    [FlagOption("d", "debug")]
    [HelpText("디버그 모드 활성화")]
    public bool Debug { get; set; }

    [RequiredOption("api-key", Required = true)]
    [EnvironmentVariable("API_KEY")]
    [HelpText("API 키")]
    public string ApiKey { get; set; }

    [DefaultValue(30.0)]
    public double Timeout { get; set; }
}
```

### 빌더 옵션

```csharp
var builder = new OptionsBuilder<AppConfig>(
    args: args,
    boolFormat: BoolArgumentFormat.Flag,        // 불리언 매개변수 형식
    ensurePrefixedKeys: true,                   // 매개변수에 접두사 보장
    useEnvironmentVariables: true              // 환경 변수 사용
);

var config = builder.Build(skipValidation: false); // 유효성 검사 건너뛰기 여부
```

### 매개변수 우선순위

매개변수는 다음 우선순위로 적용됩니다 (높은 우선순위가 낮은 우선순위를 덮어씀):

1. **명령줄 인수** (최고 우선순위)
2. **환경 변수**
3. **기본값** (최하위 우선순위)

#### 예시

```csharp
public class Config
{
    public string Host { get; set; } = "localhost";  // 기본값
    public int Port { get; set; } = 8080;           // 기본값
}
```

```bash
# 환경 변수 설정
export HOST=env.example.com
export PORT=7070

# 프로그램 실행 (명령줄 인수가 환경 변수를 덮어씀)
myapp.exe --host cmd.example.com

# 결과:
# Host = "cmd.example.com"  (명령줄 인수에서)
# Port = 7070               (환경 변수에서)
```

### 불리언 매개변수 처리

다양한 불리언 매개변수 형식을 지원합니다:

```bash
# 플래그 형식 (권장)
myapp.exe --debug                    # debug = true

# 키-값 쌍 형식
myapp.exe --debug=true               # debug = true
myapp.exe --debug=false              # debug = false

# 분리 형식
myapp.exe --debug true               # debug = true
myapp.exe --debug false              # debug = false

# 지원되는 불리언 값
true, false, 1, 0, yes, no, on, off
```

### 형식 변환

다음 형식 변환을 자동으로 지원합니다:

- `string` - 직접 사용
- `int`, `int?` - 정수 변환
- `bool`, `bool?` - 불리언 변환
- `double`, `double?` - 배정밀도 부동소수점 변환
- `float`, `float?` - 단정밀도 부동소수점 변환
- `decimal`, `decimal?` - 십진수 변환
- `DateTime`, `DateTime?` - 날짜/시간 변환
- `Guid`, `Guid?` - GUID 변환
- `Enum` - 열거형 변환

#### 예시

```csharp
public class TypedConfig
{
    public int Port { get; set; }
    public bool Debug { get; set; }
    public DateTime StartTime { get; set; }
    public LogLevel Level { get; set; }  // 열거형
}

public enum LogLevel
{
    Debug, Info, Warning, Error
}
```

```bash
myapp.exe --port 9090 --debug true --start-time "2024-01-01 10:00:00" --level Info
```

### 오류 처리

#### 필수 매개변수 검증

```csharp
public class Config
{
    [RequiredOption("api-key", Required = true)]
    public string ApiKey { get; set; }
}
```

필수 매개변수가 누락되면 `ArgumentException`이 발생합니다:

```
필수 옵션 누락: api-key
```

#### 형식 변환 오류

매개변수 값을 대상 형식으로 변환할 수 없는 경우, 기본값이 사용되고 콘솔에 경고 메시지가 출력됩니다.

### 디버그 모드

개발 중에 디버그 모드를 활성화하면 매개변수 파싱의 상세 과정을 확인할 수 있어 설정 문제 해결에 도움이 됩니다.

## 모범 사례

### 1. 설정 클래스 설계

```csharp
public class AppConfig
{
    // 의미 있는 기본값 사용
    public string Host { get; set; } = "localhost";
    public int Port { get; set; } = 8080;

    // 불리언 속성은 기본값을 false로 설정
    public bool Debug { get; set; } = false;

    // 특성을 사용하여 추가 정보 제공
    [RequiredOption("database-url", Required = true)]
    [EnvironmentVariable("DATABASE_URL")]
    public string DatabaseUrl { get; set; }
}
```

### 2. 오류 처리

```csharp
try
{
    var builder = new OptionsBuilder<AppConfig>(args);
    var config = builder.Build();

    // 설정을 사용하여 애플리케이션 시작
    StartApplication(config);
}
catch (ArgumentException ex)
{
    Console.WriteLine($"설정 오류: {ex.Message}");
    Environment.Exit(1);
}
```

### 3. Docker 통합

```csharp
// Program.cs
public class Program
{
    public static void Main(string[] args)
    {
        var builder = new OptionsBuilder<AppConfig>(args);
        var config = builder.Build();

        // Docker에서는 주로 환경 변수 사용
        // 개발에서는 주로 명령줄 인수 사용

        var app = CreateApplication(config);
        app.Run();
    }
}
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  myapp:
    image: myapp:latest
    environment:
      - HOST=0.0.0.0
      - PORT=8080
      - DEBUG=false
    command: ["--log-level", "info"]
```

## API 레퍼런스

### `OptionsBuilder<T>`

| 메서드 | 설명 |
|------|------|
| `OptionsBuilder<T>(args)` | 빌더 생성, 명령줄 인수 전달 |
| `Build()` | 설정 객체 빌드 |
| `Build(skipValidation)` | 설정 객체 빌드, 유효성 검사 건너뛰기 선택 |

### 특성 (Attributes)

| 특성 | 설명 |
|------|------|
| `[Option(shortName, longName)]` | 옵션 매핑 설정 |
| `[FlagOption(shortName, longName)]` | 불리언 플래그 옵션 |
| `[RequiredOption(longName)]` | 필수 옵션 |
| `[EnvironmentVariable(name)]` | 환경 변수 매핑 |
| `[DefaultValue(value)]` | 기본값 |
| `[HelpText(text)]` | 도움말 텍스트 설명 |

### CommandLineArgumentConverter

`CommandLineArgumentConverter`는 기본 명령줄 매개변수 변환 기능을 제공하며, 문자열 매개변수를 대상 형식으로 변환합니다. 일반적으로 `OptionsBuilder`를 통해 간접적으로 사용하므로 직접 호출할 필요가 없습니다.

### 전체 예제

```csharp
using GameFrameX.Foundation.Options;
using GameFrameX.Foundation.Options.Attributes;

namespace MyApp
{
    public class ServerConfig
    {
        [Option("h", "host", DefaultValue = "localhost")]
        [EnvironmentVariable("SERVER_HOST")]
        [HelpText("서버 호스트 주소")]
        public string Host { get; set; }

        [Option("p", "port", DefaultValue = 8080)]
        [EnvironmentVariable("SERVER_PORT")]
        [HelpText("서버 포트 번호")]
        public int Port { get; set; }

        [FlagOption("d", "debug")]
        [EnvironmentVariable("DEBUG")]
        [HelpText("디버그 모드 활성화")]
        public bool Debug { get; set; }

        [RequiredOption("database-url", Required = true)]
        [EnvironmentVariable("DATABASE_URL")]
        [HelpText("데이터베이스 연결 문자열")]
        public string DatabaseUrl { get; set; }

        [Option("timeout", DefaultValue = 30.0)]
        [EnvironmentVariable("REQUEST_TIMEOUT")]
        [HelpText("요청 타임아웃 시간 (초)")]
        public double Timeout { get; set; }
    }

    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                var builder = new OptionsBuilder<ServerConfig>(args);
                var config = builder.Build();

                Console.WriteLine("서버 설정:");
                Console.WriteLine($"  호스트: {config.Host}");
                Console.WriteLine($"  포트: {config.Port}");
                Console.WriteLine($"  디버그: {config.Debug}");
                Console.WriteLine($"  데이터베이스: {config.DatabaseUrl}");
                Console.WriteLine($"  타임아웃: {config.Timeout}초");

                // 서버 시작
                StartServer(config);
            }
            catch (ArgumentException ex)
            {
                Console.WriteLine($"설정 오류: {ex.Message}");
                ShowHelp();
                Environment.Exit(1);
            }
        }

        static void StartServer(ServerConfig config)
        {
            // 서버 시작 로직
            Console.WriteLine($"서버가 {config.Host}:{config.Port}에서 시작됩니다");
        }

        static void ShowHelp()
        {
            Console.WriteLine("사용법:");
            Console.WriteLine("  myapp.exe --host <호스트> --port <포트> --database-url <데이터베이스 URL> [옵션]");
            Console.WriteLine();
            Console.WriteLine("옵션:");
            Console.WriteLine("  -h, --host <호스트>           서버 호스트 주소 (기본값: localhost)");
            Console.WriteLine("  -p, --port <포트>           서버 포트 번호 (기본값: 8080)");
            Console.WriteLine("  -d, --debug                 디버그 모드 활성화");
            Console.WriteLine("      --database-url <URL>    데이터베이스 연결 문자열 (필수)");
            Console.WriteLine("      --timeout <초>          요청 타임아웃 시간 (기본값: 30.0)");
        }
    }
}
```
