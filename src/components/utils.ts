import Vue from 'vue';

export const ElSelectMixinOptions = {
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    name: String,
    id: String,
    value: {
      required: true,
    },
    autocomplete: String,
    autoComplete: String,
    automaticDropdown: Boolean,
    size: String,
    disabled: Boolean,
    clearable: Boolean,
    filterable: Boolean,
    allowCreate: Boolean,
    loading: Boolean,
    popperClass: String,
    remote: Boolean,
    loadingText: String,
    noMatchText: String,
    noDataText: String,
    remoteMethod: Function,
    filterMethod: Function,
    multiple: Boolean,
    multipleLimit: Number,
    placeholder: String,
    defaultFirstOption: Boolean,
    reserveKeyword: Boolean,
    valueKey: String,
    collapseTags: Boolean,
    popperAppendToBody: {
      type: Boolean,
      default: true,
    },
  },
};
export const ElSelectMixin = Vue.extend(ElSelectMixinOptions);

export const ElTreeMixinOptions = {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    emptyText: String,
    renderAfterExpand: {
      type: Boolean,
      default: true,
    },
    nodeKey: String,
    checkStrictly: Boolean,
    defaultExpandAll: Boolean,
    // expandOnClickNode: Boolean,
    // checkOnClickNode: Boolean,
    checkDescendants: Boolean,
    autoExpandParent: { type: Boolean, default: true },
    defaultCheckedKeys: Array,
    defaultExpandedKeys: Array,
    currentNodeKey: [String, Number],
    renderContent: Function,
    showCheckbox: Boolean,
    // draggable: Boolean,
    // allowDrag: Function,
    // allowDrop: Function,
    props: Object,
    lazy: Boolean,
    highlightCurrent: Boolean,
    load: Function,
    // filterNodeMethod: Function,
    accordion: Boolean,
    indent: Number,
    iconClass: String,
  },
};
export const ElTreeMixin = Vue.extend(ElTreeMixinOptions);

export function propsPick(props: Obj, keys: string[]) {
  const result: Obj = {};
  keys.forEach((key) => {
    key in props && (result[key] = props[key]);
  });
  return result;
}

export function toArr(val: any) {
  return Array.isArray(val) ? val : val || val === 0 ? [val] : [];
}

export function isValidArr(val: any) {
  return Array.isArray(val) && val.length;
}

export function getParentKeys(
  currentKeys: (number | string)[],
  data: Obj[],
  getValByProp: (prop: 'value' | 'children', data: Obj) => any
) {
  const result = new Set<string | number>();
  const getKeys = (tree) => {
    tree.forEach((node) => {
      const children = getValByProp('children', node);
      if (children && children.length) {
        if (
          children.find((item) =>
            currentKeys.includes(getValByProp('value', item))
          )
        ) {
          result.add(getValByProp('value', node));
        }
        getKeys(children);
      }
    });
  };
  getKeys(data);
  return Array.from(result);
}

type Value = string | number | (string | number)[];

export function cloneValue(val: Value) {
  return Array.isArray(val) ? [...val] : val;
}

export function isEqualsValue(val1: Value, val2: Value) {
  return (
    val1 === val2 ||
    (Array.isArray(val1) &&
      Array.isArray(val2) &&
      val1.toString() === val2.toString())
  );
}

export type Obj = { [p: string]: any };

type TreeCallback<T extends Obj, R> = (
  data: T,
  index: number,
  array: T[],
  parent?: T
) => R;

export function treeEach<T extends Obj>(
  treeData: T[],
  callback: TreeCallback<T, void>,
  getChildren: (data: T) => T[],
  parent?: T
) {
  for (let i = 0; i < treeData.length; i++) {
    const data = treeData[i];
    callback(data, i, treeData, parent);

    const children = getChildren(data);
    if (isValidArr(children)) {
      treeEach(children, callback, getChildren, data);
    }
  }
}
