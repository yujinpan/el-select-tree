# 全局的样式定义

- common-variables.scss 公共的 scss 变量
- element-ui.scss 自定义 element-ui 的默认样式
- index.scss 全局的样式文件引入入口，定义基准样式
- public.scss 全局的共用样式类
- transition.scss 全局的过渡效果

## 使用

公共的变量，样式类，过渡效果的使用。

### 公共的 scss 变量的使用

具体查看文件 [common-variables.scss](common-variables.scss)。

```scss
// 导入公共的变量
@import 'common-variables.scss';

.example {
  color: $font-color; // 使用 $font-color 变量
}
```

### 公共样式类的使用

具体查看文件 [public.scss](public.scss)。

### 公共的过渡效果

具体查看文件 [transition.scss](transition.scss)。
