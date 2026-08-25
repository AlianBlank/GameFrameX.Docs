# 配置依賴與環境要求

本頁匯總 `com.gameframex.unity.config` 包運行所需的 Unity 版本、運行時依賴包與開發依賴，作為安裝與排錯的速查清單。

## 環境要求

| 項 | 版本/要求 | 來源 |
|----|-----------|------|
| Unity 編輯器 | 2019.4 或更高 | `package.json` 的 `unity` 欄位 |
| 包名 | `com.gameframex.unity.config` | `package.json` |
| 當前版本 | 1.2.1 | `package.json` 的 `version` 欄位 |
| 命名空間 | GameFrameX.Config | 見源碼目錄 |

Source: [package.json](/package.json#L2-L7)

## 運行時依賴

下面三個包必須在專案中存在，否則 `IDataTable<T>` 與配置管理器無法初始化。

| 依賴包 | 版本 | 用途 |
|--------|------|------|
| `com.gameframex.unity` | 2.5.1 | GameFrameX 框架核心（Procedure、模組基類、事件匯流排宿主） |
| `com.gameframex.unity.asset` | 3.1.1 | 資源載入管線，資料表非同步載入依賴它 |
| `com.gameframex.unity.event` | 1.3.0 | 事件系統，配置變更通知依賴它 |

Source: [package.json](/package.json#L22-L26)

## 開發依賴

僅在發布/構建階段使用，運行專案不強制安裝：

| 包 | 版本 | 用途 |
|----|------|------|
| `semantic-release` | ^24.2.0 | 自動化語義化版本發布 |
| `@semantic-release/changelog` | ^6.0.3 | 生成 CHANGELOG |
| `@semantic-release/git` | ^10.0.1 | 發布後自動打 git tag |

Source: [package.json](/package.json#L27-L31)

## Unity Package Manager 安裝方式

透過 OpenUPM / 內部 npm 源添加本包，依賴會隨包聲明自動拉取：

1. 開啟 `Packages/manifest.json`。
2. 在 `dependencies` 中加入：

```json
{
  "dependencies": {
    "com.gameframex.unity.config": "1.2.1"
  }
}
```

3. 儲存後 Unity 會自動解析並下載上方"運行時依賴"中列出的三個包。

## 版本約束說明

| 欄位 | 值 | 含義 |
|------|----|------|
| `unity` | `2019.4` | UPM 協議要求的最低 Unity 編輯器版本 |
| 依賴版本號 | 精確版本（如 `2.5.1`） | UPM 預設按精確版本解析，不會自動升級到次版本 |

## 常見錯誤

| 症狀 | 原因 | 修復 |
|------|------|------|
| 安裝後報 `Cannot find assembly GameFrameX` | 缺少 `com.gameframex.unity` 核心包 | 在 manifest 中補加 `"com.gameframex.unity": "2.5.1"` |
| 資料表載入報資源管理器未初始化 | 缺少 `com.gameframex.unity.asset` | 在 manifest 中補加 `"com.gameframex.unity.asset": "3.1.1"` |
| 配置變更監聽無回呼 | 缺少 `com.gameframex.unity.event` | 在 manifest 中補加 `"com.gameframex.unity.event": "1.3.0"` |
| Unity 開啟報 `package requires Unity 2019.4` | 編輯器版本低於 2019.4 | 升級 Unity Hub 至 2019.4 LTS 或更高 |

## 相關連結

- 文件站: https://gameframex.doc.alianblank.com
- 倉庫: https://github.com/gameframex/com.gameframex.unity.config
- 變更日誌: https://github.com/gameframex/com.gameframex.unity.config/blob/main/CHANGELOG.md

Source: [package.json](/package.json#L36-L38)