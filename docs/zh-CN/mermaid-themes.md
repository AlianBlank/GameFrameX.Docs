---
layout: page
title: Mermaid 主题预览
---

# Mermaid 主题预览

本文档展示了不同的 Mermaid 图表主题风格。

## 切换主题

当前主题配置保存在 `.vitepress/mermaid-themes.ts` 中，查看源码了解更多。

## 可用主题

| 主题名称 | 风格描述 |
|---------|---------|
| `cyberpunk` | 赛博朋克 - 青色+紫色霓虹 |
| `scifi` | 科幻深空 - 蓝色+银白 |
| `neon` | 炫彩霓虹 - 彩虹色渐变 |
| `documentation` | 文档风格 - 简洁专业白底 |
| `retroTerminal` | 复古终端 - 经典绿色 CRT |
| `darkHacker` | 暗夜极客 - 红色警告风格 |
| `amber` | 琥珀复古 - 暖色怀旧 |
| `aurora` | 极光北欧 - 冰蓝+紫罗兰 |

## 流程图示例

```mermaid
flowchart LR
    A[开始] --> B{判断}
    B -->|是| C[处理中]
    B -->|否| D[结束]
    C --> D
```

## 时序图示例

```mermaid
sequenceDiagram
    participant U as 用户
    participant S as 服务器
    participant D as 数据库

    U->>S: 请求数据
    S->>D: 查询
    D-->>S: 返回结果
    S-->>U: 响应
```

## 状态图示例

```mermaid
stateDiagram-v2
    [*] --> 初始状态
    初始状态 --> 处理中: 开始
    处理中 --> 成功: 完成
    处理中 --> 失败: 错误
    成功 --> [*]
    失败 --> [*]
```

## 类图示例

```mermaid
classDiagram
    class 动物 {
        +String 名称
        +int 年龄
        +移动()
        +进食()
    }
    class 狗 {
        +String 品种
        +吠叫()
    }
    class 猫 {
        +bool 是否家养
        +喵喵叫()
    }

    动物 <|-- 狗: 继承
    动物 <|-- 猫: 继承
```
