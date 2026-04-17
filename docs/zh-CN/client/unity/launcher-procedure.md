# 启动流程

---

[[toc]]

## 客户端基础启动流程

本文档使用 Mermaid 展示游戏客户端的启动流程。

### 流程图 (Flowchart)

```mermaid
flowchart TD
    A[程序启动] --> B{检查更新}
    B -->|需要更新| C[下载热更新资源]
    C --> D[解压并应用更新]
    D --> E{资源加载}
    B -->|无需更新| E
    E -->|成功| F[初始化框架]
    E -->|失败| G[显示错误提示]
    F --> H[加载配置表]
    H --> I[初始化网络模块]
    I --> J[连接服务器]
    J --> K[登录认证]
    K --> L[加载游戏数据]
    L --> M[进入游戏主界面]
    G --> Z[退出程序]
```

### 时序图 (Sequence Diagram)

```mermaid
sequenceDiagram
    participant C as 客户端
    participant N as 网络模块
    participant S as 游戏服务器
    participant A as 认证服务

    C->>N: 启动网络模块
    N->>S: 建立TCP连接
    S-->>N: 连接成功
    C->>N: 发送登录请求
    N->>A: 转发认证请求
    A-->>N: 返回Token
    N-->>C: 登录成功
    C->>N: 请求角色列表
    N->>S: 获取角色数据
    S-->>N: 返回角色信息
    N-->>C: 显示角色选择界面
```

### 状态图 (State Diagram)

```mermaid
stateDiagram-v2
    [*] --> 启动中: 程序入口
    启动中 --> 检查更新: 初始化完成
    检查更新 --> 下载更新: 发现新版本
    检查更新 --> 资源加载: 已是最新
    下载更新 --> 解压资源: 下载完成
    解压资源 --> 资源加载: 解压成功
    资源加载 --> 框架初始化: 资源就绪
    框架初始化 --> 配置加载: 框架就绪
    配置加载 --> 网络初始化: 配置完成
    网络初始化 --> 连接服务器: 网络就绪
    连接服务器 --> 登录认证: 连接成功
    登录认证 --> 选择服务器: 认证成功
    选择服务器 --> 加载数据: 服务器已选
    加载数据 --> 进入游戏: 数据加载完成
    进入游戏 --> [*]: 退出游戏
```

### 类图 (Class Diagram)

```mermaid
classDiagram
    class Entry {
        +Awake()
        +Start()
        +Update()
        +OnDestroy()
        -m_ConfigManager: ConfigManager
        -m_NetworkManager: NetworkManager
        +Launch()
    }

    class ConfigManager {
        +LoadAll()
        +GetConfig<T>(id): T
        -m_Configs: Dictionary~string, object~
    }

    class NetworkManager {
        +Connect(ip: string, port: int)
        +Send<T>(message: T)
        +OnReceive(callback: Action~Message~)
        -m_Socket: TcpSocket
    }

    class GameServer {
        +Player: PlayerState
        +SendMessage<T>(msg: T)
        +RegisterHandler(handler: IHandler)
    }

    Entry --> ConfigManager
    Entry --> NetworkManager
    NetworkManager --> GameServer
```

### 甘特图 (Gantt Chart)

```mermaid
gantt
    title Unity 客户端启动流程
    dateFormat  X
    axisFormat %sms

    section 初始化
    检查更新           :done,    init1, 0, 500ms
    下载热更新         :active,   init2, after init1, 2000ms
    解压资源          :done,    init3, after init2, 500ms

    section 加载
    加载配置表         :done,    load1, after init3, 300ms
    加载资源Bundle    :active,   load2, after load1, 1500ms
    初始化ILRuntime   :done,    load3, after load1, 400ms

    section 连接
    连接网关服务器     :active,   conn1, after load3, 200ms
    登录认证          :crit,    conn2, after conn1, 150ms
    获取角色数据       :crit,    conn3, after conn2, 100ms
```

### 实体关系图 (ER Diagram)

```mermaid
erDiagram
    PLAYER ||--o{ CHARACTER : has
    CHARACTER ||--|| INVENTORY : owns
    CHARACTER }o--o{ SKILL : learns
    PLAYER ||--|| PLAYER_SETTINGS : has

    PLAYER {
        long id PK
        string name
        int level
        datetime create_time
    }

    CHARACTER {
        long id PK
        long player_id FK
        string name
        int career_id
        int level
    }

    INVENTORY {
        long id PK
        long character_id FK
        json items
    }

    SKILL {
        int id PK
        string name
        string type
    }

    PLAYER_SETTINGS {
        long id PK
        long player_id FK
        json settings
    }
```

### 用户旅程图 (User Journey)

```mermaid
journey
    title 游戏启动用户旅程

    section 首次启动
      检查更新: 1: 新用户
      下载资源: 2: 新用户
      创建角色: 5: 新用户
      进入游戏: 5: 新用户

    section 日常登录
      连接服务器: 4: 老玩家
      快速开始: 5: 老玩家
      继续游戏: 5: 老玩家
```

## 总结

使用 Mermaid 图表可以清晰地展示：
- **流程图**：展示程序执行逻辑
- **时序图**：展示模块间交互顺序
- **状态图**：展示对象状态变化
- **类图**：展示系统架构和类关系
- **甘特图**：展示任务执行时间线
- **ER图**：展示数据模型关系
- **用户旅程**：展示用户体验流程
