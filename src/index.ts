// 主组件
import ElSelectTree from './components/ElSelectTree.vue';

// Vue.use()
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
ElSelectTree.install = (Vue) => {
  Vue.component('ElSelectTree', ElSelectTree);
};

// Vue.component()
export default ElSelectTree;
