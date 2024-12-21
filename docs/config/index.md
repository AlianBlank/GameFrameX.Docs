# 配置文件

修改于LuBan的Next版本，并不定期合并内容

# 修改或增加内容

## 增加表格的自动导出名称定义方式。

    格式  #[任意字母]-[导出的表名称]-[表名称注释].xlsx
    表格以`#` 可以接任意字母开头。
    中间部分的表名称为英文且不能有空格可以有下划线
    后面表名称注释可以接任意长度。程序只取第一个`-` 和第二个`-` 之间的内容加上 `Tb` 为最终表名称。

### 示例

#L-Localization.xlsx => `Tb`Localization

#C-Achievement-成就表.xlsx => `Tb`Achievement

#C-Achievement-成就表-AAA.xlsx => `Tb`Achievement

#C-Achievement-成就表-AAA-BBB.xlsx => `Tb`Achievement

#C-Achievement-成就表-AAA-BBB-CCC.xlsx => `Tb`Achievement

[文档](start.md)
