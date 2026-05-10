# 객체 스토리지

GameFrameX의 Object Storage 컴포넌트

**Object Storage 컴포넌트 (Object Storage Component)** - Object Storage 컴포넌트 관련 인터페이스를 제공합니다.

---
[[toc]]

## 인터페이스 및 클래스 개요

이 문서에서는 다음 인터페이스와 클래스의 기능 설명을 다룹니다:

1. `IObjectStorageManager` - 객체 스토리지 관리자의 초기화 메서드를 정의합니다.
2. `IObjectStorageUploadManager` - `IObjectStorageManager`를 확장하여 업로드 관련 기능을 추가합니다.
3. `BaseObjectStorageUploadManager` - 업로드 관리자의 기본 프레임워크를 제공하는 추상 基类입니다.
4. `ObjectStorageUploadFactory` - 업로드 관리자 인스턴스를 생성하고 초기화하는 정적 팩토리 클래스입니다.

## 인터페이스 및 클래스 상세 설명

### IObjectStorageManager

#### 기능 설명

`IObjectStorageManager` 인터페이스는 객체 스토리지 관리자의 초기화 메서드를 정의하며, 이후 객체 스토리지 操作를 위한 필수 환경 설정을 제공합니다.

#### 메서드 설명

- `Init(string accessKey, string secretKey, string bucketName)`
    - 객체 스토리지 관리자를 초기화하고, 액세스 키, 시크릿 키 및 스토리지 버킷 이름을 설정합니다.

### IObjectStorageUploadManager

#### 기능 설명

`IObjectStorageUploadManager` 인터페이스는 `IObjectStorageManager`를 상속하고, 파일 및 디렉토리 업로드 기능을 추가합니다.

#### 메서드 설명

- `SetSavePath(string savePath)`
    - 업로드 파일의 대상 스토리지 경로를 설정합니다.
- `UploadDirectory(string localDirectory)`
    - 지정된 로컬 디렉토리 아래의 모든 파일을 객체 스토리지 서비스에 업로드합니다.

### BaseObjectStorageUploadManager

#### 기능 설명

`BaseObjectStorageUploadManager`는 추상 类으로, `IObjectStorageUploadManager` 인터페이스의 일부 기능을 구현하고, 하위 클래스가 구체적인 업로드 로직을 구현할 수 있는 추상 메서드를 제공합니다.

#### 속성 설명

- `BucketSavePath`
    - 업로드 파일의 대상 경로를 저장합니다.
- `UploadRootPath`
    - 업로드할 로컬 디렉토리 경로를 저장합니다.

#### 메서드 설명

- `Init(string accessKey, string secretKey, string bucketName)`
    - 하위 클래스에서 구체적인 초기화 로직을 구현하는 추상 메서드입니다.
- `SetSavePath(string savePath)`
    - 대상 스토리지 경로를 설정하며, 경로 끝에 불필요한 디렉토리 구분자가 없는지 확인합니다.
- `UploadDirectory(string localDirectory)`
    - 업로드할 로컬 디렉토리를 설정하고 내부 메서드를 호출하여 업로드를 실행합니다.
- `UploadDirectoryInternal(string localDirectory)`
    - 하위 클래스에서 구체적인 업로드 로직을 구현하는 추상 메서드입니다.

### ObjectStorageUploadFactory

#### 기능 설명

`ObjectStorageUploadFactory`는 업로드 관리자 인스턴스를 생성하고 초기화하는 정적 팩토리 클래스입니다.

#### 메서드 설명

- `Create<T>(string accessKey, string secretKey, string bucketName)`
    - 지정된 타입의 업로드 관리자 인스턴스를 생성하고 자동으로 초기화 메서드를 호출합니다.

## 사용 가이드

### 네임스페이스 참조

위의 인터페이스와 클래스를 사용하기 전에 올바른 네임스페이스를 참조했는지 확인하세요:

```csharp
using GameFrameX.ObjectStorage.Runtime;
```

### 업로드 관리자 초기화 및 사용

1. 팩토리 클래스를 사용하여 업로드 관리자 인스턴스를 생성하고 초기화합니다:
   ```csharp
   IObjectStorageUploadManager uploadManager = ObjectStorageUploadFactory.Create<YourCustomUploadManager>("your_access_key", "your_secret_key", "your_bucket_name");
   ```
2. 업로드 파일의 대상 스토리지 경로를 설정합니다:
   ```csharp
   uploadManager.SetSavePath("desired/upload/path");
   ```
3. 로컬 디렉토리를 업로드합니다:
   ```csharp
   uploadManager.UploadDirectory("local/directory/to/upload");
   ```

실제 업무 요구사항과 객체 스토리지 서비스의 특성에 따라 `BaseObjectStorageUploadManager`의 추상 메서드를 구현하여 구체적인 업로드 로직을 제공하세요.

## 사용 방법 (하나 선택)

1. `manifest.json` 파일의 `dependencies` 노드에 다음 내용을 추가합니다.
   ```json
      {"com.gameframex.unity.objectstorage": "https://github.com/GameFrameX/com.gameframex.unity.objectstorage.git"}
    ```
2. Unity의 `Packages Manager`에서 `Git URL` 방식으로 라이브러리를 추가합니다.
   주소: https://github.com/GameFrameX/com.gameframex.unity.objectstorage.git

3. 저장소를 직접 다운로드하여 Unity 프로젝트의 `Packages` 디렉토리에 배치하면 자동으로 로드 및 인식됩니다.
