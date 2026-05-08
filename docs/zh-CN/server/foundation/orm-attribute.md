# ORM 特性标注

GameFrameX ORM 特性库，提供了一套完整的数据库实体标记特性，用于增强 ORM 框架的功能和性能。

## 特性

- **基础特性标注**：常量标记、自定义统一结果处理等基础功能
- **表类型分类**：增量表、日志表、系统表等多种表类型标识
- **性能优化**：缓存策略、只读优化、索引管理、分区存储
- **数据管理**：审计跟踪、软删除、版本控制等企业级数据管理能力
- **灵活组合**：多个特性可自由组合使用，满足不同业务场景

## 安装

```bash
dotnet add package GameFrameX.Foundation.Orm.Attribute
```

## 快速开始

```csharp
using GameFrameX.Foundation.Orm.Attribute;

// 在实体类上应用特性
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

## 详细用法

### 基础特性

#### ConstAttribute
常量特性，用于标记类、方法、属性等为常量定义。

```csharp
[Const("DatabaseVersion")]
public class DatabaseConstants
{
    public const string Version = "1.0.0";
}
```

#### CustomUnifyResultAttribute
自定义统一结果特性，用于标记需要自定义结果统一处理的类或方法。

```csharp
[CustomUnifyResult("ApiResponse")]
public class UserController
{
    public User GetUser(int id) => userService.GetById(id);
}
```

### 表类型特性

#### IncrementSeedAttribute
增量种子特性，标记实体类支持自增种子值功能。

```csharp
[IncrementSeed]
public class User
{
    public int Id { get; set; }  // 自增主键
    public string Name { get; set; }
}
```

#### IncrementTableAttribute
增量表特性，标记实体类对应的数据库表支持增量操作。

```csharp
[IncrementTable]
public class UserActivity
{
    public int Id { get; set; }
    public DateTime Timestamp { get; set; }  // 用于增量判断
}
```

#### LogTableAttribute
日志表特性，标记实体类对应的数据库表为日志表。

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
系统表特性，标记实体类对应的数据库表为系统表。

```csharp
[SystemTable]
public class SystemConfiguration
{
    public string ConfigKey { get; set; }
    public string ConfigValue { get; set; }
}
```

### 性能优化特性

#### CacheTableAttribute
缓存表特性，标记实体类对应的数据库表支持缓存策略。

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
只读表特性，标记实体类对应的数据库表为只读表。

```csharp
[ReadOnlyTable(EnableCache = true, CacheMinutes = 60)]
public class CountryCode
{
    public string Code { get; set; }
    public string Name { get; set; }
}
```

#### EntityIndexAttribute
索引特性，标记属性或字段需要创建数据库索引。

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
分区表特性，标记实体类对应的数据库表支持分区存储。

```csharp
[PartitionTable("CreateDate", PartitionType.Range, PartitionInterval.Monthly)]
public class OrderHistory
{
    public int Id { get; set; }
    public DateTime CreateDate { get; set; }  // 分区键
}
```

### 数据管理特性

#### AuditTableAttribute
审计表特性，标记实体类对应的数据库表需要进行审计跟踪。

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
软删除特性，标记实体类支持软删除功能。

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
版本控制特性，标记实体类支持数据版本管理功能。

```csharp
[VersionControl("Version", VersionStrategy.Optimistic)]
public class Document
{
    public int Id { get; set; }
    public string Title { get; set; }
    public int Version { get; set; }  // 版本号字段
}
```

### 使用场景

#### 高频查询优化
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

#### 大数据表管理
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

#### 系统核心表
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

### 特性分类

#### 按优先级分类

**高优先级**（常用且实用）：
- `CacheTableAttribute` - 缓存策略
- `AuditTableAttribute` - 审计跟踪  
- `SoftDeleteAttribute` - 软删除
- `ReadOnlyTableAttribute` - 只读优化

**中优先级**（特定场景有用）：
- `EntityIndexAttribute` - 索引管理
- `PartitionTableAttribute` - 分区表
- `VersionControlAttribute` - 版本控制

**基础特性**（框架核心）：
- `ConstAttribute` - 常量标记
- `CustomUnifyResultAttribute` - 结果统一
- `IncrementSeedAttribute` - 自增种子
- `IncrementTableAttribute` - 增量表
- `LogTableAttribute` - 日志表
- `SystemTableAttribute` - 系统表

#### 按功能分类

**性能优化类**：
- `CacheTableAttribute`
- `ReadOnlyTableAttribute`
- `EntityIndexAttribute`
- `PartitionTableAttribute`

**数据管理类**：
- `AuditTableAttribute`
- `SoftDeleteAttribute`
- `VersionControlAttribute`
- `LogTableAttribute`

**表类型标识类**：
- `SystemTableAttribute`
- `IncrementTableAttribute`
- `IncrementSeedAttribute`

**框架功能类**：
- `ConstAttribute`
- `CustomUnifyResultAttribute`

## 最佳实践

1. **合理选择特性**：根据实际业务需求选择合适的特性，避免过度标注
2. **性能考虑**：缓存和索引特性要考虑内存和存储开销，高频查询表优先使用 `CacheTableAttribute`
3. **数据一致性**：审计和版本控制特性要考虑数据一致性要求，关键业务表建议使用 `AuditTableAttribute`
4. **维护成本**：复杂特性会增加系统维护成本，按需组合而非全部标注
5. **测试验证**：充分测试特性的功能和性能影响，特别是分区表和缓存策略

## API 参考

| 特性类 | 分类 | 说明 |
|--------|------|------|
| `ConstAttribute` | 基础特性 | 常量标记 |
| `CustomUnifyResultAttribute` | 基础特性 | 自定义统一结果处理 |
| `IncrementSeedAttribute` | 表类型特性 | 自增种子值 |
| `IncrementTableAttribute` | 表类型特性 | 增量表操作 |
| `LogTableAttribute` | 表类型特性 | 日志表标识 |
| `SystemTableAttribute` | 表类型特性 | 系统表标识 |
| `CacheTableAttribute` | 性能优化特性 | 缓存策略配置 |
| `ReadOnlyTableAttribute` | 性能优化特性 | 只读表优化 |
| `EntityIndexAttribute` | 性能优化特性 | 数据库索引管理 |
| `PartitionTableAttribute` | 性能优化特性 | 分区存储配置 |
| `AuditTableAttribute` | 数据管理特性 | 审计跟踪 |
| `SoftDeleteAttribute` | 数据管理特性 | 软删除支持 |
| `VersionControlAttribute` | 数据管理特性 | 版本控制管理 |

## 许可证

MIT + Apache 2.0
