# 加密解密（多算法统一加密库）

GameFrameX.Foundation.Encryption 是一个功能全面的 .NET 加密库，提供了多种主流加密算法的实现，包括对称加密、非对称加密、国密算法和数字签名等。该库专为游戏开发和企业应用设计，提供高性能、易用的加密解密功能。

## 特性

- **多种加密算法** - 支持AES、RSA、SM2、SM4、DSA、XOR等主流加密算法
- **国密算法支持** - 完整支持SM2、SM4国产密码算法
- **高性能** - 优化的算法实现，支持快速加密模式
- **安全可靠** - 遵循密码学最佳实践，提供安全的默认配置
- **轻量级** - 基于.NET标准库，无额外依赖
- **易于使用** - 简洁的API设计，支持多种数据格式

## 安装

```bash
dotnet add package GameFrameX.Foundation.Encryption
```

## 快速开始

```csharp
using GameFrameX.Foundation.Encryption;

// 生成随机密钥和IV
byte[] key = AesHelper.GenerateKey();
byte[] iv = AesHelper.GenerateIV();

// 字符串加密解密
string plainText = "Hello, World!";
string encrypted = AesHelper.Encrypt(plainText, key, iv);
string decrypted = AesHelper.Decrypt(encrypted, key, iv);

Console.WriteLine($"原文: {plainText}");
Console.WriteLine($"密文: {encrypted}");
Console.WriteLine($"解密: {decrypted}");
```

## 详细用法

### 1. AES对称加密 (AesHelper)

AES（Advanced Encryption Standard）是目前最广泛使用的对称加密算法：

```csharp
using GameFrameX.Foundation.Encryption;

// 生成随机密钥和IV
byte[] key = AesHelper.GenerateKey();
byte[] iv = AesHelper.GenerateIV();

// 字符串加密解密
string plainText = "Hello, World!";
string encrypted = AesHelper.Encrypt(plainText, key, iv);
string decrypted = AesHelper.Decrypt(encrypted, key, iv);

// 字节数组加密解密
byte[] data = Encoding.UTF8.GetBytes("敏感数据");
byte[] encryptedBytes = AesHelper.Encrypt(data, key, iv);
byte[] decryptedBytes = AesHelper.Decrypt(encryptedBytes, key, iv);

// 使用密码派生密钥（PBKDF2）
string password = "MySecretPassword";
string salt = "MySalt";
byte[] derivedKey = AesHelper.DeriveKeyFromPassword(password, salt);
string encryptedWithPassword = AesHelper.EncryptWithPassword(plainText, password, salt);
string decryptedWithPassword = AesHelper.DecryptWithPassword(encryptedWithPassword, password, salt);
```

### 2. RSA非对称加密 (RsaHelper)

RSA是最常用的非对称加密算法，支持加密解密和数字签名：

```csharp
using GameFrameX.Foundation.Encryption;

// 生成RSA密钥对
var (publicKey, privateKey) = RsaHelper.GenerateKeyPair(2048);

// 公钥加密，私钥解密
string message = "机密信息";
string encrypted = RsaHelper.Encrypt(message, publicKey);
string decrypted = RsaHelper.Decrypt(encrypted, privateKey);

// 私钥签名，公钥验证
string dataToSign = "需要签名的数据";
string signature = RsaHelper.Sign(dataToSign, privateKey);
bool isValid = RsaHelper.Verify(dataToSign, signature, publicKey);

// 字节数组操作
byte[] dataBytes = Encoding.UTF8.GetBytes("二进制数据");
byte[] encryptedBytes = RsaHelper.Encrypt(dataBytes, publicKey);
byte[] decryptedBytes = RsaHelper.Decrypt(encryptedBytes, privateKey);

// 大数据分块加密（RSA有长度限制）
byte[] largeData = new byte[1000];
byte[] encryptedLargeData = RsaHelper.EncryptLargeData(largeData, publicKey);
byte[] decryptedLargeData = RsaHelper.DecryptLargeData(encryptedLargeData, privateKey);
```

### 3. SM2国密椭圆曲线加密 (Sm2Helper)

SM2是中国国家密码管理局发布的椭圆曲线公钥密码算法：

```csharp
using GameFrameX.Foundation.Encryption;

// 生成SM2密钥对
var (publicKey, privateKey) = Sm2Helper.GenerateKeyPair();

// 公钥加密，私钥解密
string plainText = "国密加密测试";
string encrypted = Sm2Helper.Encrypt(plainText, publicKey);
string decrypted = Sm2Helper.Decrypt(encrypted, privateKey);

// 数字签名和验证
string dataToSign = "需要签名的重要文档";
string signature = Sm2Helper.Sign(dataToSign, privateKey);
bool isValid = Sm2Helper.Verify(dataToSign, signature, publicKey);

// 字节数组操作
byte[] data = Encoding.UTF8.GetBytes("国密算法测试数据");
byte[] encryptedData = Sm2Helper.Encrypt(data, publicKey);
byte[] decryptedData = Sm2Helper.Decrypt(encryptedData, privateKey);

// 密钥交换（ECDH）
var (alicePublic, alicePrivate) = Sm2Helper.GenerateKeyPair();
var (bobPublic, bobPrivate) = Sm2Helper.GenerateKeyPair();
byte[] aliceSharedKey = Sm2Helper.GenerateSharedKey(alicePrivate, bobPublic);
byte[] bobSharedKey = Sm2Helper.GenerateSharedKey(bobPrivate, alicePublic);
// aliceSharedKey 和 bobSharedKey 相同，可用作对称加密密钥
```

### 4. SM4国密分组加密 (Sm4Helper)

SM4是中国国家标准的分组密码算法：

```csharp
using GameFrameX.Foundation.Encryption;

// 生成SM4密钥
byte[] key = Sm4Helper.GenerateKey();

// ECB模式加密解密（不推荐用于生产环境）
string plainText = "SM4加密测试";
string encryptedECB = Sm4Helper.EncryptECB(plainText, key);
string decryptedECB = Sm4Helper.DecryptECB(encryptedECB, key);

// CBC模式加密解密（推荐）
byte[] iv = Sm4Helper.GenerateIV();
string encryptedCBC = Sm4Helper.EncryptCBC(plainText, key, iv);
string decryptedCBC = Sm4Helper.DecryptCBC(encryptedCBC, key, iv);

// 字节数组操作
byte[] data = Encoding.UTF8.GetBytes("国密SM4算法");
byte[] encryptedBytes = Sm4Helper.EncryptCBC(data, key, iv);
byte[] decryptedBytes = Sm4Helper.DecryptCBC(encryptedBytes, key, iv);

// 流式加密（适用于大文件）
using var inputStream = new MemoryStream(data);
using var outputStream = new MemoryStream();
Sm4Helper.EncryptStream(inputStream, outputStream, key, iv);
```

### 5. DSA数字签名算法 (DsaHelper)

DSA（Digital Signature Algorithm）专门用于数字签名：

```csharp
using GameFrameX.Foundation.Encryption;

// 生成DSA密钥对
var (publicKey, privateKey) = DsaHelper.GenerateKeyPair(2048);

// 数字签名
string document = "重要合同内容";
string signature = DsaHelper.Sign(document, privateKey);

// 签名验证
bool isValid = DsaHelper.Verify(document, signature, publicKey);
Console.WriteLine($"签名验证结果: {isValid}");

// 字节数组签名
byte[] documentBytes = Encoding.UTF8.GetBytes("二进制文档");
byte[] signatureBytes = DsaHelper.Sign(documentBytes, privateKey);
bool isBytesValid = DsaHelper.Verify(documentBytes, signatureBytes, publicKey);

// 哈希签名（提高性能）
string documentHash = "SHA256哈希值";
string hashSignature = DsaHelper.SignHash(documentHash, privateKey);
bool isHashValid = DsaHelper.VerifyHash(documentHash, hashSignature, publicKey);
```

### 6. XOR异或加密 (XorHelper)

XOR是一种简单但有效的加密方式，适用于快速加密场景：

```csharp
using GameFrameX.Foundation.Encryption;

// 准备数据和密钥
byte[] data = Encoding.UTF8.GetBytes("需要加密的数据");
byte[] key = Encoding.UTF8.GetBytes("MySecretKey");

// 完整加密解密
byte[] encrypted = XorHelper.GetXorBytes(data, key);
byte[] decrypted = XorHelper.GetXorBytes(encrypted, key); // XOR的可逆性

// 快速加密（只加密前220字节，适用于大文件头部加密）
byte[] quickEncrypted = XorHelper.GetQuickXorBytes(data, key);
byte[] quickDecrypted = XorHelper.GetQuickXorBytes(quickEncrypted, key);

// 原地加密（节省内存）
byte[] dataToEncrypt = (byte[])data.Clone();
XorHelper.GetSelfXorBytes(dataToEncrypt, key); // 直接修改原数组
XorHelper.GetSelfXorBytes(dataToEncrypt, key); // 再次异或恢复原数据

// 部分加密（指定范围）
byte[] partialEncrypted = XorHelper.GetXorBytes(data, 5, 10, key); // 从索引5开始，加密10个字节

// 快速原地加密
byte[] quickData = (byte[])data.Clone();
XorHelper.GetQuickSelfXorBytes(quickData, key);
```

## 高级用法

### 混合加密（RSA + AES）

结合非对称和对称加密的优势：

```csharp
// 生成RSA密钥对和AES密钥
var (rsaPublic, rsaPrivate) = RsaHelper.GenerateKeyPair(2048);
byte[] aesKey = AesHelper.GenerateKey();
byte[] aesIV = AesHelper.GenerateIV();

// 大数据用AES加密
string largeData = "这是一个很长的数据...";
string encryptedData = AesHelper.Encrypt(largeData, aesKey, aesIV);

// AES密钥用RSA加密
string encryptedAesKey = RsaHelper.Encrypt(Convert.ToBase64String(aesKey), rsaPublic);
string encryptedAesIV = RsaHelper.Encrypt(Convert.ToBase64String(aesIV), rsaPublic);

// 解密过程
byte[] decryptedAesKey = Convert.FromBase64String(RsaHelper.Decrypt(encryptedAesKey, rsaPrivate));
byte[] decryptedAesIV = Convert.FromBase64String(RsaHelper.Decrypt(encryptedAesIV, rsaPrivate));
string decryptedData = AesHelper.Decrypt(encryptedData, decryptedAesKey, decryptedAesIV);
```

### 文件加密

```csharp
// 文件加密示例
public static void EncryptFile(string inputFile, string outputFile, byte[] key, byte[] iv)
{
    using var inputStream = File.OpenRead(inputFile);
    using var outputStream = File.Create(outputFile);
    
    // 使用AES加密文件流
    using var cryptoStream = AesHelper.CreateEncryptStream(outputStream, key, iv);
    inputStream.CopyTo(cryptoStream);
}

// 大文件快速加密（只加密文件头）
public static void QuickEncryptFile(string filePath, byte[] key)
{
    byte[] fileHeader = File.ReadAllBytes(filePath).Take(220).ToArray();
    byte[] encryptedHeader = XorHelper.GetQuickXorBytes(fileHeader, key);
    
    // 将加密后的头部写回文件
    using var stream = File.OpenWrite(filePath);
    stream.Write(encryptedHeader, 0, encryptedHeader.Length);
}
```

### 数字证书和签名链

```csharp
// 创建签名链
public class DocumentSignatureChain
{
    private readonly List<(string signer, string signature)> _signatures = new();
    
    public void AddSignature(string document, string signer, string privateKey)
    {
        // 对文档和之前的签名一起签名
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

### 国密算法合规

对于需要符合中国密码法规的应用：

```csharp
// 国密合规示例
public class GMCompliantEncryption
{
    // 使用SM4进行对称加密
    public static string EncryptWithSM4(string data, byte[] key)
    {
        byte[] iv = Sm4Helper.GenerateIV();
        return Sm4Helper.EncryptCBC(data, key, iv);
    }
    
    // 使用SM2进行非对称加密和签名
    public static (string encrypted, string signature) SecureWithSM2(
        string data, string publicKey, string privateKey)
    {
        string encrypted = Sm2Helper.Encrypt(data, publicKey);
        string signature = Sm2Helper.Sign(data, privateKey);
        return (encrypted, signature);
    }
    
    // 混合使用SM2和SM4
    public static string HybridGMEncrypt(string data, string sm2PublicKey)
    {
        // 生成SM4密钥
        byte[] sm4Key = Sm4Helper.GenerateKey();
        byte[] sm4IV = Sm4Helper.GenerateIV();
        
        // 用SM4加密数据
        string encryptedData = Sm4Helper.EncryptCBC(data, sm4Key, sm4IV);
        
        // 用SM2加密SM4密钥
        string encryptedKey = Sm2Helper.Encrypt(Convert.ToBase64String(sm4Key), sm2PublicKey);
        string encryptedIV = Sm2Helper.Encrypt(Convert.ToBase64String(sm4IV), sm2PublicKey);
        
        // 组合结果
        return $"{encryptedKey}|{encryptedIV}|{encryptedData}";
    }
}
```

### 测试和验证

```csharp
// 加密算法测试示例
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

## 最佳实践

### 密钥管理

```csharp
// 好的做法：重用密钥对象
public class EncryptionService
{
    private static readonly byte[] _aesKey = AesHelper.GenerateKey();
    private static readonly byte[] _aesIV = AesHelper.GenerateIV();
    
    public string EncryptData(string data)
    {
        return AesHelper.Encrypt(data, _aesKey, _aesIV);
    }
}

// 避免：每次都生成新密钥
// string encrypted = AesHelper.Encrypt(data, AesHelper.GenerateKey(), AesHelper.GenerateIV());
```

### 大数据处理

```csharp
// 好的做法：使用流式处理
public static void EncryptLargeFile(string inputFile, string outputFile, byte[] key, byte[] iv)
{
    const int bufferSize = 64 * 1024; // 64KB缓冲区
    using var input = File.OpenRead(inputFile);
    using var output = File.Create(outputFile);
    using var cryptoStream = AesHelper.CreateEncryptStream(output, key, iv);
    
    input.CopyTo(cryptoStream, bufferSize);
}

// 避免：一次性加载整个文件到内存
// byte[] allData = File.ReadAllBytes(largeFile);
```

### 选择合适的算法

```csharp
// 性能对比（仅供参考）
// XOR: 最快，适用于简单混淆
// AES: 快速，适用于大量数据
// SM4: 中等，国密要求场景
// RSA: 较慢，适用于密钥交换和签名
// SM2: 较慢，国密要求的非对称加密

// 根据场景选择
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

### 密钥安全

```csharp
// 好的做法：使用安全的密钥存储
public class SecureKeyManager
{
    public static byte[] GetKey(string keyName)
    {
        // 从安全存储（如Azure Key Vault、Windows DPAPI等）获取密钥
        return SecureStorage.GetKey(keyName);
    }
    
    public static void StoreKey(string keyName, byte[] key)
    {
        // 安全存储密钥
        SecureStorage.StoreKey(keyName, key);
        
        // 清除内存中的密钥
        Array.Clear(key, 0, key.Length);
    }
}

// 避免：硬编码密钥
// const string HardcodedKey = "MySecretKey123"; // 不安全！
```

### 随机数生成

```csharp
// 好的做法：使用密码学安全的随机数生成器
public static byte[] GenerateSecureRandom(int length)
{
    using var rng = RandomNumberGenerator.Create();
    byte[] randomBytes = new byte[length];
    rng.GetBytes(randomBytes);
    return randomBytes;
}

// 避免：使用普通Random类生成密钥
// var random = new Random();
// byte[] key = new byte[32];
// random.NextBytes(key); // 不安全！
```

### 错误处理

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
            // 记录错误但不暴露敏感信息
            Logger.LogError("Encryption failed", ex);
            throw new ApplicationException("加密操作失败");
        }
        finally
        {
            // 清理敏感数据
            if (key != null) Array.Clear(key, 0, key.Length);
            if (iv != null) Array.Clear(iv, 0, iv.Length);
        }
    }
}
```

## API 参考

| 类 | 方法 | 参数 | 返回值 | 说明 |
|---|------|------|--------|------|
| **AesHelper** | GenerateKey | 无 | `byte[]` | 生成随机AES密钥 |
| | GenerateIV | 无 | `byte[]` | 生成随机IV |
| | Encrypt | `string, byte[], byte[]` | `string` | 字符串加密 |
| | Decrypt | `string, byte[], byte[]` | `string` | 字符串解密 |
| | Encrypt | `byte[], byte[], byte[]` | `byte[]` | 字节数组加密 |
| | Decrypt | `byte[], byte[], byte[]` | `byte[]` | 字节数组解密 |
| | EncryptWithPassword | `string, string, string` | `string` | 使用密码加密 |
| | DecryptWithPassword | `string, string, string` | `string` | 使用密码解密 |
| | DeriveKeyFromPassword | `string, string` | `byte[]` | PBKDF2密钥派生 |
| **RsaHelper** | GenerateKeyPair | `int` | `(string, string)` | 生成RSA密钥对 |
| | Encrypt | `string, string` | `string` | 公钥加密 |
| | Decrypt | `string, string` | `string` | 私钥解密 |
| | Sign | `string, string` | `string` | 私钥签名 |
| | Verify | `string, string, string` | `bool` | 公钥验签 |
| | EncryptLargeData | `byte[], string` | `byte[]` | 大数据分块加密 |
| **Sm2Helper** | GenerateKeyPair | 无 | `(string, string)` | 生成SM2密钥对 |
| | Encrypt | `string, string` | `string` | 公钥加密 |
| | Decrypt | `string, string` | `string` | 私钥解密 |
| | Sign | `string, string` | `string` | 私钥签名 |
| | Verify | `string, string, string` | `bool` | 公钥验签 |
| | GenerateSharedKey | `string, string` | `byte[]` | ECDH密钥交换 |
| **Sm4Helper** | GenerateKey | 无 | `byte[]` | 生成SM4密钥 |
| | GenerateIV | 无 | `byte[]` | 生成IV |
| | EncryptCBC | `string, byte[], byte[]` | `string` | CBC模式加密 |
| | DecryptCBC | `string, byte[], byte[]` | `string` | CBC模式解密 |
| | EncryptECB | `string, byte[]` | `string` | ECB模式加密 |
| | DecryptECB | `string, byte[]` | `string` | ECB模式解密 |
| | EncryptStream | `Stream, Stream, byte[], byte[]` | `void` | 流式加密 |
| **DsaHelper** | GenerateKeyPair | `int` | `(string, string)` | 生成DSA密钥对 |
| | Sign | `string, string` | `string` | 数字签名 |
| | Verify | `string, string, string` | `bool` | 签名验证 |
| | SignHash | `string, string` | `string` | 哈希签名 |
| | VerifyHash | `string, string, string` | `bool` | 哈希验签 |
| **XorHelper** | GetXorBytes | `byte[], byte[]` | `byte[]` | XOR加密/解密 |
| | GetQuickXorBytes | `byte[], byte[]` | `byte[]` | 快速XOR（前220字节） |
| | GetSelfXorBytes | `byte[], byte[]` | `void` | 原地XOR |
| | GetQuickSelfXorBytes | `byte[], byte[]` | `void` | 快速原地XOR |
| | GetXorBytes | `byte[], int, int, byte[]` | `byte[]` | 部分范围XOR |
