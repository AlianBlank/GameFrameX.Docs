# How to View and Manage ConfigComponent in the Unity Inspector

On a GameObject that has `ConfigComponent` attached, the Unity Inspector automatically uses a custom Inspector to display the interface and implementation type mappings of the component. You can view the `IConfigManager` interface and the full name of the implementation class corresponding to the current configuration component without writing code, and manually specify a custom implementation when needed.

## Prerequisites

- The `com.gameframex.unity.config` package is installed, and the `ConfigComponent` class exists in the project.
- A GameObject exists in the scene with `ConfigComponent` attached (the component menu is located at `GameFrameX/Config`).

## Steps

1. Select the GameObject with `ConfigComponent` attached in the scene, and the Inspector will automatically switch to the custom Inspector. The custom Inspector is bound via the `CustomEditor(typeof(ConfigComponent))` attribute.

    ```csharp
    [CustomEditor(typeof(ConfigComponent))]
    internal sealed class ConfigComponentInspector : ComponentTypeComponentInspector
    {
        protected override void RefreshTypeNames()
        {
            RefreshComponentTypeNames(typeof(IConfigManager));
        }
    }
    ```

    Source: [Editor/Inspector/ConfigComponentInspector.cs#L38-L45](/src/Editor/Inspector/ConfigComponentInspector.cs#L38-L45)

2. The top of the Inspector displays read-only fields related to the component type, including `InterfaceComponentType` (fixed as `IConfigManager`) and `ImplementationComponentType` (parsed from the `componentType` string during `Awake()`). This is the fastest way to verify that the runtime configuration manager implementation is correct.

    ```csharp
    protected override void Awake()
    {
        m_ConfigNameTypeMap.Clear();
        ImplementationComponentType = Utility.Assembly.GetType(componentType);
        InterfaceComponentType = typeof(IConfigManager);
        base.Awake();
        m_ConfigManager = GameFrameworkEntry.GetModule<IConfigManager>();
        if (m_ConfigManager == null)
        {
            Log.Fatal("Config manager is invalid.");
            return;
        }
    }
    ```

    Source: [Runtime/Config/ConfigComponent.cs#L73-L85](/src/Runtime/Config/ConfigComponent.cs#L73-L85)

3. If the fatal log `Config manager is invalid.` appears at runtime, it means the `IConfigManager` module is not registered. Go back to the Game Framework module registration process to fix this first.

4. Read the `Count` property at runtime (Play Mode) to verify the number of currently loaded configuration items:

    ```csharp
    var configComponent = GameEntry.GetComponent<ConfigComponent>();
    int count = configComponent.Count;
    ```

    Source: [Runtime/Config/ConfigComponent.cs#L62-L65](/src/Runtime/Config/ConfigComponent.cs#L62-L65)

5. Get, check, remove, and clear configuration items by type in scripts (these APIs are also indirectly used for runtime debugging):

    ```csharp
    // Get configuration item (type must implement IDataTable)
    var cfg = configComponent.GetConfig<MyConfig>();

    // Check if it exists
    bool exists = configComponent.HasConfig<MyConfig>();

    // Remove single item / clear all
    configComponent.RemoveConfig<MyConfig>();
    configComponent.RemoveAllConfigs();

    // Add directly by name
    configComponent.Add("MyConfig", dataTableInstance);
    ```

    Source: [Runtime/Config/ConfigComponent.cs#L117-L185](/src/Runtime/Config/ConfigComponent.cs#L117-L185)

## Common Variations

- To customize the implementation class, fill in the full name (including namespace) of the `IConfigManager` implementation class in the `componentType` field. `Awake()` will resolve it via `Utility.Assembly.GetType`; the resolved result will be displayed in the Inspector's `ImplementationComponentType` for easy verification.
- To troubleshoot stripping issues, confirm in the build script that `GameFrameXConfigCroppingHelper` triggers reference preservation for `ConfigComponent` and `BaseDataTable<>` (guaranteed jointly by the `[Preserve]` attribute and the cropping helper).

    ```csharp
    _ = typeof(BaseDataTable<>);
    _ = typeof(ConfigComponent);
    ```

    Source: [Runtime/GameFrameXConfigCroppingHelper.cs#L20-L22](/src/Runtime/GameFrameXConfigCroppingHelper.cs#L20-L22)

## Common Errors

| Symptom | Cause | Fix |
|------|------|------|
| Console prints `Config manager is invalid.` | The `IConfigManager` module is not registered or has been stripped | Confirm the implementation class exists and is automatically registered by the framework; explicitly reference `GameFrameX.Runtime` if necessary to prevent stripping |
| Inspector `ImplementationComponentType` shows empty | The `componentType` string is misspelled or the assembly is not loaded | Check that `componentType` exactly matches the fully qualified name of the implementation class |
| `GetConfig<T>` returns `default` | The configuration item with the corresponding name was not registered via `Add` | Call `configComponent.LoadConfig("...")` or `Add(...)` first before reading |

## Background (Optional)

`ConfigComponent` is a MonoBehaviour inherited from `GameFrameworkComponent`. The framework automatically registers it via `[GameFrameXAutoComponent(-5000)]` with a priority of -5000. The Inspector derives from `ComponentTypeComponentInspector`, and its core responsibility is to visualize the fully qualified names of the interface and implementation class in the editor, making it easy to confirm module assembly without running the game.