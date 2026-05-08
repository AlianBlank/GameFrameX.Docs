# 加密解密（多演算法統一加密庫）

GameFrameX.Foundation.Encryption 是一個功能全面的 .NET 加密庫，提供了多種主流加密演算法的實作，包括對稱加密、非對稱加密、國密演算法和數位簽章等。該庫專為遊戲開發和企業應用設計，提供高效能、易用的加密解密功能。

## 特性

- **多種加密演算法** - 支援 AES、RSA、SM2、SM4、DSA、XOR 等主流加密演算法
- **國密演算法支援** - 完整支援 SM2、SM4 國產密碼演算法
- **高效能** - 最佳化的演算法實作，支援快速加密模式
- **安全可靠** - 遵循密碼學最佳實踐，提供安全的預設設定
- **輕量級** - 基於 .NET 標準庫，無額外依賴
- **易於使用** - 簡潔的 API 設計，支援多種資料格式

## 安裝

```bash
dotnet add package GameFrameX.Foundation.Encryption
```

## 快速開始

```csharp
using GameFrameX.Foundation.Encryption;

// 產生隨機金鑰和 IV
byte[] key = AesHelper.GenerateKey();
byte[] iv = AesHelper.GenerateIV();

// 字串加密解密
string plainText = "Hello, World!";
string encrypted = AesHelper.Encrypt(plainText, key, iv);
string decrypted = AesHelper.Decrypt(encrypted, key, iv);

Console.WriteLine($"原文: {plainText}");
Console.WriteLine($"密文: {encrypted}");
Console.WriteLine($"解密: {decrypted}");
```

## 詳細用法

### 1. AES 對稱加密 (AesHelper)

AES（Advanced Encryption Standard）是目前最廣泛使用的對稱加密演算法：

```csharp
using GameFrameX.Foundation.Encryption;

// 產生隨機金鑰和 IV
byte[] key = AesHelper.GenerateKey();
byte[] iv = AesHelper.GenerateIV();

// 字串加密解密
string plainText = "Hello, World!";
string encrypted = AesHelper.Encrypt(plainText, key, iv);
string decrypted = AesHelper.Decrypt(encrypted, key, iv);

// 位元組陣列加密解密
byte[] data = Encoding.UTF8.GetBytes("敏感資料");
byte[] encryptedBytes = AesHelper.Encrypt(data, key, iv);
byte[] decryptedBytes = AesHelper.Decrypt(encryptedBytes, key, iv);

// 使用密碼衍生金鑰（PBKDF2）
string password = "MySecretPassword";
string salt = "MySalt";
byte[] derivedKey = AesHelper.DeriveKeyFromPassword(password, salt);
string encryptedWithPassword = AesHelper.EncryptWithPassword(plainText, password, salt);
string decryptedWithPassword = AesHelper.DecryptWithPassword(encryptedWithPassword, password, salt);
```

### 2. RSA 非對稱加密 (RsaHelper)

RSA 是最常用的非對稱加密演算法，支援加密解密和數位簽章：

```csharp
using GameFrameX.Foundation.Encryption;

// 產生 RSA 金鑰對
var (publicKey, privateKey) = RsaHelper.GenerateKeyPair(2048);

// 公鑰加密，私鑰解密
string message = "機密資訊";
string encrypted = RsaHelper.Encrypt(message, publicKey);
string decrypted = RsaHelper.Decrypt(encrypted, privateKey);

// 私鑰簽章，公鑰驗證
string dataToSign = "需要簽章的資料";
string signature = RsaHelper.Sign(dataToSign, privateKey);
bool isValid = RsaHelper.Verify(dataToSign, signature, publicKey);

// 位元組陣列操作
byte[] dataBytes = Encoding.UTF8.GetBytes("二進位資料");
byte[] encryptedBytes = RsaHelper.Encrypt(dataBytes, publicKey);
byte[] decryptedBytes = RsaHelper.Decrypt(encryptedBytes, privateKey);

// 大資料分塊加密（RSA 有長度限制）
byte[] largeData = new byte[1000];
byte[] encryptedLargeData = RsaHelper.EncryptLargeData(largeData, publicKey);
byte[] decryptedLargeData = RsaHelper.DecryptLargeData(encryptedLargeData, privateKey);
```

### 3. SM2 國密橢圓曲線加密 (Sm2Helper)

SM2 是中國國家密碼管理局發布的橢圓曲線公鑰密碼演算法：

```csharp
using GameFrameX.Foundation.Encryption;

// 產生 SM2 金鑰對
var (publicKey, privateKey) = Sm2Helper.GenerateKeyPair();

// 公鑰加密，私鑰解密
string plainText = "國密加密測試";
string encrypted = Sm2Helper.Encrypt(plainText, publicKey);
string decrypted = Sm2Helper.Decrypt(encrypted, privateKey);

// 數位簽章和驗證
string dataToSign = "需要簽章的重要文件";
string signature = Sm2Helper.Sign(dataToSign, privateKey);
bool isValid = Sm2Helper.Verify(dataToSign, signature, publicKey);

// 位元組陣列操作
byte[] data = Encoding.UTF8.GetBytes("國密演算法測試資料");
byte[] encryptedData = Sm2Helper.Encrypt(data, publicKey);
byte[] decryptedData = Sm2Helper.Decrypt(encryptedData, privateKey);

// 金鑰交換（ECDH）
var (alicePublic, alicePrivate) = Sm2Helper.GenerateKeyPair();
var (bobPublic, bobPrivate) = Sm2Helper.GenerateKeyPair();
byte[] aliceSharedKey = Sm2Helper.GenerateSharedKey(alicePrivate, bobPublic);
byte[] bobSharedKey = Sm2Helper.GenerateSharedKey(bobPrivate, alicePublic);
// aliceSharedKey 和 bobSharedKey 相同，可用作對稱加密金鑰
```

### 4. SM4 國密分組加密 (Sm4Helper)

SM4 是中國國家標準的分組密碼演算法：

```csharp
using GameFrameX.Foundation.Encryption;

// 產生 SM4 金鑰
byte[] key = Sm4Helper.GenerateKey();

// ECB 模式加密解密（不建議用於正式環境）
string plainText = "SM4加密測試";
string encryptedECB = Sm4Helper.EncryptECB(plainText, key);
string decryptedECB = Sm4Helper.DecryptECB(encryptedECB, key);

// CBC 模式加密解密（建議）
byte[] iv = Sm4Helper.GenerateIV();
string encryptedCBC = Sm4Helper.EncryptCBC(plainText, key, iv);
string decryptedCBC = Sm4Helper.DecryptCBC(encryptedCBC, key, iv);

// 位元組陣列操作
byte[] data = Encoding.UTF8.GetBytes("國密SM4演算法");
byte[] encryptedBytes = Sm4Helper.EncryptCBC(data, key, iv);
byte[] decryptedBytes = Sm4Helper.DecryptCBC(encryptedBytes, key, iv);

// 串流加密（適用於大檔案）
using var inputStream = new MemoryStream(data);
using var outputStream = new MemoryStream();
Sm4Helper.EncryptStream(inputStream, outputStream, key, iv);
```

### 5. DSA 數位簽章演算法 (DsaHelper)

DSA（Digital Signature Algorithm）專門用於數位簽章：

```csharp
using GameFrameX.Foundation.Encryption;

// 產生 DSA 金鑰對
var (publicKey, privateKey) = DsaHelper.GenerateKeyPair(2048);

// 數位簽章
string document = "重要合約內容";
string signature = DsaHelper.Sign(document, privateKey);

// 簽章驗證
bool isValid = DsaHelper.Verify(document, signature, publicKey);
Console.WriteLine($"簽章驗證結果: {isValid}");

// 位元組陣列簽章
byte[] documentBytes = Encoding.UTF8.GetBytes("二進位文件");
byte[] signatureBytes = DsaHelper.Sign(documentBytes, privateKey);
bool isBytesValid = DsaHelper.Verify(documentBytes, signatureBytes, publicKey);

// 雜湊簽章（提高效能）
string documentHash = "SHA256雜湊值";
string hashSignature = DsaHelper.SignHash(documentHash, privateKey);
bool isHashValid = DsaHelper.VerifyHash(documentHash, hashSignature, publicKey);
```

### 6. XOR 異或加密 (XorHelper)

XOR 是一種簡單但有效的加密方式，適用於快速加密場景：

```csharp
using GameFrameX.Foundation.Encryption;

// 準備資料和金鑰
byte[] data = Encoding.UTF8.GetBytes("需要加密的資料");
byte[] key = Encoding.UTF8.GetBytes("MySecretKey");

// 完整加密解密
byte[] encrypted = XorHelper.GetXorBytes(data, key);
byte[] decrypted = XorHelper.GetXorBytes(encrypted, key); // XOR 的可逆性

// 快速加密（只加密前 220 位元組，適用於大檔案頭部加密）
byte[] quickEncrypted = XorHelper.GetQuickXorBytes(data, key);
byte[] quickDecrypted = XorHelper.GetQuickXorBytes(quickEncrypted, key);

// 原地加密（節省記憶體）
byte[] dataToEncrypt = (byte[])data.Clone();
XorHelper.GetSelfXorBytes(dataToEncrypt, key); // 直接修改原陣列
XorHelper.GetSelfXorBytes(dataToEncrypt, key); // 再次異或恢復原資料

// 部分加密（指定範圍）
byte[] partialEncrypted = XorHelper.GetXorBytes(data, 5, 10, key); // 從索引 5 開始，加密 10 個位元組

// 快速原地加密
byte[] quickData = (byte[])data.Clone();
XorHelper.GetQuickSelfXorBytes(quickData, key);
```

## 進階用法

### 混合加密（RSA + AES）

結合非對稱和對稱加密的優勢：

```csharp
// 產生 RSA 金鑰對和 AES 金鑰
var (rsaPublic, rsaPrivate) = RsaHelper.GenerateKeyPair(2048);
byte[] aesKey = AesHelper.GenerateKey();
byte[] aesIV = AesHelper.GenerateIV();

// 大資料用 AES 加密
string largeData = "這是一個很長的資料...";
string encryptedData = AesHelper.Encrypt(largeData, aesKey, aesIV);

// AES 金鑰用 RSA 加密
string encryptedAesKey = RsaHelper.Encrypt(Convert.ToBase64String(aesKey), rsaPublic);
string encryptedAesIV = RsaHelper.Encrypt(Convert.ToBase64String(aesIV), rsaPublic);

// 解密過程
byte[] decryptedAesKey = Convert.FromBase64String(RsaHelper.Decrypt(encryptedAesKey, rsaPrivate));
byte[] decryptedAesIV = Convert.FromBase64String(RsaHelper.Decrypt(encryptedAesIV, rsaPrivate));
string decryptedData = AesHelper.Decrypt(encryptedData, decryptedAesKey, decryptedAesIV);
```

### 檔案加密

```csharp
// 檔案加密範例
public static void EncryptFile(string inputFile, string outputFile, byte[] key, byte[] iv)
{
    using var inputStream = File.OpenRead(inputFile);
    using var outputStream = File.Create(outputFile);
    
    // 使用 AES 加密檔案串流
    using var cryptoStream = AesHelper.CreateEncryptStream(outputStream, key, iv);
    inputStream.CopyTo(cryptoStream);
}

// 大檔案快速加密（只加密檔案頭）
public static void QuickEncryptFile(string filePath, byte[] key)
{
    byte[] fileHeader = File.ReadAllBytes(filePath).Take(220).ToArray();
    byte[] encryptedHeader = XorHelper.GetQuickXorBytes(fileHeader, key);
    
    // 將加密後的頭部寫回檔案
    using var stream = File.OpenWrite(filePath);
    stream.Write(encryptedHeader, 0, encryptedHeader.Length);
}
```

### 數位憑證和簽章鏈

```csharp
// 建立簽章鏈
public class DocumentSignatureChain
{
    private readonly List<(string signer, string signature)> _signatures = new();
    
    public void AddSignature(string document, string signer, string privateKey)
    {
        // 對文件和之前的簽章一起簽章
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

### 國密演算法合規

對於需要符合中國密碼法規的應用：

```csharp
// 國密合規範例
public class GMCompliantEncryption
{
    // 使用 SM4 進行對稱加密
    public static string EncryptWithSM4(string data, byte[] key)
    {
        byte[] iv = Sm4Helper.GenerateIV();
        return Sm4Helper.EncryptCBC(data, key, iv);
    }
    
    // 使用 SM2 進行非對稱加密和簽章
    public static (string encrypted, string signature) SecureWithSM2(
        string data, string publicKey, string privateKey)
    {
        string encrypted = Sm2Helper.Encrypt(data, publicKey);
        string signature = Sm2Helper.Sign(data, privateKey);
        return (encrypted, signature);
    }
    
    // 混合使用 SM2 和 SM4
    public static string HybridGMEncrypt(string data, string sm2PublicKey)
    {
        // 產生 SM4 金鑰
        byte[] sm4Key = Sm4Helper.GenerateKey();
        byte[] sm4IV = Sm4Helper.GenerateIV();
        
        // 用 SM4 加密資料
        string encryptedData = Sm4Helper.EncryptCBC(data, sm4Key, sm4IV);
        
        // 用 SM2 加密 SM4 金鑰
        string encryptedKey = Sm2Helper.Encrypt(Convert.ToBase64String(sm4Key), sm2PublicKey);
        string encryptedIV = Sm2Helper.Encrypt(Convert.ToBase64String(sm4IV), sm2PublicKey);
        
        // 組合結果
        return $"{encryptedKey}|{encryptedIV}|{encryptedData}";
    }
}
```

### 測試和驗證

```csharp
// 加密演算法測試範例
[TestClass]
public class EncryptionTests
{
    [TestMethod]
    public void AES_EncryptDecrypt_ShouldReturnOriginalData()
    {
        // Arrange
        string original = "測試資料";
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
        string data = "需要簽章的資料";
        
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

## 最佳實踐

### 金鑰管理

```csharp
// 好的做法：重複使用金鑰物件
public class EncryptionService
{
    private static readonly byte[] _aesKey = AesHelper.GenerateKey();
    private static readonly byte[] _aesIV = AesHelper.GenerateIV();
    
    public string EncryptData(string data)
    {
        return AesHelper.Encrypt(data, _aesKey, _aesIV);
    }
}

// 避免：每次都產生新金鑰
// string encrypted = AesHelper.Encrypt(data, AesHelper.GenerateKey(), AesHelper.GenerateIV());
```

### 大資料處理

```csharp
// 好的做法：使用串流處理
public static void EncryptLargeFile(string inputFile, string outputFile, byte[] key, byte[] iv)
{
    const int bufferSize = 64 * 1024; // 64KB 緩衝區
    using var input = File.OpenRead(inputFile);
    using var output = File.Create(outputFile);
    using var cryptoStream = AesHelper.CreateEncryptStream(output, key, iv);
    
    input.CopyTo(cryptoStream, bufferSize);
}

// 避免：一次性載入整個檔案到記憶體
// byte[] allData = File.ReadAllBytes(largeFile);
```

### 選擇合適的演算法

```csharp
// 效能對比（僅供參考）
// XOR: 最快，適用於簡單混淆
// AES: 快速，適用於大量資料
// SM4: 中等，國密要求場景
// RSA: 較慢，適用於金鑰交換和簽章
// SM2: 較慢，國密要求的非對稱加密

// 根據場景選擇
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

### 金鑰安全

```csharp
// 好的做法：使用安全的金鑰儲存
public class SecureKeyManager
{
    public static byte[] GetKey(string keyName)
    {
        // 從安全儲存（如 Azure Key Vault、Windows DPAPI 等）取得金鑰
        return SecureStorage.GetKey(keyName);
    }
    
    public static void StoreKey(string keyName, byte[] key)
    {
        // 安全儲存金鑰
        SecureStorage.StoreKey(keyName, key);
        
        // 清除記憶體中的金鑰
        Array.Clear(key, 0, key.Length);
    }
}

// 避免：硬編碼金鑰
// const string HardcodedKey = "MySecretKey123"; // 不安全！
```

### 隨機數產生

```csharp
// 好的做法：使用密碼學安全的隨機數產生器
public static byte[] GenerateSecureRandom(int length)
{
    using var rng = RandomNumberGenerator.Create();
    byte[] randomBytes = new byte[length];
    rng.GetBytes(randomBytes);
    return randomBytes;
}

// 避免：使用普通 Random 類別產生金鑰
// var random = new Random();
// byte[] key = new byte[32];
// random.NextBytes(key); // 不安全！
```

### 錯誤處理

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
            // 記錄錯誤但不暴露敏感資訊
            Logger.LogError("Encryption failed", ex);
            throw new ApplicationException("加密操作失敗");
        }
        finally
        {
            // 清理敏感資料
            if (key != null) Array.Clear(key, 0, key.Length);
            if (iv != null) Array.Clear(iv, 0, iv.Length);
        }
    }
}
```

## API 參考

| 類別 | 方法 | 參數 | 回傳值 | 說明 |
|---|------|------|--------|------|
| **AesHelper** | GenerateKey | 無 | `byte[]` | 產生隨機 AES 金鑰 |
| | GenerateIV | 無 | `byte[]` | 產生隨機 IV |
| | Encrypt | `string, byte[], byte[]` | `string` | 字串加密 |
| | Decrypt | `string, byte[], byte[]` | `string` | 字串解密 |
| | Encrypt | `byte[], byte[], byte[]` | `byte[]` | 位元組陣列加密 |
| | Decrypt | `byte[], byte[], byte[]` | `byte[]` | 位元組陣列解密 |
| | EncryptWithPassword | `string, string, string` | `string` | 使用密碼加密 |
| | DecryptWithPassword | `string, string, string` | `string` | 使用密碼解密 |
| | DeriveKeyFromPassword | `string, string` | `byte[]` | PBKDF2 金鑰衍生 |
| **RsaHelper** | GenerateKeyPair | `int` | `(string, string)` | 產生 RSA 金鑰對 |
| | Encrypt | `string, string` | `string` | 公鑰加密 |
| | Decrypt | `string, string` | `string` | 私鑰解密 |
| | Sign | `string, string` | `string` | 私鑰簽章 |
| | Verify | `string, string, string` | `bool` | 公鑰驗章 |
| | EncryptLargeData | `byte[], string` | `byte[]` | 大資料分塊加密 |
| **Sm2Helper** | GenerateKeyPair | 無 | `(string, string)` | 產生 SM2 金鑰對 |
| | Encrypt | `string, string` | `string` | 公鑰加密 |
| | Decrypt | `string, string` | `string` | 私鑰解密 |
| | Sign | `string, string` | `string` | 私鑰簽章 |
| | Verify | `string, string, string` | `bool` | 公鑰驗章 |
| | GenerateSharedKey | `string, string` | `byte[]` | ECDH 金鑰交換 |
| **Sm4Helper** | GenerateKey | 無 | `byte[]` | 產生 SM4 金鑰 |
| | GenerateIV | 無 | `byte[]` | 產生 IV |
| | EncryptCBC | `string, byte[], byte[]` | `string` | CBC 模式加密 |
| | DecryptCBC | `string, byte[], byte[]` | `string` | CBC 模式解密 |
| | EncryptECB | `string, byte[]` | `string` | ECB 模式加密 |
| | DecryptECB | `string, byte[]` | `string` | ECB 模式解密 |
| | EncryptStream | `Stream, Stream, byte[], byte[]` | `void` | 串流加密 |
| **DsaHelper** | GenerateKeyPair | `int` | `(string, string)` | 產生 DSA 金鑰對 |
| | Sign | `string, string` | `string` | 數位簽章 |
| | Verify | `string, string, string` | `bool` | 簽章驗證 |
| | SignHash | `string, string` | `string` | 雜湊簽章 |
| | VerifyHash | `string, string, string` | `bool` | 雜湊驗章 |
| **XorHelper** | GetXorBytes | `byte[], byte[]` | `byte[]` | XOR 加密/解密 |
| | GetQuickXorBytes | `byte[], byte[]` | `byte[]` | 快速 XOR（前 220 位元組） |
| | GetSelfXorBytes | `byte[], byte[]` | `void` | 原地 XOR |
| | GetQuickSelfXorBytes | `byte[], byte[]` | `void` | 快速原地 XOR |
| | GetXorBytes | `byte[], int, int, byte[]` | `byte[]` | 部分範圍 XOR |
