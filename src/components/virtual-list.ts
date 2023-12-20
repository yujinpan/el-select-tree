import throttle from 'lodash/throttle';
import { nextTick } from 'vue';

import type { ObjectDirective } from 'vue';

import { getCompoundVal, isValidArr } from '@/components/utils';
import type { Obj } from '@/components/utils';

export const virtualList: ObjectDirective<
  HTMLElement,
  {
    target: string;
    virtualStore: VirtualStore;
  }
> = {
  inserted(el, bindings) {
    const { target, virtualStore } = bindings.value;
    const targetElem = el.querySelector(target) as HTMLElement;

    targetElem.prepend(virtualStore.sketchTopElem);
    targetElem.append(virtualStore.sketchBottomElem);

    const handleScroll = () => {
      const old = targetElem.scrollTop;
      virtualStore.updateScroll(
        targetElem.scrollTop,
        targetElem.clientHeight,
        () => {
          targetElem.scrollTop = old;
          nextTick(() => {
            targetElem.scrollTop = old;
          });
        },
      );
    };

    targetElem.addEventListener('scroll', handleScroll);
  },
};

export type VirtualStoreOptions = {
  sourceData: Obj[];
  expandedKeys: any[];
  itemHeight: number;
  valueProp: any | ((node: Obj) => any);
  childrenProp: string;
};

export class VirtualStore {
  public data: Obj[] = [];

  constructor(private readonly options: VirtualStoreOptions) {
    this.updateScroll = throttle(this.updateScroll, 15);
  }

  setOptions(options: Partial<VirtualStoreOptions>) {
    Object.assign(this.options, options);

    this.setScrollTop(
      options.sourceData && this.options.sourceData !== options.sourceData
        ? 0
        : undefined,
    );

    this.updateScroll();
  }

  setScrollTop(scrollTop: number = this.scrollTop) {
    this.scrollTop = scrollTop;
    this.updateScroll();
  }

  readonly sketchTopElem = document.createElement('div');
  readonly sketchBottomElem = document.createElement('div');

  private scrollTop = 0;
  private clientHeight = 0;
  private updateScroll(
    scrollTop: number = this.scrollTop,
    clientHeight: number = this.clientHeight,
    callback?: () => any,
  ) {
    this.scrollTop = scrollTop;
    this.clientHeight = clientHeight || this.options.itemHeight * 15;

    const result: Obj[] = [];
    let height = 0;
    let heightTop = 0;
    let heightBottom = 0;

    const add = (
      node: Obj,
      data = result,
      minHeight = scrollTop - this.options.itemHeight * 3,
      maxHeight = scrollTop + this.clientHeight + this.options.itemHeight * 3,
    ) => {
      height += this.options.itemHeight;

      const nodeChildren = node[this.options.childrenProp] || [];
      const newNode = { ...node };
      const newChildren = (newNode[this.options.childrenProp] = [].concat(
        nodeChildren,
      ));

      if (height < minHeight) {
        heightTop += this.options.itemHeight;
      } else if (
        height >= minHeight &&
        height - this.options.itemHeight < maxHeight
      ) {
        data.push(newNode);
      } else {
        heightBottom += this.options.itemHeight;
      }

      if (isValidArr(newChildren)) {
        if (
          this.options.expandedKeys?.includes(
            getCompoundVal(newNode, this.options.valueProp),
          )
        ) {
          newChildren.length = 0;
          nodeChildren.forEach((child) =>
            add(
              child,
              newChildren,
              // fix parent will show when scroll fast
              scrollTop - this.options.itemHeight * 15,
            ),
          );
          if (newChildren.length && !data.includes(newNode)) {
            heightTop -= this.options.itemHeight;
            height += this.options.itemHeight;
            data.push(newNode);
          }
        } else {
          // show less children when expanded
          newChildren.length = Math.min(
            Math.ceil(this.clientHeight / this.options.itemHeight),
            newChildren.length,
          );
        }
      }
    };
    this.options.sourceData.forEach((item) => add(item));

    this.data = result;

    this.sketchTopElem.style.height = heightTop + 'px';
    this.sketchBottomElem.style.height = heightBottom + 'px';

    callback?.();
  }
}
