# el-select-tree

ElementUI's el-select combined with el-tree.

- Online examples [https://yujinpan.github.io/el-select-tree/](https://yujinpan.github.io/el-select-tree/)

> Now the new version 2.0 is released, which comprehensively improves the utilization of the original components.

## Usage

### Install

```
npm install --save el-select-tree
```

### Require element-ui

If your project does not use element-ui,
you need to introduce a separate element-ui package, like this:

```js
import 'el-select-tree/lib/element-ui';
```

### Global registration

```js
import Vue from 'vue';
import ElSelectTree from 'el-select-tree';

Vue.use(ElSelectTree);
```

### In-component registration

```js
import ElSelectTree from 'el-select-tree';

export default {
  components: {
    ElSelectTree
  }
};
```

### Complete example

```vue
<template>
  <el-select-tree
    width="120px"
    placeholder="请选择内容"
    :data="treeData"
    v-model="value"
  ></el-select-tree>
</template>

<script>
import ElSelectTree from 'el-select-tree';

export default {
  components: {
    ElSelectTree
  },
  data() {
    return {
      value: 2,
      treeData: [
        {
          value: 1,
          label: 'text1',
          children: [
            { value: 5, label: 'text5' },
            { value: 6, label: 'text6' }
          ]
        },
        { value: 2, label: 'text2' },
        { value: 3, label: 'text3' },
        { value: 4, label: 'text5' }
      ]
    };
  }
};
</script>
```

## Component API

**Extends `ElTree` And `ElSelect` All Props/Methods/Events/Slots.**

| props                                                                            | methods                                                                | events                                                                       | slots                                                                       |
| -------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| [el-select](https://element.eleme.io/#/zh-CN/component/select#select-attributes) | [el-select](https://element.eleme.io/#/zh-CN/component/select#methods) | [el-select](https://element.eleme.io/#/zh-CN/component/select#select-events) | [el-select](https://element.eleme.io/#/zh-CN/component/select#select-slots) |
| [el-tree](https://element.eleme.io/#/zh-CN/component/tree#attributes)            | [el-tree](https://element.eleme.io/#/zh-CN/component/tree#fang-fa)     | [el-tree](https://element.eleme.io/#/zh-CN/component/tree#events)            | [el-tree](https://element.eleme.io/#/zh-CN/component/tree#scoped-slot)      |

# Special Thanks

Special thanks to [JetBrains](https://www.jetbrains.com/?from=el-table-infinite-scroll)
for letting me use the free license.

![JetBrains](./jetbrains.svg)
