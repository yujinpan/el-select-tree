<template>
  <div>
    <ElSelectTree v-model="value" :data="data" check-strictly></ElSelectTree>
    <el-divider direction="vertical"></el-divider>
    use checkbox:
    <ElSelectTree
      v-model="value"
      :data="data"
      check-strictly
      show-checkbox
    ></ElSelectTree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
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
