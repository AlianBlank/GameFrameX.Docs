# JSON（高性能シリアライズライブラリ）

[![.NET](https://img.shields.io/badge/.NET-8.0-blue.svg)](https://dotnet.microsoft.com/download) [![License](https://img.shields.io/badge/license-MIT-green.svg)]()

GameFrameX.Foundation.Json は、System.Text.Json に基づく高性能 JSON シリアライズ・デシリアライズライブラリです。豊富な設定オプションと特殊値処理機能を提供します。

## 特徴

- **高性能シリアライズ** - System.Text.Json に基づく高性能な実装
- **特殊浮動小数点値サポート** - NaN、Infinity、-Infinity などの特殊浮動小数点値を完全に処理
- **複数の設定オプション** - デフォルトとフォーマット済みの2つのプリセットオプションを提供
- **高いフォールトトレランス** - 多重のフォールトトレランス機構により、シリアライズ/デシリアライズの安定性を確保
- **UTF8 バイト配列サポート** - UTF8 バイト配列の直接操作をサポート
- **Try パターン** - 安全なシリアライズ/デシリアライズ試行メソッドを提供
- **列挙型文字列化** - 列挙値を自動的に文字列形式でシリアライズ
- **循環参照処理** - 循環参照を自動的に無視し、シリアライズ例外を回避

## インストール

```bash
dotnet add package GameFrameX.Foundation.Json
```

## クイックスタート

```csharp
using GameFrameX.Foundation.Json;

// データモデルの定義
public class User
{
    public string Name { get; set; }
    public int Age { get; set; }
    public bool IsActive { get; set; }
    public double Score { get; set; }
}

// オブジェクトのシリアライズ
var user = new User 
{ 
    Name = "張三", 
    Age = 25, 
    IsActive = true, 
    Score = 95.5 
};

string json = JsonHelper.Serialize(user);
Console.WriteLine(json);
// 出力: {"Name":"張三","Age":25,"IsActive":true,"Score":95.5}

// オブジェクトのデシリアライズ
User deserializedUser = JsonHelper.Deserialize<User>(json);
Console.WriteLine($"氏名: {deserializedUser.Name}, 年齢: {deserializedUser.Age}");

// フォーマット済みシリアライズ
string formattedJson = JsonHelper.SerializeFormat(user);
```

## 詳細な使い方

### シリアライズメソッド

#### 基本シリアライズ

```csharp
// デフォルト設定でシリアライズ
string json = JsonHelper.Serialize(obj);

// カスタム設定でシリアライズ
var customOptions = new JsonSerializerOptions { WriteIndented = true };
string json = JsonHelper.Serialize(obj, customOptions);

// フォーマット済みシリアライズ（自動インデント）
string formattedJson = JsonHelper.SerializeFormat(obj);
```

#### UTF8 バイト配列シリアライズ

```csharp
// UTF8 バイト配列にシリアライズ
byte[] utf8Bytes = JsonHelper.SerializeToUtf8Bytes(obj);

// フォーマット済みで UTF8 バイト配列にシリアライズ
byte[] formattedUtf8Bytes = JsonHelper.SerializeToUtf8BytesFormat(obj);
```

### デシリアライズメソッド

#### 基本デシリアライズ

```csharp
// ジェネリックデシリアライズ
User user = JsonHelper.Deserialize<User>(json);

// Type 型指定デシリアライズ
object obj = JsonHelper.Deserialize(json, typeof(User));

// カスタム設定でデシリアライズ
User user = JsonHelper.Deserialize<User>(json, customOptions);
```

#### UTF8 バイト配列デシリアライズ

```csharp
// UTF8 バイト配列からデシリアライズ
User user = JsonHelper.DeserializeFromUtf8Bytes<User>(utf8Bytes);

// カスタム設定で UTF8 バイト配列からデシリアライズ
User user = JsonHelper.DeserializeFromUtf8Bytes<User>(utf8Bytes, customOptions);
```

### 安全な Try メソッド

```csharp
// 安全なシリアライズ
if (JsonHelper.TrySerialize(user, out string result))
{
    Console.WriteLine($"シリアライズ成功: {result}");
}
else
{
    Console.WriteLine("シリアライズ失敗");
}

// 安全なデシリアライズ
if (JsonHelper.TryDeserialize<User>(json, out User user))
{
    Console.WriteLine($"デシリアライズ成功: {user.Name}");
}
else
{
    Console.WriteLine("デシリアライズ失敗");
}
```

### 設定オプション

#### デフォルト設定 (DefaultOptions)

```csharp
public static readonly JsonSerializerOptions DefaultOptions = new JsonSerializerOptions
{
    // null値プロパティを無視
    DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
    // 循環参照を無視
    ReferenceHandler = ReferenceHandler.IgnoreCycles,
    // JSONコメントを無視
    ReadCommentHandling = JsonCommentHandling.Skip,
    // 緩やかな JavaScript エンコーダーを使用
    Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping,
    // 末尾カンマを許可
    AllowTrailingCommas = true,
    // プロパティ名の大文字小文字を区別しない
    PropertyNameCaseInsensitive = true,
    // 文字列からの数値読み取りと特殊浮動小数点値を許可
    NumberHandling = JsonNumberHandling.AllowReadingFromString | 
                    JsonNumberHandling.AllowNamedFloatingPointLiterals,
    // カスタムコンバーター
    Converters = {
        new JsonStringEnumConverter(), // 列挙型文字列変換
        new SpecialFloatingPointConverter(), // 特殊浮動小数点値変換 (double)
        new SpecialFloatingPointConverterFloat(), // 特殊浮動小数点値変換 (float)
        new SpecialFloatingPointDocumentConverter(), // JSON ドキュメント特殊浮動小数点値変換
    }
};
```

#### フォーマット設定 (FormatOptions)

フォーマット設定はデフォルト設定に `WriteIndented = true` を追加したもので、フォーマット済みの JSON 出力を生成します。

### 特殊機能

#### 特殊浮動小数点値処理

ライブラリは特殊浮動小数点値の完全なサポートを内蔵しています：

```csharp
public class TestData
{
    public double NaNValue { get; set; } = double.NaN;
    public double InfinityValue { get; set; } = double.PositiveInfinity;
    public double NegativeInfinityValue { get; set; } = double.NegativeInfinity;
    public float FloatNaN { get; set; } = float.NaN;
}

var data = new TestData();
string json = JsonHelper.Serialize(data);
// 出力: {"NaNValue":"NaN","InfinityValue":"Infinity","NegativeInfinityValue":"-Infinity","FloatNaN":"NaN"}

TestData deserializedData = JsonHelper.Deserialize<TestData>(json);
// 特殊値が正しく復元される
```

#### 列挙型処理

```csharp
public enum Status
{
    Active,
    Inactive,
    Pending
}

public class Order
{
    public Status Status { get; set; } = Status.Active;
}

var order = new Order();
string json = JsonHelper.Serialize(order);
// 出力: {"Status":"Active"}  （数値ではなく文字列形式）
```

#### フォールトトレランス機構

ライブラリは多重のフォールトトレランス機構を提供します：

1. **設定フォールトトレランス** - デフォルト設定で失敗した場合、自動的にフォーマット設定を試行
2. **特殊値事前処理** - 非標準形式の特殊浮動小数点値を自動的に処理
3. **複数回試行** - 失敗時に複数の方式でリトライ

```csharp
// JSONに非標準形式の特殊値が含まれていても正しく処理される
string problematicJson = @"{""value"": NaN, ""score"": Infinity}";
var result = JsonHelper.Deserialize<Dictionary<string, double>>(problematicJson);
// デシリアライズ成功、NaN と Infinity が正しく処理される
```

## 高度な使い方

### カスタム設定

```csharp
var customOptions = new JsonSerializerOptions
{
    PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
    WriteIndented = true,
    DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingDefault
};

// GameFrameX の特殊コンバーターを追加
customOptions.Converters.Add(new SpecialFloatingPointConverter());
customOptions.Converters.Add(new JsonStringEnumConverter());

string json = JsonHelper.Serialize(data, customOptions);
```

### バッチ処理

```csharp
var users = new List<User>
{
    new User { Name = "張三", Age = 25 },
    new User { Name = "李四", Age = 30 },
    new User { Name = "王五", Age = 35 }
};

// リストのシリアライズ
string json = JsonHelper.Serialize(users);

// リストのデシリアライズ
List<User> deserializedUsers = JsonHelper.Deserialize<List<User>>(json);
```

### パフォーマンス最適化

```csharp
// 大量データには UTF8 バイト配列を使用してパフォーマンスを向上
byte[] utf8Data = JsonHelper.SerializeToUtf8Bytes(largeDataSet);

// バイト配列から直接デシリアライズし、文字列変換のオーバーヘッドを回避
var result = JsonHelper.DeserializeFromUtf8Bytes<LargeDataSet>(utf8Data);
```

## ベストプラクティス

### 適切なシリアライズメソッドの選択

```csharp
// デバッグやログにはフォーマット済みシリアライズを使用
string debugJson = JsonHelper.SerializeFormat(debugData);

// ネットワーク転送や保存にはデフォルトシリアライズを使用（よりコンパクト）
string compactJson = JsonHelper.Serialize(networkData);

// 高性能シナリオには UTF8 バイト配列を使用
byte[] highPerfData = JsonHelper.SerializeToUtf8Bytes(data);
```

### エラー処理

```csharp
// 失敗する可能性のある操作には Try メソッドを使用
if (!JsonHelper.TryDeserialize<User>(userJson, out User user))
{
    // エラーログを記録
    logger.LogError("ユーザーデータのデシリアライズに失敗しました: {Json}", userJson);
    // デフォルト値を使用するか、ビジネス例外をスロー
    user = new User { Name = "不明なユーザー" };
}
```

### データモデル設計

```csharp
public class ApiResponse<T>
{
    public bool Success { get; set; }
    public string Message { get; set; }
    public T Data { get; set; }
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    
    // nullの可能性のあるプロパティは明示的にマーク
    public string ErrorCode { get; set; } = null;
}
```

### 設定管理

```csharp
// シナリオごとに専用の設定を作成
public static class JsonConfigurations
{
    public static readonly JsonSerializerOptions ApiOptions = new JsonSerializerOptions
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
        Converters = { new JsonStringEnumConverter() }
    };
    
    public static readonly JsonSerializerOptions LoggingOptions = new JsonSerializerOptions
    {
        WriteIndented = true,
        Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping
    };
}
```

### トラブルシューティング

#### よくある問題

**特殊浮動小数点値のシリアライズ問題**
問題: NaN や Infinity を含むオブジェクトのシリアライズ時にエラーが発生する
解決策: GameFrameX.Foundation.Json を使用してください。特殊浮動小数点値処理が内蔵されています

**循環参照の問題**
問題: オブジェクト間に循環参照があり、シリアライズが失敗する
解決策: ライブラリのデフォルト設定で `ReferenceHandler.IgnoreCycles` が有効になっています

**列挙型シリアライズの問題**
問題: 列挙型を数値ではなく文字列としてシリアライズしたい
解決策: ライブラリにデフォルトで `JsonStringEnumConverter` が含まれています

**パフォーマンスの問題**
問題: 大量データのシリアライズパフォーマンスが良くない
解決策: UTF8 バイト配列メソッドを使用し、文字列変換のオーバーヘッドを回避してください

#### デバッグのヒント

```csharp
// 詳細なエラー情報を有効にする
try
{
    var result = JsonHelper.Deserialize<ComplexObject>(json);
}
catch (JsonException ex)
{
    Console.WriteLine($"JSON 解析エラー: {ex.Message}");
    Console.WriteLine($"エラー位置: Line {ex.LineNumber}, Position {ex.BytePositionInLine}");
    Console.WriteLine($"問題のパス: {ex.Path}");
}
```

## API リファレンス

| メソッド | パラメータ | 戻り値 | 説明 |
|------|------|--------|------|
| Serialize | `T` | `string` | デフォルト設定でオブジェクトをシリアライズ |
| Serialize | `T, JsonSerializerOptions` | `string` | カスタム設定でシリアライズ |
| SerializeFormat | `T` | `string` | フォーマット済みシリアライズ（自動インデント） |
| SerializeToUtf8Bytes | `T` | `byte[]` | UTF8バイト配列にシリアライズ |
| SerializeToUtf8BytesFormat | `T` | `byte[]` | フォーマット済みでUTF8バイト配列にシリアライズ |
| Deserialize\<T\> | `string` | `T` | ジェネリックデシリアライズ |
| Deserialize | `string, Type` | `object` | 型指定デシリアライズ |
| Deserialize\<T\> | `string, JsonSerializerOptions` | `T` | カスタム設定でデシリアライズ |
| DeserializeFromUtf8Bytes\<T\> | `byte[]` | `T` | UTF8バイト配列からデシリアライズ |
| DeserializeFromUtf8Bytes\<T\> | `byte[], JsonSerializerOptions` | `T` | カスタム設定でUTF8バイト配列からデシリアライズ |
| TrySerialize | `T, out string` | `bool` | 安全なシリアライズ試行 |
| TryDeserialize\<T\> | `string, out T` | `bool` | 安全なデシリアライズ試行 |
| DefaultOptions | なし | `JsonSerializerOptions` | デフォルト設定（静的プロパティ） |
| FormatOptions | なし | `JsonSerializerOptions` | フォーマット設定（静的プロパティ） |
