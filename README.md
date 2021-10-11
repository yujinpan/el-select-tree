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

### Attributes

| name            | type     | description                                                           |
| --------------- | -------- | --------------------------------------------------------------------- |
| `value/v-model` | `*/*[]`  | bound value, the type must be array if attribute's `multiple` is true |
| `props`         | `Object` | {value, label, children, isLeaf, disabled}                            |

**Extends `ElTree` And `ElSelect` All Props.**

See details:

- el-tree https://element.eleme.io/#/zh-CN/component/tree
- el-select https://element.eleme.io/#/zh-CN/component/select

### Events

**Support `ElSelect` events `change`, `visible-change`, `remove-tag`, `clear`.**

See details:

https://element.eleme.io/#/zh-CN/component/select#select-events

### Slots

- https://element.eleme.io/#/zh-CN/component/select#select-slots
- `option` select-option slot

```vue
<template>
  <el-select-tree>
    <span slot="option" slot-scope="{ node, data }">{{ data.label }}</span>
  </el-select-tree>
</template>
```
