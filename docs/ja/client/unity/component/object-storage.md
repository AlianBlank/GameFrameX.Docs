# オブジェクトストレージ

GameFrameX の Object Storage コンポーネント

**Object Storage コンポーネント (Object Storage Component)** - Object Storageコンポーネントのインターフェース。

---

## インターフェースとクラス

ドキュメントたインターフェースとクラスの：

1. `IObjectStorageManager` - たオブジェクトストレージマネージャーのメソッド。
2. `IObjectStorageUploadManager` - た `IObjectStorageManager`，たの。
3. `BaseObjectStorageUploadManager` - クラス，たマネージャーのフレームワーク。
4. `ObjectStorageUploadFactory` - クラス，にとマネージャー。

## インターフェースとクラス

### IObjectStorageManager

#### 

`IObjectStorageManager` インターフェースたオブジェクトストレージマネージャーのメソッド，のオブジェクトストレージの。

#### メソッド

- `Init(string accessKey, string secretKey, string bucketName)`
    - オブジェクトストレージマネージャー，、と。

### IObjectStorageUploadManager

#### 

`IObjectStorageUploadManager` インターフェース `IObjectStorageManager`，にたファイルとディレクトリの。

#### メソッド

- `SetSavePath(string savePath)`
    - ファイルのパス。
- `UploadDirectory(string localDirectory)`
    - ローカルディレクトリのファイルオブジェクトストレージ。

### BaseObjectStorageUploadManager

#### 

`BaseObjectStorageUploadManager` はクラス，た `IObjectStorageUploadManager` インターフェースの，たメソッドクラスの。

#### プロパティ

- `BucketSavePath`
    - ファイルのパス。
- `UploadRootPath`
    - のローカルディレクトリパス。

#### メソッド

- `Init(string accessKey, string secretKey, string bucketName)`
    - メソッド，クラスの。
- `SetSavePath(string savePath)`
    - パス，パスのディレクトリ。
- `UploadDirectory(string localDirectory)`
    - のローカルディレクトリ，びしメソッド。
- `UploadDirectoryInternal(string localDirectory)`
    - メソッド，クラスの。

### ObjectStorageUploadFactory

#### 

`ObjectStorageUploadFactory` はクラス，にとマネージャー。

#### メソッド

- `Create<T>(string accessKey, string secretKey, string bucketName)`
    - タイプのマネージャー，びしメソッド。

## ガイド

### 

にインターフェースとクラス，の：

```csharp
using GameFrameX.ObjectStorage.Runtime;
```

### とマネージャー

1. クラスマネージャー：
   ```csharp
   IObjectStorageUploadManager uploadManager = ObjectStorageUploadFactory.Create<YourCustomUploadManager>("your_access_key", "your_secret_key", "your_bucket_name");
   ```
2. ファイルのパス：
   ```csharp
   uploadManager.SetSavePath("desired/upload/path");
   ```
3. ローカルディレクトリ：
   ```csharp
   uploadManager.UploadDirectory("local/directory/to/upload");
   ```

のとオブジェクトストレージの， `BaseObjectStorageUploadManager` のメソッド，の。

## ()

1. に `manifest.json` のファイルの `dependencies` 
   ```json
      {"com.gameframex.unity.objectstorage": "https://github.com/GameFrameX/com.gameframex.unity.objectstorage.git"}
    ```
2. にUnity の`Packages Manager` `Git URL`
   の,：https://github.com/GameFrameX/com.gameframex.unity.objectstorage.git

3. リポジトリUnity プロジェクトの`Packages` ディレクトリ。ロード
