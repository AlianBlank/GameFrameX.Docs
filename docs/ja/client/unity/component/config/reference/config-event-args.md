# EventArgs リファレンス:LoadConfigSuccess / Failure / Update

このページでは、GameFrameX 設定モジュールのグローバル設定読み込みプロセス中にディスパッチされる 3 つのイベント引数タイプをまとめています:`LoadConfigSuccessEventArgs`、`LoadConfigFailureEventArgs`、`LoadConfigUpdateEventArgs`。これらはすべて `GameFrameX.Config.Runtime` 名前空間に配置され、`GameFrameX.Event.Runtime.GameEventArgs` を継承し、`ReferencePool` によってライフサイクルが管理されます。

## LoadConfigSuccessEventArgs

グローバル設定の読み込みが成功した時にディスパッチされます。`EventId` を購読することでリッスンできます。

| メンバー | 型 | 説明 |
|------|------|------|
| `EventId` | `static readonly string` | イベント ID。値は型の完全名 `GameFrameX.Config.Runtime.LoadConfigSuccessEventArgs` |
| `Id` | `string`(オーバーライド) | `EventId` を返す |
| `ConfigAssetName` | `string` | グローバル設定のアセット名 |
| `Duration` | `float` | 読み込み持続時間(秒) |
| `UserData` | `object` | ユーザー定義データ |
| `Create(string, float, object)` | `static LoadConfigSuccessEventArgs` | 参照プールからインスタンスを作成 |
| `Clear()` | `void`(オーバーライド) | フィールドをリセット:`ConfigAssetName = null`、`Duration = 0f`、`UserData = null` |

使用例:

```csharp
var args = LoadConfigSuccessEventArgs.Create("GlobalConfig", 1.25f, userData);
GameFrameX.Event.Runtime.GameEntry.Event.Fire(args);
// リッスン
GameEntry.Event.Subscribe(LoadConfigSuccessEventArgs.EventId, e =>
{
    var s = (LoadConfigSuccessEventArgs)e;
    Debug.Log($"設定 {s.ConfigAssetName} の読み込みが完了しました。所要時間 {s.Duration}s");
});
```

Source: [LoadConfigSuccessEventArgs.cs](/Runtime/EventArgs/LoadConfigSuccessEventArgs.cs#L43-L137)

## LoadConfigFailureEventArgs

グローバル設定の読み込みが失敗した時にディスパッチされます。`EventId` を購読することでリッスンできます。

| メンバー | 型 | 説明 |
|------|------|------|
| `EventId` | `static readonly string` | イベント ID。値は型の完全名 `GameFrameX.Config.Runtime.LoadConfigFailureEventArgs` |
| `Id` | `string`(オーバーライド) | `EventId` を返す |
| `ConfigAssetName` | `string` | グローバル設定のアセット名 |
| `ErrorMessage` | `string` | エラーメッセージ |
| `UserData` | `object` | ユーザー定義データ |
| `Create(string, string, object)` | `static LoadConfigFailureEventArgs` | 参照プールからインスタンスを作成 |
| `Clear()` | `void`(オーバーライド) | フィールドをリセット:`ConfigAssetName = null`、`ErrorMessage = null`、`UserData = null` |

使用例:

```csharp
var args = LoadConfigFailureEventArgs.Create("GlobalConfig", exception.Message, userData);
GameEntry.Event.Fire(args);
```

Source: [LoadConfigFailureEventArgs.cs](/Runtime/EventArgs/LoadConfigFailureEventArgs.cs#L43-L137)

## LoadConfigUpdateEventArgs

グローバル設定の読み込みプロセス中に進捗に応じてディスパッチされます。`EventId` を購読することでリッスンできます。

| メンバー | 型 | 説明 |
|------|------|------|
| `EventId` | `static readonly string` | イベント ID。値は型の完全名 `GameFrameX.Config.Runtime.LoadConfigUpdateEventArgs` |
| `Id` | `string`(オーバーライド) | `EventId` を返す |
| `ConfigAssetName` | `string` | グローバル設定のアセット名 |
| `Progress` | `float` | 読み込み進捗、範囲 `0.0` から `1.0` |
| `UserData` | `object` | ユーザー定義データ |
| `Create(string, float, object)` | `static LoadConfigUpdateEventArgs` | 参照プールからインスタンスを作成 |
| `Clear()` | `void`(オーバーライド) | フィールドをリセット:`ConfigAssetName = null`、`Progress = 0f`、`UserData = null` |

使用例:

```csharp
var args = LoadConfigUpdateEventArgs.Create("GlobalConfig", 0.5f, userData);
GameEntry.Event.Fire(args);
```

Source: [LoadConfigUpdateEventArgs.cs](/Runtime/EventArgs/LoadConfigUpdateEventArgs.cs#L43-L137)

## 共通規約

| 項目 | 値 |
|----|----|
| 名前空間 | `GameFrameX.Config.Runtime` |
| 基底クラス | `GameFrameX.Event.Runtime.GameEventArgs` |
| インスタンス化方法 | 必ず静的 `Create(...)` メソッドを経由し、`ReferencePool` から取得する |
| 解放方法 | フレームワーク内部でイベントディスパッチ完了後に `Clear()` を呼び出して参照プールに返却するため、業務側で手動解放する必要はない |
| リッスンキー | `typeof(XXXEventArgs).FullName`、つまり各クラス自身の `EventId` 静的フィールドを使用する |