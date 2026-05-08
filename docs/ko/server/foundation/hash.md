# 해시 계산 (다중 알고리즘 통합 해시 라이브러리)

[![NuGet](https://img.shields.io/nuget/v/GameFrameX.Foundation.Hash.svg)](https://www.nuget.org/packages/GameFrameX.Foundation.Hash/)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://github.com/GameFrameX/GameFrameX/blob/main/LICENSE)

GameFrameX.Foundation.Hash는 GameFrameX 프레임워크의 기반 라이브러리로, 다양한 고성능 해시 알고리즘의 통합 인터페이스를 제공합니다. 이 라이브러리는 일반적인 암호화 해시 알고리즘(MD5, SHA 시리즈)과 고성능 비암호화 해시 알고리즘(xxHash, MurmurHash3, CRC 등)을 지원합니다.

## 특징

- **다양한 해시 알고리즘 지원** - MD5, SHA-1, SHA-256, SHA-512, xxHash, MurmurHash3, CRC32/64, HMAC-SHA256
- **고성능 구현** - .NET 네이티브 알고리즘 및 최적화된 서드파티 라이브러리 기반
- **통합 API 설계** - 모든 알고리즘이 일관된 호출 인터페이스 제공
- **다양한 입력 형식** - 문자열, 바이트 배열, 스트림 및 파일 경로 지원
- **형식 안전성** - 완전한 매개변수 검증 및 예외 처리
- **솔트 지원** - MD5 등 알고리즘의 솔트 해시 지원
- **검증 기능** - 내장 해시값 검증 메서드

## 설치

```bash
dotnet add package GameFrameX.Foundation.Hash
```

## 빠른 시작

### MD5 해시

```csharp
using GameFrameX.Foundation.Hash;

// 문자열 해시
string text = "Hello World";
string hash = Md5Helper.Hash(text);
Console.WriteLine(hash); // 출력: b10a8db164e0754105b7a99be72e3fe5

// 솔트 해시
string saltedHash = Md5Helper.HashWithSalt(text, "salt123");

// 파일 해시
string fileHash = Md5Helper.HashByFilePath("path/to/file.txt");

// 해시 검증
bool isValid = Md5Helper.IsVerify(text, hash);
```

### SHA-256 해시

```csharp
using GameFrameX.Foundation.Hash;

// 문자열 해시
string text = "Hello World";
string hash = Sha256Helper.ComputeHash(text);

// 파일 해시
string fileHash = Sha256Helper.ComputeFileHash("path/to/file.txt");

// 해시 검증
bool isValid = Sha256Helper.VerifyHash(text, hash);
```

### xxHash 고성능 해시

```csharp
using GameFrameX.Foundation.Hash;

// 32비트 해시
uint hash32 = XxHashHelper.Hash32("Hello World");

// 64비트 해시
ulong hash64 = XxHashHelper.Hash64("Hello World");

// 128비트 해시
uint128 hash128 = XxHashHelper.Hash128("Hello World");

// 형식 해시
uint typeHash = XxHashHelper.Hash32<MyClass>();
```

## 상세 사용법

### MD5 해시 알고리즘

MD5Helper는 완전한 MD5 해시 기능을 제공합니다:

```csharp
// 기본 해시
string hash = Md5Helper.Hash("input text");

// 대문자 형식
string upperHash = Md5Helper.Hash("input text", isUpper: true);

// 바이트 배열 해시
byte[] data = Encoding.UTF8.GetBytes("input text");
string hash = Md5Helper.Hash(data);

// 스트림 해시
using var stream = new MemoryStream(data);
string hash = Md5Helper.Hash(stream);

// 솔트 해시 (문자열 솔트)
string saltedHash = Md5Helper.HashWithSalt("input", "salt");

// 솔트 해시 (바이트 배열 솔트)
byte[] salt = Encoding.UTF8.GetBytes("salt");
string saltedHash = Md5Helper.HashWithSalt("input", salt);

// 해시 검증
bool isValid = Md5Helper.IsVerify("input", hash);
bool isSaltedValid = Md5Helper.IsVerifyWithSalt("input", "salt", saltedHash);
```

### SHA 시리즈 해시 알고리즘

#### SHA-256

```csharp
// 기본 해시
string hash = Sha256Helper.ComputeHash("input text");

// 인코딩 지정
string hash = Sha256Helper.ComputeHash("input text", Encoding.ASCII);

// 바이트 배열 해시
byte[] data = Encoding.UTF8.GetBytes("input text");
string hash = Sha256Helper.ComputeHash(data);

// 파일 해시
string fileHash = Sha256Helper.ComputeFileHash("path/to/file.txt");

// 해시 검증
bool isValid = Sha256Helper.VerifyHash("input text", hash);
bool isFileValid = Sha256Helper.VerifyFileHash("path/to/file.txt", fileHash);
```

#### SHA-1 및 SHA-512

```csharp
// SHA-1
string sha1Hash = Sha1Helper.ComputeHash("input text");
bool sha1Valid = Sha1Helper.VerifyHash("input text", sha1Hash);

// SHA-512
string sha512Hash = Sha512Helper.ComputeHash("input text");
bool sha512Valid = Sha512Helper.VerifyHash("input text", sha512Hash);
```

### xxHash 고성능 해시

xxHash는 고성능을 위해 설계된 비암호화 해시 알고리즘입니다:

```csharp
// 32비트 해시
uint hash32 = XxHashHelper.Hash32("input text");
uint hash32FromBytes = XxHashHelper.Hash32(Encoding.UTF8.GetBytes("input"));

// 64비트 해시
ulong hash64 = XxHashHelper.Hash64("input text");
ulong hash64FromBytes = XxHashHelper.Hash64(Encoding.UTF8.GetBytes("input"));

// 128비트 해시
uint128 hash128 = XxHashHelper.Hash128("input text");
uint128 hash128FromBytes = XxHashHelper.Hash128(Encoding.UTF8.GetBytes("input"));

// 지정된 길이의 128비트 해시
byte[] data = Encoding.UTF8.GetBytes("input text");
uint128 hash128Limited = XxHashHelper.Hash128(data, 5); // 처음 5바이트만 사용

// 형식 해시
uint typeHash32 = XxHashHelper.Hash32<string>();
ulong typeHash64 = XxHashHelper.Hash64<MyClass>();

// 128비트 해시가 기본값인지 확인
bool isDefault = XxHashHelper.IsDefault(hash128);
```

### MurmurHash3 알고리즘

```csharp
// 32비트 MurmurHash3
uint murmurHash = MurmurHash3Helper.Hash32("input text");

// 시드값 지정
uint murmurHashWithSeed = MurmurHash3Helper.Hash32("input text", seed: 12345);

// 바이트 배열 해시
byte[] data = Encoding.UTF8.GetBytes("input text");
uint murmurHashFromBytes = MurmurHash3Helper.Hash32(data);
```

### CRC 체크섬 알고리즘

#### CRC32

```csharp
// 기본 CRC32
uint crc32 = CrcHelper.Crc32("input text");

// 바이트 배열 CRC32
byte[] data = Encoding.UTF8.GetBytes("input text");
uint crc32FromBytes = CrcHelper.Crc32(data);

// 스트림 CRC32
using var stream = new MemoryStream(data);
uint crc32FromStream = CrcHelper.Crc32(stream);
```

#### CRC64

```csharp
// 기본 CRC64
ulong crc64 = CrcHelper.Crc64("input text");

// 바이트 배열 CRC64
byte[] data = Encoding.UTF8.GetBytes("input text");
ulong crc64FromBytes = CrcHelper.Crc64(data);
```

### HMAC-SHA256 알고리즘

```csharp
// 기본 HMAC-SHA256
string hmac = HmacSha256Helper.ComputeHash("input text", "secret key");

// 바이트 배열 입력
byte[] data = Encoding.UTF8.GetBytes("input text");
byte[] key = Encoding.UTF8.GetBytes("secret key");
string hmacFromBytes = HmacSha256Helper.ComputeHash(data, key);

// HMAC 검증
bool isValid = HmacSha256Helper.VerifyHash("input text", "secret key", hmac);
```

## 고급 사용법

### 일괄 해시 계산

```csharp
// 여러 문자열의 해시값 일괄 계산
var inputs = new[] { "text1", "text2", "text3" };
var hashes = inputs.Select(Md5Helper.Hash).ToArray();

// 일괄 검증
var results = inputs.Zip(hashes, Md5Helper.IsVerify).ToArray();
```

### 파일 무결성 검증

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

### 비밀번호 해시 모범 사례

```csharp
public class PasswordHasher
{
    private static readonly Random Random = new Random();
    
    public static string HashPassword(string password)
    {
        // 임의의 솔트 생성
        var salt = GenerateRandomSalt();
        var hash = Md5Helper.HashWithSalt(password, salt);
        
        // 솔트와 해시의 조합 반환
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

### 성능 벤치마크

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

### 사용자 정의 인코딩

```csharp
// 다른 문자 인코딩 사용
string hash1 = Sha256Helper.ComputeHash("테스트 텍스트", Encoding.UTF8);
string hash2 = Sha256Helper.ComputeHash("테스트 텍스트", Encoding.Unicode);
string hash3 = Sha256Helper.ComputeHash("테스트 텍스트", Encoding.ASCII);
```

### xxHash 시드값

```csharp
// MurmurHash3는 사용자 정의 시드값을 지원합니다
uint hash1 = MurmurHash3Helper.Hash32("input", seed: 0);
uint hash2 = MurmurHash3Helper.Hash32("input", seed: 12345);
// 동일한 입력이라도 시드가 다르면 다른 해시값이 생성됩니다
```

## 모범 사례

### 알고리즘 선택 가이드

1. **암호화 보안 시나리오**
    - 비밀번호 저장: SHA-256 이상의 강도를 가진 알고리즘 사용
    - 디지털 서명: SHA-256 또는 SHA-512 사용
    - MD5 및 SHA-1은 피하세요 (더 이상 안전하지 않음)

2. **고성능 시나리오**
    - 해시 테이블: xxHash32 또는 xxHash64 사용
    - 데이터 무결성 검증: CRC32 또는 CRC64 사용
    - 캐시 키 생성: xxHash 시리즈 사용

3. **호환성 시나리오**
    - 기존 시스템과의 호환성: MD5를 사용해야 할 수 있음
    - 표준 프로토콜: 프로토콜 요구 사항에 따라 알고리즘 선택

### 보안 주의사항

```csharp
// 안전하지 않음: 비밀번호를 직접 해시
string unsafeHash = Md5Helper.Hash(password);

// 안전함: 솔트값 사용
string salt = GenerateRandomSalt();
string safeHash = Sha256Helper.ComputeHash(password + salt);

// 더 안전함: 전용 비밀번호 해시 알고리즘 사용 (예: bcrypt, scrypt, Argon2)
// 참고: 이 라이브러리는 주로 범용 해시 알고리즘을 제공하며, 비밀번호 저장에는 전용 비밀번호 해시 라이브러리 사용을 권장합니다
```

### 성능 최적화 제안

```csharp
// 바이트 배열을 재사용하여 반복적인 인코딩 방지
byte[] data = Encoding.UTF8.GetBytes(input);
string md5Hash = Md5Helper.Hash(data);
string sha256Hash = Sha256Helper.ComputeHash(data);

// 대용량 파일에는 스트림 처리 사용
using var fileStream = File.OpenRead(largeFilePath);
string hash = Md5Helper.Hash(fileStream);

// 일괄 작업 시 병렬 처리 고려
var hashes = inputs.AsParallel()
    .Select(input => new { Input = input, Hash = XxHashHelper.Hash64(input) })
    .ToArray();
```

### 오류 처리

```csharp
public static class SafeHashHelper
{
    public static string SafeComputeFileHash(string filePath)
    {
        try
        {
            if (!File.Exists(filePath))
            {
                throw new FileNotFoundException($"파일이 존재하지 않음: {filePath}");
            }
            
            return Sha256Helper.ComputeFileHash(filePath);
        }
        catch (UnauthorizedAccessException)
        {
            throw new InvalidOperationException($"파일 접근 권한 없음: {filePath}");
        }
        catch (IOException ex)
        {
            throw new InvalidOperationException($"파일 읽기 중 IO 오류 발생: {ex.Message}");
        }
    }
}
```

### 문제 해결

**Q: MD5 해시 결과가 온라인 도구와 일치하지 않나요?**
```csharp
// 동일한 인코딩과 형식을 사용했는지 확인하세요
string input = "Hello World";
string hash = Md5Helper.Hash(input, isUpper: false); // 소문자
string upperHash = Md5Helper.Hash(input, isUpper: true); // 대문자
```

**Q: 파일 해시 계산이 실패하나요?**
```csharp
// 파일 존재 여부 및 권한을 확인하세요
if (!File.Exists(filePath))
{
    Console.WriteLine("파일이 존재하지 않습니다");
    return;
}

try
{
    string hash = Sha256Helper.ComputeFileHash(filePath);
}
catch (UnauthorizedAccessException)
{
    Console.WriteLine("파일 접근 권한이 없습니다");
}
```

**Q: 대용량 파일 해시 계산 시 메모리 사용량이 너무 높나요?**
```csharp
// 전체 파일을 한 번에 읽지 말고 스트림 처리를 사용하세요
using var fileStream = File.OpenRead(largeFilePath);
string hash = Md5Helper.Hash(fileStream);
```

### 디버깅 팁

```csharp
// 상세 로깅 활성화
public static class HashDebugHelper
{
    public static void DebugHash(string input)
    {
        Console.WriteLine($"입력: {input}");
        Console.WriteLine($"UTF8 바이트: {string.Join(",", Encoding.UTF8.GetBytes(input))}");
        Console.WriteLine($"MD5: {Md5Helper.Hash(input)}");
        Console.WriteLine($"SHA256: {Sha256Helper.ComputeHash(input)}");
        Console.WriteLine($"xxHash32: {XxHashHelper.Hash32(input)}");
        Console.WriteLine($"xxHash64: {XxHashHelper.Hash64(input)}");
    }
}
```

## API 레퍼런스

| 클래스 | 메서드 | 매개변수 | 반환값 | 설명 |
|---|------|------|--------|------|
| **Md5Helper** | Hash | `string` / `string, bool` | `string` | MD5 해시 계산 |
| | Hash | `byte[]` | `string` | 바이트 배열 MD5 해시 |
| | Hash | `Stream` | `string` | 스트림 MD5 해시 |
| | HashWithSalt | `string, string` / `string, byte[]` | `string` | 솔트가 포함된 MD5 해시 |
| | HashByFilePath | `string` | `string` | 파일 MD5 해시 |
| | IsVerify | `string, string` | `bool` | 해시값 검증 |
| | IsVerifyWithSalt | `string, string, string` | `bool` | 솔트 해시 검증 |
| **Sha256Helper** | ComputeHash | `string` / `string, Encoding` | `string` | SHA-256 해시 계산 |
| | ComputeHash | `byte[]` | `string` | 바이트 배열 SHA-256 |
| | ComputeFileHash | `string` | `string` | 파일 SHA-256 |
| | VerifyHash | `string, string` | `bool` | 해시값 검증 |
| | VerifyFileHash | `string, string` | `bool` | 파일 해시 검증 |
| **Sha1Helper** | ComputeHash | `string` | `string` | SHA-1 해시 계산 |
| | VerifyHash | `string, string` | `bool` | 해시값 검증 |
| **Sha512Helper** | ComputeHash | `string` | `string` | SHA-512 해시 계산 |
| | VerifyHash | `string, string` | `bool` | 해시값 검증 |
| **XxHashHelper** | Hash32 | `string` / `byte[]` | `uint` | 32비트 xxHash |
| | Hash64 | `string` / `byte[]` | `ulong` | 64비트 xxHash |
| | Hash128 | `string` / `byte[]` / `byte[], int` | `uint128` | 128비트 xxHash |
| | Hash32\<T\> | 없음 | `uint` | 형식 해시 (32비트) |
| | Hash64\<T\> | 없음 | `ulong` | 형식 해시 (64비트) |
| | IsDefault | `uint128` | `bool` | 기본값 여부 확인 |
| **MurmurHash3Helper** | Hash32 | `string` / `string, int` / `byte[]` | `uint` | MurmurHash3 (시드 지원) |
| **CrcHelper** | Crc32 | `string` / `byte[]` / `Stream` | `uint` | CRC32 체크섬 |
| | Crc64 | `string` / `byte[]` | `ulong` | CRC64 체크섬 |
| **HmacSha256Helper** | ComputeHash | `string, string` / `byte[], byte[]` | `string` | HMAC-SHA256 |
| | VerifyHash | `string, string, string` | `bool` | HMAC 검증 |

### 성능 비교

| 알고리즘 | 보안성 | 성능 | 출력 길이 | 적용 시나리오 |
|------|--------|------|----------|----------|
| MD5 | 낮음 | 높음 | 32문자 | 호환성 요구 |
| SHA-1 | 중간 | 중간 | 40문자 | 호환성 요구 |
| SHA-256 | 높음 | 중간 | 64문자 | 보안 해시 |
| SHA-512 | 높음 | 중낮음 | 128문자 | 높은 보안 요구 |
| xxHash32 | 없음 | 매우 높음 | 8문자 | 고성능 시나리오 |
| xxHash64 | 없음 | 매우 높음 | 16문자 | 고성능 시나리오 |
| CRC32 | 없음 | 높음 | 8문자 | 데이터 검증 |
| HMAC-SHA256 | 높음 | 중간 | 64문자 | 메시지 인증 |
