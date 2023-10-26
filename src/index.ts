// 主组件
import type { PluginObject } from 'vue';

import ElSelectTree from './components/ElSelectTree.vue';
import ElSelectTreeVirtualComponent from './components/ElSelectTreeVirtual.vue';

// Vue.use()
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
ElSelectTree.install = (Vue) => {
  Vue.component('ElSelectTree', ElSelectTree);
};

export const ElSelectTreeVirtual =
  ElSelectTreeVirtualComponent as typeof ElSelectTreeVirtualComponent &
    PluginObject<any>;

ElSelectTreeVirtual.install = (Vue) => {
  Vue.component('ElSelectTreeVirtual', ElSelectTreeVirtual);
};

// Vue.component()
export default ElSelectTree as typeof ElSelectTree & PluginObject<any>;
