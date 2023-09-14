import Vue from 'vue';

/**
 * create when use
 */
export default function getElSelectTreeOption() {
  if (getElSelectTreeOption._cache) return getElSelectTreeOption._cache;

  return (getElSelectTreeOption._cache = {
    extends: Vue.component('ElOption'),
    methods: {
      // 拦截点击事件，事件移至 node 节点上
      selectOptionClick() {
        // $parent === slot-scope
        // $parent.$parent === el-tree-node
        this.$parent.$parent.handleClick();
      },
    },
  });
}

getElSelectTreeOption._cache = null;
