export interface LandingTranslations {
  hero: {
    name: string;
    text: string;
    tagline: string;
    actions: { theme: string; text: string; link: string }[];
  };
  features: {
    icon: string;
    title: string;
    details: string;
  }[];
  codeDemo: {
    title: string;
    subtitle: string;
    protocolBadge: string;
    clientLabel: string;
    serverLabel: string;
  };
  progressiveArchitecture: {
    title: string;
    subtitle: string;
    phases: {
      title: string;
      audience: string;
      capabilities: string[];
    }[];
    baseline: string;
  };
  engineGrid: {
    title: string;
    subtitle: string;
    engines: { name: string; desc: string }[];
  };
  useCases: {
    title: string;
    cases: {
      icon: string;
      title: string;
      bullets: string[];
    }[];
    metrics: { value: string; label: string }[];
  };
  quickStart: {
    title: string;
    subtitle: string;
    sourceLabel: string;
    dockerLabel: string;
    sourceLines: { text: string; isComment: boolean }[];
    dockerLines: { text: string; isComment: boolean }[];
    copy: string;
    copied: string;
  };
  cta: {
    title: string;
    subtitle: string;
    primary: string;
    secondary: string;
  };
}

const en: LandingTranslations = {
  hero: {
    name: 'Game Frame X',
    text: 'Unified C# Stack, Focused on Great Games',
    tagline: 'ProtoBuf-Driven · Unified Conventions · Progressive Architecture',
    actions: [
      { theme: 'brand', text: 'Get Started', link: '/en/client/unity/' },
      { theme: 'alt', text: 'Architecture', link: '/en/server/' },
    ],
  },
  features: [
    { icon: '🔗', title: 'Unified Language: C#', details: 'Client and server share the same C# language and ecosystem. Know C#? You can build full-stack games. No context switching.' },
    { icon: '📡', title: 'Unified Protocol: ProtoBuf', details: 'Protocol definitions are documentation. Auto-generate code for both ends, type-safe and forward-compatible. No hand-written serialization, no duplicate code.' },
    { icon: '📐', title: 'Unified Conventions', details: 'Strong conventions for directory structure, naming, and message patterns. One developer or ten — consistent code style, instant onboarding.' },
  ],
  codeDemo: {
    title: 'Define Once, Generate Both Ends',
    subtitle: 'Client and server share the same language and protocol definitions — no context switching.',
    protocolBadge: 'Shared Protocol',
    clientLabel: 'Client',
    serverLabel: 'Server',
  },
  progressiveArchitecture: {
    title: 'Progressive Architecture',
    subtitle: 'From solo prototype to live service — the same framework grows with your game.',
    phases: [
      {
        title: 'Solo Prototype',
        audience: 'Learners',
        capabilities: ['Any Engine', 'Client Only', 'Rapid Prototyping'],
      },
      {
        title: 'Multiplayer Game',
        audience: 'Indie Devs',
        capabilities: ['+ ProtoBuf', '+ C# Server', '+ MongoDB'],
      },
      {
        title: 'Live Operations',
        audience: 'Small Teams',
        capabilities: ['+ Docker', '+ Hot Reload', '+ DevOps Tools'],
      },
    ],
    baseline: 'Always the same: C# + ProtoBuf + Strong Conventions',
  },
  engineGrid: {
    title: 'Multi-Engine Support',
    subtitle: 'Choose your engine. The server stays the same.',
    engines: [
      { name: 'Unity', desc: 'Industry-leading engine with full HybridCLR hot reload support' },
      { name: 'Godot', desc: 'Open-source engine with growing C# ecosystem' },
      { name: 'LayaBox', desc: 'Web-first engine for cross-platform browser games' },
      { name: 'Cocos Creator', desc: 'Lightweight engine dominant in the mini-game market' },
    ],
  },
  useCases: {
    title: 'Built for Every Stage',
    cases: [
      {
        icon: '🎮',
        title: 'Game Development Learners',
        bullets: ['Learn C# full-stack game dev', 'Practice with multiple engines', 'Progressive learning curve'],
      },
      {
        icon: '🛠️',
        title: 'Indie Game Developers',
        bullets: ['Handle client + server solo', 'Rapid prototyping', 'Low-cost deployment'],
      },
      {
        icon: '👥',
        title: 'Small Teams',
        bullets: ['Unified coding conventions', 'Consistent code style', 'Efficient collaboration'],
      },
    ],
    metrics: [
      { value: '500+', label: 'GitHub Stars' },
      { value: '4', label: 'Game Engines' },
      { value: '100%', label: 'C# Codebase' },
    ],
  },
  quickStart: {
    title: 'Quick Start',
    subtitle: 'Get your game server running in 3 minutes.',
    sourceLabel: 'Source',
    dockerLabel: 'Docker',
    sourceLines: [
      { text: '# Clone the repository', isComment: true },
      { text: 'git clone https://github.com/GameFrameX/GameFrameX.Server.git', isComment: false },
      { text: 'cd GameFrameX.Server', isComment: false },
      { text: '', isComment: false },
      { text: '# Build', isComment: true },
      { text: 'dotnet restore && dotnet build', isComment: false },
      { text: '', isComment: false },
      { text: '# Run the game server', isComment: true },
      { text: 'dotnet run --project GameFrameX.Launcher \\', isComment: false },
      { text: '  --ServerType=Game --ServerId=1000', isComment: false },
    ],
    dockerLines: [
      { text: '# Start with Docker Compose', isComment: true },
      { text: 'docker compose up -d', isComment: false },
      { text: '', isComment: false },
      { text: '# Services:', isComment: true },
      { text: '#   MongoDB    → localhost:27017', isComment: true },
      { text: '#   TCP        → localhost:29100', isComment: true },
      { text: '#   WebSocket  → localhost:29110', isComment: true },
      { text: '#   HTTP       → localhost:28080', isComment: true },
    ],
    copy: 'Copy',
    copied: 'Copied!',
  },
  cta: {
    title: 'Launch Your Game Server in 3 Minutes',
    subtitle: 'Join the growing community of developers using GameFrameX.',
    primary: 'Get Started',
    secondary: 'View on GitHub',
  },
};

const zhCN: LandingTranslations = {
  hero: {
    name: 'Game Frame X',
    text: '统一 C# 技术栈，专注做好游戏',
    tagline: 'ProtoBuf 协议驱动 · 全端统一规范 · 渐进式架构',
    actions: [
      { theme: 'brand', text: '快速开始', link: '/zh-CN/client/unity/' },
      { theme: 'alt', text: '了解架构', link: '/zh-CN/server/' },
    ],
  },
  features: [
    { icon: '🔗', title: '统一语言 C#', details: '客户端与服务端同为 C#，同一语言、同一生态。会 C# 就能开发全栈游戏，无需语言切换。' },
    { icon: '📡', title: '统一协议 ProtoBuf', details: '协议定义即文档，自动生成双端代码，类型安全且向前兼容。不手写序列化，不维护两份代码。' },
    { icon: '📐', title: '统一规范', details: '目录结构、命名约定、消息模式强约束。一个人和十个人一个写法，新人即插即用。' },
  ],
  codeDemo: {
    title: '一次定义，双端生成',
    subtitle: '客户端和服务端共享同一语言与协议定义，无需上下文切换。',
    protocolBadge: '共享协议',
    clientLabel: '客户端',
    serverLabel: '服务端',
  },
  progressiveArchitecture: {
    title: '渐进式架构',
    subtitle: '从单机原型到正式上线，同一个框架陪你成长。',
    phases: [
      {
        title: '单机原型',
        audience: '学习者',
        capabilities: ['任意引擎', '纯客户端', '快速原型'],
      },
      {
        title: '联机游戏',
        audience: '独立开发者',
        capabilities: ['+ ProtoBuf', '+ C# Server', '+ MongoDB'],
      },
      {
        title: '正式上线',
        audience: '小团队',
        capabilities: ['+ Docker', '+ 热更新', '+ 运维工具'],
      },
    ],
    baseline: '始终不变：C# + ProtoBuf + 强规范',
  },
  engineGrid: {
    title: '多引擎支持',
    subtitle: '选择你熟悉的引擎，服务端不变。',
    engines: [
      { name: 'Unity', desc: '行业领先引擎，完整支持 HybridCLR 热更新' },
      { name: 'Godot', desc: '开源引擎，C# 生态持续增长中' },
      { name: 'LayaBox', desc: 'Web 优先引擎，适合跨平台浏览器游戏' },
      { name: 'Cocos Creator', desc: '轻量级引擎，在小游戏领域占据主导' },
    ],
  },
  useCases: {
    title: '为每个阶段而生',
    cases: [
      {
        icon: '🎮',
        title: '游戏学习者',
        bullets: ['C# 全栈学习', '多引擎实践', '渐进式入门'],
      },
      {
        icon: '🛠️',
        title: '独立开发者',
        bullets: ['一个人搞定客户端 + 服务端', '快速出原型', '低成本上线'],
      },
      {
        icon: '👥',
        title: '团队协作',
        bullets: ['规范统一', '代码风格一致', '协作效率高'],
      },
    ],
    metrics: [
      { value: '500+', label: 'GitHub Stars' },
      { value: '4', label: '游戏引擎' },
      { value: '100%', label: 'C# 代码库' },
    ],
  },
  quickStart: {
    title: '快速开始',
    subtitle: '3 分钟启动你的游戏服务器。',
    sourceLabel: '源码安装',
    dockerLabel: 'Docker 部署',
    sourceLines: [
      { text: '# 克隆仓库', isComment: true },
      { text: 'git clone https://github.com/GameFrameX/GameFrameX.Server.git', isComment: false },
      { text: 'cd GameFrameX.Server', isComment: false },
      { text: '', isComment: false },
      { text: '# 构建', isComment: true },
      { text: 'dotnet restore && dotnet build', isComment: false },
      { text: '', isComment: false },
      { text: '# 启动游戏服务器', isComment: true },
      { text: 'dotnet run --project GameFrameX.Launcher \\', isComment: false },
      { text: '  --ServerType=Game --ServerId=1000', isComment: false },
    ],
    dockerLines: [
      { text: '# 使用 Docker Compose 启动', isComment: true },
      { text: 'docker compose up -d', isComment: false },
      { text: '', isComment: false },
      { text: '# 服务列表:', isComment: true },
      { text: '#   MongoDB    → localhost:27017', isComment: true },
      { text: '#   TCP        → localhost:29100', isComment: true },
      { text: '#   WebSocket  → localhost:29110', isComment: true },
      { text: '#   HTTP       → localhost:28080', isComment: true },
    ],
    copy: '复制',
    copied: '已复制!',
  },
  cta: {
    title: '3 分钟启动你的游戏服务器',
    subtitle: '加入越来越多使用 GameFrameX 的开发者社区。',
    primary: '开始使用',
    secondary: '在 GitHub 上查看',
  },
};

const zhTW: LandingTranslations = {
  hero: {
    name: 'Game Frame X',
    text: '統一 C# 技術棧，專注做好遊戲',
    tagline: 'ProtoBuf 協定驅動 · 全端統一規範 · 漸進式架構',
    actions: [
      { theme: 'brand', text: '快速開始', link: '/zh-TW/client/unity/' },
      { theme: 'alt', text: '了解架構', link: '/zh-TW/server/' },
    ],
  },
  features: [
    { icon: '🔗', title: '統一語言 C#', details: '用戶端與伺服器端同為 C#，同一語言、同一生態。會 C# 就能開發全棧遊戲，無需語言切換。' },
    { icon: '📡', title: '統一協定 ProtoBuf', details: '協定定義即文件，自動生成雙端程式碼，型別安全且向前相容。不手寫序列化，不維護兩份程式碼。' },
    { icon: '📐', title: '統一規範', details: '目錄結構、命名約定、訊息模式強約束。一個人和十個人一個寫法，新人即插即用。' },
  ],
  codeDemo: {
    title: '一次定義，雙端生成',
    subtitle: '用戶端和伺服器端共享同一語言與協定定義，無需上下文切換。',
    protocolBadge: '共享協定',
    clientLabel: '用戶端',
    serverLabel: '伺服器端',
  },
  progressiveArchitecture: {
    title: '漸進式架構',
    subtitle: '從單機原型到正式上線，同一個框架陪你成長。',
    phases: [
      {
        title: '單機原型',
        audience: '學習者',
        capabilities: ['任意引擎', '純用戶端', '快速原型'],
      },
      {
        title: '連線遊戲',
        audience: '獨立開發者',
        capabilities: ['+ ProtoBuf', '+ C# Server', '+ MongoDB'],
      },
      {
        title: '正式上線',
        audience: '小團隊',
        capabilities: ['+ Docker', '+ 熱更新', '+ 運維工具'],
      },
    ],
    baseline: '始終不變：C# + ProtoBuf + 強規範',
  },
  engineGrid: {
    title: '多引擎支援',
    subtitle: '選擇你熟悉的引擎，伺服器端不變。',
    engines: [
      { name: 'Unity', desc: '業界領先引擎，完整支援 HybridCLR 熱更新' },
      { name: 'Godot', desc: '開源引擎，C# 生態持續成長中' },
      { name: 'LayaBox', desc: 'Web 優先引擎，適合跨平台瀏覽器遊戲' },
      { name: 'Cocos Creator', desc: '輕量級引擎，在小遊戲領域佔據主導' },
    ],
  },
  useCases: {
    title: '為每個階段而生',
    cases: [
      {
        icon: '🎮',
        title: '遊戲學習者',
        bullets: ['C# 全棧學習', '多引擎實踐', '漸進式入門'],
      },
      {
        icon: '🛠️',
        title: '獨立開發者',
        bullets: ['一個人搞定用戶端 + 伺服器', '快速出原型', '低成本上線'],
      },
      {
        icon: '👥',
        title: '團隊協作',
        bullets: ['規範統一', '程式碼風格一致', '協作效率高'],
      },
    ],
    metrics: [
      { value: '500+', label: 'GitHub Stars' },
      { value: '4', label: '遊戲引擎' },
      { value: '100%', label: 'C# 程式碼庫' },
    ],
  },
  quickStart: {
    title: '快速開始',
    subtitle: '3 分鐘啟動你的遊戲伺服器。',
    sourceLabel: '原始碼安裝',
    dockerLabel: 'Docker 部署',
    sourceLines: [
      { text: '# 複製儲存庫', isComment: true },
      { text: 'git clone https://github.com/GameFrameX/GameFrameX.Server.git', isComment: false },
      { text: 'cd GameFrameX.Server', isComment: false },
      { text: '', isComment: false },
      { text: '# 建置', isComment: true },
      { text: 'dotnet restore && dotnet build', isComment: false },
      { text: '', isComment: false },
      { text: '# 啟動遊戲伺服器', isComment: true },
      { text: 'dotnet run --project GameFrameX.Launcher \\', isComment: false },
      { text: '  --ServerType=Game --ServerId=1000', isComment: false },
    ],
    dockerLines: [
      { text: '# 使用 Docker Compose 啟動', isComment: true },
      { text: 'docker compose up -d', isComment: false },
      { text: '', isComment: false },
      { text: '# 服務列表:', isComment: true },
      { text: '#   MongoDB    → localhost:27017', isComment: true },
      { text: '#   TCP        → localhost:29100', isComment: true },
      { text: '#   WebSocket  → localhost:29110', isComment: true },
      { text: '#   HTTP       → localhost:28080', isComment: true },
    ],
    copy: '複製',
    copied: '已複製!',
  },
  cta: {
    title: '3 分鐘啟動你的遊戲伺服器',
    subtitle: '加入越來越多使用 GameFrameX 的開發者社群。',
    primary: '開始使用',
    secondary: '在 GitHub 上查看',
  },
};

const ja: LandingTranslations = {
  hero: {
    name: 'Game Frame X',
    text: '統合 C# 技術スタックで、ゲーム開発に集中',
    tagline: 'ProtoBuf プロトコル駆動 · 全体統一規約 · プログレッシブアーキテクチャ',
    actions: [
      { theme: 'brand', text: 'クイックスタート', link: '/ja/client/unity/' },
      { theme: 'alt', text: 'アーキテクチャ', link: '/ja/server/' },
    ],
  },
  features: [
    { icon: '🔗', title: '統一言語: C#', details: 'クライアントとサーバーが同じ C# 言語とエコシステムを共有。C# を知っていればフルスタックゲーム開発が可能。コンテキストスイッチ不要。' },
    { icon: '📡', title: '統一プロトコル: ProtoBuf', details: 'プロトコル定義がそのままドキュメントに。両端のコードを自動生成、型安全で前方互換性あり。手書きシリアライゼーション不要、重複コードなし。' },
    { icon: '📐', title: '統一規約', details: 'ディレクトリ構造、命名規則、メッセージパターンの強い規約。1人でも10人でも同じコードスタイル、即座にオンボーディング。' },
  ],
  codeDemo: {
    title: '一度の定義で両端を自動生成',
    subtitle: 'クライアントとサーバーが同じ言語とプロトコル定義を共有 — コンテキストスイッチ不要。',
    protocolBadge: '共有プロトコル',
    clientLabel: 'クライアント',
    serverLabel: 'サーバー',
  },
  progressiveArchitecture: {
    title: 'プログレッシブアーキテクチャ',
    subtitle: '単機プロトタイプから本番運用まで、同じフレームワークが成長に寄り添います。',
    phases: [
      {
        title: '単機プロトタイプ',
        audience: '学習者',
        capabilities: ['任意エンジン', 'クライアントのみ', '高速プロトタイピング'],
      },
      {
        title: 'マルチプレイゲーム',
        audience: 'インディー開発者',
        capabilities: ['+ ProtoBuf', '+ C# Server', '+ MongoDB'],
      },
      {
        title: '本番運用',
        audience: '小規模チーム',
        capabilities: ['+ Docker', '+ ホットリロード', '+ 運用ツール'],
      },
    ],
    baseline: '常に変わらない：C# + ProtoBuf + 強い規約',
  },
  engineGrid: {
    title: 'マルチエンジン対応',
    subtitle: '使い慣れたエンジンを選んでください。サーバーはそのまま。',
    engines: [
      { name: 'Unity', desc: '業界トップのエンジン、HybridCLR ホットリロード完全対応' },
      { name: 'Godot', desc: 'オープンソースエンジン、C# エコシステム拡大中' },
      { name: 'LayaBox', desc: 'Web ファーストエンジン、クロスプラットフォームブラウザゲームに最適' },
      { name: 'Cocos Creator', desc: '軽量エンジン、ミニゲーム市場で支配的' },
    ],
  },
  useCases: {
    title: 'すべての段階に対応',
    cases: [
      {
        icon: '🎮',
        title: 'ゲーム開発学習者',
        bullets: ['C# フルスタック学習', 'マルチエンジン実践', '段階的な学習カーブ'],
      },
      {
        icon: '🛠️',
        title: 'インディー開発者',
        bullets: ['クライアント + サーバーを一人で', '高速プロトタイピング', '低コストデプロイ'],
      },
      {
        icon: '👥',
        title: 'チームコラボレーション',
        bullets: ['統一された規約', '一貫したコードスタイル', '効率的な協力'],
      },
    ],
    metrics: [
      { value: '500+', label: 'GitHub Stars' },
      { value: '4', label: 'ゲームエンジン' },
      { value: '100%', label: 'C# コードベース' },
    ],
  },
  quickStart: {
    title: 'クイックスタート',
    subtitle: '3 分でゲームサーバーを起動しましょう。',
    sourceLabel: 'ソース',
    dockerLabel: 'Docker',
    sourceLines: [
      { text: '# リポジトリをクローン', isComment: true },
      { text: 'git clone https://github.com/GameFrameX/GameFrameX.Server.git', isComment: false },
      { text: 'cd GameFrameX.Server', isComment: false },
      { text: '', isComment: false },
      { text: '# ビルド', isComment: true },
      { text: 'dotnet restore && dotnet build', isComment: false },
      { text: '', isComment: false },
      { text: '# ゲームサーバーを起動', isComment: true },
      { text: 'dotnet run --project GameFrameX.Launcher \\', isComment: false },
      { text: '  --ServerType=Game --ServerId=1000', isComment: false },
    ],
    dockerLines: [
      { text: '# Docker Compose で起動', isComment: true },
      { text: 'docker compose up -d', isComment: false },
      { text: '', isComment: false },
      { text: '# サービス一覧:', isComment: true },
      { text: '#   MongoDB    → localhost:27017', isComment: true },
      { text: '#   TCP        → localhost:29100', isComment: true },
      { text: '#   WebSocket  → localhost:29110', isComment: true },
      { text: '#   HTTP       → localhost:28080', isComment: true },
    ],
    copy: 'コピー',
    copied: 'コピー済み!',
  },
  cta: {
    title: '3 分でゲームサーバーを起動',
    subtitle: 'GameFrameX を利用する成長中の開発者コミュニティに参加しましょう。',
    primary: '始める',
    secondary: 'GitHub で見る',
  },
};

const ko: LandingTranslations = {
  hero: {
    name: 'Game Frame X',
    text: '통합 C# 기술 스택, 게임 개발에 집중',
    tagline: 'ProtoBuf 프로토콜 기반 · 전체 통일 규약 · 프로그레시브 아키텍처',
    actions: [
      { theme: 'brand', text: '빠른 시작', link: '/ko/client/unity/' },
      { theme: 'alt', text: '아키텍처', link: '/ko/server/' },
    ],
  },
  features: [
    { icon: '🔗', title: '통일 언어: C#', details: '클라이언트와 서버가 동일한 C# 언어와 생태계를 공유. C#을 알면 풀스택 게임 개발 가능. 컨텍스트 전환 불필요.' },
    { icon: '📡', title: '통일 프로토콜: ProtoBuf', details: '프로토콜 정의가 문서화. 양쪽 코드를 자동 생성, 타입 안전하고 전방향 호환. 수동 직렬화 불필요, 중복 코드 없음.' },
    { icon: '📐', title: '통일 규약', details: '디렉토리 구조, 명명 규칙, 메시지 패턴의 강력한 규약. 1명이든 10명이든 동일한 코드 스타일, 즉시 온보딩.' },
  ],
  codeDemo: {
    title: '한 번 정의로 양쪽 코드 자동 생성',
    subtitle: '클라이언트와 서버가 동일한 언어와 프로토콜 정의를 공유 — 컨텍스트 전환 불필요.',
    protocolBadge: '공유 프로토콜',
    clientLabel: '클라이언트',
    serverLabel: '서버',
  },
  progressiveArchitecture: {
    title: '프로그레시브 아키텍처',
    subtitle: '싱글 프로토타입에서 라이브 서비스까지, 같은 프레임워크가 성장을 함께합니다.',
    phases: [
      {
        title: '싱글 프로토타입',
        audience: '학습자',
        capabilities: ['임의 엔진', '클라이언트 전용', '빠른 프로토타이핑'],
      },
      {
        title: '멀티플레이어 게임',
        audience: '인디 개발자',
        capabilities: ['+ ProtoBuf', '+ C# Server', '+ MongoDB'],
      },
      {
        title: '라이브 서비스',
        audience: '소규모 팀',
        capabilities: ['+ Docker', '+ 핫 리로드', '+ DevOps 도구'],
      },
    ],
    baseline: '항상 동일: C# + ProtoBuf + 강력한 규약',
  },
  engineGrid: {
    title: '멀티 엔진 지원',
    subtitle: '익숙한 엔진을 선택하세요. 서버는 그대로.',
    engines: [
      { name: 'Unity', desc: '업계 최고 엔진, HybridCLR 핫 리로드 완전 지원' },
      { name: 'Godot', desc: '오픈소스 엔진, C# 생태계 지속 성장 중' },
      { name: 'LayaBox', desc: '웹 우선 엔진, 크로스 플랫폼 브라우저 게임에 적합' },
      { name: 'Cocos Creator', desc: '경량 엔진, 미니 게임 시장 지배적' },
    ],
  },
  useCases: {
    title: '모든 단계에 최적화',
    cases: [
      {
        icon: '🎮',
        title: '게임 개발 학습자',
        bullets: ['C# 풀스택 학습', '멀티 엔진 실습', '점진적 학습 곡선'],
      },
      {
        icon: '🛠️',
        title: '인디 게임 개발자',
        bullets: ['클라이언트 + 서버 1인 개발', '빠른 프로토타이핑', '저비용 배포'],
      },
      {
        icon: '👥',
        title: '팀 협업',
        bullets: ['통일된 규약', '일관된 코드 스타일', '효율적인 협력'],
      },
    ],
    metrics: [
      { value: '500+', label: 'GitHub Stars' },
      { value: '4', label: '게임 엔진' },
      { value: '100%', label: 'C# 코드베이스' },
    ],
  },
  quickStart: {
    title: '빠른 시작',
    subtitle: '3 분 안에 게임 서버를 시작하세요.',
    sourceLabel: '소스 코드',
    dockerLabel: 'Docker',
    sourceLines: [
      { text: '# 저장소 복제', isComment: true },
      { text: 'git clone https://github.com/GameFrameX/GameFrameX.Server.git', isComment: false },
      { text: 'cd GameFrameX.Server', isComment: false },
      { text: '', isComment: false },
      { text: '# 빌드', isComment: true },
      { text: 'dotnet restore && dotnet build', isComment: false },
      { text: '', isComment: false },
      { text: '# 게임 서버 실행', isComment: true },
      { text: 'dotnet run --project GameFrameX.Launcher \\', isComment: false },
      { text: '  --ServerType=Game --ServerId=1000', isComment: false },
    ],
    dockerLines: [
      { text: '# Docker Compose로 시작', isComment: true },
      { text: 'docker compose up -d', isComment: false },
      { text: '', isComment: false },
      { text: '# 서비스 목록:', isComment: true },
      { text: '#   MongoDB    → localhost:27017', isComment: true },
      { text: '#   TCP        → localhost:29100', isComment: true },
      { text: '#   WebSocket  → localhost:29110', isComment: true },
      { text: '#   HTTP       → localhost:28080', isComment: true },
    ],
    copy: '복사',
    copied: '복사됨!',
  },
  cta: {
    title: '3 분 안에 게임 서버 시작하기',
    subtitle: 'GameFrameX를 사용하는 성장하는 개발자 커뮤니티에 참여하세요.',
    primary: '시작하기',
    secondary: 'GitHub에서 보기',
  },
};

export const landingI18n: Record<string, LandingTranslations> = {
  en,
  'zh-CN': zhCN,
  'zh-TW': zhTW,
  ja,
  ko,
};
