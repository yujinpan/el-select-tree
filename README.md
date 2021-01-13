# el-select-tree

ElementUI's el-select combined with el-tree.

- Online examples [https://yujinpan.github.io/el-select-tree/](https://yujinpan.github.io/el-select-tree/)

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
          children: [{ value: 5, label: 'text5' }, { value: 6, label: 'text6' }]
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

| name            | type      | description                                                           |
| --------------- | --------- | --------------------------------------------------------------------- |
| `value/v-model` | `*/*[]`   | bound value, the type must be array if attribute's `multiple` is true |
| `multiple`      | `boolean` | multiple selection, default: `false`                                  |
| `placement`     | `string`  | extends ElementUI placement, default: `bottom-start`                  |
| `size`          | `string`  | extends ElementUI size, default: `small`                              |
| `disabled`      | `boolean` | selection disabled, default: `false`                                  |
| `placeholder`   | `string`  | placeholder text, default: '请选择'                                   |
| `clearable`     | `boolean` | cleanup options, default: `false`                                     |
| `popover-width` | `number`  | popover's width                                                       |

#### Extends ElTree

- `data` default: `[]`
- `props` default: `{ value: 'value', label: 'label', children: 'children', disabled: 'disabled', isLeaf: 'isLeaf' }
- `node-key`
- `default-expand-all`
- `check-strictly`
- `lazy`
- `load`
- `icon-class`
- `indent`
- `accordion`
- `filter-node-method`
- `auto-expand-parent`
- `render-content`
- `render-after-expand`

See details: https://element.eleme.io/#/zh-CN/component/tree#attributes

### Events

- `change(value)` options change, return changed value
- `clear()` clear selected
