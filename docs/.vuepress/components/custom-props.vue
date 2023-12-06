<template>
  <ElSelectTree
    v-model="value"
    :data="data"
    :props="{
      value: 'id',
      label: (data) => data.name,
      children: 'child',
    }"
  ></ElSelectTree>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      data: [
        {
          id: 1,
          name: 1,
          child: [{ id: 2, name: 2 }],
        },
      ],
    };
  },
};
</script>
