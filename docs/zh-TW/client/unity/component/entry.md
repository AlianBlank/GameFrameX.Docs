# 入口

GameFrameX 的 組件入口 組件,提供快捷獲取其他組件的方式

---

[[toc]]

## 入口列表
目前只編寫了基礎的入口列表.

### 資源

### 配置

### 協程

### 下載

### 有限狀態機

### 流程

### 存檔

### 聲音

### 事件

### Mono

### 全域性配置

### 場景

### 長連線 Socket

### 短連線 HTTP

### FUI

### 計時器

### 實體物件

## 使用方式(任選其一)

1. 直接在 `manifest.json` 的檔案中的 `dependencies` 節點下新增以下內容
   ```json
      {"com.gameframex.unity.entry": "https://github.com/GameFrameX/com.gameframex.unity.entry.git"}
    ```
2. 在Unity 的`Packages Manager` 中使用`Git URL`
   的方式新增庫,地址為：https://github.com/GameFrameX/com.gameframex.unity.entry.git

3. 直接下載倉庫放置到Unity 專案的`Packages` 目錄下。會自動載入識別
