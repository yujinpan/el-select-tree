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
