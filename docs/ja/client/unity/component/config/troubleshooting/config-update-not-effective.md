# 設定表の更新が反映されない場合の対処法

実行時に設定表を再読み込みしたり、再読込したり、再 `Add` したりしても、データが変化しない場合、問題は多くの場合「既存のキーが新しい値でスキップされる」「キャッシュされた古い参照が読み込まれる」「キー名と型が一致しない」という3つの場面で発生します。

## クイック診断

| 症状 | 原因 | 修正方法 |
|------|------|------|
| `Add` を呼び出した後、`GetConfig` が依然として古い値を返す | `AddConfig` の内部実装は `TryAdd` を使用しており、キーが既に存在する場合は**上書きされない** | 先に `RemoveConfig` を呼び出してから `AddConfig` を呼び出すか、`HasConfig` で先にチェックする |
| 設定ファイルを変更した後、実行中のデータが更新されない | データテーブルインスタンスが古い参照として保持されており、dict 内のオブジェクトのみが更新され、置換されていない | `IDataTable` を再構築した後、古いキーを削除してから `Add` する |
| `HasConfig<T>()` が false を返すのに、設定は明明読み込まれている | `GetTypeName<T>()` は `typeof(T).Name` をキーとして使用しているため、ジェネリック実引数の型が一致していない | `T` が同じ具象クラスであることを確認する(例: `PlayerConfig` であって `BaseDataTable` ではない) |
| `RemoveAllConfigs()` の後に `GetConfig` を実行しても値が取得できる | `ConfigComponent` 内部に `m_ConfigNameTypeMap` キャッシュがあり、クリア後に再 `Add` されていない | クリア後にロードフローを再実行し、キャッシュのみに依存しない |
| 設定を再ロードしてもイベントがトリガーされない | `LoadConfigUpdateEventArgs` / `LoadConfigSuccessEventArgs` を購読していない | `ConfigComponent.Awake` の後に関連するイベントを購読する(下記のコードを参照) |

## 修正手順

### 1. 重复 Add が反映されない — 先に Remove してから Add

`ConfigManager.AddConfig` の内部実装は `m_ConfigDatas.TryAdd(configName, configValue)` を呼び出しており、`ConcurrentDictionary` では、**キーが既に存在する場合は上書きされません**。値を更新するには、古いエントリを先に削除する必要があります。

```csharp
var component = GameFrameX.Runtime.GameEntry.GetComponent<ConfigComponent>();

// 誤った書き方:上書きされない
component.Add("PlayerConfig", newDataTable);

// 正しい書き方:先に削除してから追加
if (component.HasConfig<PlayerConfig>())
{
    component.RemoveConfig<PlayerConfig>();
}
component.Add("PlayerConfig", newDataTable);
```

Source: [Runtime/Config/Config/ConfigManager.cs#L120-L127](/src/Runtime/Config/Config/ConfigManager.cs#L120-L127)

### 2. キー名と型が一致しない — typeof(T).Name を一致させる

`ConfigComponent.GetTypeName<T>()` は `typeof(T).Name` を dict のキーとして使用します。そのため `HasConfig<PlayerConfig>()` と `HasConfig<BaseDataTable>()` では**異なるキー**が取得され、親クラスの参照では子クラスのエントリにヒットしません。`T` がロード時に使用された具象クラスであることを確認してください。

```csharp
// 一致:具象クラスを使用
var data = component.GetConfig<PlayerConfig>();

// 不一致:インターフェースや親クラスを使用すると見つからない
var data = component.GetConfig<IDataTable>();
```

Source: [Runtime/Config/ConfigComponent.cs#L96-L107](/src/Runtime/Config/ConfigComponent.cs#L96-L107)

### 3. 再ロード後も参照が古いオブジェクトのまま — テーブル全体を置換する

`GetConfig` が返すのは `IDataTable` インターフェースであり、**dict が保持しているのは参照**です。基盤となるコレクションを修正しただけで、新しいテーブルを `Add` し直さない場合、一部のシリアライザ/キャッシュ層は変化を感知しません。安全な方法は、新しい `IDataTable` インスタンスを構築して dict のエントリを置換することです。

```csharp
var newTable = LoadFromBytes(bytes); // あなたのデシリアライズロジック
if (component.HasConfig<PlayerConfig>())
{
    component.RemoveConfig<PlayerConfig>();
}
component.Add(nameof(PlayerConfig), newTable);
```

Source: [Runtime/Config/Config/ConfigManager.cs#L138-L141](/src/Runtime/Config/Config/ConfigManager.cs#L138-L141)

### 4. 再ロードイベントがコールバックされない — 対応する EventArgs を購読する

リポジトリの `Runtime/EventArgs/` 以下には、`LoadConfigUpdateEventArgs`、`LoadConfigSuccessEventArgs`、`LoadConfigFailureEventArgs` の3つのイベント引数クラスが用意されています。ロードフローをオーバーライドした場合は、`GameFrameX.Runtime.GameEntry.GetComponent<ConfigComponent>()` でインスタンスを取得し、フレームワークのイベント機構に従って購読することを忘れないでください。そうしないと完了コールバックがトリガーされず、「反映されていない」ように見えます。

```csharp
// 例:カスタムローダーで発火させる、フレームワークのイベント機構を使用
GameFrameX.Runtime.GameEntry.GetComponent<ConfigComponent>()
    .SendEvent(nameof(LoadConfigSuccessEventArgs), new LoadConfigSuccessEventArgs { ... });
```

## 検証

1. `Add` の前に `HasConfig<T>()` を呼び出し、戻り値が `true` の場合は先に `RemoveConfig<T>()` を呼び出す。
2. `GetConfig<T>()` を呼び出した後、デバッガーで `m_ConfigDatas`(リフレクションで参照可能)の参照と新しいテーブルが同じオブジェクトかどうかを確認する。
3. `IDataTable` の内部コレクションを変更した場合は、その場で変更するのではなく、**新しいインスタンスを再構築**して、参照が置換されるようにする。
4. 重要なパスにはログを追加する: `typeof(T).Name`、`HasConfig` の戻り値、ロード完了イベントがトリガーされたかどうかを印刷する。

## 関連リンク

- [ConfigComponent.cs](/src/Runtime/Config/ConfigComponent.cs)
- [ConfigManager.cs](/src/Runtime/Config/Config/ConfigManager.cs)
- [IConfigManager.cs](/src/Runtime/Config/Config/IConfigManager.cs)
- [BaseDataTable.cs](/src/Runtime/Config/Config/BaseDataTable.cs)
- [LoadConfigUpdateEventArgs.cs](/src/Runtime/EventArgs/LoadConfigUpdateEventArgs.cs)
- [LoadConfigSuccessEventArgs.cs](/src/Runtime/EventArgs/LoadConfigSuccessEventArgs.cs)
- [LoadConfigFailureEventArgs.cs](/src/Runtime/EventArgs/LoadConfigFailureEventArgs.cs)