<template>
  <div class="app padding-medium text-center">
    <h2>el-select-tree</h2>
    <p class="text-secondary">author: yujinpan - version: v1.0.0</p>
    <el-divider></el-divider>
    <el-row type="flex">
      <el-col :span="12">
        <h3>1. 单选</h3>
        <pre><code v-html="code1"></code></pre>
      </el-col>
      <el-col class="text-left" :span="12">
        <div class="flex-center-align">
          <label>选择内容：</label>
          <el-select-tree
            width="120px"
            placeholder="请选择内容"
            :data="treeData"
            :disabled-values="disabledValues"
            v-model="value1"
          ></el-select-tree>
          <div class="margin-left-medium">当前值：{{ value1 }}</div>
        </div>
        <el-divider></el-divider>
        <div class="flex-center-align">
          <label>选择内容（禁用）：</label>
          <el-select-tree
            disabled
            :data="treeData"
            :disabled-values="disabledValues"
            v-model="value1"
          ></el-select-tree>
          <div class="margin-left-medium">当前值：{{ value1 }}</div>
        </div>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row type="flex">
      <el-col :span="12">
        <h3>2. 多选</h3>
        <pre><code v-html="code2"></code></pre>
      </el-col>
      <el-col class="text-left" :span="12">
        <div class="flex-center-align">
          <label>选择内容：</label>
          <el-select-tree
            multiple
            :data="treeData"
            :disabled-values="disabledValues"
            v-model="value2"
          ></el-select-tree>
          <div class="margin-left-medium">当前值：{{ value2.join(',') }}</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ElSelectTree from '../src';
import '../src/element-ui';

import { highlight } from './plugins/highlight';

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
      code1: highlight('html', require('./template/example1').example1),
      code2: highlight('html', require('./template/example1').example1),
      value1: '',
      value2: [2],
      treeData: [
        {
          value: 1,
          label: 'text1',
          children: [{ value: 5, label: 'text5' }, { value: 6, label: 'text6' }]
        },
        { value: 2, label: 'text2' },
        { value: 3, label: 'text3' },
        { value: 4, label: 'text5' }
      ],
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
