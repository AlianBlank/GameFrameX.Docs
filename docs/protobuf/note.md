# 注意事项

## 注意事项

1. 对于`message`, `enum`或者任何自定义类型的嵌套，我们的系统是不提供支持的。

   示例1（错误）:
    ```
    // 返回请求角色创建
        message RespPlayerCreate
        {
            message PhoneNumber
            {
                string number = 1;
                PhoneType type = 2;
            }
            PlayerInfo PlayerInfo = 1; // 角色信息
        }
    ```
   示例2（错误）:
    ```
    // 请求背包数据
      message ReqBagInfo
      {
         enum BagType
         {
            Default = 0; // 默认
            Pet = 1; // 宠物
         }
         BagType BagType = 1; // 背包类型
      }
    ```

2. 我们只支持 `proto3` 协议，因此，请在协议头部声明 `syntax = "proto3";`。

3. 系统不支持协议中的RPC定义。

4. 需要在协议头部定义模块ID `option module = 1;`，模块ID必须小于30000，且大于0。超过该值的解析器和通信可能会出现异常。

   消息头部定义示例:
    ```
    syntax = "proto3";
    package Basic;
    option module = 10; // 此值必须定义。
    // 请求心跳
    message ReqHeartBeat
    {
       int64 Timestamp = 1; // 时间戳
    }
    ```
5. 消息的 `Member` ID 必须小于800，大于800的值为系统预留。

   示例（错误）:
    ```
    // 请求心跳
    message ReqHeartBeat
    {
       int64 Timestamp = 820; // 此值在解析器中会抛出解析异常。
    }
    ```

6. 在返回的消息中不能定义名称为 `ErrorCode` 的 Member 字段名称。这个值是系统预留的。

   示例（错误）:
    ```
    // 消息中的错误码会回复每次请求
    message RespErrorCode
    {
       int64 ErrorCode = 1; // 0：表示无错误。在导出时，将与系统导出的错误码定义冲突
       string Desc = 2; // 错误描述（非0时有效）
    }
    ```

7. 不可定义空消息，否则可能会遇到不可预知的错误。

   示例1（错误）:
    ```
    // 请求心跳，未定义消息体。在传输中消息不包含任何内容，将被视为无效消息。可能会导致链接断开或解析异常
    message ReqHeartBeat
    {
    }
    ```
   示例2（正确）:
    ```
    // 请求心跳
    message ReqHeartBeat
    {
       int64 Timestamp = 1; // 时间戳
    }
    ```
