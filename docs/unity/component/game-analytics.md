# 游戏分析(数据统计)

GameFrameX 的 GameAnalytics 游戏数据分析的组件
提供游戏开发者集成和使用游戏数据分析的功能的接口。包含了不同类型的事件上报和计时器功能。该组件作为游戏框架的一部分，便于游戏开发者集成和使用游戏数据分析的功能。

---
[[toc]]

::: tip
支持多个实现库共存。按照组件列表的顺序依次执行上报调用
:::

## 初始化(自动初始化.)

在Unity的`Awake`方法中，`GameAnalyticsComponent`被初始化，并创建了一个`GameAnalyticsManager`实例。通过调用`Init`
方法，完成具体的初始化过程，并设置`_isInit`标志为`true`，以确保后续的方法只在初始化之后被执行。

::: tip
在初始化的时候将会把实现类中的参数列表以字典的方式传递给实现类。根据自己的需求获取所需要的字段内容
:::

```csharp
public void Init()
{
    _gameAnalyticsManager.Init();
    _isInit = true;
}
```

## 计时功能

### 开始计时

`StartTimer`方法允许开发者为某个事件开始计时。在事件开始时调用此方法，并传入事件名称。

```csharp
public void StartTimer(string eventName)
{
    if (!_isInit)
    {
        return;
    }

    _gameAnalyticsManager.StartTimer(eventName);
}
```

### 结束计时

结束特定事件的计时，使用`StopTimer`方法，并传入相应的事件名称。

```csharp
public void StopTimer(string eventName)
{
    if (!_isInit)
    {
        return;
    }

    _gameAnalyticsManager.StopTimer(eventName);
}
```

## 事件上报

### 简单事件上报

用于上报不包含额外数据的简单事件。只需调用`Event`方法并传入事件名称。

```csharp
public void Event(string eventName)
{
    if (!_isInit)
    {
        return;
    }

    _gameAnalyticsManager.Event(eventName);
}
```

### 带数值的事件上报

上报包含数值信息的事件。调用`Event`方法，并传入事件名称以及相关的数值。

```csharp
public void Event(string eventName, float eventValue)
{
    if (!_isInit)
    {
        return;
    }

    _gameAnalyticsManager.Event(eventName, eventValue);
}
```

### 带自定义字段的事件上报

上报包含自定义字段的事件。在调用`Event`方法时传入事件名称和一个字典类型的自定义字段数据。

```csharp
public void Event(string eventName, Dictionary<string, string> customF)
{
    if (!_isInit)
    {
        return;
    }

    // 将字符串字典转换为对象字典
    var value = new Dictionary<string, object>();
    foreach (var kv in customF)
    {
        value[kv.Key] = kv.Value;
    }

    _gameAnalyticsManager.Event(eventName, value);
}
```

### 带数值和自定义字段的事件上报

上报一个同时包含数值信息和自定义字段的事件，需要调用`Event`方法并传入事件名称、事件数值以及自定义字段的字典。

```csharp
public void Event(string eventName, float eventValue, Dictionary<string, string> customF)
{
    if (!_isInit)
    {
        return;
    }

    var value = new Dictionary<string, object>();
    foreach (var kv in customF)
    {
        value[kv.Key] = kv.Value;
    }

    _gameAnalyticsManager.Event(eventName, eventValue, value);
}
```

## 使用事项

- 请确保在使用组件的任何方法之前，组件已被正确初始化。
- 若`_isInit`为`false`，则不进行任何操作，确保了只有在组件初始化后事件上报或计时才有效作用。
- 上报的事件名称应该具有代表性和唯一性，以确保数据分析的准确性。

## 集成提示

- 工程中应引入命名空间`GameFrameX.GameAnalytics.Runtime`。
- 确保`GameAnalyticsManager`被正确实例化，并已经通过`GameFramework`注册。
- 对于自定义字段，使用`Dictionary<string, string>`类型保持键值对的数据结构。

## 使用方式(任选其一)

1. 直接在 `manifest.json` 的文件中的 `dependencies` 节点下添加以下内容
   ```json
      {"com.gameframex.unity.gameanalytics": "https://github.com/GameFrameX/com.gameframex.unity.gameanalytics.git"}
    ```
2. 在Unity 的`Packages Manager` 中使用`Git URL`
   的方式添加库,地址为：https://github.com/GameFrameX/com.gameframex.unity.gameanalytics.git

3. 直接下载仓库放置到Unity 项目的`Packages` 目录下。会自动加载识别
