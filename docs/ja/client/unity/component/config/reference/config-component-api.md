# ConfigComponent API 速查

このページでは、`ConfigComponent` およびその基盤インターフェースである `IConfigManager` のすべての公開 API(シグネチャ、パラメータ、戻り値、動作説明を含む)を一括で参照できるようにまとめています。

## ConfigComponent 公開 API

`ConfigComponent` はグローバル設定コンポーネントであり、`GameFrameworkEntry` 配下にマウントされます。汎用型 `T : IDataTable` を介して型安全なアクセスを提供します。

| 名前 | シグネチャ | 説明 |
|------|------|------|
| `Count` | `int Count { get; }` | 現在登録されている設定項目の総数 |
| `GetConfig<T>()` | `T GetConfig<T>() where T : IDataTable` | 汎用型 `T` の型名(`typeof(T).Name`)で設定項目を取得します。存在しない場合は `default(T)` を返します |
| `HasConfig<T>()` | `bool HasConfig<T>() where T : IDataTable` | 型 `T` に対応する名称の設定項目が存在するかどうかを確認します |
| `RemoveConfig<T>()` | `bool RemoveConfig<T>() where T : IDataTable` | 型 `T` に対応する名称の設定項目を削除し、成功したかどうかを返します |
| `RemoveAllConfigs()` | `void RemoveAllConfigs()` | すべての設定項目をクリアし、内部の型キャッシュをリセットします |
| `Add(string, IDataTable)` | `void Add(string configName, IDataTable dataTable)` | 文字列名をキーとして設定項目を登録します(型は `IDataTable` を実装する必要があります) |

型 → 名称の解決は内部の `ConcurrentDictionary<Type, string>` にキャッシュされ、`T` に初回アクセスした時点で書き込まれます。

```csharp
using GameFrameX.Config.Runtime;

// コンポーネントインスタンスを取得
var configComponent = GameFrameX.Runtime.GameFrameworkEntry.GetComponent<ConfigComponent>();

// 設定を登録(文字列を Key とする)
configComponent.Add("MyConfig", myDataTable);

// 型指定で取得
var cfg = configComponent.GetConfig<MyConfig>();
if (configComponent.HasConfig<MyConfig>())
{
    // ...
}

// 削除とクリア
configComponent.RemoveConfig<MyConfig>();
configComponent.RemoveAllConfigs();
```

Source: [ConfigComponent.cs](/src/Runtime/Config/ConfigComponent.cs#L46-L186)

## IConfigManager 公開 API

`IConfigManager` は、`ConfigComponent` が `GameFrameworkEntry.GetModule<IConfigManager>()` を介して取得する基盤となるマネージャーインターフェースであり、実際の保存を担当します。

| 名前 | シグネチャ | 説明 |
|------|------|------|
| `Count` | `int Count { get; }` | グローバルな設定項目の数 |
| `HasConfig(string)` | `bool HasConfig(string configName)` | 指定された名称の設定項目が存在するかどうかを確認します |
| `AddConfig(string, IDataTable)` | `void AddConfig(string configName, IDataTable configValue)` | 設定項目を追加します |
| `RemoveConfig(string)` | `bool RemoveConfig(string configName)` | 指定された名称の設定項目を削除し、成功したかどうかを返します |
| `GetConfig(string)` | `IDataTable GetConfig(string configName)` | 指定された名称の設定項目を取得します。存在しない場合は `null` を返します |
| `RemoveAllConfigs()` | `void RemoveAllConfigs()` | すべての設定項目をクリアします |

`GetConfig` の戻り値型は `IDataTable` であり、呼び出し側が必要に応じてキャストを行う必要があります。存在しない場合は `null` を返します(`ConfigComponent.GetConfig<T>()` の `default(T)` を返す動作とは区別してください)。

Source: [IConfigManager.cs](/src/Runtime/Config/Config/IConfigManager.cs#L40-L98)

## 関連リンク

- [ConfigComponent.cs](/src/Runtime/Config/ConfigComponent.cs)
- [IConfigManager.cs](/src/Runtime/Config/Config/IConfigManager.cs)