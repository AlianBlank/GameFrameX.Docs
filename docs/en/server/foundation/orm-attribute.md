# ORM Attribute Annotations

GameFrameX ORM Attribute library provides a comprehensive set of database entity annotation attributes for enhancing ORM framework functionality and performance.

## Features

- **Basic Attribute Annotations**: Constant marking, custom unified result processing, and other foundational capabilities
- **Table Type Classification**: Increment tables, log tables, system tables, and other table type identifiers
- **Performance Optimization**: Cache strategies, read-only optimization, index management, partition storage
- **Data Management**: Audit tracking, soft delete, version control, and other enterprise-grade data management capabilities
- **Flexible Composition**: Multiple attributes can be freely combined to meet different business scenarios

## Installation

```bash
dotnet add package GameFrameX.Foundation.Orm.Attribute
```

## Quick Start

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

## Detailed Usage

### Basic Attributes

#### ConstAttribute
A constant attribute used to mark classes, methods, or properties as constant definitions.

```csharp
[Const("DatabaseVersion")]
public class DatabaseConstants
{
    public const string Version = "1.0.0";
}
```

#### CustomUnifyResultAttribute
A custom unified result attribute used to mark classes or methods that require custom unified result processing.

```csharp
[CustomUnifyResult("ApiResponse")]
public class UserController
{
    public User GetUser(int id) => userService.GetById(id);
}
```

### Table Type Attributes

#### IncrementSeedAttribute
An increment seed attribute that marks entity classes as supporting auto-increment seed values.

```csharp
[IncrementSeed]
public class User
{
    public int Id { get; set; }  // 自增主键
    public string Name { get; set; }
}
```

#### IncrementTableAttribute
An increment table attribute that marks the corresponding database table of an entity class as supporting incremental operations.

```csharp
[IncrementTable]
public class UserActivity
{
    public int Id { get; set; }
    public DateTime Timestamp { get; set; }  // 用于增量判断
}
```

#### LogTableAttribute
A log table attribute that marks the corresponding database table of an entity class as a log table.

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
A system table attribute that marks the corresponding database table of an entity class as a system table.

```csharp
[SystemTable]
public class SystemConfiguration
{
    public string ConfigKey { get; set; }
    public string ConfigValue { get; set; }
}
```

### Performance Optimization Attributes

#### CacheTableAttribute
A cache table attribute that marks the corresponding database table of an entity class as supporting cache strategies.

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
A read-only table attribute that marks the corresponding database table of an entity class as read-only.

```csharp
[ReadOnlyTable(EnableCache = true, CacheMinutes = 60)]
public class CountryCode
{
    public string Code { get; set; }
    public string Name { get; set; }
}
```

#### EntityIndexAttribute
An index attribute that marks a property or field as requiring a database index.

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
A partition table attribute that marks the corresponding database table of an entity class as supporting partition storage.

```csharp
[PartitionTable("CreateDate", PartitionType.Range, PartitionInterval.Monthly)]
public class OrderHistory
{
    public int Id { get; set; }
    public DateTime CreateDate { get; set; }  // 分区键
}
```

### Data Management Attributes

#### AuditTableAttribute
An audit table attribute that marks the corresponding database table of an entity class as requiring audit tracking.

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
A soft delete attribute that marks an entity class as supporting soft delete functionality.

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
A version control attribute that marks an entity class as supporting data version management functionality.

```csharp
[VersionControl("Version", VersionStrategy.Optimistic)]
public class Document
{
    public int Id { get; set; }
    public string Title { get; set; }
    public int Version { get; set; }  // 版本号字段
}
```

### Usage Scenarios

#### High-Frequency Query Optimization
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

#### Large Data Table Management
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

#### System Core Tables
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

### Attribute Classification

#### By Priority

**High Priority** (commonly used and practical):
- `CacheTableAttribute` - Cache strategy
- `AuditTableAttribute` - Audit tracking
- `SoftDeleteAttribute` - Soft delete
- `ReadOnlyTableAttribute` - Read-only optimization

**Medium Priority** (useful in specific scenarios):
- `EntityIndexAttribute` - Index management
- `PartitionTableAttribute` - Partition tables
- `VersionControlAttribute` - Version control

**Basic Attributes** (framework core):
- `ConstAttribute` - Constant marking
- `CustomUnifyResultAttribute` - Unified result processing
- `IncrementSeedAttribute` - Auto-increment seed
- `IncrementTableAttribute` - Increment table
- `LogTableAttribute` - Log table
- `SystemTableAttribute` - System table

#### By Function

**Performance Optimization**:
- `CacheTableAttribute`
- `ReadOnlyTableAttribute`
- `EntityIndexAttribute`
- `PartitionTableAttribute`

**Data Management**:
- `AuditTableAttribute`
- `SoftDeleteAttribute`
- `VersionControlAttribute`
- `LogTableAttribute`

**Table Type Identification**:
- `SystemTableAttribute`
- `IncrementTableAttribute`
- `IncrementSeedAttribute`

**Framework Functions**:
- `ConstAttribute`
- `CustomUnifyResultAttribute`

## Best Practices

1. **Choose Attributes Wisely**: Select appropriate attributes based on actual business requirements; avoid over-annotation
2. **Performance Considerations**: Consider memory and storage overhead for cache and index attributes; prioritize `CacheTableAttribute` for high-frequency query tables
3. **Data Consistency**: Consider data consistency requirements for audit and version control attributes; recommend `AuditTableAttribute` for critical business tables
4. **Maintenance Cost**: Complex attributes increase system maintenance cost; combine as needed rather than annotating everything
5. **Testing and Validation**: Thoroughly test the functionality and performance impact of attributes, especially for partition tables and cache strategies

## API Reference

| Attribute Class | Category | Description |
|-----------------|----------|-------------|
| `ConstAttribute` | Basic Attribute | Constant marking |
| `CustomUnifyResultAttribute` | Basic Attribute | Custom unified result processing |
| `IncrementSeedAttribute` | Table Type Attribute | Auto-increment seed value |
| `IncrementTableAttribute` | Table Type Attribute | Increment table operations |
| `LogTableAttribute` | Table Type Attribute | Log table identifier |
| `SystemTableAttribute` | Table Type Attribute | System table identifier |
| `CacheTableAttribute` | Performance Optimization Attribute | Cache strategy configuration |
| `ReadOnlyTableAttribute` | Performance Optimization Attribute | Read-only table optimization |
| `EntityIndexAttribute` | Performance Optimization Attribute | Database index management |
| `PartitionTableAttribute` | Performance Optimization Attribute | Partition storage configuration |
| `AuditTableAttribute` | Data Management Attribute | Audit tracking |
| `SoftDeleteAttribute` | Data Management Attribute | Soft delete support |
| `VersionControlAttribute` | Data Management Attribute | Version control management |

## License

MIT + Apache 2.0
