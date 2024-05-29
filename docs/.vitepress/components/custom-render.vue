<template>
  <ElSelectTree
    v-model="value"
    :data="data"
    :render-content="
      (h, { data, node }) => [h('i', { class: 'el-icon-document' }), data.label]
    "
  ></ElSelectTree>
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
