# 暗号化・復号（多アルゴリズム統一暗号化ライブラリ）

GameFrameX.Foundation.Encryption は、機能豊富な .NET 暗号化ライブラリです。対称暗号、非対称暗号、中国国密アルゴリズム、デジタル署名など、複数の主流暗号化アルゴリズムの実装を提供しています。ゲーム開発およびエンタープライズアプリケーション向けに設計され、高性能で使いやすい暗号化・復号機能を提供します。

## 特徴

- **複数の暗号化アルゴリズム** - AES、RSA、SM2、SM4、DSA、XOR などの主流暗号化アルゴリズムをサポート
- **中国国密アルゴリズム対応** - SM2、SM4 国産暗号アルゴリズムを完全サポート
- **高性能** - 最適化されたアルゴリズム実装、高速暗号化モードをサポート
- **安全・信頼性** - 暗号学のベストプラクティスに従い、安全なデフォルト設定を提供
- **軽量** - .NET 標準ライブラリベースで、追加の依存関係なし
- **使いやすさ** - シンプルな API 設計、複数のデータ形式をサポート

## インストール

```bash
dotnet add package GameFrameX.Foundation.Encryption
```

## クイックスタート

```csharp
using GameFrameX.Foundation.Encryption;

// ランダムキーとIVの生成
byte[] key = AesHelper.GenerateKey();
byte[] iv = AesHelper.GenerateIV();

// 文字列の暗号化・復号
string plainText = "Hello, World!";
string encrypted = AesHelper.Encrypt(plainText, key, iv);
string decrypted = AesHelper.Decrypt(encrypted, key, iv);

Console.WriteLine($"平文: {plainText}");
Console.WriteLine($"暗号文: {encrypted}");
Console.WriteLine($"復号: {decrypted}");
```

## 詳細な使い方

### 1. AES対称暗号 (AesHelper)

AES（Advanced Encryption Standard）は、現在最も広く使用されている対称暗号アルゴリズムです：

```csharp
using GameFrameX.Foundation.Encryption;

// ランダムキーとIVの生成
byte[] key = AesHelper.GenerateKey();
byte[] iv = AesHelper.GenerateIV();

// 文字列の暗号化・復号
string plainText = "Hello, World!";
string encrypted = AesHelper.Encrypt(plainText, key, iv);
string decrypted = AesHelper.Decrypt(encrypted, key, iv);

// バイト配列の暗号化・復号
byte[] data = Encoding.UTF8.GetBytes("機密データ");
byte[] encryptedBytes = AesHelper.Encrypt(data, key, iv);
byte[] decryptedBytes = AesHelper.Decrypt(encryptedBytes, key, iv);

// パスワードからのキー派生（PBKDF2）
string password = "MySecretPassword";
string salt = "MySalt";
byte[] derivedKey = AesHelper.DeriveKeyFromPassword(password, salt);
string encryptedWithPassword = AesHelper.EncryptWithPassword(plainText, password, salt);
string decryptedWithPassword = AesHelper.DecryptWithPassword(encryptedWithPassword, password, salt);
```

### 2. RSA非対称暗号 (RsaHelper)

RSAは最も一般的に使用される非対称暗号アルゴリズムで、暗号化・復号およびデジタル署名をサポートします：

```csharp
using GameFrameX.Foundation.Encryption;

// RSA鍵ペアの生成
var (publicKey, privateKey) = RsaHelper.GenerateKeyPair(2048);

// 公開鍵で暗号化、秘密鍵で復号
string message = "機密情報";
string encrypted = RsaHelper.Encrypt(message, publicKey);
string decrypted = RsaHelper.Decrypt(encrypted, privateKey);

// 秘密鍵で署名、公開鍵で検証
string dataToSign = "署名が必要なデータ";
string signature = RsaHelper.Sign(dataToSign, privateKey);
bool isValid = RsaHelper.Verify(dataToSign, signature, publicKey);

// バイト配列の操作
byte[] dataBytes = Encoding.UTF8.GetBytes("バイナリデータ");
byte[] encryptedBytes = RsaHelper.Encrypt(dataBytes, publicKey);
byte[] decryptedBytes = RsaHelper.Decrypt(encryptedBytes, privateKey);

// 大データの分割暗号化（RSAには長さ制限があります）
byte[] largeData = new byte[1000];
byte[] encryptedLargeData = RsaHelper.EncryptLargeData(largeData, publicKey);
byte[] decryptedLargeData = RsaHelper.DecryptLargeData(encryptedLargeData, privateKey);
```

### 3. SM2中国国密楕円曲線暗号 (Sm2Helper)

SM2は中国国家暗号管理局が発表した楕円曲線公開鍵暗号アルゴリズムです：

```csharp
using GameFrameX.Foundation.Encryption;

// SM2鍵ペアの生成
var (publicKey, privateKey) = Sm2Helper.GenerateKeyPair();

// 公開鍵で暗号化、秘密鍵で復号
string plainText = "国密暗号化テスト";
string encrypted = Sm2Helper.Encrypt(plainText, publicKey);
string decrypted = Sm2Helper.Decrypt(encrypted, privateKey);

// デジタル署名と検証
string dataToSign = "署名が必要な重要文書";
string signature = Sm2Helper.Sign(dataToSign, privateKey);
bool isValid = Sm2Helper.Verify(dataToSign, signature, publicKey);

// バイト配列の操作
byte[] data = Encoding.UTF8.GetBytes("国密アルゴリズムテストデータ");
byte[] encryptedData = Sm2Helper.Encrypt(data, publicKey);
byte[] decryptedData = Sm2Helper.Decrypt(encryptedData, privateKey);

// 鍵交換（ECDH）
var (alicePublic, alicePrivate) = Sm2Helper.GenerateKeyPair();
var (bobPublic, bobPrivate) = Sm2Helper.GenerateKeyPair();
byte[] aliceSharedKey = Sm2Helper.GenerateSharedKey(alicePrivate, bobPublic);
byte[] bobSharedKey = Sm2Helper.GenerateSharedKey(bobPrivate, alicePublic);
// aliceSharedKey と bobSharedKey は同一であり、対称暗号のキーとして使用可能
```

### 4. SM4中国国密ブロック暗号 (Sm4Helper)

SM4は中国国家标准のブロック暗号アルゴリズムです：

```csharp
using GameFrameX.Foundation.Encryption;

// SM4キーの生成
byte[] key = Sm4Helper.GenerateKey();

// ECBモードの暗号化・復号（本番環境では非推奨）
string plainText = "SM4暗号化テスト";
string encryptedECB = Sm4Helper.EncryptECB(plainText, key);
string decryptedECB = Sm4Helper.DecryptECB(encryptedECB, key);

// CBCモードの暗号化・復号（推奨）
byte[] iv = Sm4Helper.GenerateIV();
string encryptedCBC = Sm4Helper.EncryptCBC(plainText, key, iv);
string decryptedCBC = Sm4Helper.DecryptCBC(encryptedCBC, key, iv);

// バイト配列の操作
byte[] data = Encoding.UTF8.GetBytes("国密SM4アルゴリズム");
byte[] encryptedBytes = Sm4Helper.EncryptCBC(data, key, iv);
byte[] decryptedBytes = Sm4Helper.DecryptCBC(encryptedBytes, key, iv);

// ストリーム暗号化（大きなファイルに適しています）
using var inputStream = new MemoryStream(data);
using var outputStream = new MemoryStream();
Sm4Helper.EncryptStream(inputStream, outputStream, key, iv);
```

### 5. DSAデジタル署名アルゴリズム (DsaHelper)

DSA（Digital Signature Algorithm）はデジタル署名専用のアルゴリズムです：

```csharp
using GameFrameX.Foundation.Encryption;

// DSA鍵ペアの生成
var (publicKey, privateKey) = DsaHelper.GenerateKeyPair(2048);

// デジタル署名
string document = "重要な契約内容";
string signature = DsaHelper.Sign(document, privateKey);

// 署名検証
bool isValid = DsaHelper.Verify(document, signature, publicKey);
Console.WriteLine($"署名検証結果: {isValid}");

// バイト配列の署名
byte[] documentBytes = Encoding.UTF8.GetBytes("バイナリ文書");
byte[] signatureBytes = DsaHelper.Sign(documentBytes, privateKey);
bool isBytesValid = DsaHelper.Verify(documentBytes, signatureBytes, publicKey);

// ハッシュ署名（パフォーマンス向上）
string documentHash = "SHA256ハッシュ値";
string hashSignature = DsaHelper.SignHash(documentHash, privateKey);
bool isHashValid = DsaHelper.VerifyHash(documentHash, hashSignature, publicKey);
```

### 6. XOR排他暗号 (XorHelper)

XORはシンプルですが効果的な暗号化方式で、高速な暗号化が必要な場面に適しています：

```csharp
using GameFrameX.Foundation.Encryption;

// データとキーの準備
byte[] data = Encoding.UTF8.GetBytes("暗号化が必要なデータ");
byte[] key = Encoding.UTF8.GetBytes("MySecretKey");

// 完全な暗号化・復号
byte[] encrypted = XorHelper.GetXorBytes(data, key);
byte[] decrypted = XorHelper.GetXorBytes(encrypted, key); // XORの可逆性

// 高速暗号化（先頭220バイトのみ暗号化、大きなファイルのヘッダー暗号化に適しています）
byte[] quickEncrypted = XorHelper.GetQuickXorBytes(data, key);
byte[] quickDecrypted = XorHelper.GetQuickXorBytes(quickEncrypted, key);

// インプレース暗号化（メモリ節約）
byte[] dataToEncrypt = (byte[])data.Clone();
XorHelper.GetSelfXorBytes(dataToEncrypt, key); // 元の配列を直接変更
XorHelper.GetSelfXorBytes(dataToEncrypt, key); // 再度XORで元のデータを復元

// 部分暗号化（範囲指定）
byte[] partialEncrypted = XorHelper.GetXorBytes(data, 5, 10, key); // インデックス5から10バイトを暗号化

// 高速インプレース暗号化
byte[] quickData = (byte[])data.Clone();
XorHelper.GetQuickSelfXorBytes(quickData, key);
```

## 高度な使い方

### ハイブリッド暗号（RSA + AES）

非対称暗号と対称暗号の利点を組み合わせます：

```csharp
// RSA鍵ペアとAESキーの生成
var (rsaPublic, rsaPrivate) = RsaHelper.GenerateKeyPair(2048);
byte[] aesKey = AesHelper.GenerateKey();
byte[] aesIV = AesHelper.GenerateIV();

// 大データはAESで暗号化
string largeData = "これは非常に長いデータです...";
string encryptedData = AesHelper.Encrypt(largeData, aesKey, aesIV);

// AESキーはRSAで暗号化
string encryptedAesKey = RsaHelper.Encrypt(Convert.ToBase64String(aesKey), rsaPublic);
string encryptedAesIV = RsaHelper.Encrypt(Convert.ToBase64String(aesIV), rsaPublic);

// 復号プロセス
byte[] decryptedAesKey = Convert.FromBase64String(RsaHelper.Decrypt(encryptedAesKey, rsaPrivate));
byte[] decryptedAesIV = Convert.FromBase64String(RsaHelper.Decrypt(encryptedAesIV, rsaPrivate));
string decryptedData = AesHelper.Decrypt(encryptedData, decryptedAesKey, decryptedAesIV);
```

### ファイル暗号化

```csharp
// ファイル暗号化の例
public static void EncryptFile(string inputFile, string outputFile, byte[] key, byte[] iv)
{
    using var inputStream = File.OpenRead(inputFile);
    using var outputStream = File.Create(outputFile);
    
    // AESでファイルストリームを暗号化
    using var cryptoStream = AesHelper.CreateEncryptStream(outputStream, key, iv);
    inputStream.CopyTo(cryptoStream);
}

// 大ファイルの高速暗号化（ファイルヘッダーのみ暗号化）
public static void QuickEncryptFile(string filePath, byte[] key)
{
    byte[] fileHeader = File.ReadAllBytes(filePath).Take(220).ToArray();
    byte[] encryptedHeader = XorHelper.GetQuickXorBytes(fileHeader, key);
    
    // 暗号化されたヘッダーをファイルに書き戻す
    using var stream = File.OpenWrite(filePath);
    stream.Write(encryptedHeader, 0, encryptedHeader.Length);
}
```

### デジタル証明書と署名チェーン

```csharp
// 署名チェーンの作成
public class DocumentSignatureChain
{
    private readonly List<(string signer, string signature)> _signatures = new();
    
    public void AddSignature(string document, string signer, string privateKey)
    {
        // 文書とそれ以前の署名を合わせて署名
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

### 中国国密アルゴリズムのコンプライアンス

中国の暗号規制への準拠が必要なアプリケーション向け：

```csharp
// 国密コンプライアンスの例
public class GMCompliantEncryption
{
    // SM4を使用した対称暗号化
    public static string EncryptWithSM4(string data, byte[] key)
    {
        byte[] iv = Sm4Helper.GenerateIV();
        return Sm4Helper.EncryptCBC(data, key, iv);
    }
    
    // SM2を使用した非対称暗号化と署名
    public static (string encrypted, string signature) SecureWithSM2(
        string data, string publicKey, string privateKey)
    {
        string encrypted = Sm2Helper.Encrypt(data, publicKey);
        string signature = Sm2Helper.Sign(data, privateKey);
        return (encrypted, signature);
    }
    
    // SM2とSM4のハイブリッド使用
    public static string HybridGMEncrypt(string data, string sm2PublicKey)
    {
        // SM4キーの生成
        byte[] sm4Key = Sm4Helper.GenerateKey();
        byte[] sm4IV = Sm4Helper.GenerateIV();
        
        // SM4でデータを暗号化
        string encryptedData = Sm4Helper.EncryptCBC(data, sm4Key, sm4IV);
        
        // SM2でSM4キーを暗号化
        string encryptedKey = Sm2Helper.Encrypt(Convert.ToBase64String(sm4Key), sm2PublicKey);
        string encryptedIV = Sm2Helper.Encrypt(Convert.ToBase64String(sm4IV), sm2PublicKey);
        
        // 結果を組み合わせる
        return $"{encryptedKey}|{encryptedIV}|{encryptedData}";
    }
}
```

### テストと検証

```csharp
// 暗号化アルゴリズムのテスト例
[TestClass]
public class EncryptionTests
{
    [TestMethod]
    public void AES_EncryptDecrypt_ShouldReturnOriginalData()
    {
        // Arrange
        string original = "テストデータ";
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
        string data = "署名が必要なデータ";
        
        // Act
        string signature = RsaHelper.Sign(data, privateKey);
        bool isValid = RsaHelper.Verify(data, signature, publicKey);
        bool isInvalid = RsaHelper.Verify(data + "改ざん", signature, publicKey);
        
        // Assert
        Assert.IsTrue(isValid);
        Assert.IsFalse(isInvalid);
    }
}
```

## ベストプラクティス

### 鍵管理

```csharp
// 良い実践：鍵オブジェクトを再利用する
public class EncryptionService
{
    private static readonly byte[] _aesKey = AesHelper.GenerateKey();
    private static readonly byte[] _aesIV = AesHelper.GenerateIV();
    
    public string EncryptData(string data)
    {
        return AesHelper.Encrypt(data, _aesKey, _aesIV);
    }
}

// 避けるべき：毎回新しい鍵を生成する
// string encrypted = AesHelper.Encrypt(data, AesHelper.GenerateKey(), AesHelper.GenerateIV());
```

### 大データの処理

```csharp
// 良い実践：ストリーム処理を使用する
public static void EncryptLargeFile(string inputFile, string outputFile, byte[] key, byte[] iv)
{
    const int bufferSize = 64 * 1024; // 64KBバッファ
    using var input = File.OpenRead(inputFile);
    using var output = File.Create(outputFile);
    using var cryptoStream = AesHelper.CreateEncryptStream(output, key, iv);
    
    input.CopyTo(cryptoStream, bufferSize);
}

// 避けるべき：ファイル全体を一度にメモリに読み込む
// byte[] allData = File.ReadAllBytes(largeFile);
```

### 適切なアルゴリズムの選択

```csharp
// パフォーマンス比較（参考値）
// XOR: 最速、簡単な難読化に適しています
// AES: 高速、大量データに適しています
// SM4: 中程度、国密要件のシナリオに適しています
// RSA: 低速、鍵交換や署名に適しています
// SM2: 低速、国密要件の非対称暗号に適しています

// シナリオに応じた選択
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

### 鍵の安全性

```csharp
// 良い実践：安全な鍵ストレージを使用する
public class SecureKeyManager
{
    public static byte[] GetKey(string keyName)
    {
        // セキュアストレージ（Azure Key Vault、Windows DPAPIなど）から鍵を取得
        return SecureStorage.GetKey(keyName);
    }
    
    public static void StoreKey(string keyName, byte[] key)
    {
        // 鍵を安全に保存
        SecureStorage.StoreKey(keyName, key);
        
        // メモリ内の鍵をクリア
        Array.Clear(key, 0, key.Length);
    }
}

// 避けるべき：鍵のハードコーディング
// const string HardcodedKey = "MySecretKey123"; // 安全ではありません！
```

### 乱数生成

```csharp
// 良い実践：暗号学的に安全な乱数ジェネレーターを使用する
public static byte[] GenerateSecureRandom(int length)
{
    using var rng = RandomNumberGenerator.Create();
    byte[] randomBytes = new byte[length];
    rng.GetBytes(randomBytes);
    return randomBytes;
}

// 避けるべき：通常の Random クラスで鍵を生成する
// var random = new Random();
// byte[] key = new byte[32];
// random.NextBytes(key); // 安全ではありません！
```

### エラー処理

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
            // エラーを記録するが、機密情報は漏洩しない
            Logger.LogError("Encryption failed", ex);
            throw new ApplicationException("暗号化操作に失敗しました");
        }
        finally
        {
            // 機密データのクリーンアップ
            if (key != null) Array.Clear(key, 0, key.Length);
            if (iv != null) Array.Clear(iv, 0, iv.Length);
        }
    }
}
```

## API リファレンス

| クラス | メソッド | パラメータ | 戻り値 | 説明 |
|---|------|------|--------|------|
| **AesHelper** | GenerateKey | なし | `byte[]` | ランダムなAESキーを生成 |
| | GenerateIV | なし | `byte[]` | ランダムなIVを生成 |
| | Encrypt | `string, byte[], byte[]` | `string` | 文字列の暗号化 |
| | Decrypt | `string, byte[], byte[]` | `string` | 文字列の復号 |
| | Encrypt | `byte[], byte[], byte[]` | `byte[]` | バイト配列の暗号化 |
| | Decrypt | `byte[], byte[], byte[]` | `byte[]` | バイト配列の復号 |
| | EncryptWithPassword | `string, string, string` | `string` | パスワードを使用した暗号化 |
| | DecryptWithPassword | `string, string, string` | `string` | パスワードを使用した復号 |
| | DeriveKeyFromPassword | `string, string` | `byte[]` | PBKDF2鍵派生 |
| **RsaHelper** | GenerateKeyPair | `int` | `(string, string)` | RSA鍵ペアの生成 |
| | Encrypt | `string, string` | `string` | 公開鍵による暗号化 |
| | Decrypt | `string, string` | `string` | 秘密鍵による復号 |
| | Sign | `string, string` | `string` | 秘密鍵による署名 |
| | Verify | `string, string, string` | `bool` | 公開鍵による署名検証 |
| | EncryptLargeData | `byte[], string` | `byte[]` | 大データの分割暗号化 |
| **Sm2Helper** | GenerateKeyPair | なし | `(string, string)` | SM2鍵ペアの生成 |
| | Encrypt | `string, string` | `string` | 公開鍵による暗号化 |
| | Decrypt | `string, string` | `string` | 秘密鍵による復号 |
| | Sign | `string, string` | `string` | 秘密鍵による署名 |
| | Verify | `string, string, string` | `bool` | 公開鍵による署名検証 |
| | GenerateSharedKey | `string, string` | `byte[]` | ECDH鍵交換 |
| **Sm4Helper** | GenerateKey | なし | `byte[]` | SM4キーの生成 |
| | GenerateIV | なし | `byte[]` | IVの生成 |
| | EncryptCBC | `string, byte[], byte[]` | `string` | CBCモードの暗号化 |
| | DecryptCBC | `string, byte[], byte[]` | `string` | CBCモードの復号 |
| | EncryptECB | `string, byte[]` | `string` | ECBモードの暗号化 |
| | DecryptECB | `string, byte[]` | `string` | ECBモードの復号 |
| | EncryptStream | `Stream, Stream, byte[], byte[]` | `void` | ストリーム暗号化 |
| **DsaHelper** | GenerateKeyPair | `int` | `(string, string)` | DSA鍵ペアの生成 |
| | Sign | `string, string` | `string` | デジタル署名 |
| | Verify | `string, string, string` | `bool` | 署名検証 |
| | SignHash | `string, string` | `string` | ハッシュ署名 |
| | VerifyHash | `string, string, string` | `bool` | ハッシュ署名検証 |
| **XorHelper** | GetXorBytes | `byte[], byte[]` | `byte[]` | XOR暗号化/復号 |
| | GetQuickXorBytes | `byte[], byte[]` | `byte[]` | 高速XOR（先頭220バイト） |
| | GetSelfXorBytes | `byte[], byte[]` | `void` | インプレースXOR |
| | GetQuickSelfXorBytes | `byte[], byte[]` | `void` | 高速インプレースXOR |
| | GetXorBytes | `byte[], int, int, byte[]` | `byte[]` | 部分範囲XOR |
