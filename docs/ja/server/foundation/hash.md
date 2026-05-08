# ハッシュ計算（多アルゴリズム統一ハッシュライブラリ）

[![NuGet](https://img.shields.io/nuget/v/GameFrameX.Foundation.Hash.svg)](https://www.nuget.org/packages/GameFrameX.Foundation.Hash/)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://github.com/GameFrameX/GameFrameX/blob/main/LICENSE)

GameFrameX.Foundation.Hash は GameFrameX フレームワークの基盤ライブラリで、複数の高性能ハッシュアルゴリズムの統一インターフェースを提供します。一般的な暗号化ハッシュアルゴリズム（MD5、SHAシリーズ）や高性能な非暗号化ハッシュアルゴリズム（xxHash、MurmurHash3、CRCなど）をサポートしています。

## 特徴

- **複数のハッシュアルゴリズム対応** - MD5、SHA-1、SHA-256、SHA-512、xxHash、MurmurHash3、CRC32/64、HMAC-SHA256
- **高性能な実装** - .NETネイティブアルゴリズムと最適化されたサードパーティライブラリに基づく実装
- **統一API設計** - すべてのアルゴリズムで一貫した呼び出しインターフェースを提供
- **複数の入力形式** - 文字列、バイト配列、ストリーム、ファイルパスをサポート
- **型安全性** - 完全なパラメータ検証と例外処理
- **ソルト対応** - MD5などのアルゴリズムがソルト付きハッシュをサポート
- **検証機能** - 内蔵のハッシュ値検証メソッド

## インストール

```bash
dotnet add package GameFrameX.Foundation.Hash
```

## クイックスタート

### MD5 ハッシュ

```csharp
using GameFrameX.Foundation.Hash;

// 文字列のハッシュ
string text = "Hello World";
string hash = Md5Helper.Hash(text);
Console.WriteLine(hash); // 出力: b10a8db164e0754105b7a99be72e3fe5

// ソルト付きハッシュ
string saltedHash = Md5Helper.HashWithSalt(text, "salt123");

// ファイルのハッシュ
string fileHash = Md5Helper.HashByFilePath("path/to/file.txt");

// ハッシュの検証
bool isValid = Md5Helper.IsVerify(text, hash);
```

### SHA-256 ハッシュ

```csharp
using GameFrameX.Foundation.Hash;

// 文字列のハッシュ
string text = "Hello World";
string hash = Sha256Helper.ComputeHash(text);

// ファイルのハッシュ
string fileHash = Sha256Helper.ComputeFileHash("path/to/file.txt");

// ハッシュの検証
bool isValid = Sha256Helper.VerifyHash(text, hash);
```

### xxHash 高性能ハッシュ

```csharp
using GameFrameX.Foundation.Hash;

// 32ビットハッシュ
uint hash32 = XxHashHelper.Hash32("Hello World");

// 64ビットハッシュ
ulong hash64 = XxHashHelper.Hash64("Hello World");

// 128ビットハッシュ
uint128 hash128 = XxHashHelper.Hash128("Hello World");

// 型ハッシュ
uint typeHash = XxHashHelper.Hash32<MyClass>();
```

## 詳細な使い方

### MD5 ハッシュアルゴリズム

MD5Helper は完全な MD5 ハッシュ機能を提供します：

```csharp
// 基本ハッシュ
string hash = Md5Helper.Hash("input text");

// 大文字形式
string upperHash = Md5Helper.Hash("input text", isUpper: true);

// バイト配列のハッシュ
byte[] data = Encoding.UTF8.GetBytes("input text");
string hash = Md5Helper.Hash(data);

// ストリームのハッシュ
using var stream = new MemoryStream(data);
string hash = Md5Helper.Hash(stream);

// ソルト付きハッシュ（文字列ソルト）
string saltedHash = Md5Helper.HashWithSalt("input", "salt");

// ソルト付きハッシュ（バイト配列ソルト）
byte[] salt = Encoding.UTF8.GetBytes("salt");
string saltedHash = Md5Helper.HashWithSalt("input", salt);

// ハッシュの検証
bool isValid = Md5Helper.IsVerify("input", hash);
bool isSaltedValid = Md5Helper.IsVerifyWithSalt("input", "salt", saltedHash);
```

### SHA シリーズハッシュアルゴリズム

#### SHA-256

```csharp
// 基本ハッシュ
string hash = Sha256Helper.ComputeHash("input text");

// エンコーディングの指定
string hash = Sha256Helper.ComputeHash("input text", Encoding.ASCII);

// バイト配列のハッシュ
byte[] data = Encoding.UTF8.GetBytes("input text");
string hash = Sha256Helper.ComputeHash(data);

// ファイルのハッシュ
string fileHash = Sha256Helper.ComputeFileHash("path/to/file.txt");

// ハッシュの検証
bool isValid = Sha256Helper.VerifyHash("input text", hash);
bool isFileValid = Sha256Helper.VerifyFileHash("path/to/file.txt", fileHash);
```

#### SHA-1 と SHA-512

```csharp
// SHA-1
string sha1Hash = Sha1Helper.ComputeHash("input text");
bool sha1Valid = Sha1Helper.VerifyHash("input text", sha1Hash);

// SHA-512
string sha512Hash = Sha512Helper.ComputeHash("input text");
bool sha512Valid = Sha512Helper.VerifyHash("input text", sha512Hash);
```

### xxHash 高性能ハッシュ

xxHash は高性能向けに設計された非暗号化ハッシュアルゴリズムです：

```csharp
// 32ビットハッシュ
uint hash32 = XxHashHelper.Hash32("input text");
uint hash32FromBytes = XxHashHelper.Hash32(Encoding.UTF8.GetBytes("input"));

// 64ビットハッシュ
ulong hash64 = XxHashHelper.Hash64("input text");
ulong hash64FromBytes = XxHashHelper.Hash64(Encoding.UTF8.GetBytes("input"));

// 128ビットハッシュ
uint128 hash128 = XxHashHelper.Hash128("input text");
uint128 hash128FromBytes = XxHashHelper.Hash128(Encoding.UTF8.GetBytes("input"));

// 長さ指定の128ビットハッシュ
byte[] data = Encoding.UTF8.GetBytes("input text");
uint128 hash128Limited = XxHashHelper.Hash128(data, 5); // 最初の5バイトのみ使用

// 型ハッシュ
uint typeHash32 = XxHashHelper.Hash32<string>();
ulong typeHash64 = XxHashHelper.Hash64<MyClass>();

// 128ビットハッシュがデフォルト値かどうかの確認
bool isDefault = XxHashHelper.IsDefault(hash128);
```

### MurmurHash3 アルゴリズム

```csharp
// 32ビット MurmurHash3
uint murmurHash = MurmurHash3Helper.Hash32("input text");

// シード値の指定
uint murmurHashWithSeed = MurmurHash3Helper.Hash32("input text", seed: 12345);

// バイト配列のハッシュ
byte[] data = Encoding.UTF8.GetBytes("input text");
uint murmurHashFromBytes = MurmurHash3Helper.Hash32(data);
```

### CRC チェックサムアルゴリズム

#### CRC32

```csharp
// 基本CRC32
uint crc32 = CrcHelper.Crc32("input text");

// バイト配列のCRC32
byte[] data = Encoding.UTF8.GetBytes("input text");
uint crc32FromBytes = CrcHelper.Crc32(data);

// ストリームのCRC32
using var stream = new MemoryStream(data);
uint crc32FromStream = CrcHelper.Crc32(stream);
```

#### CRC64

```csharp
// 基本CRC64
ulong crc64 = CrcHelper.Crc64("input text");

// バイト配列のCRC64
byte[] data = Encoding.UTF8.GetBytes("input text");
ulong crc64FromBytes = CrcHelper.Crc64(data);
```

### HMAC-SHA256 アルゴリズム

```csharp
// 基本HMAC-SHA256
string hmac = HmacSha256Helper.ComputeHash("input text", "secret key");

// バイト配列入力
byte[] data = Encoding.UTF8.GetBytes("input text");
byte[] key = Encoding.UTF8.GetBytes("secret key");
string hmacFromBytes = HmacSha256Helper.ComputeHash(data, key);

// HMACの検証
bool isValid = HmacSha256Helper.VerifyHash("input text", "secret key", hmac);
```

## 高度な使い方

### バッチハッシュ計算

```csharp
// 複数の文字列のハッシュを一括計算
var inputs = new[] { "text1", "text2", "text3" };
var hashes = inputs.Select(Md5Helper.Hash).ToArray();

// バッチ検証
var results = inputs.Zip(hashes, Md5Helper.IsVerify).ToArray();
```

### ファイル整合性チェック

```csharp
public class FileIntegrityChecker
{
    public static bool VerifyFileIntegrity(string filePath, string expectedHash)
    {
        if (!File.Exists(filePath))
            return false;
            
        var actualHash = Sha256Helper.ComputeFileHash(filePath);
        return Sha256Helper.VerifyFileHash(filePath, expectedHash);
    }
    
    public static Dictionary<string, string> ComputeDirectoryHashes(string directoryPath)
    {
        var hashes = new Dictionary<string, string>();
        var files = Directory.GetFiles(directoryPath, "*", SearchOption.AllDirectories);
        
        foreach (var file in files)
        {
            hashes[file] = Sha256Helper.ComputeFileHash(file);
        }
        
        return hashes;
    }
}
```

### パスワードハッシュのベストプラクティス

```csharp
public class PasswordHasher
{
    private static readonly Random Random = new Random();
    
    public static string HashPassword(string password)
    {
        // ランダムソルトの生成
        var salt = GenerateRandomSalt();
        var hash = Md5Helper.HashWithSalt(password, salt);
        
        // ソルトとハッシュの組み合わせを返す
        return $"{salt}:{hash}";
    }
    
    public static bool VerifyPassword(string password, string storedHash)
    {
        var parts = storedHash.Split(':');
        if (parts.Length != 2) return false;
        
        var salt = parts[0];
        var hash = parts[1];
        
        return Md5Helper.IsVerifyWithSalt(password, salt, hash);
    }
    
    private static string GenerateRandomSalt()
    {
        var bytes = new byte[16];
        Random.NextBytes(bytes);
        return Convert.ToBase64String(bytes);
    }
}
```

### パフォーマンスベンチマーク

```csharp
public class HashPerformanceTest
{
    public static void BenchmarkHashAlgorithms(string input)
    {
        var sw = Stopwatch.StartNew();
        
        // MD5
        sw.Restart();
        for (int i = 0; i < 100000; i++)
        {
            Md5Helper.Hash(input);
        }
        Console.WriteLine($"MD5: {sw.ElapsedMilliseconds}ms");
        
        // SHA-256
        sw.Restart();
        for (int i = 0; i < 100000; i++)
        {
            Sha256Helper.ComputeHash(input);
        }
        Console.WriteLine($"SHA-256: {sw.ElapsedMilliseconds}ms");
        
        // xxHash32
        sw.Restart();
        for (int i = 0; i < 100000; i++)
        {
            XxHashHelper.Hash32(input);
        }
        Console.WriteLine($"xxHash32: {sw.ElapsedMilliseconds}ms");
        
        // xxHash64
        sw.Restart();
        for (int i = 0; i < 100000; i++)
        {
            XxHashHelper.Hash64(input);
        }
        Console.WriteLine($"xxHash64: {sw.ElapsedMilliseconds}ms");
    }
}
```

### カスタムエンコーディング

```csharp
// 異なる文字エンコーディングを使用する
string hash1 = Sha256Helper.ComputeHash("テストテキスト", Encoding.UTF8);
string hash2 = Sha256Helper.ComputeHash("テストテキスト", Encoding.Unicode);
string hash3 = Sha256Helper.ComputeHash("テストテキスト", Encoding.ASCII);
```

### xxHash シード値

```csharp
// MurmurHash3 はカスタムシード値をサポート
uint hash1 = MurmurHash3Helper.Hash32("input", seed: 0);
uint hash2 = MurmurHash3Helper.Hash32("input", seed: 12345);
// 同じ入力でも、異なるシード値で異なるハッシュ値が生成される
```

## ベストプラクティス

### アルゴリズム選択ガイド

1. **暗号化セキュリティシナリオ**
    - パスワード保存：SHA-256 またはより強力なアルゴリズムを使用
    - デジタル署名：SHA-256 または SHA-512 を使用
    - MD5 と SHA-1 の使用は避ける（安全ではありません）

2. **高性能シナリオ**
    - ハッシュテーブル：xxHash32 または xxHash64 を使用
    - データ整合性チェック：CRC32 または CRC64 を使用
    - キャッシュキー生成：xxHash シリーズを使用

3. **互換性シナリオ**
    - 旧システムとの互換性：MD5 が必要な場合があります
    - 標準プロトコル：プロトコル要件に基づいてアルゴリズムを選択

### セキュリティ上の注意事項

```csharp
// 安全でない：パスワードを直接ハッシュ
string unsafeHash = Md5Helper.Hash(password);

// 安全：ソルト値を使用
string salt = GenerateRandomSalt();
string safeHash = Sha256Helper.ComputeHash(password + salt);

// より安全：専用のパスワードハッシュアルゴリズム（bcrypt、scrypt、Argon2など）を使用
// 注意：本ライブラリは主に汎用ハッシュアルゴリズムを提供しており、パスワード保存には専用のパスワードハッシュライブラリの使用を推奨します
```

### パフォーマンス最適化の提案

```csharp
// バイト配列を再利用して重複エンコードを回避
byte[] data = Encoding.UTF8.GetBytes(input);
string md5Hash = Md5Helper.Hash(data);
string sha256Hash = Sha256Helper.ComputeHash(data);

// 大きなファイルにはストリーム処理を使用
using var fileStream = File.OpenRead(largeFilePath);
string hash = Md5Helper.Hash(fileStream);

// バッチ操作時は並列処理を検討
var hashes = inputs.AsParallel()
    .Select(input => new { Input = input, Hash = XxHashHelper.Hash64(input) })
    .ToArray();
```

### エラー処理

```csharp
public static class SafeHashHelper
{
    public static string SafeComputeFileHash(string filePath)
    {
        try
        {
            if (!File.Exists(filePath))
            {
                throw new FileNotFoundException($"ファイルが存在しません: {filePath}");
            }
            
            return Sha256Helper.ComputeFileHash(filePath);
        }
        catch (UnauthorizedAccessException)
        {
            throw new InvalidOperationException($"ファイルへのアクセス権限がありません: {filePath}");
        }
        catch (IOException ex)
        {
            throw new InvalidOperationException($"ファイルの読み取り中にIOエラーが発生しました: {ex.Message}");
        }
    }
}
```

### トラブルシューティング

**Q: MD5 ハッシュ結果がオンラインツールと一致しない？**
```csharp
// 同じエンコーディングと形式を使用していることを確認
string input = "Hello World";
string hash = Md5Helper.Hash(input, isUpper: false); // 小文字
string upperHash = Md5Helper.Hash(input, isUpper: true); // 大文字
```

**Q: ファイルのハッシュ計算に失敗する？**
```csharp
// ファイルの存在とアクセス権限を確認
if (!File.Exists(filePath))
{
    Console.WriteLine("ファイルが存在しません");
    return;
}

try
{
    string hash = Sha256Helper.ComputeFileHash(filePath);
}
catch (UnauthorizedAccessException)
{
    Console.WriteLine("ファイルへのアクセス権限がありません");
}
```

**Q: 大きなファイルのハッシュ計算でメモリ使用量が高すぎる？**
```csharp
// ファイル全体を一度に読み込むのではなく、ストリーム処理を使用
using var fileStream = File.OpenRead(largeFilePath);
string hash = Md5Helper.Hash(fileStream);
```

### デバッグのヒント

```csharp
// 詳細なログ出力を有効にする
public static class HashDebugHelper
{
    public static void DebugHash(string input)
    {
        Console.WriteLine($"入力: {input}");
        Console.WriteLine($"UTF8バイト: {string.Join(",", Encoding.UTF8.GetBytes(input))}");
        Console.WriteLine($"MD5: {Md5Helper.Hash(input)}");
        Console.WriteLine($"SHA256: {Sha256Helper.ComputeHash(input)}");
        Console.WriteLine($"xxHash32: {XxHashHelper.Hash32(input)}");
        Console.WriteLine($"xxHash64: {XxHashHelper.Hash64(input)}");
    }
}
```

## API リファレンス

| クラス | メソッド | パラメータ | 戻り値 | 説明 |
|---|------|------|--------|------|
| **Md5Helper** | Hash | `string` / `string, bool` | `string` | MD5ハッシュの計算 |
| | Hash | `byte[]` | `string` | バイト配列のMD5ハッシュ |
| | Hash | `Stream` | `string` | ストリームのMD5ハッシュ |
| | HashWithSalt | `string, string` / `string, byte[]` | `string` | ソルト付きMD5ハッシュ |
| | HashByFilePath | `string` | `string` | ファイルのMD5ハッシュ |
| | IsVerify | `string, string` | `bool` | ハッシュ値の検証 |
| | IsVerifyWithSalt | `string, string, string` | `bool` | ソルト付きハッシュの検証 |
| **Sha256Helper** | ComputeHash | `string` / `string, Encoding` | `string` | SHA-256ハッシュの計算 |
| | ComputeHash | `byte[]` | `string` | バイト配列のSHA-256 |
| | ComputeFileHash | `string` | `string` | ファイルのSHA-256 |
| | VerifyHash | `string, string` | `bool` | ハッシュ値の検証 |
| | VerifyFileHash | `string, string` | `bool` | ファイルハッシュの検証 |
| **Sha1Helper** | ComputeHash | `string` | `string` | SHA-1ハッシュの計算 |
| | VerifyHash | `string, string` | `bool` | ハッシュ値の検証 |
| **Sha512Helper** | ComputeHash | `string` | `string` | SHA-512ハッシュの計算 |
| | VerifyHash | `string, string` | `bool` | ハッシュ値の検証 |
| **XxHashHelper** | Hash32 | `string` / `byte[]` | `uint` | 32ビットxxHash |
| | Hash64 | `string` / `byte[]` | `ulong` | 64ビットxxHash |
| | Hash128 | `string` / `byte[]` / `byte[], int` | `uint128` | 128ビットxxHash |
| | Hash32\<T\> | なし | `uint` | 型ハッシュ（32ビット） |
| | Hash64\<T\> | なし | `ulong` | 型ハッシュ（64ビット） |
| | IsDefault | `uint128` | `bool` | デフォルト値かどうかの確認 |
| **MurmurHash3Helper** | Hash32 | `string` / `string, int` / `byte[]` | `uint` | MurmurHash3（シード対応） |
| **CrcHelper** | Crc32 | `string` / `byte[]` / `Stream` | `uint` | CRC32チェックサム |
| | Crc64 | `string` / `byte[]` | `ulong` | CRC64チェックサム |
| **HmacSha256Helper** | ComputeHash | `string, string` / `byte[], byte[]` | `string` | HMAC-SHA256 |
| | VerifyHash | `string, string, string` | `bool` | HMACの検証 |

### パフォーマンス比較

| アルゴリズム | セキュリティ | パフォーマンス | 出力長 | 適用シナリオ |
|------|--------|------|----------|----------|
| MD5 | 低 | 高 | 32文字 | 互換性要件 |
| SHA-1 | 中 | 中 | 40文字 | 互換性要件 |
| SHA-256 | 高 | 中 | 64文字 | セキュアハッシュ |
| SHA-512 | 高 | 中低 | 128文字 | 高セキュリティ要件 |
| xxHash32 | なし | 極高 | 8文字 | 高性能シナリオ |
| xxHash64 | なし | 極高 | 16文字 | 高性能シナリオ |
| CRC32 | なし | 高 | 8文字 | データチェックサム |
| HMAC-SHA256 | 高 | 中 | 64文字 | メッセージ認証 |
