<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator';

import type { CreateElement, VNodeData } from 'vue';

import ElSelectTree from '@/components/ElSelectTree.vue';
import getElSelectVirtual from '@/components/ElSelectVirtual';
import {
  isValidArr,
  spliceItem,
  toArr,
  treeEach,
  treeFilter,
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
      expandedKeys: this.expandedKeys,
      valueProp: this.propsMixin.value,
      childrenProp: this.propsMixin.children as string,
    });
  }

  @Watch('expandedKeys', { immediate: true, deep: true })
  onExpandedKeysChange() {
    this.virtualStore.setOptions({
      expandedKeys: this.expandedKeys,
    });
  }

  render(h: CreateElement) {
    this.renderValidate();

    return h(getElSelectVirtual(), this._getSelectVNodeData(), [
      ...this.renderSlots(h),
      this.renderCacheOptions(h),
      h('el-tree', this._getTreeVNodeData()),
    ]);
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
      defaultCheckedKeys: this.values.concat(this.defaultCheckedKeys || []),
    };

    data.props.data = this.virtualStore.data;
    Object.assign(data.on, {
      'node-expand': (node, ...args) => {
        const value = this.getValByProp('value', node);
        if (!this.expandedKeys.includes(value)) {
          this.expandedKeys.push(value);

          toArr(this.$listeners['node-expand']).forEach((item) =>
            item(node, ...args),
          );
        }
      },
      'node-collapse': (node, ...args) => {
        const value = this.getValByProp('value', node);
        if (this.expandedKeys.includes(value)) {
          spliceItem(this.expandedKeys, value);

          const children = this.getValByProp('children', node);
          if (isValidArr(children)) {
            treeEach(
              children,
              (node) => {
                const value = this.getValByProp('value', node);
                if (this.expandedKeys.includes(value)) {
                  spliceItem(this.expandedKeys, value);
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

    if (!val) {
      return this.virtualStore.setOptions({
        sourceData: this.data,
      });
    }

    if (this.debounceTimeId) {
      clearTimeout(this.debounceTimeId);
    }
    this.debounceTimeId = setTimeout(() => {
      treeFilter(
        this.data,
        (node) => this._filterNodeMethod(val, node, node),
        this.propsMixin.children as string,
        (this.filterState = { stop: false }),
      ).then(
        (data) => {
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
