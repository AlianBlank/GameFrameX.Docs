# HTTP请求短连接

## 1. 组件概述

GameFrameX.Web 是一个用于 Unity 的 HTTP 网络请求组件，提供了简单易用的 HTTP GET 和 POST 请求功能。该组件基于 C# 的 Task 异步模式设计，支持字符串和二进制数据的请求与响应，并提供了 JSON 数据处理的扩展功能。

### 主要特性

- 支持 HTTP GET 和 POST 请求
- 支持字符串和二进制数据的请求与响应
- 支持设置请求头和查询参数
- 支持自定义超时时间
- 提供 JSON 数据处理的扩展功能
- 支持 Protocol Buffer 消息（需启用相关宏定义）

## 2. 安装方法

有以下三种方式安装 GameFrameX.Web 组件：

1. 直接在 `manifest.json` 文件中的 `dependencies` 节点下添加以下内容：
   ```json
   {"com.gameframex.unity.web": "https://github.com/gameframex/com.gameframex.unity.web.git"}
   ```

2. 在 Unity 的 `Packages Manager` 中使用 `Git URL` 方式添加库，地址为：
   ```
   https://github.com/gameframex/com.gameframex.unity.web.git
   ```

3. 直接下载仓库放置到 Unity 项目的 `Packages` 目录下，会自动加载识别。

## 3. 基本用法

### 3.1 组件初始化

将 WebComponent 添加到场景中的游戏对象上。组件会在 Awake 方法中自动初始化 WebManager 并设置超时时间。

```csharp
// 获取 WebComponent 实例
WebComponent webComponent = GetComponent<WebComponent>();

// 设置超时时间（可选，默认为 5 秒）
webComponent.Timeout = 10f;
```

### 3.2 发送 GET 请求

#### 3.2.1 基本 GET 请求（返回字符串）

```csharp
string url = "https://api.example.com/data";
Task<WebStringResult> task = webComponent.GetToString(url);

// 使用 await 等待请求完成
WebStringResult result = await task;

// 获取响应内容
string responseText = result.Result;
```

#### 3.2.2 带查询参数的 GET 请求

```csharp
string url = "https://api.example.com/data";
Dictionary<string, string> queryParams = new Dictionary<string, string>
{
    {"id", "123"},
    {"name", "test"}
};

WebStringResult result = await webComponent.GetToString(url, queryParams);
```

#### 3.2.3 带请求头的 GET 请求

```csharp
string url = "https://api.example.com/data";
Dictionary<string, string> queryParams = new Dictionary<string, string>();
Dictionary<string, string> headers = new Dictionary<string, string>
{
    {"Authorization", "Bearer token123"},
    {"Content-Type", "application/json"}
};

WebStringResult result = await webComponent.GetToString(url, queryParams, headers);
```

#### 3.2.4 GET 请求返回二进制数据

```csharp
string url = "https://example.com/image.jpg";
WebBufferResult result = await webComponent.GetToBytes(url);

// 获取二进制数据
byte[] imageData = result.Result;
```

### 3.3 发送 POST 请求

#### 3.3.1 基本 POST 请求（返回字符串）

```csharp
string url = "https://api.example.com/submit";
Dictionary<string, object> formData = new Dictionary<string, object>
{
    {"username", "user1"},
    {"password", "pass123"}
};

WebStringResult result = await webComponent.PostToString(url, formData);
```

#### 3.3.2 带查询参数的 POST 请求

```csharp
string url = "https://api.example.com/submit";
Dictionary<string, object> formData = new Dictionary<string, object>();
Dictionary<string, string> queryParams = new Dictionary<string, string>
{
    {"version", "1.0"}
};

WebStringResult result = await webComponent.PostToString(url, formData, queryParams);
```

#### 3.3.3 带请求头的 POST 请求

```csharp
string url = "https://api.example.com/submit";
Dictionary<string, object> formData = new Dictionary<string, object>();
Dictionary<string, string> queryParams = new Dictionary<string, string>();
Dictionary<string, string> headers = new Dictionary<string, string>
{
    {"Authorization", "Bearer token123"}
};

WebStringResult result = await webComponent.PostToString(url, formData, queryParams, headers);
```

#### 3.3.4 POST 请求返回二进制数据

```csharp
string url = "https://api.example.com/upload";
Dictionary<string, object> formData = new Dictionary<string, object>
{
    {"file", fileBytes}
};

WebBufferResult result = await webComponent.PostToBytes(url, formData);
```

## 4. JSON 数据处理

### 4.1 使用 HttpJsonResultHelper 处理 JSON 响应

```csharp
// 发送请求获取 JSON 字符串
WebStringResult webResult = await webComponent.GetToString("https://api.example.com/data");

// 将 JSON 字符串转换为强类型对象
HttpJsonResultData<UserInfo> resultData = webResult.Result.ToHttpJsonResultData<UserInfo>();

// 检查请求是否成功
if (resultData.IsSuccess)
{
    // 使用转换后的数据对象
    UserInfo userInfo = resultData.Data;
    Debug.Log($"用户名: {userInfo.Username}");
}
else
{
    Debug.LogError($"请求失败，错误码: {resultData.Code}");
}
```

### 4.2 HttpJsonResult 和 HttpJsonResultData 类

- `HttpJsonResult` 类表示服务器返回的标准 JSON 格式，包含 `code`、`message` 和 `data` 字段。
- `HttpJsonResultData<T>` 类用于封装处理后的结果，包含 `IsSuccess`、`Code` 和 `Data` 属性。

## 5. Protocol Buffer 支持

当启用 `ENABLE_GAME_FRAME_X_WEB_PROTOBUF_NETWORK` 宏定义时，可以使用 Protocol Buffer 消息：

```csharp
// 创建 Protocol Buffer 消息
LoginRequest loginRequest = new LoginRequest
{
    Username = "user1",
    Password = "pass123"
};

// 发送请求并接收 Protocol Buffer 响应
LoginResponse response = await webComponent.Post<LoginResponse>("https://api.example.com/login", loginRequest);
```

## 6. 错误处理

```csharp
try
{
    WebStringResult result = await webComponent.GetToString("https://api.example.com/data");
    // 处理成功响应
}
catch (TimeoutException e)
{
    // 处理请求超时
    Debug.LogError($"请求超时: {e.Message}");
}
catch (Exception e)
{
    // 处理其他异常
    Debug.LogError($"请求失败: {e.Message}");
}
```

## 7. 自定义用户数据

所有请求方法都支持传入自定义用户数据，这些数据会在响应结果中原样返回：

```csharp
// 传入自定义用户数据
string requestId = Guid.NewGuid().ToString();
WebStringResult result = await webComponent.GetToString(url, userData: requestId);

// 在响应中获取用户数据
string returnedRequestId = (string)result.UserData;
Debug.Log($"请求 ID: {returnedRequestId}");
```

## 8. 注意事项

1. 所有网络请求都是异步执行的，建议使用 `async/await` 模式处理。
2. 默认超时时间为 5 秒，可以通过 `Timeout` 属性调整。
3. 请求可能会抛出异常，建议使用 try-catch 块进行错误处理。
4. 对于大文件的上传和下载，建议使用二进制数据方法（GetToBytes/PostToBytes）。

---