# 自动化构建

[[toc]]
---

## 步骤函数列表

| 步骤函数        | 函数描述     | 
|-------------|----------|
| BuildReady  | 准备构建环境   | 
| BuildAsset  | 构建资源     |  
| BuildApk    | 构建APK    | 
| BuildDouYin | 构建DouYin | 

## 参数解析

| 参数                        | 参数描述                                             |
|---------------------------|--------------------------------------------------|
| LogFilePath               | 日志文件路径                                           |
| IsUploadLogFile           | 是否上传日志文件.每个任务结束都可以上传当次任务的日志文件,默认为 `false`        |
| BuildNumber               | 构建序列号.每个任务是唯一的                                   |
| ObjectStorageBucketName   | 对象存储桶的名称                                         |
| ObjectStorageKey          | 对象存储桶的Key                                        |
| ObjectStorageSecret       | 对象存储桶的秘钥                                         |
| JobName                   | 任务名称                                             |
| PackageName               | 资源包的名称,默认为 `DefaultPackage` ,当使用 `BuildAsset` 有效 |
| IsIncrementalBuildPackage | 是否使用增量构建资源包.默认为 `false`, 当使用 `BuildAsset` 有效     |
| IsUploadAsset             | 是否上传打包后的资源.默认为 `false`, 当使用 `BuildAsset` 有效      |
| UploadAssetSavePath       | 上传打包后的资源存储路径.默认为 `/`,当使用 `BuildAsset` 有效         |
| IsUploadApk               | 是否上传打包后的APK.默认为 `false`, 当使用 `BuildApk` 有效       |

## 步骤解析

### BuildReady 准备构建环境

::: tip

这个步骤必须在第一步执行

:::

这里会执行HybridCLR的安装检测和生成AOT列表。这里如果代码没有进行大量改动的时候不需要多次执行。加速打包。

### BuildAsset 构建资源

这里会构建资源包。可以多次执行。每次构建完成都可以上传资源包到对象存储

### BuildApk 构建APK

这里会构建发布包。构建完成可以上传到对象存储

