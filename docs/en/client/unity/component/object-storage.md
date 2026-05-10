# Object Storage

The Object Storage component of GameFrameX.

**Object Storage Component** - Provides interfaces related to the Object Storage component.

---
[[toc]]

## Interface and Class Overview

This document covers the functionality of the following interfaces and classes:

1. `IObjectStorageManager` - Defines the initialization method for the object storage manager.
2. `IObjectStorageUploadManager` - Extends `IObjectStorageManager` with upload-related functionality.
3. `BaseObjectStorageUploadManager` - An abstract base class that provides the basic framework for the upload manager.
4. `ObjectStorageUploadFactory` - A static factory class for creating and initializing upload manager instances.

## Interface and Class Details

### IObjectStorageManager

#### Description

The `IObjectStorageManager` interface defines the initialization method for the object storage manager, providing the necessary environment configuration for subsequent object storage operations.

#### Methods

- `Init(string accessKey, string secretKey, string bucketName)`
    - Initializes the object storage manager by setting the access key, secret key, and bucket name.

### IObjectStorageUploadManager

#### Description

The `IObjectStorageUploadManager` interface inherits from `IObjectStorageManager` and adds file and directory upload capabilities on top of it.

#### Methods

- `SetSavePath(string savePath)`
    - Sets the target storage path for uploaded files.
- `UploadDirectory(string localDirectory)`
    - Uploads all files from the specified local directory to the object storage service.

### BaseObjectStorageUploadManager

#### Description

`BaseObjectStorageUploadManager` is an abstract class that implements part of the `IObjectStorageUploadManager` interface and provides an abstract method for subclasses to implement specific upload logic.

#### Properties

- `BucketSavePath`
    - The target path for storing uploaded files.
- `UploadRootPath`
    - The local directory path of files to be uploaded.

#### Methods

- `Init(string accessKey, string secretKey, string bucketName)`
    - An abstract method to be implemented by subclasses with specific initialization logic.
- `SetSavePath(string savePath)`
    - Sets the target storage path, ensuring there is no trailing directory separator at the end of the path.
- `UploadDirectory(string localDirectory)`
    - Sets the local directory to upload and calls the internal method to execute the upload.
- `UploadDirectoryInternal(string localDirectory)`
    - An abstract method to be implemented by subclasses with specific upload logic.

### ObjectStorageUploadFactory

#### Description

`ObjectStorageUploadFactory` is a static factory class used to create and initialize upload manager instances.

#### Methods

- `Create<T>(string accessKey, string secretKey, string bucketName)`
    - Creates an upload manager instance of the specified type and automatically calls the initialization method.

## Usage Guide

### Import Namespace

Before using the above interfaces and classes, make sure you have imported the correct namespace:

```csharp
using GameFrameX.ObjectStorage.Runtime;
```

### Initialize and Use the Upload Manager

1. Use the factory class to create and initialize an upload manager instance:
   ```csharp
   IObjectStorageUploadManager uploadManager = ObjectStorageUploadFactory.Create<YourCustomUploadManager>("your_access_key", "your_secret_key", "your_bucket_name");
   ```
2. Set the target storage path for uploaded files:
   ```csharp
   uploadManager.SetSavePath("desired/upload/path");
   ```
3. Upload a local directory:
   ```csharp
   uploadManager.UploadDirectory("local/directory/to/upload");
   ```

Based on your actual business requirements and object storage service characteristics, implement the abstract methods of `BaseObjectStorageUploadManager` to provide specific upload logic.

## Installation (Choose One)

1. Add the following directly to the `dependencies` section of the `manifest.json` file:
   ```json
      {"com.gameframex.unity.objectstorage": "https://github.com/GameFrameX/com.gameframex.unity.objectstorage.git"}
    ```
2. In Unity's `Packages Manager`, add the library using `Git URL` with the address: https://github.com/GameFrameX/com.gameframex.unity.objectstorage.git

3. Download the repository directly and place it in the `Packages` directory of your Unity project. It will be automatically loaded and recognized.
