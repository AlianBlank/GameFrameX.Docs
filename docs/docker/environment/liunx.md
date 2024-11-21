# 无界面的Linux 服务器

## Ubuntu 安装

### 1. 安装前先卸载操作系统默认安装的docker

```shell
sudo apt-get remove docker docker-engine docker.io containerd runc
```

### 2. 安装必要支持

```shell
sudo apt install apt-transport-https ca-certificates curl software-properties-common gnupg lsb-release
```

### 3. 阿里源（推荐使用阿里的gpg KEY）

```shell
curl -fsSL https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

### 4. 阿里apt源

```shell
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://mirrors.aliyun.com/docker-ce/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

### 5. 更新源

```shell
sudo apt update
sudo apt-get update
```

### 6. 安装最新版本的Docker

```shell
sudo apt install docker-ce docker-ce-cli containerd.io
```

### 7. 等待安装完成

### 8. 查看Docker版本

```shell
sudo docker version
```

### 9. 查看Docker运行状态

```shell
sudo systemctl status docker
```

### 10. 配置镜像服务

```shell
sudo tee /etc/docker/daemon.json <<-'EOF'
{
    "registry-mirrors": [
        "https://docker.m.daocloud.io",
        "https://docker.1panel.live"
    ]
}
EOF
```

### 11. 重启Docker

```shell
sudo systemctl daemon-reload && sudo systemctl restart docker
```

### 12. 测试是否正常

```shell
docker run hello-world
```

看见差不多以下内容：表示配置成功

```text
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
c1ec31eb5944: Pull complete 
Digest: sha256:305243c734571da2d100c8c8b3c3167a098cab6049c9a5b066b6021a60fcb966
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/

```

## Ubuntu 卸载

### 1. 卸载 Docker Engine、CLI、containerd 和 Docker Compose 软件包：

```shell
sudo apt-get purge docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin docker-ce-rootless-extras
```

### 2. 主机上的映像、容器、卷或自定义配置文件 不会自动删除。要删除所有镜像、容器和卷，请执行以下操作：

```shell
sudo apt-get purge docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin docker-ce-rootless-extras
```

### 3. 删除源列表和密钥环

```shell
sudo rm /etc/apt/sources.list.d/docker.list
sudo rm /etc/apt/keyrings/docker.asc
```

### 4. 删除配置文件目录

```shell
rm -rf /etc/docker/
```