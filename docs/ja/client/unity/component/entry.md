# エントリーポイント

GameFrameX 的 コンポーネントエントリーポイント コンポーネント,提供迅速に取得其他コンポーネント的方法

---

[[toc]]

## エントリーポイント列表
目前只编写了基础的エントリーポイント列表.

### リソース

### 設定

### コルーチン

### ダウンロード

### 有限状態機械

### フロー

### セーブデータ

### サウンド

### イベント

### Mono

### グローバル設定

### シーン

### 永続接続 Socket

### 短接続 HTTP

### FUI

### タイマー

### エンティティオブジェクト

## 使用メソッド(任选其一)

1. 直接在 `manifest.json` 的ファイル内の `dependencies` ノードに追加以下の内容
   ```json
      {"com.gameframex.unity.entry": "https://github.com/GameFrameX/com.gameframex.unity.entry.git"}
    ```
2. Unity の`Packages Manager` 中使用`Git URL`
    メソッドでライブラリを追加,アドレス：：https://github.com/GameFrameX/com.gameframex.unity.entry.git

3. リポジトリを直接ダウンロードしてUnity プロジェクトの`Packages`  ディレクトリに配置。自動的にロード・認識されます
