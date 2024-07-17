# 系统计时器

[[toc]]
---

## 系统计时器(TimerExtension)

### Reset 方法

- **功能描述**: 重置计时器，使其重新开始计时。
- **参数**:
    - `timer`: System.Timers.Timer类型的对象，需要被重置的计时器。
- **返回值**: 无
- **应用场景**: 当需要重新开始计时，或者在特定条件下重置计时器时使用。
- **示例代码**:

```C#
using GameFrameX.Extension;
using System.Timers;

class Program
{
    static void Main(string[] args)
    {
        System.Timers.Timer timer = new System.Timers.Timer(1000);
        timer.Elapsed += Timer_Elapsed;
        timer.Enabled = true;

        // 在计时器触发3次后重置计时器
        while (true)
        {
            if (timer.ElapsedMilliseconds >= 3000)
            {
                timer.Reset();
                break;
            }
        }
    }

    private static void Timer_Elapsed(object sender, ElapsedEventArgs e)
    {
        Console.WriteLine("计时器触发，当前时间：" + e.SignalTime);
    }
}
```
