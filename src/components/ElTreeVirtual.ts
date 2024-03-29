import Vue from 'vue';

import getElTreeNodeVirtual from '@/components/ElTreeNodeVirtual';
import { banReactive } from '@/components/utils';

/**
 * create when use
 */
export default function getElTreeVirtual() {
  if (getElTreeVirtual._cache) return getElTreeVirtual._cache;

  const ElTree = Vue.component('ElTree');

  return (getElTreeVirtual._cache = {
    extends: ElTree.options,
    components: {
      ElTreeNode: getElTreeNodeVirtual(),
    },
    props: {
      dataVirtual: Array,
    },
    data() {
      return {
        storeVirtual: null,
      };
    },
    watch: {
      dataVirtual(newVal) {
        this.storeVirtual.setData(newVal);
      },
    },
    methods: {
      setCheckedNodes(nodes, leafOnly) {
        if (!this.nodeKey)
          throw new Error('[Tree] nodeKey is required in setCheckedNodes');
        this.store.setCheckedNodes(nodes, leafOnly);
        this.storeVirtual.setCheckedNodes(nodes, leafOnly);
      },
      setCheckedKeys(keys, leafOnly) {
        if (!this.nodeKey)
          throw new Error('[Tree] nodeKey is required in setCheckedKeys');
        this.store.setCheckedKeys(keys, leafOnly);
        this.storeVirtual.setCheckedKeys(keys, leafOnly);
      },
      setChecked(data, checked, deep) {
        this.store.setChecked(data, checked, deep);
        this.storeVirtual.setChecked(data, checked, deep);
      },
      getCheckedNodes(leafOnly, includeHalfChecked) {
        return this.storeVirtual.getCheckedNodes(leafOnly, includeHalfChecked);
      },
      getCheckedKeys(leafOnly) {
        return this.storeVirtual.getCheckedKeys(leafOnly);
      },
      getHalfCheckedNodes() {
        return this.storeVirtual.getHalfCheckedNodes();
      },
      getHalfCheckedKeys() {
        return this.storeVirtual.getHalfCheckedKeys();
      },
    },
    mounted() {
      const TreeStore = this.store.constructor;

      this.storeVirtual = banReactive(
        new TreeStore({
          ...this.$props,
          key: this.nodeKey,
          data: this.dataVirtual,
        }),
      );
    },
  });
}

getElTreeVirtual._cache = null;
