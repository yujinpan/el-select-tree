(window.webpackJsonp=window.webpackJsonp||[]).push([[10,22],{498:function(t,e,n){},512:function(t,e,n){"use strict";var i=n(1),s=n(276).trim;i({target:"String",proto:!0,forced:n(534)("trim")},{trim:function(){return s(this)}})},513:function(t,e,n){},514:function(t,e,n){"use strict";n(498)},515:function(t,e,n){},526:function(t,e,n){"use strict";n.r(e);n(514);var i=n(93),s=Object(i.a)({},(function(){var t=this,e=t._self._c;return e("div",{staticClass:"sidebar-button",on:{click:function(e){return t.$emit("toggle-sidebar")}}},[e("svg",{staticClass:"icon",attrs:{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",role:"img",viewBox:"0 0 448 512"}},[e("path",{attrs:{fill:"currentColor",d:"M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z"}})])])}),[],!1,null,null,null);e.default=s.exports},532:function(t,e,n){"use strict";var i=n(8),s=n(264),r=n(15),o=n(50),a=n(46),u=n(533),l=n(18),c=n(94),h=n(265);s("search",(function(t,e,n){return[function(e){var n=a(this),s=o(e)?void 0:c(e,t);return s?i(s,e,n):new RegExp(e)[t](l(n))},function(t){var i=r(this),s=l(t),o=n(e,i,s);if(o.done)return o.value;var a=i.lastIndex;u(a,0)||(i.lastIndex=0);var c=h(i,s);return u(i.lastIndex,a)||(i.lastIndex=a),null===c?-1:c.index}]}))},533:function(t,e,n){"use strict";t.exports=Object.is||function(t,e){return t===e?0!==t||1/t==1/e:t!=t&&e!=e}},534:function(t,e,n){"use strict";var i=n(96).PROPER,s=n(2),r=n(277);t.exports=function(t){return s((function(){return!!r[t]()||"​᠎"!=="​᠎"[t]()||i&&r[t].name!==t}))}},535:function(t,e,n){"use strict";var i=n(70),s=n(8),r=n(3),o=n(264),a=n(15),u=n(50),l=n(272),c=n(46),h=n(175),f=n(266),g=n(125),d=n(18),p=n(94),v=n(270),m=n(265),x=n(130),w=n(271),y=n(2),k=w.UNSUPPORTED_Y,b=Math.min,C=[].push,$=r(/./.exec),_=r(C),I=r("".slice);o("split",(function(t,e,n){var r;return r="c"==="abbc".split(/(b)*/)[1]||4!=="test".split(/(?:)/,-1).length||2!=="ab".split(/(?:ab)*/).length||4!==".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(t,n){var r=d(c(this)),o=void 0===n?4294967295:n>>>0;if(0===o)return[];if(void 0===t)return[r];if(!l(t))return s(e,r,t,o);for(var a,u,h,f=[],g=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),p=0,m=new RegExp(t.source,g+"g");(a=s(x,m,r))&&!((u=m.lastIndex)>p&&(_(f,I(r,p,a.index)),a.length>1&&a.index<r.length&&i(C,f,v(a,1)),h=a[0].length,p=u,f.length>=o));)m.lastIndex===a.index&&m.lastIndex++;return p===r.length?!h&&$(m,"")||_(f,""):_(f,I(r,p)),f.length>o?v(f,0,o):f}:"0".split(void 0,0).length?function(t,n){return void 0===t&&0===n?[]:s(e,this,t,n)}:e,[function(e,n){var i=c(this),o=u(e)?void 0:p(e,t);return o?s(o,e,i,n):s(r,d(i),e,n)},function(t,i){var s=a(this),o=d(t),u=n(r,s,o,i,r!==e);if(u.done)return u.value;var l=h(s,RegExp),c=s.unicode,p=(s.ignoreCase?"i":"")+(s.multiline?"m":"")+(s.unicode?"u":"")+(k?"g":"y"),v=new l(k?"^(?:"+s.source+")":s,p),x=void 0===i?4294967295:i>>>0;if(0===x)return[];if(0===o.length)return null===m(v,o)?[o]:[];for(var w=0,y=0,C=[];y<o.length;){v.lastIndex=k?0:y;var $,S=m(v,k?I(o,y):o);if(null===S||($=b(g(v.lastIndex+(k?y:0)),o.length))===w)y=f(o,y,c);else{if(_(C,I(o,w,y)),C.length===x)return C;for(var W=1;W<=S.length-1;W++)if(_(C,S[W]),C.length===x)return C;y=w=$}}return _(C,I(o,w)),C}]}),!!y((function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var n="ab".split(t);return 2!==n.length||"a"!==n[0]||"b"!==n[1]})),k)},536:function(t,e,n){"use strict";var i,s=n(1),r=n(129),o=n(47).f,a=n(125),u=n(18),l=n(176),c=n(46),h=n(177),f=n(26),g=r("".endsWith),d=r("".slice),p=Math.min,v=h("endsWith");s({target:"String",proto:!0,forced:!!(f||v||(i=o(String.prototype,"endsWith"),!i||i.writable))&&!v},{endsWith:function(t){var e=u(c(this));l(t);var n=arguments.length>1?arguments[1]:void 0,i=e.length,s=void 0===n?i:p(a(n),i),r=u(t);return g?g(e,r,s):d(e,s-r.length,s)===r}})},537:function(t,e,n){"use strict";n(513)},538:function(t,e,n){"use strict";n(515)},548:function(t,e,n){"use strict";n.r(e);n(56),n(532),n(512),n(19),n(35),n(4),n(492),n(30),n(31),n(267),n(124),n(529),n(530),n(531),n(127),n(123),n(535),n(173),n(536);var i=n(274),s=n.n(i),r=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,i=s()(e,"title","");return s()(e,"frontmatter.tags")&&(i+=" ".concat(e.frontmatter.tags.join(" "))),n&&(i+=" ".concat(n)),o(t,i)},o=function(t,e){var n=function(t){return t.replace(/[-/\\^$*+?.()|[\]{}]/g,"\\$&")},i=new RegExp("[^\0-]"),s=t.split(/\s+/g).map((function(t){return t.trim()})).filter((function(t){return!!t}));if(i.test(t))return s.some((function(t){return e.toLowerCase().indexOf(t)>-1}));var r=t.endsWith(" ");return new RegExp(s.map((function(t,e){return s.length!==e+1||r?"(?=.*\\b".concat(n(t),"\\b)"):"(?=.*\\b".concat(n(t),")")})).join("")+".+","gi").test(e)},a={name:"SearchBox",data:function(){return{query:"",focused:!1,focusIndex:0,placeholder:void 0}},computed:{showSuggestions:function(){return this.focused&&this.suggestions&&this.suggestions.length},suggestions:function(){var t=this.query.trim().toLowerCase();if(t){for(var e=this.$site.pages,n=this.$site.themeConfig.searchMaxSuggestions||5,i=this.$localePath,s=[],o=0;o<e.length&&!(s.length>=n);o++){var a=e[o];if(this.getPageLocalePath(a)===i&&this.isSearchable(a))if(r(t,a))s.push(a);else if(a.headers)for(var u=0;u<a.headers.length&&!(s.length>=n);u++){var l=a.headers[u];l.title&&r(t,a,l.title)&&s.push(Object.assign({},a,{path:a.path+"#"+l.slug,header:l}))}}return s}},alignRight:function(){return(this.$site.themeConfig.nav||[]).length+(this.$site.repo?1:0)<=2}},mounted:function(){this.placeholder=this.$site.themeConfig.searchPlaceholder||"",document.addEventListener("keydown",this.onHotkey)},beforeDestroy:function(){document.removeEventListener("keydown",this.onHotkey)},methods:{getPageLocalePath:function(t){for(var e in this.$site.locales||{})if("/"!==e&&0===t.path.indexOf(e))return e;return"/"},isSearchable:function(t){var e=null;return null===e||(e=Array.isArray(e)?e:new Array(e)).filter((function(e){return t.path.match(e)})).length>0},onHotkey:function(t){t.srcElement===document.body&&["s","/"].includes(t.key)&&(this.$refs.input.focus(),t.preventDefault())},onUp:function(){this.showSuggestions&&(this.focusIndex>0?this.focusIndex--:this.focusIndex=this.suggestions.length-1)},onDown:function(){this.showSuggestions&&(this.focusIndex<this.suggestions.length-1?this.focusIndex++:this.focusIndex=0)},go:function(t){this.showSuggestions&&(this.$router.push(this.suggestions[t].path),this.query="",this.focusIndex=0)},focus:function(t){this.focusIndex=t},unfocus:function(){this.focusIndex=-1}}},u=(n(537),n(93)),l=Object(u.a)(a,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"search-box"},[e("input",{ref:"input",class:{focused:t.focused},attrs:{"aria-label":"Search",placeholder:t.placeholder,autocomplete:"off",spellcheck:"false"},domProps:{value:t.query},on:{input:function(e){t.query=e.target.value},focus:function(e){t.focused=!0},blur:function(e){t.focused=!1},keyup:[function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.go(t.focusIndex)},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"up",38,e.key,["Up","ArrowUp"])?null:t.onUp.apply(null,arguments)},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"down",40,e.key,["Down","ArrowDown"])?null:t.onDown.apply(null,arguments)}]}}),t._v(" "),t.showSuggestions?e("ul",{staticClass:"suggestions",class:{"align-right":t.alignRight},on:{mouseleave:t.unfocus}},t._l(t.suggestions,(function(n,i){return e("li",{key:i,staticClass:"suggestion",class:{focused:i===t.focusIndex},on:{mousedown:function(e){return t.go(i)},mouseenter:function(e){return t.focus(i)}}},[e("a",{attrs:{href:n.path},on:{click:function(t){t.preventDefault()}}},[e("span",{staticClass:"page-title"},[t._v(t._s(n.title||n.path))]),t._v(" "),n.header?e("span",{staticClass:"header"},[t._v("> "+t._s(n.header.title))]):t._e()])])})),0):t._e()])}),[],!1,null,null,null).exports,c=n(526),h=n(523);function f(t,e){return t.ownerDocument.defaultView.getComputedStyle(t,null)[e]}var g={name:"Navbar",components:{SidebarButton:c.default,NavLinks:h.default,SearchBox:l,AlgoliaSearchBox:{}},data:function(){return{linksWrapMaxWidth:null}},computed:{algolia:function(){return this.$themeLocaleConfig.algolia||this.$site.themeConfig.algolia||{}},isAlgoliaSearch:function(){return this.algolia&&this.algolia.apiKey&&this.algolia.indexName}},mounted:function(){var t=this,e=parseInt(f(this.$el,"paddingLeft"))+parseInt(f(this.$el,"paddingRight")),n=function(){document.documentElement.clientWidth<719?t.linksWrapMaxWidth=null:t.linksWrapMaxWidth=t.$el.offsetWidth-e-(t.$refs.siteName&&t.$refs.siteName.offsetWidth||0)};n(),window.addEventListener("resize",n,!1)}},d=(n(538),Object(u.a)(g,(function(){var t=this,e=t._self._c;return e("header",{staticClass:"navbar"},[e("SidebarButton",{on:{"toggle-sidebar":function(e){return t.$emit("toggle-sidebar")}}}),t._v(" "),e("RouterLink",{staticClass:"home-link",attrs:{to:t.$localePath}},[t.$site.themeConfig.logo?e("img",{staticClass:"logo",attrs:{src:t.$withBase(t.$site.themeConfig.logo),alt:t.$siteTitle}}):t._e(),t._v(" "),t.$siteTitle?e("span",{ref:"siteName",staticClass:"site-name",class:{"can-hide":t.$site.themeConfig.logo}},[t._v(t._s(t.$siteTitle))]):t._e()]),t._v(" "),e("div",{staticClass:"links",style:t.linksWrapMaxWidth?{"max-width":t.linksWrapMaxWidth+"px"}:{}},[t.isAlgoliaSearch?e("AlgoliaSearchBox",{attrs:{options:t.algolia}}):!1!==t.$site.themeConfig.search&&!1!==t.$page.frontmatter.search?e("SearchBox"):t._e(),t._v(" "),e("NavLinks",{staticClass:"can-hide"})],1)],1)}),[],!1,null,null,null));e.default=d.exports}}]);