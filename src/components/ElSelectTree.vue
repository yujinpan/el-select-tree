<template>
  <el-select
    class="el-select-tree"
    ref="select"
    :popper-class="
      'el-select-tree__popper' +
        (propsElSelect.popperClass ? ` ${propsElSelect.popperClass}` : '')
    "
    v-model="_value"
    v-bind="propsElSelect"
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
      v-bind="propsElTree"
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
  isValidArr,
  Obj
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

  /**
   * 禁止直接引用，通过 getValByProp 获取节点值
   */
  private get propsMixin(): Record<
    'value' | 'label' | 'children' | 'disabled' | 'isLeaf',
    string | ((data: Obj, node?: Obj) => any)
  > {
    return {
      value: this.nodeKey || 'value',
      label: 'label',
      children: 'children',
      disabled: 'disabled',
      isLeaf: 'isLeaf',
      ...this.props
    };
  }

  /**
   * 获取节点的 prop 对应的值
   */
  private getValByProp(
    prop: 'value' | 'label' | 'children' | 'disabled' | 'isLeaf',
    data: Obj
  ) {
    const propVal = this.propsMixin[prop];
    if (propVal instanceof Function) {
      return propVal(
        data,
        this.tree?.getNode(this.getValByProp('value', data))
      );
    } else {
      return data[propVal];
    }
  }

  private _renderContent(h, { node, data, store }) {
    return h(
      ElSelectTreeOption,
      {
        props: {
          value: this.getValByProp('value', data),
          label: this.getValByProp('label', data),
          disabled: this.getValByProp('disabled', data)
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
    // fix: `tree` reference is empty when component destroy
    // https://github.com/yujinpan/el-select-tree/issues/35
    this.tree && this.tree.filter(val);
  }
  private _filterNodeMethod(value, data, node) {
    // fix: https://github.com/yujinpan/el-select-tree/issues/35
    if (this.filterMethod) return this.filterMethod(value, data, node);
    if (!value) return true;
    return this.getValByProp('label', data)?.includes(value);
  }

  // can not select
  private _nodeClick(data, node, component) {
    if (this.canSelect(node)) {
      if (!this.getValByProp('disabled', data)) {
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
      checkedKeys = checkedNodes
        .filter((item) => !isValidArr(this.getValByProp('children', item)))
        .map((item) => this.getValByProp('value', item));
    }

    this._value = this.multiple
      ? [...checkedKeys]
      : checkedKeys.includes(this.getValByProp('value', data))
      ? this.getValByProp('value', data)
      : undefined;
  }

  private canSelect(data) {
    return this.checkStrictly || this.getValByProp('isLeaf', data);
  }
}
</script>

<style lang="scss">
.el-select-tree {
  &__popper {
    // fix: checkbox 在展示下拉框时跳动问题
    .el-checkbox__input {
      display: flex;
    }

    .el-select-dropdown__item {
      flex: 1;
      padding: 0 30px 0 0;
      background: transparent !important;

      // fix: 节点展开时 popper 底部抖动问题
      // https://github.com/yujinpan/el-select-tree/pull/33
      height: 20px;
      line-height: 20px;

      &.selected:after {
        right: 10px;
      }
    }
  }
}
</style>
