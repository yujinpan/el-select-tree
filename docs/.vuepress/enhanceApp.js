import '../../lib/element-ui';
import {
  Form,
  FormItem,
  Button,
  Table,
  TableColumn,
  Loading,
  Link,
  Divider,
} from 'element-ui';

import ElSelectTree, { ElSelectTreeVirtual } from '../../lib/index';
import 'element-ui/lib/theme-chalk/index.css';

export default (ctx) => {
  const { Vue } = ctx;

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
};
