/*!
 * el-select-tree v1.0.7
 * (c) 2019-2019 yujinpan
 * Released under the MIT License.
 */

import 'core-js/modules/es7.array.includes';
import 'core-js/modules/es6.string.includes';
import 'core-js/modules/es6.number.constructor';
import treeFind from 'operation-tree-node/dist/treeFind.esm';
import treeEach from 'operation-tree-node/dist/treeEach.esm';

var script = {
  name: 'ElSelectTree',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    placeholder: {
      type: String,
      default: '请选择'
    },
    props: {
      type: Object,
      default: function _default() {
        return {
          value: 'value',
          label: 'label',
          children: 'children'
        };
      }
    },
    placement: {
      type: String,
      default: 'bottom-start'
    },
    size: {
      type: String,
      default: 'small'
    },
    popoverMinWidth: {
      type: Number,
      default: 0
    },
    disabled: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    value: {
      type: [Number, String, Array],
      default: ''
    },
    disabledValues: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    data: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  computed: {
    dataLength: function dataLength() {
      return this.data.length;
    },
    propsValue: function propsValue() {
      return this.props.value;
    },
    propsLabel: function propsLabel() {
      return this.props.label;
    }
  },
  data: function data() {
    return {
      visible: false,
      selectedLabel: ''
    };
  },
  methods: {
    handleScroll: function handleScroll() {
      this.$refs.scrollbar && this.$refs.scrollbar.handleScroll();
    },
    nodeClick: function nodeClick(data, node, component) {
      var children = data.children;
      var value = data[this.propsValue];

      if (children && children.length) {
        component.handleExpandIconClick();
      } else if (!this.disabledValues.includes(value) && !this.multiple) {
        if (value !== this.value) {
          this.$emit('change', value);
          this.selectedLabel = data[this.propsLabel];
        }

        this.visible = false;
      }
    },
    checkChange: function checkChange() {
      this.$emit('change', this.$refs.elTree.getCheckedKeys(true));
      this.setSelectedLabel();
    },
    checkSelected: function checkSelected(value) {
      if (this.multiple) {
        return this.value.includes(value);
      } else {
        return this.value === value;
      }
    },
    setSelected: function setSelected() {
      var _this = this;

      this.selectedLabel = '';
      var propsValue = this.propsValue;
      var value = this.value;

      if (String(value).length) {
        if (this.multiple) {
          this.$nextTick(function () {
            _this.$refs.elTree.setCheckedKeys(_this.value);

            _this.setSelectedLabel();
          });
        } else {
          var selectedNode = treeFind(this.data, function (node) {
            return _this.checkSelected(node[propsValue]);
          });

          if (selectedNode) {
            this.selectedLabel = selectedNode[this.propsLabel];
          }
        }
      }
    },
    setTreeDataState: function setTreeDataState() {
      var disabledValues = this.disabledValues;
      var propsValue = this.props.value;
      treeEach(this.data, function (node) {
        node.disabled = disabledValues.includes(node[propsValue]);
      });
    },
    setSelectedLabel: function setSelectedLabel() {
      var elTree = this.$refs.elTree;
      var selectedNodes = elTree.getCheckedNodes(true);
      this.selectedLabel = selectedNodes.map(function (item) {
        return item.label;
      }).join(',');
    },
    treeItemClass: function treeItemClass(data) {
      var value = data[this.propsValue];
      return {
        selected: this.multiple ? false : this.checkSelected(value),
        'is-disabled': this.disabledValues.includes(value)
      };
    }
  },
  watch: {
    value: function value() {
      this.setSelected();
    },
    data: function data() {
      this.setTreeDataState();
    },
    disabledValues: function disabledValues() {
      this.setTreeDataState();
    }
  },
  created: function created() {
    if (this.multiple && !Array.isArray(this.value)) {
      console.error('[el-select-tree]:', 'props `value` must be Array if use multiple!');
    }

    this.setTreeDataState();
  },
  mounted: function mounted() {
    var _this2 = this;

    this.setSelected();
    this.$nextTick(function () {
      var popper = _this2.$refs.elPopover.$refs.popper;
      var width;

      if (!_this2.popoverMinWidth) {
        var clientWidth = _this2.$el.clientWidth;

        if (!clientWidth) {
          console.log('[el-select-warn]:', 'can not get `width`, please set the `popoverMinWidth`');
        }

        width = clientWidth;
      } else {
        width = _this2.popoverMinWidth;
      }

      width && (popper.style.minWidth = width + 'px');
    });
  }
};

function styleInject(css, ref) {
  if (ref === void 0) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') {
    return;
  }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".el-select-tree{display:inline-block}.el-select-tree .el-input:hover .el-input__inner{border-color:#c0c4cc}.el-select-tree .el-input.is-focus .el-input__inner{border-color:#409eff}.el-select-tree .el-input__inner{cursor:pointer;padding-right:30px}.el-select-tree .el-input__icon{cursor:pointer}.el-select-tree__popover{padding:0!important;border:1px solid #e4e7ed!important;border-radius:4px!important}.el-select-tree__popover .popper__arrow{left:35px!important}.el-select-tree__list{overflow-y:auto}.el-select-tree__list::-webkit-scrollbar-track-piece{background:#d3dce6}.el-select-tree__list::-webkit-scrollbar{width:4px}.el-select-tree__list::-webkit-scrollbar-thumb{background:#99a9bf}.el-select-tree__item{-webkit-box-flex:1;-ms-flex:1;flex:1;position:relative;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding-right:10px}.el-select-tree__item.selected{padding-right:35px;color:#409eff;font-weight:bolder}.el-select-tree__item.is-disabled{color:#bbb;cursor:not-allowed}.el-select-tree__empty{padding:10px 0;margin:0;text-align:center;color:#999;font-size:14px}";
styleInject(css);

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  const options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  let hook;

  if (moduleIdentifier) {
    // server build
    hook = function (context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function (context) {
      style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      const originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      const existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

const isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

/* script */
const __vue_script__ = script;
/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"el-select-tree"},[_c('el-popover',{ref:"elPopover",attrs:{"transition":"el-zoom-in-top","popper-class":"el-select-tree__popover","trigger":"click","disabled":_vm.disabled,"placement":_vm.placement},on:{"after-enter":function($event){return _vm.handleScroll()}},model:{value:(_vm.visible),callback:function ($$v) {_vm.visible=$$v;},expression:"visible"}},[(_vm.dataLength)?_c('el-scrollbar',{ref:"scrollbar",class:{ 'is-empty': _vm.dataLength === 0 },attrs:{"wrap-class":"el-select-dropdown__wrap","view-class":"el-select-dropdown__list"}},[_c('el-tree',{ref:"elTree",staticClass:"el-select-tree__list",attrs:{"props":_vm.props,"node-key":_vm.propsValue,"show-checkbox":_vm.multiple,"expand-on-click-node":_vm.multiple,"data":_vm.data},on:{"node-click":_vm.nodeClick,"check-change":_vm.checkChange},scopedSlots:_vm._u([{key:"default",fn:function(ref){
var data = ref.data;
return _c('div',{staticClass:"el-select-tree__item",class:_vm.treeItemClass(data)},[_vm._v("\n          "+_vm._s(data[_vm.propsLabel])+"\n        ")])}}],null,false,1229176757)})],1):_c('p',{staticClass:"el-select-tree__empty"},[_vm._v("\n      无数据\n    ")]),_c('el-input',{ref:"reference",class:{ 'is-focus': _vm.visible },attrs:{"slot":"reference","readonly":"","suffix-icon":"el-icon-arrow-down","size":_vm.size,"disabled":_vm.disabled,"placeholder":_vm.placeholder},slot:"reference",model:{value:(_vm.selectedLabel),callback:function ($$v) {_vm.selectedLabel=$$v;},expression:"selectedLabel"}})],1)],1)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var ElSelectTree = normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

ElSelectTree.install = function (Vue) {
  Vue.component('ElSelectTree', ElSelectTree);
};

export default ElSelectTree;
//# sourceMappingURL=index.js.map
