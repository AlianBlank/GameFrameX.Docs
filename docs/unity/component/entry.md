# 入口

GameFrameX 的 组件入口 组件,提供快捷获取其他组件的方式

---

[[toc]]

## 入口列表
目前只编写了基础的入口列表.

### 资源

### 配置

### 协程

### 下载

### 有限状态机

### 流程

### 存档

### 声音

### 事件

### Mono

### 全局配置

### 场景

### 长连接 Socket

### 短连接 HTTP

### FUI

### 计时器

### 实体对象

## 使用方式(任选其一)

1. 直接在 `manifest.json` 的文件中的 `dependencies` 节点下添加以下内容
   ```json
      {"com.gameframex.unity.entry": "https://github.com/GameFrameX/com.gameframex.unity.entry.git"}
    ```
2. 在Unity 的`Packages Manager` 中使用`Git URL`
   的方式添加库,地址为：https://github.com/GameFrameX/com.gameframex.unity.entry.git

3. 直接下载仓库放置到Unity 项目的`Packages` 目录下。会自动加载识别
