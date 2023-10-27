<script lang="ts">
import { Component, Watch } from 'vue-property-decorator';

import type { CreateElement, VNodeData } from 'vue';

import ElSelectTree from '@/components/ElSelectTree.vue';
import { isValidArr, toArr, treeFilter } from '@/components/utils';
import { virtualList, VirtualStore } from '@/components/virtual-list';

@Component({
  name: 'ElSelectTreeVirtual',
  directives: {
    virtualList,
  },
})
export default class ElSelectTreeVirtual extends ElSelectTree {
  virtualStore = new VirtualStore({
    sourceData: [],
    itemHeight: 26,
    childrenProp: 'children',
  });

  @Watch('data')
  onDataChange(val) {
    this.virtualStore.setOptions({
      sourceData: val,
      childrenProp: this.propsMixin.children as string,
    });
  }

  render(h: CreateElement) {
    this.renderValidate();

    return h('el-select', this._getSelectVNodeData(), [
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
        if (val && !isValidArr(this.values)) {
          this.virtualStore.updateScroll(0);
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
        this.virtualStore.updateNodeExpanded(node, true);
        this._defaultExpandedKeys.push(this.getValByProp('value', node));

        toArr(this.$listeners['node-expand']).forEach((item) =>
          item(node, ...args),
        );
      },
      'node-collapse': (node, ...args) => {
        this.virtualStore.updateNodeExpanded(node, false);
        const value = this.getValByProp('value', node);
        this._defaultExpandedKeys.splice(
          this._defaultExpandedKeys.indexOf(value),
          1,
        );

        toArr(this.$listeners['node-collapse']).forEach((item) =>
          item(node, ...args),
        );
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
    }, 200);
  }
}
</script>
