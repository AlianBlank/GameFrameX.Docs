# 构建Docker镜像

[[toc]]

---
构建到 Docker 镜像

## 准备工作

1. 你必须在构建的机器上安装 docker
2. docker 必须处于正常运行的状态

### 如何安装Docker

请切换到Docker 官网  [https://www.docker.com/](https://www.docker.com/)

## 执行构建命令

1. 打开命令行工具
2. cd 到当前项目根目录(.sln 文件所在目录)
3. 执行以下命令操作

```shell

docker build -t gameframex.launcher:1.0.0.0 .

```

### 参数解析:

> `-t` 为镜像名称
> `-t 镜像名称:` 为版本号

:::tip

最后的 `.` 必不可少

:::
