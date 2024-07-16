# 部署到服务器

## 最佳实践

1. 登录容器镜像服务.参考 [publish.md](publish.md#私有镜像aliyun)

## 使用 `docker-compose.yml`

```yaml
services:
  server.game:
    image: registry.cn-shenzhen.aliyuncs.com/gameframex/server.launcher:1.0.0
    container_name: game
    ports:
      - 20001:20001
      - 8898:8898
      - 25001:25001
    environment:
      - ServerType=Game
      - ServerId=000
      - APMPort=9090
      - InnerIp=127.0.0.1
      - InnerPort=9001
      - OuterIp=127.0.0.1
      - OuterPort=9010
      - MinModuleId=
      - MaxModuleId=999
      - WsPort=9110
      - DiscoveryCenterIp=127.0.0.1
      - DiscoveryCenterPort=1001
      - HttpCode=inner_httpcode
      - DataBaseUrl="mongodb+srv://gameframex:xxx@gameframex.db.mongodb.net/?retryWrites=true&w=majority"
      - DataBaseName=gameframex
    volumes:
      - "./running/hotfix:/app/hotfix"
      - "./running/json:/app/json"
    networks:
      - frontend
      - backend
networks:
  frontend:
    name: gameframex-frontend
    driver: bridge
  backend:
    name: gameframex-backend
    driver: bridge

```

## 参数解析:

- `container_name` 容器的名称.按照你的业务需求重新修改命名.名字不能和已有的镜像服务重复

- `environment` 启动参数.参考: [launcher-params.md](../server/launcher-params.md#参数解析)

- `volumes` 目录映射.因为需要热更新.`hotfix.dll`
  和配置表都将从这里映射出来.不然无法操作镜像内的文件.如果目录不存在.必须新建一个目录.将`hotfix.dll`
  和配置表文件上传到该文件夹下.不然启动会报错

:::tip

日志文件.在发布之后看不见.

:::
