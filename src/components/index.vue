<template>
  <div class="el-select-tree">
    <el-popover
      ref="elPopover"
      v-model="visible"
      transition="el-zoom-in-top"
      popper-class="el-select-tree__popover"
      trigger="click"
      :disabled="disabled"
      :placement="placement"
      @after-enter="handleScroll()"
    >
      <!-- scrollbar wrap -->
      <el-scrollbar
        v-if="dataLength"
        wrap-class="el-select-dropdown__wrap"
        view-class="el-select-dropdown__list"
        ref="scrollbar"
        :class="{ 'is-empty': dataLength === 0 }"
      >
        <el-tree
          ref="elTree"
          class="el-select-tree__list"
          :props="props"
          :node-key="propsValue"
          :show-checkbox="multiple"
          :expand-on-click-node="multiple"
          :data="data"
          @node-click="nodeClick"
          @check-change="checkChange"
        >
          <div
            class="el-select-tree__item"
            slot-scope="{ data }"
            :class="treeItemClass(data)"
          >
            {{ data[propsLabel] }}
          </div>
        </el-tree>
      </el-scrollbar>

      <!-- empty text -->
      <p class="el-select-tree__empty" v-else>
        无数据
      </p>

      <!-- trigger input -->
      <el-input
        v-model="selectedLabel"
        ref="reference"
        slot="reference"
        readonly
        suffix-icon="el-icon-arrow-down"
        :size="size"
        :class="{ 'is-focus': visible }"
        :disabled="disabled"
        :placeholder="placeholder"
      ></el-input>
    </el-popover>
  </div>
</template>

<script>
import treeFind from 'operation-tree-node/dist/treeFind.esm';
import treeEach from 'operation-tree-node/dist/treeEach.esm';

export default {
  name: 'ElSelectTree',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    placeholder: {
      type: String,
      default: '请选择'
    },
    props: {
      type: Object,
      default() {
        return {
          value: 'value',
          label: 'label',
          children: 'children'
        };
      }
    },
    placement: {
      type: String,
      default: 'bottom-start'
    },
    size: {
      type: String,
      default: 'small'
    },
    popoverMinWidth: {
      type: Number,
      default: 0
    },
    disabled: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    value: {
      type: [Number, String, Array],
      default: ''
    },
    disabledValues: {
      type: Array,
      default() {
        return [];
      }
    },
    data: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {
    dataLength() {
      return this.data.length;
    },
    propsValue() {
      return this.props.value;
    },
    propsLabel() {
      return this.props.label;
    }
  },
  data() {
    return {
      visible: false,
      selectedLabel: ''
    };
  },
  methods: {
    // 触发滚动条的重置
    handleScroll() {
      this.$refs.scrollbar && this.$refs.scrollbar.handleScroll();
    },
    nodeClick(data, node, component) {
      const children = data.children;
      const value = data[this.propsValue];

      if (children && children.length) {
        component.handleExpandIconClick();
      } else if (!this.disabledValues.includes(value) && !this.multiple) {
        if (value !== this.value) {
          this.$emit('change', value);
          this.selectedLabel = data[this.propsLabel];
        }
        this.visible = false;
      }
    },
    checkChange() {
      this.$emit('change', this.$refs.elTree.getCheckedKeys(true));
      this.setSelectedLabel();
    },
    checkSelected(value) {
      if (this.multiple) {
        return this.value.includes(value);
      } else {
        return this.value === value;
      }
    },
    setSelected() {
      this.selectedLabel = '';

      const propsValue = this.propsValue;
      const value = this.value;

      if (String(value).length) {
        if (this.multiple) {
          this.$nextTick(() => {
            this.$refs.elTree.setCheckedKeys(this.value);
            this.setSelectedLabel();
          });
        } else {
          const selectedNode = treeFind(this.data, (node) =>
            this.checkSelected(node[propsValue])
          );
          if (selectedNode) {
            this.selectedLabel = selectedNode[this.propsLabel];
          }
        }
      }
    },
    setTreeDataState() {
      const disabledValues = this.disabledValues;
      const propsValue = this.props.value;
      treeEach(this.data, (node) => {
        node.disabled = disabledValues.includes(node[propsValue]);
      });
    },
    setSelectedLabel() {
      const elTree = this.$refs.elTree;
      const selectedNodes = elTree.getCheckedNodes(true);
      this.selectedLabel = selectedNodes.map((item) => item.label).join(',');
    },
    treeItemClass(data) {
      const value = data[this.propsValue];
      return {
        selected: this.multiple ? false : this.checkSelected(value),
        'is-disabled': this.disabledValues.includes(value)
      };
    }
  },
  watch: {
    value() {
      this.setSelected();
    },
    data() {
      this.setTreeDataState();
    },
    disabledValues() {
      this.setTreeDataState();
    }
  },
  created() {
    if (this.multiple && !Array.isArray(this.value)) {
      console.error(
        '[el-select-tree]:',
        'props `value` must be Array if use multiple!'
      );
    }
    this.setTreeDataState();
  },
  mounted() {
    this.setSelected();
    // set the `popper` default `min-width`
    this.$nextTick(() => {
      const popper = this.$refs.elPopover.$refs.popper;
      let width;
      if (!this.popoverMinWidth) {
        const clientWidth = this.$el.clientWidth;
        if (!clientWidth) {
          console.log(
            '[el-select-warn]:',
            'can not get `width`, please set the `popoverMinWidth`'
          );
        }
        width = clientWidth;
      } else {
        width = this.popoverMinWidth;
      }
      width && (popper.style.minWidth = width + 'px');
    });
  }
};
</script>

<style lang="scss">
@import '../styles/common-variables';

.el-select-tree {
  display: inline-block;
  .el-input:hover {
    .el-input__inner {
      border-color: $--input-border-color-hover;
    }
  }
  .el-input.is-focus {
    .el-input__inner {
      border-color: $--button-primary-border-color;
    }
  }
  .el-input__inner {
    cursor: pointer;
    padding-right: 30px;
  }
  .el-input__icon {
    cursor: pointer;
  }
  &__popover {
    padding: 0 !important;

    // extends el-select-dropdown - start
    border: $--select-dropdown-border !important;
    border-radius: $--border-radius-base !important;
    // extends el-select-dropdown - end

    .popper__arrow {
      left: 35px !important;
    }
  }
  &__list {
    overflow-y: auto;

    // scroll style - start
    &::-webkit-scrollbar-track-piece {
      background: #d3dce6;
    }
    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background: #99a9bf;
    }
    // scroll style - end
  }
  &__item {
    flex: 1;
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: $spacing-base;
    &.selected {
      padding-right: 35px;
      color: $--select-option-selected-font-color;
      font-weight: bolder;
    }
    &.is-disabled {
      color: $--font-color-disabled-base;
      cursor: not-allowed;
    }
  }
  &__empty {
    padding: $--select-dropdown-empty-padding;
    margin: 0;
    text-align: center;
    color: $--select-dropdown-empty-color;
    font-size: $--select-font-size;
  }
}
</style>
