import Vue, { ComponentOptions, PropType } from 'vue';

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
              (cache) => cache.value === item.value
            )
          ) {
            this.select.cachedOptions.push(item);
          }
          this.select.setSelected();
        });
      },
      deep: true,
      immediate: true,
    },
  },
  render() {
    return undefined;
  },
};

export default CacheOptions;
