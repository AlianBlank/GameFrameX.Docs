# 发布到私有镜像

[[toc]]

---

发布镜像到阿里云私有容器镜像服务

## 私有镜像(aliyun)

1. 打开阿里云的容器镜像服务。找到个人服务。企业的没用过。
2. 创建命名空间
3. 创建镜像
4. 登录容器管理中心

```
docker login --username={这里替换成你自己的用户名} registry.cn-shenzhen.aliyuncs.com
```

:::tip

registry.cn-shenzhen.aliyuncs.com 替换为你自己的服务地址

:::

## 1. 设置容器镜像关联

1. 设置容器关联

```
docker tag gameframex.launcher:1.0.0.0 registry.cn-shenzhen.aliyuncs.com/gameframex/gameframex.launcher:1.0.0.0
```

:::tip

必须要在前面已经登录的情况下执行

:::

## 2. 推送镜像

```
docker push registry.cn-shenzhen.aliyuncs.com/gameframex/gameframex.launcher:1.0.0.0
```

等待推送完成即可.

:::tip

每次的版本号不能和之前的相同.不然会推送失败

:::
