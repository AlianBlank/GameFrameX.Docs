# Hash (Multi-Algorithm Unified Hash Library)

[![NuGet](https://img.shields.io/nuget/v/GameFrameX.Foundation.Hash.svg)](https://www.nuget.org/packages/GameFrameX.Foundation.Hash/)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://github.com/GameFrameX/GameFrameX/blob/main/LICENSE)

GameFrameX.Foundation.Hash is an infrastructure library for the GameFrameX framework that provides a unified interface for multiple high-performance hash algorithms. The library supports common cryptographic hash algorithms (MD5, SHA family) and high-performance non-cryptographic hash algorithms (xxHash, MurmurHash3, CRC, etc.).

## Features

- **Multiple Hash Algorithm Support** - MD5, SHA-1, SHA-256, SHA-512, xxHash, MurmurHash3, CRC32/64, HMAC-SHA256
- **High Performance Implementation** - Based on .NET native algorithms and optimized third-party libraries
- **Unified API Design** - All algorithms provide a consistent calling interface
- **Multiple Input Formats** - Supports strings, byte arrays, streams, and file paths
- **Type Safe** - Complete parameter validation and exception handling
- **Salt Support** - Algorithms like MD5 support salted hashing
- **Verification Functions** - Built-in hash value verification methods

## Installation

```bash
dotnet add package GameFrameX.Foundation.Hash
```

## Quick Start

### MD5 Hash

```csharp
using GameFrameX.Foundation.Hash;

// String hash
string text = "Hello World";
string hash = Md5Helper.Hash(text);
Console.WriteLine(hash); // 输出: b10a8db164e0754105b7a99be72e3fe5

// Salted hash
string saltedHash = Md5Helper.HashWithSalt(text, "salt123");

// File hash
string fileHash = Md5Helper.HashByFilePath("path/to/file.txt");

// Verify hash
bool isValid = Md5Helper.IsVerify(text, hash);
```

### SHA-256 Hash

```csharp
using GameFrameX.Foundation.Hash;

// String hash
string text = "Hello World";
string hash = Sha256Helper.ComputeHash(text);

// File hash
string fileHash = Sha256Helper.ComputeFileHash("path/to/file.txt");

// Verify hash
bool isValid = Sha256Helper.VerifyHash(text, hash);
```

### xxHash High-Performance Hash

```csharp
using GameFrameX.Foundation.Hash;

// 32-bit hash
uint hash32 = XxHashHelper.Hash32("Hello World");

// 64-bit hash
ulong hash64 = XxHashHelper.Hash64("Hello World");

// 128-bit hash
uint128 hash128 = XxHashHelper.Hash128("Hello World");

// Type hash
uint typeHash = XxHashHelper.Hash32<MyClass>();
```

## Detailed Usage

### MD5 Hash Algorithm

MD5Helper provides comprehensive MD5 hashing functionality:

```csharp
// Basic hash
string hash = Md5Helper.Hash("input text");

// Uppercase format
string upperHash = Md5Helper.Hash("input text", isUpper: true);

// Byte array hash
byte[] data = Encoding.UTF8.GetBytes("input text");
string hash = Md5Helper.Hash(data);

// Stream hash
using var stream = new MemoryStream(data);
string hash = Md5Helper.Hash(stream);

// Salted hash (string salt)
string saltedHash = Md5Helper.HashWithSalt("input", "salt");

// Salted hash (byte array salt)
byte[] salt = Encoding.UTF8.GetBytes("salt");
string saltedHash = Md5Helper.HashWithSalt("input", salt);

// Verify hash
bool isValid = Md5Helper.IsVerify("input", hash);
bool isSaltedValid = Md5Helper.IsVerifyWithSalt("input", "salt", saltedHash);
```

### SHA Family Hash Algorithms

#### SHA-256

```csharp
// Basic hash
string hash = Sha256Helper.ComputeHash("input text");

// Specify encoding
string hash = Sha256Helper.ComputeHash("input text", Encoding.ASCII);

// Byte array hash
byte[] data = Encoding.UTF8.GetBytes("input text");
string hash = Sha256Helper.ComputeHash(data);

// File hash
string fileHash = Sha256Helper.ComputeFileHash("path/to/file.txt");

// Verify hash
bool isValid = Sha256Helper.VerifyHash("input text", hash);
bool isFileValid = Sha256Helper.VerifyFileHash("path/to/file.txt", fileHash);
```

#### SHA-1 and SHA-512

```csharp
// SHA-1
string sha1Hash = Sha1Helper.ComputeHash("input text");
bool sha1Valid = Sha1Helper.VerifyHash("input text", sha1Hash);

// SHA-512
string sha512Hash = Sha512Helper.ComputeHash("input text");
bool sha512Valid = Sha512Helper.VerifyHash("input text", sha512Hash);
```

### xxHash High-Performance Hash

xxHash is a non-cryptographic hash algorithm designed specifically for high performance:

```csharp
// 32-bit hash
uint hash32 = XxHashHelper.Hash32("input text");
uint hash32FromBytes = XxHashHelper.Hash32(Encoding.UTF8.GetBytes("input"));

// 64-bit hash
ulong hash64 = XxHashHelper.Hash64("input text");
ulong hash64FromBytes = XxHashHelper.Hash64(Encoding.UTF8.GetBytes("input"));

// 128-bit hash
uint128 hash128 = XxHashHelper.Hash128("input text");
uint128 hash128FromBytes = XxHashHelper.Hash128(Encoding.UTF8.GetBytes("input"));

// 128-bit hash with specified length
byte[] data = Encoding.UTF8.GetBytes("input text");
uint128 hash128Limited = XxHashHelper.Hash128(data, 5); // Use only the first 5 bytes

// Type hash
uint typeHash32 = XxHashHelper.Hash32<string>();
ulong typeHash64 = XxHashHelper.Hash64<MyClass>();

// Check if 128-bit hash is the default value
bool isDefault = XxHashHelper.IsDefault(hash128);
```

### MurmurHash3 Algorithm

```csharp
// 32-bit MurmurHash3
uint murmurHash = MurmurHash3Helper.Hash32("input text");

// Specify seed value
uint murmurHashWithSeed = MurmurHash3Helper.Hash32("input text", seed: 12345);

// Byte array hash
byte[] data = Encoding.UTF8.GetBytes("input text");
uint murmurHashFromBytes = MurmurHash3Helper.Hash32(data);
```

### CRC Checksum Algorithms

#### CRC32

```csharp
// Basic CRC32
uint crc32 = CrcHelper.Crc32("input text");

// Byte array CRC32
byte[] data = Encoding.UTF8.GetBytes("input text");
uint crc32FromBytes = CrcHelper.Crc32(data);

// Stream CRC32
using var stream = new MemoryStream(data);
uint crc32FromStream = CrcHelper.Crc32(stream);
```

#### CRC64

```csharp
// Basic CRC64
ulong crc64 = CrcHelper.Crc64("input text");

// Byte array CRC64
byte[] data = Encoding.UTF8.GetBytes("input text");
ulong crc64FromBytes = CrcHelper.Crc64(data);
```

### HMAC-SHA256 Algorithm

```csharp
// Basic HMAC-SHA256
string hmac = HmacSha256Helper.ComputeHash("input text", "secret key");

// Byte array input
byte[] data = Encoding.UTF8.GetBytes("input text");
byte[] key = Encoding.UTF8.GetBytes("secret key");
string hmacFromBytes = HmacSha256Helper.ComputeHash(data, key);

// Verify HMAC
bool isValid = HmacSha256Helper.VerifyHash("input text", "secret key", hmac);
```

## Advanced Usage

### Batch Hash Computation

```csharp
// Batch compute hashes for multiple strings
var inputs = new[] { "text1", "text2", "text3" };
var hashes = inputs.Select(Md5Helper.Hash).ToArray();

// Batch verification
var results = inputs.Zip(hashes, Md5Helper.IsVerify).ToArray();
```

### File Integrity Verification

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

### Password Hashing Best Practices

```csharp
public class PasswordHasher
{
    private static readonly Random Random = new Random();
    
    public static string HashPassword(string password)
    {
        // Generate random salt
        var salt = GenerateRandomSalt();
        var hash = Md5Helper.HashWithSalt(password, salt);
        
        // Return the combination of salt and hash
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

### Performance Benchmarking

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

### Custom Encoding

```csharp
// Use different character encodings
string hash1 = Sha256Helper.ComputeHash("测试文本", Encoding.UTF8);
string hash2 = Sha256Helper.ComputeHash("测试文本", Encoding.Unicode);
string hash3 = Sha256Helper.ComputeHash("测试文本", Encoding.ASCII);
```

### xxHash Seed Values

```csharp
// MurmurHash3 supports custom seed values
uint hash1 = MurmurHash3Helper.Hash32("input", seed: 0);
uint hash2 = MurmurHash3Helper.Hash32("input", seed: 12345);
// Same input with different seeds will produce different hash values
```

## Best Practices

### Algorithm Selection Guide

1. **Cryptographically Secure Scenarios**
    - Password storage: Use SHA-256 or stronger algorithms
    - Digital signatures: Use SHA-256 or SHA-512
    - Avoid using MD5 and SHA-1 (no longer secure)

2. **High-Performance Scenarios**
    - Hash tables: Use xxHash32 or xxHash64
    - Data integrity checks: Use CRC32 or CRC64
    - Cache key generation: Use the xxHash family

3. **Compatibility Scenarios**
    - Compatibility with legacy systems: May need to use MD5
    - Standard protocols: Choose the algorithm as required by the protocol

### Security Considerations

```csharp
// Insecure: directly hashing passwords
string unsafeHash = Md5Helper.Hash(password);

// Secure: use a salt value
string salt = GenerateRandomSalt();
string safeHash = Sha256Helper.ComputeHash(password + salt);

// More secure: use a dedicated password hashing algorithm (e.g., bcrypt, scrypt, Argon2)
// Note: This library primarily provides general-purpose hash algorithms.
// For password storage, it is recommended to use a dedicated password hashing library
```

### Performance Optimization Tips

```csharp
// Reuse byte arrays to avoid repeated encoding
byte[] data = Encoding.UTF8.GetBytes(input);
string md5Hash = Md5Helper.Hash(data);
string sha256Hash = Sha256Helper.ComputeHash(data);

// For large files, use stream processing
using var fileStream = File.OpenRead(largeFilePath);
string hash = Md5Helper.Hash(fileStream);

// Consider parallel processing for batch operations
var hashes = inputs.AsParallel()
    .Select(input => new { Input = input, Hash = XxHashHelper.Hash64(input) })
    .ToArray();
```

### Error Handling

```csharp
public static class SafeHashHelper
{
    public static string SafeComputeFileHash(string filePath)
    {
        try
        {
            if (!File.Exists(filePath))
            {
                throw new FileNotFoundException($"File not found: {filePath}");
            }
            
            return Sha256Helper.ComputeFileHash(filePath);
        }
        catch (UnauthorizedAccessException)
        {
            throw new InvalidOperationException($"No permission to access file: {filePath}");
        }
        catch (IOException ex)
        {
            throw new InvalidOperationException($"IO error occurred while reading file: {ex.Message}");
        }
    }
}
```

### Troubleshooting

**Q: MD5 hash result doesn't match online tools?**
```csharp
// Ensure you are using the same encoding and format
string input = "Hello World";
string hash = Md5Helper.Hash(input, isUpper: false); // lowercase
string upperHash = Md5Helper.Hash(input, isUpper: true); // uppercase
```

**Q: File hash computation failed?**
```csharp
// Check if the file exists and permissions
if (!File.Exists(filePath))
{
    Console.WriteLine("File does not exist");
    return;
}

try
{
    string hash = Sha256Helper.ComputeFileHash(filePath);
}
catch (UnauthorizedAccessException)
{
    Console.WriteLine("No file access permission");
}
```

**Q: Large file hash computation uses too much memory?**
```csharp
// Use stream processing instead of reading the entire file at once
using var fileStream = File.OpenRead(largeFilePath);
string hash = Md5Helper.Hash(fileStream);
```

### Debugging Tips

```csharp
// Enable verbose logging
public static class HashDebugHelper
{
    public static void DebugHash(string input)
    {
        Console.WriteLine($"Input: {input}");
        Console.WriteLine($"UTF8 bytes: {string.Join(",", Encoding.UTF8.GetBytes(input))}");
        Console.WriteLine($"MD5: {Md5Helper.Hash(input)}");
        Console.WriteLine($"SHA256: {Sha256Helper.ComputeHash(input)}");
        Console.WriteLine($"xxHash32: {XxHashHelper.Hash32(input)}");
        Console.WriteLine($"xxHash64: {XxHashHelper.Hash64(input)}");
    }
}
```

## API Reference

| Class | Method | Parameters | Return Value | Description |
|---|------|------|--------|------|
| **Md5Helper** | Hash | `string` / `string, bool` | `string` | Compute MD5 hash |
| | Hash | `byte[]` | `string` | Byte array MD5 hash |
| | Hash | `Stream` | `string` | Stream MD5 hash |
| | HashWithSalt | `string, string` / `string, byte[]` | `string` | Salted MD5 hash |
| | HashByFilePath | `string` | `string` | File MD5 hash |
| | IsVerify | `string, string` | `bool` | Verify hash value |
| | IsVerifyWithSalt | `string, string, string` | `bool` | Verify salted hash |
| **Sha256Helper** | ComputeHash | `string` / `string, Encoding` | `string` | Compute SHA-256 hash |
| | ComputeHash | `byte[]` | `string` | Byte array SHA-256 |
| | ComputeFileHash | `string` | `string` | File SHA-256 |
| | VerifyHash | `string, string` | `bool` | Verify hash value |
| | VerifyFileHash | `string, string` | `bool` | Verify file hash |
| **Sha1Helper** | ComputeHash | `string` | `string` | Compute SHA-1 hash |
| | VerifyHash | `string, string` | `bool` | Verify hash value |
| **Sha512Helper** | ComputeHash | `string` | `string` | Compute SHA-512 hash |
| | VerifyHash | `string, string` | `bool` | Verify hash value |
| **XxHashHelper** | Hash32 | `string` / `byte[]` | `uint` | 32-bit xxHash |
| | Hash64 | `string` / `byte[]` | `ulong` | 64-bit xxHash |
| | Hash128 | `string` / `byte[]` / `byte[], int` | `uint128` | 128-bit xxHash |
| | Hash32\<T\> | none | `uint` | Type hash (32-bit) |
| | Hash64\<T\> | none | `ulong` | Type hash (64-bit) |
| | IsDefault | `uint128` | `bool` | Check if default value |
| **MurmurHash3Helper** | Hash32 | `string` / `string, int` / `byte[]` | `uint` | MurmurHash3 (supports seed) |
| **CrcHelper** | Crc32 | `string` / `byte[]` / `Stream` | `uint` | CRC32 checksum |
| | Crc64 | `string` / `byte[]` | `ulong` | CRC64 checksum |
| **HmacSha256Helper** | ComputeHash | `string, string` / `byte[], byte[]` | `string` | HMAC-SHA256 |
| | VerifyHash | `string, string, string` | `bool` | Verify HMAC |

### Performance Comparison

| Algorithm | Security | Performance | Output Length | Use Case |
|------|--------|------|----------|----------|
| MD5 | Low | High | 32 characters | Compatibility needs |
| SHA-1 | Medium | Medium | 40 characters | Compatibility needs |
| SHA-256 | High | Medium | 64 characters | Secure hashing |
| SHA-512 | High | Medium-Low | 128 characters | High security needs |
| xxHash32 | None | Very High | 8 characters | High-performance scenarios |
| xxHash64 | None | Very High | 16 characters | High-performance scenarios |
| CRC32 | None | High | 8 characters | Data verification |
| HMAC-SHA256 | High | Medium | 64 characters | Message authentication |
