# 监控(APM)

[[toc]]
---

该组件为基于 `Prometheus` 的对游戏进程或定点监控记录.也可以成为程序的APM

:::tip
该组件不是必须组件.可以不用.
因为需要安装 `prometheus` 和 `grafana`,这个需要自行探索.门槛稍微有一点点.
:::

## 启动

调用 `MetricsHelper.Start` 启动该功能.端口必须不能被占用且是大于0的端口

## 最佳实践

1. 定义你的打点名称.统一使用小写和下划线分割
2. 定义一个计数器.请根据需求选择不同的计数器. 当前为 `Counter`

    ```csharp
    public static class MetricsDiscoveryRegister
    {
        private static Gauge _serviceCounterOptions;
    
        /// <summary>
        /// 注册到发现中心的服务数量
        /// </summary>
        public static Gauge ServiceCounterOptions
        {
            get { return _serviceCounterOptions ??= Prometheus.Metrics.CreateGauge("service_count", "注册到发现中心的服务数量"); }
        }
    }
    ```

3. 如何使用,直接调用接口

```csharp
MetricsDiscoveryRegister.ServiceCounterOptions.Inc();
```
