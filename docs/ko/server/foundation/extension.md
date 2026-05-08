# 시스템 확장 (기능이 풍부한 .NET 확장 메서드 라이브러리)

GameFrameX.Foundation.Extensions는 기능이 풍부한 .NET 확장 메서드 라이브러리로, 일상적인 개발 작업을 간소화하기 위한 다양한 실용적인 확장 메서드와 유틸리티 클래스를 제공합니다. 이 라이브러리는 문자열 처리, 컬렉션 조작, 형식 변환, 객체 조작 등 여러 측면의 확장 기능을 포함합니다.

## 특징

- **풍부한 확장 메서드** - 문자열, 컬렉션, 객체, 형식 등 다양한 확장 메서드 제공
- **고성능** - 최적화된 알고리즘 구현으로 효율적인 실행 보장
- **형식 안전성** - 완전한 제네릭 지원 및 형식 검사
- **경량화** - 외부 종속성 없이 쉽게 통합 가능
- **양방향 매핑** - 양방향 사전 등 고급 데이터 구조 제공
- **스레드 안전성** - 일부 컴포넌트는 동시성 작업 지원

## 설치

```bash
dotnet add package GameFrameX.Foundation.Extensions
```

## 빠른 시작

다음 예제는 가장 일반적인 확장 메서드 사용법을 보여줍니다:

```csharp
using GameFrameX.Foundation.Extensions;

// 문자열 조작
string email = "user@example.com";
bool isValid = email.IsValidEmail(); // true

string text = "hello world";
string pascalCase = text.ToPascalCase(); // "HelloWorld"

// 컬렉션 조작
List<int> numbers = new List<int> { 1, 2, 3 };
bool isEmpty = numbers.IsNullOrEmpty(); // false

// 바이트 배열 변환
byte[] bytes = { 0x48, 0x65, 0x6C, 0x6C, 0x6F }; // "Hello" in ASCII
string decoded = bytes.ToUtf8String(); // "Hello"
```

## 상세 사용법

### 문자열 확장 (StringExtensions)

풍부한 문자열 처리 확장 메서드를 제공합니다:

```csharp
using GameFrameX.Foundation.Extensions;

// 문자열 검증
string email = "user@example.com";
bool isValid = email.IsValidEmail(); // true

string url = "https://www.example.com";
bool isValidUrl = url.IsValidUrl(); // true

// 문자열 변환
string text = "hello world";
string camelCase = text.ToCamelCase(); // "helloWorld"
string pascalCase = text.ToPascalCase(); // "HelloWorld"
string kebabCase = text.ToKebabCase(); // "hello-world"

// 문자열 자르기
string longText = "This is a very long text";
string truncated = longText.Truncate(10); // "This is a..."
string truncatedCustom = longText.Truncate(10, "***"); // "This is a***"

// 안전한 변환
string numberStr = "123";
int number = numberStr.ToIntOrDefault(); // 123
int defaultValue = "abc".ToIntOrDefault(999); // 999

// 문자열 정리
string dirtyText = "  Hello\t\nWorld  ";
string cleaned = dirtyText.CleanWhitespace(); // "Hello World"

// Base64 인코딩/디코딩
string original = "Hello World";
string encoded = original.ToBase64(); // "SGVsbG8gV29ybGQ="
string decoded = encoded.FromBase64(); // "Hello World"
```

### 컬렉션 확장 (CollectionExtensions & IEnumerableExtensions)

강력한 컬렉션 조작 확장 메서드를 제공합니다:

```csharp
using GameFrameX.Foundation.Extensions;

// 컬렉션 판단
List<int> numbers = new List<int> { 1, 2, 3, 4, 5 };
bool isEmpty = numbers.IsNullOrEmpty(); // false
bool hasElements = numbers.IsNotNullOrEmpty(); // true

// 안전한 작업
List<string> items = null;
items.AddIfNotNull("test"); // 예외가 발생하지 않음

List<string> validItems = new List<string> { "a", "b", "c" };
validItems.AddIfNotNull("d"); // 추가 성공

// 일괄 작업
var moreItems = new[] { "e", "f", "g" };
validItems.AddRange(moreItems);

// 중복 제거
var duplicates = new[] { 1, 2, 2, 3, 3, 4 };
var unique = duplicates.Distinct().ToList(); // [1, 2, 3, 4]

// 페이징 작업
var allItems = Enumerable.Range(1, 100);
var page1 = allItems.Skip(0).Take(10); // 1페이지, 페이지당 10개
var page2 = allItems.Skip(10).Take(10); // 2페이지, 페이지당 10개

// 임의 선택
var randomItem = numbers.RandomElement(); // 임의의 요소 하나 선택
var randomItems = numbers.RandomElements(3); // 임의의 요소 3개 선택

// 그룹화 작업
var people = new[]
{
    new { Name = "Alice", Age = 25 },
    new { Name = "Bob", Age = 30 },
    new { Name = "Charlie", Age = 25 }
};
var groupedByAge = people.GroupBy(p => p.Age);
```

### 객체 확장 (ObjectExtensions)

객체 조작 및 변환 확장 메서드를 제공합니다:

```csharp
using GameFrameX.Foundation.Extensions;

// null 검사
object obj = null;
bool isNull = obj.IsNull(); // true
bool isNotNull = obj.IsNotNull(); // false

// 형식 검사 및 변환
object value = "123";
bool isString = value.Is<string>(); // true
string stringValue = value.As<string>(); // "123"

// 안전한 변환
object numberObj = 42;
int? intValue = numberObj.AsOrDefault<int>(); // 42
string stringFromInt = numberObj.AsOrDefault<string>(); // null

// 깊은 복사 (객체가 직렬화를 지원하는 경우)
var original = new { Name = "Test", Value = 123 };
var copy = original.DeepClone(); // 객체 깊은 복사

// 속성 복사
public class Source { public string Name { get; set; } public int Age { get; set; } }
public class Target { public string Name { get; set; } public int Age { get; set; } }

var source = new Source { Name = "Alice", Age = 25 };
var target = new Target();
source.CopyPropertiesTo(target); // target.Name = "Alice", target.Age = 25
```

### 형식 확장 (TypeExtensions)

형식 정보 및 리플렉션 작업 확장 메서드를 제공합니다:

```csharp
using GameFrameX.Foundation.Extensions;

// 형식 검사
Type stringType = typeof(string);
bool isNullable = stringType.IsNullable(); // false

Type nullableIntType = typeof(int?);
bool isNullableInt = nullableIntType.IsNullable(); // true

// 기본값 가져오기
Type intType = typeof(int);
object defaultValue = intType.GetDefaultValue(); // 0

// 형식 비교
bool isAssignable = typeof(string).IsAssignableFrom(typeof(object)); // false
bool isAssignableReverse = typeof(object).IsAssignableFrom(typeof(string)); // true

// 제네릭 매개변수 가져오기
Type listType = typeof(List<string>);
Type[] genericArgs = listType.GetGenericArguments(); // [typeof(string)]

// 컬렉션 형식 여부 확인
bool isList = typeof(List<int>).IsCollection(); // true
bool isArray = typeof(int[]).IsCollection(); // true
bool isString = typeof(string).IsCollection(); // false (문자열은 컬렉션으로 간주하지 않음)
```

### 바이트 확장 (ByteExtensions)

바이트 배열 처리 확장 메서드를 제공합니다:

```csharp
using GameFrameX.Foundation.Extensions;

// 바이트 배열 변환
byte[] bytes = { 0x48, 0x65, 0x6C, 0x6C, 0x6F }; // "Hello" in ASCII
string text = bytes.ToUtf8String(); // "Hello"
string hex = bytes.ToHexString(); // "48656C6C6F"
string hexWithSeparator = bytes.ToHexString("-"); // "48-65-6C-6C-6F"

// 문자열을 바이트 배열로 변환
string message = "Hello World";
byte[] utf8Bytes = message.ToUtf8Bytes();
byte[] asciiBytes = message.ToAsciiBytes();

// 16진수 문자열을 바이트 배열로 변환
string hexString = "48656C6C6F";
byte[] fromHex = hexString.FromHexString(); // [0x48, 0x65, 0x6C, 0x6C, 0x6F]

// Base64 변환
byte[] data = { 1, 2, 3, 4, 5 };
string base64 = data.ToBase64String(); // "AQIDBAU="
byte[] fromBase64 = base64.FromBase64String(); // [1, 2, 3, 4, 5]
```

### 양방향 사전 (BidirectionalDictionary)

키-값 양방향 매핑의 효율적인 데이터 구조를 제공합니다:

```csharp
using GameFrameX.Foundation.Extensions;

// 양방향 사전 생성
var biDict = new BidirectionalDictionary<string, int>();

// 키-값 쌍 추가
bool added1 = biDict.TryAdd("one", 1); // true
bool added2 = biDict.TryAdd("two", 2); // true
bool added3 = biDict.TryAdd("one", 3); // false - 키가 이미 존재함
bool added4 = biDict.TryAdd("three", 1); // false - 값이 이미 존재함

// 양방향 조회
if (biDict.TryGetValue("one", out int value))
{
    Console.WriteLine($"Key 'one' maps to value {value}"); // 출력: 1
}

if (biDict.TryGetKey(2, out string key))
{
    Console.WriteLine($"Value 2 maps to key '{key}'"); // 출력: "two"
}

// 사전 비우기
biDict.Clear();

// 초기 용량을 사용한 성능 최적화
var optimizedBiDict = new BidirectionalDictionary<string, int>(100);
```

### 동시성 제한 큐 (ConcurrentLimitedQueue)

스레드 안전한 고정 길이 큐 구현을 제공합니다:

```csharp
using GameFrameX.Foundation.Extensions;

// 고정 길이 큐 생성
var queue = new ConcurrentLimitedQueue<string>(3); // 최대 용량 3

// 요소 추가
queue.Enqueue("first");
queue.Enqueue("second");
queue.Enqueue("third");
Console.WriteLine(queue.Count); // 3

// 4번째 요소 추가 시 가장 오래된 요소가 자동 제거됨
queue.Enqueue("fourth");
Console.WriteLine(queue.Count); // 여전히 3

// 큐 내용 확인
if (queue.TryDequeue(out string item))
{
    Console.WriteLine(item); // "second" (first는 자동 제거됨)
}

// 기존 컬렉션에서 생성
var initialData = new List<string> { "a", "b", "c" };
var queueFromList = new ConcurrentLimitedQueue<string>(initialData);

// 암시적 변환
List<int> numbers = new List<int> { 1, 2, 3, 4, 5 };
ConcurrentLimitedQueue<int> numberQueue = numbers; // 암시적 변환

// 제한 동적 조정
queue.Limit = 5; // 큐 최대 용량 조정
```

## 고급 사용법

### 체이닝 호출

확장 메서드는 체이닝 호출을 지원하여 코드를 더욱 간결하게 만듭니다:

```csharp
var result = "  Hello World  "
    .Trim()
    .ToLowerInvariant()
    .ToPascalCase()
    .Truncate(8); // "HelloWor"

var processedList = new[] { 1, 2, 2, 3, 4, 4, 5 }
    .Where(x => x > 2)
    .Distinct()
    .OrderByDescending(x => x)
    .ToList(); // [5, 4, 3]
```

### 성능 최적화 제안

```csharp
// 1. 적절한 초기 용량 사용
var biDict = new BidirectionalDictionary<string, int>(expectedSize);

// 2. 단일 작업보다 일괄 작업 선호
var items = new List<string>();
items.AddRange(newItems); // 여러 번 Add를 호출하는 것보다 나음

// 3. TryXxx 메서드를 사용하여 예외 회피
if (biDict.TryGetValue(key, out var value))
{
    // 찾은 값 처리
}
else
{
    // 찾지 못한 경우 처리
}

// 4. 동시성 컬렉션의 적절한 사용
var concurrentQueue = new ConcurrentLimitedQueue<Task>(maxConcurrency);
```

### 오류 처리

```csharp
// 안전한 형식 변환
object unknownValue = GetValueFromSomewhere();
int safeInt = unknownValue.AsOrDefault<int>(); // 변환 실패 시 기본값 반환

// 안전한 문자열 작업
string input = null;
string safe = input.IsNullOrEmpty() ? "default" : input.Trim();

// 안전한 컬렉션 작업
List<string> items = null;
int count = items.IsNullOrEmpty() ? 0 : items.Count;
```

### 확장 및 사용자 정의

사용자 정의 확장 메서드를 추가하려면 다음 패턴을 따르는 것을 권장합니다:

```csharp
public static class CustomExtensions
{
    public static TResult SafeExecute<T, TResult>(this T obj, Func<T, TResult> func, TResult defaultValue = default)
    {
        try
        {
            return obj != null ? func(obj) : defaultValue;
        }
        catch
        {
            return defaultValue;
        }
    }
}

// 사용 예제
string result = someObject.SafeExecute(x => x.ToString().ToUpper(), "DEFAULT");
```

## 모범 사례

### 네임스페이스 사용

```csharp
// 권장: 네임스페이스를 명시적으로 참조
using GameFrameX.Foundation.Extensions;

// 비권장: global using 사용 (프로젝트 전체에서 필요한 경우 제외)
```

### 성능 고려사항

```csharp
// 좋은 방법: 용량 미리 할당
var biDict = new BidirectionalDictionary<string, int>(1000);

// 좋은 방법: 적절한 데이터 구조 사용
var limitedQueue = new ConcurrentLimitedQueue<LogEntry>(maxLogEntries);

// 피해야 할 방법: 루프 내에서 비용이 많이 드는 작업 수행
foreach (var item in items)
{
    // 여기서 복잡한 문자열 작업이나 리플렉션은 피하세요
}
```

### 스레드 안전성

```csharp
// ConcurrentLimitedQueue는 스레드 안전합니다
var queue = new ConcurrentLimitedQueue<WorkItem>(100);

// 다중 스레드 환경에서 안전하게 사용 가능
Parallel.ForEach(workItems, item =>
{
    queue.Enqueue(item); // 스레드 안전
});

// BidirectionalDictionary는 스레드 안전하지 않으므로 외부 동기화 필요
var biDict = new BidirectionalDictionary<string, int>();
lock (biDict)
{
    biDict.TryAdd(key, value);
}
```

### 메모리 관리

```csharp
// 대형 컬렉션은 제때 정리
largeBidirectionalDictionary.Clear();

// 큐 제한을 합리적으로 설정
var logQueue = new ConcurrentLimitedQueue<LogEntry>(1000); // 무한 증가 방지
```

## API 레퍼런스

| 클래스 / 모듈 | 설명 |
|-----------|------|
| `StringExtensions` | 문자열 검증, 변환, 자르기, Base64 인코딩/디코딩 |
| `CollectionExtensions` / `IEnumerableExtensions` | 컬렉션 빈값 확인, 안전한 추가, 중복 제거, 페이징, 임의 선택 |
| `ObjectExtensions` | null 검사, 형식 변환, 깊은 복사, 속성 복사 |
| `TypeExtensions` | Nullable 형식 판단, 기본값 가져오기, 컬렉션 형식 감지 |
| `ByteExtensions` | 바이트 배열과 문자열, 16진수, Base64 간 상호 변환 |
| `BidirectionalDictionary<TKey, TValue>` | 양방향 매핑 사전 |
| `ConcurrentLimitedQueue<T>` | 스레드 안전한 고정 길이 큐 |
