// 主组件
import ElSelectTree from './components/index';

// Vue.use()
ElSelectTree.install = (Vue) => {
  Vue.component('ElSelectTree', ElSelectTree);
};

// Vue.component()
export default ElSelectTree;
