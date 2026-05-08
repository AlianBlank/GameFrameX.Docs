# ORM 實體基類

基礎 ORM 實體定義庫，提供不依賴任何第三方框架的實體基類和介面，支援審計追蹤、軟刪除、樂觀鎖等企業級功能。

## 特性

- **零框架依賴**：僅使用 .NET 標準庫，不依賴任何 ORM 框架，可自由搭配使用
- **完整審計追蹤**：自動記錄建立和更新資訊（時間、使用者 ID、使用者名稱）
- **軟刪除支援**：標記刪除而非實體刪除，支援資料恢復
- **樂觀鎖並行控制**：基於版本號的並行衝突偵測機制
- **多租戶架構**：內建租戶 ID 支援，滿足 SaaS 場景需求
- **彈性繼承體系**：從基礎介面到全功能基類的多層級選擇

## 安裝

```bash
dotnet add package GameFrameX.Foundation.Orm.Entity
```

## 快速開始

```csharp
using GameFrameX.Foundation.Orm.Entity;

// 繼承 EntityBase 即可獲得全部企業級功能
public class User : EntityBase
{
    public string Username { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }

    // EntityBase 自動提供的屬性:
    // - long Id                    // 主鍵
    // - DateTime CreateTime        // 建立時間
    // - DateTime UpdateTime        // 更新時間
    // - long CreateUserId          // 建立者 ID
    // - long UpdateUserId          // 更新者 ID
    // - string CreateUserName      // 建立者姓名
    // - string UpdateUserName      // 更新者姓名
    // - bool IsDelete              // 軟刪除標記
    // - long Version               // 樂觀鎖版本
    // - bool IsEnabled             // 啟用狀態
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

## 詳細用法

### 核心介面

- **IEntity**: 實體基礎介面
- **`IEntity<TKey>`**: 帶主鍵的實體介面，支援泛型主鍵型別
- **IVersionedEntity**: 版本控制實體介面，支援樂觀鎖

### 過濾器介面

- **ISafeCreatedFilter**: 建立資訊過濾器（`CreatedId`、`CreatedTime`、`CreatedName`）
- **ISafeUpdateFilter**: 更新資訊過濾器（`UpdateCount`、`UpdateTime`、`UpdatedId`、`UpdatedName`）
- **ISafeDeletedFilter**: 軟刪除過濾器（`IsDeleted`、`DeleteTime`、`DeletedId`、`DeletedName`）
- **ISafeEnabledFilter**: 啟用狀態過濾器（`IsEnabled`）
- **ITenantIdFilter**: 租戶 ID 過濾器（`TenantId`）
- **ISelectFilter**: 搜尋查詢過濾器（`Name`、`Description`）
- **IOrganizationIdFilter**: 機構 ID 過濾器（`CreateOrganizationId`）

### 實體基類

#### EntityBaseId / `EntityBaseId<TKey>`
- 提供主鍵欄位
- 支援 long 型別主鍵和泛型主鍵
- 實作 IEntity 介面

#### EntityBase / `EntityBase<TKey>`
- 繼承自 EntityBaseId
- 實作 `ISafeCreatedFilter`、`ISafeUpdateFilter`、`ISafeDeletedFilter`、`ISafeEnabledFilter`、`IVersionedEntity`
- 所有欄位均為可空型別
- 支援版本控制（樂觀鎖）

#### EntityTenantBase / `EntityTenantBase<TKey>`
- 繼承自 EntityBase
- 實作 `ITenantIdFilter`
- 支援多租戶架構

#### EntitySelectBase
- 繼承自 EntityBase
- 實作 `ISelectFilter` 介面
- 包含名稱和描述欄位，適用於需要搜尋的實體

### 核心元件

| 元件 | 檔案 | 說明 |
|------|------|------|
| EntityBase | `EntityBase.cs` | 全功能實體基類（ID、審計、軟刪除、版本控制） |
| EntityBaseId (Generic) | `EntityBaseId.cs` | 自訂主鍵型別實體基類 |
| IEntity | `IEntity.cs` | 基礎實體介面 |
| IAuditableEntity | `IAuditableEntity.cs` | 審計介面（建立/更新時間和使用者） |

### 自訂主鍵型別

```csharp
// 使用 string 作為主鍵
public class Product : EntityBaseId<string>
{
    public string Name { get; set; }
    public decimal Price { get; set; }
    public string Description { get; set; }
}

// 使用 Guid 作為主鍵
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

### 介面實作

```csharp
// 實作基礎實體介面
public class Category : IEntity<int>
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
}

// 實作審計介面
public class AuditableCategory : IEntity<int>, IAuditableEntity
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }

    // IAuditableEntity 介面屬性
    public DateTime CreateTime { get; set; }
    public DateTime UpdateTime { get; set; }
    public long CreateUserId { get; set; }
    public long UpdateUserId { get; set; }
    public string CreateUserName { get; set; }
    public string UpdateUserName { get; set; }
}
```

### 多租戶實體

```csharp
public class TenantOrder : EntityTenantBase
{
    public string OrderNumber { get; set; }
    public decimal Amount { get; set; }
}
```

### 可搜尋實體

```csharp
public class SearchableCategory : EntitySelectBase
{
    public int? SortOrder { get; set; }
}
```

### 審計追蹤

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

// 更新時自動維護審計資訊
document.Content = "Updated content";
document.UpdateTime = DateTime.UtcNow;
document.UpdateUserId = currentUser.Id;
document.UpdateUserName = currentUser.Username;
document.Version++; // 樂觀鎖版本遞增
```

### 軟刪除

```csharp
// 軟刪除：標記為已刪除而非實體刪除
public void SoftDeleteUser(User user)
{
    user.IsDelete = true;
    user.UpdateTime = DateTime.UtcNow;
    user.UpdateUserId = currentUser.Id;
    user.UpdateUserName = currentUser.Username;
    dbContext.SaveChanges();
}

// 查詢時過濾已刪除記錄
var activeUsers = dbContext.Users
    .Where(u => !u.IsDelete)
    .ToList();

// 恢復已刪除記錄
public void RestoreUser(User user)
{
    user.IsDelete = false;
    user.UpdateTime = DateTime.UtcNow;
    user.UpdateUserId = currentUser.Id;
    user.UpdateUserName = currentUser.Username;
    dbContext.SaveChanges();
}
```

### 樂觀鎖

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

### 啟用/禁用狀態管理

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

## 最佳實踐

1. **按需選擇基類**：簡單實體使用 `EntityBaseId<TKey>`，需要審計和軟刪除時使用 `EntityBase`，多租戶場景使用 `EntityTenantBase`
2. **設計原則遵循**：每個介面和類別都有明確的職責，透過繼承和介面實作擴充功能，依賴抽象介面而非具體實作
3. **可空型別彈性使用**：所有欄位均為可空型別，提供更好的彈性，查詢時注意空值判斷
4. **樂觀鎖必用場景**：高並行更新場景務必使用版本控制，避免資料覆蓋
5. **軟刪除查詢過濾**：查詢時始終過濾 `IsDelete` 標記，防止已刪除資料洩漏到業務層

## API 參考

| 類別/介面 | 型別 | 說明 |
|---------|------|------|
| `IEntity` | 介面 | 實體基礎介面 |
| `IEntity<TKey>` | 介面 | 帶泛型主鍵的實體介面 |
| `IAuditableEntity` | 介面 | 審計介面（建立/更新時間和使用者） |
| `IVersionedEntity` | 介面 | 版本控制實體介面 |
| `ISafeCreatedFilter` | 介面 | 建立資訊過濾器 |
| `ISafeUpdateFilter` | 介面 | 更新資訊過濾器 |
| `ISafeDeletedFilter` | 介面 | 軟刪除過濾器 |
| `ISafeEnabledFilter` | 介面 | 啟用狀態過濾器 |
| `ITenantIdFilter` | 介面 | 租戶 ID 過濾器 |
| `ISelectFilter` | 介面 | 搜尋查詢過濾器 |
| `IOrganizationIdFilter` | 介面 | 機構 ID 過濾器 |
| `EntityBaseId<TKey>` | 基類 | 自訂主鍵型別實體基類 |
| `EntityBase<TKey>` | 基類 | 全功能實體基類 |
| `EntityTenantBase<TKey>` | 基類 | 多租戶實體基類 |
| `EntitySelectBase` | 基類 | 可搜尋實體基類 |

## 授權條款

MIT + Apache 2.0
