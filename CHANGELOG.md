## [2.1.1-beta.16](https://github.com/yujinpan/el-select-tree/compare/v2.1.1-beta.15...v2.1.1-beta.16) (2024-09-30)

### Bug Fixes

- slowly when many items checked ([d8516e7](https://github.com/yujinpan/el-select-tree/commit/d8516e7c6506acb5849f175cf0707a6e30012016))

## [2.1.1-beta.15](https://github.com/yujinpan/el-select-tree/compare/v2.1.1-beta.14...v2.1.1-beta.15) (2024-06-18)

### Bug Fixes

- always focus when use filter ([af87fe0](https://github.com/yujinpan/el-select-tree/commit/af87fe028581b7a91138ef0c80ce38df0caea6eb))
- popper position incorrect when menu display or use filter ([405b457](https://github.com/yujinpan/el-select-tree/commit/405b457984eb5aab000fc16a32219282f20a6417))

### Features

- add uppercase/lowercase matching ([c78b64d](https://github.com/yujinpan/el-select-tree/commit/c78b64d6961758e7e0a4a3baa9e61ac8a098b746))

## [2.1.1-beta.14](https://github.com/yujinpan/el-select-tree/compare/v2.1.1-beta.13...v2.1.1-beta.14) (2024-05-29)

### Features

- add component optional styles, support dark mode ([1dc1ea6](https://github.com/yujinpan/el-select-tree/commit/1dc1ea675db2e742e55f8b260d834c2cc77951cf))

## [2.1.1-beta.13](https://github.com/yujinpan/el-select-tree/compare/v2.1.1-beta.12...v2.1.1-beta.13) (2024-05-28)

### Bug Fixes

- filter data empty when scroll to bottom ([d52a4b6](https://github.com/yujinpan/el-select-tree/commit/d52a4b6622a8bbd86fe670fa7d01e547ed9e4138))

## [2.1.1-beta.12](https://github.com/yujinpan/el-select-tree/compare/v2.1.1-beta.11...v2.1.1-beta.12) (2024-05-17)

### Bug Fixes

- `getParentKeys` does not include multi-level nodes ([c88e722](https://github.com/yujinpan/el-select-tree/commit/c88e72236c0caf236bc2c9b58a80e09f4972a250))

## [2.1.1-beta.11](https://github.com/yujinpan/el-select-tree/compare/v2.1.1-beta.10...v2.1.1-beta.11) (2024-05-14)

### Bug Fixes

- use `Vue.observable` instead of `reactive` (vue2.6) ([7c82ecb](https://github.com/yujinpan/el-select-tree/commit/7c82ecb8f8bc76c81a7801d1cfa4f42c73ad8f66))

## [2.1.1-beta.10](https://github.com/yujinpan/el-select-tree/compare/v2.1.1-beta.9...v2.1.1-beta.10) (2024-04-25)

### Bug Fixes

- checkedKeys sort with selection order ([277dab4](https://github.com/yujinpan/el-select-tree/commit/277dab40d76c05fc712cb658f0e2921ae5e0f133))

# 2.0.3 2021-11-24

## Feature

- add props can resolve callback function type

# 2.0.2 2021-11-23

## Feature

- new document and examples
- add the option `show-checkbox`

## Fix

- read `label` un parsed
- el-select props un merged
- filter text not clear when visible change

# 2.0.1 2021-10-11

## Feature

- add the support with `renderContent` and `#option` slot

## Refactor

- auto expanded with selected
- auto merge props

# 2.0.0 2021-09-29

## Refactor

- development env update to TS
- make full use of the two components and combine them
- better support for almost all attributes of components, like `filterable`, `multiple`

# 1.1.1 2021-01-13

## Feature

- add `popoverWidth` props

## Fix

- popover position update when tree node expanded

## Refactor

- external style-inject and vue-runtime-helpers package

# 1.1.0 2021-01-08

## Remove

- `disabledValues` props removed(use node's disabled props)

## Fix

- lazy load be ignored when data is empty
- cannot selected option when lazy load
- `defaultExpandedKeys` is invalid when value not set
- `autoExpandParent` to default true

# 1.0.26 2020-09-25

## Feature

- add inherited properties from ElTree

## Fix

- disabled values invalid in children

# 1.0.25 2020-09-15

## Fix

- label not change when data to empty

# 1.0.24 2020-08-29

## Fix

- rollup-plugin-vue normalizer not parse https://github.com/vuejs/rollup-plugin-vue/issues/262

# 1.0.23 2020-07-22

## Refactor

- remove props `popover-min-width` and auto compute min-width

## Fix

- min-width needs to subtract the border
- `props.children` is not work with multiple disabled

# 1.0.22 2020-06-01

## Fix

- set selected when options init async and repeat prevent it

# 1.0.21 2020-06-01

## Fix

- add pinter style in expand icon and remove the text flex attribute(unused and width is not auto in ie)

# 1.0.20 2020-05-28

## Fix

- cannot clear in disabled state

# 1.0.19 2020-05-27

## Fix

- import compiled version with ElementUI's `Emitter` mixin
- `check-strictly` does not valid in multiple check

# 1.0.17 2020-05-19

## Fix

- Handle verification timing error on el-form

# 1.0.15 2020-05-13

## Features

- add the `clearable`

## Fix

- fix the motion problem of the arrow icon of the selector

# 1.0.14 2020-01-07

## Features

- add new attr `defaultExpandAll`, control expand all tree node

# 1.0.13 2019-12-31

## Bug Fixes

- `checkStrictly` not work
- tree node child `label` unbind
