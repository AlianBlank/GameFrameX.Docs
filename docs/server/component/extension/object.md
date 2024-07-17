# 基础对象

[[toc]]
---

## 基础对象(ObjectExtension)

### CheckNotNull

- **功能描述**：该函数用于检查传入的参数是否为 null。如果为 null，则抛出一个 `ArgumentNullException` 异常。
- **参数**：
    - `value`: 需要检查的参数值。
    - `name`: 参数的名称。
- **返回值**：无返回值。
- **应用场景**：该函数通常用于确保传入的参数不为 null，从而避免在程序运行过程中出现不必要的错误。
- **示例代码**：

```csharp
string str = null;
str.CheckNotNull(); // 抛出 ArgumentNullException 异常
```
