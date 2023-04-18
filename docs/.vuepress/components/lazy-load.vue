<template>
  <ElSelectTree v-model="value" lazy :load="load"></ElSelectTree>
</template>

<script>
export default {
  data() {
    return {
      value: '',
    };
  },
  methods: {
    load(node, resolve) {
      if (node.data && node.data.isLeaf) return resolve([]);
      setTimeout(() => {
        resolve([
          {
            value: Date.now(),
            label: '懒加载节点',
            isLeaf: node.level === 3,
          },
        ]);
      }, 600);
    },
  },
};
</script>
