# 設定テーブルの読み込み方法

`ConfigComponent` を通じて1つまたは複数の `IDataTable` 設定テーブルをグローバル設定マネージャーに読み込み、ゲーム内の任意の場所から型または名前で検索できるようにします。

## 前提条件

- シーンに `GameFramework` 起動コンポーネントがアタッチされていること（フレームワークに付属）。`ConfigComponent` は `[GameFrameXAutoComponent(-5000)]` により自動的に注入されるため、手動で追加する必要はありません。
- カスタム設定クラスは `IDataTable` インターフェースを実装する必要があります（[IDataTable.cs](/Runtime/Config/Config/IDataTable.cs) を参照）。
- すでに `IDataTable` インスタンスがある場合、`Add` で注入できます。資産ファイルから読み込む場合は、フレームワークの `GameFrameX.Asset` モジュールを併用して ScriptableObject / バイナリを読み込み、その後 `Add` を呼び出してください。

## 操作手順

1. **コンポーネント参照を取得**。`GameEntry.GetComponent<ConfigComponent>()` でコンポーネントを取得し、内部の `IConfigManager` を取得します：

   ```csharp
   var configComponent = GameEntry.GetComponent<ConfigComponent>();
   var configManager   = GameFrameworkEntry.GetModule<IConfigManager>();
   ```

   Source: [ConfigComponent.cs#L73-L85](/Runtime/Config/ConfigComponent.cs#L73-L85)

2. **読み込みイベントを登録**（任意ですが推奨）。フレームワークは読み込み処理中に以下のイベントを発行します。これらを購読して成功 / 失敗のコールバックを受け取ります：

   ```csharp
   GameFrameXEntry.GetSubscriber().Subscribe(LoadConfigSuccessEventArgs.EventId, OnLoadConfigSuccess);
   GameFrameXEntry.GetSubscriber().Subscribe(LoadConfigFailureEventArgs.EventId, OnLoadConfigFailure);
   GameFrameXEntry.GetSubscriber().Subscribe(LoadConfigUpdateEventArgs.EventId,   OnLoadConfigUpdate);
   ```

   Source: [LoadConfigSuccessEventArgs.cs#L52](/Runtime/EventArgs/LoadConfigSuccessEventArgs.cs#L52), [LoadConfigFailureEventArgs.cs#L52](/Runtime/EventArgs/LoadConfigFailureEventArgs.cs#L52)

3. **設定テーブルを読み込んで注入**。まずリソースモジュールで `IDataTable` インスタンスをメモリに読み込み、その後 `Add` を呼び出してマネージャーに書き込みます。例えばバイナリ / テキスト設定テーブルを読み込む場合は以下のようになります：

   ```csharp
   // 1) AssetComponent で資産をメモリに読み込む（プロジェクトによって読み込み方法は異なります）
   var dataTable = LoadMyConfigTable(); // IDataTable を実装したインスタンスを返す

   // 2) グローバル設定マネージャーに注入し、後で GetConfig<T>() しやすいように名前を型名と一致させておく
   configComponent.Add(nameof(MyConfigTable), dataTable);
   ```

   Source: [ConfigComponent.cs#L182-L185](/Runtime/Config/ConfigComponent.cs#L182-L185), [ConfigManager.cs#L124-L127](/Runtime/Config/Config/ConfigManager.cs#L124-L127)

4. **設定テーブルを取得**。ジェネリック版の使用を推奨します。`typeof(T).Name` で自動的に設定名とマッチングします：

   ```csharp
   if (configComponent.HasConfig<MyConfigTable>())
   {
       var cfg = configComponent.GetConfig<MyConfigTable>();
       // cfg を使用 ...
   }
   ```

   文字列名で取得することもできます：

   ```csharp
   var cfg = (MyConfigTable)configManager.GetConfig("MyConfigTable");
   ```

   Source: [ConfigComponent.cs#L118-L143](/Runtime/Config/ConfigComponent.cs#L118-L143), [ConfigManager.cs#L152-L161](/Runtime/Config/Config/ConfigManager.cs#L152-L161)

5. **必要に応じて削除 / クリア**。特定のテーブルをアンロードする場合やシーンを退出する際にクリーンアップします：

   ```csharp
   configComponent.RemoveConfig<MyConfigTable>(); // 単一のテーブルを削除
   configComponent.RemoveAllConfigs();             // すべてをクリア
   ```

   Source: [ConfigComponent.cs#L154-L171](/Runtime/Config/ConfigComponent.cs#L154-L171)

## よくあるバリエーション

- **一括プリロード**：メインシーンに入る前にループで `Add` を呼び出し、複数のテーブルを読み込みます。成功イベントコールバックで進行を統一的に制御します。
- **ホットアップデートによる置き換え**：同名項目を `Add` で上書きできます。`AddConfig` は内部的に `TryAdd` を通るため、強制的に置き換えたい場合は先に `RemoveConfig` を呼び、その後 `Add` してください。
- **コンポーネントを介さない方法**：`GameFrameworkEntry.GetModule<IConfigManager>()` を直接呼び出して `IConfigManager` を取得し、`AddConfig / GetConfig` を呼び出すことでも同様に使用できます。

## よくあるエラー

| 症状 | 原因 | 修正方法 |
|------|------|------|
| `GetConfig<T>()` が `null` を返す | 名前と `typeof(T).Name` が一致していない、または `Add` を呼び出していない | `Add` 時に渡した名前が型名と一致していることを確認する。または名前指定の `GetConfig("Name")` に変更する |
| 重複して `Add` した後も古いテーブルが有効になる | `AddConfig` は `TryAdd` を通るため、同名では上書きされない | 先に `RemoveConfig` を呼び、その後 `Add` する |
| イベントが発火しない | イベント ID を `Subscribe` していない | `LoadConfigSuccessEventArgs.EventId` などを購読する |
| `Config manager is invalid.` | フレームワークモジュールが登録されていないか破棄されている | `GameFramework` が起動しており、`Shutdown` されていないことを確認する |

## 補足（任意）

`ConfigComponent` 自体は資産を直接解析しません。`IDataTable` コンテナを `IConfigManager` に委譲します。`ConfigManager` は `ConcurrentDictionary<string, IDataTable>` を使用して設定項目を保存し、`ConfigComponent` はさらに型 → 名のマッピングを重ねることで、`GetConfig<T>()` が型から高速に検索できるようにしています。資産の読み込み部分はプロジェクトの `AssetComponent` が担当し、本コンポーネントとは疎結合になっています。