# How to Load Configuration Tables

Use `ConfigComponent` to load one or more `IDataTable` configuration tables into the global configuration manager, and read them by type or name from anywhere in the game.

## Prerequisites

- The `GameFramework` bootstrap component is already attached in the scene (shipped with the framework), and `ConfigComponent` will be automatically injected via `[GameFrameXAutoComponent(-5000)]`, so no manual addition is required.
- Custom configuration classes need to implement the `IDataTable` interface (see [IDataTable.cs](/Runtime/Config/Config/IDataTable.cs)).
- Existing `IDataTable` instances can be injected via `Add`; if you need to load from asset files, use the framework's `GameFrameX.Asset` module to read ScriptableObject / binary content and then call `Add`.

## Steps

1. **Get the component reference**. Retrieve the component via `GameEntry.GetComponent<ConfigComponent>()`, then obtain the internal `IConfigManager`:

   ```csharp
   var configComponent = GameEntry.GetComponent<ConfigComponent>();
   var configManager   = GameFrameworkEntry.GetModule<IConfigManager>();
   ```

   Source: [ConfigComponent.cs#L73-L85](/Runtime/Config/ConfigComponent.cs#L73-L85)

2. **Register load events** (optional but recommended). The framework dispatches the following events during the loading process. Subscribe to them to receive success / failure callbacks:

   ```csharp
   GameFrameXEntry.GetSubscriber().Subscribe(LoadConfigSuccessEventArgs.EventId, OnLoadConfigSuccess);
   GameFrameXEntry.GetSubscriber().Subscribe(LoadConfigFailureEventArgs.EventId, OnLoadConfigFailure);
   GameFrameXEntry.GetSubscriber().Subscribe(LoadConfigUpdateEventArgs.EventId,   OnLoadConfigUpdate);
   ```

   Source: [LoadConfigSuccessEventArgs.cs#L52](/Runtime/EventArgs/LoadConfigSuccessEventArgs.cs#L52), [LoadConfigFailureEventArgs.cs#L52](/Runtime/EventArgs/LoadConfigFailureEventArgs.cs#L52)

3. **Load and inject configuration tables**. First, use the asset module to read the `IDataTable` instance into memory, then call `Add` to write it into the manager. For example, loading a binary / text configuration table:

   ```csharp
   // 1) Use AssetComponent to read the asset into memory (loading method varies by project)
   var dataTable = LoadMyConfigTable(); // returns an instance implementing IDataTable

   // 2) Inject into the global configuration manager; keep the name consistent with the type name for easier subsequent GetConfig<T>()
   configComponent.Add(nameof(MyConfigTable), dataTable);
   ```

   Source: [ConfigComponent.cs#L182-L185](/Runtime/Config/ConfigComponent.cs#L182-L185), [ConfigManager.cs#L124-L127](/Runtime/Config/Config/ConfigManager.cs#L124-L127)

4. **Read configuration tables**. The generic version is recommended, which automatically matches the configuration name based on `typeof(T).Name`:

   ```csharp
   if (configComponent.HasConfig<MyConfigTable>())
   {
       var cfg = configComponent.GetConfig<MyConfigTable>();
       // Use cfg ...
   }
   ```

   You can also fetch by string name:

   ```csharp
   var cfg = (MyConfigTable)configManager.GetConfig("MyConfigTable");
   ```

   Source: [ConfigComponent.cs#L118-L143](/Runtime/Config/ConfigComponent.cs#L118-L143), [ConfigManager.cs#L152-L161](/Runtime/Config/Config/ConfigManager.cs#L152-L161)

5. **Remove / clear as needed**. Clean up when unloading a table or exiting a scene:

   ```csharp
   configComponent.RemoveConfig<MyConfigTable>(); // remove a single table
   configComponent.RemoveAllConfigs();             // clear all
   ```

   Source: [ConfigComponent.cs#L154-L171](/Runtime/Config/ConfigComponent.cs#L154-L171)

## Common Variations

- **Batch preloading**: Loop `Add` for multiple tables before entering the main scene, with the success event callback driving the flow.
- **Hot-update replacement**: Use `Add` to overwrite an entry with the same name; `AddConfig` internally uses `TryAdd`. To force replacement, `RemoveConfig` first and then `Add`.
- **Without going through the component**: Directly call `GameFrameworkEntry.GetModule<IConfigManager>()` to get `IConfigManager`, and invoke `AddConfig / GetConfig` which work the same way.

## Common Errors

| Symptom | Cause | Fix |
|------|------|------|
| `GetConfig<T>()` returns `null` | The name does not match `typeof(T).Name`, or `Add` was not called | Ensure the name passed to `Add` matches the type name; or use the name-based `GetConfig("Name")` |
| Old table still takes effect after repeated `Add` | `AddConfig` uses `TryAdd`, so entries with the same name will not be overwritten | Call `RemoveConfig` first, then `Add` |
| Events are not triggered | The event ID was not `Subscribe`d | Subscribe to `LoadConfigSuccessEventArgs.EventId`, etc. |
| `Config manager is invalid.` | The framework module is not registered or has been destroyed | Ensure `GameFramework` has started and has not been `Shutdown` |

## Background (Optional)

`ConfigComponent` itself does not directly parse assets; it delegates the `IDataTable` container to `IConfigManager`. `ConfigManager` stores configuration entries using `ConcurrentDictionary<string, IDataTable>`. `ConfigComponent` adds another layer of type → name mapping, allowing `GetConfig<T>()` to quickly locate by type. Asset reading is handled by the project's `AssetComponent` and is decoupled from this component.