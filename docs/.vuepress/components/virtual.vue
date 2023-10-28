<template>
  <div>
    <p>Data volume: 500 * 20 * 10 = {{ 500 * 20 * 10 }}</p>
    <label>Normal:</label>
    <ElSelectTreeVirtual v-model="value" :data="data"></ElSelectTreeVirtual>
    &nbsp;&nbsp;
    <label>Filter:</label>
    <ElSelectTreeVirtual
      v-model="value"
      :data="data"
      filterable
    ></ElSelectTreeVirtual>
  </div>
</template>

<script>
import { reactive } from 'vue';

const empty = reactive({});
const banReactive = (obj) => {
  obj.__ob__ = empty.__ob__;
  return obj;
};

export default {
  data() {
    return {
      value: '',
      data: banReactive(
        Array(500)
          .fill('')
          .map((item, index) => ({
            value: index,
            label: index + '',
            children: Array(20)
              .fill('')
              .map((item, index2) => ({
                value: `${index}-${index2}`,
                label: `${index}-${index2}`,
                children: Array(10)
                  .fill('')
                  .map((item, index3) => ({
                    value: `${index}-${index2}-${index3}`,
                    label: `${index}-${index2}-${index3}`,
                  })),
              })),
          })),
      ),
    };
  },
};
</script>
