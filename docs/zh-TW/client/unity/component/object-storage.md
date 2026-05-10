# 物件儲存

GameFrameX 的 Object Storage 組件

**Object Storage 組件 (Object Storage Component)** - 提供Object Storage組件相關的介面。

---
[[toc]]

## 介面和類概覽

本文件涵蓋了以下介面和類的功能說明：

1. `IObjectStorageManager` - 定義了物件儲存管理器的初始化方法。
2. `IObjectStorageUploadManager` - 擴充套件了 `IObjectStorageManager`，新增了上傳相關的功能。
3. `BaseObjectStorageUploadManager` - 抽象基類，提供了上傳管理器的基本框架。
4. `ObjectStorageUploadFactory` - 靜態工廠類，用於建立和初始化上傳管理器例項。

## 介面和類詳細說明

### IObjectStorageManager

#### 功能描述

`IObjectStorageManager` 介面定義了物件儲存管理器的初始化方法，為後續的物件儲存操作提供必要的環境配置。

#### 方法說明

- `Init(string accessKey, string secretKey, string bucketName)`
    - 初始化物件儲存管理器，設定訪問金鑰、秘密金鑰和儲存桶名稱。

### IObjectStorageUploadManager

#### 功能描述

`IObjectStorageUploadManager` 介面繼承自 `IObjectStorageManager`，並在此基礎上增加了上傳檔案和目錄的功能。

#### 方法說明

- `SetSavePath(string savePath)`
    - 設定上傳檔案的目標儲存路徑。
- `UploadDirectory(string localDirectory)`
    - 將指定本地目錄下的所有檔案上傳到物件儲存服務。

### BaseObjectStorageUploadManager

#### 功能描述

`BaseObjectStorageUploadManager` 是一個抽象類，它實現了 `IObjectStorageUploadManager` 介面的部分功能，並提供了一個抽象方法供子類實現具體的上傳邏輯。

#### 屬性說明

- `BucketSavePath`
    - 儲存上傳檔案的目標路徑。
- `UploadRootPath`
    - 儲存待上傳的本地目錄路徑。

#### 方法說明

- `Init(string accessKey, string secretKey, string bucketName)`
    - 抽象方法，由子類實現具體的初始化邏輯。
- `SetSavePath(string savePath)`
    - 設定目標儲存路徑，確保路徑末尾沒有多餘的目錄分隔符。
- `UploadDirectory(string localDirectory)`
    - 設定待上傳的本地目錄，並呼叫內部方法執行上傳。
- `UploadDirectoryInternal(string localDirectory)`
    - 抽象方法，由子類實現具體的上傳邏輯。

### ObjectStorageUploadFactory

#### 功能描述

`ObjectStorageUploadFactory` 是一個靜態工廠類，用於建立和初始化上傳管理器例項。

#### 方法說明

- `Create<T>(string accessKey, string secretKey, string bucketName)`
    - 建立指定型別的上傳管理器例項，並自動呼叫初始化方法。

## 使用指南

### 引入名稱空間

在使用上述介面和類之前，請確保已引入正確的名稱空間：

```csharp
using GameFrameX.ObjectStorage.Runtime;
```

### 初始化和使用上傳管理器

1. 使用工廠類建立並初始化上傳管理器例項：
   ```csharp
   IObjectStorageUploadManager uploadManager = ObjectStorageUploadFactory.Create<YourCustomUploadManager>("your_access_key", "your_secret_key", "your_bucket_name");
   ```
2. 設定上傳檔案的目標儲存路徑：
   ```csharp
   uploadManager.SetSavePath("desired/upload/path");
   ```
3. 上傳本地目錄：
   ```csharp
   uploadManager.UploadDirectory("local/directory/to/upload");
   ```

請根據實際的業務需求和物件儲存服務的特性，實現 `BaseObjectStorageUploadManager` 的抽象方法，以提供具體的上傳邏輯。

## 使用方式(任選其一)

1. 直接在 `manifest.json` 的檔案中的 `dependencies` 節點下新增以下內容
   ```json
      {"com.gameframex.unity.objectstorage": "https://github.com/GameFrameX/com.gameframex.unity.objectstorage.git"}
    ```
2. 在Unity 的`Packages Manager` 中使用`Git URL`
   的方式新增庫,地址為：https://github.com/GameFrameX/com.gameframex.unity.objectstorage.git

3. 直接下載倉庫放置到Unity 專案的`Packages` 目錄下。會自動載入識別
