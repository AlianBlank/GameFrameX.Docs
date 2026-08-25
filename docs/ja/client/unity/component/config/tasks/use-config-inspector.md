# Unity Inspector で ConfigComponent を確認・管理する方法

`ConfigComponent` がアタッチされた GameObject では、Unity Inspector が自動的にカスタム Inspector を使用してそのコンポーネントのインターフェースと実装タイプのマッピングを表示します。コードを書かなくても、現在の構成コンポーネントに対応する `IConfigManager` インターフェースおよび実装クラスの完全名を確認でき、必要に応じて手動でカスタム実装を指定できます。

## 前提条件

- `com.gameframex.unity.config` パッケージがインストールされており、プロジェクト内に `ConfigComponent` クラスが存在すること。
- シーン内に `ConfigComponent` がアタッチされた GameObject が存在する(コンポーネントメニューは `GameFrameX/Config`)。

## 操作手順

1. シーン内で `ConfigComponent` がアタッチされた GameObject を選択すると、Inspector は自動的にカスタム Inspector に切り替わります。カスタム Inspector は `CustomEditor(typeof(ConfigComponent))` 属性でバインドされています。

    ```csharp
    [CustomEditor(typeof(ConfigComponent))]
    internal sealed class ConfigComponentInspector : ComponentTypeComponentInspector
    {
        protected override void RefreshTypeNames()
        {
            RefreshComponentTypeNames(typeof(IConfigManager));
        }
    }
    ```

    Source: [Editor/Inspector/ConfigComponentInspector.cs#L38-L45](/src/Editor/Inspector/ConfigComponentInspector.cs#L38-L45)

2. Inspector の上部には、コンポーネントタイプに関連する読み取り専用フィールドが表示されます。`InterfaceComponentType`(固定で `IConfigManager`)と `ImplementationComponentType`(`Awake()` 時に `componentType` 文字列から解析)が含まれます。これは、ランタイムの構成マネージャの実装が正しいかどうかを判断する最も迅速な方法です。

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

    Source: [Runtime/Config/ConfigComponent.cs#L73-L85](/src/Runtime/Config/ConfigComponent.cs#L73-L85)

3. ランタイムに `Config manager is invalid.` という致命的ログが出力された場合は、`IConfigManager` モジュールが登録されていないことを意味します。まず Game Framework のモジュール登録フローに戻って修正してください。

4. ランタイム(Play Mode)で `Count` プロパティを読み取ることで、現在読み込まれている構成項目の数を確認できます。

    ```csharp
    var configComponent = GameEntry.GetComponent<ConfigComponent>();
    int count = configComponent.Count;
    ```

    Source: [Runtime/Config/ConfigComponent.cs#L62-L65](/src/Runtime/Config/ConfigComponent.cs#L62-L65)

5. スクリプト内でタイプ別に構成項目の取得、検出、削除、全クリアを行う(これらの API はランタイムデバッグにも間接的に使用されます)。

    ```csharp
    // 構成項目の取得(タイプは IDataTable を実装する必要があります)
    var cfg = configComponent.GetConfig<MyConfig>();

    // 存在確認
    bool exists = configComponent.HasConfig<MyConfig>();

    // 単一の削除 / 全クリア
    configComponent.RemoveConfig<MyConfig>();
    configComponent.RemoveAllConfigs();

    // 名前で直接追加
    configComponent.Add("MyConfig", dataTableInstance);
    ```

    Source: [Runtime/Config/ConfigComponent.cs#L117-L185](/src/Runtime/Config/ConfigComponent.cs#L117-L185)

## よくあるバリエーション

- カスタム実装クラスを使用したい場合、`componentType` フィールドに `IConfigManager` 実装クラスの完全名(名前空間を含む)を入力すると、`Awake()` で `Utility.Assembly.GetType` により解析されます。解析結果は Inspector の `ImplementationComponentType` に表示されるので、確認しやすいです。
- 裁剪(コードストリッピング)問題を調査したい場合は、ビルドスクリプトで `GameFrameXConfigCroppingHelper` が `ConfigComponent` と `BaseDataTable<>` の参照保持をトリガーしていることを確認してください(`[Preserve]` 属性と裁剪ヘルパーによって保証されます)。

    ```csharp
    _ = typeof(BaseDataTable<>);
    _ = typeof(ConfigComponent);
    ```

    Source: [Runtime/GameFrameXConfigCroppingHelper.cs#L20-L22](/src/Runtime/GameFrameXConfigCroppingHelper.cs#L20-L22)

## よくあるエラー

| 症状 | 原因 | 修正方法 |
|------|------|------|
| Console に `Config manager is invalid.` が出力される | `IConfigManager` モジュールが登録されていないか、裁剪されている | 実装クラスが存在し、フレームワークに自動登録されていることを確認する。必要に応じて `GameFrameX.Runtime` を明示的に参照して裁剪を防ぐ |
| Inspector の `ImplementationComponentType` が空になっている | `componentType` 文字列のスペルミス、またはアセンブリが読み込まれていない | `componentType` が実装クラスの完全限定名と完全に一致していることを確認する |
| `GetConfig<T>` が `default` を返す | 対応する名前の構成項目が `Add` で登録されていない | 先に `configComponent.LoadConfig("...")` または `Add(...)` を呼び出してから読み取る |

## 背景(任意)

`ConfigComponent` は `GameFrameworkComponent` を継承した MonoBehaviour で、フレームワークは `[GameFrameXAutoComponent(-5000)]` により自動登録し、優先度は -5000 です。Inspector は `ComponentTypeComponentInspector` から派生しており、コアとなる役割はエディタ上でインターフェースと実装クラスの完全限定名を可視化し、ゲームを実行しなくてもモジュールの組み立て状況を確認できるようにすることです。