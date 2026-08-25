# 설정 테이블 업데이트가 적용되지 않을 때 어떻게 해야 하나요

런타임에 설정 테이블을 다시 로드하거나, 다시 읽거나, 다시 `Add` 했는데 데이터가 변하지 않는다면, 문제는 대부분 「이미 존재하는 키가 새로운 값으로 건너뛰어짐」, 「캐시된 이전 참조를 읽음」, 또는 「키 이름과 타입이 일치하지 않음」 세 가지 단계에서 발생합니다.

## 빠른 진단

| 증상 | 원인 | 해결 |
|------|------|------|
| `Add` 호출 후에도 `GetConfig`가 여전히 이전 값을 반환함 | `AddConfig` 내부에서 `TryAdd`를 사용하며, 키가 이미 존재하면 **덮어쓰지 않음** | 먼저 `RemoveConfig`를 호출한 뒤 `AddConfig`를 호출하거나, `HasConfig`로 먼저 확인 |
| 설정 파일을 수정한 후에도 실행 중인 데이터가 갱신되지 않음 | 데이터 테이블 인스턴스가 이전 참조로 유지되어, dict의 객체만 갱신되고 교체되지 않음 | `IDataTable`을 다시 구성한 후, 이전 키를 제거하고 `Add` |
| `HasConfig<T>()`가 false를 반환하지만 설정은 분명히 로드되어 있음 | `GetTypeName<T>()`이 `typeof(T).Name`을 키로 사용하므로, 제네릭 타입 인자가 일치하지 않음 | `T`가 동일한 구체 클래스(예: `BaseDataTable`이 아닌 `PlayerConfig`)인지 확인 |
| `RemoveAllConfigs()` 후에도 `GetConfig`로 값을 가져올 수 있음 | `ConfigComponent` 내부에 `m_ConfigNameTypeMap` 캐시가 있어, 비운 후 다시 `Add`하지 않음 | 비운 후 로드流程을 다시 실행하고, 캐시에만 의존하지 말 것 |
| 설정 다시 로드 시 이벤트가 발생하지 않음 | `LoadConfigUpdateEventArgs` / `LoadConfigSuccessEventArgs`를 구독하지 않음 | `ConfigComponent.Awake` 이후 관련 이벤트를 구독, 아래 코드 참조 |

## 해결 단계

### 1. 중복 Add가 적용되지 않음 — 먼저 Remove 후 Add

`ConfigManager.AddConfig` 내부는 `m_ConfigDatas.TryAdd(configName, configValue)`를 호출하므로, `ConcurrentDictionary`에서는 **키가 이미 존재하면 덮어쓰지 않습니다**. 값을 업데이트하려면 반드시 이전 항목을 먼저 제거해야 합니다.

```csharp
var component = GameFrameX.Runtime.GameEntry.GetComponent<ConfigComponent>();

// 잘못된 작성: 덮어쓰지 않음
component.Add("PlayerConfig", newDataTable);

// 올바른 작성: 먼저 제거 후 추가
if (component.HasConfig<PlayerConfig>())
{
    component.RemoveConfig<PlayerConfig>();
}
component.Add("PlayerConfig", newDataTable);
```

Source: [Runtime/Config/Config/ConfigManager.cs#L120-L127](/src/Runtime/Config/Config/ConfigManager.cs#L120-L127)

### 2. 키 이름과 타입이 일치하지 않음 — typeof(T).Name 일관성 유지

`ConfigComponent.GetTypeName<T>()`은 `typeof(T).Name`을 dict의 키로 사용합니다. 따라서 `HasConfig<PlayerConfig>()`와 `HasConfig<BaseDataTable>()`은 **서로 다른 키**를 가져오며, 부모 클래스 참조로는 자식 클래스 항목에 접근할 수 없습니다. `T`가 로드 시 사용한 구체 클래스와 동일한지 확인하세요.

```csharp
// 일관성 있음: 구체 클래스 사용
var data = component.GetConfig<PlayerConfig>();

// 일관성 없음: 인터페이스나 부모 클래스를 사용하면 조회 불가
var data = component.GetConfig<IDataTable>();
```

Source: [Runtime/Config/ConfigComponent.cs#L96-L107](/src/Runtime/Config/ConfigComponent.cs#L96-L107)

### 3. 다시 로드 후에도 참조가 이전 객체임 — 테이블 전체 교체

`GetConfig`가 반환하는 것은 `IDataTable` 인터페이스이며, **dict에는 참조가 보관됩니다**. 내부 컬렉션만 수정하고 새로운 테이블을 다시 `Add`하지 않으면, 일부 시리얼라이저/캐시 계층은 변화를 감지하지 못합니다. 안전한 방법은 새로운 `IDataTable` 인스턴스를 구성하여 dict 항목을 교체하는 것입니다.

```csharp
var newTable = LoadFromBytes(bytes); // 사용자의 역직렬화 로직
if (component.HasConfig<PlayerConfig>())
{
    component.RemoveConfig<PlayerConfig>();
}
component.Add(nameof(PlayerConfig), newTable);
```

Source: [Runtime/Config/Config/ConfigManager.cs#L138-L141](/src/Runtime/Config/Config/ConfigManager.cs#L138-L141)

### 4. 다시 로드 이벤트가 콜백되지 않음 — 해당 EventArgs 구독

저장소는 `Runtime/EventArgs/` 아래에 `LoadConfigUpdateEventArgs`, `LoadConfigSuccessEventArgs`, `LoadConfigFailureEventArgs` 세 가지 이벤트 매개변수 클래스를 제공합니다. 로드 流程을 다시 작성한 경우, `GameFrameX.Runtime.GameEntry.GetComponent<ConfigComponent>()`로 인스턴스를 가져온 후 프레임워크 이벤트 메커니즘을 통해 구독해야 합니다. 그렇지 않으면 완료 콜백이 트리거되지 않아 마치 "적용되지 않은 것처럼" 보입니다.

```csharp
// 예시: 커스텀 로더에서 fire, 프레임워크 이벤트 메커니즘 사용
GameFrameX.Runtime.GameEntry.GetComponent<ConfigComponent>()
    .SendEvent(nameof(LoadConfigSuccessEventArgs), new LoadConfigSuccessEventArgs { ... });
```

## 검증

1. `Add` 전에 `HasConfig<T>()`를 호출하여 반환값이 `true`일 때 먼저 `RemoveConfig<T>()`를 수행하세요.
2. `GetConfig<T>()`를 호출한 후, 디버거에서 `m_ConfigDatas`(리플렉션으로 접근 가능)의 참조가 새로운 테이블과 동일한 객체인지 확인하세요.
3. `IDataTable`의 내부 컬렉션을 수정한 경우, **새 인스턴스를 다시 구성**하여 참조가 교체되도록 하세요.
4. 주요 경로에 로그를 추가하세요: `typeof(T).Name`, `HasConfig` 반환값, 그리고 로드 완료 이벤트 트리거 여부를 출력하세요.

## 관련 링크

- [ConfigComponent.cs](/src/Runtime/Config/ConfigComponent.cs)
- [ConfigManager.cs](/src/Runtime/Config/Config/ConfigManager.cs)
- [IConfigManager.cs](/src/Runtime/Config/Config/IConfigManager.cs)
- [BaseDataTable.cs](/src/Runtime/Config/Config/BaseDataTable.cs)
- [LoadConfigUpdateEventArgs.cs](/src/Runtime/EventArgs/LoadConfigUpdateEventArgs.cs)
- [LoadConfigSuccessEventArgs.cs](/src/Runtime/EventArgs/LoadConfigSuccessEventArgs.cs)
- [LoadConfigFailureEventArgs.cs](/src/Runtime/EventArgs/LoadConfigFailureEventArgs.cs)