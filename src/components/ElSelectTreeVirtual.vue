<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator';

import type { CreateElement, VNodeData } from 'vue';

import ElSelectTree from '@/components/ElSelectTree.vue';
import getElSelectVirtual from '@/components/ElSelectVirtual';
import getElTreeVirtual from '@/components/ElTreeVirtual';
import {
  getParentKeys,
  isValidArr,
  spliceItem,
  toArr,
  treeEach,
  treeFilter,
  treeFind,
} from '@/components/utils';
import { virtualList, VirtualStore } from '@/components/virtual-list';

@Component({
  name: 'ElSelectTreeVirtual',
  directives: {
    virtualList,
  },
})
export default class ElSelectTreeVirtual extends ElSelectTree {
  @Prop({ type: Number, default: 200 }) filterDebounceDuration!: number;

  virtualStore = new VirtualStore({
    expandedKeys: [],
    sourceData: [],
    itemHeight: 26,
    valueProp: 'value',
    childrenProp: 'children',
  });

  @Watch('data', { immediate: true })
  onDataChange() {
    this.virtualStore.setOptions({
      sourceData: this.data,
      valueProp: this.propsMixin.value,
      childrenProp: this.propsMixin.children as string,
    });
  }

  @Watch('_expandedKeys', { immediate: true, deep: true })
  onExpandedKeysChange(val) {
    this.virtualStore.setOptions({
      expandedKeys: val,
    });
  }

  render(h: CreateElement) {
    this.renderValidate();

    return h(getElSelectVirtual(), this._getSelectVNodeData(), [
      ...this.renderSlots(h),
      this.renderCacheOptions(h),
      h(getElTreeVirtual(), this._getTreeVNodeData()),
    ]);
  }

  private virtualExpandedKeys = [];
  private get _expandedKeys() {
    return this.expandedKeys.concat(this.virtualExpandedKeys);
  }

  private _getSelectVNodeData(): VNodeData {
    const data = this.getSelectVNodeData();

    data.directives = [
      {
        name: 'virtualList',
        value: {
          target: '.el-scrollbar__wrap',
          virtualStore: this.virtualStore,
        },
      },
    ];
    data.on = {
      ...data.on,
      'visible-change': (val) => {
        this._visibleChange(val);

        // reset when no selected
        if (val) {
          this.virtualStore.setScrollTop(0);
        }
      },
    };

    return data;
  }

  private _getTreeVNodeData(): VNodeData {
    const data = this.getTreeVNodeData();

    data.props = {
      ...data.props,
      defaultExpandedKeys: this._expandedKeys,
      defaultCheckedKeys: this.values.concat(this.defaultCheckedKeys || []),
    };

    data.props.data = this.virtualStore.data;
    data.props.dataVirtual = this.data;
    Object.assign(data.on, {
      'node-expand': (node, ...args) => {
        const value = this.getValByProp('value', node);
        if (!this.virtualExpandedKeys.includes(value)) {
          this.virtualExpandedKeys.push(value);

          toArr(this.$listeners['node-expand']).forEach((item) =>
            item(node, ...args),
          );
        }
      },
      'node-collapse': (node, ...args) => {
        const value = this.getValByProp('value', node);
        if (this.virtualExpandedKeys.includes(value)) {
          spliceItem(this.virtualExpandedKeys, value);

          const children = this.getValByProp('children', node);
          if (isValidArr(children)) {
            treeEach(
              children,
              (node) => {
                const value = this.getValByProp('value', node);
                if (this.virtualExpandedKeys.includes(value)) {
                  spliceItem(this.virtualExpandedKeys, value);
                }
              },
              (node) => this.getValByProp('children', node),
            );
          }

          toArr(this.$listeners['node-collapse']).forEach((item) =>
            item(node, ...args),
          );
        }
      },
    });

    return data;
  }

  private filterState = { stop: false };
  private debounceTimeId: any;
  protected _filterMethod(val = '') {
    if (this.filterMethod) return this.filterMethod(val);

    this.filterState.stop = true;

    if (this.debounceTimeId) {
      clearTimeout(this.debounceTimeId);
    }

    if (!val) {
      this.virtualExpandedKeys = [];
      return this.virtualStore.setOptions({
        sourceData: this.data,
      });
    }

    this.debounceTimeId = setTimeout(() => {
      treeFilter(
        this.data,
        (node) => this._filterNodeMethod(val, node, node),
        this.propsMixin.children as string,
        (this.filterState = { stop: false }),
      ).then(
        (data) => {
          const firstLeaf = treeFind(
            data,
            (node) => !isValidArr(node.children),
            (node) => this.getValByProp('children', node),
          );
          const firstLeafValue = firstLeaf
            ? this.getValByProp('value', firstLeaf)
            : undefined;
          this.virtualExpandedKeys = firstLeafValue
            ? [
                firstLeafValue,
                ...getParentKeys([firstLeafValue], data, this.getValByProp),
              ]
            : [];
          this.virtualStore.setOptions({
            sourceData: data,
          });
        },
        () => {
          // ignore
        },
      );
    }, this.filterDebounceDuration);
  }
}
</script>
