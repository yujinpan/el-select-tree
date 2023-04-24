<template>
  <div>
    <ElSelectTree v-model="value" :data="data"></ElSelectTree>
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
};
</script>
