<template>
  <div>
    prefix/empty
    <ElSelectTree v-model="value" :data="data">
      <template #prefix>prefix</template>
      <template #empty>empty</template>
    </ElSelectTree>
    header/footer
    <ElSelectTree v-model="value2" :data="data2" multiple show-checkbox>
      <template #header>
        <el-checkbox @change="handleSelectAll">全选</el-checkbox>
      </template>
      <template #footer>
        <el-button size="mini">添加选项</el-button>
      </template>
    </ElSelectTree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      data: [],
      value2: [],
      data2: [
        { value: 1, label: 1 },
        { value: 2, label: 2 },
      ],
    };
  },
  methods: {
    handleSelectAll(val) {
      if (val) {
        this.value2 = this.data2.map((item) => item.value);
      } else {
        this.value2 = [];
      }
    },
  },
};
</script>
