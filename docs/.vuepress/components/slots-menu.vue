<template>
  <ElSelectTree v-model="value" :data="data" multiple show-checkbox>
    <template #header>
      <el-checkbox @change="handleSelectAll">全选</el-checkbox>
    </template>
    <template #footer>
      <el-button @click="handleAddOption" size="mini">添加选项</el-button>
    </template>
  </ElSelectTree>
</template>

<script>
export default {
  data() {
    return {
      value: [],
      data: [
        {
          label: '乌鲁木齐市',
          value: '2',
          children: [
            { label: '达坂城区', value: '7' },
            { label: '头屯河区', value: '8' },
            { label: '乌鲁木齐县', value: '9' },
          ],
        },
      ],
    };
  },
  methods: {
    handleSelectAll(val) {
      if (val) {
        this.value = this.data.flatMap((item) =>
          item.children.map((item) => item.value),
        );
      } else {
        this.value = [];
      }
    },
    handleAddOption() {
      this.data.push({
        value: Date.now(),
        label: 'New Option',
        children: [{ value: Date.now() + 1, label: 'New Option - Child 1' }],
      });
    },
  },
};
</script>
