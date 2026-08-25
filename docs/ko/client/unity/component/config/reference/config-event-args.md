# EventArgs 참조: LoadConfigSuccess / Failure / Update

이 페이지에는 GameFrameX 구성 모듈이 전역 구성을 로드하는 과정에서 디스패치하는 세 가지 이벤트 매개변수 유형이 정리되어 있습니다: `LoadConfigSuccessEventArgs`, `LoadConfigFailureEventArgs`, `LoadConfigUpdateEventArgs`. 모두 `GameFrameX.Config.Runtime` 네임스페이스에 있으며, `GameFrameX.Event.Runtime.GameEventArgs`를 상속받고 `ReferencePool`에서 생명 주기를 관리합니다.

## LoadConfigSuccessEventArgs

전역 구성 로드 성공 시 디스패치되며, `EventId` 구독을 통해 청취할 수 있습니다.

| 멤버 | 타입 | 설명 |
|------|------|------|
| `EventId` | `static readonly string` | 이벤트 ID, 값은 타입 전체 이름 `GameFrameX.Config.Runtime.LoadConfigSuccessEventArgs` |
| `Id` | `string`(재정의) | `EventId`를 반환 |
| `ConfigAssetName` | `string` | 전역 구성 리소스 이름 |
| `Duration` | `float` | 로드 지속 시간(초) |
| `UserData` | `object` | 사용자 정의 데이터 |
| `Create(string, float, object)` | `static LoadConfigSuccessEventArgs` | 참조 풀에서 인스턴스 생성 |
| `Clear()` | `void`(재정의) | 필드 초기화: `ConfigAssetName = null`, `Duration = 0f`, `UserData = null` |

사용 예시:

```csharp
var args = LoadConfigSuccessEventArgs.Create("GlobalConfig", 1.25f, userData);
GameFrameX.Event.Runtime.GameEntry.Event.Fire(args);
// 청취
GameEntry.Event.Subscribe(LoadConfigSuccessEventArgs.EventId, e =>
{
    var s = (LoadConfigSuccessEventArgs)e;
    Debug.Log($"구성 {s.ConfigAssetName} 로드 완료, 소요 시간 {s.Duration}s");
});
```

Source: [LoadConfigSuccessEventArgs.cs](/Runtime/EventArgs/LoadConfigSuccessEventArgs.cs#L43-L137)

## LoadConfigFailureEventArgs

전역 구성 로드 실패 시 디스패치되며, `EventId` 구독을 통해 청취할 수 있습니다.

| 멤버 | 타입 | 설명 |
|------|------|------|
| `EventId` | `static readonly string` | 이벤트 ID, 값은 타입 전체 이름 `GameFrameX.Config.Runtime.LoadConfigFailureEventArgs` |
| `Id` | `string`(재정의) | `EventId`를 반환 |
| `ConfigAssetName` | `string` | 전역 구성 리소스 이름 |
| `ErrorMessage` | `string` | 오류 메시지 |
| `UserData` | `object` | 사용자 정의 데이터 |
| `Create(string, string, object)` | `static LoadConfigFailureEventArgs` | 참조 풀에서 인스턴스 생성 |
| `Clear()` | `void`(재정의) | 필드 초기화: `ConfigAssetName = null`, `ErrorMessage = null`, `UserData = null` |

사용 예시:

```csharp
var args = LoadConfigFailureEventArgs.Create("GlobalConfig", exception.Message, userData);
GameEntry.Event.Fire(args);
```

Source: [LoadConfigFailureEventArgs.cs](/Runtime/EventArgs/LoadConfigFailureEventArgs.cs#L43-L137)

## LoadConfigUpdateEventArgs

전역 구성 로드 과정에서 진행률에 따라 디스패치되며, `EventId` 구독을 통해 청취할 수 있습니다.

| 멤버 | 타입 | 설명 |
|------|------|------|
| `EventId` | `static readonly string` | 이벤트 ID, 값은 타입 전체 이름 `GameFrameX.Config.Runtime.LoadConfigUpdateEventArgs` |
| `Id` | `string`(재정의) | `EventId`를 반환 |
| `ConfigAssetName` | `string` | 전역 구성 리소스 이름 |
| `Progress` | `float` | 로드 진행률, 범위 `0.0` ~ `1.0` |
| `UserData` | `object` | 사용자 정의 데이터 |
| `Create(string, float, object)` | `static LoadConfigUpdateEventArgs` | 참조 풀에서 인스턴스 생성 |
| `Clear()` | `void`(재정의) | 필드 초기화: `ConfigAssetName = null`, `Progress = 0f`, `UserData = null` |

사용 예시:

```csharp
var args = LoadConfigUpdateEventArgs.Create("GlobalConfig", 0.5f, userData);
GameEntry.Event.Fire(args);
```

Source: [LoadConfigUpdateEventArgs.cs](/Runtime/EventArgs/LoadConfigUpdateEventArgs.cs#L43-L137)

## 공통 규약

| 항목 | 값 |
|----|----|
| 네임스페이스 | `GameFrameX.Config.Runtime` |
| 기본 클래스 | `GameFrameX.Event.Runtime.GameEventArgs` |
| 인스턴스화 방식 | 반드시 정적 `Create(...)` 메서드를 통해 `ReferencePool`에서 가져와야 함 |
| 해제 방식 | 프레임워크 내부에서 이벤트 디스패치 완료 후 `Clear()`를 호출하고 참조 풀에 반환하므로 비즈니스 측에서 수동으로 해제할 필요 없음 |
| 청취 키 | `typeof(XXXEventArgs).FullName` 사용, 즉 각 클래스 자신의 `EventId` 정적 필드 |