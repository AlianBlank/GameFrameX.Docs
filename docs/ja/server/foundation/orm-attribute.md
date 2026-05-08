# ORM 属性アノテーション

GameFrameX ORM 属性ライブラリは、データベースエンティティマーキング属性の完全なセットを提供し、ORMフレームワークの機能とパフォーマンスを強化します。

## 特徴

- **基本属性アノテーション** - 定数マーキング、カスタム統一結果処理などの基本機能
- **テーブル種別分類** - 増分テーブル、ログテーブル、システムテーブルなど複数のテーブル種別識別
- **パフォーマンス最適化** - キャッシュ戦略、読み取り専用最適化、インデックス管理、パーティションストレージ
- **データ管理** - 監査追跡、論理削除、バージョン管理などのエンタープライズレベルのデータ管理機能
- **柔軟な組み合わせ** - 複数の属性を自由に組み合わせて使用でき、さまざまなビジネスシナリオに対応

## インストール

```bash
dotnet add package GameFrameX.Foundation.Orm.Attribute
```

## クイックスタート

```csharp
using GameFrameX.Foundation.Orm.Attribute;

// エンティティクラスに属性を適用
[CacheTable(CacheType = "Redis", ExpireMinutes = 30)]
[SoftDelete("IsDeleted", "DeletedTime")]
public class User
{
    public int Id { get; set; }

    [EntityIndex("IX_User_Email", Unique = true)]
    public string Email { get; set; }

    public string Name { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime? DeletedTime { get; set; }
}
```

## 詳細な使い方

### 基本属性

#### ConstAttribute
定数属性。クラス、メソッド、プロパティなどが定数定義であることをマークします。

```csharp
[Const("DatabaseVersion")]
public class DatabaseConstants
{
    public const string Version = "1.0.0";
}
```

#### CustomUnifyResultAttribute
カスタム統一結果属性。カスタム結果の統一処理が必要なクラスやメソッドをマークします。

```csharp
[CustomUnifyResult("ApiResponse")]
public class UserController
{
    public User GetUser(int id) => userService.GetById(id);
}
```

### テーブル種別属性

#### IncrementSeedAttribute
増分シード属性。エンティティクラスが自動増分シード値機能をサポートすることをマークします。

```csharp
[IncrementSeed]
public class User
{
    public int Id { get; set; }  // 自動増分主キー
    public string Name { get; set; }
}
```

#### IncrementTableAttribute
増分テーブル属性。エンティティクラスに対応するデータベーステーブルが増分操作をサポートすることをマークします。

```csharp
[IncrementTable]
public class UserActivity
{
    public int Id { get; set; }
    public DateTime Timestamp { get; set; }  // 増分判定に使用
}
```

#### LogTableAttribute
ログテーブル属性。エンティティクラスに対応するデータベーステーブルがログテーブルであることをマークします。

```csharp
[LogTable]
public class UserOperationLog
{
    public long Id { get; set; }
    public string Operation { get; set; }
    public DateTime CreatedTime { get; set; }
}
```

#### SystemTableAttribute
システムテーブル属性。エンティティクラスに対応するデータベーステーブルがシステムテーブルであることをマークします。

```csharp
[SystemTable]
public class SystemConfiguration
{
    public string ConfigKey { get; set; }
    public string ConfigValue { get; set; }
}
```

### パフォーマンス最適化属性

#### CacheTableAttribute
キャッシュテーブル属性。エンティティクラスに対応するデータベーステーブルがキャッシュ戦略をサポートすることをマークします。

```csharp
[CacheTable(CacheType = "Redis", ExpireMinutes = 30)]
public class ProductInfo
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
}
```

#### ReadOnlyTableAttribute
読み取り専用テーブル属性。エンティティクラスに対応するデータベーステーブルが読み取り専用であることをマークします。

```csharp
[ReadOnlyTable(EnableCache = true, CacheMinutes = 60)]
public class CountryCode
{
    public string Code { get; set; }
    public string Name { get; set; }
}
```

#### EntityIndexAttribute
インデックス属性。プロパティやフィールドにデータベースインデックスの作成が必要であることをマークします。

```csharp
public class User
{
    [EntityIndex("IX_User_Email", Unique = true)]
    public string Email { get; set; }
    
    [EntityIndex("IX_User_Status_CreateTime", IsAscending = true)]
    public string Status { get; set; }
}
```

#### PartitionTableAttribute
パーティションテーブル属性。エンティティクラスに対応するデータベーステーブルがパーティションストレージをサポートすることをマークします。

```csharp
[PartitionTable("CreateDate", PartitionType.Range, PartitionInterval.Monthly)]
public class OrderHistory
{
    public int Id { get; set; }
    public DateTime CreateDate { get; set; }  // パーティションキー
}
```

### データ管理属性

#### AuditTableAttribute
監査テーブル属性。エンティティクラスに対応するデータベーステーブルが監査追跡を必要とすることをマークします。

```csharp
[AuditTable(AuditLevel = AuditLevel.Full, IncludeUserInfo = true)]
public class UserAccount
{
    public int Id { get; set; }
    public string Username { get; set; }
    public decimal Balance { get; set; }
}
```

#### SoftDeleteAttribute
論理削除属性。エンティティクラスが論理削除機能をサポートすることをマークします。

```csharp
[SoftDelete("IsDeleted", "DeletedTime")]
public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime? DeletedTime { get; set; }
}
```

#### VersionControlAttribute
バージョン管理属性。エンティティクラスがデータバージョン管理機能をサポートすることをマークします。

```csharp
[VersionControl("Version", VersionStrategy.Optimistic)]
public class Document
{
    public int Id { get; set; }
    public string Title { get; set; }
    public int Version { get; set; }  // バージョン番号フィールド
}
```

### 使用シナリオ

#### 高頻度クエリの最適化
```csharp
[CacheTable("Redis", 60)]
[ReadOnlyTable(EnableCache = true)]
[EntityIndex("IX_Product_Category")]
public class Product
{
    public int Id { get; set; }
    
    [EntityIndex("IX_Product_Category")]
    public string Category { get; set; }
    
    public string Name { get; set; }
    public decimal Price { get; set; }
}
```

#### 大規模データテーブルの管理
```csharp
[PartitionTable("CreateDate", PartitionType.Range, PartitionInterval.Monthly)]
[AuditTable(AuditLevel.ChangesOnly)]
[SoftDelete("IsDeleted", "DeletedTime")]
public class OrderRecord
{
    public long Id { get; set; }
    public int UserId { get; set; }
    public DateTime CreateDate { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime? DeletedTime { get; set; }
}
```

#### システムコアテーブル
```csharp
[SystemTable]
[AuditTable(AuditLevel.Full, IncludeUserInfo = true, IncludeIpAddress = true)]
[VersionControl("Version", VersionStrategy.Optimistic)]
public class SystemUser
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string PasswordHash { get; set; }
    public int Version { get; set; }
}
```

### 属性の分類

#### 優先度別分類

**高優先度**（よく使用され実用的）：
- `CacheTableAttribute` - キャッシュ戦略
- `AuditTableAttribute` - 監査追跡
- `SoftDeleteAttribute` - 論理削除
- `ReadOnlyTableAttribute` - 読み取り専用最適化

**中優先度**（特定のシナリオで有用）：
- `EntityIndexAttribute` - インデックス管理
- `PartitionTableAttribute` - パーティションテーブル
- `VersionControlAttribute` - バージョン管理

**基本属性**（フレームワークコア）：
- `ConstAttribute` - 定数マーキング
- `CustomUnifyResultAttribute` - 結果の統一
- `IncrementSeedAttribute` - 自動増分シード
- `IncrementTableAttribute` - 増分テーブル
- `LogTableAttribute` - ログテーブル
- `SystemTableAttribute` - システムテーブル

#### 機能別分類

**パフォーマンス最適化**：
- `CacheTableAttribute`
- `ReadOnlyTableAttribute`
- `EntityIndexAttribute`
- `PartitionTableAttribute`

**データ管理**：
- `AuditTableAttribute`
- `SoftDeleteAttribute`
- `VersionControlAttribute`
- `LogTableAttribute`

**テーブル種別識別**：
- `SystemTableAttribute`
- `IncrementTableAttribute`
- `IncrementSeedAttribute`

**フレームワーク機能**：
- `ConstAttribute`
- `CustomUnifyResultAttribute`

## ベストプラクティス

1. **適切な属性の選択** - 実際のビジネス要件に基づいて適切な属性を選択し、過度なアノテーションを避ける
2. **パフォーマンスの考慮** - キャッシュとインデックス属性はメモリとストレージのコストを考慮し、高頻度クエリテーブルには `CacheTableAttribute` を優先的に使用
3. **データ整合性** - 監査とバージョン管理属性はデータ整合性の要件を考慮し、重要なビジネスデータには `AuditTableAttribute` の使用を推奨
4. **保守コスト** - 複雑な属性はシステムの保守コストを増加させるため、必要に応じて組み合わせ、すべてをアノテーションしない
5. **テスト検証** - 属性の機能とパフォーマンスへの影響を十分にテストし、特にパーティションテーブルとキャッシュ戦略について検証

## API リファレンス

| 属性クラス | 分類 | 説明 |
|--------|------|------|
| `ConstAttribute` | 基本属性 | 定数マーキング |
| `CustomUnifyResultAttribute` | 基本属性 | カスタム統一結果処理 |
| `IncrementSeedAttribute` | テーブル種別属性 | 自動増分シード値 |
| `IncrementTableAttribute` | テーブル種別属性 | 増分テーブル操作 |
| `LogTableAttribute` | テーブル種別属性 | ログテーブル識別 |
| `SystemTableAttribute` | テーブル種別属性 | システムテーブル識別 |
| `CacheTableAttribute` | パフォーマンス最適化属性 | キャッシュ戦略設定 |
| `ReadOnlyTableAttribute` | パフォーマンス最適化属性 | 読み取り専用テーブル最適化 |
| `EntityIndexAttribute` | パフォーマンス最適化属性 | データベースインデックス管理 |
| `PartitionTableAttribute` | パフォーマンス最適化属性 | パーティションストレージ設定 |
| `AuditTableAttribute` | データ管理属性 | 監査追跡 |
| `SoftDeleteAttribute` | データ管理属性 | 論理削除サポート |
| `VersionControlAttribute` | データ管理属性 | バージョン管理 |

## ライセンス

MIT + Apache 2.0
