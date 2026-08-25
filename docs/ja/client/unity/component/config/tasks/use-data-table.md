# データテーブル（BaseDataTable）を使用して設定項目を読み取る方法

`BaseDataTable<T>` はフレームワークが提供する設定データテーブルのジェネリック基底クラスであり、ID による検索、列挙、フィルタリングなどの一般的な操作をカプセル化します。このページを読み終えると、業務コードで ID を通じて任意の設定エントリを取得し、`TryGet`、`FirstOrDefault`、`All`、`ToList`、`Find` などのメソッドを使用して一般的なクエリを完了できます。

## 前提条件

- `GameFrameX.Config.Runtime` 名前空間を使用してデータテーブルアセンブリを導入済みであること。
- データテーブルインスタンスが `ConfigManager` に登録され、`LoadAsync()` の非同期ロードが完了していること。
- `T` は参照型でなければならない（`where T : class`）。

## 操作手順

### 1. ConfigManager を通じてデータテーブルインスタンスを取得する

データテーブルは `ConfigManager` が一元的に保持し、表名（文字列キー）を介して `IDataTable` インターフェースを返します。

```csharp
var dataTable = GameFrameX.Runtime.GameFrameXEntry.GetModule<IConfigManager>()
    .GetDataTable<MyConfig>("MyConfig");
```

Source: [ConfigManager.cs](/Runtime/Config/Config/ConfigManager.cs#L49-L60)

### 2. ID で単一の設定を読み取る

`TryGet` の使用を推奨します。見つからない場合は `null` ではなく `false` を返すため、null 参照例外を回避できます。

```csharp
if (dataTable.TryGet(1001, out var item))
{
    // id=1001 の設定にヒット
    Debug.Log(item.Name);
}
```

`int` は暗黙的に `long` に変換され、`long` 検索と同じ辞書を共有します。文字列キーは `StringDataMaps` を使用します。

Source: [BaseDataTable.cs](/Runtime/Config/Config/BaseDataTable.cs#L148-L181)

インデクサーを使用して 1 行で処理することもできます（ヒット失敗時は `null` を返します）。

```csharp
var item = dataTable[1001];
```

Source: [BaseDataTable.cs](/Runtime/Config/Config/BaseDataTable.cs#L192-L223)

### 3. 複数の設定を列挙またはフィルタリングする

コレクションビューが必要な場合は、`All`（配列）または `ToList()`（リスト）の使用を優先します。どちらも独立したコンテナーにコピーされます。

```csharp
foreach (var entry in dataTable.All)
{
    // 各エントリを処理する
}
```

条件に合致する最初のヒットを検索します。

```csharp
var firstHit = dataTable.Find(x => x.Level >= 10);
```

Source: [IDataTable.cs](/Runtime/Config/Config/IDataTable.cs#L233-L249)

### 4. データテーブル全体を同期する

`LoadAsync()` を呼び出して非同期ロードの完了を待ちます。`Count` はエントリ数を返し、`FirstOrDefault` / `LastOrDefault` で先頭と末尾の要素を取得します。

```csharp
await dataTable.LoadAsync();
Debug.Log($"合計 {dataTable.Count} 件");
Debug.Log(dataTable.FirstOrDefault?.Name);
```

Source: [BaseDataTable.cs](/Runtime/Config/Config/BaseDataTable.cs#L84-L242)

## 一般的なバリエーション

| シナリオ | 使用法 |
|------|------|
| 文字列主キー | `dataTable.TryGet("key_001", out var item)` または `dataTable["key_001"]` |
| long 主キー | `dataTable.TryGet(1001L, out var item)` |
| リストとしてコピー | `List<MyConfig> list = dataTable.ToList();` |
| 配列としてコピー | `MyConfig[] arr = dataTable.ToArray();` |
| エントリの集計 | `int n = dataTable.Count;` |
| 先頭/末尾の要素 | `T first = dataTable.FirstOrDefault;` `T last = dataTable.LastOrDefault;` |

## よくあるエラー

- **`Get(int/long/string)` の使用を続ける**:これらの 3 つのオーバーロードは `[Obsolete("请使用TryGet方法")]` とマークされており、コンパイル時に警告が発生します。`TryGet` またはインデクサーを使用するように変更してください。
  Source: [BaseDataTable.cs](/Runtime/Config/Config/BaseDataTable.cs#L97-L134)
- **`LoadAsync()` の完了を待たずにクエリを実行する**:データのロードが完了していない場合、辞書は空であるため、`TryGet` は直接 `false` を返し、インデクサーは `null` を返します。必ず `await` で完了させてください。
- **サブクラスがコレクションを変更した後、`InvalidateCache()` の呼び出しを忘れる**:派生クラスが直接 `DataList` / `LongDataMaps` / `StringDataMaps` を変更する場合は、必ず `InvalidateCache()` を呼び出してください。そうしないと、`Count`、`FirstOrDefault`、`LastOrDefault` が古いキャッシュ値を読み取ってしまいます。
  Source: [BaseDataTable.cs](/Runtime/Config/Config/BaseDataTable.cs#L67-L74)
- **`T` を値型として記述する**:基底クラスの制約は `where T : class` であるため、値型はコンパイラに拒否されます。

## 背景（オプション）

`BaseDataTable<T>` は内部的に 3 つの構造を維持しています。`LongDataMaps`（`Dictionary<long, T>`）、`StringDataMaps`（`Dictionary<string, T>`）、`DataList` で、先頭/末尾要素と `Count` はキャッシュフィールドによって読み取りが高速化されています。すべての変更は整合性を保証するために `InvalidateCache()` をトリガーする必要があります。`IConfigManager` は表名の登録とディスパッチを担当し、具体的な表の内容はジェネレーターによって生成され、上記の 3 つのコレクションに格納されます。

ロードと初期化のフローについては、`ConfigComponent` と `LoadConfigSuccessEventArgs` を参照してください。