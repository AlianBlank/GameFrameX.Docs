# 网络协议

## 协议规则

协议头 为 14 字节

分别是4(消息长度(int32类型))+1(消息操作类型(byte类型))+1(消息压缩位(byte类型))+4(消息唯一序列ID(int32类型))+4(消息ID(
int32类型))

### 消息长度

范围为12-(2^32-1)

### 消息操作类型

范围值0-255

### 消息压缩位

范围值0-255

### 消息唯一序列ID

范围为(-2^32)-(2^32-1)

### 消息ID

该值为 Tools 自动生成.由模块和消息序号组合而成

范围为(-2^32)-(2^32-1)
