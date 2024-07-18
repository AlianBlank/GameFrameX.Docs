# 非关系型数据库

提供非关系型数据库的接口定义和帮助类的入口.由实现类实现具体业务逻辑

---
[[toc]]

## Key 重写标记(KeyValue)

主要用于类对象的名称重写.

## 接口描述

### INoSqlHelper.Init

#### 功能描述

初始化非关系型数据库帮助类，设置数据库连接字符串。

#### 参数

- `connectionStrings`：数据库连接字符串数组。

#### 返回值

无返回值。

#### 应用场景

在应用程序启动时或需要连接非关系型数据库时调用此方法进行初始化。

#### 示例代码

```csharp
public void InitializeNoSql()
{
    var connectionStrings = new[] { "connectionString1", "connectionString2" };
    noSqlHelper.Init(connectionStrings);
}
```

---

### INoSqlHelper.Set

#### 功能描述

同步设置指定的Key的数据到NoSql中。

#### 参数

- `key`：键名。
- `value`：值。

#### 返回值

无返回值。

#### 应用场景

当需要在NoSql数据库中存储键值对时使用。

#### 示例代码

```csharp
public void SetKeyValue(string key, string value)
{
    noSqlHelper.Set(key, value);
}
```

---

### `INoSqlHelper.Set<T>`

#### 功能描述

同步设置指定的Key的数据到NoSql中，支持泛型。

#### 参数

- `key`：键名。
- `value`：值，类型为`T`。

#### 返回值

无返回值。

#### 应用场景

当需要在NoSql数据库中存储键值对，并且值是对象时使用。

#### 示例代码

```csharp
public void SetObjectKeyValue<T>(string key, T value) where T : class
{
    noSqlHelper.Set(key, value);
}
```

---

### `INoSqlHelper.Set<T> (with TimeSpan)`

#### 功能描述

同步设置指定的Key的数据到NoSql中，并设置过期时间。

#### 参数

- `key`：键名。
- `value`：值，类型为`T`。
- `timeOut`：过期时间，类型为`TimeSpan`。

#### 返回值

无返回值。

#### 应用场景

当需要在NoSql数据库中存储键值对，并指定数据的有效期时使用。

#### 示例代码

```csharp
public void SetObjectKeyValueWithExpiration<T>(string key, T value, TimeSpan timeOut) where T : class
{
    noSqlHelper.Set(key, value, timeOut);
}
```

---

### `INoSqlHelper.Set<T> (with int timeoutSeconds)`

#### 功能描述

同步设置指定的Key的数据到NoSql中，并设置过期时间（以秒为单位）。

#### 参数

- `key`：键名。
- `value`：值，类型为`T`。
- `timeoutSeconds`：过期时间，单位为秒。

#### 返回值

无返回值。

#### 应用场景

当需要在NoSql数据库中存储键值对，并指定数据的有效期时使用。

#### 示例代码

```csharp
public void SetObjectKeyValueWithSecondsExpiration<T>(string key, T value, int timeoutSeconds) where T : class
{
    noSqlHelper.Set(key, value, timeoutSeconds);
}
```

---

### INoSqlHelper.SetAsync

#### 功能描述

异步设置指定的Key的数据到NoSql中。

#### 参数

- `key`：键名。
- `value`：值。

#### 返回值

返回一个`Task`对象。

#### 应用场景

当需要在NoSql数据库中异步存储键值对时使用。

#### 示例代码

```csharp
public async Task SetKeyValueAsync(string key, string value)
{
    await noSqlHelper.SetAsync(key, value);
}
```

---

### `INoSqlHelper.SetAsync<T>`

#### 功能描述

异步设置指定的Key的数据到NoSql中，支持泛型。

#### 参数

- `key`：键名。
- `value`：值，类型为`T`。

#### 返回值

返回一个`Task<T>`对象。

#### 应用场景

当需要在NoSql数据库中异步存储键值对，并且值是对象时使用。

#### 示例代码

```csharp
public async Task SetObjectKeyValueAsync<T>(string key, T value) where T : class
{
    await noSqlHelper.SetAsync(key, value);
}
```

---

### `INoSqlHelper.SetAsync<T> (with TimeSpan)`

#### 功能描述

异步设置指定的Key的数据到NoSql中，并设置过期时间。

#### 参数

- `key`：键名。
- `value`：值，类型为`T`。
- `timeOut`：过期时间，类型为`TimeSpan`。

#### 返回值

返回一个`Task<T>`对象。

#### 应用场景

当需要在NoSql数据库中异步存储键值对，并指定数据的有效期时使用。

#### 示例代码

```csharp
public async Task SetObjectKeyValueWithExpirationAsync<T>(string key, T value, TimeSpan timeOut) where T : class
{
    await noSqlHelper.SetAsync(key, value, timeOut);
}
```

---

### `INoSqlHelper.SetAsync<T> (with int timeoutSeconds)`

#### 功能描述

异步设置指定的Key的数据到NoSql中，并设置过期时间（以秒为单位）。

#### 参数

- `key`：键名。
- `value`：值，类型为`T`。
- `timeoutSeconds`：过期时间，单位为秒。

#### 返回值

返回一个`Task<T>`对象。

#### 应用场景

当需要在NoSql数据库中异步存储键值对，并指定数据的有效期时使用。

#### 示例代码

```csharp
public async Task SetObjectKeyValueWithSecondsExpirationAsync<T>(string key, T value, int timeoutSeconds) where T : class
{
    await noSqlHelper.SetAsync(key, value, timeoutSeconds);
}
```

---

### INoSqlHelper.GetString

#### 功能描述

从NoSql中获取指定的key的值。

#### 参数

- `key`：键名。

#### 返回值

返回键对应的字符串值。

#### 应用场景

当需要从NoSql数据库中获取字符串类型的数据时使用。

#### 示例代码

```csharp
public string GetKeyValue(string key)
{
    return noSqlHelper.GetString(key);
}
```

---

### INoSqlHelper.GetStringAsync

#### 功能描述

异步从NoSql中获取指定的key的值。

#### 参数

- `key`：键名。

#### 返回值

返回一个`Task<string>`对象。

#### 应用场景

当需要从NoSql数据库中异步获取字符串类型的数据时使用。

#### 示例代码

```csharp
public async Task<string> GetKeyValueAsync(string key)
{
    return await noSqlHelper.GetStringAsync(key);
}
```

---

### `INoSqlHelper.Get<T>`

#### 功能描述

从NoSql中获取指定的key的值，如果不存在则返回null。

#### 参数

- `key`：键名。

#### 返回值

返回键对应的值，类型为`T`，如果不存在则返回null。

#### 应用场景

当需要从NoSql数据库中获取对象类型的数据时使用。

#### 示例代码

```csharp
public T GetObjectByKey<T>(string key) where T : class
{
    return noSqlHelper.Get<T>(key);
}
```

---

### `INoSqlHelper.GetAsync<T>`

#### 功能描述

异步从NoSql中获取指定的key的值，如果不存在则返回null。

#### 参数

- `key`：键名。

#### 返回值

返回一个`Task<T>`对象，如果不存在则返回null。

#### 应用场景

当需要从NoSql数据库中异步获取对象类型的数据时使用。

#### 示例代码

```csharp
public async Task<T> GetObjectByKeyAsync<T>(string key) where T : class
{
    return await noSqlHelper.GetAsync<T>(key);
}
```

---

### INoSqlHelper.Delete

#### 功能描述

从NoSql中删除指定的keys，如果不存在则忽略。

#### 参数

- `keys`：键名数组。

#### 返回值

返回被删除的键的数量。

#### 应用场景

当需要从NoSql数据库中删除多个键时使用。

#### 示例代码

```csharp
public long DeleteKeys(params string[] keys)
{
    return noSqlHelper.Delete(keys);
}
```

---

### INoSqlHelper.DeleteAsync

#### 功能描述

异步从NoSql中删除指定的keys，如果不存在则忽略。

#### 参数

- `keys`：键名数组。

#### 返回值

返回一个`Task<long>`对象，表示被删除的键的数量。

#### 应用场景

当需要从NoSql数据库中异步删除多个键时使用。

#### 示例代码

```csharp
public async Task<long> DeleteKeysAsync(params string[] keys)
{
    return await noSqlHelper.DeleteAsync(keys);
}
```

---

### INoSqlHelper.Exists

#### 功能描述

判断指定的key是否存在。

#### 参数

- `keys`：键名数组。

#### 返回值

返回存在键的数量。

#### 应用场景

当需要检查NoSql数据库中键是否存在时使用。

#### 示例代码

```csharp
public long CheckKeysExists(params string[] keys)
{
    return noSqlHelper.Exists(keys);
}
```

---

### INoSqlHelper.ExistsAsync

#### 功能描述

异步判断指定的key是否存在。

#### 参数

- `keys`：键名数组。

#### 返回值

返回一个`Task<long>`对象，表示存在键的数量。

#### 应用场景

当需要异步检查NoSql数据库中键是否存在时使用。

#### 示例代码

```csharp
public async Task<long> CheckKeysExistsAsync(params string[] keys)
{
    return await noSqlHelper.ExistsAsync(keys);
}
```

---

### INoSqlHelper.Exists (with single key)

#### 功能描述

判断指定的key是否存在。

#### 参数

- `key`：键名。

#### 返回值

返回一个布尔值，表示键是否存在。

#### 应用场景

当需要检查NoSql数据库中单个键是否存在时使用。

#### 示例代码

```csharp
public bool CheckKeyExists(string key)
{
    return noSqlHelper.Exists(key);
}
```

---

### INoSqlHelper.ExistsAsync (with single key)

#### 功能描述

异步判断指定的key是否存在。

#### 参数

- `key`：键名。

#### 返回值

返回一个`Task<bool>`对象，表示键是否存在。

#### 应用场景

当需要异步检查NoSql数据库中单个键是否存在时使用。

#### 示例代码

```csharp
public async Task<bool> CheckKeyExistsAsync(string key)
{
    return await noSqlHelper.ExistsAsync(key);
}
```

---

### INoSqlHelper.Expire

#### 功能描述

从NoSql中设置指定Key的过期时间。

#### 参数

- `key`：键名。
- `seconds`：过期时间（秒）。

#### 返回值

返回一个布尔值，表示操作是否成功。

#### 应用场景

当需要为NoSql数据库中的键设置过期时间时使用。

#### 示例代码

```csharp
public bool SetKeyExpiration(string key, int seconds)
{
    return noSqlHelper.Expire(key, seconds);
}
```

---

### INoSqlHelper.ExpireAsync

#### 功能描述

异步从NoSql中设置指定Key的过期时间。

#### 参数

- `key`：键名。
- `seconds`：过期时间（秒）。

#### 返回值

返回一个`Task<bool>`对象，表示操作是否成功。

#### 应用场景

当需要异步为NoSql数据库中的键设置过期时间时使用。

#### 示例代码

```csharp
public async Task<bool> SetKeyExpirationAsync(string key, int seconds)
{
    return await noSqlHelper.ExpireAsync(key, seconds);
}
```

---

### INoSqlHelper.Expire (with TimeSpan)

#### 功能描述

从NoSql中设置指定Key的过期时间。

#### 参数

- `key`：键名。
- `expireTime`：过期时间，类型为`TimeSpan`。

#### 返回值

返回一个布尔值，表示操作是否成功。

#### 应用场景

当需要为NoSql数据库中的键设置过期时间时使用。

#### 示例代码

```csharp
public bool SetKeyExpirationWithTimeSpan(string key, TimeSpan expireTime)
{
    return noSqlHelper.Expire(key, expireTime);
}
```

---

### INoSqlHelper.ExpireAsync (with TimeSpan)

#### 功能描述

异步从NoSql中设置指定Key的过期时间。

#### 参数

- `key`：键名。
- `expireTime`：过期时间，类型为`TimeSpan`。

#### 返回值

返回一个`Task<bool>`对象，表示操作是否成功。

#### 应用场景

当需要异步为NoSql数据库中的键设置过期时间时使用。

#### 示例代码

```csharp
public async Task<bool> SetKeyExpirationWithTimeSpanAsync(string key, TimeSpan expireTime)
{
    return await noSqlHelper.ExpireAsync(key, expireTime);
}
```

---

### INoSqlHelper.RemoveExpireTime

#### 功能描述

从NoSql中删除指定Key的过期时间。

#### 参数

- `key`：键名。

#### 返回值

返回一个布尔值，表示操作是否成功。

#### 应用场景

当需要移除NoSql数据库中键的过期时间时使用。

#### 示例代码

```csharp
public bool RemoveKeyExpiration(string key)
{
    return noSqlHelper.RemoveExpireTime(key);
}
```

---

### INoSqlHelper.RemoveExpireTimeAsync

#### 功能描述

异步从NoSql中删除指定Key的过期时间。

#### 参数

- `key`：键名。

#### 返回值

返回一个`Task<bool>`对象，表示操作是否成功。

#### 应用场景

当需要异步移除NoSql数据库中键的过期时间时使用。

#### 示例代码

```csharp
public async Task<bool> RemoveKeyExpirationAsync(string key)
{
    return await noSqlHelper.RemoveExpireTimeAsync(key);
}
```


