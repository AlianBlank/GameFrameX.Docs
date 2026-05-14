export interface LandingTranslations {
  codeDemo: {
    title: string;
    subtitle: string;
    protocolBadge: string;
    clientLabel: string;
    serverLabel: string;
  };
  architecture: {
    title: string;
    subtitle: string;
    client: string;
    network: string;
    server: string;
    clientItems: string[];
    networkItems: string[];
    serverItems: string[];
  };
  engineGrid: {
    title: string;
    subtitle: string;
    engines: { name: string; desc: string }[];
  };
  stats: {
    title: string;
    items: { value: string; label: string }[];
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
  codeDemo: {
    title: 'Unified C# Stack',
    subtitle: 'Client and server share the same language and protocol definitions — no context switching.',
    protocolBadge: 'Shared Protocol',
    clientLabel: 'Client',
    serverLabel: 'Server',
  },
  architecture: {
    title: 'Client-Server Architecture',
    subtitle: 'A clean separation of concerns, powered by Message-Driven Architecture and Protocol Buffers.',
    client: 'Client Layer',
    network: 'Network Layer',
    server: 'Server Layer',
    clientItems: ['Unity', 'Godot', 'LayaBox', 'Cocos Creator'],
    networkItems: ['Protocol Buffers', 'TCP / WebSocket', 'Message Routing'],
    serverItems: ['HTTP Handlers', 'Message Handlers', 'Hot Reload'],
  },
  engineGrid: {
    title: 'Multi-Engine Support',
    subtitle: 'One server, any client. Choose your favorite game engine.',
    engines: [
      { name: 'Unity', desc: 'Industry-leading engine with full HybridCLR hot reload support' },
      { name: 'Godot', desc: 'Open-source engine with growing C# ecosystem' },
      { name: 'LayaBox', desc: 'Web-first engine for cross-platform browser games' },
      { name: 'Cocos Creator', desc: 'Lightweight engine dominant in the mini-game market' },
    ],
  },
  stats: {
    title: 'Trusted by Developers',
    items: [
      { value: '500+', label: 'GitHub Stars' },
      { value: '50+', label: 'Contributors' },
      { value: '4', label: 'Game Engines' },
      { value: '100%', label: 'C# Codebase' },
    ],
  },
  quickStart: {
    title: 'Quick Start',
    subtitle: 'Get your game server running in minutes.',
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
    title: 'Ready to Build Your Game?',
    subtitle: 'Join the growing community of developers using GameFrameX.',
    primary: 'Get Started',
    secondary: 'View on GitHub',
  },
};

const zhCN: LandingTranslations = {
  codeDemo: {
    title: 'C# 全栈统一',
    subtitle: '客户端和服务端共享同一语言与协议定义，无需上下文切换。',
    protocolBadge: '共享协议',
    clientLabel: '客户端',
    serverLabel: '服务端',
  },
  architecture: {
    title: '客户端-服务端架构',
    subtitle: '基于消息驱动架构和 Protocol Buffers 的清晰分层设计。',
    client: '客户端层',
    network: '网络层',
    server: '服务端层',
    clientItems: ['Unity', 'Godot', 'LayaBox', 'Cocos Creator'],
    networkItems: ['Protocol Buffers', 'TCP / WebSocket', '消息路由'],
    serverItems: ['HTTP 处理器', '消息处理器', '热重载'],
  },
  engineGrid: {
    title: '多引擎支持',
    subtitle: '一个服务端，任意客户端。选择你最喜爱的游戏引擎。',
    engines: [
      { name: 'Unity', desc: '行业领先引擎，完整支持 HybridCLR 热更新' },
      { name: 'Godot', desc: '开源引擎，C# 生态持续增长中' },
      { name: 'LayaBox', desc: 'Web 优先引擎，适合跨平台浏览器游戏' },
      { name: 'Cocos Creator', desc: '轻量级引擎，在小游戏领域占据主导' },
    ],
  },
  stats: {
    title: '开发者信赖之选',
    items: [
      { value: '500+', label: 'GitHub Stars' },
      { value: '50+', label: '贡献者' },
      { value: '4', label: '游戏引擎' },
      { value: '100%', label: 'C# 代码库' },
    ],
  },
  quickStart: {
    title: '快速开始',
    subtitle: '几分钟内启动你的游戏服务器。',
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
    title: '准备好构建你的游戏了吗？',
    subtitle: '加入越来越多使用 GameFrameX 的开发者社区。',
    primary: '开始使用',
    secondary: '在 GitHub 上查看',
  },
};

const zhTW: LandingTranslations = {
  codeDemo: {
    title: 'C# 全棧統一',
    subtitle: '用戶端和伺服器端共享同一語言與協定定義，無需上下文切換。',
    protocolBadge: '共享協定',
    clientLabel: '用戶端',
    serverLabel: '伺服器端',
  },
  architecture: {
    title: '用戶端-伺服器架構',
    subtitle: '基於訊息驅動架構和 Protocol Buffers 的清晰分層設計。',
    client: '用戶端層',
    network: '網路層',
    server: '伺服器層',
    clientItems: ['Unity', 'Godot', 'LayaBox', 'Cocos Creator'],
    networkItems: ['Protocol Buffers', 'TCP / WebSocket', '訊息路由'],
    serverItems: ['HTTP 處理器', '訊息處理器', '熱重載'],
  },
  engineGrid: {
    title: '多引擎支援',
    subtitle: '一個伺服器，任意用戶端。選擇你最喜愛的遊戲引擎。',
    engines: [
      { name: 'Unity', desc: '業界領先引擎，完整支援 HybridCLR 熱更新' },
      { name: 'Godot', desc: '開源引擎，C# 生態持續成長中' },
      { name: 'LayaBox', desc: 'Web 優先引擎，適合跨平台瀏覽器遊戲' },
      { name: 'Cocos Creator', desc: '輕量級引擎，在小遊戲領域佔據主導' },
    ],
  },
  stats: {
    title: '開發者信賴之選',
    items: [
      { value: '500+', label: 'GitHub Stars' },
      { value: '50+', label: '貢獻者' },
      { value: '4', label: '遊戲引擎' },
      { value: '100%', label: 'C# 程式碼庫' },
    ],
  },
  quickStart: {
    title: '快速開始',
    subtitle: '幾分鐘內啟動你的遊戲伺服器。',
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
    title: '準備好建構你的遊戲了嗎？',
    subtitle: '加入越來越多使用 GameFrameX 的開發者社群。',
    primary: '開始使用',
    secondary: '在 GitHub 上查看',
  },
};

const ja: LandingTranslations = {
  codeDemo: {
    title: 'C# フルスタック統一',
    subtitle: 'クライアントとサーバーが同じ言語とプロトコル定義を共有 — コンテキストスイッチ不要。',
    protocolBadge: '共有プロトコル',
    clientLabel: 'クライアント',
    serverLabel: 'サーバー',
  },
  architecture: {
    title: 'クライアント・サーバーアーキテクチャ',
    subtitle: 'メッセージ駆動アーキテクチャと Protocol Buffers によるクリーンなレイヤー分離。',
    client: 'クライアント層',
    network: 'ネットワーク層',
    server: 'サーバー層',
    clientItems: ['Unity', 'Godot', 'LayaBox', 'Cocos Creator'],
    networkItems: ['Protocol Buffers', 'TCP / WebSocket', 'メッセージルーティング'],
    serverItems: ['HTTP ハンドラ', 'メッセージハンドラ', 'ホットリロード'],
  },
  engineGrid: {
    title: 'マルチエンジン対応',
    subtitle: 'ひとつのサーバー、任意のクライアント。お好みのゲームエンジンを選択。',
    engines: [
      { name: 'Unity', desc: '業界トップのエンジン、HybridCLR ホットリロード完全対応' },
      { name: 'Godot', desc: 'オープンソースエンジン、C# エコシステム拡大中' },
      { name: 'LayaBox', desc: 'Web ファーストエンジン、クロスプラットフォームブラウザゲームに最適' },
      { name: 'Cocos Creator', desc: '軽量エンジン、ミニゲーム市場で支配的' },
    ],
  },
  stats: {
    title: '開発者に選ばれるフレームワーク',
    items: [
      { value: '500+', label: 'GitHub Stars' },
      { value: '50+', label: 'コントリビューター' },
      { value: '4', label: 'ゲームエンジン' },
      { value: '100%', label: 'C# コードベース' },
    ],
  },
  quickStart: {
    title: 'クイックスタート',
    subtitle: '数分でゲームサーバーを起動しましょう。',
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
    title: 'ゲーム開発を始めましょう',
    subtitle: 'GameFrameX を利用する成長中の開発者コミュニティに参加しましょう。',
    primary: '始める',
    secondary: 'GitHub で見る',
  },
};

const ko: LandingTranslations = {
  codeDemo: {
    title: 'C# 풀스택 통합',
    subtitle: '클라이언트와 서버가 동일한 언어와 프로토콜 정의를 공유 — 컨텍스트 전환 불필요.',
    protocolBadge: '공유 프로토콜',
    clientLabel: '클라이언트',
    serverLabel: '서버',
  },
  architecture: {
    title: '클라이언트-서버 아키텍처',
    subtitle: '메시지 기반 아키텍처와 Protocol Buffers 기반의 명확한 계층 분리.',
    client: '클라이언트 계층',
    network: '네트워크 계층',
    server: '서버 계층',
    clientItems: ['Unity', 'Godot', 'LayaBox', 'Cocos Creator'],
    networkItems: ['Protocol Buffers', 'TCP / WebSocket', '메시지 라우팅'],
    serverItems: ['HTTP 핸들러', '메시지 핸들러', '핫 리로드'],
  },
  engineGrid: {
    title: '멀티 엔진 지원',
    subtitle: '하나의 서버, 어떤 클라이언트든. 원하는 게임 엔진을 선택하세요.',
    engines: [
      { name: 'Unity', desc: '업계 최고 엔진, HybridCLR 핫 리로드 완전 지원' },
      { name: 'Godot', desc: '오픈소스 엔진, C# 생태계 지속 성장 중' },
      { name: 'LayaBox', desc: '웹 우선 엔진, 크로스 플랫폼 브라우저 게임에 적합' },
      { name: 'Cocos Creator', desc: '경량 엔진, 미니 게임 시장 지배적' },
    ],
  },
  stats: {
    title: '개발자들이 신뢰하는 프레임워크',
    items: [
      { value: '500+', label: 'GitHub Stars' },
      { value: '50+', label: '기여자' },
      { value: '4', label: '게임 엔진' },
      { value: '100%', label: 'C# 코드베이스' },
    ],
  },
  quickStart: {
    title: '빠른 시작',
    subtitle: '몇 분 안에 게임 서버를 시작하세요.',
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
    title: '게임 개발을 시작할 준비가 되셨나요?',
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
