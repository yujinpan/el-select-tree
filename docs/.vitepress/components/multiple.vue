<template>
  <div>
    <ElSelectTree v-model="values" :data="data" multiple></ElSelectTree>
    <el-divider direction="vertical"></el-divider>
    use checkbox and filterable:
    <ElSelectTree
      v-model="values"
      :data="data"
      filterable
      multiple
      show-checkbox
    ></ElSelectTree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      values: [],
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
};
</script>
