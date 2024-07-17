# 时间

[[toc]]
---

## 时间(DateTimeExtensions)

### GetDaysFrom

#### 功能描述

计算从指定日期到当前日期的天数差。

#### 参数

- `DateTime now`：当前日期。
- `DateTime dt`：指定的日期。

#### 返回值

返回从指定日期到当前日期的天数差，类型为`int`。

#### 应用场景

适用于需要计算两个日期之间天数差的场景，例如统计时间间隔、计算日期差等。

#### 示例代码

```csharp
public int GetDaysFrom(DateTime now, DateTime dt)
{
    return (int)(now.Date - dt).TotalDays;
}

// 使用示例
DateTime now = DateTime.Now;
DateTime dt = new DateTime(2024, 1, 1);
int daysDifference = GetDaysFrom(now, dt);
// daysDifference 将返回从2024年1月1日到当前日期的天数差
```

### GetDaysFromDefault

#### 功能描述

计算从默认日期（1970年1月1日）到当前日期的天数差。

#### 参数

- `DateTime now`：当前日期。

#### 返回值

返回从默认日期到当前日期的天数差，类型为`int`。

#### 应用场景

适用于需要从特定历史日期（如Unix纪元的开始）计算到当前日期的天数差的场景，常用于系统时间戳的转换。

#### 示例代码

```csharp
public int GetDaysFromDefault(DateTime now)
{
    return now.GetDaysFrom(new DateTime(1970, 1, 1).Date);
}

// 使用示例
DateTime now = DateTime.Now;
int daysFromDefault = GetDaysFromDefault(now);
// daysFromDefault 将返回从1970年1月1日到当前日期的天数差
```
