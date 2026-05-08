# ORM Entity Base Classes

A foundational ORM entity definition library that provides entity base classes and interfaces with zero dependency on any third-party framework, supporting enterprise-grade features such as audit tracking, soft delete, and optimistic locking.

## Features

- **Zero Framework Dependencies**: Uses only the .NET standard library with no ORM framework dependencies; can be freely combined with any ORM
- **Complete Audit Tracking**: Automatically records creation and update information (time, user ID, username)
- **Soft Delete Support**: Marks records as deleted rather than physically removing them; supports data recovery
- **Optimistic Locking Concurrency Control**: Version number-based concurrency conflict detection mechanism
- **Multi-Tenant Architecture**: Built-in tenant ID support to meet SaaS scenario requirements
- **Flexible Inheritance Hierarchy**: Multi-level selection from basic interfaces to full-featured base classes

## Installation

```bash
dotnet add package GameFrameX.Foundation.Orm.Entity
```

## Quick Start

```csharp
using GameFrameX.Foundation.Orm.Entity;

// 继承 EntityBase 即可获得全部企业级功能
public class User : EntityBase
{
    public string Username { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }

    // EntityBase 自动提供的属性:
    // - long Id                    // 主键
    // - DateTime CreateTime        // 创建时间
    // - DateTime UpdateTime        // 更新时间
    // - long CreateUserId          // 创建人 ID
    // - long UpdateUserId          // 更新人 ID
    // - string CreateUserName      // 创建人姓名
    // - string UpdateUserName      // 更新人姓名
    // - bool IsDelete              // 软删除标记
    // - long Version               // 乐观锁版本
    // - bool IsEnabled             // 启用状态
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

## Detailed Usage

### Core Interfaces

- **IEntity**: Base entity interface
- **`IEntity<TKey>`**: Entity interface with primary key, supporting generic key types
- **IVersionedEntity**: Versioned entity interface, supporting optimistic locking

### Filter Interfaces

- **ISafeCreatedFilter**: Creation information filter (`CreatedId`, `CreatedTime`, `CreatedName`)
- **ISafeUpdateFilter**: Update information filter (`UpdateCount`, `UpdateTime`, `UpdatedId`, `UpdatedName`)
- **ISafeDeletedFilter**: Soft delete filter (`IsDeleted`, `DeleteTime`, `DeletedId`, `DeletedName`)
- **ISafeEnabledFilter**: Enabled status filter (`IsEnabled`)
- **ITenantIdFilter**: Tenant ID filter (`TenantId`)
- **ISelectFilter**: Search query filter (`Name`, `Description`)
- **IOrganizationIdFilter**: Organization ID filter (`CreateOrganizationId`)

### Entity Base Classes

#### EntityBaseId / `EntityBaseId<TKey>`
- Provides primary key field
- Supports `long` type and generic primary keys
- Implements IEntity interface

#### EntityBase / `EntityBase<TKey>`
- Inherits from EntityBaseId
- Implements `ISafeCreatedFilter`, `ISafeUpdateFilter`, `ISafeDeletedFilter`, `ISafeEnabledFilter`, `IVersionedEntity`
- All fields are nullable types
- Supports version control (optimistic locking)

#### EntityTenantBase / `EntityTenantBase<TKey>`
- Inherits from EntityBase
- Implements `ITenantIdFilter`
- Supports multi-tenant architecture

#### EntitySelectBase
- Inherits from EntityBase
- Implements `ISelectFilter` interface
- Includes name and description fields; suitable for entities that need search functionality

### Core Components

| Component | File | Description |
|-----------|------|-------------|
| EntityBase | `EntityBase.cs` | Full-featured entity base class (ID, audit, soft delete, version control) |
| EntityBaseId (Generic) | `EntityBaseId.cs` | Custom primary key type entity base class |
| IEntity | `IEntity.cs` | Base entity interface |
| IAuditableEntity | `IAuditableEntity.cs` | Audit interface (creation/update time and user) |

### Custom Primary Key Types

```csharp
// 使用 string 作为主键
public class Product : EntityBaseId<string>
{
    public string Name { get; set; }
    public decimal Price { get; set; }
    public string Description { get; set; }
}

// 使用 Guid 作为主键
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

### Interface Implementation

```csharp
// 实现基础实体接口
public class Category : IEntity<int>
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
}

// 实现审计接口
public class AuditableCategory : IEntity<int>, IAuditableEntity
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }

    // IAuditableEntity 接口属性
    public DateTime CreateTime { get; set; }
    public DateTime UpdateTime { get; set; }
    public long CreateUserId { get; set; }
    public long UpdateUserId { get; set; }
    public string CreateUserName { get; set; }
    public string UpdateUserName { get; set; }
}
```

### Multi-Tenant Entities

```csharp
public class TenantOrder : EntityTenantBase
{
    public string OrderNumber { get; set; }
    public decimal Amount { get; set; }
}
```

### Searchable Entities

```csharp
public class SearchableCategory : EntitySelectBase
{
    public int? SortOrder { get; set; }
}
```

### Audit Tracking

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

// 更新时自动维护审计信息
document.Content = "Updated content";
document.UpdateTime = DateTime.UtcNow;
document.UpdateUserId = currentUser.Id;
document.UpdateUserName = currentUser.Username;
document.Version++; // 乐观锁版本递增
```

### Soft Delete

```csharp
// 软删除：标记为已删除而非物理删除
public void SoftDeleteUser(User user)
{
    user.IsDelete = true;
    user.UpdateTime = DateTime.UtcNow;
    user.UpdateUserId = currentUser.Id;
    user.UpdateUserName = currentUser.Username;
    dbContext.SaveChanges();
}

// 查询时过滤已删除记录
var activeUsers = dbContext.Users
    .Where(u => !u.IsDelete)
    .ToList();

// 恢复已删除记录
public void RestoreUser(User user)
{
    user.IsDelete = false;
    user.UpdateTime = DateTime.UtcNow;
    user.UpdateUserId = currentUser.Id;
    user.UpdateUserName = currentUser.Username;
    dbContext.SaveChanges();
}
```

### Optimistic Locking

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

### Enable/Disable Status Management

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

## Best Practices

1. **Choose the Right Base Class**: Use `EntityBaseId<TKey>` for simple entities, `EntityBase` when audit and soft delete are needed, and `EntityTenantBase` for multi-tenant scenarios
2. **Follow Design Principles**: Each interface and class has a clear responsibility; extend functionality through inheritance and interface implementation; depend on abstract interfaces rather than concrete implementations
3. **Use Nullable Types Flexibly**: All fields are nullable types, providing greater flexibility; be mindful of null checks when querying
4. **Use Optimistic Locking in Required Scenarios**: Always use version control in high-concurrency update scenarios to avoid data overwrites
5. **Filter Soft-Deleted Records in Queries**: Always filter by the `IsDelete` flag when querying to prevent deleted data from leaking into the business layer

## API Reference

| Class/Interface | Type | Description |
|-----------------|------|-------------|
| `IEntity` | Interface | Base entity interface |
| `IEntity<TKey>` | Interface | Entity interface with generic primary key |
| `IAuditableEntity` | Interface | Audit interface (creation/update time and user) |
| `IVersionedEntity` | Interface | Versioned entity interface |
| `ISafeCreatedFilter` | Interface | Creation information filter |
| `ISafeUpdateFilter` | Interface | Update information filter |
| `ISafeDeletedFilter` | Interface | Soft delete filter |
| `ISafeEnabledFilter` | Interface | Enabled status filter |
| `ITenantIdFilter` | Interface | Tenant ID filter |
| `ISelectFilter` | Interface | Search query filter |
| `IOrganizationIdFilter` | Interface | Organization ID filter |
| `EntityBaseId<TKey>` | Base Class | Custom primary key type entity base class |
| `EntityBase<TKey>` | Base Class | Full-featured entity base class |
| `EntityTenantBase<TKey>` | Base Class | Multi-tenant entity base class |
| `EntitySelectBase` | Base Class | Searchable entity base class |

## License

MIT + Apache 2.0
