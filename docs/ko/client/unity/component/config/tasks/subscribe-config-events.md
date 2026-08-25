# 설정 로드 이벤트 구독 방법(성공 / 실패 / 핫 업데이트)

GameFrameX의 전역 이벤트 관리자를 통해 `LoadConfigSuccessEventArgs`, `LoadConfigFailureEventArgs`, `LoadConfigUpdateEventArgs` 세 가지 이벤트를 구독하면 설정 로드 성공, 실패, 핫 업데이트 진행률 변화 시 콜백을 받을 수 있으며, `ConfigComponent`에 직접 의존할 필요가 없습니다.

## 사전 조건

- GameFrameX 프레임워크가 초기화되어 있고, `GameFrameworkEntry.GetModule<IConfigManager>()`로 설정 관리자를 가져올 수 있어야 합니다.
- 프로젝트에서 `GameFrameX.Config.Runtime` 네임스페이스의 세 가지 `EventArgs` 클래스를 찾을 수 있어야 합니다(프레임워크 자체 제공, 직접 생성할 필요 없음).

## 이벤트 개요

| 이벤트 타입 | EventId 출처 | 주요 필드 | 트리거 시점 |
|----------|--------------|----------|----------|
| `LoadConfigSuccessEventArgs` | `typeof(LoadConfigSuccessEventArgs).FullName` | `ConfigAssetName`, `Duration`, `UserData` | 단일 설정 로드 완료 및 성공 |
| `LoadConfigFailureEventArgs` | `typeof(LoadConfigFailureEventArgs).FullName` | `ConfigAssetName`, `ErrorMessage`, `UserData` | 설정 로드 중 예외 발생 또는 실패 |
| `LoadConfigUpdateEventArgs` | `typeof(LoadConfigUpdateEventArgs).FullName` | `ConfigAssetName`, `Progress`(0~1), `UserData` | 설정 로드/핫 업데이트 진행률 변화 |

이벤트 ID, 필드 정의는 모두 소스 코드의 EventArgs 클래스에서 가져온 것입니다. Source: [Runtime/EventArgs/LoadConfigSuccessEventArgs.cs](/Runtime/EventArgs/LoadConfigSuccessEventArgs.cs#L42-L137), [Runtime/EventArgs/LoadConfigFailureEventArgs.cs](/Runtime/EventArgs/LoadConfigFailureEventArgs.cs#L43-L137), [Runtime/EventArgs/LoadConfigUpdateEventArgs.cs](/Runtime/EventArgs/LoadConfigUpdateEventArgs.cs#L43-L137).

## 작업 단계

1. 전역 이벤트 구독자를 가져옵니다(GameFrameX 프로젝트에서 제공하는 진입점 중 하나를 선택하며, 일반적으로 `GameFrameXEntry.GetModule<IEventManager>()` 또는 캡슐화된 `GameEntry.Event`이며, 구독 API는 모두 `Subscribe(eventId, handler)`입니다).
2. 초기화 단계에서 `Subscribe`를 호출하여 콜백을 해당 `EventId`에 등록합니다(하드코딩된 문자열을 피하기 위해 `EventArgs` 클래스의 `EventId` 정적 필드를 직접 사용).
3. 콜백에서 `GameEventArgs`를 구체적인 `LoadConfigXxxEventArgs`로 강제 형변환하고 필드를 읽습니다.
4. 프레임워크 내부는 `ReferencePool.Acquire`를 사용하여 이벤트 인스턴스를 생성하고, `GameEntry.Event.Fire(this, EventId, e)`로 전달합니다. 구독 콜백 실행이 완료되면 프레임워크가 자동으로 `Clear()`를 호출하고 회수하므로 콜백에서 장기간 참조를 유지하지 마십시오. Source: [Runtime/EventArgs/LoadConfigSuccessEventArgs.cs](/Runtime/EventArgs/LoadConfigSuccessEventArgs.cs#L116-L136)
5. 더 이상 필요하지 않을 때 해당 `Unsubscribe(eventId, handler)`를 호출하십시오. 그렇지 않으면 메모리 누수 또는 중복 트리거가 발생할 수 있습니다.

최소 구독 예제(의사 코드, 구체적인 `IEventManager` 진입점은 프로젝트의 실제 캡슐화를 기준으로 함):

```csharp
using GameFrameX.Config.Runtime;
using GameFrameX.Event.Runtime;
using GameFrameX.Runtime;

var eventManager = GameFrameXEntry.GetModule<IEventManager>();

// 성공
eventManager.Subscribe(LoadConfigSuccessEventArgs.EventId, OnLoadConfigSuccess);
// 실패
eventManager.Subscribe(LoadConfigFailureEventArgs.EventId, OnLoadConfigFailure);
// 진행률/핫 업데이트
eventManager.Subscribe(LoadConfigUpdateEventArgs.EventId, OnLoadConfigUpdate);
```

```csharp
private void OnLoadConfigSuccess(object sender, GameEventArgs e)
{
    var args = (LoadConfigSuccessEventArgs)e;
    // args.ConfigAssetName / args.Duration / args.UserData
}

private void OnLoadConfigFailure(object sender, GameEventArgs e)
{
    var args = (LoadConfigFailureEventArgs)e;
    // args.ErrorMessage 에 실패 원인 포함
}

private void OnLoadConfigUpdate(object sender, GameEventArgs e)
{
    var args = (LoadConfigUpdateEventArgs)e;
    // args.Progress 값 범위는 0.0 ~ 1.0
}
```

구독 취소:

```csharp
eventManager.Unsubscribe(LoadConfigSuccessEventArgs.EventId, OnLoadConfigSuccess);
eventManager.Unsubscribe(LoadConfigFailureEventArgs.EventId, OnLoadConfigFailure);
eventManager.Unsubscribe(LoadConfigUpdateEventArgs.EventId, OnLoadConfigUpdate);
```

## 일반적인 변형

- **`ConfigAssetName`으로 필터링**: 성공/실패/진행률 이벤트는 모두 `ConfigAssetName`을 가지므로, 콜백에서 `switch`로 판단한 후 관심 있는 설정 테이블만 처리할 수 있습니다.
- **비즈니스 매개변수 전달**: 설정 로드 시 전달된 `userData`는 `UserData` 필드로 그대로 회신되어 요청 컨텍스트 연결에 사용할 수 있습니다.
- **핫 업데이트 모니터링**: `LoadConfigUpdateEventArgs`의 `Progress`를 진행률 UI에 연결합니다. `Progress`가 1.0에 도달한 후 일반적으로 동일한 `ConfigAssetName`을 가진 `LoadConfigSuccessEventArgs`가 뒤따릅니다.

## 일반적인 오류

- **수동으로 이벤트 객체 `new`**: EventArgs는 각자의 `Create(...)` 정적 메서드로 생성해야 하며, 프레임워크 내부는 `ReferencePool.Acquire`를 거칩니다. 직접 `new`하면 객체 풀을 우회합니다. Source: [Runtime/EventArgs/LoadConfigFailureEventArgs.cs](/Runtime/EventArgs/LoadConfigFailureEventArgs.cs#L116-L123)
- **콜백에서 이벤트 인스턴스를 장기간 보유**: 이벤트 콜백이 종료되면 `Clear()`되고 참조 풀로 회수되므로, 비즈니스 코드는 콜백 스코프 내에서만 `args`를 사용해야 합니다.
- **EventId 문자열 하드코딩**: `LoadConfigXxxEventArgs.EventId` 정적 필드를 사용하십시오. 클래스 이름이 변경되어도失效하지 않습니다.
- **동일 콜백 중복 구독**: 여러 번 트리거됩니다. `Unsubscribe` 시 구독 시 전달한 델리게이트 참조와 일치하는지 확인하십시오.

## 배경(선택 사항)

`ConfigComponent`는 캐시 읽기/쓰기만 담당하며 이벤트를 직접 노출하지 않습니다. 설정 로드/핫 업데이트 과정에서 하위 모듈이 전역 `IEventManager`를 통해 이 세 가지 유형의 `EventArgs`를 전달하며, 구독자는 `EventId`로 구분하면 됩니다. Source: [Runtime/Config/ConfigComponent.cs](/Runtime/Config/ConfigComponent.cs#L49-L186)