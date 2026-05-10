# オブジェクトストレージ

GameFrameX 的 Object Storage コンポーネント

**Object Storage コンポーネント (Object Storage Component)** - 提供Object Storageコンポーネント関連的インターフェース。

---
[[toc]]

## インターフェースとクラスの概要

本文档涵盖了以下インターフェース和クラス的機能説明：

1. `IObjectStorageManager` - オブジェクトストレージマネージャーの初期化メソッドを定義。
2. `IObjectStorageUploadManager` - を拡張 `IObjectStorageManager`，アップロード関連の機能を追加。
3. `BaseObjectStorageUploadManager` - 抽象基底クラス，アップロードマネージャーの基本フレームワークを提供。
4. `ObjectStorageUploadFactory` - 静的ファクトリークラス，アップロードマネージャーインスタンスの作成と初期化に使用。

## インターフェースとクラスの詳細説明

### IObjectStorageManager

#### 機能説明

`IObjectStorageManager` インターフェースオブジェクトストレージマネージャーの初期化メソッドを定義，後続のオブジェクトストレージ操作に必要な環境設定を提供。

#### メソッド説明

- `Init(string accessKey, string secretKey, string bucketName)`
    - 初期化オブジェクトストレージマネージャー，設定アクセスキー、シークレットキー和バケット名。

### IObjectStorageUploadManager

#### 機能説明

`IObjectStorageUploadManager` インターフェースを継承 `IObjectStorageManager`，并これ基础上にファイルとディレクトリのアップロード機能を追加。

#### メソッド説明

- `SetSavePath(string savePath)`
    - アップロードファイルの対象保存パスを設定。
- `UploadDirectory(string localDirectory)`
    - 指定したローカルディレクトリ内のすべてのファイルをオブジェクトストレージサービスにアップロード。

### BaseObjectStorageUploadManager

#### 機能説明

`BaseObjectStorageUploadManager` は抽象クラス，它実装了 `IObjectStorageUploadManager` インターフェース的部分機能，サブクラスが具体的なアップロード論理を実装するための抽象メソッドを提供。

#### プロパティ説明

- `BucketSavePath`
    - アップロードファイルの対象保存パス。
- `UploadRootPath`
    - アップロード待ちのローカルディレクトリパス。

#### メソッド説明

- `Init(string accessKey, string secretKey, string bucketName)`
    - 抽象メソッド，サブクラスが具体的な初期化論理を実装。
- `SetSavePath(string savePath)`
    - 設定対象保存パス，パスの末尾に余分なディレクトリ区切り文字がないことを確認。
- `UploadDirectory(string localDirectory)`
    - 設定待上传的ローカルディレクトリ，内部メソッドを呼び出してアップロードを実行。
- `UploadDirectoryInternal(string localDirectory)`
    - 抽象メソッド，サブクラスが具体的なアップロード論理を実装。

### ObjectStorageUploadFactory

#### 機能説明

`ObjectStorageUploadFactory` は静的ファクトリークラス，アップロードマネージャーインスタンスの作成と初期化に使用。

#### メソッド説明

- `Create<T>(string accessKey, string secretKey, string bucketName)`
    - 指定したタイプのアップロードマネージャーインスタンスを作成，自動的に初期化メソッドを呼び出します。

## 使用ガイド

### 名前空間のインポート

上記のインターフェースとクラスを使用する前に，正しい名前空間をインポートしていることを確認してください：

```csharp
using GameFrameX.ObjectStorage.Runtime;
```

### 初期化和使用アップロードマネージャー

1. 使用ファクトリークラス作成并初期化アップロードマネージャーインスタンス：
   ```csharp
   IObjectStorageUploadManager uploadManager = ObjectStorageUploadFactory.Create<YourCustomUploadManager>("your_access_key", "your_secret_key", "your_bucket_name");
   ```
2. アップロードファイルの対象保存パスを設定：
   ```csharp
   uploadManager.SetSavePath("desired/upload/path");
   ```
3. ローカルディレクトリをアップロード：
   ```csharp
   uploadManager.UploadDirectory("local/directory/to/upload");
   ```

実際のビジネス要件とオブジェクトストレージサービスの特性に応じて，実装 `BaseObjectStorageUploadManager` 的抽象メソッド，具体的なアップロード論理を提供。

## 使用メソッド(任选其一)

1. 直接在 `manifest.json` 的ファイル内の `dependencies` ノードに追加以下の内容
   ```json
      {"com.gameframex.unity.objectstorage": "https://github.com/GameFrameX/com.gameframex.unity.objectstorage.git"}
    ```
2. Unity の`Packages Manager` 中使用`Git URL`
    メソッドでライブラリを追加,アドレス：：https://github.com/GameFrameX/com.gameframex.unity.objectstorage.git

3. リポジトリを直接ダウンロードしてUnity プロジェクトの`Packages`  ディレクトリに配置。自動的にロード・認識されます
