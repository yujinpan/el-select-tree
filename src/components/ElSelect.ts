import Vue from 'vue';

export default function getElSelect() {
  if (getElSelect._cache) return getElSelect._cache;

  const ElSelect = Vue.component('ElSelect');

  return (getElSelect._cache = {
    extends: ElSelect,
    components: {
      ElSelectMenu: getElSelectMenu(),
    },
  });
}

getElSelect._cache = null;

export function getElSelectMenu() {
  if (getElSelectMenu._cache) return getElSelectMenu._cache;

  const ElSelect = Vue.component('ElSelect');
  const ElSelectMenu = ElSelect.options.components.ElSelectMenu;

  return (getElSelectMenu._cache = {
    extends: ElSelectMenu,
    render(h) {
      return h(
        'div',
        {
          class: [
            {
              'el-select-dropdown': true,
              'el-popper': true,
              'is-multiple': this.$parent.multiple,
            },
            this.popperClass,
          ],
          style: { minWidth: this.minWidth },
        },
        [
          this.$parent.$scopedSlots.header &&
            h(
              'div',
              { staticClass: 'el-select-dropdown__header' },
              this.$parent.$scopedSlots.header(),
            ),
          this.$scopedSlots.default(),
          this.$parent.$scopedSlots.footer &&
            h(
              'div',
              { staticClass: 'el-select-dropdown__footer' },
              this.$parent.$scopedSlots.footer(),
            ),
        ],
      );
    },
  });
}

getElSelectMenu._cache = null;
