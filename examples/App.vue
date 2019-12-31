<template>
  <div class="app padding-medium text-center">
    <h2>el-select-tree</h2>
    <p class="text-secondary">author: yujinpan - version: v{{ version }}</p>
    <el-divider></el-divider>
    <el-row type="flex">
      <el-col :span="12">
        <pre><code v-html="code1"></code></pre>
      </el-col>
      <el-col class="text-left" :span="12">
        <div class="flex-center-align">
          <label>choose：</label>
          <el-select-tree
            :multiple="multiple"
            :placeholder="placeholder"
            :disabled="disabled"
            :popover-min-width="100"
            :data="treeData"
            :props="treeProps"
            :disabled-values="disabledValues"
            :check-strictly="checkStrictly"
            v-model="value1"
          ></el-select-tree>
          <div class="margin-left-medium">current value：{{ value1 }}</div>
        </div>
        <el-divider></el-divider>
        <div class="flex-center-align">
          <label>choose any level：</label>
          <el-switch v-model="checkStrictly"></el-switch>
          <b class="margin-left-medium" v-if="checkStrictly"
            >try to choose parent</b
          >
        </div>
        <el-divider></el-divider>
        <div class="flex-center-align">
          <label>disabled：</label>
          <el-switch v-model="disabled"></el-switch>
        </div>
        <el-divider></el-divider>
        <div class="flex-center-align">
          <label>multiple choose：</label>
          <el-switch v-model="multiple"></el-switch>
        </div>
        <el-divider></el-divider>
        <el-link
          type="primary"
          href="https://github.com/yujinpan/el-select-tree#attributes"
          >more attributes
          look：https://github.com/yujinpan/el-select-tree#attributes</el-link
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ElSelectTree from '../src';
import '../src/element-ui';

import { highlight } from './plugins/highlight';

const version = require('../package').version;

export default {
  components: {
    ElSelectTree
  },
  computed: {
    valueStr() {
      return String(this.value);
    }
  },
  data() {
    return {
      multiple: false,
      placeholder: 'please choose',
      disabled: false,
      checkStrictly: false,
      version,
      code1: highlight('html', require('./template/example1').example1),
      value1: 5,
      treeData: [
        {
          id: 1,
          label1: 'text1',
          children: [
            { id: 5, label1: 'textext1text1text1text1text1t5' },
            { id: 6, label1: 'ttext1text1text1text1text1ext6' }
          ]
        },
        { id: 2, label1: 'text2' },
        { id: 3, label1: 'text3' },
        { id: 4, label1: 'text5' }
      ],
      treeProps: {
        value: 'id',
        children: 'children',
        label: 'label1'
      },
      disabledValues: [3]
    };
  }
};
</script>

<style lang="scss" scoped>
@import './styles/common-variables';

.app {
  .el-col {
    padding: $spacing-medium;
    border-right: $border-base;
    &:last-of-type {
      border-right: 0;
    }
  }
  pre {
    text-align: left;
    border: $border-base;
    border-radius: $border-radius-base;
    background-color: $background-color-base;
    padding: $spacing-medium;
  }
  code {
    font-size: 12px;
    line-height: 1.8;
    font-family: Menlo, Monaco, Consolas, Courier, monospace;
    -webkit-font-smoothing: auto;
  }
}
</style>
