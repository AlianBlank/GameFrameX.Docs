# ORM 엔티티 기반 클래스

기본 ORM 엔티티 정의 라이브러리로, 서드파티 프레임워크에 의존하지 않는 엔티티 기반 클래스와 인터페이스를 제공하며, 감사 추적, 소프트 삭제, 낙관적 잠금 등 엔터프라이즈급 기능을 지원합니다.

## 특징

- **제로 프레임워크 종속성**: .NET 표준 라이브러리만 사용하며 어떤 ORM 프레임워크에도 의존하지 않아 자유롭게 조합 가능
- **완전한 감사 추적**: 생성 및 업데이트 정보(시간, 사용자 ID, 사용자 이름)를 자동으로 기록
- **소프트 삭제 지원**: 물리적 삭제 대신 마킹으로 삭제하여 데이터 복구 지원
- **낙관적 잠금 동시성 제어**: 버전 번호 기반의 동시성 충돌 감지 메커니즘
- **멀티테넌트 아키텍처**: 테넌트 ID 기본 지원으로 SaaS 시나리오 충족
- **유연한 상속 체계**: 기본 인터페이스부터 전체 기능 기반 클래스까지 다단계 선택 가능

## 설치

```bash
dotnet add package GameFrameX.Foundation.Orm.Entity
```

## 빠른 시작

```csharp
using GameFrameX.Foundation.Orm.Entity;

// EntityBase를 상속하면 모든 엔터프라이즈급 기능 사용 가능
public class User : EntityBase
{
    public string Username { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }

    // EntityBase가 자동으로 제공하는 속성:
    // - long Id                    // 기본키
    // - DateTime CreateTime        // 생성 시간
    // - DateTime UpdateTime        // 업데이트 시간
    // - long CreateUserId          // 생성자 ID
    // - long UpdateUserId          // 수정자 ID
    // - string CreateUserName      // 생성자 이름
    // - string UpdateUserName      // 수정자 이름
    // - bool IsDelete              // 소프트 삭제 마크
    // - long Version               // 낙관적 잠금 버전
    // - bool IsEnabled             // 활성화 상태
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

## 상세 사용법

### 핵심 인터페이스

- **IEntity**: 엔티티 기본 인터페이스
- **`IEntity<TKey>`**: 기본키가 있는 엔티티 인터페이스, 제네릭 기본키 형식 지원
- **IVersionedEntity**: 버전 관리 엔티티 인터페이스, 낙관적 잠금 지원

### 필터 인터페이스

- **ISafeCreatedFilter**: 생성 정보 필터 (`CreatedId`, `CreatedTime`, `CreatedName`)
- **ISafeUpdateFilter**: 업데이트 정보 필터 (`UpdateCount`, `UpdateTime`, `UpdatedId`, `UpdatedName`)
- **ISafeDeletedFilter**: 소프트 삭제 필터 (`IsDeleted`, `DeleteTime`, `DeletedId`, `DeletedName`)
- **ISafeEnabledFilter**: 활성화 상태 필터 (`IsEnabled`)
- **ITenantIdFilter**: 테넌트 ID 필터 (`TenantId`)
- **ISelectFilter**: 검색 쿼리 필터 (`Name`, `Description`)
- **IOrganizationIdFilter**: 조직 ID 필터 (`CreateOrganizationId`)

### 엔티티 기반 클래스

#### EntityBaseId / `EntityBaseId<TKey>`
- 기본키 필드 제공
- long 형식 기본키 및 제네릭 기본키 지원
- IEntity 인터페이스 구현

#### EntityBase / `EntityBase<TKey>`
- EntityBaseId에서 상속
- `ISafeCreatedFilter`, `ISafeUpdateFilter`, `ISafeDeletedFilter`, `ISafeEnabledFilter`, `IVersionedEntity` 구현
- 모든 필드가 nullable 형식
- 버전 관리 (낙관적 잠금) 지원

#### EntityTenantBase / `EntityTenantBase<TKey>`
- EntityBase에서 상속
- `ITenantIdFilter` 구현
- 멀티테넌트 아키텍처 지원

#### EntitySelectBase
- EntityBase에서 상속
- `ISelectFilter` 인터페이스 구현
- 이름 및 설명 필드 포함, 검색이 필요한 엔티티에 적합

### 핵심 컴포넌트

| 컴포넌트 | 파일 | 설명 |
|------|------|------|
| EntityBase | `EntityBase.cs` | 전체 기능 엔티티 기반 클래스 (ID, 감사, 소프트 삭제, 버전 관리) |
| EntityBaseId (Generic) | `EntityBaseId.cs` | 사용자 정의 기본키 형식 엔티티 기반 클래스 |
| IEntity | `IEntity.cs` | 기본 엔티티 인터페이스 |
| IAuditableEntity | `IAuditableEntity.cs` | 감사 인터페이스 (생성/업데이트 시간 및 사용자) |

### 사용자 정의 기본키 형식

```csharp
// string을 기본키로 사용
public class Product : EntityBaseId<string>
{
    public string Name { get; set; }
    public decimal Price { get; set; }
    public string Description { get; set; }
}

// Guid를 기본키로 사용
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

### 인터페이스 구현

```csharp
// 기본 엔티티 인터페이스 구현
public class Category : IEntity<int>
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
}

// 감사 인터페이스 구현
public class AuditableCategory : IEntity<int>, IAuditableEntity
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }

    // IAuditableEntity 인터페이스 속성
    public DateTime CreateTime { get; set; }
    public DateTime UpdateTime { get; set; }
    public long CreateUserId { get; set; }
    public long UpdateUserId { get; set; }
    public string CreateUserName { get; set; }
    public string UpdateUserName { get; set; }
}
```

### 멀티테넌트 엔티티

```csharp
public class TenantOrder : EntityTenantBase
{
    public string OrderNumber { get; set; }
    public decimal Amount { get; set; }
}
```

### 검색 가능 엔티티

```csharp
public class SearchableCategory : EntitySelectBase
{
    public int? SortOrder { get; set; }
}
```

### 감사 추적

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

// 업데이트 시 감사 정보 자동 유지보수
document.Content = "Updated content";
document.UpdateTime = DateTime.UtcNow;
document.UpdateUserId = currentUser.Id;
document.UpdateUserName = currentUser.Username;
document.Version++; // 낙관적 잠금 버전 증가
```

### 소프트 삭제

```csharp
// 소프트 삭제: 물리적 삭제 대신 삭제 마크
public void SoftDeleteUser(User user)
{
    user.IsDelete = true;
    user.UpdateTime = DateTime.UtcNow;
    user.UpdateUserId = currentUser.Id;
    user.UpdateUserName = currentUser.Username;
    dbContext.SaveChanges();
}

// 쿼리 시 삭제된 레코드 필터링
var activeUsers = dbContext.Users
    .Where(u => !u.IsDelete)
    .ToList();

// 삭제된 레코드 복구
public void RestoreUser(User user)
{
    user.IsDelete = false;
    user.UpdateTime = DateTime.UtcNow;
    user.UpdateUserId = currentUser.Id;
    user.UpdateUserName = currentUser.Username;
    dbContext.SaveChanges();
}
```

### 낙관적 잠금

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

### 활성화/비활성화 상태 관리

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

## 모범 사례

1. **필요에 따른 기반 클래스 선택**: 간단한 엔티티는 `EntityBaseId<TKey>`를 사용하고, 감사 및 소프트 삭제가 필요한 경우 `EntityBase`를 사용하며, 멀티테넌트 시나리오에는 `EntityTenantBase`를 사용하세요
2. **설계 원칙 준수**: 각 인터페이스와 클래스는 명확한 책임을 가지며, 상속과 인터페이스 구현을 통해 기능을 확장하고, 구체적인 구현이 아닌 추상 인터페이스에 의존하세요
3. **Nullable 형식의 유연한 활용**: 모든 필드가 nullable 형식이므로 유연성이 높으며, 쿼리 시 null 값 판단에 주의하세요
4. **낙관적 잠금 필수 시나리오**: 높은 동시성 업데이트 시나리오에서는 반드시 버전 관리를 사용하여 데이터 덮어쓰기를 방지하세요
5. **소프트 삭제 쿼리 필터링**: 쿼리 시 항상 `IsDelete` 마크를 필터링하여 삭제된 데이터가 비즈니스 계층에 누출되지 않도록 하세요

## API 레퍼런스

| 클래스/인터페이스 | 유형 | 설명 |
|---------|------|------|
| `IEntity` | 인터페이스 | 엔티티 기본 인터페이스 |
| `IEntity<TKey>` | 인터페이스 | 제네릭 기본키가 있는 엔티티 인터페이스 |
| `IAuditableEntity` | 인터페이스 | 감사 인터페이스 (생성/업데이트 시간 및 사용자) |
| `IVersionedEntity` | 인터페이스 | 버전 관리 엔티티 인터페이스 |
| `ISafeCreatedFilter` | 인터페이스 | 생성 정보 필터 |
| `ISafeUpdateFilter` | 인터페이스 | 업데이트 정보 필터 |
| `ISafeDeletedFilter` | 인터페이스 | 소프트 삭제 필터 |
| `ISafeEnabledFilter` | 인터페이스 | 활성화 상태 필터 |
| `ITenantIdFilter` | 인터페이스 | 테넌트 ID 필터 |
| `ISelectFilter` | 인터페이스 | 검색 쿼리 필터 |
| `IOrganizationIdFilter` | 인터페이스 | 조직 ID 필터 |
| `EntityBaseId<TKey>` | 기반 클래스 | 사용자 정의 기본키 형식 엔티티 기반 클래스 |
| `EntityBase<TKey>` | 기반 클래스 | 전체 기능 엔티티 기반 클래스 |
| `EntityTenantBase<TKey>` | 기반 클래스 | 멀티테넌트 엔티티 기반 클래스 |
| `EntitySelectBase` | 기반 클래스 | 검색 가능 엔티티 기반 클래스 |

## 라이선스

MIT + Apache 2.0
