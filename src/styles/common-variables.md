# common-variables 使用说明

common-variables 主要作用是将全局的样式风格（颜色，尺寸等）统一。

1. 导入该文件
2. 使用样式变量

例如：

```vue
<style lang="scss">
@import 'common-variables';

.example {
  color: $color-primary; // 如果你要使用颜色，请参考该文件中的颜色配置

  border: $border-base; // 如果你要使用边框，请参考该文件中的颜色配置

  // more...
}
</style>
```
