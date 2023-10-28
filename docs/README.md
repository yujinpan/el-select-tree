# el-select-tree

ElementUI's el-select combined with el-tree.

> Now the new version 2.0 is released, which comprehensively improves the utilization of the original components.

## Installation

```shell
npm install --save el-select-tree
```

```ts
import Vue from "vue";
import ElSelectTree from "el-select-tree";

Vue.use(ElSelectTree);
```

> If your project does not depend on element-ui, you need to introduce additional component packages.
>
> ```ts
> import "el-select-tree/lib/element-ui";
> // If the project is loaded on demand, modify babel.config.js according to the official configuration.
> // The complete style file is imported here.
> // https://element.eleme.io/#/zh-CN/component/quickstart#an-xu-yin-ru
> import "element-ui/lib/theme-chalk/index.css";
> ```

## Usage

### `check-strictly`

Any node can be selected, and the normal mode can only select leaf nodes.

<demo name="check-strictly" />

### `filterable`

Support for filtering tree nodes.

<demo name="filterable" />

### `multiple`

Multiple selection.

<demo name="multiple" />

### `props`

Custom tree data props.

<demo name="custom-props" />

### `lazy-load`

Lazy load tree nodes.

<demo name="lazy-load" />

### `lazy-load-cache-data`

Use cached data to display unloaded node names.

<demo name="lazy-load-cache-data" />

### `slot`

Custom option content.

<demo name="custom-slot" />

### `render`

Custom option content use `render`.

<demo name="custom-render" />

### `with-form`

Use with `el-form`.

<demo name="with-form" />

### `virtual` <Badge text="Experimental" type="warning"/>

Use virtual list. `ElSelectTreeVirtual` is optional, need register first.

```ts
import { ElSelectTreeVirtual } from "el-select-tree";

export default {
  components: {
    ElSelectTreeVirtual,
  },
};
```

<ClientOnly>
<demo name="virtual" />
</ClientOnly>

:::warning
Use `banReactive` when the amount of data is large. Otherwise, performance will be slower.

```ts
const empty = reactive({});
const banReactive = (obj) => {
  // skip vue reactive
  obj.__ob__ = empty.__ob__;
  return obj;
};

export default {
  data() {
    return {
      data: banReactive(
        Array(100000)
          .fill("")
          .map((item, index) => ({ value: index, label: index + "" }))
      ),
    };
  },
};
```

:::

## Props

`el-select-tree` inherits `el-tree` and `el-select` all props/methods/events/slots.

So no repeat here.

| props                                                                            | methods                                                                | events                                                                       | slots                                                                       |
| -------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| [el-select](https://element.eleme.io/#/zh-CN/component/select#select-attributes) | [el-select](https://element.eleme.io/#/zh-CN/component/select#methods) | [el-select](https://element.eleme.io/#/zh-CN/component/select#select-events) | [el-select](https://element.eleme.io/#/zh-CN/component/select#select-slots) |
| [el-tree](https://element.eleme.io/#/zh-CN/component/tree#attributes)            | [el-tree](https://element.eleme.io/#/zh-CN/component/tree#fang-fa)     | [el-tree](https://element.eleme.io/#/zh-CN/component/tree#events)            | [el-tree](https://element.eleme.io/#/zh-CN/component/tree#scoped-slot)      |

## Own Props

| Name       | Type  | Desc                                                                                        |
| ---------- | ----- | ------------------------------------------------------------------------------------------- |
| cache-data | Array | The cache data for lazy load tree nodes, it can resolved correct label with unloaded nodes. |
