# 設定の読み込みが失敗した場合の対処法

`ConfigComponent` を通じてグローバル設定を登録または読み取る際に、`LoadConfigFailureEventArgs`（イベント番号は `LoadConfigFailureEventArgs` の完全クラス名）が出現するか、`GetConfig<T>()` が `default` / `null` を返す場合、通常は基底の `ConfigManager` が設定データを取得できていないことを意味します。このページでは、原因の迅速な特定と修正を支援します。

## クイック診断

| 症状 | 原因 | 修正方法 |
|------|------|------|
| ログに `Config manager is invalid.` が出力される | `ConfigComponent.Awake` 時に `IConfigManager` 実装が取得されていない | [ConfigManager が注入されていない](#configmanager-が注入されていない) を参照 |
| `GetConfig<T>()` が `null` / `default(T)` を返す | リソースの読み込みは成功したが `Add` 経由でマネージャーに登録されていない、またはリソース名と型名が一致していない | [ConfigComponent に登録されていない](#configcomponent-に登録されていない) を参照 |
| `LoadConfigFailureEventArgs` を受信し、`ErrorMessage` に `IOException` / パース失敗が含まれる | 設定バイナリ / JSON リソースが生成されていないか、コードと同期していない | [設定リソースの欠落またはフォーマット破損](#設定リソースの欠落またはフォーマット破損) を参照 |
| `HasConfig<T>()` が常に `false` を返す | 名前キーの比較に大文字小文字を区別するもの（`StringComparer.Ordinal`）が使用されている | [設定名の大文字小文字不一致](#設定名の大文字小文字不一致) を参照 |

## 修正手順

### ConfigManager が注入されていない

`ConfigComponent.Awake` は `GameFrameworkEntry.GetModule<IConfigManager>()` を通じてマネージャー実装を取得します。フレームワークに `ConfigManager` が登録されていない場合、直ちに致命的ログを記録して即座に return し、その後のすべての読み書きが無効になります。

[ConfigComponent.cs#L73-L85](/Runtime/Config/ConfigComponent.cs#L73-L85) の内容:

```csharp
protected override void Awake()
{
    m_ConfigNameTypeMap.Clear();
    ImplementationComponentType = Utility.Assembly.GetType(componentType);
    InterfaceComponentType = typeof(IConfigManager);
    base.Awake();
    m_ConfigManager = GameFrameworkEntry.GetModule<IConfigManager>();
    if (m_ConfigManager == null)
    {
        Log.Fatal("Config manager is invalid.");
        return;
    }
}
```

プロジェクト内に `GameFrameX.Config.Runtime.ConfigManager` アセンブリが含まれていること、およびブートストラップ段階で業務コードより先にフレームワークの初期化がトリガーされることを確認してください（フレームワークの `[GameFrameXAutoComponent(-5000)]` 属性により、通常の業務コンポーネントより先に登録されることが保証されます）。

### ConfigComponent に登録されていない

`ConfigComponent` 自身は「名前でのアクセス」のみを担当し、**リソースの読み込みは担当しません**。設定を読み取る前に、解析済みの `IDataTable` を明示的にマネージャーに追加する必要があります。

```csharp
ConfigComponent.Instance.Add(typeof(MyConfig).Name, myDataTableInstance);
var cfg = ConfigComponent.Instance.GetConfig<MyConfig>();
```

[ConfigComponent.cs#L182-L185](/Runtime/Config/ConfigComponent.cs#L182-L185) の内容:

```csharp
public void Add(string configName, IDataTable dataTable)
{
    m_ConfigManager.AddConfig(configName, dataTable);
}
```

`Add` をスキップして直接 `GetConfig<T>()` を呼び出した場合、`ConfigManager` 内部のディクショナリにそのキーが存在しないため `default` を返し、`LoadConfigFailureEventArgs` がトリガーされます。

### 設定リソースの欠落またはフォーマット破損

リソースシステムを通じてバイナリ / JSON を非同期に読み込み、`IDataTable` にデシリアライズする際に、ファイルが存在しない、バージョンが一致しない、デシリアライズで例外がスローされた場合、リソース層は失敗イベント `LoadConfigFailureEventArgs` をコールバックします。そのフィールドの意味は以下の通りです。

[LoadConfigFailureEventArgs.cs#L43-L65](/Runtime/EventArgs/LoadConfigFailureEventArgs.cs#L43-L65) の内容:

```csharp
public sealed class LoadConfigFailureEventArgs : GameEventArgs
{
    public static readonly string EventId = typeof(LoadConfigFailureEventArgs).FullName;

    public LoadConfigFailureEventArgs()
    {
        ConfigAssetName = null;
        ErrorMessage = null;
        UserData = null;
    }

    public override string Id { get { return EventId; } }
    public string ConfigAssetName { get; private set; }
    public string ErrorMessage    { get; private set; }
    public object UserData        { get; private set; }
}
```

調査のポイント:

1. イベント購読時に `e.ConfigAssetName` と `e.ErrorMessage` を出力し、どのリソースが失敗したかを特定する;
2. 設定を再エクスポート / 再生成する（Excel / Lua / JSON が再エクスポート済み、バイナリが StreamingAssets または Addressables に再パッケージ済みであることを確認）;
3. 設定構造体のフィールドに変更がある場合は、コードとデータテーブルを再生成したことを確認してください。古いバイナリはデシリアライズできません。

### 設定名の大文字小文字不一致

`ConfigManager` はディクショナリの構築時に `StringComparer.Ordinal` を使用しています。これは **厳密に大小文字を区別し**、カルチャに依存しません。

[ConfigManager.cs#L58-L61](/Runtime/Config/ConfigManager.cs#L58-L61) の内容:

```csharp
public ConfigManager()
{
    m_ConfigDatas = new ConcurrentDictionary<string, IDataTable>(StringComparer.Ordinal);
}
```

`ConfigComponent.GetTypeName<T>()` は `typeof(T).Name` を使用しますが、入力された `configName` の大文字小文字が異なる場合は別のキーと見なされます。登録とクエリ時には文字列が完全に一致していることを確認してください。

## 検証

修正後、以下の方法で問題が解決されたことを確認してください。

1. `Log.Fatal("Config manager is invalid.")` が出現しなくなる;
2. `HasConfig<T>()` が対象タイプに対して `true` を返す;
3. `GetConfig<T>()` が非 null のインスタンスを返し、フィールド値がソースデータと一致する;
4. `LoadConfigFailureEventArgs.EventId` を購読しても、失敗イベントを受信しなくなる。

```csharp
GameFrameworkEvent.Get().Subscribe(LoadConfigFailureEventArgs.EventId, (sender, e) =>
{
    var args = (LoadConfigFailureEventArgs)e;
    Log.Error($"設定の読み込みに失敗しました: {args.ConfigAssetName} - {args.ErrorMessage}");
});
```

## 関連リンク

- [ConfigComponent.cs](/Runtime/Config/ConfigComponent.cs)
- [ConfigManager.cs](/Runtime/Config/ConfigManager.cs)
- [IConfigManager.cs](/Runtime/Config/Config/IConfigManager.cs)
- [IDataTable.cs](/Runtime/Config/Config/IDataTable.cs)
- [BaseDataTable.cs](/Runtime/Config/Config/BaseDataTable.cs)
- [LoadConfigFailureEventArgs.cs](/Runtime/EventArgs/LoadConfigFailureEventArgs.cs)
- [LoadConfigSuccessEventArgs.cs](/Runtime/EventArgs/LoadConfigSuccessEventArgs.cs)
- [LoadConfigUpdateEventArgs.cs](/Runtime/EventArgs/LoadConfigUpdateEventArgs.cs)
- [ConfigComponentInspector.cs](/Editor/Inspector/ConfigComponentInspector.cs)