import '@/element-ui.ts';
import 'element-ui/lib/theme-chalk/index.css';

import {
  Form,
  FormItem,
  Button,
  Table,
  TableColumn,
  Loading,
  Link,
} from 'element-ui';
import Vue from 'vue';

import ElTreeSelect from '@/index';

Vue.use(Form);
Vue.use(FormItem);
Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Loading);
Vue.use(Link);
Vue.use(ElTreeSelect);
