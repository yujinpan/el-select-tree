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
  },
});

function getGAHead(): HeadTags {
  return process.env.NODE_ENV === 'production'
    ? [
        [
          'script',
          {
            async: true,
            src: 'https://www.googletagmanager.com/gtag/js?id=G-WP35BEJPHM',
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
gtag('config', 'G-WP35BEJPHM');
`,
        ],
      ]
    : [];
}
