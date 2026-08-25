# How to Integrate a Custom IConfigManager Implementation

Integrating a custom `IConfigManager` implementation allows you to replace the framework's built-in `ConfigManager`, thereby controlling configuration loading, caching, and query strategies. Configurations are parsed by `ConfigComponent` via `GameFrameworkEntry.GetModule<IConfigManager>()`, so simply supplying a `GameFrameworkModule` that implements the interface and specifying the type in the Inspector is sufficient for it to take effect.

## Prerequisites

- The `com.gameframex.unity.config` package is installed and `ConfigComponent` can be found in the scene.
- The custom type must implement both [`IConfigManager`](/Runtime/Config/Config/IConfigManager.cs#L40-L98) and `GameFrameX.Runtime.GameFrameworkModule`.
- The type must be resolvable by `Utility.Assembly.GetType(...)` through `Type.GetType` semantics (it is recommended to place it in the main project assembly and use the fully qualified type name).

## Steps

1. **Create a custom manager class** that inherits from `GameFrameworkModule` and implements the `IConfigManager` interface. The interface requires implementing six members: `Count`, `HasConfig`, `AddConfig`, `RemoveConfig`, `GetConfig`, and `RemoveAllConfigs`.

```csharp
using System;
using System.Collections.Concurrent;
using GameFrameX.Config.Runtime;
using GameFrameX.Runtime;

public sealed class MyConfigManager : GameFrameworkModule, IConfigManager
{
    private readonly ConcurrentDictionary<string, IDataTable> m_Cache
        = new ConcurrentDictionary<string, IDataTable>(StringComparer.Ordinal);

    public int Count => m_Cache.Count;

    public bool HasConfig(string configName) => m_Cache.ContainsKey(configName);

    public void AddConfig(string configName, IDataTable configValue)
        => m_Cache[configName] = configValue;

    public bool RemoveConfig(string configName) => m_Cache.TryRemove(configName, out _);

    public IDataTable GetConfig(string configName)
        => m_Cache.TryGetValue(configName, out var v) ? v : null;

    public void RemoveAllConfigs() => m_Cache.Clear();

    public override void Update(float elapseSeconds, float realElapseSeconds) { }
    public override void Shutdown() { m_Cache.Clear(); }
}
```

Source: [Runtime/Config/Config/IConfigManager.cs](/Runtime/Config/Config/IConfigManager.cs#L40-L98), [Runtime/Config/Config/ConfigManager.cs](/Runtime/Config/Config/ConfigManager.cs#L47-L73)

2. **Specify the implementation type in the `ConfigComponent` Inspector**. When `ConfigComponent` starts, it reads the `componentType` field and resolves it via `Utility.Assembly.GetType(...)`, while locking the interface type to `IConfigManager`.

```csharp
// Runtime/Config/ConfigComponent.cs
ImplementationComponentType = Utility.Assembly.GetType(componentType);
InterfaceComponentType = typeof(IConfigManager);
base.Awake();
m_ConfigManager = GameFrameworkEntry.GetModule<IConfigManager>();
if (m_ConfigManager == null)
{
    Log.Fatal("Config manager is invalid.");
    return;
}
```

Source: [Runtime/Config/ConfigComponent.cs](/Runtime/Config/ConfigComponent.cs#L73-L85)

3. **Select `MyConfigManager` from the Inspector dropdown**. The Editor Inspector scans all types that implement `IConfigManager` and populates the available options.

```csharp
// Editor/Inspector/ConfigComponentInspector.cs
RefreshComponentTypeNames(typeof(IConfigManager));
```

Source: [Editor/Inspector/ConfigComponentInspector.cs](/Editor/Inspector/ConfigComponentInspector.cs#L43)

4. **Maintain trimming compatibility**. If the project has enabled code stripping, references to `IConfigManager` and `ConfigManager` must be retained within the custom manager's namespace to prevent them from being stripped out.

```csharp
// Runtime/GameFrameXConfigCroppingHelper.cs
_ = typeof(ConfigManager);
_ = typeof(IConfigManager);
_ = typeof(LoadConfigFailureEventArgs);
```

Source: [Runtime/GameFrameXConfigCroppingHelper.cs](/Runtime/GameFrameXConfigCroppingHelper.cs#L14-L16)

5. **Verify**. Run the game and call `ConfigComponent.GetConfig<T>()`. If it successfully returns a data table instance, the custom manager has taken effect.

## Common Variations

- **Only override the storage structure**: Keep other logic unchanged, simply replace the internal dictionary with persistent storage media such as distributed cache or SQLite.
- **Add asynchronous loading**: Start a loading coroutine inside `AddConfig`, write to the cache upon completion, and trigger `LoadConfigSuccessEventArgs`.
- **Multiple implementations coexisting**: As long as they all implement `IConfigManager`, instances can be differentiated through custom `GameFrameworkEntry` registration logic; typically only one is kept as the default.

## Common Errors

| Symptom | Cause | Fix |
|------|------|------|
| The log prints `Config manager is invalid.` after startup | `componentType` resolution failed or the type does not implement `IConfigManager` | Reselect the type in the Inspector and confirm the assembly has not been stripped |
| The custom class cannot be found in the Inspector dropdown | The type does not implement `IConfigManager` or does not inherit from `GameFrameworkModule` | Add the missing interface and base class, and trigger an assembly recompilation |
| `GetConfig<T>()` always returns `default` | The custom `GetConfig(string)` does not use `T.Name` as the key | Align with `ConfigComponent.GetTypeName<T>()` behavior and use `typeof(T).Name` as the key |

## Background (Optional)

`ConfigComponent` itself only holds an `IConfigManager` reference, and all read/write operations are delegated to the interface implementation. This way, upper-level components don't need to worry about storage details, and replacing the implementation will not affect callers. The Editor enumerates implementation types via reflection, while at runtime the `GameFrameworkEntry` module container resolves the singleton. Together, this makes "integrating a custom implementation" as simple as replacing a single type.

For the overall usage of `ConfigComponent`, see "ConfigComponent Configuration Component".