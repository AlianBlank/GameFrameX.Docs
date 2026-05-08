# Hash 計算（多演算法統一雜湊庫）

[![NuGet](https://img.shields.io/nuget/v/GameFrameX.Foundation.Hash.svg)](https://www.nuget.org/packages/GameFrameX.Foundation.Hash/)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://github.com/GameFrameX/GameFrameX/blob/main/LICENSE)

GameFrameX.Foundation.Hash 是 GameFrameX 框架的基礎設施庫，提供了多種高效能雜湊演算法的統一介面。該庫支援常用的加密雜湊演算法（MD5、SHA 系列）和高效能非加密雜湊演算法（xxHash、MurmurHash3、CRC 等）。

## 特性

- **多種雜湊演算法支援** - MD5、SHA-1、SHA-256、SHA-512、xxHash、MurmurHash3、CRC32/64、HMAC-SHA256
- **高效能實作** - 基於 .NET 原生演算法和最佳化的第三方庫
- **統一 API 設計** - 所有演算法提供一致的呼叫介面
- **多種輸入格式** - 支援字串、位元組陣列、串流和檔案路徑
- **型別安全** - 完整的參數驗證和例外處理
- **加鹽支援** - MD5 等演算法支援加鹽雜湊
- **驗證功能** - 內建雜湊值驗證方法

## 安裝

```bash
dotnet add package GameFrameX.Foundation.Hash
```

## 快速開始

### MD5 雜湊

```csharp
using GameFrameX.Foundation.Hash;

// 字串雜湊
string text = "Hello World";
string hash = Md5Helper.Hash(text);
Console.WriteLine(hash); // 輸出: b10a8db164e0754105b7a99be72e3fe5

// 加鹽雜湊
string saltedHash = Md5Helper.HashWithSalt(text, "salt123");

// 檔案雜湊
string fileHash = Md5Helper.HashByFilePath("path/to/file.txt");

// 驗證雜湊
bool isValid = Md5Helper.IsVerify(text, hash);
```

### SHA-256 雜湊

```csharp
using GameFrameX.Foundation.Hash;

// 字串雜湊
string text = "Hello World";
string hash = Sha256Helper.ComputeHash(text);

// 檔案雜湊
string fileHash = Sha256Helper.ComputeFileHash("path/to/file.txt");

// 驗證雜湊
bool isValid = Sha256Helper.VerifyHash(text, hash);
```

### xxHash 高效能雜湊

```csharp
using GameFrameX.Foundation.Hash;

// 32 位元雜湊
uint hash32 = XxHashHelper.Hash32("Hello World");

// 64 位元雜湊
ulong hash64 = XxHashHelper.Hash64("Hello World");

// 128 位元雜湊
uint128 hash128 = XxHashHelper.Hash128("Hello World");

// 型別雜湊
uint typeHash = XxHashHelper.Hash32<MyClass>();
```

## 詳細用法

### MD5 雜湊演算法

MD5Helper 提供了完整的 MD5 雜湊功能：

```csharp
// 基本雜湊
string hash = Md5Helper.Hash("input text");

// 大寫格式
string upperHash = Md5Helper.Hash("input text", isUpper: true);

// 位元組陣列雜湊
byte[] data = Encoding.UTF8.GetBytes("input text");
string hash = Md5Helper.Hash(data);

// 串流雜湊
using var stream = new MemoryStream(data);
string hash = Md5Helper.Hash(stream);

// 加鹽雜湊（字串鹽）
string saltedHash = Md5Helper.HashWithSalt("input", "salt");

// 加鹽雜湊（位元組陣列鹽）
byte[] salt = Encoding.UTF8.GetBytes("salt");
string saltedHash = Md5Helper.HashWithSalt("input", salt);

// 驗證雜湊
bool isValid = Md5Helper.IsVerify("input", hash);
bool isSaltedValid = Md5Helper.IsVerifyWithSalt("input", "salt", saltedHash);
```

### SHA 系列雜湊演算法

#### SHA-256

```csharp
// 基本雜湊
string hash = Sha256Helper.ComputeHash("input text");

// 指定編碼
string hash = Sha256Helper.ComputeHash("input text", Encoding.ASCII);

// 位元組陣列雜湊
byte[] data = Encoding.UTF8.GetBytes("input text");
string hash = Sha256Helper.ComputeHash(data);

// 檔案雜湊
string fileHash = Sha256Helper.ComputeFileHash("path/to/file.txt");

// 驗證雜湊
bool isValid = Sha256Helper.VerifyHash("input text", hash);
bool isFileValid = Sha256Helper.VerifyFileHash("path/to/file.txt", fileHash);
```

#### SHA-1 和 SHA-512

```csharp
// SHA-1
string sha1Hash = Sha1Helper.ComputeHash("input text");
bool sha1Valid = Sha1Helper.VerifyHash("input text", sha1Hash);

// SHA-512
string sha512Hash = Sha512Helper.ComputeHash("input text");
bool sha512Valid = Sha512Helper.VerifyHash("input text", sha512Hash);
```

### xxHash 高效能雜湊

xxHash 是專為高效能設計的非加密雜湊演算法：

```csharp
// 32 位元雜湊
uint hash32 = XxHashHelper.Hash32("input text");
uint hash32FromBytes = XxHashHelper.Hash32(Encoding.UTF8.GetBytes("input"));

// 64 位元雜湊
ulong hash64 = XxHashHelper.Hash64("input text");
ulong hash64FromBytes = XxHashHelper.Hash64(Encoding.UTF8.GetBytes("input"));

// 128 位元雜湊
uint128 hash128 = XxHashHelper.Hash128("input text");
uint128 hash128FromBytes = XxHashHelper.Hash128(Encoding.UTF8.GetBytes("input"));

// 指定長度的 128 位元雜湊
byte[] data = Encoding.UTF8.GetBytes("input text");
uint128 hash128Limited = XxHashHelper.Hash128(data, 5); // 只使用前 5 個位元組

// 型別雜湊
uint typeHash32 = XxHashHelper.Hash32<string>();
ulong typeHash64 = XxHashHelper.Hash64<MyClass>();

// 檢查 128 位元雜湊是否為預設值
bool isDefault = XxHashHelper.IsDefault(hash128);
```

### MurmurHash3 演算法

```csharp
// 32 位元 MurmurHash3
uint murmurHash = MurmurHash3Helper.Hash32("input text");

// 指定種子值
uint murmurHashWithSeed = MurmurHash3Helper.Hash32("input text", seed: 12345);

// 位元組陣列雜湊
byte[] data = Encoding.UTF8.GetBytes("input text");
uint murmurHashFromBytes = MurmurHash3Helper.Hash32(data);
```

### CRC 校驗演算法

#### CRC32

```csharp
// 基本 CRC32
uint crc32 = CrcHelper.Crc32("input text");

// 位元組陣列 CRC32
byte[] data = Encoding.UTF8.GetBytes("input text");
uint crc32FromBytes = CrcHelper.Crc32(data);

// 串流 CRC32
using var stream = new MemoryStream(data);
uint crc32FromStream = CrcHelper.Crc32(stream);
```

#### CRC64

```csharp
// 基本 CRC64
ulong crc64 = CrcHelper.Crc64("input text");

// 位元組陣列 CRC64
byte[] data = Encoding.UTF8.GetBytes("input text");
ulong crc64FromBytes = CrcHelper.Crc64(data);
```

### HMAC-SHA256 演算法

```csharp
// 基本 HMAC-SHA256
string hmac = HmacSha256Helper.ComputeHash("input text", "secret key");

// 位元組陣列輸入
byte[] data = Encoding.UTF8.GetBytes("input text");
byte[] key = Encoding.UTF8.GetBytes("secret key");
string hmacFromBytes = HmacSha256Helper.ComputeHash(data, key);

// 驗證 HMAC
bool isValid = HmacSha256Helper.VerifyHash("input text", "secret key", hmac);
```

## 進階用法

### 批次雜湊計算

```csharp
// 批次計算多個字串的雜湊值
var inputs = new[] { "text1", "text2", "text3" };
var hashes = inputs.Select(Md5Helper.Hash).ToArray();

// 批次驗證
var results = inputs.Zip(hashes, Md5Helper.IsVerify).ToArray();
```

### 檔案完整性校驗

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

### 密碼雜湊最佳實踐

```csharp
public class PasswordHasher
{
    private static readonly Random Random = new Random();
    
    public static string HashPassword(string password)
    {
        // 產生隨機鹽
        var salt = GenerateRandomSalt();
        var hash = Md5Helper.HashWithSalt(password, salt);
        
        // 回傳鹽和雜湊的組合
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

### 效能基準測試

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

### 自訂編碼

```csharp
// 使用不同的字元編碼
string hash1 = Sha256Helper.ComputeHash("測試文字", Encoding.UTF8);
string hash2 = Sha256Helper.ComputeHash("測試文字", Encoding.Unicode);
string hash3 = Sha256Helper.ComputeHash("測試文字", Encoding.ASCII);
```

### xxHash 種子值

```csharp
// MurmurHash3 支援自訂種子值
uint hash1 = MurmurHash3Helper.Hash32("input", seed: 0);
uint hash2 = MurmurHash3Helper.Hash32("input", seed: 12345);
// 相同輸入，不同種子會產生不同的雜湊值
```

## 最佳實踐

### 演算法選擇指南

1. **加密安全場景**
    - 密碼儲存：使用 SHA-256 或更高強度演算法
    - 數位簽章：使用 SHA-256 或 SHA-512
    - 避免使用 MD5 和 SHA-1（已不安全）

2. **高效能場景**
    - 雜湊表：使用 xxHash32 或 xxHash64
    - 資料完整性校驗：使用 CRC32 或 CRC64
    - 快取鍵產生：使用 xxHash 系列

3. **相容性場景**
    - 與舊系統相容：可能需要使用 MD5
    - 標準協定：根據協定要求選擇演算法

### 安全注意事項

```csharp
// 不安全：直接雜湊密碼
string unsafeHash = Md5Helper.Hash(password);

// 安全：使用鹽值
string salt = GenerateRandomSalt();
string safeHash = Sha256Helper.ComputeHash(password + salt);

// 更安全：使用專門的密碼雜湊演算法（如 bcrypt、scrypt、Argon2）
// 注意：本庫主要提供通用雜湊演算法，密碼儲存建議使用專門的密碼雜湊庫
```

### 效能最佳化建議

```csharp
// 重用位元組陣列避免重複編碼
byte[] data = Encoding.UTF8.GetBytes(input);
string md5Hash = Md5Helper.Hash(data);
string sha256Hash = Sha256Helper.ComputeHash(data);

// 對於大檔案，使用串流處理
using var fileStream = File.OpenRead(largeFilePath);
string hash = Md5Helper.Hash(fileStream);

// 批次操作時考慮平行處理
var hashes = inputs.AsParallel()
    .Select(input => new { Input = input, Hash = XxHashHelper.Hash64(input) })
    .ToArray();
```

### 錯誤處理

```csharp
public static class SafeHashHelper
{
    public static string SafeComputeFileHash(string filePath)
    {
        try
        {
            if (!File.Exists(filePath))
            {
                throw new FileNotFoundException($"檔案不存在: {filePath}");
            }
            
            return Sha256Helper.ComputeFileHash(filePath);
        }
        catch (UnauthorizedAccessException)
        {
            throw new InvalidOperationException($"沒有權限存取檔案: {filePath}");
        }
        catch (IOException ex)
        {
            throw new InvalidOperationException($"讀取檔案時發生 IO 錯誤: {ex.Message}");
        }
    }
}
```

### 故障排除

**Q: MD5 雜湊結果與線上工具不一致？**
```csharp
// 確保使用相同的編碼和格式
string input = "Hello World";
string hash = Md5Helper.Hash(input, isUpper: false); // 小寫
string upperHash = Md5Helper.Hash(input, isUpper: true); // 大寫
```

**Q: 檔案雜湊計算失敗？**
```csharp
// 檢查檔案是否存在和權限
if (!File.Exists(filePath))
{
    Console.WriteLine("檔案不存在");
    return;
}

try
{
    string hash = Sha256Helper.ComputeFileHash(filePath);
}
catch (UnauthorizedAccessException)
{
    Console.WriteLine("沒有檔案存取權限");
}
```

**Q: 大檔案雜湊計算記憶體佔用過高？**
```csharp
// 使用串流處理而不是一次性讀取整個檔案
using var fileStream = File.OpenRead(largeFilePath);
string hash = Md5Helper.Hash(fileStream);
```

### 偵錯技巧

```csharp
// 啟用詳細日誌記錄
public static class HashDebugHelper
{
    public static void DebugHash(string input)
    {
        Console.WriteLine($"輸入: {input}");
        Console.WriteLine($"UTF8 位元組: {string.Join(",", Encoding.UTF8.GetBytes(input))}");
        Console.WriteLine($"MD5: {Md5Helper.Hash(input)}");
        Console.WriteLine($"SHA256: {Sha256Helper.ComputeHash(input)}");
        Console.WriteLine($"xxHash32: {XxHashHelper.Hash32(input)}");
        Console.WriteLine($"xxHash64: {XxHashHelper.Hash64(input)}");
    }
}
```

## API 參考

| 類別 | 方法 | 參數 | 回傳值 | 說明 |
|---|------|------|--------|------|
| **Md5Helper** | Hash | `string` / `string, bool` | `string` | 計算 MD5 雜湊 |
| | Hash | `byte[]` | `string` | 位元組陣列 MD5 雜湊 |
| | Hash | `Stream` | `string` | 串流 MD5 雜湊 |
| | HashWithSalt | `string, string` / `string, byte[]` | `string` | 加鹽 MD5 雜湊 |
| | HashByFilePath | `string` | `string` | 檔案 MD5 雜湊 |
| | IsVerify | `string, string` | `bool` | 驗證雜湊值 |
| | IsVerifyWithSalt | `string, string, string` | `bool` | 驗證加鹽雜湊 |
| **Sha256Helper** | ComputeHash | `string` / `string, Encoding` | `string` | 計算 SHA-256 雜湊 |
| | ComputeHash | `byte[]` | `string` | 位元組陣列 SHA-256 |
| | ComputeFileHash | `string` | `string` | 檔案 SHA-256 |
| | VerifyHash | `string, string` | `bool` | 驗證雜湊值 |
| | VerifyFileHash | `string, string` | `bool` | 驗證檔案雜湊 |
| **Sha1Helper** | ComputeHash | `string` | `string` | 計算 SHA-1 雜湊 |
| | VerifyHash | `string, string` | `bool` | 驗證雜湊值 |
| **Sha512Helper** | ComputeHash | `string` | `string` | 計算 SHA-512 雜湊 |
| | VerifyHash | `string, string` | `bool` | 驗證雜湊值 |
| **XxHashHelper** | Hash32 | `string` / `byte[]` | `uint` | 32 位元 xxHash |
| | Hash64 | `string` / `byte[]` | `ulong` | 64 位元 xxHash |
| | Hash128 | `string` / `byte[]` / `byte[], int` | `uint128` | 128 位元 xxHash |
| | Hash32\<T\> | 無 | `uint` | 型別雜湊（32 位元） |
| | Hash64\<T\> | 無 | `ulong` | 型別雜湊（64 位元） |
| | IsDefault | `uint128` | `bool` | 檢查是否為預設值 |
| **MurmurHash3Helper** | Hash32 | `string` / `string, int` / `byte[]` | `uint` | MurmurHash3（支援種子） |
| **CrcHelper** | Crc32 | `string` / `byte[]` / `Stream` | `uint` | CRC32 校驗 |
| | Crc64 | `string` / `byte[]` | `ulong` | CRC64 校驗 |
| **HmacSha256Helper** | ComputeHash | `string, string` / `byte[], byte[]` | `string` | HMAC-SHA256 |
| | VerifyHash | `string, string, string` | `bool` | 驗證 HMAC |

### 效能對比

| 演算法 | 安全性 | 效能 | 輸出長度 | 適用場景 |
|------|--------|------|----------|----------|
| MD5 | 低 | 高 | 32 字元 | 相容性需求 |
| SHA-1 | 中 | 中 | 40 字元 | 相容性需求 |
| SHA-256 | 高 | 中 | 64 字元 | 安全雜湊 |
| SHA-512 | 高 | 中低 | 128 字元 | 高安全需求 |
| xxHash32 | 無 | 極高 | 8 字元 | 高效能場景 |
| xxHash64 | 無 | 極高 | 16 字元 | 高效能場景 |
| CRC32 | 無 | 高 | 8 字元 | 資料校驗 |
| HMAC-SHA256 | 高 | 中 | 64 字元 | 訊息認證 |
