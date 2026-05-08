# システム拡張（機能豊富な .NET 拡張メソッドライブラリ）

GameFrameX.Foundation.Extensions は、機能豊富な .NET 拡張メソッドライブラリです。日常的な開発作業を簡素化するための多数の便利な拡張メソッドとユーティリティクラスを提供しています。文字列処理、コレクション操作、型変換、オブジェクト操作など、多くの拡張機能を含んでいます。

## 特徴

- **豊富な拡張メソッド** - 文字列、コレクション、オブジェクト、型などの多数の拡張メソッドを提供
- **高性能** - 最適化されたアルゴリズム実装による効率的な実行
- **型安全性** - 完全なジェネリックサポートと型チェック
- **軽量** - 外部依存関係がなく、統合が容易
- **双方向マッピング** - 双方向辞書などの高度なデータ構造を提供
- **スレッドセーフ** - 一部のコンポーネントは並行操作をサポート

## インストール

```bash
dotnet add package GameFrameX.Foundation.Extensions
```

## クイックスタート

以下の例は、最も一般的な拡張メソッドの使用方法を示しています：

```csharp
using GameFrameX.Foundation.Extensions;

// 文字列操作
string email = "user@example.com";
bool isValid = email.IsValidEmail(); // true

string text = "hello world";
string pascalCase = text.ToPascalCase(); // "HelloWorld"

// コレクション操作
List<int> numbers = new List<int> { 1, 2, 3 };
bool isEmpty = numbers.IsNullOrEmpty(); // false

// バイト配列変換
byte[] bytes = { 0x48, 0x65, 0x6C, 0x6C, 0x6F }; // "Hello" in ASCII
string decoded = bytes.ToUtf8String(); // "Hello"
```

## 詳細な使い方

### 文字列拡張 (StringExtensions)

豊富な文字列処理拡張メソッドを提供します：

```csharp
using GameFrameX.Foundation.Extensions;

// 文字列検証
string email = "user@example.com";
bool isValid = email.IsValidEmail(); // true

string url = "https://www.example.com";
bool isValidUrl = url.IsValidUrl(); // true

// 文字列変換
string text = "hello world";
string camelCase = text.ToCamelCase(); // "helloWorld"
string pascalCase = text.ToPascalCase(); // "HelloWorld"
string kebabCase = text.ToKebabCase(); // "hello-world"

// 文字列切り詰め
string longText = "This is a very long text";
string truncated = longText.Truncate(10); // "This is a..."
string truncatedCustom = longText.Truncate(10, "***"); // "This is a***"

// 安全な変換
string numberStr = "123";
int number = numberStr.ToIntOrDefault(); // 123
int defaultValue = "abc".ToIntOrDefault(999); // 999

// 文字列クリーニング
string dirtyText = "  Hello\t\nWorld  ";
string cleaned = dirtyText.CleanWhitespace(); // "Hello World"

// Base64 エンコード/デコード
string original = "Hello World";
string encoded = original.ToBase64(); // "SGVsbG8gV29ybGQ="
string decoded = encoded.FromBase64(); // "Hello World"
```

### コレクション拡張 (CollectionExtensions & IEnumerableExtensions)

強力なコレクション操作拡張を提供します：

```csharp
using GameFrameX.Foundation.Extensions;

// コレクション判定
List<int> numbers = new List<int> { 1, 2, 3, 4, 5 };
bool isEmpty = numbers.IsNullOrEmpty(); // false
bool hasElements = numbers.IsNotNullOrEmpty(); // true

// 安全な操作
List<string> items = null;
items.AddIfNotNull("test"); // 例外をスローしない

List<string> validItems = new List<string> { "a", "b", "c" };
validItems.AddIfNotNull("d"); // 追加成功

// 一括操作
var moreItems = new[] { "e", "f", "g" };
validItems.AddRange(moreItems);

// 重複排除
var duplicates = new[] { 1, 2, 2, 3, 3, 4 };
var unique = duplicates.Distinct().ToList(); // [1, 2, 3, 4]

// ページング操作
var allItems = Enumerable.Range(1, 100);
var page1 = allItems.Skip(0).Take(10); // 1ページ目、ページサイズ10
var page2 = allItems.Skip(10).Take(10); // 2ページ目、ページサイズ10

// ランダム選択
var randomItem = numbers.RandomElement(); // ランダムに1つの要素を選択
var randomItems = numbers.RandomElements(3); // ランダムに3つの要素を選択

// グループ化操作
var people = new[]
{
    new { Name = "Alice", Age = 25 },
    new { Name = "Bob", Age = 30 },
    new { Name = "Charlie", Age = 25 }
};
var groupedByAge = people.GroupBy(p => p.Age);
```

### オブジェクト拡張 (ObjectExtensions)

オブジェクトの操作と変換の拡張メソッドを提供します：

```csharp
using GameFrameX.Foundation.Extensions;

// nullチェック
object obj = null;
bool isNull = obj.IsNull(); // true
bool isNotNull = obj.IsNotNull(); // false

// 型チェックと変換
object value = "123";
bool isString = value.Is<string>(); // true
string stringValue = value.As<string>(); // "123"

// 安全な変換
object numberObj = 42;
int? intValue = numberObj.AsOrDefault<int>(); // 42
string stringFromInt = numberObj.AsOrDefault<string>(); // null

// ディープコピー（オブジェクトがシリアライズをサポートする場合）
var original = new { Name = "Test", Value = 123 };
var copy = original.DeepClone(); // オブジェクトのディープコピー

// プロパティコピー
public class Source { public string Name { get; set; } public int Age { get; set; } }
public class Target { public string Name { get; set; } public int Age { get; set; } }

var source = new Source { Name = "Alice", Age = 25 };
var target = new Target();
source.CopyPropertiesTo(target); // target.Name = "Alice", target.Age = 25
```

### 型拡張 (TypeExtensions)

型情報とリフレクション操作の拡張を提供します：

```csharp
using GameFrameX.Foundation.Extensions;

// 型チェック
Type stringType = typeof(string);
bool isNullable = stringType.IsNullable(); // false

Type nullableIntType = typeof(int?);
bool isNullableInt = nullableIntType.IsNullable(); // true

// デフォルト値の取得
Type intType = typeof(int);
object defaultValue = intType.GetDefaultValue(); // 0

// 型の比較
bool isAssignable = typeof(string).IsAssignableFrom(typeof(object)); // false
bool isAssignableReverse = typeof(object).IsAssignableFrom(typeof(string)); // true

// ジェネリック引数の取得
Type listType = typeof(List<string>);
Type[] genericArgs = listType.GetGenericArguments(); // [typeof(string)]

// コレクション型かどうかのチェック
bool isList = typeof(List<int>).IsCollection(); // true
bool isArray = typeof(int[]).IsCollection(); // true
bool isString = typeof(string).IsCollection(); // false（文字列はコレクションとして扱われません）
```

### バイト拡張 (ByteExtensions)

バイト配列処理の拡張メソッドを提供します：

```csharp
using GameFrameX.Foundation.Extensions;

// バイト配列の変換
byte[] bytes = { 0x48, 0x65, 0x6C, 0x6C, 0x6F }; // "Hello" in ASCII
string text = bytes.ToUtf8String(); // "Hello"
string hex = bytes.ToHexString(); // "48656C6C6F"
string hexWithSeparator = bytes.ToHexString("-"); // "48-65-6C-6C-6F"

// 文字列からバイト配列への変換
string message = "Hello World";
byte[] utf8Bytes = message.ToUtf8Bytes();
byte[] asciiBytes = message.ToAsciiBytes();

// 16進数文字列からバイト配列への変換
string hexString = "48656C6C6F";
byte[] fromHex = hexString.FromHexString(); // [0x48, 0x65, 0x6C, 0x6C, 0x6F]

// Base64 変換
byte[] data = { 1, 2, 3, 4, 5 };
string base64 = data.ToBase64String(); // "AQIDBAU="
byte[] fromBase64 = base64.FromBase64String(); // [1, 2, 3, 4, 5]
```

### 双方向辞書 (BidirectionalDictionary)

キーと値の双方向マッピングを提供する効率的なデータ構造です：

```csharp
using GameFrameX.Foundation.Extensions;

// 双方向辞書の作成
var biDict = new BidirectionalDictionary<string, int>();

// キーと値のペアの追加
bool added1 = biDict.TryAdd("one", 1); // true
bool added2 = biDict.TryAdd("two", 2); // true
bool added3 = biDict.TryAdd("one", 3); // false - キーが既に存在
bool added4 = biDict.TryAdd("three", 1); // false - 値が既に存在

// 双方向検索
if (biDict.TryGetValue("one", out int value))
{
    Console.WriteLine($"Key 'one' maps to value {value}"); // 出力: 1
}

if (biDict.TryGetKey(2, out string key))
{
    Console.WriteLine($"Value 2 maps to key '{key}'"); // 出力: "two"
}

// 辞書のクリア
biDict.Clear();

// 初期容量を指定してパフォーマンスを最適化
var optimizedBiDict = new BidirectionalDictionary<string, int>(100);
```

### 同時実行制限キュー (ConcurrentLimitedQueue)

スレッドセーフな固定長キューの実装です：

```csharp
using GameFrameX.Foundation.Extensions;

// 固定長キューの作成
var queue = new ConcurrentLimitedQueue<string>(3); // 最大容量3

// 要素の追加
queue.Enqueue("first");
queue.Enqueue("second");
queue.Enqueue("third");
Console.WriteLine(queue.Count); // 3

// 4番目の要素を追加すると、最も古い要素が自動的に削除される
queue.Enqueue("fourth");
Console.WriteLine(queue.Count); // 引き続き3

// キューの内容を確認
if (queue.TryDequeue(out string item))
{
    Console.WriteLine(item); // "second"（firstは自動削除済み）
}

// 既存のコレクションから作成
var initialData = new List<string> { "a", "b", "c" };
var queueFromList = new ConcurrentLimitedQueue<string>(initialData);

// 暗黙的変換
List<int> numbers = new List<int> { 1, 2, 3, 4, 5 };
ConcurrentLimitedQueue<int> numberQueue = numbers; // 暗黙的変換

// 制限の動的調整
queue.Limit = 5; // キューの最大容量を調整
```

## 高度な使い方

### メソッドチェーン

拡張メソッドはメソッドチェーンをサポートし、コードをより簡潔にします：

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

### パフォーマンス最適化の提案

```csharp
// 1. 適切な初期容量を使用する
var biDict = new BidirectionalDictionary<string, int>(expectedSize);

// 2. 個別操作よりも一括操作を選択する
var items = new List<string>();
items.AddRange(newItems); // 複数回の Add 呼び出しよりも優れています

// 3. TryXxx メソッドを使用して例外を回避する
if (biDict.TryGetValue(key, out var value))
{
    // 見つかった値の処理
}
else
{
    // 見つからなかった場合の処理
}

// 4. 同時実行コレクションを適切に使用する
var concurrentQueue = new ConcurrentLimitedQueue<Task>(maxConcurrency);
```

### エラー処理

```csharp
// 安全な型変換
object unknownValue = GetValueFromSomewhere();
int safeInt = unknownValue.AsOrDefault<int>(); // 変換失敗時はデフォルト値を返す

// 安全な文字列操作
string input = null;
string safe = input.IsNullOrEmpty() ? "default" : input.Trim();

// 安全なコレクション操作
List<string> items = null;
int count = items.IsNullOrEmpty() ? 0 : items.Count;
```

### 拡張とカスタマイズ

カスタム拡張メソッドを追加する場合、以下のパターンに従うことをお勧めします：

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

// 使用例
string result = someObject.SafeExecute(x => x.ToString().ToUpper(), "DEFAULT");
```

## ベストプラクティス

### 名前空間の使用

```csharp
// 推奨：名前空間を明示的に参照する
using GameFrameX.Foundation.Extensions;

// 非推奨：グローバル using の使用（プロジェクト全体で必要な場合を除く）
```

### パフォーマンスに関する考慮事項

```csharp
// 良い実践：容量を事前に割り当てる
var biDict = new BidirectionalDictionary<string, int>(1000);

// 良い実践：適切なデータ構造を使用する
var limitedQueue = new ConcurrentLimitedQueue<LogEntry>(maxLogEntries);

// 避けるべき：ループ内でのコストの高い操作
foreach (var item in items)
{
    // ここでの複雑な文字列操作やリフレクションは避けてください
}
```

### スレッドセーフティ

```csharp
// ConcurrentLimitedQueue はスレッドセーフです
var queue = new ConcurrentLimitedQueue<WorkItem>(100);

// マルチスレッド環境で安全に使用可能
Parallel.ForEach(workItems, item =>
{
    queue.Enqueue(item); // スレッドセーフ
});

// BidirectionalDictionary はスレッドセーフではないため、外部同期が必要
var biDict = new BidirectionalDictionary<string, int>();
lock (biDict)
{
    biDict.TryAdd(key, value);
}
```

### メモリ管理

```csharp
// 大きなコレクションは適時にクリアする
largeBidirectionalDictionary.Clear();

// キューの制限は適切に設定する
var logQueue = new ConcurrentLimitedQueue<LogEntry>(1000); // 無制限の増加を防ぐ
```

## API リファレンス

| クラス / モジュール | 説明 |
|-----------|------|
| `StringExtensions` | 文字列の検証、変換、切り詰め、Base64 エンコード/デコード |
| `CollectionExtensions` / `IEnumerableExtensions` | コレクションの空判定、安全な追加、重複排除、ページング、ランダム選択 |
| `ObjectExtensions` | nullチェック、型変換、ディープコピー、プロパティコピー |
| `TypeExtensions` | Null許容型の判定、デフォルト値の取得、コレクション型の検出 |
| `ByteExtensions` | バイト配列と文字列、16進数、Base64 の相互変換 |
| `BidirectionalDictionary<TKey, TValue>` | 双方向マッピング辞書 |
| `ConcurrentLimitedQueue<T>` | スレッドセーフな固定長キュー |
