# 암호화/복호화 (다중 알고리즘 통합 암호화 라이브러리)

GameFrameX.Foundation.Encryption은 다양한 주요 암호화 알고리즘을 제공하는 포괄적인 .NET 암호화 라이브러리입니다. 대칭 암호화, 비대칭 암호화, 중국 국가 암호 알고리즘, 디지털 서명 등을 지원합니다. 게임 개발 및 기업 애플리케이션을 위해 설계되었으며, 고성능의 사용하기 쉬운 암호화/복호화 기능을 제공합니다.

## 특징

- **다양한 암호화 알고리즘** - AES, RSA, SM2, SM4, DSA, XOR 등 주요 암호화 알고리즘 지원
- **중국 국가 암호 알고리즘 지원** - SM2, SM4 국가 암호 알고리즘 완전 지원
- **고성능** - 최적화된 알고리즘 구현, 빠른 암호화 모드 지원
- **안전성** - 암호학 모범 사례를 따르며 안전한 기본 설정 제공
- **경량화** - .NET 표준 라이브러리 기반, 외부 종속성 없음
- **사용 편의성** - 간결한 API 설계, 다양한 데이터 형식 지원

## 설치

```bash
dotnet add package GameFrameX.Foundation.Encryption
```

## 빠른 시작

```csharp
using GameFrameX.Foundation.Encryption;

// 임의의 키와 IV 생성
byte[] key = AesHelper.GenerateKey();
byte[] iv = AesHelper.GenerateIV();

// 문자열 암호화/복호화
string plainText = "Hello, World!";
string encrypted = AesHelper.Encrypt(plainText, key, iv);
string decrypted = AesHelper.Decrypt(encrypted, key, iv);

Console.WriteLine($"원문: {plainText}");
Console.WriteLine($"암호문: {encrypted}");
Console.WriteLine($"복호화: {decrypted}");
```

## 상세 사용법

### 1. AES 대칭 암호화 (AesHelper)

AES(Advanced Encryption Standard)는 현재 가장 널리 사용되는 대칭 암호화 알고리즘입니다:

```csharp
using GameFrameX.Foundation.Encryption;

// 임의의 키와 IV 생성
byte[] key = AesHelper.GenerateKey();
byte[] iv = AesHelper.GenerateIV();

// 문자열 암호화/복호화
string plainText = "Hello, World!";
string encrypted = AesHelper.Encrypt(plainText, key, iv);
string decrypted = AesHelper.Decrypt(encrypted, key, iv);

// 바이트 배열 암호화/복호화
byte[] data = Encoding.UTF8.GetBytes("민감 데이터");
byte[] encryptedBytes = AesHelper.Encrypt(data, key, iv);
byte[] decryptedBytes = AesHelper.Decrypt(encryptedBytes, key, iv);

// 비밀번호 기반 키 파생 (PBKDF2)
string password = "MySecretPassword";
string salt = "MySalt";
byte[] derivedKey = AesHelper.DeriveKeyFromPassword(password, salt);
string encryptedWithPassword = AesHelper.EncryptWithPassword(plainText, password, salt);
string decryptedWithPassword = AesHelper.DecryptWithPassword(encryptedWithPassword, password, salt);
```

### 2. RSA 비대칭 암호화 (RsaHelper)

RSA는 가장 널리 사용되는 비대칭 암호화 알고리즘으로, 암호화/복호화 및 디지털 서명을 지원합니다:

```csharp
using GameFrameX.Foundation.Encryption;

// RSA 키 쌍 생성
var (publicKey, privateKey) = RsaHelper.GenerateKeyPair(2048);

// 공개키 암호화, 개인키 복호화
string message = "기밀 정보";
string encrypted = RsaHelper.Encrypt(message, publicKey);
string decrypted = RsaHelper.Decrypt(encrypted, privateKey);

// 개인키 서명, 공개키 검증
string dataToSign = "서명이 필요한 데이터";
string signature = RsaHelper.Sign(dataToSign, privateKey);
bool isValid = RsaHelper.Verify(dataToSign, signature, publicKey);

// 바이트 배열 작업
byte[] dataBytes = Encoding.UTF8.GetBytes("바이너리 데이터");
byte[] encryptedBytes = RsaHelper.Encrypt(dataBytes, publicKey);
byte[] decryptedBytes = RsaHelper.Decrypt(encryptedBytes, privateKey);

// 대용량 데이터 분할 암호화 (RSA는 길이 제한이 있음)
byte[] largeData = new byte[1000];
byte[] encryptedLargeData = RsaHelper.EncryptLargeData(largeData, publicKey);
byte[] decryptedLargeData = RsaHelper.DecryptLargeData(encryptedLargeData, privateKey);
```

### 3. SM2 중국 국가 타원곡선 암호화 (Sm2Helper)

SM2는 중국 국가암호관리국에서 발표한 타원곡선 공개키 암호 알고리즘입니다:

```csharp
using GameFrameX.Foundation.Encryption;

// SM2 키 쌍 생성
var (publicKey, privateKey) = Sm2Helper.GenerateKeyPair();

// 공개키 암호화, 개인키 복호화
string plainText = "국가 암호 암호화 테스트";
string encrypted = Sm2Helper.Encrypt(plainText, publicKey);
string decrypted = Sm2Helper.Decrypt(encrypted, privateKey);

// 디지털 서명 및 검증
string dataToSign = "서명이 필요한 중요 문서";
string signature = Sm2Helper.Sign(dataToSign, privateKey);
bool isValid = Sm2Helper.Verify(dataToSign, signature, publicKey);

// 바이트 배열 작업
byte[] data = Encoding.UTF8.GetBytes("국가 암호 알고리즘 테스트 데이터");
byte[] encryptedData = Sm2Helper.Encrypt(data, publicKey);
byte[] decryptedData = Sm2Helper.Decrypt(encryptedData, privateKey);

// 키 교환 (ECDH)
var (alicePublic, alicePrivate) = Sm2Helper.GenerateKeyPair();
var (bobPublic, bobPrivate) = Sm2Helper.GenerateKeyPair();
byte[] aliceSharedKey = Sm2Helper.GenerateSharedKey(alicePrivate, bobPublic);
byte[] bobSharedKey = Sm2Helper.GenerateSharedKey(bobPrivate, alicePublic);
// aliceSharedKey와 bobSharedKey는 동일하며, 대칭 암호화 키로 사용 가능
```

### 4. SM4 중국 국가 블록 암호화 (Sm4Helper)

SM4는 중국 국가 표준 블록 암호 알고리즘입니다:

```csharp
using GameFrameX.Foundation.Encryption;

// SM4 키 생성
byte[] key = Sm4Helper.GenerateKey();

// ECB 모드 암호화/복호화 (프로덕션 환경에서는 권장하지 않음)
string plainText = "SM4 암호화 테스트";
string encryptedECB = Sm4Helper.EncryptECB(plainText, key);
string decryptedECB = Sm4Helper.DecryptECB(encryptedECB, key);

// CBC 모드 암호화/복호화 (권장)
byte[] iv = Sm4Helper.GenerateIV();
string encryptedCBC = Sm4Helper.EncryptCBC(plainText, key, iv);
string decryptedCBC = Sm4Helper.DecryptCBC(encryptedCBC, key, iv);

// 바이트 배열 작업
byte[] data = Encoding.UTF8.GetBytes("국가 암호 SM4 알고리즘");
byte[] encryptedBytes = Sm4Helper.EncryptCBC(data, key, iv);
byte[] decryptedBytes = Sm4Helper.DecryptCBC(encryptedBytes, key, iv);

// 스트림 암호화 (대용량 파일에 적합)
using var inputStream = new MemoryStream(data);
using var outputStream = new MemoryStream();
Sm4Helper.EncryptStream(inputStream, outputStream, key, iv);
```

### 5. DSA 디지털 서명 알고리즘 (DsaHelper)

DSA(Digital Signature Algorithm)는 디지털 서명에 특화된 알고리즘입니다:

```csharp
using GameFrameX.Foundation.Encryption;

// DSA 키 쌍 생성
var (publicKey, privateKey) = DsaHelper.GenerateKeyPair(2048);

// 디지털 서명
string document = "중요 계약서 내용";
string signature = DsaHelper.Sign(document, privateKey);

// 서명 검증
bool isValid = DsaHelper.Verify(document, signature, publicKey);
Console.WriteLine($"서명 검증 결과: {isValid}");

// 바이트 배열 서명
byte[] documentBytes = Encoding.UTF8.GetBytes("바이너리 문서");
byte[] signatureBytes = DsaHelper.Sign(documentBytes, privateKey);
bool isBytesValid = DsaHelper.Verify(documentBytes, signatureBytes, publicKey);

// 해시 서명 (성능 향상)
string documentHash = "SHA256 해시값";
string hashSignature = DsaHelper.SignHash(documentHash, privateKey);
bool isHashValid = DsaHelper.VerifyHash(documentHash, hashSignature, publicKey);
```

### 6. XOR 배타적 암호화 (XorHelper)

XOR은 간단하지만 효과적인 암호화 방식으로, 빠른 암호화가 필요한 상황에 적합합니다:

```csharp
using GameFrameX.Foundation.Encryption;

// 데이터와 키 준비
byte[] data = Encoding.UTF8.GetBytes("암호화할 데이터");
byte[] key = Encoding.UTF8.GetBytes("MySecretKey");

// 전체 암호화/복호화
byte[] encrypted = XorHelper.GetXorBytes(data, key);
byte[] decrypted = XorHelper.GetXorBytes(encrypted, key); // XOR의 가역성

// 빠른 암호화 (처음 220바이트만 암호화, 대용량 파일 헤더 암호화에 적합)
byte[] quickEncrypted = XorHelper.GetQuickXorBytes(data, key);
byte[] quickDecrypted = XorHelper.GetQuickXorBytes(quickEncrypted, key);

// 인플레이스 암호화 (메모리 절약)
byte[] dataToEncrypt = (byte[])data.Clone();
XorHelper.GetSelfXorBytes(dataToEncrypt, key); // 원본 배열 직접 수정
XorHelper.GetSelfXorBytes(dataToEncrypt, key); // 다시 XOR하여 원본 데이터 복원

// 부분 암호화 (범위 지정)
byte[] partialEncrypted = XorHelper.GetXorBytes(data, 5, 10, key); // 인덱스 5부터 10바이트 암호화

// 빠른 인플레이스 암호화
byte[] quickData = (byte[])data.Clone();
XorHelper.GetQuickSelfXorBytes(quickData, key);
```

## 고급 사용법

### 혼합 암호화 (RSA + AES)

비대칭 암호화와 대칭 암호화의 장점을 결합합니다:

```csharp
// RSA 키 쌍과 AES 키 생성
var (rsaPublic, rsaPrivate) = RsaHelper.GenerateKeyPair(2048);
byte[] aesKey = AesHelper.GenerateKey();
byte[] aesIV = AesHelper.GenerateIV();

// 대용량 데이터는 AES로 암호화
string largeData = "아주 긴 데이터입니다...";
string encryptedData = AesHelper.Encrypt(largeData, aesKey, aesIV);

// AES 키는 RSA로 암호화
string encryptedAesKey = RsaHelper.Encrypt(Convert.ToBase64String(aesKey), rsaPublic);
string encryptedAesIV = RsaHelper.Encrypt(Convert.ToBase64String(aesIV), rsaPublic);

// 복호화 과정
byte[] decryptedAesKey = Convert.FromBase64String(RsaHelper.Decrypt(encryptedAesKey, rsaPrivate));
byte[] decryptedAesIV = Convert.FromBase64String(RsaHelper.Decrypt(encryptedAesIV, rsaPrivate));
string decryptedData = AesHelper.Decrypt(encryptedData, decryptedAesKey, decryptedAesIV);
```

### 파일 암호화

```csharp
// 파일 암호화 예제
public static void EncryptFile(string inputFile, string outputFile, byte[] key, byte[] iv)
{
    using var inputStream = File.OpenRead(inputFile);
    using var outputStream = File.Create(outputFile);
    
    // AES를 사용한 파일 스트림 암호화
    using var cryptoStream = AesHelper.CreateEncryptStream(outputStream, key, iv);
    inputStream.CopyTo(cryptoStream);
}

// 대용량 파일 빠른 암호화 (파일 헤더만 암호화)
public static void QuickEncryptFile(string filePath, byte[] key)
{
    byte[] fileHeader = File.ReadAllBytes(filePath).Take(220).ToArray();
    byte[] encryptedHeader = XorHelper.GetQuickXorBytes(fileHeader, key);
    
    // 암호화된 헤더를 파일에 다시 쓰기
    using var stream = File.OpenWrite(filePath);
    stream.Write(encryptedHeader, 0, encryptedHeader.Length);
}
```

### 디지털 인증서 및 서명 체인

```csharp
// 서명 체인 생성
public class DocumentSignatureChain
{
    private readonly List<(string signer, string signature)> _signatures = new();
    
    public void AddSignature(string document, string signer, string privateKey)
    {
        // 문서와 이전 서명을 함께 서명
        string contentToSign = document + string.Join("", _signatures.Select(s => s.signature));
        string signature = RsaHelper.Sign(contentToSign, privateKey);
        _signatures.Add((signer, signature));
    }
    
    public bool VerifyChain(string document, Dictionary<string, string> publicKeys)
    {
        string content = document;
        foreach (var (signer, signature) in _signatures)
        {
            if (!publicKeys.ContainsKey(signer))
                return false;
                
            if (!RsaHelper.Verify(content, signature, publicKeys[signer]))
                return false;
                
            content += signature;
        }
        return true;
    }
}
```

### 중국 국가 암호 알고리즘 규정 준수

중국 암호법 규정을 준수해야 하는 애플리케이션의 경우:

```csharp
// 국가 암호 규정 준수 예제
public class GMCompliantEncryption
{
    // SM4를 사용한 대칭 암호화
    public static string EncryptWithSM4(string data, byte[] key)
    {
        byte[] iv = Sm4Helper.GenerateIV();
        return Sm4Helper.EncryptCBC(data, key, iv);
    }
    
    // SM2를 사용한 비대칭 암호화 및 서명
    public static (string encrypted, string signature) SecureWithSM2(
        string data, string publicKey, string privateKey)
    {
        string encrypted = Sm2Helper.Encrypt(data, publicKey);
        string signature = Sm2Helper.Sign(data, privateKey);
        return (encrypted, signature);
    }
    
    // SM2와 SM4 혼합 사용
    public static string HybridGMEncrypt(string data, string sm2PublicKey)
    {
        // SM4 키 생성
        byte[] sm4Key = Sm4Helper.GenerateKey();
        byte[] sm4IV = Sm4Helper.GenerateIV();
        
        // SM4로 데이터 암호화
        string encryptedData = Sm4Helper.EncryptCBC(data, sm4Key, sm4IV);
        
        // SM2로 SM4 키 암호화
        string encryptedKey = Sm2Helper.Encrypt(Convert.ToBase64String(sm4Key), sm2PublicKey);
        string encryptedIV = Sm2Helper.Encrypt(Convert.ToBase64String(sm4IV), sm2PublicKey);
        
        // 결과 조합
        return $"{encryptedKey}|{encryptedIV}|{encryptedData}";
    }
}
```

### 테스트 및 검증

```csharp
// 암호화 알고리즘 테스트 예제
[TestClass]
public class EncryptionTests
{
    [TestMethod]
    public void AES_EncryptDecrypt_ShouldReturnOriginalData()
    {
        // Arrange
        string original = "테스트 데이터";
        byte[] key = AesHelper.GenerateKey();
        byte[] iv = AesHelper.GenerateIV();
        
        // Act
        string encrypted = AesHelper.Encrypt(original, key, iv);
        string decrypted = AesHelper.Decrypt(encrypted, key, iv);
        
        // Assert
        Assert.AreEqual(original, decrypted);
        Assert.AreNotEqual(original, encrypted);
    }
    
    [TestMethod]
    public void RSA_SignVerify_ShouldValidateSignature()
    {
        // Arrange
        var (publicKey, privateKey) = RsaHelper.GenerateKeyPair(2048);
        string data = "서명이 필요한 데이터";
        
        // Act
        string signature = RsaHelper.Sign(data, privateKey);
        bool isValid = RsaHelper.Verify(data, signature, publicKey);
        bool isInvalid = RsaHelper.Verify(data + "변조", signature, publicKey);
        
        // Assert
        Assert.IsTrue(isValid);
        Assert.IsFalse(isInvalid);
    }
}
```

## 모범 사례

### 키 관리

```csharp
// 좋은 방법: 키 객체 재사용
public class EncryptionService
{
    private static readonly byte[] _aesKey = AesHelper.GenerateKey();
    private static readonly byte[] _aesIV = AesHelper.GenerateIV();
    
    public string EncryptData(string data)
    {
        return AesHelper.Encrypt(data, _aesKey, _aesIV);
    }
}

// 피해야 할 방법: 매번 새로운 키 생성
// string encrypted = AesHelper.Encrypt(data, AesHelper.GenerateKey(), AesHelper.GenerateIV());
```

### 대용량 데이터 처리

```csharp
// 좋은 방법: 스트림 처리 사용
public static void EncryptLargeFile(string inputFile, string outputFile, byte[] key, byte[] iv)
{
    const int bufferSize = 64 * 1024; // 64KB 버퍼
    using var input = File.OpenRead(inputFile);
    using var output = File.Create(outputFile);
    using var cryptoStream = AesHelper.CreateEncryptStream(output, key, iv);
    
    input.CopyTo(cryptoStream, bufferSize);
}

// 피해야 할 방법: 전체 파일을 한 번에 메모리에 로드
// byte[] allData = File.ReadAllBytes(largeFile);
```

### 적절한 알고리즘 선택

```csharp
// 성능 비교 (참고용)
// XOR: 가장 빠름, 간단한 난독화에 적합
// AES: 빠름, 대용량 데이터에 적합
// SM4: 중간, 국가 암호 요구 사항 시나리오에 적합
// RSA: 느림, 키 교환 및 서명에 적합
// SM2: 느림, 국가 암호 요구 사항의 비대칭 암호화에 적합

// 시나리오별 선택
public static class EncryptionStrategy
{
    public static byte[] EncryptBySize(byte[] data, EncryptionLevel level)
    {
        return level switch
        {
            EncryptionLevel.Fast when data.Length > 1024 => 
                XorHelper.GetQuickXorBytes(data, GetXorKey()),
            EncryptionLevel.Standard => 
                AesHelper.Encrypt(data, GetAesKey(), GetAesIV()),
            EncryptionLevel.High => 
                RsaHelper.Encrypt(data, GetRsaPublicKey()),
            _ => data
        };
    }
}
```

### 키 보안

```csharp
// 좋은 방법: 안전한 키 저장소 사용
public class SecureKeyManager
{
    public static byte[] GetKey(string keyName)
    {
        // 안전한 저장소(예: Azure Key Vault, Windows DPAPI 등)에서 키 가져오기
        return SecureStorage.GetKey(keyName);
    }
    
    public static void StoreKey(string keyName, byte[] key)
    {
        // 키를 안전하게 저장
        SecureStorage.StoreKey(keyName, key);
        
        // 메모리의 키 제거
        Array.Clear(key, 0, key.Length);
    }
}

// 피해야 할 방법: 키 하드코딩
// const string HardcodedKey = "MySecretKey123"; // 안전하지 않음!
```

### 난수 생성

```csharp
// 좋은 방법: 암호학적으로 안전한 난수 생성기 사용
public static byte[] GenerateSecureRandom(int length)
{
    using var rng = RandomNumberGenerator.Create();
    byte[] randomBytes = new byte[length];
    rng.GetBytes(randomBytes);
    return randomBytes;
}

// 피해야 할 방법: 일반 Random 클래스로 키 생성
// var random = new Random();
// byte[] key = new byte[32];
// random.NextBytes(key); // 안전하지 않음!
```

### 오류 처리

```csharp
public static class SafeEncryption
{
    public static string SafeEncrypt(string data, byte[] key, byte[] iv)
    {
        try
        {
            return AesHelper.Encrypt(data, key, iv);
        }
        catch (CryptographicException ex)
        {
            // 오류를 기록하되 민감한 정보는 노출하지 않음
            Logger.LogError("Encryption failed", ex);
            throw new ApplicationException("암호화 작업 실패");
        }
        finally
        {
            // 민감한 데이터 정리
            if (key != null) Array.Clear(key, 0, key.Length);
            if (iv != null) Array.Clear(iv, 0, iv.Length);
        }
    }
}
```

## API 레퍼런스

| 클래스 | 메서드 | 매개변수 | 반환값 | 설명 |
|---|------|------|--------|------|
| **AesHelper** | GenerateKey | 없음 | `byte[]` | 임의의 AES 키 생성 |
| | GenerateIV | 없음 | `byte[]` | 임의의 IV 생성 |
| | Encrypt | `string, byte[], byte[]` | `string` | 문자열 암호화 |
| | Decrypt | `string, byte[], byte[]` | `string` | 문자열 복호화 |
| | Encrypt | `byte[], byte[], byte[]` | `byte[]` | 바이트 배열 암호화 |
| | Decrypt | `byte[], byte[], byte[]` | `byte[]` | 바이트 배열 복호화 |
| | EncryptWithPassword | `string, string, string` | `string` | 비밀번호로 암호화 |
| | DecryptWithPassword | `string, string, string` | `string` | 비밀번호로 복호화 |
| | DeriveKeyFromPassword | `string, string` | `byte[]` | PBKDF2 키 파생 |
| **RsaHelper** | GenerateKeyPair | `int` | `(string, string)` | RSA 키 쌍 생성 |
| | Encrypt | `string, string` | `string` | 공개키 암호화 |
| | Decrypt | `string, string` | `string` | 개인키 복호화 |
| | Sign | `string, string` | `string` | 개인키 서명 |
| | Verify | `string, string, string` | `bool` | 공개키 서명 검증 |
| | EncryptLargeData | `byte[], string` | `byte[]` | 대용량 데이터 분할 암호화 |
| **Sm2Helper** | GenerateKeyPair | 없음 | `(string, string)` | SM2 키 쌍 생성 |
| | Encrypt | `string, string` | `string` | 공개키 암호화 |
| | Decrypt | `string, string` | `string` | 개인키 복호화 |
| | Sign | `string, string` | `string` | 개인키 서명 |
| | Verify | `string, string, string` | `bool` | 공개키 서명 검증 |
| | GenerateSharedKey | `string, string` | `byte[]` | ECDH 키 교환 |
| **Sm4Helper** | GenerateKey | 없음 | `byte[]` | SM4 키 생성 |
| | GenerateIV | 없음 | `byte[]` | IV 생성 |
| | EncryptCBC | `string, byte[], byte[]` | `string` | CBC 모드 암호화 |
| | DecryptCBC | `string, byte[], byte[]` | `string` | CBC 모드 복호화 |
| | EncryptECB | `string, byte[]` | `string` | ECB 모드 암호화 |
| | DecryptECB | `string, byte[]` | `string` | ECB 모드 복호화 |
| | EncryptStream | `Stream, Stream, byte[], byte[]` | `void` | 스트림 암호화 |
| **DsaHelper** | GenerateKeyPair | `int` | `(string, string)` | DSA 키 쌍 생성 |
| | Sign | `string, string` | `string` | 디지털 서명 |
| | Verify | `string, string, string` | `bool` | 서명 검증 |
| | SignHash | `string, string` | `string` | 해시 서명 |
| | VerifyHash | `string, string, string` | `bool` | 해시 서명 검증 |
| **XorHelper** | GetXorBytes | `byte[], byte[]` | `byte[]` | XOR 암호화/복호화 |
| | GetQuickXorBytes | `byte[], byte[]` | `byte[]` | 빠른 XOR (처음 220바이트) |
| | GetSelfXorBytes | `byte[], byte[]` | `void` | 인플레이스 XOR |
| | GetQuickSelfXorBytes | `byte[], byte[]` | `void` | 빠른 인플레이스 XOR |
| | GetXorBytes | `byte[], int, int, byte[]` | `byte[]` | 부분 범위 XOR |
