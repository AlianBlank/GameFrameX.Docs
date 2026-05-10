# 对象存储

GameFrameX 的 Object Storage コンポーネント

**Object Storage コンポーネント (Object Storage Component)** - 提供Object Storageコンポーネント相关的インターフェース。

---
[[toc]]

## インターフェース和类概览

このドキュメント涵盖了以下インターフェース和类的機能説明：

1. `IObjectStorageManager` - 定義了对象存储マネージャー的初期化メソッド。
2. `IObjectStorageUploadManager` - 拡張了 `IObjectStorageManager`，追加了上传相关的機能。
3. `BaseObjectStorageUploadManager` - 抽象基底クラス，提供します上传マネージャー的基本フレームワーク。
4. `ObjectStorageUploadFactory` - 静态工厂类，用于作成和初期化上传マネージャーインスタンス。

## インターフェース和类詳細説明

### IObjectStorageManager

#### 機能説明

`IObjectStorageManager` インターフェース定義了对象存储マネージャー的初期化メソッド，为后续的对象存储操作提供必要的環境設定。

#### メソッド説明

- `Init(string accessKey, string secretKey, string bucketName)`
    - 初期化对象存储マネージャー，設定访问密钥、秘密密钥和存储桶名称。

### IObjectStorageUploadManager

#### 機能説明

`IObjectStorageUploadManager` インターフェース継承自 `IObjectStorageManager`，并在此基本上增加了上传ファイル和ディレクトリ的機能。

#### メソッド説明

- `SetSavePath(string savePath)`
    - 設定上传ファイル的目标存储路径。
- `UploadDirectory(string localDirectory)`
    - 将指定本地ディレクトリ下的所有ファイル上传到对象存储服务。

### BaseObjectStorageUploadManager

#### 機能説明

`BaseObjectStorageUploadManager` は抽象类，它実装了 `IObjectStorageUploadManager` インターフェース的部分機能，并提供します一个抽象メソッド供サブクラス実装具体的上传逻辑。

#### プロパティ説明

- `BucketSavePath`
    - 存储上传ファイル的目标路径。
- `UploadRootPath`
    - 存储待上传的本地ディレクトリ路径。

#### メソッド説明

- `Init(string accessKey, string secretKey, string bucketName)`
    - 抽象メソッド，由サブクラス実装具体的初期化逻辑。
- `SetSavePath(string savePath)`
    - 設定目标存储路径，確認してください路径末尾没有多余的ディレクトリ分隔符。
- `UploadDirectory(string localDirectory)`
    - 設定待上传的本地ディレクトリ，并呼び出し内部メソッド执行上传。
- `UploadDirectoryInternal(string localDirectory)`
    - 抽象メソッド，由サブクラス実装具体的上传逻辑。

### ObjectStorageUploadFactory

#### 機能説明

`ObjectStorageUploadFactory` は静态工厂类，用于作成和初期化上传マネージャーインスタンス。

#### メソッド説明

- `Create<T>(string accessKey, string secretKey, string bucketName)`
    - 作成指定タイプ的上传マネージャーインスタンス，并自动呼び出し初期化メソッド。

## 使用ガイド

### 引入名前空間

在使用上述インターフェース和类之前，请確認してください已引入正确的名前空間：

```csharp
using GameFrameX.ObjectStorage.Runtime;
```

### 初期化和使用上传マネージャー

1. 使用工厂类作成并初期化上传マネージャーインスタンス：
   ```csharp
   IObjectStorageUploadManager uploadManager = ObjectStorageUploadFactory.Create<YourCustomUploadManager>("your_access_key", "your_secret_key", "your_bucket_name");
   ```
2. 設定上传ファイル的目标存储路径：
   ```csharp
   uploadManager.SetSavePath("desired/upload/path");
   ```
3. 上传本地ディレクトリ：
   ```csharp
   uploadManager.UploadDirectory("local/directory/to/upload");
   ```

请根据实际的业务需求和对象存储服务的特性，実装 `BaseObjectStorageUploadManager` 的抽象メソッド，以提供具体的上传逻辑。

## 使用方法(任选其一)

1. 直接在 `manifest.json` 的ファイル中的 `dependencies` 节点下追加以下内容
   ```json
      {"com.gameframex.unity.objectstorage": "https://github.com/GameFrameX/com.gameframex.unity.objectstorage.git"}
    ```
2. 在Unity 的`Packages Manager` 中使用`Git URL`
   的方法追加库,地址为：https://github.com/GameFrameX/com.gameframex.unity.objectstorage.git

3. 直接下载リポジトリ放置到Unity プロジェクト的`Packages` ディレクトリ下。会自动ロード识别
