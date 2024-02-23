import Vue from 'vue';

/**
 * create when use
 */
export default function getElTreeNodeVirtual() {
  if (getElTreeNodeVirtual._cache) return getElTreeNodeVirtual._cache;

  const ElTreeNode = Vue.component('ElTree').options.components.ElTreeNode;

  return (getElTreeNodeVirtual._cache = {
    name: 'ElTreeNode',
    extends: ElTreeNode,
    methods: {
      handleCheckChange(value, ev) {
        this.node.setChecked(ev.target.checked, !this.tree.checkStrictly);

        // use virtual check

        const storeVirtual = this.tree.storeVirtual;
        const nodeVirtual = storeVirtual.getNode(this.node.key);
        nodeVirtual.setChecked(ev.target.checked, !this.tree.checkStrictly);

        this.$nextTick(() => {
          const checkedNodes = storeVirtual.getCheckedNodes();
          const checkedKeys = checkedNodes.map((item) => item.key);

          const halfCheckedNodes = storeVirtual.getHalfCheckedNodes();
          const halfCheckedKeys = halfCheckedNodes.map((item) => item.key);

          this.tree.$emit('check', this.node.data, {
            checkedNodes,
            checkedKeys,
            halfCheckedNodes,
            halfCheckedKeys,
          });
        });
      },
    },
  });
}

getElTreeNodeVirtual._cache = null;
