# 类型

[[toc]]
---

## 类型(TypeExtensions)

### IsImplWithInterface 方法

#### 功能描述

该方法用于判断一个类型是否实现了指定的接口。

#### 函数签名

```csharp
public static bool IsImplWithInterface(this Type self, Type target)
```

#### 参数

- `self`：要判断的类型。
- `target`：要判断的接口类型。

#### 返回值

- 如果类型实现了指定的接口且不是接口类型或抽象类型，则为 `true`；否则为 `false`。

#### 应用场景

- 在依赖注入或者类型转换时，用于检查一个类型是否实现了某个特定的接口。

#### 示例代码

```csharp
bool result = typeof(MyClass).IsImplWithInterface(typeof(IMyInterface));
```
