# 범용 유틸리티 라이브러리

범용 유틸리티 라이브러리로, 콘솔 조작, 환경 관리, 시간 처리 및 Snowflake ID 생성 등의 기능을 제공합니다.

## 특징

- **콘솔 강화 출력**: 다중 레벨 컬러 텍스트 출력 지원 (Info, Success, Warning, Error)
- **환경 관리**: 실행 환경 편리한 판별, 환경 변수 설정 가져오기
- **시간 처리**: Unix 타임스탬프 변환, 시간대 지원, 날짜 경계 계산, 시간차 통계
- **Snowflake ID 생성**: 분산 고유 ID 생성기, 고성능, 추세 증가, 외부 종속성 없음

## 설치

```bash
dotnet add package GameFrameX.Foundation.Utility
```

## 빠른 시작

```csharp
using GameFrameX.Foundation.Utility;

// Snowflake ID 생성
long id = SnowFlakeIdHelper.GenerateId();

// 현재 Unix 타임스탬프 가져오기
long timestamp = TimerHelper.UnixTimeSeconds();

// 콘솔 출력
ConsoleHelper.WriteSuccess("작업 성공!");
```

## 상세 사용법

### ConsoleHelper

콘솔 관련 보조 기능으로, 콘솔에 다른 색상의 텍스트를 표시합니다.

```csharp
ConsoleHelper.WriteLine("일반 메시지입니다.");
ConsoleHelper.WriteInfo("정보 메시지입니다.");
ConsoleHelper.WriteSuccess("작업 성공!");
ConsoleHelper.WriteWarning("경고입니다.");
ConsoleHelper.WriteError("오류가 발생했습니다.");
```

### EnvironmentHelper

애플리케이션 실행 환경과 관련된 보조 기능을 제공합니다.

```csharp
// 현재 개발 환경인지 판별
if (EnvironmentHelper.IsDevelopment())
{
    // 개발 환경에서만 실행되는 코드
}

// 현재 환경 이름 가져오기
string environmentName = EnvironmentHelper.GetEnvironmentName();
```

### TimerHelper

강력한 시간 처리 기능으로, 사용자 정의 시간대, Unix 타임스탬프 변환, 날짜 경계 계산 등을 지원합니다.

**핵심 기능:**

- **시간대 지원**: `CurrentTimeZone`으로 현재 시간대를 가져오거나 설정 (기본값은 시스템 로컬 시간대)
- **타임스탬프 처리**: `UnixTimeSeconds()`, `UnixTimeMilliseconds()`로 현재 타임스탬프 가져오기
- **날짜 경계 계산**: 오늘/이번 주/이번 달/올해의 시작 및 종료 시간 가져오기
- **시간차 계산**: `GetElapsedSeconds()`, `GetTimeDifference()`
- **테스트 보조**: `SetTimeOffset()`으로 시간 오프셋 설정

```csharp
using GameFrameX.Foundation.Utility;

// Unix 타임스탬프 상수
DateTime epochLocal = TimerHelper.EpochLocal;
DateTime epochUtc = TimerHelper.EpochUtc;

// 현재 타임스탬프 가져오기
long unixSeconds = TimerHelper.UnixTimeSeconds();
long unixMilliseconds = TimerHelper.UnixTimeMilliseconds();

// 시간대 설정 (선택 사항)
TimerHelper.SetTimeZone(TimeZoneInfo.FindSystemTimeZoneById("China Standard Time"));

// 날짜 경계 계산
DateTime weekStart = TimerHelper.GetWeekStartTime();
DateTime weekEnd = TimerHelper.GetWeekEndTime();
DateTime monthStart = TimerHelper.GetMonthStartTime();

// 경과 시간 계산
long elapsed = TimerHelper.GetElapsedSeconds(timestamp);

// 같은 주인지 판별
bool isSameWeek = TimerHelper.IsNowSameWeek(lastLoginTime);
```

### Snowflake ID 생성기

Snowflake 알고리즘 기반의 분산 고유 ID 생성기입니다.

```csharp
using GameFrameX.Foundation.Utility;

// ID 생성
long id1 = SnowFlakeIdHelper.GenerateId();
long id2 = SnowFlakeIdHelper.GenerateId();

// Worker ID 및 데이터 센터 ID 설정
SnowFlakeIdHelper.WorkId = 1;        // Worker ID (0-31)
SnowFlakeIdHelper.DataCenterId = 1;  // 데이터 센터 ID (0-31)

long configuredId = SnowFlakeIdHelper.GenerateId();
```

#### Snowflake ID 알고리즘 상세

Snowflake ID는 Twitter가 오픈소스로 공개한 분산 ID 생성 알고리즘으로, 다음과 같은 특징이 있습니다:

- **전역 고유**: 분산 환경에서 ID의 고유성 보장
- **추세 증가**: 생성된 ID가 대략적으로 시간순으로 증가하여 데이터베이스 인덱스에 유리
- **고성능**: 단일 머신에서 초당 수백만 개의 ID 생성 가능
- **종속성 없음**: 데이터베이스나 다른 외부 시스템에 의존하지 않음

ID 구조 (64비트):

```
0 - 0000000000 0000000000 0000000000 0000000000 0 - 00000 - 00000 - 000000000000
|   |                                             |   |       |       |
|   |<-------------- 41비트 타임스탬프 ----------------->|   |<-5비트->|<-5비트->|<--12비트--->
|                                                 |           |       |
부호 비트(1비트)                                      |    데이터 센터 ID  일련번호
                                                  |      (5비트)      (12비트)
                                               Worker ID
                                                (5비트)
```

- **1비트 부호 비트**: 항상 0
- **41비트 타임스탬프**: 밀리초 정밀도, 약 69년 사용 가능
- **5비트 데이터 센터 ID**: 32개 데이터 센터 지원
- **5비트 Worker ID**: 데이터 센터당 32개 작업 노드 지원
- **12비트 일련번호**: 밀리초당 4096개 ID 지원

## 고급 사용법

```csharp
using GameFrameX.Foundation.Utility;

namespace MyApplication
{
    class Program
    {
        static void Main(string[] args)
        {
            // 애플리케이션 로고 출력
            ConsoleHelper.PrintLogo();

            // 실행 환경 확인
            string env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? Environments.Development;
            Console.WriteLine($"Current environment: {env}");

            // Snowflake ID 생성기 설정
            SnowFlakeIdHelper.WorkId = 1;
            SnowFlakeIdHelper.DataCenterId = 1;

            // 고유 ID 생성
            for (int i = 0; i < 5; i++)
            {
                long id = SnowFlakeIdHelper.GenerateId();
                long timestamp = TimerHelper.UnixTimeMilliseconds();
                Console.WriteLine($"ID: {id}, Timestamp: {timestamp}");
                Thread.Sleep(1);
            }

            // 시간 처리
            Console.WriteLine($"Unix epoch (UTC): {TimerHelper.EpochUtc}");
            Console.WriteLine($"Unix epoch (local): {TimerHelper.EpochLocal}");
            Console.WriteLine($"Current Unix timestamp (seconds): {TimerHelper.UnixTimeSeconds()}");
            Console.WriteLine($"Current Unix timestamp (ms): {TimerHelper.UnixTimeMilliseconds()}");
        }
    }
}
```

## 모범 사례

1. **시간대 설정**: 애플리케이션 시작 시 시간대를 통일하여 설정하고, 시간대 간 계산 불일치 방지 (`TimerHelper.SetTimeZone()`)
2. **Snowflake ID 초기화**: 각 서비스 인스턴스는 다른 Worker ID와 DataCenter ID 조합을 사용하여 ID의 전역 고유성 보장
3. **환경 판별**: `EnvironmentHelper.IsDevelopment()`를 사용하여 환경 변수를 수동으로 확인하는 대신 코드 일관성 유지
4. **콘솔 출력**: 프로덕션 환경에서는 `WriteError`와 `WriteWarning`만 사용하고 과도한 로그 출력 방지

## API 레퍼런스

| 클래스 | 메서드/속성 | 설명 |
|----|-----------|------|
| `ConsoleHelper` | `WriteLine(string)` | 일반 텍스트 출력 |
| `ConsoleHelper` | `WriteInfo(string)` | 정보 레벨 출력 |
| `ConsoleHelper` | `WriteSuccess(string)` | 성공 메시지 출력 |
| `ConsoleHelper` | `WriteWarning(string)` | 경고 메시지 출력 |
| `ConsoleHelper` | `WriteError(string)` | 오류 메시지 출력 |
| `ConsoleHelper` | `PrintLogo()` | 애플리케이션 로고 출력 |
| `EnvironmentHelper` | `IsDevelopment()` | 개발 환경 여부 판별 |
| `EnvironmentHelper` | `GetEnvironmentName()` | 현재 환경 이름 가져오기 |
| `TimerHelper` | `UnixTimeSeconds()` | 현재 Unix 타임스탬프 가져오기 (초) |
| `TimerHelper` | `UnixTimeMilliseconds()` | 현재 Unix 타임스탬프 가져오기 (밀리초) |
| `TimerHelper` | `SetTimeZone(TimeZoneInfo)` | 시간대 설정 |
| `TimerHelper` | `GetWeekStartTime()` | 이번 주 시작 시간 가져오기 |
| `TimerHelper` | `GetWeekEndTime()` | 이번 주 종료 시간 가져오기 |
| `TimerHelper` | `GetMonthStartTime()` | 이번 달 시작 시간 가져오기 |
| `TimerHelper` | `GetElapsedSeconds(long)` | 경과 초 계산 |
| `TimerHelper` | `IsNowSameWeek(DateTime)` | 현재와 같은 주인지 판별 |
| `TimerHelper` | `EpochUtc` | Unix 에포크 시간 (UTC) |
| `TimerHelper` | `EpochLocal` | Unix 에포크 시간 (로컬) |
| `SnowFlakeIdHelper` | `GenerateId()` | Snowflake ID 생성 |
| `SnowFlakeIdHelper` | `WorkId` | Worker ID (0-31) |
| `SnowFlakeIdHelper` | `DataCenterId` | 데이터 센터 ID (0-31) |

## 라이선스

MIT + Apache 2.0
