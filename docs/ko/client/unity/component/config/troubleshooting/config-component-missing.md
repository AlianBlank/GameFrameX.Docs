# GetComponent<ConfigComponent> 이 null을 반환할 때 대처 방법

`GetComponent<ConfigComponent>()`이 `null`을 반환하는 경우는 보통 씬에 `ConfigComponent`가 전혀 부착되지 않았거나, Game Framework 진입 모듈이 아직 초기화되지 않았기 때문입니다. 이 페이지에서는 우선순위에 따라 문제를 빠르게 진단하고 해결하는 단계를 안내합니다.

## 빠른 진단

| 증상 | 원인 | 해결 |
|------|------|------|
| `GetComponent<ConfigComponent>()`이 `null`을 반환 | 씬의 GameObject에 `ConfigComponent`가 부착되지 않음 | 아래의 "ConfigComponent 부착" 단계에 따라 추가 |
| 컴포넌트는 부착되어 있지만 여전히 `null`을 반환 | 쿼리 대상이 `GameFrameworkEntry`가 있는 GameObject가 아님 | `GameFrameworkEntry`가 있는 객체에서 가져오기 |
| 시작 로그에 `Config manager is invalid.` 출력 | `IConfigManager` 모듈이 등록되지 않음 | `GameFrameX.Config` 패키지가 설치되어 있고 자동 등록이 활성화되어 있는지 확인 |
| 에디터에서는 가져올 수 있지만 빌드 후에는 `null`을 반환 | 패키지 트리밍으로 인해 `ConfigComponent`가 제거됨 | `GameFrameXConfigCroppingHelper`를 도입 (아래 설명 참조) |

## 해결 단계

### 1. 씬에 ConfigComponent가 부착되어 있는지 확인

`ConfigComponent`는 `GameFrameworkEntry`가 있는 GameObject에 부착되어야만 정상 작동합니다. 이 컴포넌트에는 `[GameFrameXAutoComponent(-5000)]` 특성이 부여되어 있으며, 대부분의 GameFrameX 프로젝트 템플릿에서 진입점과 함께 자동으로 생성됩니다.

```csharp
using GameFrameX.Config.Runtime;
using UnityEngine;

var configComponent = GameObject.FindObjectOfType<ConfigComponent>();
if (configComponent == null)
{
    Debug.LogError("씬에서 ConfigComponent를 찾을 수 없습니다. GameFrameworkEntry가 있는 GameObject에 부착해 주세요");
    return;
}
```

Source: [ConfigComponent.cs](/Runtime/Config/ConfigComponent.cs#L46-L50)

### 2. 올바른 객체에서 컴포넌트 가져오기

`ConfigComponent`는 `GameFrameworkComponent`의 서브클래스로, 반드시 Game Framework 진입점 GameObject에 부착해야 합니다. 스크립트가 다른 GameObject에 부착되어 있다면, `GameFrameworkEntry`가 있는 객체에서 가져와야 합니다.

```csharp
using GameFrameX.Config.Runtime;
using GameFrameX.Runtime;
using UnityEngine;

// Game Framework 진입점 GameObject 가져오기
var entryGo = GameObject.Find("GameFrameworkEntry");
var configComponent = entryGo.GetComponent<ConfigComponent>();
```

진입점 객체의 이름이 다른 경우, Hierarchy에서 `GameFrameworkEntry` 스크립트가 붙은 GameObject를 검색하세요.

### 3. 런타임 로그 확인

`ConfigComponent.Awake()`는 `IConfigManager`를 사용할 수 없을 때 치명적인 로그를 출력합니다.

```csharp
m_ConfigManager = GameFrameworkEntry.GetModule<IConfigManager>();
if (m_ConfigManager == null)
{
    Log.Fatal("Config manager is invalid.");
    return;
}
```

Source: [ConfigComponent.cs](/Runtime/Config/ConfigComponent.cs#L79-L84)

`Config manager is invalid.`가 표시되면 `IConfigManager`가 `GameFrameworkEntry`에 등록되지 않은 것입니다. `GameFrameX.Config` 패키지가 포함되어 있는지, 그리고 관련 모듈이 트리밍되지 않았는지 확인하세요.

### 4. IL2CPP / 빌드 후 트리밍 방지

이 컴포넌트는 자동 등록을 사용하므로, 런타임 코드에서 명시적으로 `ConfigComponent`를 참조하지 않으면 릴리스 버전이 트리밍될 수 있습니다. 저장소에는 트리밍 헬퍼가 이미 제공되어 있습니다.

```csharp
_ = typeof(ConfigComponent);
```

Source: [GameFrameXConfigCroppingHelper.cs](/Runtime/GameFrameXConfigCroppingHelper.cs#L21)

씬 초기화 시 또는 임의의 `RuntimeInitializeOnLoadMethod`에서 이 헬퍼를 호출하면 `ConfigComponent` 타입이 트리밍되지 않도록 보장할 수 있습니다. 빌드 후 실제 기기에서 다시 한 번 `GetComponent<ConfigComponent>()`로 확인하세요.

## 검증

1. 에디터에서 실행한 후, Hierarchy에서 `GameFrameworkEntry`가 있는 GameObject를 선택하면 Inspector에 `Config Component` 필드가 표시되어야 합니다.
2. 위의 `GetComponent` 경로를 통해 null이 아닌 인스턴스를 가져온 후, `configComponent.Count`를 호출해도 예외가 발생하지 않아야 합니다.
3. Android/iOS로 빌드한 뒤 첫 씬 런타임 로그에서 `Config manager is invalid.`가 발생하지 않는지 확인하세요.

## 일반적인 변형

- **런타임 동적 생성**: `new GameObject().AddComponent<ConfigComponent>()`를 사용하지 마세요. `ConfigComponent`는 반드시 `GameFrameworkEntry`의 GameObject에 있어야 `GameFrameworkEntry` 모듈 시스템과 협조할 수 있습니다.
- **다중 씬 전환**: 각 독립 씬은 모두 `GameFrameworkEntry`를 보유하고 있어야 합니다. 그렇지 않으면 씬 전환 후 컴포넌트가 유실됩니다.

## 관련 링크

- 컴포넌트의 `Awake` 초기화 로직에 대해서는 [ConfigComponent.cs](/Runtime/Config/ConfigComponent.cs#L73-L85)를 참조하세요.
- 에디터 측 검사에 대해서는 [ConfigComponentInspector.cs](/Editor/Inspector/ConfigComponentInspector.cs#L37-L40)를 참조하세요.