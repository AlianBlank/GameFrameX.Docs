# Dependencies and Environment Requirements

This page summarizes the Unity version, runtime dependencies, and development dependencies required by the `com.gameframex.unity.config` package, serving as a quick reference for installation and troubleshooting.

## Environment Requirements

| Item | Version/Requirement | Source |
|------|----------------------|--------|
| Unity Editor | 2019.4 or higher | `unity` field in `package.json` |
| Package Name | `com.gameframex.unity.config` | `package.json` |
| Current Version | 1.2.1 | `version` field in `package.json` |
| Namespace | GameFrameX.Config | See source directory |

Source: [package.json](/package.json#L2-L7)

## Runtime Dependencies

The following three packages must be present in the project; otherwise `IDataTable<T>` and the configuration manager cannot initialize.

| Dependency Package | Version | Purpose |
|--------------------|---------|---------|
| `com.gameframex.unity` | 2.5.1 | GameFrameX framework core (Procedure, module base classes, event bus host) |
| `com.gameframex.unity.asset` | 3.1.1 | Asset loading pipeline; data table asynchronous loading depends on it |
| `com.gameframex.unity.event` | 1.3.0 | Event system; configuration change notifications depend on it |

Source: [package.json](/package.json#L22-L26)

## Development Dependencies

Used only during release/build phases; not required to be installed when running the project:

| Package | Version | Purpose |
|---------|---------|---------|
| `semantic-release` | ^24.2.0 | Automated semantic versioning release |
| `@semantic-release/changelog` | ^6.0.3 | Generates CHANGELOG |
| `@semantic-release/git` | ^10.0.1 | Automatically tags git after release |

Source: [package.json](/package.json#L27-L31)

## Unity Package Manager Installation

Add this package via OpenUPM / internal npm source; dependencies will be pulled automatically as declared in the package:

1. Open `Packages/manifest.json`.
2. Add to `dependencies`:

```json
{
  "dependencies": {
    "com.gameframex.unity.config": "1.2.1"
  }
}
```

3. After saving, Unity will automatically resolve and download the three packages listed under "Runtime Dependencies" above.

## Version Constraint Description

| Field | Value | Meaning |
|-------|-------|---------|
| `unity` | `2019.4` | Minimum Unity Editor version required by the UPM protocol |
| Dependency Version Number | Exact version (e.g., `2.5.1`) | UPM resolves by exact version by default and does not auto-upgrade to the next minor version |

## Common Errors

| Symptom | Cause | Fix |
|---------|-------|-----|
| After installation, `Cannot find assembly GameFrameX` is reported | Missing the `com.gameframex.unity` core package | Add `"com.gameframex.unity": "2.5.1"` to the manifest |
| Data table loading reports that the resource manager is not initialized | Missing `com.gameframex.unity.asset` | Add `"com.gameframex.unity.asset": "3.1.1"` to the manifest |
| Configuration change listener receives no callback | Missing `com.gameframex.unity.event` | Add `"com.gameframex.unity.event": "1.3.0"` to the manifest |
| Unity reports `package requires Unity 2019.4` on open | Editor version is lower than 2019.4 | Upgrade Unity Hub to 2019.4 LTS or higher |

## Related Links

- Documentation Site: https://gameframex.doc.alianblank.com
- Repository: https://github.com/gameframex/com.gameframex.unity.config
- Changelog: https://github.com/gameframex/com.gameframex.unity.config/blob/main/CHANGELOG.md

Source: [package.json](/package.json#L36-L38)