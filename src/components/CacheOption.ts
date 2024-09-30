import Vue from 'vue';

import type { PropType } from 'vue';

import { debounce } from '@/components/utils';

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

      this.data.forEach((item) => {
        if (
          this.values.includes(item.value) &&
          !select.cachedOptions.some((cached) => cached.value === item.value)
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
    this.update = debounce(this.update, 100);

    this.update();
  },
});

export default CacheOptions;
