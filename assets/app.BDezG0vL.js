import{y as s,I as u,R as l,J as c,K as f,L as d,M as m,T as h,N as A,O as g,P as v,Q as P,G as p,d as y,u as T,o as w,f as C,S as R,U as E,W as _}from"./chunks/framework.ENSiYBbN.js";import{R as b}from"./chunks/theme.AH7ZgZzo.js";function i(t){if(t.extends){const e=i(t.extends);return{...e,...t,async enhanceApp(n){e.enhanceApp&&await e.enhanceApp(n),t.enhanceApp&&await t.enhanceApp(n)}}}return t}const o=i(b),j=y({name:"VitePressApp",setup(){const{site:t,lang:e,dir:n}=T();return w(()=>{C(()=>{document.documentElement.lang=e.value,document.documentElement.dir=n.value})}),t.value.router.prefetchLinks&&R(),E(),_(),o.setup&&o.setup(),()=>p(o.Layout)}});async function x(){globalThis.__VITEPRESS__=!0;const t=D(),e=S();e.config.ignoredElements=["mjx-container","mjx-assistive-mml"],e.provide(l,t);const n=c(t.route);return e.provide(f,n),e.component("Content",d),e.component("ClientOnly",m),e.component("Teleport",h),Object.defineProperties(e,{$frontmatter:{get(){return n.frontmatter.value}},$params:{get(){return n.page.value.params}}}),o.enhanceApp&&await o.enhanceApp({app:e,router:t,siteData:A}),{app:e,router:t,data:n}}function S(){return g({render:()=>p(j)})}function D(){let t=s,e;return v(n=>{let a=P(n),r=null;return a&&(t&&(e=a),(t||e===a)&&(a=a.replace(/\.js$/,".lean.js")),r=import(a)),s&&(t=!1),r},o.NotFound)}s&&x().then(({app:t,router:e,data:n})=>{e.go().then(()=>{u(e.route,n.site),t.mount("#app")})});export{x as createApp};
