import Vue from 'vue';
// @ts-ignore
import App from './App.vue';

import './plugins/element';
import './plugins/highlight';
import './styles/index.scss';

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  render: (h) => h(App)
});
