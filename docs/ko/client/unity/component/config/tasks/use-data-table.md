# 데이터 테이블(BaseDataTable)을 사용하여 설정 항목을 읽는 방법

`BaseDataTable<T>`는 프레임워크에서 제공하는 설정 데이터 테이블 제네릭 기본 클래스로, ID로 조회, 순회, 필터링 등 일반적으로 사용되는 작업을 캡슐화합니다. 이 페이지를 읽으면 비즈니스 코드에서 ID를 통해 임의의 설정 항목을 가져오고, `TryGet`, `FirstOrDefault`, `All`, `ToList`, `Find` 등의 메서드를 사용하여 일반적인 조회를 완료할 수 있습니다.

## 사전 조건

- `GameFrameX.Config.Runtime` 네임스페이스를 통해 데이터 테이블 어셈블리를 가져왔습니다.
- 데이터 테이블 인스턴스가 `ConfigManager`를 통해 등록되고 `LoadAsync()` 비동기 로드를 완료했습니다.
- `T`는 참조类型(`where T : class`)이어야 합니다.

## 작업 단계

### 1. ConfigManager를 통해 데이터 테이블 인스턴스 가져오기

데이터 테이블은 `ConfigManager`에서 통합 관리하며, 테이블 이름(문자열 키)을 통해 `IDataTable` 인터페이스를 반환합니다.

```csharp
var dataTable = GameFrameX.Runtime.GameFrameXEntry.GetModule<IConfigManager>()
    .GetDataTable<MyConfig>("MyConfig");
```

Source: [ConfigManager.cs](/Runtime/Config/Config/ConfigManager.cs#L49-L60)

### 2. ID로 단일 설정 읽기

`TryGet` 사용을 권장합니다. 찾지 못했을 때 `null` 대신 `false`를 반환하여 NullReferenceException을 방지합니다:

```csharp
if (dataTable.TryGet(1001, out var item))
{
    // id=1001 설정을 찾음
    Debug.Log(item.Name);
}
```

`int`는 암묵적으로 `long`으로 변환되어 `long` 조회와 동일한 딕셔너리를 공유합니다. 문자열 키는 `StringDataMaps`를 사용합니다.

Source: [BaseDataTable.cs](/Runtime/Config/Config/BaseDataTable.cs#L148-L181)

인덱서를 사용하여 한 줄로 처리할 수도 있습니다(찾기 실패 시 `null` 반환):

```csharp
var item = dataTable[1001];
```

Source: [BaseDataTable.cs](/Runtime/Config/Config/BaseDataTable.cs#L192-L223)

### 3. 여러 설정 순회 또는 필터링

컬렉션 뷰가 필요한 경우 `All`(배열) 또는 `ToList()`(리스트)을 우선적으로 사용하세요. 둘 다 독립적인 컨테이너를 복사합니다:

```csharp
foreach (var entry in dataTable.All)
{
    // 각 항목 처리
}
```

조건에 따라 첫 번째 일치 항목 찾기:

```csharp
var firstHit = dataTable.Find(x => x.Level >= 10);
```

Source: [IDataTable.cs](/Runtime/Config/Config/IDataTable.cs#L233-L249)

### 4. 전체 데이터 테이블 동기화

`LoadAsync()`를 호출하여 비동기 로드가 완료될 때까지 기다립니다. `Count`는 항목 수를 반환하고, `FirstOrDefault` / `LastOrDefault`는 첫 번째와 마지막 요소를 가져옵니다:

```csharp
await dataTable.LoadAsync();
Debug.Log($"총 {dataTable.Count}개 항목");
Debug.Log(dataTable.FirstOrDefault?.Name);
```

Source: [BaseDataTable.cs](/Runtime/Config/Config/BaseDataTable.cs#L84-L242)

## 일반적인 변형

| 시나리오 | 사용법 |
|------|------|
| 문자열 기본 키 | `dataTable.TryGet("key_001", out var item)` 또는 `dataTable["key_001"]` |
| long 기본 키 | `dataTable.TryGet(1001L, out var item)` |
| 리스트로 복사 | `List<MyConfig> list = dataTable.ToList();` |
| 배열로 복사 | `MyConfig[] arr = dataTable.ToArray();` |
| 항목 수 계산 | `int n = dataTable.Count;` |
| 첫/마지막 요소 | `T first = dataTable.FirstOrDefault;` `T last = dataTable.LastOrDefault;` |

## 일반적인 오류

- **`Get(int/long/string)` 계속 사용**: 이 세 가지 오버로드는 `[Obsolete("请使用TryGet方法")]`로 표시되어 있으며, 컴파일 시 경고가 발생합니다. `TryGet` 또는 인덱서를 사용하세요.
  Source: [BaseDataTable.cs](/Runtime/Config/Config/BaseDataTable.cs#L97-L134)
- **`LoadAsync()` 대기를 하지 않고 조회**: 데이터가 완전히 로드되지 않았을 때 딕셔너리가 비어 있어 `TryGet`은 `false`를 직접 반환하고, 인덱서는 `null`을 반환합니다. 반드시 `await`로 완료하세요.
- **파생 클래스에서 컬렉션을 수정한 후 `InvalidateCache()` 호출 잊기**: 파생 클래스에서 직접 `DataList`/`LongDataMaps`/`StringDataMaps`를 수정한 경우 반드시 `InvalidateCache()`를 호출해야 합니다. 그렇지 않으면 `Count`, `FirstOrDefault`, `LastOrDefault`가 오래된 캐시 값을 읽습니다.
  Source: [BaseDataTable.cs](/Runtime/Config/Config/BaseDataTable.cs#L67-L74)
- **`T`를 값 타입으로 작성**: 기본 클래스 제약 조건은 `where T : class`이므로, 값 타입은 컴파일러에 의해 거부됩니다.

## 배경 (선택 사항)

`BaseDataTable<T>`는 내부적으로 세 가지 구조를 유지합니다: `LongDataMaps`(`Dictionary<long, T>`), `StringDataMaps`(`Dictionary<string, T>`), 그리고 `DataList`. 첫/마지막 요소와 `Count`는 캐시 필드를 통해 읽기 속도를 높입니다. 모든 수정은 일관성을 보장하기 위해 `InvalidateCache()`를 트리거해야 합니다. `IConfigManager`는 테이블 이름으로 등록 및 디스패치를 담당하며, 구체적인 테이블 내용은 생성기에서 생성되어 위의 세 컬렉션을 채웁니다.

로드 및 초기화 흐름에 대해서는 `ConfigComponent` 및 `LoadConfigSuccessEventArgs`를 참조하세요.