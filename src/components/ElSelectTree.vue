<template>
  <el-select
    class="el-select-tree"
    ref="select"
    v-model="_value"
    v-bind="this.propsElSelect"
    :filter-method="_filterMethod"
    @visible-change="$listeners['visible-change'] || undefined"
    @remove-tag="$listeners['remove-tag'] || undefined"
    @clear="$listeners['clear'] || undefined"
  >
    <template #prefix>
      <slot name="prefix"></slot>
    </template>
    <template #empty>
      <slot name="empty"></slot>
    </template>
    <el-tree
      ref="tree"
      v-bind="this.propsElTree"
      :filter-node-method="_filterNodeMethod"
      @node-click="_nodeClick"
    >
      <template slot-scope="{ data }">
        <el-option
          :value="data[props.value]"
          :label="data[props.label]"
          :disabled="data[props.disabled]"
        ></el-option>
      </template>
    </el-tree>
  </el-select>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator';
import { ElSelect } from 'element-ui/types/select';
import { ElTree } from 'element-ui/types/tree';
import { ElSelectMixin, ElTreeMixin, propsPick } from '@/components/utils';
import { Option } from 'element-ui';

@Component({
  name: 'ElSelectTree',
  mixins: [ElSelectMixin, ElTreeMixin],
  components: {
    ElOption: {
      extends: Option,
      methods: {
        // 拦截点击事件，事件移至 node 节点上
        selectOptionClick() {
          // $parent === slot-scope
          // $parent.$parent === el-tree-node
          this.$parent.$parent.handleClick();
        }
      }
    }
  }
})
export default class ElSelectTree extends Vue {
  @Ref('select') select: ElSelect;
  @Ref('tree') tree: ElTree<any, any>;

  constructor() {
    super();
  }

  get _value() {
    // @ts-ignore
    return this.value;
  }
  set _value(val) {
    this.$emit('change', val);
  }

  get propsElSelect() {
    return propsPick(this.$props, Object.keys(ElSelectMixin.props));
  }
  get propsElTree() {
    return propsPick(this.$props, Object.keys(ElTreeMixin.props));
  }

  // el-select 的 query 事件转发至 el-tree 中
  _filterMethod(val) {
    this.tree.filter(val);
  }
  _filterNodeMethod(value, data) {
    // @ts-ignore
    if (this.filterMethod) return this.filterMethod(value);
    if (!value) return true;
    return data.label.includes(value);
  }
  _nodeClick(data, node, component) {
    if (this.canSelect(node)) {
      // @ts-ignore
      if (!data[this.props.disabled]) {
        // $children[0] === slot-scope
        // $children[0].$children[0] === el-option
        const elOption = component.$children[0].$children[0];
        elOption.dispatch('ElSelect', 'handleOptionClick', [elOption, true]);
      }
    } else {
      component.handleExpandIconClick();
    }
    // @ts-ignore
    this.nodeClick && this.nodeClick(data, node, component);
  }

  canSelect(node) {
    // @ts-ignore
    return this.checkStrictly || node.isLeaf;
  }
}
</script>

<style lang="scss">
.el-select-tree {
  .el-select-dropdown__item {
    flex: 1;
    padding: 0 30px 0 0;
    background: transparent !important;
    &.selected:after {
      right: 10px;
    }
  }
}
</style>
