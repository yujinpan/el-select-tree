<script lang="ts">
import { CreateElement } from 'vue';
import { Component, Mixins, Ref, Watch } from 'vue-property-decorator';
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
import ElOption from 'element-ui/lib/option';
import ElSelect from 'element-ui/lib/select';
import ElTree from 'element-ui/lib/tree';

const ElSelectTreeOption = {
  extends: ElOption,
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
  @Ref('select') public select: ElSelect;
  @Ref('tree') public tree: ElTree<any, any>;

  render(h: CreateElement) {
    const slots = [];
    this.$slots.prefix &&
      slots.push(h('template', { slot: 'prefix' }, this.$slots.prefix));
    this.$slots.empty &&
      slots.push(h('template', { slot: 'empty' }, this.$slots.empty));
    return h(
      ElSelect,
      {
        ref: 'select',
        props: {
          ...this.propsElSelect,
          value: this._value,
          popperClass: `el-select-tree__popper ${this.propsElSelect
            .popperClass || ''}`,
          filterMethod: this._filterMethod
        },
        on: {
          ...this.$listeners,
          change: (val) => {
            this._value = val;
            (this.$listeners['change'] as Function)?.(val);
          },
          'visible-change': this._visibleChange
        }
      },
      [
        ...slots,
        h(ElTree, {
          ref: 'tree',
          props: {
            ...this.propsElTree,
            expandOnClickNode: !this.checkStrictly,
            filterNodeMethod: this._filterNodeMethod,
            nodeKey: this.propsMixin.value,
            defaultExpandedKeys: this._defaultExpandedKeys,
            renderContent: this._renderContent
          },
          on: {
            ...this.$listeners,
            'node-click': this._nodeClick,
            check: this._check
          }
        })
      ]
    );
  }

  mounted() {
    // get ElTree/ElSelect all methods
    this.$nextTick(() => {
      ['focus', 'blur'].forEach((item) => {
        this[item] = this.select[item];
      });
      [
        'filter',
        'updateKeyChildren',
        'getCheckedNodes',
        'setCheckedNodes',
        'getCheckedKeys',
        'setCheckedKeys',
        'setChecked',
        'getHalfCheckedNodes',
        'getHalfCheckedKeys',
        'getCurrentKey',
        'getCurrentNode',
        'setCurrentKey',
        'setCurrentNode',
        'getNode',
        'remove',
        'append',
        'insertBefore',
        'insertAfter'
      ].forEach((item) => {
        this[item] = this.tree[item];
      });
    });
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
    const parentKeys = this.tree
      ? this.values
          .map((item) => this.tree.getNode(item)?.parent?.key)
          .filter((item) => !!item)
      : this.values;
    return this.defaultExpandedKeys
      ? this.defaultExpandedKeys.concat(parentKeys)
      : parentKeys;
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
        : this.$scopedSlots.default
        ? this.$scopedSlots.default({ node, data, store })
        : undefined
    );
  }

  // el-select 的 query 事件转发至 el-tree 中
  private _filterMethod(val = '') {
    this.filterMethod?.(val);

    // fix: `tree` reference is empty when component destroy
    // https://github.com/yujinpan/el-select-tree/issues/35
    this.$nextTick(() => {
      this.tree && this.tree.filter(val);
    });
  }
  private _filterNodeMethod(value, data, node) {
    // fix: https://github.com/yujinpan/el-select-tree/issues/35
    if (this.filterMethod) return this.filterMethod(value, data, node);
    if (!value) return true;
    return this.getValByProp('label', data)?.includes(value);
  }

  // can not select
  private _nodeClick(data, node, component) {
    (this.$listeners.nodeClick as Function)?.(...arguments);

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
    (this.$listeners['visible-change'] as Function)?.(...arguments);

    if (this.filterable && val) {
      this._filterMethod();
    }
  }

  // set selected when check change
  private _check(data, params) {
    (this.$listeners['check'] as Function)?.(...arguments);

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
