<template>
  <ElSelectTree
    v-model="value"
    lazy
    :cache-data="[{ value: 2, label: '2-label' }]"
    :load="load"
  ></ElSelectTree>
</template>

<script>
export default {
  data() {
    return {
      lazyId: 0,
      value: 2,
    };
  },
  methods: {
    load(node, resolve) {
      setTimeout(() => {
        resolve([
          {
            value: ++this.lazyId,
            label: this.lazyId + '-label',
          },
        ]);
      }, 600);
    },
  },
};
</script>
