<template>
  <el-select
    class="el-select-tree"
    ref="select"
    v-model="_value"
    v-bind="this.propsElSelect"
    :filter-method="_filterMethod"
    @visible-change="_visibleChange"
    @remove-tag="$listeners['remove-tag'] || undefined"
    @clear="$listeners['clear'] || undefined"
    @blur="$listeners['blur'] || undefined"
    @focus="$listeners['focus'] || undefined"
  >
    <template #prefix>
      <slot name="prefix"></slot>
    </template>
    <template #empty>
      <slot name="empty"></slot>
    </template>
    <el-tree
      ref="tree"
      v-bind="this.propsElTree"
      :filter-node-method="_filterNodeMethod"
      :node-key="propsMixin.value"
      :default-expanded-keys="_defaultExpandedKeys"
      :render-content="_renderContent"
      @node-click="_nodeClick"
      @check="_check"
    >
    </el-tree>
  </el-select>
</template>

<script lang="ts">
import { Component, Mixins, Ref, Watch } from 'vue-property-decorator';
import { ElSelect } from 'element-ui/types/select';
import { ElTree } from 'element-ui/types/tree';
import {
  ElSelectMixin,
  ElTreeMixin,
  propsPick,
  ElSelectMixinOptions,
  ElTreeMixinOptions,
  toArr,
  isValidArr
} from '@/components/utils';
import { Option } from 'element-ui';

const ElSelectTreeOption = {
  extends: Option,
  methods: {
    // 拦截点击事件，事件移至 node 节点上
    selectOptionClick() {
      // $parent === slot-scope
      // $parent.$parent === el-tree-node
      this.$parent.$parent.handleClick();
    }
  }
};

@Component({
  name: 'ElSelectTree'
})
export default class ElSelectTree extends Mixins(ElSelectMixin, ElTreeMixin) {
  /**
   * @api
   */
  @Ref('select') public select: ElSelect;

  /**
   * @api
   */
  @Ref('tree') public tree: ElTree<any, any>;

  constructor() {
    super();
  }

  private get _value() {
    return this.value;
  }
  private set _value(val) {
    this.$emit('change', val);
  }
  private get values() {
    return toArr(this.value);
  }

  @Watch('value')
  private onValueChange() {
    if (this.showCheckbox) {
      this.$nextTick(() => {
        this.tree.setCheckedKeys(this.values);
      });
    }
  }

  /**
   * expand selected
   * @private
   */
  private get _defaultExpandedKeys() {
    return this.defaultExpandedKeys
      ? this.defaultExpandedKeys.concat(this.values)
      : this.values;
  }

  private get propsElSelect() {
    return propsPick(this.$props, Object.keys(ElSelectMixinOptions.props));
  }
  private get propsElTree() {
    return {
      ...propsPick(this.$props, Object.keys(ElTreeMixinOptions.props)),
      props: this.propsMixin
    };
  }

  private get propsMixin() {
    return {
      value: this.nodeKey || 'value',
      label: 'label',
      children: 'children',
      disabled: 'disabled',
      isLeaf: 'isLeaf',
      ...this.props
    };
  }

  private _renderContent(h, { node, data, store }) {
    const { value, label, disabled } = this.propsMixin;
    return h(
      ElSelectTreeOption,
      {
        props: {
          value: data[value],
          label: data[label],
          disabled: data[disabled]
        }
      },
      this.renderContent
        ? [this.renderContent(h, { node, data, store })]
        : this.$scopedSlots.option
        ? this.$scopedSlots.option({ node, data, store })
        : undefined
    );
  }

  // el-select 的 query 事件转发至 el-tree 中
  private _filterMethod(val = '') {
    this.tree.filter(val);
  }
  private _filterNodeMethod(value, data) {
    if (this.filterMethod) return this.filterMethod(value);
    if (!value) return true;
    return data[this.propsMixin.label]?.includes(value);
  }

  // can not select
  private _nodeClick(data, node, component) {
    if (this.canSelect(node)) {
      if (!data[this.propsMixin.disabled]) {
        const elOptionSlot = component.$children.find(
          (item) => item.$options._componentTag === 'node-content'
        );
        const elOption = elOptionSlot.$children[0];
        elOption.dispatch('ElSelect', 'handleOptionClick', [elOption, true]);
      }
    } else {
      component.handleExpandIconClick();
    }
  }

  // clear filter text when visible change
  private _visibleChange(val) {
    this.$listeners['visible-change'] &&
      (this.$listeners['visible-change'] as Function)(val);

    if (this.filterable && !val) {
      setTimeout(() => {
        this._filterMethod();
      }, 230);
    }
  }

  // set selected when check change
  private _check(data, params) {
    this.$listeners['check'] &&
      (this.$listeners['check'] as Function)(data, params);

    let { checkedKeys, checkedNodes } = params;

    // remove folder node when `checkStrictly` is false
    if (!this.checkStrictly) {
      const { children, value } = this.propsMixin;
      checkedKeys = checkedNodes
        .filter((item) => !isValidArr(item[children]))
        .map((item) => item[value]);
    }

    this._value = this.multiple
      ? [...checkedKeys]
      : checkedKeys.includes(data[this.propsMixin.value])
      ? data[this.propsMixin.value]
      : undefined;
  }

  private canSelect(node) {
    return this.checkStrictly || node[this.propsMixin.isLeaf];
  }
}
</script>

<style lang="scss">
.el-select-tree {
  // fix: checkbox 在展示下拉框时跳动问题
  .el-checkbox__input {
    display: flex;
  }
  .el-select-dropdown__item {
    flex: 1;
    padding: 0 30px 0 0;
    background: transparent !important;
    &.selected:after {
      right: 10px;
    }
  }
}
</style>
