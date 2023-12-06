<template>
  <div>
    <ElSelectTree v-model="value" :data="data" show-checkbox></ElSelectTree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 2,
      data: [
        {
          value: 1,
          label: '1-label',
          children: [{ value: 2, label: '2-label' }],
        },
      ],
    };
  },
  mounted() {
    this.value = 1;
  },
};
</script>
