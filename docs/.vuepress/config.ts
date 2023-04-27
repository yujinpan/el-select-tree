import { defineConfig, type HeadTags } from 'vuepress/config';

export default defineConfig({
  base: '/el-select-tree/',
  title: 'el-select-tree',
  description: "ElementUI's el-select combined with el-tree.",
  head: [...getGAHead()],
  themeConfig: {
    lastUpdated: 'Last Updated',
    repo: 'yujinpan/el-select-tree',
    logo: '/logo.svg',
    sidebar: 'auto',
    nav: [{ text: 'Guide', link: '/' }],
  },
  plugins: ['vuepress-plugin-component-demo' as any],
});

function getGAHead(): HeadTags {
  return process.env.NODE_ENV === 'production'
    ? [
        [
          'script',
          {
            async: true,
            src: 'https://www.googletagmanager.com/gtag/js?id=G-S66MPLRFJZ',
          },
          '',
        ],
        [
          'script',
          {},
          `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-S66MPLRFJZ');
`,
        ],
      ]
    : [];
}
