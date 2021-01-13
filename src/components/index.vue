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
      :width="popoverWidth"
      @after-enter="handleScroll()"
    >
      <!-- scrollbar wrap -->
      <el-scrollbar
        wrap-class="el-select-dropdown__wrap"
        view-class="el-select-dropdown__list"
        ref="scrollbar"
      >
        <el-tree
          ref="elTree"
          class="el-select-tree__list"
          :default-expanded-keys="defaultExpandedKeys"
          :show-checkbox="multiple"
          :expand-on-click-node="multiple"
          :style="{ 'min-width': minWidth + 'px' }"
          @node-click="nodeClick"
          @check-change="checkChange"
          :data="data"
          :props="props"
          :node-key="propsValue"
          :default-expand-all="defaultExpandAll"
          :check-strictly="checkStrictly"
          :lazy="lazy"
          :load="load"
          :icon-class="iconClass"
          :indent="indent"
          :accordion="accordion"
          :filter-node-method="filterNodeMethod"
          :auto-expand-parent="autoExpandParent"
          :render-content="renderContent"
          :render-after-expand="renderAfterExpand"
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

      <!-- trigger input -->
      <el-input
        v-model="selectedLabel"
        ref="reference"
        slot="reference"
        readonly
        :validate-event="false"
        :size="size"
        :class="{
          'is-active': visible,
          'is-selected': selectedLabel,
          'is-clearable': clearable
        }"
        :disabled="disabled"
        :placeholder="placeholder"
      >
        <i
          v-if="clearable"
          @click.stop="clear()"
          slot="suffix"
          class="el-input__icon el-input__icon-close el-icon-circle-close"
        ></i>
        <i
          slot="suffix"
          class="el-input__icon el-input__icon-arrow-down el-icon-arrow-down"
        ></i>
      </el-input>
    </el-popover>
  </div>
</template>

<script>
import Vue from 'vue';
import Emitter from 'element-ui/lib/mixins/emitter';
import {
  addResizeListener,
  removeResizeListener
} from 'element-ui/lib/utils/resize-event';

export default {
  name: 'ElSelectTree',
  mixins: [Emitter],
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    // [el-tree] forwarding parameters https://element.eleme.io/#/zh-CN/component/tree#attributes
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    props: {
      type: Object,
      default() {
        return {
          value: 'value',
          label: 'label',
          children: 'children',
          disabled: 'disabled',
          isLeaf: 'isLeaf'
        };
      }
    },
    checkStrictly: Boolean,
    nodeKey: String,
    defaultExpandAll: Boolean,
    lazy: Boolean,
    load: Function,
    iconClass: String,
    indent: Number,
    accordion: Boolean,
    filterNodeMethod: Function,
    autoExpandParent: {
      type: Boolean,
      default: true
    },
    renderContent: Function,
    renderAfterExpand: Boolean,
    // [el-tree] forwarding parameters end

    clearable: Boolean,
    placeholder: {
      type: String,
      default: '请选择'
    },
    placement: {
      type: String,
      default: 'bottom-start'
    },
    size: {
      type: String,
      default: Vue.prototype.$ELEMENT ? Vue.prototype.$ELEMENT.size : ''
    },
    disabled: Boolean,
    multiple: Boolean,
    value: {
      type: [Number, String, Array],
      default: ''
    },
    popoverWidth: Number
  },
  computed: {
    dataLength() {
      return this.data.length;
    },
    propsValue() {
      return this.nodeKey || this.props.value || 'value';
    },
    propsLabel() {
      return this.props.label || 'label';
    },
    propsIsLeaf() {
      return this.props.isLeaf || 'isLeaf';
    },
    defaultExpandedKeys() {
      return Array.isArray(this.value)
        ? this.value
        : this.value || this.value === 0
        ? [this.value]
        : [];
    }
  },
  data() {
    return {
      visible: false,
      selectedLabel: '',
      minWidth: 0
    };
  },
  methods: {
    valueChange(value) {
      this.$emit('change', value);
      // trigger el-form event
      // like validator
      this.dispatch('ElFormItem', 'el.form.change', value);
    },
    clear() {
      this.visible = false;
      if (this.multiple) {
        this.valueChange([]);
        this.$nextTick(() => {
          this.$refs.elTree.setCheckedKeys([]);
        });
      } else {
        this.valueChange('');
      }
      this.$emit('clear');
    },
    // 触发滚动条的重置
    handleScroll() {
      this.$refs.scrollbar && this.$refs.scrollbar.handleScroll();
    },
    nodeClick(data, node, component) {
      const children = data[this.props.children];
      const value = data[this.propsValue];
      if (
        ((children && children.length) ||
          (this.lazy && !data[this.propsIsLeaf])) &&
        !this.checkStrictly
      ) {
        component.handleExpandIconClick();
      } else if (!this.multiple && !data.disabled) {
        if (value !== this.value) {
          this.valueChange(value);
          this.selectedLabel = data[this.propsLabel];
        }
        this.visible = false;
      }
    },
    checkChange() {
      this.valueChange(this.$refs.elTree.getCheckedKeys(!this.checkStrictly));
      this.setMultipleSelectedLabel();
    },
    setSelected() {
      this.$nextTick(() => {
        const elTree = this.$refs.elTree;
        if (this.multiple) {
          elTree.setCheckedKeys(this.value);
          this.setMultipleSelectedLabel();
        } else {
          const selectedNode = elTree.getNode(this.value);
          this.selectedLabel = selectedNode
            ? selectedNode.data[this.propsLabel]
            : '';
        }
      });
    },
    setMultipleSelectedLabel() {
      const elTree = this.$refs.elTree;
      const selectedNodes = elTree.getCheckedNodes(!this.checkStrictly);
      this.selectedLabel = selectedNodes
        .map((item) => item[this.propsLabel])
        .join(',');
    },
    treeItemClass(data) {
      return {
        'is-selected': this.multiple
          ? false
          : data[this.propsValue] === this.value,
        'is-disabled': data.disabled
      };
    },
    handleResize() {
      // set the `tree` default `min-width`
      // border's width is 2px
      this.minWidth = this.$el.clientWidth - 2;
    }
  },
  watch: {
    value() {
      this.setSelected();
    },
    data() {
      this.setSelected();
    }
  },
  created() {
    if (this.multiple && !Array.isArray(this.value)) {
      throw new Error(
        '[el-select-tree] props `value` must be Array if use multiple!'
      );
    }
  },
  mounted() {
    this.setSelected();
    addResizeListener(this.$el, this.handleResize);
  },
  beforeDestroy() {
    if (this.$el && this.handleResize) {
      removeResizeListener(this.$el, this.handleResize);
    }
  }
};
</script>

<style lang="scss">
@import '../styles/common-variables';

.el-select-tree {
  display: inline-block;
  .el-input__icon {
    cursor: pointer;
    transition: transform 0.3s;
    &-close {
      display: none;
    }
  }
  .el-input__inner {
    cursor: pointer;
    padding-right: 30px;
  }
  .el-input {
    &:hover:not(.is-disabled) {
      .el-input__inner {
        border-color: $--input-border-color-hover;
      }
      &.is-selected.is-clearable {
        .el-input__icon {
          &-close {
            display: inline-block;
          }
          &-arrow-down {
            display: none;
          }
        }
      }
    }
    &.is-active {
      .el-input__icon-arrow-down {
        transform: rotate(-180deg);
      }
      .el-input__inner {
        border-color: $--button-primary-border-color;
      }
    }
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

    .el-tree-node__expand-icon.is-leaf {
      cursor: pointer;
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
    position: relative;
    white-space: nowrap;
    padding-right: $spacing-medium;
    &.is-selected {
      color: $--select-option-selected-font-color;
      font-weight: bolder;
    }
    &.is-disabled {
      color: $--font-color-disabled-base;
      cursor: not-allowed;
    }
  }
}
</style>
