# HTTP 处理器指南

HTTP 接口主要用于 GM 或外部服务调用，以下是代码命名和使用规范。

## 使用方法

例如：功能为 Test 的接口

1. 定义一个名为 `TestHttpHandler` 的 `sealed` 类，继承自 `BaseHttpHandler`。
2. 在类上添加 `[HttpMessageMapping(typeof(TestHttpHandler))]` 标记，参数为当前类的类型。
3. 实现 `Task<string> Action(string ip, string url, Dictionary<string, string> parameters)` 抽象函数。
4. 函数必须返回一个字符串，使用系统内置的 `HttpResult` 类结构统一返回内容。

## 标签解析

`HttpMessageMapping` 后面的参数为当前类的类型。在启动时将根据该类型生成地址和规范检查。

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
