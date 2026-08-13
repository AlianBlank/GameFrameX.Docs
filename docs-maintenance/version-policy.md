# 版本快照策略

> **状态**:沿用 GameFrameX.Docs 现有 Vercel/CloudFlare 自动部署流水线。本文件仅说明"如果 Phase 5 引入版本快照,怎么放"。
>
> **决策**(2026-08-13):不锁新方案,Phase 0–4 不动部署。

## Phase 5 之前的现状

- 主分支 `main` push → Vercel/CloudFlare 自动构建 → 自动部署
- `docs/<lang>/**` 任何新增内容(包括未来的 `.auto/`)都跟随自动部署

## Phase 5 引入版本快照时的位置(预留)

```
docs/<lang>/version/
├── index.md                    # 版本索引(自动生成)
└── <tag>/                      # 如 gfx-v1.2.3/
    ├── _manifest.json          # 快照元数据(12 仓 commit hash)
    └── ...                     # 完整复制该版本对应的 .auto 内容
```

部署:
- Vercel/CloudFlare 默认处理 `version/<tag>/**`
- CloudFlare 永久缓存策略:`max-age=31536000, immutable` 由 OpenDeepWiki 在写入 manifest 时通过 `Cache-Control` header 触发(Phase 5 实现)

## 触发(Phase 5)

- 任一代码仓打 `gfx-v*` tag(由 OpenDeepWiki Release Webhook 捕获)
- 全部 12 仓 commit hash 锁定后,生成快照
- 预发布(`-rc*` / `-alpha*`)保留 6 个月,稳定 release 永久

## 拍板人

- [ ] 6 项决策 → `gfx-doc/decisions/2026-08-13-doc-architecture.md`
- [ ] 跨仓 tag 命名(`gfx-v*`)待 Phase 1 启动前确认
