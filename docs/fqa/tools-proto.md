# 协议工具 常见问题

## 导出协议提示 `Module not foud`

需要在协议的头部加上 以下内容

```protobuf
option module = 10; // 此值必须定义。
```

module 后面的值.每个文件应该是唯一的.不然协议初始化会报错
