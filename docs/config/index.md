# 配置文件

修改于LuBan的Next版本，并不定期合并内容

# 修改或增加内容

### 增加本地化的文件夹配置支持

在项目中。经常会出现语言表在协作的时候有冲突。这个时候就需要按照每个模块来做表格文件本身的分离，已经不是Sheet的分离的问题了。所以将本地化文件夹配置支持文件夹下的所有文件都识别为本地化文件。

#### 导出参数(必须配置)

```
--xargs l10n.provider=gameframex --xargs l10n.textFile.keyFieldName=key  --xargs l10n.textFile.path=./Excels/Tables/Localization/
```

- l10n.provider=`gameframex`

这里必须为 `gameframex` 否则会导致本地化文件识别失败。

- l10n.textFile.path=`./Excels/Tables/Localization/`

这里值必须为 文件夹路径 否则会导致本地化文件识别失败。

### 增加自动导表的文件名称扩展识别

#### 导出参数(必须配置)

```
--xargs tableImporter.name=gameframex
```

#### 说明

格式 #[任意字母]-[导出的表名称]-[表名称注释].xlsx

表格以`#` 可以接任意字母开头。

中间部分的表名称为英文且不能有空格可以有下划线

后面表名称注释可以接任意长度。程序只取第一个`-` 和第二个`-` 之间的内容加上 `Tb` 为最终表名称。

#### 示例

#L-Localization.xlsx => `Tb`Localization

#C-Achievement-成就表.xlsx => `Tb`Achievement

#C-Achievement-成就表-AAA.xlsx => `Tb`Achievement

#C-Achievement-成就表-AAA-BBB.xlsx => `Tb`Achievement

#C-Achievement-成就表-AAA-BBB-CCC.xlsx => `Tb`Achievement

[文档](start.md)
