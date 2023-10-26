<template>
  <div>
    <ElSelectTree
      v-model="value"
      :data="data.slice(0, 1)"
      filterable
      show-checkbox
    ></ElSelectTree>
    <ElSelectTreeVirtual
      v-model="value"
      :data="data"
      show-checkbox
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
        Array(1000)
          .fill('')
          .map((item, index) => ({
            value: index,
            label: index,
            children: Array(500)
              .fill('')
              .map((item, index2) => ({
                value: `${index}-${index2}`,
                label: `${index}-${index2}`,
              })),
          })),
      ),
    };
  },
};
</script>
