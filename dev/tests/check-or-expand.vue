<template>
  <div>
    check-on-click-node=true:
    <ElSelectTree
      v-model="value"
      :data="data"
      show-checkbox
      check-on-click-node
    ></ElSelectTree>
    expand-on-click-node=false:
    <ElSelectTree
      v-model="value"
      show-checkbox
      :data="data"
      :expand-on-click-node="false"
    ></ElSelectTree>
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
