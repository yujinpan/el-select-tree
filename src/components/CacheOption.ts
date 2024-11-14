import Vue from 'vue';

import type { PropType } from 'vue';

export type CacheOption = {
  value: string | number | boolean | object;
  currentLabel: string | number;
  isDisabled: boolean;
};

const CacheOptions = Vue.extend({
  inject: ['select'],
  data() {
    return {
      oldValues: [],
    };
  },
  props: {
    data: {
      type: Array as PropType<CacheOption[]>,
      default: () => [],
    },
  },
  watch: {
    data() {
      this.update();
    },
  },
  methods: {
    update() {
      const select = this['select'] as {
        $el: HTMLElement;
        cachedOptions: CacheOption[];
        setSelected: () => any;
      };

      let changed = false;

      this.data.forEach((item) => {
        if (
          !select.cachedOptions.some((cached) => cached.value === item.value)
        ) {
          select.cachedOptions.push(item);
          changed = true;
        }
      });

      if (changed) {
        select.setSelected();
      }
    },
  },
  render() {
    return undefined;
  },
  mounted() {
    this.update();
  },
});

export default CacheOptions;
