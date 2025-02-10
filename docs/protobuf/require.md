# 通讯协议规范

以下是我们设计协议的基础规范。

## 1. 消息命名规则

在通讯中，我们为不同类型消息定义了不同的开头名称:

- 请求消息: 必需以 `Req` 开头。
- 响应消息: 必需以 `Resp` 开头, 还包括特殊类别 `Notify`.

消息命名规则 `消息名称` 和 `消息字段` 和 `枚举名称` 和 `枚举定义`  必须遵守  `Upper Camel Case` 命名规则

## 2. 请求消息

请求消息分为两个类型: `Req`。以下是登录请求的例子:

- 使用 `Req`:

```protobuf
// 请求账号登录
message ReqLogin
{
  string UserName = 1;    // 用户名
  string Platform = 2;    // 平台
  int32 SdkType = 3;      // SDK类型
  string SdkToken = 4;    // SDK令牌
  string Device = 5;      // 设备
  string Password = 6;    // 密码
}
```

## 3. 响应消息

响应消息分为 `Resp` 和 `Notify` 两种。其中, `Resp` 默认会生成一个 ErrorCode 字段用于返回错误码。改值可以通过参数变量 `isGenerateErrorCode` 忽略生成

- `Resp` 用于响应请求:

```protobuf
// 请求账号登录返回
message RespLogin
{
  int32 Code = 1;         // errorCode
  string RoleName = 2;    // 账号名
  int64 Id = 3;           // 账号ID
  uint32 Level = 4;       // 账号等级
  int64 CreateTime = 5;   // 创建时间
}
```

- `Notify` 用于服务器端通知客户端:

```protobuf
// 通知背包数据变化
message NotifyBagInfoChanged
{
  map<int32, int64> ItemDic = 1; // 变化的道具，key:道具id，value:数量
}
```

## 4. 注释规范

对协议进行注释可以帮助我们理解实际运行中的协议内容。

- 在消息或枚举定义的前一行注释。例如:

```protobuf
// 请求心跳
message ReqHeartBeat
{
    int64 Timestamp = 1;
}
```

- 在消息字段的行尾注释。例如:

```protobuf
// 玩家信息
message PlayerInfo
{
  int64 Id = 1;   // 角色ID
  string Name = 2;    // 角色名
  uint32 Level = 3;   // 角色等级
  int32 State = 4;    // 角色状态
  uint32 Avatar = 5;  // 角色头像
  uint64 CurrentExp = 6;  // 角色当前经验
}
```
