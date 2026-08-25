# ConfigComponent API 速查

本页收录 `ConfigComponent` 及其底层接口 `IConfigManager` 的全部公开 API,包括签名、参数、返回值与行为说明,供查阅使用。

## ConfigComponent 公开 API

`ConfigComponent` 是全局配置组件,挂载在 `GameFrameworkEntry` 下;通过泛型 `T : IDataTable` 提供强类型访问。

| 名称 | 签名 | 说明 |
|------|------|------|
| `Count` | `int Count { get; }` | 当前已注册的配置项总数 |
| `GetConfig<T>()` | `T GetConfig<T>() where T : IDataTable` | 按泛型类型 `T` 的类型名(`typeof(T).Name`)获取配置项;不存在返回 `default(T)` |
| `HasConfig<T>()` | `bool HasConfig<T>() where T : IDataTable` | 检查类型 `T` 对应名称的配置项是否存在 |
| `RemoveConfig<T>()` | `bool RemoveConfig<T>() where T : IDataTable` | 移除类型 `T` 对应名称的配置项,返回是否成功 |
| `RemoveAllConfigs()` | `void RemoveAllConfigs()` | 清空全部配置项并重置内部类型缓存 |
| `Add(string, IDataTable)` | `void Add(string configName, IDataTable dataTable)` | 以字符串名称注册一条配置项(类型需实现 `IDataTable`) |

类型 → 名称的解析会缓存在内部 `ConcurrentDictionary<Type, string>` 中,首次访问 `T` 时写入。

```csharp
using GameFrameX.Config.Runtime;

// 获取组件实例
var configComponent = GameFrameX.Runtime.GameFrameworkEntry.GetComponent<ConfigComponent>();

// 注册一条配置(以字符串为 Key)
configComponent.Add("MyConfig", myDataTable);

// 按强类型获取
var cfg = configComponent.GetConfig<MyConfig>();
if (configComponent.HasConfig<MyConfig>())
{
    // ...
}

// 移除与清空
configComponent.RemoveConfig<MyConfig>();
configComponent.RemoveAllConfigs();
```

Source: [ConfigComponent.cs](/src/Runtime/Config/ConfigComponent.cs#L46-L186)

## IConfigManager 公开 API

`IConfigManager` 是 `ConfigComponent` 通过 `GameFrameworkEntry.GetModule<IConfigManager>()` 获取的底层管理器接口,负责实际存储。

| 名称 | 签名 | 说明 |
|------|------|------|
| `Count` | `int Count { get; }` | 全局配置项数量 |
| `HasConfig(string)` | `bool HasConfig(string configName)` | 检查指定名称的配置项是否存在 |
| `AddConfig(string, IDataTable)` | `void AddConfig(string configName, IDataTable configValue)` | 添加一个配置项 |
| `RemoveConfig(string)` | `bool RemoveConfig(string configName)` | 移除指定名称的配置项,返回是否成功 |
| `GetConfig(string)` | `IDataTable GetConfig(string configName)` | 获取指定名称的配置项;不存在返回 `null` |
| `RemoveAllConfigs()` | `void RemoveAllConfigs()` | 清空全部配置项 |

`GetConfig` 的返回值类型为 `IDataTable`,调用方需要自行转型;不存在时返回 `null`(注意与 `ConfigComponent.GetConfig<T>()` 的 `default(T)` 行为区分)。

Source: [IConfigManager.cs](/src/Runtime/Config/Config/IConfigManager.cs#L40-L98)

## 相关链接

- [ConfigComponent.cs](/src/Runtime/Config/ConfigComponent.cs)
- [IConfigManager.cs](/src/Runtime/Config/Config/IConfigManager.cs)