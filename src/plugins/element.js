/**
 * 按需加载 element-ui 组件
 * @description
 * [参考官网 - 按需加载](https://element.eleme.cn/#/zh-CN/component/quickstart#an-xu-yin-ru)
 */
import Vue from 'vue';
import { Tree, Popover, Select, Input } from 'element-ui';
import Scrollbar from 'element-ui/lib/scrollbar';

Vue.use(Tree);
Vue.use(Popover);
Vue.use(Select);
Vue.use(Input);
Vue.use(Scrollbar);
