# 配置文件

修改于LuBan的Next版本，并不定期合并内容

## LuBan 文档

[https://luban.doc.code-philosophy.com/docs/intro](https://luban.doc.code-philosophy.com/docs/intro)

## 修改或增加内容

### 增加文件夹携带中文别名功能方便识别

- 在正常的系统中。目录将会识别为命名空间。如以下的路径 ./Config/Excels/Tables/GMTable/G-GMConfig-c-GM表.xlsx 将会生成 Tables.GMTable 的命名空间
- 但是现在可以在GMTable 后面加上`-` 或者 `_` 之后可以跟中文或者任意的别名。但是要以 `-` 或者 `_` 分割不会对命名空间和结果造成影响
  例如: ./Config/Excels/Tables/GMTable/G-GMConfig-c-GM表.xlsx =>  Tables.GMTable 的命名空间

| 原路径                                                            | 命名空间           |
|----------------------------------------------------------------|----------------|
| ./Config/Excels/Tables/GMTable/G-GMConfig-c-GM表.xlsx           | Tables.GMTable |
| ./Config/Excels/Tables/GMTable-游戏指令/G-GMConfig-c-GM表.xlsx      | Tables.GMTable |
| ./Config/Excels/Tables/GMTable-游戏指令-关卡操作/G-GMConfig-c-GM表.xlsx | Tables.GMTable |

### 增加 **table** **bean** **enum** 的分表支持

- 由于在项目协同中会遇到多人修改 enum 枚举表或bean 结构表导致冲突。

#### 如何使用

1. 将 luban.conf 中的内容修改为以下内容

```json
{
  "groups": [
    {
      "names": [
        "c"
      ],
      "default": true
    },
    {
      "names": [
        "s"
      ],
      "default": true
    }
  ],
  "schemaFiles": [
    {
      "fileName": "Defines",
      "type": ""
    }
  ],
  "dataDir": "Excels",
  "targets": [
    {
      "name": "server",
      "manager": "TablesComponent",
      "groups": [
        "s"
      ],
      "topModule": "GameFrameX.Config"
    },
    {
      "name": "client",
      "manager": "TablesComponent",
      "groups": [
        "c"
      ],
      "topModule": "Hotfix.Config"
    },
    {
      "name": "all",
      "manager": "Tables",
      "groups": [
        "c",
        "s"
      ],
      "topModule": "cfg"
    }
  ],
  "description": "描述备注： toolPath: LuBan 工具目录, UNITY_ASSETS_PATH: Unity Assets 全路径, SERVER_PATH: 服务器全目录, commands: 需要执行的命令列表",
  "toolPath": "/../Config/Tools/Luban.dll",
  "UNITY_ASSETS_PATH": "",
  "SERVER_PATH": "",
  "commands": [
    {
      "command": "--target server --dataTarget json --codeTarget cs-dotnet-json --xargs outputDataDir=%SERVER_PATH%/Server.Config/Json  --xargs outputCodeDir=%SERVER_PATH%/Server.Config/Config",
      "target": "server",
      "active": true
    },
    {
      "localizationFileName": "Localization.xlsx",
      "command": "--target client --dataTarget json --codeTarget cs-simple-json --xargs outputDataDir=%UNITY_ASSETS_PATH%/Bundles/Config  --xargs outputCodeDir=%UNITY_ASSETS_PATH%/Hotfix/Config/Generate ",
      "target": "client",
      "active": true
    },
    {
      "command": "--target server --dataTarget bin --codeTarget cs-bin --validationFailAsError true --xargs outputDataDir=%SERVER_PATH%/Server.Config/Json  --xargs outputCodeDir=%SERVER_PATH%/Server.Config/Config",
      "target": "server",
      "active": false
    },
    {
      "localizationFileName": "Localization.xlsx",
      "command": "--target client --dataTarget bin --codeTarget cs-bin --validationFailAsError true --xargs outputDataDir=%UNITY_ASSETS_PATH%/Bundles/Config  --xargs outputCodeDir=%UNITY_ASSETS_PATH%/Hotfix/Config/Generate",
      "target": "client",
      "active": false
    },
    {
      "command": "luban",
      "target": "all",
      "active": false
    }
  ]
}
```

2. 将 **__beans__.xlsx**   **__enums__.xlsx**  **__tables__.xlsx**  移动到 Defines 目录下。
3. 在 **__beans__.xlsx**   **__enums__.xlsx**  **__tables__.xlsx**  的`__` 后面加上中文或者别名。不会影响导出结果。
   例如:

+ __beans__通用.xlsx
+ __beans__战斗_1.xlsx
+ __beans__系统.xlsx

+ __enums__属性.xlsx
+ __enums__类别.xlsx
+ __enums__系统.xlsx

+ __tables__属性.xlsx
+ __tables__类别.xlsx
+ __tables__系统.xlsx

> 后面可以加任意内容。只要前面的部分保持一致即可

### 增加排除目录的参数配置

```
--excludePath Local/
```

- excludePath

后面跟随排除导出的目录。相对于 **luban.conf** 配置的相对目录或绝对路径都可以

> 最后的那个目录 `/` 不能缺少

### 增加本地化的文件夹配置支持

在项目中。经常会出现语言表在协作的时候有冲突。这个时候就需要按照每个模块来做表格文件本身的分离，已经不是Sheet的分离的问题了。所以将本地化文件夹配置支持文件夹下的所有文件都识别为本地化文件。

#### 导出参数(必须配置)

```
--xargs l10n.provider=gameframex --xargs l10n.textFile.keyFieldName=key  --xargs l10n.textFile.path=./Excels/Local/
```

- l10n.provider=`gameframex`

这里必须为 `gameframex` 否则会导致本地化文件识别失败。

- l10n.textFile.path=`./Excels/Local/`

这里值必须为 文件夹路径 否则会导致本地化文件识别失败。

> 文件夹名称不要和表名相同。不然会遇到不可预知的错误

### 增加自动导表的文件名称扩展识别

#### 导出参数(必须配置)

```
--xargs tableImporter.name=gameframex
```

#### 说明

格式 [任意字母]-[导出的表名称]-[导出的组名]-[表名称注释].xlsx

表格以任意字母-开头。

中间部分的表名称为英文且不能有空格可以有下划线

导出的组名称必须是定义的`s`、 `c` 之一，可选

后面表名称注释可以接任意长度。程序只取第一个`-` 和第二个`-` 之间的内容加上 `Tb` 为最终表名称。

#### 示例

##### 导出的表名称

L-Localization.xlsx => `Tb`Localization

C-Achievement-成就表.xlsx => `Tb`Achievement

C-Achievement-成就表-AAA.xlsx => `Tb`Achievement

C-Achievement-成就表-AAA-BBB.xlsx => `Tb`Achievement

C-Achievement-成就表-AAA-BBB-CCC.xlsx => `Tb`Achievement

##### 导出的组表名称

C-Achievement-s-成就表.xlsx => `Tb`Achievement, 当前导出目标为 `s` 时才会导出

C-Achievement-c-成就表-AAA.xlsx => `Tb`Achievement, 当前导出目标为 `c` 时才会导出

C-Achievement-s-成就表-AAA-BBB.xlsx => `Tb`Achievement, 当前导出目标为 `s` 时才会导出

C-Achievement-c-成就表-AAA-BBB-CCC.xlsx => `Tb`Achievement, 当前导出目标为 `c` 时才会导出

