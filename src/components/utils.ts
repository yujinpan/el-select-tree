import Vue, { reactive } from 'vue';

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
    expandOnClickNode: {
      type: Boolean,
      default: true,
    },
    checkOnClickNode: Boolean,
    checkDescendants: Boolean,
    autoExpandParent: { type: Boolean, default: true },
    defaultCheckedKeys: Array,
    defaultExpandedKeys: Array,
    currentNodeKey: [String, Number],
    renderContent: Function,
    showCheckbox: Boolean,
    draggable: Boolean,
    allowDrag: Function,
    allowDrop: Function,
    props: Object,
    lazy: Boolean,
    highlightCurrent: Boolean,
    load: Function,
    filterNodeMethod: Function,
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
  return Array.isArray(val) && !!val.length;
}

export function isValidValue(val: any) {
  return val || val === 0;
}

export function getParentKeys(
  currentKeys: (number | string)[],
  data: Obj[],
  getValByProp: (prop: 'value' | 'children', data: Obj) => any,
) {
  const result = new Set<string | number>();
  const getKeys = (tree) => {
    tree.forEach((node) => {
      const children = getValByProp('children', node);
      if (children && children.length) {
        if (
          children.find((item) =>
            currentKeys.includes(getValByProp('value', item)),
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
  parent?: T,
) => R;

type TreeNodeData = Obj;

type TreeFindCallback<T extends TreeNodeData> = TreeCallback<T, boolean>;

export function treeFind<T extends TreeNodeData>(
  treeData: T[],
  findCallback: TreeFindCallback<T>,
  getChildren: (data: T) => T[],
): T | undefined;
export function treeFind<T extends TreeNodeData, R>(
  treeData: T[],
  findCallback: TreeFindCallback<T>,
  getChildren: (data: T) => T[],
  resultCallback?: TreeCallback<T, R>,
  parent?: T,
): R | undefined;
export function treeFind<T extends TreeNodeData, R>(
  treeData: T[],
  findCallback: TreeFindCallback<T>,
  getChildren: (data: T) => T[],
  resultCallback?: TreeCallback<T, R>,
  parent?: T,
): T | R | undefined {
  for (let i = 0; i < treeData.length; i++) {
    const data = treeData[i];
    if (findCallback(data, i, treeData, parent)) {
      return resultCallback ? resultCallback(data, i, treeData, parent) : data;
    } else {
      const children = getChildren(data);
      if (isValidArr(children)) {
        const find = treeFind(
          children,
          findCallback,
          getChildren,
          resultCallback,
          data,
        );
        if (find) return find;
      }
    }
  }
}

export function treeEach<T extends Obj>(
  treeData: T[],
  callback: TreeCallback<T, void>,
  getChildren: (data: T) => T[],
  parent?: T,
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

export async function treeFilter(
  data: Obj[],
  callback: (node: Obj) => boolean,
  propChildren = 'children',
  state: { stop: boolean },
) {
  let startTime = Date.now();
  const handleData = async (data: Obj[], result: Obj[] = []) => {
    if (state.stop) return Promise.reject();
    if (!data.length) return result;

    // rest/50ms
    const endTime = Date.now();
    if (endTime - startTime > 50) {
      await new Promise((resolve) => {
        startTime = endTime;
        setTimeout(resolve);
      });
    }

    const node = data[0];
    let hasChildren = false;
    const newItem = { ...node };
    const children = node[propChildren];
    if (isValidArr(children)) {
      const newItemChildren = await handleData(children);
      if ((hasChildren = isValidArr(newItemChildren))) {
        newItem[propChildren] = newItemChildren;
      } else {
        newItem[propChildren] = null;
      }
    }
    if (callback(node) || hasChildren) {
      result.push(newItem);
    }

    return handleData(data.slice(1), result);
  };

  return handleData(data);
}

export function compareArrayChanges(source: any[], target: any[]) {
  const add = target.filter((item) => !source.includes(item));
  const remove = source.filter((item) => !target.includes(item));

  return {
    add,
    remove,
  };
}

export function spliceItem(array: any[], remove: any, ...add: any[]) {
  const index = array.indexOf(remove);
  if (index !== -1) {
    array.splice(index, 1, ...add);
  }
}

export function getCompoundVal(
  data: Obj,
  prop: any | ((...args: any[]) => any),
  ...args: any[]
) {
  if (prop instanceof Function) {
    return prop(data, ...args);
  } else {
    return data[prop];
  }
}

const empty = reactive({});
export const banReactive = (obj: Obj) => {
  obj.__ob__ = empty['__ob__'];
  return obj;
};
