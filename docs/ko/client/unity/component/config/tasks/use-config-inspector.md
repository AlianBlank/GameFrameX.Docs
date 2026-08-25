# Unity Inspector에서 ConfigComponent를 확인하고 관리하는 방법

`ConfigComponent`가 부착된 GameObject에서 Unity Inspector는 자동으로 사용자 지정 Inspector를 사용하여 해당 컴포넌트의 인터페이스와 구현 타입 매핑을 표시합니다. 코드를 작성하지 않고도 현재 구성 컴포넌트에 해당하는 `IConfigManager` 인터페이스 및 구현 클래스 전체 이름을 확인하고, 필요할 때 수동으로 사용자 지정 구현을 지정할 수 있습니다.

## 사전 조건

- `com.gameframex.unity.config` 패키지가 설치되어 있고 프로젝트에 `ConfigComponent` 클래스가 존재합니다.
- 씬에 GameObject가 존재하고 `ConfigComponent`가 부착되어 있어야 합니다(컴포넌트 메뉴 위치: `GameFrameX/Config`).

## 작업 단계

1. `ConfigComponent`가 부착된 GameObject를 씬에서 선택하면 Inspector가 자동으로 사용자 지정 Inspector로 전환됩니다. 사용자 지정 Inspector는 `CustomEditor(typeof(ConfigComponent))` 속성으로 바인딩됩니다.

    ```csharp
    [CustomEditor(typeof(ConfigComponent))]
    internal sealed class ConfigComponentInspector : ComponentTypeComponentInspector
    {
        protected override void RefreshTypeNames()
        {
            RefreshComponentTypeNames(typeof(IConfigManager));
        }
    }
    ```

    Source: [Editor/Inspector/ConfigComponentInspector.cs#L38-L45](/src/Editor/Inspector/ConfigComponentInspector.cs#L38-L45)

2. Inspector 상단에는 컴포넌트 타입 관련 읽기 전용 필드가 표시되며, 여기에는 `InterfaceComponentType`(고정값 `IConfigManager`)과 `ImplementationComponentType`(`Awake()` 시 `componentType` 문자열로 파싱됨)이 포함됩니다. 이는 런타임 구성 관리자 구현이 올바른지 판단하는 가장 빠른 방법입니다.

    ```csharp
    protected override void Awake()
    {
        m_ConfigNameTypeMap.Clear();
        ImplementationComponentType = Utility.Assembly.GetType(componentType);
        InterfaceComponentType = typeof(IConfigManager);
        base.Awake();
        m_ConfigManager = GameFrameworkEntry.GetModule<IConfigManager>();
        if (m_ConfigManager == null)
        {
            Log.Fatal("Config manager is invalid.");
            return;
        }
    }
    ```

    Source: [Runtime/Config/ConfigComponent.cs#L73-L85](/src/Runtime/Config/ConfigComponent.cs#L73-L85)

3. 런타임에 `Config manager is invalid.` 치명적 로그가 나타나면 `IConfigManager` 모듈이 등록되지 않은 것이므로 먼저 Game Framework의 모듈 등록 절차로 돌아가서 문제를 해결하세요.

4. 런타임(Play Mode)에서 `Count` 속성을 읽으면 현재 로드된 구성 항목 수를 검증할 수 있습니다.

    ```csharp
    var configComponent = GameEntry.GetComponent<ConfigComponent>();
    int count = configComponent.Count;
    ```

    Source: [Runtime/Config/ConfigComponent.cs#L62-L65](/src/Runtime/Config/ConfigComponent.cs#L62-L65)

5. 스크립트에서 타입별로 구성 항목을 가져오기, 확인, 제거, 비우기 작업(이 API는 런타임 디버깅에도 간접적으로 사용됩니다).

    ```csharp
    // 구성 항목 가져오기(타입은 반드시 IDataTable을 구현해야 함)
    var cfg = configComponent.GetConfig<MyConfig>();

    // 존재 여부 확인
    bool exists = configComponent.HasConfig<MyConfig>();

    // 단일 항목 제거 / 전체 비우기
    configComponent.RemoveConfig<MyConfig>();
    configComponent.RemoveAllConfigs();

    // 이름으로 직접 추가
    configComponent.Add("MyConfig", dataTableInstance);
    ```

    Source: [Runtime/Config/ConfigComponent.cs#L117-L185](/src/Runtime/Config/ConfigComponent.cs#L117-L185)

## 일반적인 변형

- 사용자 지정 구현 클래스를 사용하려면 `componentType` 필드에 `IConfigManager` 구현 클래스의 전체 이름(네임스페이스 포함)을 입력하면, `Awake()`에서 `Utility.Assembly.GetType`으로 파싱합니다. 파싱 결과는 Inspector의 `ImplementationComponentType`에 표시되므로 쉽게 확인할 수 있습니다.
- 잘림(cropping) 문제를 조사하려면 빌드 스크립트에서 `GameFrameXConfigCroppingHelper`가 `ConfigComponent`와 `BaseDataTable<>`의 참조 보존을 트리거하는지 확인하세요(`[Preserve]` 속성과 잘림 보조 도구에 의해 보장됨).

    ```csharp
    _ = typeof(BaseDataTable<>);
    _ = typeof(ConfigComponent);
    ```

    Source: [Runtime/GameFrameXConfigCroppingHelper.cs#L20-L22](/src/Runtime/GameFrameXConfigCroppingHelper.cs#L20-L22)

## 일반적인 오류

| 증상 | 원인 | 해결 방법 |
|------|------|------|
| Console에 `Config manager is invalid.` 출력 | `IConfigManager` 모듈이 등록되지 않았거나 잘림됨 | 구현 클래스가 존재하고 프레임워크에 의해 자동 등록되었는지 확인; 필요한 경우 잘림을 방지하기 위해 `GameFrameX.Runtime`을 명시적으로 참조 |
| Inspector의 `ImplementationComponentType`이 비어 있음 | `componentType` 문자열의 철자가 틀렸거나 어셈블리가 로드되지 않음 | `componentType`이 구현 클래스의 정규화된 이름과 정확히 일치하는지 확인 |
| `GetConfig<T>`가 `default` 반환 | 해당 이름의 구성 항목이 `Add`로 등록되지 않음 | 먼저 `configComponent.LoadConfig("...")` 또는 `Add(...)`를 호출한 다음 읽기 |

## 배경(선택 사항)

`ConfigComponent`는 `GameFrameworkComponent`를 상속받는 MonoBehaviour이며, 프레임워크는 `[GameFrameXAutoComponent(-5000)]`을 통해 우선순위 -5000으로 자동 등록합니다. Inspector는 `ComponentTypeComponentInspector`에서 파생되며, 핵심 책임은 편집기에서 인터페이스와 구현 클래스의 정규화된 이름을 시각화하여 게임을 실행하지 않아도 모듈装配(조립) 상황을 확인할 수 있도록 하는 것입니다.