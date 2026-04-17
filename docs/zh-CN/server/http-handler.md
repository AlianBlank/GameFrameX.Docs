# HTTP 处理器指南

HTTP 接口主要用于 GM 或外部服务调用，以下是代码命名和使用规范。

## 使用方法

例如：功能为 Test 的接口

1. 定义一个名为 `TestHttpHandler` 的 `sealed` 类，继承自 `BaseHttpHandler`。
2. 在类上添加 `[HttpMessageMapping(typeof(TestHttpHandler))]` 标记，参数为当前类的类型。
3. 实现 `Task<string> Action(string ip, string url, Dictionary<string, string> parameters)` 抽象函数。
4. 函数必须返回一个字符串，使用系统内置的 `HttpResult` 类结构统一返回内容。

## 标签解析

| 标签类型                  | 是否必须 | 描述                                |
|-----------------------|------|-----------------------------------|
| `HttpMessageMapping`  | 必选   | 后面的参数为当前类的类型。在启动时将根据该类型生成地址和规范检查。 |
| `HttpMessageRequest`  | 可选   | 后面的参数为请求消息类型定义。在生成Swagger的时候将会使用  |
| `HttpMessageResponse` | 可选   | 后面的参数为响应消息类型定义。在生成Swagger的时候将会使用  |
| `Description`         | 可选   | 后面为接口注释。在生成Swagger的时候将会使用         |

## 生成路径

配置的根地址 + 端口 + 固定值 (`/game/api/`) + 当前类去除后缀 `HttpHandler` 的小写名称，且遇见大写字母将转换成下划线分割。

例如，`TestHttpHandler` 转换结果为：`http://localhost:20001/game/api/test`

## 命名要求

- 类名必须以 `HttpHandler` 结尾，否则将抛出异常。
- 必须标记为 `sealed` 密封类，以节省内存和提升性能。如果有继承需求，请提出。

## 参数解析

- `ip`：请求来源地址。
- `url`：当前处理器的地址。
- `parameters`：传递进来的参数，根据业务需求从中获取所需内容。
- `messageObject`：传递进来的消息对象类型的参数，根据业务需求转换为所需的类型使用。

## 最佳实践

### 常规操作

```cs

using GameFrameX.NetWork.HTTP;

namespace GameFrameX.Hotfix.Logic.Http
{
    /// <summary>
    /// 测试
    /// http://localhost:20001/game/api/test
    /// </summary>
    [HttpMessageMapping(typeof(TestHttpHandler))]
    public sealed class TestHttpHandler : BaseHttpHandler
    {
        public class HttpTestRes
        {
            public class Info
            {
                public int    Age  { get; set; }
                public string Name { get; set; }
            }

            public int    A { get; set; }
            public string B { get; set; }

            public Info TestInfo { get; set; }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="ip"></param>
        /// <param name="url"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public override Task<string> Action(string ip, string url, Dictionary<string, string> parameters)
        {
            var response = new HttpTestRes
                           {
                               A        = 100,
                               B        = "hello",
                               TestInfo = new HttpTestRes.Info()
                           };
            response.TestInfo.Age  = 18;
            response.TestInfo.Name = "leeveel";
            return Task.FromResult(HttpResult.Create(response));
        }
    }
}

```

### Swagger操作

```cs
using GameFrameX.Apps.Common.Event;
using GameFrameX.Apps.Common.EventData;

namespace GameFrameX.Hotfix.Logic.Http.Bag;

/// <summary>
/// 请求给玩家发送道具
/// </summary>
[HttpMessageMapping(typeof(ReqPlayerSendItemHttpHandler))]
[HttpMessageRequest(typeof(ReqPlayerSendItemRequest))]
[HttpMessageResponse(typeof(ReqPlayerSendItemResponse))]
[Description("请求给玩家发送道具")]
public sealed class ReqPlayerSendItemHttpHandler : BaseHttpHandler
{
    public override Task<string> Action(string ip, string url, HttpMessageRequestBase requestBase)
    {
        var request = (ReqPlayerSendItemRequest)requestBase;
        // 发送道具事件
        var playerSendItemEventArgs = new PlayerSendItemEventArgs(request.RoleId, request.IsRecharge, request.ProductId, request.Items);

        EventDispatcher.Dispatch(request.RoleId, (int)EventId.PlayerSendItem, playerSendItemEventArgs);
        var response = new ReqPlayerSendItemResponse();
        //!!!用户正优化,程序负优化,如果是每日特惠一键打包,需要将免费道具也添加到发送的道具中
        var weekDay = (int)DateTime.UtcNow.DayOfWeek;
        var tbDailyStoreDetailConfig = ConfigComponent.Instance.GetConfig<TbDailyStoreDetailConfig>().Find(m => m.PackReward == request.ProductId && m.WeekDay == weekDay);
        if (tbDailyStoreDetailConfig.IsNotNull())
        {
            foreach (var commonRewards in tbDailyStoreDetailConfig.RewardsItem)
            {
                request.Items.Add(new PropertyItem()
                {
                    Id = commonRewards.Id,
                    Count = commonRewards.Count,
                    Star = commonRewards.Star
                });
            }
        }

        foreach (var propertyItem in request.Items)
        {
            var configId = (int)propertyItem.Id;
            if (response.Items.TryGetValue(configId, out _))
            {
                response.Items[configId] += propertyItem.Count;
            }
            else
            {
                response.Items[configId] = propertyItem.Count;
            }
        }

        return Task.FromResult(HttpJsonResult.SuccessString(response));
    }
}

public sealed class ReqPlayerSendItemRequest : HttpMessageRequestBase
{
    [Required]
    [Description("角色ID")]
    [Range(1, long.MaxValue)]
    public long RoleId { get; set; }

    [Description("是否是充值")] public bool IsRecharge { get; set; }

    [Description("商品ID，充值使用表ID,SKU, 只有在IsRecharge 为true时生效")]
    public long ProductId { get; set; }

    [Required] [Description("道具列表")] public List<PropertyItem> Items { get; set; } = new List<PropertyItem>();
}

public sealed class ReqPlayerSendItemResponse : HttpMessageResponseBase
{
    [Description("成功的道具列表")] public Dictionary<int, long> Items { get; set; } = new Dictionary<int, long>();
}
```