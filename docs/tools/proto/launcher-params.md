# 启动参数

[[toc]]

---

用于处理导出器导出协议文件的工具

## 参数解析

| 参数名称                | 参数解析                          | 是否必填 | 详细描述                     |
|---------------------|-------------------------------|------|--------------------------|
| inputPath           | *.proto 所在文件夹路径               | 是    | 文件夹的路径.建议使用相对路径          |
| mode                | 解析模式请参考[导出模式](export-mode.md) | 是    | 参考[导出模式](export-mode.md) |
| outputPath          | 导出存储目录                        | 是    | 导出的协议文件存储路径              |
| namespaceName       | 命名空间                          | 是    | 命名空间                     |
| isGenerateErrorCode | 是否取消生成错误码字段                   | 否    | 是否取消生成错误码字段              |

## 最佳实践

### Unity客户端

```bat

ProtoExport.exe --mode unity --inputPath ./../../../../../Protobuf --outputPath ./../../../../../Unity/Assets/Hotfix/Proto --namespaceName Hotfix.Proto --isGenerateErrorCode true

```

### 服务器

```
ProtoExport.exe --mode server --inputPath ./../../../../../Protobuf --outputPath ./../../../../../Server/GameFrameX.Proto/Proto --namespaceName GameFrameX.Proto.Proto --isGenerateErrorCode true
```

### TS

```
ProtoExport.exe --mode typescript --inputPath ./../../../../../Protobuf --outputPath ./../../../../../Laya/src/gameframex/protobuf --namespaceName '' --isGenerateErrorCode true
```


