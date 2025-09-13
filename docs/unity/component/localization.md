# 本地化

[[toc]]
---

# GameFrameX Localization 本地化组件

**Localization 本地化组件** - 提供完整的多语言本地化解决方案，支持动态语言切换、字符串格式化和系统语言检测。

[![License](https://img.shields.io/github/license/AlianBlank/com.gameframex.unity.localization)](https://github.com/AlianBlank/com.gameframex.unity.localization/blob/main/LICENSE)
[![Unity Version](https://img.shields.io/badge/Unity-2021.3+-blue.svg)](https://unity3d.com/get-unity/download)

## 功能特性

- 🌍 **多语言支持** - 支持任意数量的语言和地区
- 🔄 **动态语言切换** - 运行时无缝切换语言
- 📝 **字符串格式化** - 支持最多16个参数的字符串格式化
- 🎯 **系统语言检测** - 自动检测并适配系统语言
- 📦 **字典管理** - 完整的本地化字典增删改查功能
- 🔧 **可扩展架构** - 支持自定义本地化辅助器
- 📱 **编辑器支持** - 编辑器模式下的语言预览功能

## 安装方式

### 方式一：通过 Package Manager 安装

1. 打开 Unity Package Manager
2. 点击 "+" 按钮，选择 "Add package from git URL"
3. 输入以下 URL：

```
https://github.com/AlianBlank/com.gameframex.unity.localization.git
```

### 方式二：通过 manifest.json 安装

在项目的 `Packages/manifest.json` 文件中添加：

```json
{
  "dependencies": {
    "com.gameframex.unity.localization": "https://github.com/AlianBlank/com.gameframex.unity.localization.git"
  }
}
```

### 方式三：本地安装

1. 下载源码到本地
2. 将整个文件夹放置到项目的 `Packages` 目录下
3. Unity 会自动识别并加载该包

## 依赖项

本组件依赖以下 GameFrameX 模块：

- `GameFrameX.Runtime` - 核心运行时模块
- `GameFrameX.Event.Runtime` - 事件系统模块
- `GameFrameX.Asset.Runtime` - 资源管理模块
- `GameFrameX.Setting.Runtime` - 设置管理模块

## 快速开始

### 1. 添加本地化组件

在场景中的 GameFrameX 管理器上添加 `LocalizationComponent` 组件：

```csharp
// 组件会自动初始化，无需手动代码
```

### 2. 基础用法

```csharp
// 获取本地化组件
var localization = GameEntry.GetComponent<LocalizationComponent>();

// 设置语言
localization.Language = "zh_CN"; // 中文
localization.Language = "en_US"; // 英文

// 获取本地化字符串
string text = localization.GetString("UI.Button.OK");

// 带参数的本地化字符串
string message = localization.GetString("UI.Message.Welcome", playerName);
string info = localization.GetString("UI.Info.Score", score, level);
```

### 3. 字典管理

```csharp
// 检查字典是否存在
bool exists = localization.HasRawString("UI.Button.Cancel");

// 获取原始字符串
string rawText = localization.GetRawString("UI.Button.Cancel");

// 添加字典项
localization.AddRawString("UI.Button.NewButton", "新按钮");

// 移除字典项
bool removed = localization.RemoveRawString("UI.Button.Cancel");

// 清空所有字典
localization.RemoveAllRawStrings();
```

### 4. 监听语言变化事件

```csharp
// 订阅语言变化事件
GameEntry.GetComponent<EventComponent>().Subscribe(
    LocalizationLanguageChangeEventArgs.EventId, 
    OnLanguageChanged);

private void OnLanguageChanged(object sender, GameEventArgs e)
{
    var args = (LocalizationLanguageChangeEventArgs)e;
    Debug.Log($"语言从 {args.OldLanguage} 切换到 {args.Language}");
    
    // 更新UI显示
    RefreshUI();
}
```

## 高级功能

### 自定义本地化辅助器

创建自定义的本地化辅助器来扩展功能：

```csharp
public class CustomLocalizationHelper : LocalizationHelperBase
{
    public override string SystemLanguage
    {
        get
        {
            // 自定义系统语言检测逻辑
            return GetCustomSystemLanguage();
        }
    }
    
    private string GetCustomSystemLanguage()
    {
        // 实现自定义的系统语言检测
        // 例如：从服务器获取、用户偏好设置等
        return "zh_CN";
    }
}
```

### 组件配置

在 Inspector 面板中可以配置以下选项：

- **Editor Language**: 编辑器模式下使用的语言
- **Default Language**: 默认语言（加载失败时的备用语言）
- **Enable Load Dictionary Update Event**: 是否启用字典加载更新事件
- **Is Enable Editor Mode**: 是否启用编辑器模式
- **Localization Helper Type Name**: 本地化辅助器类型名称
- **Custom Localization Helper**: 自定义本地化辅助器实例

## API 参考

### LocalizationComponent 主要方法

| 方法                                               | 描述             |
|--------------------------------------------------|----------------|
| `GetString(string key)`                          | 获取本地化字符串       |
| `GetString<T>(string key, T arg)`                | 获取带1个参数的本地化字符串 |
| `GetString<T1,T2>(string key, T1 arg1, T2 arg2)` | 获取带2个参数的本地化字符串 |
| `HasRawString(string key)`                       | 检查字典项是否存在      |
| `GetRawString(string key)`                       | 获取原始字典值        |
| `AddRawString(string key, string value)`         | 添加字典项          |
| `RemoveRawString(string key)`                    | 移除字典项          |
| `RemoveAllRawStrings()`                          | 清空所有字典         |

### 属性

| 属性                | 类型     | 描述        |
|-------------------|--------|-----------|
| `Language`        | string | 当前语言      |
| `DefaultLanguage` | string | 默认语言      |
| `SystemLanguage`  | string | 系统语言（只读）  |
| `DictionaryCount` | int    | 字典项数量（只读） |

### 事件

| 事件                                    | 描述     |
|---------------------------------------|--------|
| `LocalizationLanguageChangeEventArgs` | 语言变化事件 |

## 语言代码规范

本组件遵循 [RFC 5646](https://datatracker.ietf.org/doc/html/rfc5646) 语言标签标准：

- `zh_CN` - 简体中文
- `zh_TW` - 繁体中文
- `en_US` - 美式英语
- `en_GB` - 英式英语
- `ja_JP` - 日语
- `ko_KR` - 韩语

## 最佳实践

### 1. 字典键命名规范

建议使用层级化的命名方式：

```csharp
// UI相关
"UI.Button.OK"
"UI.Button.Cancel"
"UI.Message.Welcome"

// 游戏内容相关
"Game.Item.Sword"
"Game.Skill.Fireball"
"Game.Achievement.FirstWin"

// 错误信息相关
"Error.Network.Timeout"
"Error.Login.InvalidPassword"
```

### 2. 参数化字符串

合理使用参数化字符串，避免字符串拼接：

```csharp
// 推荐
"UI.Message.PlayerLevel" = "玩家等级：{0}"
localization.GetString("UI.Message.PlayerLevel", level);

// 不推荐
"UI.Message.PlayerLevel" = "玩家等级："
text = localization.GetString("UI.Message.PlayerLevel") + level;
```

### 3. 语言切换时机

在合适的时机进行语言切换，避免频繁切换：

```csharp
// 在游戏启动时设置
private void Start()
{
    var savedLanguage = PlayerPrefs.GetString("Language", "");
    if (string.IsNullOrEmpty(savedLanguage))
    {
        // 使用系统语言
        localization.Language = localization.SystemLanguage;
    }
    else
    {
        localization.Language = savedLanguage;
    }
}

// 保存用户选择的语言
private void SaveLanguagePreference(string language)
{
    PlayerPrefs.SetString("Language", language);
    PlayerPrefs.Save();
}
```

## 注意事项

1. **语言代码格式**：使用下划线分隔的格式（如 `zh_CN`），而不是连字符格式
2. **字典键大小写**：字典键区分大小写，建议统一使用规范的命名方式
3. **参数数量限制**：单个字符串最多支持16个格式化参数
4. **内存管理**：大量字典数据可能占用较多内存，建议按需加载
5. **线程安全**：组件操作应在主线程中进行

## 最佳实践

1. 清空当前的本地化内容源数据
2. 从Luban 或者其他地方加载到本地化信息。
3. 重新装填覆盖源数据信息
4. 刷新本地化界面

- 启动的时候或者语言切换的时候执行 `TranslateText` 函数

```csharp
// 翻译本地化
private static void TranslateText()
{
    // 1. 删除源数据
    GameApp.Localization.RemoveAllRawStrings();
    // 2. 从配置表中加载数据
    var tbLocalization = GameApp.Config.GetConfig<TbLocalization>();
    // 3. 装填数据信息
    tbLocalization.ForEach(localization =>
    {
        if (localization.Key.IsNullOrWhiteSpace())
        {
            return;
        }

        var value = string.Empty;
        // 根据不同的语言读取不同的值，这个地方可以自行优化
        switch (GameApp.Localization.Language)
        {
            case LocalizationCode.ChineseSimplified:
                value = localization.ChineseSimplified;
                break;
            case LocalizationCode.ChineseTraditionalTW:
                value = localization.ChineseTraditionalTW;
                break;
            case LocalizationCode.ChineseTraditionalHK:
                value = localization.ChineseTraditionalHK;
                break;
            case LocalizationCode.English:
                value = localization.English;
                break;
            case LocalizationCode.French:
                value = localization.French;
                break;
            case LocalizationCode.German:
                value = localization.German;
                break;
            case LocalizationCode.Italian:
                value = localization.Italian;
                break;
            case LocalizationCode.Japanese:
                value = localization.Japanese;
                break;
            case LocalizationCode.Korean:
                value = localization.Korean;
                break;
            case LocalizationCode.Portuguese:
            case LocalizationCode.PortugueseBR:
            case LocalizationCode.PortugueseAO:
            case LocalizationCode.PortugueseCV:
            case LocalizationCode.PortugueseGW:
            case LocalizationCode.PortugueseMZ:
            case LocalizationCode.PortugueseST:
            case LocalizationCode.PortugueseTL:
                value = localization.PortuguesePortugal;
                break;
            case LocalizationCode.SpanishAR:
            case LocalizationCode.SpanishBO:
            case LocalizationCode.SpanishCL:
            case LocalizationCode.SpanishCO:
            case LocalizationCode.SpanishCR:
            case LocalizationCode.SpanishDO:
            case LocalizationCode.SpanishEC:
            case LocalizationCode.SpanishGQ:
            case LocalizationCode.SpanishGT:
            case LocalizationCode.SpanishHN:
            case LocalizationCode.SpanishMX:
            case LocalizationCode.SpanishNI:
            case LocalizationCode.SpanishPA:
            case LocalizationCode.SpanishPE:
            case LocalizationCode.SpanishPR:
            case LocalizationCode.SpanishSV:
            case LocalizationCode.SpanishUY:
            case LocalizationCode.SpanishVE:
                value = localization.Spanish;
                break;
            case LocalizationCode.Thai:
                value = localization.Thai;
                break;
            case LocalizationCode.Vietnamese:
                value = localization.Vietnamese;
                break;
            case LocalizationCode.Russian:
                value = localization.Russian;
                break;
            case LocalizationCode.Indonesian:
                value = localization.Indonesian;
                break;
            default:
            {
                if (GameApp.Localization.DefaultLanguage == LocalizationCode.English)
                {
                    value = localization.English;
                }
            }
                break;
        }

        GameApp.Localization.AddRawString(localization.Key, value);
    });

    // 刷新Luban配置表中的本地化内容
    _tablesComponent.SetTranslateText((key, y) =>
    {
        if (key.IsNullOrWhiteSpace())
        {
            return string.Empty;
        }

        return GameApp.Localization.GetString(key);
    });
}

```

## 许可证

本项目采用 MIT 许可证和 Apache 许可证（版本 2.0）进行分发和使用。详细信息请查看 [LICENSE](LICENSE) 文件。

## 支持与反馈

- **GitHub Issues**: [提交问题](https://github.com/gameframex/com.gameframex.unity.localization/issues)

---

**GameFrameX** - 让游戏开发更简单！