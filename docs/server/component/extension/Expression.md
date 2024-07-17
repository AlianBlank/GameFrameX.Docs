# 表达式

[[toc]]
---

## 表达式(ExpressionExtension)

### And

#### 功能描述

`And` 方法用于将两个表达式进行逻辑与运算，生成一个新的表达式，该表达式表示两个输入表达式同时为真时结果为真。

#### 参数

- `leftExpression`：第一个表达式，类型为 `Expression<Func<T, bool>>`。
- `rightExpression`：第二个表达式，类型同样为 `Expression<Func<T, bool>>`。

#### 返回值

返回一个类型为 `Expression<Func<T, bool>>` 的新表达式，表示两个输入表达式的逻辑与。

#### 应用场景

适用于需要组合两个布尔表达式，并且要求两个表达式都满足条件的场景，例如在查询数据库时构建复杂的过滤条件。

#### 示例代码

```csharp
Expression<Func<MyEntity, bool>> left = x => x.Property1 == 1;
Expression<Func<MyEntity, bool>> right = x => x.Property2 == "Value";
Expression<Func<MyEntity, bool>> combined = left.And(right);

// 使用示例
var query = dbContext.MyEntities.Where(combined);
```

### AndIf

#### 功能描述

`AndIf` 方法根据提供的委托条件，将两个表达式进行逻辑与运算。如果条件为真，则将两个表达式逻辑与，否则只使用第一个表达式。

#### 参数

- `leftExpression`：第一个表达式，类型为 `Expression<Func<T, bool>>`。
- `condition`：一个委托，返回布尔值，用于决定是否需要进行逻辑与操作。
- `rightExpression`：第二个表达式，同样类型为 `Expression<Func<T, bool>>`。

#### 返回值

根据条件，返回一个类型为 `Expression<Func<T, bool>>` 的新表达式，可能是逻辑与的结果或仅第一个表达式。

#### 应用场景

适用于需要根据某个条件来决定是否将两个布尔表达式进行逻辑与操作的场景。

#### 示例代码

```csharp
Expression<Func<MyEntity, bool>> left = x => x.Property1 == 1;
Expression<Func<MyEntity, bool>> right = x => x.Property2 == "Value";
Func<bool> condition = () => someConditionValue;
Expression<Func<MyEntity, bool>> combined = left.AndIf(condition, right);

// 使用示例
var query = dbContext.MyEntities.Where(combined);
```

### Or

#### 功能描述

`Or` 方法用于将两个表达式进行逻辑或运算，生成一个新的表达式，该表达式表示两个输入表达式中至少有一个为真时结果为真。

#### 参数

- `leftExpression`：第一个表达式，类型为 `Expression<Func<T, bool>>`。
- `rightExpression`：第二个表达式，类型同样为 `Expression<Func<T, bool>>`。

#### 返回值

返回一个类型为 `Expression<Func<T, bool>>` 的新表达式，表示两个输入表达式的逻辑或。

#### 应用场景

适用于需要组合两个布尔表达式，并且要求两个表达式中至少一个满足条件的场景。

#### 示例代码

```csharp
Expression<Func<MyEntity, bool>> left = x => x.Property1 == 1;
Expression<Func<MyEntity, bool>> right = x => x.Property2 == "Value";
Expression<Func<MyEntity, bool>> combined = left.Or(right);

// 使用示例
var query = dbContext.MyEntities.Where(combined);
```

### OrIf

#### 功能描述

`OrIf` 方法根据提供的委托条件，将两个表达式使用逻辑或操作符进行组合。如果指定的条件为真，则使用右表达式，否则使用左表达式。

#### 参数

- `leftExpression`：左表达式，类型为 `Expression<Func<T, bool>>`。
- `condition`：一个委托，返回布尔值，用于决定是否使用右表达式。
- `rightExpression`：右表达式，同样类型为 `Expression<Func<T, bool>>`。

#### 返回值

根据条件，返回一个类型为 `Expression<Func<T, bool>>` 的新表达式，可能是逻辑或的结果或仅左表达式。

#### 应用场景

适用于需要根据某个条件来决定是否将两个布尔表达式进行逻辑或操作的场景。

#### 示例代码

```csharp
Expression<Func<MyEntity, bool>> left = x => x.Property1 == 1;
Expression<Func<MyEntity, bool>> right = x => x.Property2 == "Value";
Func<bool> condition = () => someConditionValue;
Expression<Func<MyEntity, bool>> combined = left.OrIf(condition, right);

// 使用示例
var query = dbContext.MyEntities.Where(combined);
```

### Not

#### 功能描述

`Not` 方法对一个表达式进行逻辑非运算，生成一个新的表达式，该表达式表示输入表达式的逻辑相反。

#### 参数

- `expr`：要进行逻辑非运算的表达式，类型为 `Expression<Func<T, bool>>`。

#### 返回值

返回一个类型为 `Expression<Func<T, bool>>` 的新表达式，表示输入表达式的逻辑非。

#### 应用场景

适用于需要反转布尔表达式逻辑的场景，例如在查询数据库时排除某些条件。

#### 示例代码

```csharp
Expression<Func<MyEntity, bool>> expr = x => x.Property1 == 1;
Expression<Func<MyEntity, bool>> notExpr = expr.Not();

// 使用示例
var query = dbContext.MyEntities.Where(notExpr);
```
