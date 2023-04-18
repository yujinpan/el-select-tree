<template>
  <div>
    <ElSelectTree v-model="value" :data="data"></ElSelectTree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      data: Array(100)
        .fill('')
        .map((item, index) => ({
          value: index,
          label: index,
          children: Array(100)
            .fill('')
            .map((item, index2) => ({
              value: `${index}-${index2}`,
              label: `${index}-${index2}`,
            })),
        })),
    };
  },
};
</script>
