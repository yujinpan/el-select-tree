<template>
  <div>
    use checkbox:
    <ElSelectTreeVirtual
      v-model="value"
      multiple
      :data="data"
      check-strictly
      show-checkbox
    ></ElSelectTreeVirtual>
  </div>
</template>

<script>
export default {
  mounted() {
    const temp = [];
    for (let i = 0; i < 1000; i++) {
      temp.push({
        label: '测试' + i,
        value: i + '',
      });
    }
    this.data.push(...temp);
  },
  methods: {},
  data() {
    return {
      value: '',
      data: [],
    };
  },
};
</script>
