# ORM エンティティ基底クラス

基本 ORM エンティティ定義ライブラリです。サードパーティフレームワークに依存しないエンティティ基底クラスとインターフェースを提供し、監査追跡、論理削除、楽観的ロックなどのエンタープライズ機能をサポートします。

## 特徴

- **ゼロフレームワーク依存** - .NET 標準ライブラリのみを使用し、任意の ORM フレームワークに依存しないため、自由に組み合わせて使用可能
- **完全な監査追跡** - 作成と更新の情報（時間、ユーザーID、ユーザー名）を自動記録
- **論理削除サポート** - 物理削除ではなくマーキングによる削除、データの復元をサポート
- **楽観的ロック同時実行制御** - バージョン番号に基づく同時実行競合検出機構
- **マルチテナントアーキテクチャ** - テナントIDサポートを内蔵し、SaaS シナリオに対応
- **柔軟な継承体系** - 基本インターフェースからフル機能基底クラスまでの多層選択肢

## インストール

```bash
dotnet add package GameFrameX.Foundation.Orm.Entity
```

## クイックスタート

```csharp
using GameFrameX.Foundation.Orm.Entity;

// EntityBase を継承するだけで、すべてのエンタープライズ機能を利用可能
public class User : EntityBase
{
    public string Username { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }

    // EntityBase が自動提供するプロパティ:
    // - long Id                    // 主キー
    // - DateTime CreateTime        // 作成日時
    // - DateTime UpdateTime        // 更新日時
    // - long CreateUserId          // 作成者 ID
    // - long UpdateUserId          // 更新者 ID
    // - string CreateUserName      // 作成者氏名
    // - string UpdateUserName      // 更新者氏名
    // - bool IsDelete              // 論理削除フラグ
    // - long Version               // 楽観的ロックバージョン
    // - bool IsEnabled             // 有効状態
}

var user = new User
{
    Username = "john_doe",
    Email = "john@example.com",
    PasswordHash = "hashed_password",
    CreateTime = DateTime.UtcNow,
    CreateUserId = 1,
    CreateUserName = "admin",
    IsEnabled = true
};
```

## 詳細な使い方

### コアインターフェース

- **IEntity**: エンティティ基本インターフェース
- **`IEntity<TKey>`**: 主キー付きエンティティインターフェース。ジェネリック主キー型をサポート
- **IVersionedEntity**: バージョン管理エンティティインターフェース。楽観的ロックをサポート

### フィルターインターフェース

- **ISafeCreatedFilter**: 作成情報フィルター（`CreatedId`、`CreatedTime`、`CreatedName`）
- **ISafeUpdateFilter**: 更新情報フィルター（`UpdateCount`、`UpdateTime`、`UpdatedId`、`UpdatedName`）
- **ISafeDeletedFilter**: 論理削除フィルター（`IsDeleted`、`DeleteTime`、`DeletedId`、`DeletedName`）
- **ISafeEnabledFilter**: 有効状態フィルター（`IsEnabled`）
- **ITenantIdFilter**: テナントIDフィルター（`TenantId`）
- **ISelectFilter**: 検索クエリフィルター（`Name`、`Description`）
- **IOrganizationIdFilter**: 組織IDフィルター（`CreateOrganizationId`）

### エンティティ基底クラス

#### EntityBaseId / `EntityBaseId<TKey>`
- 主キーフィールドを提供
- long 型主キーとジェネリック主キーをサポート
- IEntity インターフェースを実装

#### EntityBase / `EntityBase<TKey>`
- EntityBaseId を継承
- `ISafeCreatedFilter`、`ISafeUpdateFilter`、`ISafeDeletedFilter`、`ISafeEnabledFilter`、`IVersionedEntity` を実装
- すべてのフィールドがNull許容型
- バージョン管理（楽観的ロック）をサポート

#### EntityTenantBase / `EntityTenantBase<TKey>`
- EntityBase を継承
- `ITenantIdFilter` を実装
- マルチテナントアーキテクチャをサポート

#### EntitySelectBase
- EntityBase を継承
- `ISelectFilter` インターフェースを実装
- 名前と説明のフィールドを含み、検索が必要なエンティティに適用

### コアコンポーネント

| コンポーネント | ファイル | 説明 |
|------|------|------|
| EntityBase | `EntityBase.cs` | フル機能エンティティ基底クラス（ID、監査、論理削除、バージョン管理） |
| EntityBaseId (Generic) | `EntityBaseId.cs` | カスタム主キー型エンティティ基底クラス |
| IEntity | `IEntity.cs` | 基本エンティティインターフェース |
| IAuditableEntity | `IAuditableEntity.cs` | 監査インターフェース（作成/更新の時間とユーザー） |

### カスタム主キー型

```csharp
// 文字列を主キーとして使用
public class Product : EntityBaseId<string>
{
    public string Name { get; set; }
    public decimal Price { get; set; }
    public string Description { get; set; }
}

// Guid を主キーとして使用
public class Order : EntityBaseId<Guid>
{
    public string OrderNumber { get; set; }
    public decimal TotalAmount { get; set; }
    public DateTime OrderDate { get; set; }
}

var product = new Product
{
    Id = "PROD-001",
    Name = "Laptop",
    Price = 5999.99m,
    Description = "High performance laptop"
};

var order = new Order
{
    Id = Guid.NewGuid(),
    OrderNumber = "ORD-20240101-001",
    TotalAmount = 5999.99m,
    OrderDate = DateTime.UtcNow
};
```

### インターフェース実装

```csharp
// 基本エンティティインターフェースの実装
public class Category : IEntity<int>
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
}

// 監査インターフェースの実装
public class AuditableCategory : IEntity<int>, IAuditableEntity
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }

    // IAuditableEntity インターフェースのプロパティ
    public DateTime CreateTime { get; set; }
    public DateTime UpdateTime { get; set; }
    public long CreateUserId { get; set; }
    public long UpdateUserId { get; set; }
    public string CreateUserName { get; set; }
    public string UpdateUserName { get; set; }
}
```

### マルチテナントエンティティ

```csharp
public class TenantOrder : EntityTenantBase
{
    public string OrderNumber { get; set; }
    public decimal Amount { get; set; }
}
```

### 検索可能エンティティ

```csharp
public class SearchableCategory : EntitySelectBase
{
    public int? SortOrder { get; set; }
}
```

### 監査追跡

```csharp
public class Document : EntityBase
{
    public string Title { get; set; }
    public string Content { get; set; }
}

var document = new Document
{
    Title = "Important Document",
    Content = "Document content...",
    CreateTime = DateTime.UtcNow,
    CreateUserId = currentUser.Id,
    CreateUserName = currentUser.Username,
    UpdateTime = DateTime.UtcNow,
    UpdateUserId = currentUser.Id,
    UpdateUserName = currentUser.Username
};

// 更新時に監査情報を自動保守
document.Content = "Updated content";
document.UpdateTime = DateTime.UtcNow;
document.UpdateUserId = currentUser.Id;
document.UpdateUserName = currentUser.Username;
document.Version++; // 楽観的ロックバージョンのインクリメント
```

### 論理削除

```csharp
// 論理削除：物理削除ではなく削除済みとしてマーク
public void SoftDeleteUser(User user)
{
    user.IsDelete = true;
    user.UpdateTime = DateTime.UtcNow;
    user.UpdateUserId = currentUser.Id;
    user.UpdateUserName = currentUser.Username;
    dbContext.SaveChanges();
}

// クエリ時に削除済みレコードをフィルター
var activeUsers = dbContext.Users
    .Where(u => !u.IsDelete)
    .ToList();

// 削除済みレコードの復元
public void RestoreUser(User user)
{
    user.IsDelete = false;
    user.UpdateTime = DateTime.UtcNow;
    user.UpdateUserId = currentUser.Id;
    user.UpdateUserName = currentUser.Username;
    dbContext.SaveChanges();
}
```

### 楽観的ロック

```csharp
public void UpdateUserWithOptimisticLock(long userId, string newEmail)
{
    var user = dbContext.Users.Find(userId);
    var originalVersion = user.Version;

    user.Email = newEmail;
    user.UpdateTime = DateTime.UtcNow;
    user.UpdateUserId = currentUser.Id;
    user.UpdateUserName = currentUser.Username;
    user.Version++;

    try
    {
        var rowsAffected = dbContext.Database.ExecuteSqlRaw(
            "UPDATE Users SET Email = {0}, Version = {1} WHERE Id = {2} AND Version = {3}",
            user.Email, user.Version, user.Id, originalVersion);

        if (rowsAffected == 0)
            throw new ConcurrencyException("Data modified by another user, please refresh and retry");
    }
    catch (DbUpdateConcurrencyException)
    {
        throw new ConcurrencyException("Concurrency conflict, please refresh and retry");
    }
}
```

### 有効/無効状態管理

```csharp
public class Feature : EntityBase
{
    public string Name { get; set; }
    public string Description { get; set; }
}

public void ToggleFeature(long featureId, bool enabled)
{
    var feature = dbContext.Features.Find(featureId);
    feature.IsEnabled = enabled;
    feature.UpdateTime = DateTime.UtcNow;
    feature.Version++;
    dbContext.SaveChanges();
}

var enabledFeatures = dbContext.Features
    .Where(f => f.IsEnabled && !f.IsDelete)
    .ToList();
```

## ベストプラクティス

1. **要件に応じた基底クラスの選択** - 単純なエンティティには `EntityBaseId<TKey>` を使用し、監査や論理削除が必要な場合は `EntityBase` を、マルチテナントシナリオには `EntityTenantBase` を使用
2. **設計原則の遵守** - 各インターフェースとクラスには明確な責務があり、継承とインターフェース実装によって機能を拡張し、抽象インターフェースに依存して具象実装から切り離す
3. **Null許容型の柔軟な活用** - すべてのフィールドがNull許容型であり、より高い柔軟性を提供。クエリ時はnull値の判定に注意
4. **楽観的ロックが必須のシナリオ** - 高同時実行更新シナリオでは必ずバージョン管理を使用し、データの上書きを防止
5. **論理削除のクエリフィルタリング** - クエリ時は常に `IsDelete` フラグでフィルタリングし、削除済みデータがビジネス層に漏出するのを防止

## API リファレンス

| クラス/インターフェース | 種別 | 説明 |
|---------|------|------|
| `IEntity` | インターフェース | エンティティ基本インターフェース |
| `IEntity<TKey>` | インターフェース | ジェネリック主キー付きエンティティインターフェース |
| `IAuditableEntity` | インターフェース | 監査インターフェース（作成/更新の時間とユーザー） |
| `IVersionedEntity` | インターフェース | バージョン管理エンティティインターフェース |
| `ISafeCreatedFilter` | インターフェース | 作成情報フィルター |
| `ISafeUpdateFilter` | インターフェース | 更新情報フィルター |
| `ISafeDeletedFilter` | インターフェース | 論理削除フィルター |
| `ISafeEnabledFilter` | インターフェース | 有効状態フィルター |
| `ITenantIdFilter` | インターフェース | テナントIDフィルター |
| `ISelectFilter` | インターフェース | 検索クエリフィルター |
| `IOrganizationIdFilter` | インターフェース | 組織IDフィルター |
| `EntityBaseId<TKey>` | 基底クラス | カスタム主キー型エンティティ基底クラス |
| `EntityBase<TKey>` | 基底クラス | フル機能エンティティ基底クラス |
| `EntityTenantBase<TKey>` | 基底クラス | マルチテナントエンティティ基底クラス |
| `EntitySelectBase` | 基底クラス | 検索可能エンティティ基底クラス |

## ライセンス

MIT + Apache 2.0
