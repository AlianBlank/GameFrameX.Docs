# Encryption (Multi-Algorithm Unified Encryption Library)

GameFrameX.Foundation.Encryption is a comprehensive .NET encryption library that provides implementations of multiple mainstream encryption algorithms, including symmetric encryption, asymmetric encryption, Chinese national cryptographic algorithms (SM), and digital signatures. Designed for game development and enterprise applications, it delivers high-performance, easy-to-use encryption and decryption capabilities.

## Features

- **Multiple Encryption Algorithms** - Supports AES, RSA, SM2, SM4, DSA, XOR and other mainstream encryption algorithms
- **Chinese National Cryptographic Algorithm Support** - Full support for SM2 and SM4 national cryptographic algorithms
- **High Performance** - Optimized algorithm implementations with fast encryption mode support
- **Secure and Reliable** - Follows cryptographic best practices with secure default configurations
- **Lightweight** - Based on .NET standard library with no additional dependencies
- **Easy to Use** - Clean API design with support for multiple data formats

## Installation

```bash
dotnet add package GameFrameX.Foundation.Encryption
```

## Quick Start

```csharp
using GameFrameX.Foundation.Encryption;

// Generate random key and IV
byte[] key = AesHelper.GenerateKey();
byte[] iv = AesHelper.GenerateIV();

// String encryption and decryption
string plainText = "Hello, World!";
string encrypted = AesHelper.Encrypt(plainText, key, iv);
string decrypted = AesHelper.Decrypt(encrypted, key, iv);

Console.WriteLine($"原文: {plainText}");
Console.WriteLine($"密文: {encrypted}");
Console.WriteLine($"解密: {decrypted}");
```

## Detailed Usage

### 1. AES Symmetric Encryption (AesHelper)

AES (Advanced Encryption Standard) is the most widely used symmetric encryption algorithm today:

```csharp
using GameFrameX.Foundation.Encryption;

// Generate random key and IV
byte[] key = AesHelper.GenerateKey();
byte[] iv = AesHelper.GenerateIV();

// String encryption and decryption
string plainText = "Hello, World!";
string encrypted = AesHelper.Encrypt(plainText, key, iv);
string decrypted = AesHelper.Decrypt(encrypted, key, iv);

// Byte array encryption and decryption
byte[] data = Encoding.UTF8.GetBytes("敏感数据");
byte[] encryptedBytes = AesHelper.Encrypt(data, key, iv);
byte[] decryptedBytes = AesHelper.Decrypt(encryptedBytes, key, iv);

// Derive key from password (PBKDF2)
string password = "MySecretPassword";
string salt = "MySalt";
byte[] derivedKey = AesHelper.DeriveKeyFromPassword(password, salt);
string encryptedWithPassword = AesHelper.EncryptWithPassword(plainText, password, salt);
string decryptedWithPassword = AesHelper.DecryptWithPassword(encryptedWithPassword, password, salt);
```

### 2. RSA Asymmetric Encryption (RsaHelper)

RSA is the most commonly used asymmetric encryption algorithm, supporting encryption/decryption and digital signatures:

```csharp
using GameFrameX.Foundation.Encryption;

// Generate RSA key pair
var (publicKey, privateKey) = RsaHelper.GenerateKeyPair(2048);

// Encrypt with public key, decrypt with private key
string message = "机密信息";
string encrypted = RsaHelper.Encrypt(message, publicKey);
string decrypted = RsaHelper.Decrypt(encrypted, privateKey);

// Sign with private key, verify with public key
string dataToSign = "需要签名的数据";
string signature = RsaHelper.Sign(dataToSign, privateKey);
bool isValid = RsaHelper.Verify(dataToSign, signature, publicKey);

// Byte array operations
byte[] dataBytes = Encoding.UTF8.GetBytes("二进制数据");
byte[] encryptedBytes = RsaHelper.Encrypt(dataBytes, publicKey);
byte[] decryptedBytes = RsaHelper.Decrypt(encryptedBytes, privateKey);

// Large data block encryption (RSA has length limitations)
byte[] largeData = new byte[1000];
byte[] encryptedLargeData = RsaHelper.EncryptLargeData(largeData, publicKey);
byte[] decryptedLargeData = RsaHelper.DecryptLargeData(encryptedLargeData, privateKey);
```

### 3. SM2 Chinese National Elliptic Curve Encryption (Sm2Helper)

SM2 is an elliptic curve public key cryptographic algorithm published by the Chinese National Cryptography Administration:

```csharp
using GameFrameX.Foundation.Encryption;

// Generate SM2 key pair
var (publicKey, privateKey) = Sm2Helper.GenerateKeyPair();

// Encrypt with public key, decrypt with private key
string plainText = "国密加密测试";
string encrypted = Sm2Helper.Encrypt(plainText, publicKey);
string decrypted = Sm2Helper.Decrypt(encrypted, privateKey);

// Digital signature and verification
string dataToSign = "需要签名的重要文档";
string signature = Sm2Helper.Sign(dataToSign, privateKey);
bool isValid = Sm2Helper.Verify(dataToSign, signature, publicKey);

// Byte array operations
byte[] data = Encoding.UTF8.GetBytes("国密算法测试数据");
byte[] encryptedData = Sm2Helper.Encrypt(data, publicKey);
byte[] decryptedData = Sm2Helper.Decrypt(encryptedData, privateKey);

// Key exchange (ECDH)
var (alicePublic, alicePrivate) = Sm2Helper.GenerateKeyPair();
var (bobPublic, bobPrivate) = Sm2Helper.GenerateKeyPair();
byte[] aliceSharedKey = Sm2Helper.GenerateSharedKey(alicePrivate, bobPublic);
byte[] bobSharedKey = Sm2Helper.GenerateSharedKey(bobPrivate, alicePublic);
// aliceSharedKey and bobSharedKey are identical and can be used as a symmetric encryption key
```

### 4. SM4 Chinese National Block Cipher (Sm4Helper)

SM4 is a Chinese national standard block cipher algorithm:

```csharp
using GameFrameX.Foundation.Encryption;

// Generate SM4 key
byte[] key = Sm4Helper.GenerateKey();

// ECB mode encryption/decryption (not recommended for production)
string plainText = "SM4加密测试";
string encryptedECB = Sm4Helper.EncryptECB(plainText, key);
string decryptedECB = Sm4Helper.DecryptECB(encryptedECB, key);

// CBC mode encryption/decryption (recommended)
byte[] iv = Sm4Helper.GenerateIV();
string encryptedCBC = Sm4Helper.EncryptCBC(plainText, key, iv);
string decryptedCBC = Sm4Helper.DecryptCBC(encryptedCBC, key, iv);

// Byte array operations
byte[] data = Encoding.UTF8.GetBytes("国密SM4算法");
byte[] encryptedBytes = Sm4Helper.EncryptCBC(data, key, iv);
byte[] decryptedBytes = Sm4Helper.DecryptCBC(encryptedBytes, key, iv);

// Stream encryption (suitable for large files)
using var inputStream = new MemoryStream(data);
using var outputStream = new MemoryStream();
Sm4Helper.EncryptStream(inputStream, outputStream, key, iv);
```

### 5. DSA Digital Signature Algorithm (DsaHelper)

DSA (Digital Signature Algorithm) is designed specifically for digital signatures:

```csharp
using GameFrameX.Foundation.Encryption;

// Generate DSA key pair
var (publicKey, privateKey) = DsaHelper.GenerateKeyPair(2048);

// Digital signature
string document = "重要合同内容";
string signature = DsaHelper.Sign(document, privateKey);

// Signature verification
bool isValid = DsaHelper.Verify(document, signature, publicKey);
Console.WriteLine($"签名验证结果: {isValid}");

// Byte array signing
byte[] documentBytes = Encoding.UTF8.GetBytes("二进制文档");
byte[] signatureBytes = DsaHelper.Sign(documentBytes, privateKey);
bool isBytesValid = DsaHelper.Verify(documentBytes, signatureBytes, publicKey);

// Hash signing (improves performance)
string documentHash = "SHA256哈希值";
string hashSignature = DsaHelper.SignHash(documentHash, privateKey);
bool isHashValid = DsaHelper.VerifyHash(documentHash, hashSignature, publicKey);
```

### 6. XOR Encryption (XorHelper)

XOR is a simple but effective encryption method suitable for fast encryption scenarios:

```csharp
using GameFrameX.Foundation.Encryption;

// Prepare data and key
byte[] data = Encoding.UTF8.GetBytes("需要加密的数据");
byte[] key = Encoding.UTF8.GetBytes("MySecretKey");

// Full encryption and decryption
byte[] encrypted = XorHelper.GetXorBytes(data, key);
byte[] decrypted = XorHelper.GetXorBytes(encrypted, key); // XOR reversibility

// Quick encryption (encrypts only the first 220 bytes, suitable for large file header encryption)
byte[] quickEncrypted = XorHelper.GetQuickXorBytes(data, key);
byte[] quickDecrypted = XorHelper.GetQuickXorBytes(quickEncrypted, key);

// In-place encryption (saves memory)
byte[] dataToEncrypt = (byte[])data.Clone();
XorHelper.GetSelfXorBytes(dataToEncrypt, key); // Modifies the original array directly
XorHelper.GetSelfXorBytes(dataToEncrypt, key); // XOR again to restore original data

// Partial encryption (specified range)
byte[] partialEncrypted = XorHelper.GetXorBytes(data, 5, 10, key); // Starting from index 5, encrypt 10 bytes

// Quick in-place encryption
byte[] quickData = (byte[])data.Clone();
XorHelper.GetQuickSelfXorBytes(quickData, key);
```

## Advanced Usage

### Hybrid Encryption (RSA + AES)

Combining the advantages of asymmetric and symmetric encryption:

```csharp
// Generate RSA key pair and AES key
var (rsaPublic, rsaPrivate) = RsaHelper.GenerateKeyPair(2048);
byte[] aesKey = AesHelper.GenerateKey();
byte[] aesIV = AesHelper.GenerateIV();

// Encrypt large data with AES
string largeData = "这是一个很长的数据...";
string encryptedData = AesHelper.Encrypt(largeData, aesKey, aesIV);

// Encrypt AES key with RSA
string encryptedAesKey = RsaHelper.Encrypt(Convert.ToBase64String(aesKey), rsaPublic);
string encryptedAesIV = RsaHelper.Encrypt(Convert.ToBase64String(aesIV), rsaPublic);

// Decryption process
byte[] decryptedAesKey = Convert.FromBase64String(RsaHelper.Decrypt(encryptedAesKey, rsaPrivate));
byte[] decryptedAesIV = Convert.FromBase64String(RsaHelper.Decrypt(encryptedAesIV, rsaPrivate));
string decryptedData = AesHelper.Decrypt(encryptedData, decryptedAesKey, decryptedAesIV);
```

### File Encryption

```csharp
// File encryption example
public static void EncryptFile(string inputFile, string outputFile, byte[] key, byte[] iv)
{
    using var inputStream = File.OpenRead(inputFile);
    using var outputStream = File.Create(outputFile);
    
    // Encrypt file stream using AES
    using var cryptoStream = AesHelper.CreateEncryptStream(outputStream, key, iv);
    inputStream.CopyTo(cryptoStream);
}

// Quick encryption for large files (encrypt only the file header)
public static void QuickEncryptFile(string filePath, byte[] key)
{
    byte[] fileHeader = File.ReadAllBytes(filePath).Take(220).ToArray();
    byte[] encryptedHeader = XorHelper.GetQuickXorBytes(fileHeader, key);
    
    // Write the encrypted header back to the file
    using var stream = File.OpenWrite(filePath);
    stream.Write(encryptedHeader, 0, encryptedHeader.Length);
}
```

### Digital Certificates and Signature Chains

```csharp
// Create a signature chain
public class DocumentSignatureChain
{
    private readonly List<(string signer, string signature)> _signatures = new();
    
    public void AddSignature(string document, string signer, string privateKey)
    {
        // Sign the document together with all previous signatures
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

### Chinese National Cryptographic Algorithm Compliance

For applications that need to comply with Chinese cryptography regulations:

```csharp
// National cryptographic compliance example
public class GMCompliantEncryption
{
    // Use SM4 for symmetric encryption
    public static string EncryptWithSM4(string data, byte[] key)
    {
        byte[] iv = Sm4Helper.GenerateIV();
        return Sm4Helper.EncryptCBC(data, key, iv);
    }
    
    // Use SM2 for asymmetric encryption and signing
    public static (string encrypted, string signature) SecureWithSM2(
        string data, string publicKey, string privateKey)
    {
        string encrypted = Sm2Helper.Encrypt(data, publicKey);
        string signature = Sm2Helper.Sign(data, privateKey);
        return (encrypted, signature);
    }
    
    // Hybrid use of SM2 and SM4
    public static string HybridGMEncrypt(string data, string sm2PublicKey)
    {
        // Generate SM4 key
        byte[] sm4Key = Sm4Helper.GenerateKey();
        byte[] sm4IV = Sm4Helper.GenerateIV();
        
        // Encrypt data with SM4
        string encryptedData = Sm4Helper.EncryptCBC(data, sm4Key, sm4IV);
        
        // Encrypt SM4 key with SM2
        string encryptedKey = Sm2Helper.Encrypt(Convert.ToBase64String(sm4Key), sm2PublicKey);
        string encryptedIV = Sm2Helper.Encrypt(Convert.ToBase64String(sm4IV), sm2PublicKey);
        
        // Combine results
        return $"{encryptedKey}|{encryptedIV}|{encryptedData}";
    }
}
```

### Testing and Verification

```csharp
// Encryption algorithm test example
[TestClass]
public class EncryptionTests
{
    [TestMethod]
    public void AES_EncryptDecrypt_ShouldReturnOriginalData()
    {
        // Arrange
        string original = "测试数据";
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
        string data = "需要签名的数据";
        
        // Act
        string signature = RsaHelper.Sign(data, privateKey);
        bool isValid = RsaHelper.Verify(data, signature, publicKey);
        bool isInvalid = RsaHelper.Verify(data + "篡改", signature, publicKey);
        
        // Assert
        Assert.IsTrue(isValid);
        Assert.IsFalse(isInvalid);
    }
}
```

## Best Practices

### Key Management

```csharp
// Good practice: reuse key objects
public class EncryptionService
{
    private static readonly byte[] _aesKey = AesHelper.GenerateKey();
    private static readonly byte[] _aesIV = AesHelper.GenerateIV();
    
    public string EncryptData(string data)
    {
        return AesHelper.Encrypt(data, _aesKey, _aesIV);
    }
}

// Avoid: generating new keys every time
// string encrypted = AesHelper.Encrypt(data, AesHelper.GenerateKey(), AesHelper.GenerateIV());
```

### Handling Large Data

```csharp
// Good practice: use stream processing
public static void EncryptLargeFile(string inputFile, string outputFile, byte[] key, byte[] iv)
{
    const int bufferSize = 64 * 1024; // 64KB buffer
    using var input = File.OpenRead(inputFile);
    using var output = File.Create(outputFile);
    using var cryptoStream = AesHelper.CreateEncryptStream(output, key, iv);
    
    input.CopyTo(cryptoStream, bufferSize);
}

// Avoid: loading the entire file into memory at once
// byte[] allData = File.ReadAllBytes(largeFile);
```

### Choosing the Right Algorithm

```csharp
// Performance comparison (for reference only)
// XOR: Fastest, suitable for simple obfuscation
// AES: Fast, suitable for large volumes of data
// SM4: Medium, required for Chinese national cryptography scenarios
// RSA: Slower, suitable for key exchange and signatures
// SM2: Slower, required for Chinese national asymmetric encryption

// Choose based on scenario
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

### Key Security

```csharp
// Good practice: use secure key storage
public class SecureKeyManager
{
    public static byte[] GetKey(string keyName)
    {
        // Retrieve key from secure storage (e.g., Azure Key Vault, Windows DPAPI, etc.)
        return SecureStorage.GetKey(keyName);
    }
    
    public static void StoreKey(string keyName, byte[] key)
    {
        // Securely store the key
        SecureStorage.StoreKey(keyName, key);
        
        // Clear the key from memory
        Array.Clear(key, 0, key.Length);
    }
}

// Avoid: hardcoding keys
// const string HardcodedKey = "MySecretKey123"; // Not secure!
```

### Random Number Generation

```csharp
// Good practice: use a cryptographically secure random number generator
public static byte[] GenerateSecureRandom(int length)
{
    using var rng = RandomNumberGenerator.Create();
    byte[] randomBytes = new byte[length];
    rng.GetBytes(randomBytes);
    return randomBytes;
}

// Avoid: using the standard Random class to generate keys
// var random = new Random();
// byte[] key = new byte[32];
// random.NextBytes(key); // Not secure!
```

### Error Handling

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
            // Log the error without exposing sensitive information
            Logger.LogError("Encryption failed", ex);
            throw new ApplicationException("Encryption operation failed");
        }
        finally
        {
            // Clean up sensitive data
            if (key != null) Array.Clear(key, 0, key.Length);
            if (iv != null) Array.Clear(iv, 0, iv.Length);
        }
    }
}
```

## API Reference

| Class | Method | Parameters | Return Value | Description |
|---|------|------|--------|------|
| **AesHelper** | GenerateKey | none | `byte[]` | Generate random AES key |
| | GenerateIV | none | `byte[]` | Generate random IV |
| | Encrypt | `string, byte[], byte[]` | `string` | Encrypt string |
| | Decrypt | `string, byte[], byte[]` | `string` | Decrypt string |
| | Encrypt | `byte[], byte[], byte[]` | `byte[]` | Encrypt byte array |
| | Decrypt | `byte[], byte[], byte[]` | `byte[]` | Decrypt byte array |
| | EncryptWithPassword | `string, string, string` | `string` | Encrypt with password |
| | DecryptWithPassword | `string, string, string` | `string` | Decrypt with password |
| | DeriveKeyFromPassword | `string, string` | `byte[]` | PBKDF2 key derivation |
| **RsaHelper** | GenerateKeyPair | `int` | `(string, string)` | Generate RSA key pair |
| | Encrypt | `string, string` | `string` | Encrypt with public key |
| | Decrypt | `string, string` | `string` | Decrypt with private key |
| | Sign | `string, string` | `string` | Sign with private key |
| | Verify | `string, string, string` | `bool` | Verify with public key |
| | EncryptLargeData | `byte[], string` | `byte[]` | Block encryption for large data |
| **Sm2Helper** | GenerateKeyPair | none | `(string, string)` | Generate SM2 key pair |
| | Encrypt | `string, string` | `string` | Encrypt with public key |
| | Decrypt | `string, string` | `string` | Decrypt with private key |
| | Sign | `string, string` | `string` | Sign with private key |
| | Verify | `string, string, string` | `bool` | Verify with public key |
| | GenerateSharedKey | `string, string` | `byte[]` | ECDH key exchange |
| **Sm4Helper** | GenerateKey | none | `byte[]` | Generate SM4 key |
| | GenerateIV | none | `byte[]` | Generate IV |
| | EncryptCBC | `string, byte[], byte[]` | `string` | CBC mode encryption |
| | DecryptCBC | `string, byte[], byte[]` | `string` | CBC mode decryption |
| | EncryptECB | `string, byte[]` | `string` | ECB mode encryption |
| | DecryptECB | `string, byte[]` | `string` | ECB mode decryption |
| | EncryptStream | `Stream, Stream, byte[], byte[]` | `void` | Stream encryption |
| **DsaHelper** | GenerateKeyPair | `int` | `(string, string)` | Generate DSA key pair |
| | Sign | `string, string` | `string` | Digital signature |
| | Verify | `string, string, string` | `bool` | Signature verification |
| | SignHash | `string, string` | `string` | Hash signing |
| | VerifyHash | `string, string, string` | `bool` | Hash verification |
| **XorHelper** | GetXorBytes | `byte[], byte[]` | `byte[]` | XOR encrypt/decrypt |
| | GetQuickXorBytes | `byte[], byte[]` | `byte[]` | Quick XOR (first 220 bytes) |
| | GetSelfXorBytes | `byte[], byte[]` | `void` | In-place XOR |
| | GetQuickSelfXorBytes | `byte[], byte[]` | `void` | Quick in-place XOR |
| | GetXorBytes | `byte[], int, int, byte[]` | `byte[]` | Partial range XOR |
