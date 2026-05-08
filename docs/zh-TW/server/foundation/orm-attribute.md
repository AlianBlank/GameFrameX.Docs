# ORM 特性標註

GameFrameX ORM 特性庫，提供了一套完整的資料庫實體標記特性，用於增強 ORM 框架的功能和效能。

## 特性

- **基礎特性標註**：常數標記、自訂統一結果處理等基礎功能
- **表型別分類**：增量表、日誌表、系統表等多種表型別識別
- **效能最佳化**：快取策略、唯讀最佳化、索引管理、分區儲存
- **資料管理**：審計追蹤、軟刪除、版本控制等企業級資料管理能力
- **彈性組合**：多個特性可自由組合使用，滿足不同業務場景

## 安裝

```bash
dotnet add package GameFrameX.Foundation.Orm.Attribute
```

## 快速開始

```csharp
using GameFrameX.Foundation.Orm.Attribute;

// 在實體類別上套用特性
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

## 詳細用法

### 基礎特性

#### ConstAttribute
常數特性，用於標記類別、方法、屬性等為常數定義。

```csharp
[Const("DatabaseVersion")]
public class DatabaseConstants
{
    public const string Version = "1.0.0";
}
```

#### CustomUnifyResultAttribute
自訂統一結果特性，用於標記需要自訂結果統一處理的類別或方法。

```csharp
[CustomUnifyResult("ApiResponse")]
public class UserController
{
    public User GetUser(int id) => userService.GetById(id);
}
```

### 表型別特性

#### IncrementSeedAttribute
增量種子特性，標記實體類別支援自增種子值功能。

```csharp
[IncrementSeed]
public class User
{
    public int Id { get; set; }  // 自增主鍵
    public string Name { get; set; }
}
```

#### IncrementTableAttribute
增量表特性，標記實體類別對應的資料庫表支援增量操作。

```csharp
[IncrementTable]
public class UserActivity
{
    public int Id { get; set; }
    public DateTime Timestamp { get; set; }  // 用於增量判斷
}
```

#### LogTableAttribute
日誌表特性，標記實體類別對應的資料庫表為日誌表。

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
系統表特性，標記實體類別對應的資料庫表為系統表。

```csharp
[SystemTable]
public class SystemConfiguration
{
    public string ConfigKey { get; set; }
    public string ConfigValue { get; set; }
}
```

### 效能最佳化特性

#### CacheTableAttribute
快取表特性，標記實體類別對應的資料庫表支援快取策略。

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
唯讀表特性，標記實體類別對應的資料庫表為唯讀表。

```csharp
[ReadOnlyTable(EnableCache = true, CacheMinutes = 60)]
public class CountryCode
{
    public string Code { get; set; }
    public string Name { get; set; }
}
```

#### EntityIndexAttribute
索引特性，標記屬性或欄位需要建立資料庫索引。

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
分區表特性，標記實體類別對應的資料庫表支援分區儲存。

```csharp
[PartitionTable("CreateDate", PartitionType.Range, PartitionInterval.Monthly)]
public class OrderHistory
{
    public int Id { get; set; }
    public DateTime CreateDate { get; set; }  // 分區鍵
}
```

### 資料管理特性

#### AuditTableAttribute
審計表特性，標記實體類別對應的資料庫表需要進行審計追蹤。

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
軟刪除特性，標記實體類別支援軟刪除功能。

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
版本控制特性，標記實體類別支援資料版本管理功能。

```csharp
[VersionControl("Version", VersionStrategy.Optimistic)]
public class Document
{
    public int Id { get; set; }
    public string Title { get; set; }
    public int Version { get; set; }  // 版本號欄位
}
```

### 使用場景

#### 高頻查詢最佳化
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

#### 大資料表管理
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

#### 系統核心表
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

### 特性分類

#### 按優先級分類

**高優先級**（常用且實用）：
- `CacheTableAttribute` - 快取策略
- `AuditTableAttribute` - 審計追蹤
- `SoftDeleteAttribute` - 軟刪除
- `ReadOnlyTableAttribute` - 唯讀最佳化

**中優先級**（特定場景有用）：
- `EntityIndexAttribute` - 索引管理
- `PartitionTableAttribute` - 分區表
- `VersionControlAttribute` - 版本控制

**基礎特性**（框架核心）：
- `ConstAttribute` - 常數標記
- `CustomUnifyResultAttribute` - 結果統一
- `IncrementSeedAttribute` - 自增種子
- `IncrementTableAttribute` - 增量表
- `LogTableAttribute` - 日誌表
- `SystemTableAttribute` - 系統表

#### 按功能分類

**效能最佳化類**：
- `CacheTableAttribute`
- `ReadOnlyTableAttribute`
- `EntityIndexAttribute`
- `PartitionTableAttribute`

**資料管理類**：
- `AuditTableAttribute`
- `SoftDeleteAttribute`
- `VersionControlAttribute`
- `LogTableAttribute`

**表型別識別類**：
- `SystemTableAttribute`
- `IncrementTableAttribute`
- `IncrementSeedAttribute`

**框架功能類**：
- `ConstAttribute`
- `CustomUnifyResultAttribute`

## 最佳實踐

1. **合理選擇特性**：根據實際業務需求選擇合適的特性，避免過度標註
2. **效能考量**：快取和索引特性要考慮記憶體和儲存開銷，高頻查詢表優先使用 `CacheTableAttribute`
3. **資料一致性**：審計和版本控制特性要考慮資料一致性要求，關鍵業務表建議使用 `AuditTableAttribute`
4. **維護成本**：複雜特性會增加系統維護成本，按需組合而非全部標註
5. **測試驗證**：充分測試特性的功能和效能影響，特別是分區表和快取策略

## API 參考

| 特性類別 | 分類 | 說明 |
|--------|------|------|
| `ConstAttribute` | 基礎特性 | 常數標記 |
| `CustomUnifyResultAttribute` | 基礎特性 | 自訂統一結果處理 |
| `IncrementSeedAttribute` | 表型別特性 | 自增種子值 |
| `IncrementTableAttribute` | 表型別特性 | 增量表操作 |
| `LogTableAttribute` | 表型別特性 | 日誌表識別 |
| `SystemTableAttribute` | 表型別特性 | 系統表識別 |
| `CacheTableAttribute` | 效能最佳化特性 | 快取策略設定 |
| `ReadOnlyTableAttribute` | 效能最佳化特性 | 唯讀表最佳化 |
| `EntityIndexAttribute` | 效能最佳化特性 | 資料庫索引管理 |
| `PartitionTableAttribute` | 效能最佳化特性 | 分區儲存設定 |
| `AuditTableAttribute` | 資料管理特性 | 審計追蹤 |
| `SoftDeleteAttribute` | 資料管理特性 | 軟刪除支援 |
| `VersionControlAttribute` | 資料管理特性 | 版本控制管理 |

## 授權條款

MIT + Apache 2.0
