import type { ComponentOptions, PropType } from 'vue';
import type Vue from 'vue';

export type CacheOption = {
  value: string | number | boolean | object;
  currentLabel: string | number;
  isDisabled: boolean;
};

const CacheOptions: ComponentOptions<Vue> = {
  inject: ['select'],
  props: {
    data: Array as PropType<CacheOption[]>,
    default: () => [],
  },
  watch: {
    data: {
      handler() {
        this.data.forEach((item) => {
          if (
            !this.select.cachedOptions.some(
              (cache) => cache.value === item.value,
            )
          ) {
            this.select.cachedOptions.push(item);
          }

          // fork from element-ui/packages/select/src/select.vue#435
          const inputs = Array.from(
            this.select.$el?.querySelectorAll('input') || [],
          );
          if (!inputs.includes(document.activeElement)) {
            this.select.setSelected();
          }
        });
      },
      immediate: true,
    },
  },
  render() {
    return undefined;
  },
};

export default CacheOptions;
