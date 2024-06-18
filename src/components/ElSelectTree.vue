<script lang="ts">
import Vue from 'vue';
import { Component, Mixins, Prop, Ref, Watch } from 'vue-property-decorator';

import type { Select as ElSelectType, Tree as ElTreeType } from 'element-ui';
import type { CreateElement, VNodeData } from 'vue';

import type { CacheOption } from '@/components/CacheOption';
import CacheOptions from '@/components/CacheOption';
import getElSelect from '@/components/ElSelect';
import getElSelectTreeOption from '@/components/ElSelectTreeOption';
import type { Obj } from '@/components/utils';
import {
  ElSelectMixin,
  ElTreeMixin,
  propsPick,
  ElSelectMixinOptions,
  ElTreeMixinOptions,
  toArr,
  isValidArr,
  getParentKeys,
  treeEach,
  compareArrayChanges,
  getCompoundVal,
  isValidValue,
  treeFind,
} from '@/components/utils';

@Component({
  name: 'ElSelectTree',
})
export default class ElSelectTree extends Mixins(ElSelectMixin, ElTreeMixin) {
  @Prop({ type: Array, default: () => [] }) cacheData!: Obj[];

  @Ref('select') public select: ElSelectType;
  @Ref('tree') public tree: ElTreeType<any, any>;

  render(h: CreateElement) {
    this.renderValidate();

    return h(getElSelect(), this.getSelectVNodeData(), [
      ...this.renderSlots(h),
      this.renderCacheOptions(h),
      h('el-tree', this.getTreeVNodeData()),
    ]);
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
        'insertAfter',
      ].forEach((item) => {
        this[item] = this.tree[item];
      });
    });

    this.updateCheckbox();
  }

  protected getSelectVNodeData(): VNodeData {
    return {
      ref: 'select',
      props: {
        ...this.propsElSelect,
        value: this.privateValue,
        popperClass: `el-select-tree__popper ${
          this.propsElSelect.popperClass || ''
        }`,
        filterMethod: this._filterMethod,
      },
      on: {
        ...this.$listeners,
        change: (val) => {
          this.privateValue = val;
        },
        'visible-change': this._visibleChange,
      },
    };
  }

  protected getTreeVNodeData(): VNodeData {
    return {
      ref: 'tree',
      props: {
        ...this.propsElTree,
        expandOnClickNode: !this.checkStrictly && this.expandOnClickNode,
        filterNodeMethod: this._filterNodeMethod,
        nodeKey: this.propsMixin.value,
        defaultExpandedKeys: this.expandedKeys,
        renderContent: this._renderContent,
      },
      on: {
        ...this.$listeners,
        'node-click': this._nodeClick,
        check: this._check,
      },
      nativeOn: {
        transitionend: (e: TransitionEvent) => {
          if (e.propertyName === 'height') {
            this.updatePopper();
          }
        },
      },
    };
  }

  protected renderCacheOptions(h: CreateElement) {
    return h(CacheOptions, {
      props: { data: this.cacheOptions, values: this.values },
    });
  }

  protected renderSlots(h: CreateElement) {
    const slots = [];
    ['prefix', 'empty', 'header', 'footer'].forEach((key) => {
      if (this.$scopedSlots[key]) {
        slots.push(h('template', { slot: key }, this.$scopedSlots[key](this)));
      }
    });
    return slots;
  }

  protected renderValidate() {
    if (
      !Vue.component('ElSelect') ||
      !Vue.component('ElTree') ||
      !Vue.component('ElOption')
    ) {
      throw new Error(`[ElSelectTree]: ElSelect/ElTree/ElOption unregistered.`);
    }
  }

  private get cacheOptions() {
    if (!this.renderAfterExpand && !this.lazy) return [];

    const options: CacheOption[] = [];

    treeEach(
      this.data.concat(this.cacheData),
      (node) => {
        const value = this.getValByProp('value', node);
        options.push({
          value,
          currentLabel: this.getValByProp('label', node),
          isDisabled: this.getValByProp('disabled', node),
        });
      },
      (data) => this.getValByProp('children', data),
    );

    return options;
  }

  private get cacheOptionsMap() {
    const result = {};
    this.cacheOptions.forEach((item) => (result[item.value] = item));
    return result;
  }

  protected get values() {
    return toArr(this.value);
  }

  get privateValue() {
    return this.value;
  }
  set privateValue(val) {
    this.$emit('change', val);
  }

  @Watch('data')
  @Watch('value')
  private async updateCheckbox() {
    if (this.showCheckbox) {
      await this.$nextTick();

      const { add, remove } = compareArrayChanges(
        this.tree.getCheckedKeys(!this.checkStrictly),
        this.values,
      );
      add.forEach((item) => {
        this.tree.setChecked(item, true, false);
      });
      remove.forEach((item) => {
        this.tree.setChecked(item, false, false);
      });
    }
  }

  // Expand the parent node of the selected node by default,
  // "default" is the value/data/defaultExpandedKeys
  // changed from user assign value, rather than current component
  protected expandedKeys = [];
  @Watch('data')
  @Watch('defaultExpandedKeys', { immediate: true })
  _updateDefaultExpandedKeys() {
    const parentKeys =
      isValidArr(this.values) && isValidArr(this.data)
        ? getParentKeys(this.values, this.data, this.getValByProp)
        : [];
    return (this.expandedKeys = this.defaultExpandedKeys
      ? this.defaultExpandedKeys.concat(parentKeys)
      : parentKeys);
  }

  private get propsElSelect() {
    return propsPick(this.$props, Object.keys(ElSelectMixinOptions.props));
  }
  private get propsElTree() {
    return {
      ...propsPick(this.$props, Object.keys(ElTreeMixinOptions.props)),
      props: this.propsMixin,
    };
  }

  /**
   * 禁止直接引用，通过 getValByProp 获取节点值
   */
  protected get propsMixin(): Record<
    'value' | 'label' | 'children' | 'disabled' | 'isLeaf',
    string | ((data: Obj, node?: Obj) => any)
  > {
    return {
      value: this.nodeKey || 'value',
      label: 'label',
      children: 'children',
      disabled: 'disabled',
      isLeaf: 'isLeaf',
      ...this.props,
    };
  }

  /**
   * 获取节点的 prop 对应的值
   */
  protected getValByProp(
    prop: 'value' | 'label' | 'children' | 'disabled' | 'isLeaf',
    data: Obj,
  ) {
    const propVal = this.propsMixin[prop];
    return getCompoundVal(
      data,
      propVal,
      this.tree?.getNode(getCompoundVal(data, this.propsMixin.value)),
    );
  }

  private _renderContent(h, { node, data, store }) {
    return h(
      getElSelectTreeOption(),
      {
        props: {
          value: this.getValByProp('value', data),
          label: this.getValByProp('label', data),
          disabled: this.getValByProp('disabled', data),
        },
      },
      this.renderContent
        ? [this.renderContent(h, { node, data, store })]
        : this.$scopedSlots.default
          ? this.$scopedSlots.default({ node, data, store })
          : undefined,
    );
  }

  // el-select 的 query 事件转发至 el-tree 中
  protected _filterMethod(val = '') {
    this.filterMethod?.(val);

    // fix: `tree` reference is empty when component destroy
    // https://github.com/yujinpan/el-select-tree/issues/35
    this.$nextTick(() => {
      this.tree && this.tree.filter(val);
      this.updatePopper();
    });
  }
  protected _filterNodeMethod(value, data, node) {
    // fix: https://github.com/yujinpan/el-select-tree/issues/35
    if (this.filterMethod) return this.filterMethod(value, data, node);
    if (this.filterNodeMethod) return this.filterNodeMethod(value, data, node);
    if (!value) return true;
    return this.getValByProp('label', data)
      ?.toString()
      .toLowerCase()
      .includes(value.toLowerCase());
  }

  // can not select
  private _nodeClick(data, node, component) {
    (this.$listeners['node-click'] as Function)?.(...arguments);

    // `onCheck` is trigger when `checkOnClickNode`
    if (this.showCheckbox && this.checkOnClickNode) return;

    // now `checkOnClickNode` is false, only no checkbox and `checkStrictly` or `isLeaf`
    if (!this.showCheckbox && this.canSelect(node)) {
      if (!this.getValByProp('disabled', data)) {
        const elOptionSlot = component.$children.find(
          (item) => item.$options._componentTag === 'node-content',
        );
        const elOption = elOptionSlot.$children[0];
        elOption.dispatch('ElSelect', 'handleOptionClick', [elOption, true]);
      }
    } else if (this.expandOnClickNode) {
      component.handleExpandIconClick();
    }

    this.focusInput();
  }

  // clear filter text when visible change
  protected _visibleChange(val) {
    (this.$listeners['visible-change'] as Function)?.(...arguments);

    if (this.filterable && val) {
      this._filterMethod();
    }
  }

  protected updatePopper() {
    this.$nextTick(() => {
      this.select?.broadcast('ElSelectDropdown', 'updatePopper');
    });
  }

  // set selected when check change
  private async _check(data, params) {
    // ignore when no checkbox, like only `checkOnClickNode` is true
    if (!this.showCheckbox) return;

    const dataValue = this.getValByProp('value', data);

    // fix: checkedKeys sort with selection order
    const index = params.checkedKeys.indexOf(dataValue);
    if (index !== -1) {
      params.checkedKeys.splice(index, 1);
      params.checkedKeys.push(dataValue);
    }

    // fix: checkedKeys has not cached keys
    const uncachedCheckedKeys = params.checkedKeys;
    const cachedKeys = this.multiple
      ? this.values.filter(
          (item) =>
            item in this.cacheOptionsMap &&
            !this.tree.getNode(item) &&
            !uncachedCheckedKeys.includes(item),
        )
      : [];
    const checkedKeys = uncachedCheckedKeys.concat(cachedKeys);

    if (this.checkStrictly) {
      // Checking for changes may come from `check-on-node-click`
      this.privateValue = this.multiple
        ? checkedKeys
        : checkedKeys.includes(dataValue)
          ? dataValue
          : undefined;
    }
    // only can select leaf node
    else {
      if (this.multiple) {
        this.privateValue = params.checkedKeys;
      } else {
        // select first leaf node when check parent
        const firstLeaf = treeFind(
          [data],
          (data) =>
            !isValidArr(this.getValByProp('children', data)) &&
            !this.getValByProp('disabled', data),
          (data) => this.getValByProp('children', data),
        );
        const firstLeafKey = firstLeaf
          ? this.getValByProp('value', firstLeaf)
          : undefined;

        // unselect when any child checked
        const hasCheckedChild =
          isValidValue(this.value) &&
          !!treeFind(
            [data],
            (data) => this.getValByProp('value', data) === this.value,
            (data) => this.getValByProp('children', data),
          );

        this.privateValue =
          firstLeafKey === this.value || hasCheckedChild
            ? undefined
            : firstLeafKey;
      }
    }

    await this.updateCheckbox();

    this.$listeners.check?.(data, {
      checkedKeys: this.tree.getCheckedKeys(),
      checkedNodes: this.tree.getCheckedNodes(),
      halfCheckedKeys: this.tree.getHalfCheckedKeys(),
      halfCheckedNodes: this.tree.getHalfCheckedNodes(),
    });

    this.focusInput();
  }

  private canSelect(data) {
    return this.checkStrictly || this.getValByProp('isLeaf', data);
  }

  protected focusInput() {
    if (this.filterable) {
      setTimeout(() => this.select?.$refs.input?.focus());
    }
  }
}
</script>

<style lang="scss">
@import './style.scss';
</style>
