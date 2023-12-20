import Vue from 'vue';

/**
 * create when use
 */
export default function getElSelectVirtual() {
  if (getElSelectVirtual._cache) return getElSelectVirtual._cache;

  const ElSelect = Vue.component('ElSelect');

  return (getElSelectVirtual._cache = {
    extends: {
      ...ElSelect.options,
      watch: {
        ...ElSelect.options.watch,
        options: undefined,
      },
    },
    props: {},
    watch: {
      // fork from node_modules/element-ui/packages/select/src/select.vue#427
      options() {
        if (this.$isServer) return;
        this.$nextTick(() => {
          this.broadcast('ElSelectDropdown', 'updatePopper');
        });
        if (this.multiple) {
          this.resetInputHeight();
        }
        const inputs = this.$el.querySelectorAll('input');
        if (
          [].indexOf.call(inputs, document.activeElement) === -1 &&
          // fix: virtual filter keywords lose when any operations
          !this.multiple &&
          !this.query
        ) {
          this.setSelected();
        }
        if (
          this.defaultFirstOption &&
          (this.filterable || this.remote) &&
          this.filteredOptionsCount
        ) {
          this.checkDefaultFirstOption();
        }
      },
    },
  });
}

getElSelectVirtual._cache = null;
