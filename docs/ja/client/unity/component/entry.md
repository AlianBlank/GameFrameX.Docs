# 入口

GameFrameX 的 コンポーネント入口 コンポーネント,提供快捷取得其他コンポーネント的方法

---

[[toc]]

## 入口列表
目前只编写了基本的入口列表.

### リソース

### 設定

### 协程

### 下载

### 有限ステータス机

### フロー

### 存档

### 声音

### イベント

### Mono

### 全局設定

### シーン

### 长连接 Socket

### 短连接 HTTP

### FUI

### 计时器

### 实体对象

## 使用方法(任选其一)

1. 直接在 `manifest.json` 的ファイル中的 `dependencies` 节点下追加以下内容
   ```json
      {"com.gameframex.unity.entry": "https://github.com/GameFrameX/com.gameframex.unity.entry.git"}
    ```
2. 在Unity 的`Packages Manager` 中使用`Git URL`
   的方法追加库,地址为：https://github.com/GameFrameX/com.gameframex.unity.entry.git

3. 直接下载リポジトリ放置到Unity プロジェクト的`Packages` ディレクトリ下。会自动ロード识别
