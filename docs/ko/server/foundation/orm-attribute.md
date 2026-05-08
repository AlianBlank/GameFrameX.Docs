# ORM 특성 주석

GameFrameX ORM 특성 라이브러리로, 데이터베이스 엔티티 마킹 특성의 완전한 세트를 제공하여 ORM 프레임워크의 기능과 성능을 향상시킵니다.

## 특징

- **기본 특성 주석**: 상수 마킹, 사용자 정의 통합 결과 처리 등 기본 기능
- **테이블 유형 분류**: 증분 테이블, 로그 테이블, 시스템 테이블 등 다양한 테이블 유형 식별
- **성능 최적화**: 캐시 전략, 읽기 전용 최적화, 인덱스 관리, 파티션 저장
- **데이터 관리**: 감사 추적, 소프트 삭제, 버전 관리 등 엔터프라이즈급 데이터 관리 기능
- **유연한 조합**: 여러 특성을 자유롭게 조합하여 다양한 비즈니스 시나리오에 대응

## 설치

```bash
dotnet add package GameFrameX.Foundation.Orm.Attribute
```

## 빠른 시작

```csharp
using GameFrameX.Foundation.Orm.Attribute;

// 엔티티 클래스에 특성 적용
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

## 상세 사용법

### 기본 특성

#### ConstAttribute
상수 특성으로, 클래스, 메서드, 속성 등을 상수 정의로 마킹합니다.

```csharp
[Const("DatabaseVersion")]
public class DatabaseConstants
{
    public const string Version = "1.0.0";
}
```

#### CustomUnifyResultAttribute
사용자 정의 통합 결과 특성으로, 사용자 정의 결과 통합 처리가 필요한 클래스나 메서드를 마킹합니다.

```csharp
[CustomUnifyResult("ApiResponse")]
public class UserController
{
    public User GetUser(int id) => userService.GetById(id);
}
```

### 테이블 유형 특성

#### IncrementSeedAttribute
증분 시드 특성으로, 엔티티 클래스가 자동 증가 시드값 기능을 지원함을 마킹합니다.

```csharp
[IncrementSeed]
public class User
{
    public int Id { get; set; }  // 자동 증가 기본키
    public string Name { get; set; }
}
```

#### IncrementTableAttribute
증분 테이블 특성으로, 엔티티 클래스에 해당하는 데이터베이스 테이블이 증분 작업을 지원함을 마킹합니다.

```csharp
[IncrementTable]
public class UserActivity
{
    public int Id { get; set; }
    public DateTime Timestamp { get; set; }  // 증분 판단에 사용
}
```

#### LogTableAttribute
로그 테이블 특성으로, 엔티티 클래스에 해당하는 데이터베이스 테이블이 로그 테이블임을 마킹합니다.

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
시스템 테이블 특성으로, 엔티티 클래스에 해당하는 데이터베이스 테이블이 시스템 테이블임을 마킹합니다.

```csharp
[SystemTable]
public class SystemConfiguration
{
    public string ConfigKey { get; set; }
    public string ConfigValue { get; set; }
}
```

### 성능 최적화 특성

#### CacheTableAttribute
캐시 테이블 특성으로, 엔티티 클래스에 해당하는 데이터베이스 테이블이 캐시 전략을 지원함을 마킹합니다.

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
읽기 전용 테이블 특성으로, 엔티티 클래스에 해당하는 데이터베이스 테이블이 읽기 전용 테이블임을 마킹합니다.

```csharp
[ReadOnlyTable(EnableCache = true, CacheMinutes = 60)]
public class CountryCode
{
    public string Code { get; set; }
    public string Name { get; set; }
}
```

#### EntityIndexAttribute
인덱스 특성으로, 속성이나 필드에 데이터베이스 인덱스를 생성해야 함을 마킹합니다.

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
파티션 테이블 특성으로, 엔티티 클래스에 해당하는 데이터베이스 테이블이 파티션 저장을 지원함을 마킹합니다.

```csharp
[PartitionTable("CreateDate", PartitionType.Range, PartitionInterval.Monthly)]
public class OrderHistory
{
    public int Id { get; set; }
    public DateTime CreateDate { get; set; }  // 파티션 키
}
```

### 데이터 관리 특성

#### AuditTableAttribute
감사 테이블 특성으로, 엔티티 클래스에 해당하는 데이터베이스 테이블이 감사 추적이 필요함을 마킹합니다.

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
소프트 삭제 특성으로, 엔티티 클래스가 소프트 삭제 기능을 지원함을 마킹합니다.

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
버전 관리 특성으로, 엔티티 클래스가 데이터 버전 관리 기능을 지원함을 마킹합니다.

```csharp
[VersionControl("Version", VersionStrategy.Optimistic)]
public class Document
{
    public int Id { get; set; }
    public string Title { get; set; }
    public int Version { get; set; }  // 버전 번호 필드
}
```

### 사용 시나리오

#### 고빈도 쿼리 최적화
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

#### 대용량 데이터 테이블 관리
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

#### 시스템 핵심 테이블
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

### 특성 분류

#### 우선순위별 분류

**높은 우선순위** (자주 사용되고 실용적):
- `CacheTableAttribute` - 캐시 전략
- `AuditTableAttribute` - 감사 추적
- `SoftDeleteAttribute` - 소프트 삭제
- `ReadOnlyTableAttribute` - 읽기 전용 최적화

**중간 우선순위** (특정 시나리오에서 유용):
- `EntityIndexAttribute` - 인덱스 관리
- `PartitionTableAttribute` - 파티션 테이블
- `VersionControlAttribute` - 버전 관리

**기본 특성** (프레임워크 핵심):
- `ConstAttribute` - 상수 마킹
- `CustomUnifyResultAttribute` - 결과 통합
- `IncrementSeedAttribute` - 자동 증가 시드
- `IncrementTableAttribute` - 증분 테이블
- `LogTableAttribute` - 로그 테이블
- `SystemTableAttribute` - 시스템 테이블

#### 기능별 분류

**성능 최적화류**:
- `CacheTableAttribute`
- `ReadOnlyTableAttribute`
- `EntityIndexAttribute`
- `PartitionTableAttribute`

**데이터 관리류**:
- `AuditTableAttribute`
- `SoftDeleteAttribute`
- `VersionControlAttribute`
- `LogTableAttribute`

**테이블 유형 식별류**:
- `SystemTableAttribute`
- `IncrementTableAttribute`
- `IncrementSeedAttribute`

**프레임워크 기능류**:
- `ConstAttribute`
- `CustomUnifyResultAttribute`

## 모범 사례

1. **적절한 특성 선택**: 실제 비즈니스 요구에 맞는 특성을 선택하고, 과도한 주석 피하기
2. **성능 고려**: 캐시 및 인덱스 특성 사용 시 메모리와 저장 비용을 고려하고, 고빈도 쿼리 테이블에 `CacheTableAttribute` 우선 사용
3. **데이터 일관성**: 감사 및 버전 관리 특성 사용 시 데이터 일관성 요구 사항을 고려하고, 핵심 비즈니스 테이블에 `AuditTableAttribute` 권장
4. **유지보수 비용**: 복잡한 특성은 시스템 유지보수 비용을 증가시키므로, 필요에 따라 조합하고 전체 주석은 피하기
5. **테스트 검증**: 특성의 기능과 성능 영향을 충분히 테스트하고, 특히 파티션 테이블과 캐시 전략에 주의

## API 레퍼런스

| 특성 클래스 | 분류 | 설명 |
|--------|------|------|
| `ConstAttribute` | 기본 특성 | 상수 마킹 |
| `CustomUnifyResultAttribute` | 기본 특성 | 사용자 정의 통합 결과 처리 |
| `IncrementSeedAttribute` | 테이블 유형 특성 | 자동 증가 시드값 |
| `IncrementTableAttribute` | 테이블 유형 특성 | 증분 테이블 작업 |
| `LogTableAttribute` | 테이블 유형 특성 | 로그 테이블 식별 |
| `SystemTableAttribute` | 테이블 유형 특성 | 시스템 테이블 식별 |
| `CacheTableAttribute` | 성능 최적화 특성 | 캐시 전략 설정 |
| `ReadOnlyTableAttribute` | 성능 최적화 특성 | 읽기 전용 테이블 최적화 |
| `EntityIndexAttribute` | 성능 최적화 특성 | 데이터베이스 인덱스 관리 |
| `PartitionTableAttribute` | 성능 최적화 특성 | 파티션 저장 설정 |
| `AuditTableAttribute` | 데이터 관리 특성 | 감사 추적 |
| `SoftDeleteAttribute` | 데이터 관리 특성 | 소프트 삭제 지원 |
| `VersionControlAttribute` | 데이터 관리 특성 | 버전 관리 |

## 라이선스

MIT + Apache 2.0
