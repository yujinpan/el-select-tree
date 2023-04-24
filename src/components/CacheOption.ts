import Vue from 'vue';

import type { PropType } from 'vue';

export type CacheOption = {
  value: string | number | boolean | object;
  currentLabel: string | number;
  isDisabled: boolean;
};

const CacheOptions = Vue.extend({
  inject: ['select'],
  props: {
    data: {
      type: Array as PropType<CacheOption[]>,
      default: () => [],
    },
    values: {
      type: Array,
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

      const cachedValues = select.cachedOptions.map((item) => item.value);

      this.data.forEach((item) => {
        // cache the selected but no rendered options
        if (
          this.values.includes(item.value) &&
          !cachedValues.includes(item.value)
        ) {
          select.cachedOptions.push(item);
        }
      });

      // fork from element-ui/packages/select/src/select.vue#435
      const inputs: Element[] = Array.from(
        select.$el?.querySelectorAll('input') || [],
      );
      if (!inputs.includes(document.activeElement)) {
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
