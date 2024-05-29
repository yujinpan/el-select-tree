import '@/element-ui';
import {
  Form,
  FormItem,
  Button,
  Table,
  TableColumn,
  Loading,
  Link,
  Divider,
  Checkbox,
} from 'element-ui';

import type { EnhanceAppContext } from 'vitepress';

import ElSelectTree, { ElSelectTreeVirtual } from '@/index';
import '@/style.scss';
import 'element-ui/packages/theme-chalk/src/button.scss';
import 'element-ui/packages/theme-chalk/src/divider.scss';

export default (ctx: EnhanceAppContext) => {
  const { app: Vue } = ctx;

  Vue.use(Form);
  Vue.use(FormItem);
  Vue.use(Button);
  Vue.use(Table);
  Vue.use(TableColumn);
  Vue.use(Loading);
  Vue.use(Link);
  Vue.use(ElSelectTree);
  Vue.use(ElSelectTreeVirtual);
  Vue.use(Divider);
  Vue.use(Checkbox);
};
