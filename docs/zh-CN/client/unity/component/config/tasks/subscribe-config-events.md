# 如何订阅配置加载事件(成功 / 失败 / 热更新)

通过 GameFrameX 的全局事件管理器订阅 `LoadConfigSuccessEventArgs`、`LoadConfigFailureEventArgs`、`LoadConfigUpdateEventArgs` 三个事件,即可在配置加载成功、失败、热更新进度变化时收到回调,无需直接依赖 `ConfigComponent`。

## 前置条件

- 已初始化 GameFrameX 框架,并通过 `GameFrameworkEntry.GetModule<IConfigManager>()` 能拿到配置管理器。
- 项目里能找到 `GameFrameX.Config.Runtime` 命名空间下的三个 `EventArgs` 类(框架自带,无需自行创建)。

## 事件总览

| 事件类型 | EventId 来源 | 关键字段 | 触发时机 |
|----------|--------------|----------|----------|
| `LoadConfigSuccessEventArgs` | `typeof(LoadConfigSuccessEventArgs).FullName` | `ConfigAssetName`、`Duration`、`UserData` | 单个配置加载完成且成功 |
| `LoadConfigFailureEventArgs` | `typeof(LoadConfigFailureEventArgs).FullName` | `ConfigAssetName`、`ErrorMessage`、`UserData` | 配置加载抛出异常或失败 |
| `LoadConfigUpdateEventArgs` | `typeof(LoadConfigUpdateEventArgs).FullName` | `ConfigAssetName`、`Progress`(0~1)、`UserData` | 配置加载/热更新进度变化 |

事件 ID、字段定义均来自源码中的 EventArgs 类。Source: [Runtime/EventArgs/LoadConfigSuccessEventArgs.cs](/Runtime/EventArgs/LoadConfigSuccessEventArgs.cs#L42-L137), [Runtime/EventArgs/LoadConfigFailureEventArgs.cs](/Runtime/EventArgs/LoadConfigFailureEventArgs.cs#L43-L137), [Runtime/EventArgs/LoadConfigUpdateEventArgs.cs](/Runtime/EventArgs/LoadConfigUpdateEventArgs.cs#L43-L137)。

## 操作步骤

1. 获取全局事件订阅器(任选一种 GameFrameX 项目里提供的入口,常见为 `GameFrameXEntry.GetModule<IEventManager>()` 或封装后的 `GameEntry.Event`,订阅 API 都是 `Subscribe(eventId, handler)`)。
2. 在初始化阶段调用 `Subscribe`,把回调注册到对应 `EventId`(直接用 `EventArgs` 类的 `EventId` 静态字段,避免硬编码字符串)。
3. 在回调里强转 `GameEventArgs` 到具体的 `LoadConfigXxxEventArgs`,读取字段。
4. 框架内部使用 `ReferencePool.Acquire` 创建事件实例,通过 `GameEntry.Event.Fire(this, EventId, e)` 投递,订阅回调执行完毕后框架会自动调用 `Clear()` 并回收,不要在回调里长期持有引用。Source: [Runtime/EventArgs/LoadConfigSuccessEventArgs.cs](/Runtime/EventArgs/LoadConfigSuccessEventArgs.cs#L116-L136)
5. 不再需要时调用对应的 `Unsubscribe(eventId, handler)`,否则会造成内存泄漏或重复触发。

最小订阅示例(伪代码,具体 `IEventManager` 入口以项目实际封装为准):

```csharp
using GameFrameX.Config.Runtime;
using GameFrameX.Event.Runtime;
using GameFrameX.Runtime;

var eventManager = GameFrameXEntry.GetModule<IEventManager>();

// 成功
eventManager.Subscribe(LoadConfigSuccessEventArgs.EventId, OnLoadConfigSuccess);
// 失败
eventManager.Subscribe(LoadConfigFailureEventArgs.EventId, OnLoadConfigFailure);
// 进度/热更新
eventManager.Subscribe(LoadConfigUpdateEventArgs.EventId, OnLoadConfigUpdate);
```

```csharp
private void OnLoadConfigSuccess(object sender, GameEventArgs e)
{
    var args = (LoadConfigSuccessEventArgs)e;
    // args.ConfigAssetName / args.Duration / args.UserData
}

private void OnLoadConfigFailure(object sender, GameEventArgs e)
{
    var args = (LoadConfigFailureEventArgs)e;
    // args.ErrorMessage 包含失败原因
}

private void OnLoadConfigUpdate(object sender, GameEventArgs e)
{
    var args = (LoadConfigUpdateEventArgs)e;
    // args.Progress 取值范围 0.0 ~ 1.0
}
```

取消订阅:

```csharp
eventManager.Unsubscribe(LoadConfigSuccessEventArgs.EventId, OnLoadConfigSuccess);
eventManager.Unsubscribe(LoadConfigFailureEventArgs.EventId, OnLoadConfigFailure);
eventManager.Unsubscribe(LoadConfigUpdateEventArgs.EventId, OnLoadConfigUpdate);
```

## 常见变体

- **按 `ConfigAssetName` 过滤**:成功/失败/进度事件都带 `ConfigAssetName`,可在回调里 `switch` 判断后只处理关心的配置表。
- **携带业务参数**:加载配置时传入的 `userData` 会原样回传到 `UserData` 字段,可用于关联请求上下文。
- **热更新监听**:把 `LoadConfigUpdateEventArgs` 的 `Progress` 接到进度条 UI;`Progress` 到 1.0 后通常紧跟一条同 `ConfigAssetName` 的 `LoadConfigSuccessEventArgs`。

## 常见错误

- **手动 `new` 事件对象**:EventArgs 必须用各自的 `Create(...)` 静态方法创建,框架内部走 `ReferencePool.Acquire`;直接 `new` 会绕过对象池。Source: [Runtime/EventArgs/LoadConfigFailureEventArgs.cs](/Runtime/EventArgs/LoadConfigFailureEventArgs.cs#L116-L123)
- **在回调里长期持有事件实例**:事件回调结束后会被 `Clear()` 并回收到引用池,业务代码只应在回调作用域内使用 `args`。
- **硬编码 EventId 字符串**:用 `LoadConfigXxxEventArgs.EventId` 静态字段,类被重命名时不会失效。
- **重复订阅同一回调**:会触发多次;`Unsubscribe` 时确保传入的委托引用与订阅时一致。

## 背景(可选)

`ConfigComponent` 只负责读写缓存,不直接暴露事件;配置在加载/热更新过程中由底层模块通过全局 `IEventManager` 投递这三类 `EventArgs`,订阅方按 `EventId` 区分即可。Source: [Runtime/Config/ConfigComponent.cs](/Runtime/Config/ConfigComponent.cs#L49-L186)