# 配置表更新未生效怎么办

当你在运行期重新加载、重新读取或重新 `Add` 一个配置表，却发现数据没有变化时，问题多出现在「已存在的 key 被新值跳过」「读到了缓存的旧引用」或「键名与类型不匹配」三个环节。

## 快速诊断

| 症状 | 原因 | 修复 |
|------|------|------|
| 调用 `Add` 后 `GetConfig` 仍然返回旧值 | `AddConfig` 内部使用 `TryAdd`,键已存在时**不会覆盖** | 改为先 `RemoveConfig` 再 `AddConfig`,或使用 `HasConfig` 先判断 |
| 修改了配置文件后,运行中数据未刷新 | 数据表实例被持有为旧引用,只更新了 dict 里的对象而未替换 | 重新构造 `IDataTable` 后,先移除旧 key 再 `Add` |
| `HasConfig<T>()` 返回 false,但配置明明已加载 | `GetTypeName<T>()` 使用 `typeof(T).Name` 作为键,泛型实参类型不一致 | 确认 `T` 是同一个具体类(例如 `PlayerConfig`,而不是 `BaseDataTable`) |
| `RemoveAllConfigs()` 后再 `GetConfig` 仍能拿到值 | `ConfigComponent` 内部有 `m_ConfigNameTypeMap` 缓存,清空后未重新 `Add` | 清空后重新执行加载流程,不要单独依赖缓存 |
| 重新加载配置时事件没触发 | 没有订阅 `LoadConfigUpdateEventArgs` / `LoadConfigSuccessEventArgs` | 在 `ConfigComponent.Awake` 后订阅相关事件,见下方代码 |

## 修复步骤

### 1. 重复 Add 不生效 — 先 Remove 再 Add

`ConfigManager.AddConfig` 内部调用的是 `m_ConfigDatas.TryAdd(configName, configValue)`,在 `ConcurrentDictionary` 中,**键已存在时不会覆盖**。要更新值必须先移除旧条目。

```csharp
var component = GameFrameX.Runtime.GameEntry.GetComponent<ConfigComponent>();

// 错误写法:不会覆盖
component.Add("PlayerConfig", newDataTable);

// 正确写法:先移除再添加
if (component.HasConfig<PlayerConfig>())
{
    component.RemoveConfig<PlayerConfig>();
}
component.Add("PlayerConfig", newDataTable);
```

Source: [Runtime/Config/Config/ConfigManager.cs#L120-L127](/src/Runtime/Config/Config/ConfigManager.cs#L120-L127)

### 2. 键名与类型不匹配 — 保持 typeof(T).Name 一致

`ConfigComponent.GetTypeName<T>()` 用 `typeof(T).Name` 当作 dict 的 key。所以 `HasConfig<PlayerConfig>()` 和 `HasConfig<BaseDataTable>()` 拿到的是**不同的 key**;父类引用不会命中子类条目。确保 `T` 是加载时使用的那个具体类。

```csharp
// 一致:用具体类
var data = component.GetConfig<PlayerConfig>();

// 不一致:用接口或父类会查不到
var data = component.GetConfig<IDataTable>();
```

Source: [Runtime/Config/ConfigComponent.cs#L96-L107](/src/Runtime/Config/ConfigComponent.cs#L96-L107)

### 3. 重新加载后引用仍是旧对象 — 替换整张表

`GetConfig` 返回的是 `IDataTable` 接口,**dict 里持有的是引用**。如果你只是修改了底层集合,而不重新 `Add` 一张新表,某些序列化器/缓存层不会感知到变化。安全做法是构造新的 `IDataTable` 实例并替换 dict 条目。

```csharp
var newTable = LoadFromBytes(bytes); // 你的反序列化逻辑
if (component.HasConfig<PlayerConfig>())
{
    component.RemoveConfig<PlayerConfig>();
}
component.Add(nameof(PlayerConfig), newTable);
```

Source: [Runtime/Config/Config/ConfigManager.cs#L138-L141](/src/Runtime/Config/Config/ConfigManager.cs#L138-L141)

### 4. 重新加载事件没回调 — 订阅对应 EventArgs

仓库在 `Runtime/EventArgs/` 下提供了 `LoadConfigUpdateEventArgs`、`LoadConfigSuccessEventArgs`、`LoadConfigFailureEventArgs` 三个事件参数类。如果你重写了加载流程,记得通过 `GameFrameX.Runtime.GameEntry.GetComponent<ConfigComponent>()` 拿到实例后,再按框架事件机制订阅,否则完成回调不会触发,看起来就像"没生效"。

```csharp
// 示例:在自定义加载器里 fire,使用框架事件机制
GameFrameX.Runtime.GameEntry.GetComponent<ConfigComponent>()
    .SendEvent(nameof(LoadConfigSuccessEventArgs), new LoadConfigSuccessEventArgs { ... });
```

## 验证

1. 在 `Add` 之前调用 `HasConfig<T>()`,确认返回值为 `true` 时先 `RemoveConfig<T>()`。
2. 调用 `GetConfig<T>()` 后,在调试器里查看 `m_ConfigDatas`(反射可见)中的引用与新表是否为同一对象。
3. 如果修改了 `IDataTable` 的内部集合,**重新构造新实例**而不是原地修改,确保引用被替换。
4. 关键路径加上日志:打印 `typeof(T).Name`、`HasConfig` 返回值,以及加载完成事件是否触发。

## 相关链接

- [ConfigComponent.cs](/src/Runtime/Config/ConfigComponent.cs)
- [ConfigManager.cs](/src/Runtime/Config/Config/ConfigManager.cs)
- [IConfigManager.cs](/src/Runtime/Config/Config/IConfigManager.cs)
- [BaseDataTable.cs](/src/Runtime/Config/Config/BaseDataTable.cs)
- [LoadConfigUpdateEventArgs.cs](/src/Runtime/EventArgs/LoadConfigUpdateEventArgs.cs)
- [LoadConfigSuccessEventArgs.cs](/src/Runtime/EventArgs/LoadConfigSuccessEventArgs.cs)
- [LoadConfigFailureEventArgs.cs](/src/Runtime/EventArgs/LoadConfigFailureEventArgs.cs)
