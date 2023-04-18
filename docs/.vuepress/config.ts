import { defineConfig } from 'vuepress/config';

export default defineConfig({
  title: 'el-select-tree',
  description: "ElementUI's el-select combined with el-tree.",
  themeConfig: {
    lastUpdated: 'Last Updated',
    repo: 'yujinpan/el-select-tree',
    logo: '/logo.svg',
  },
  plugins: [
    'vuepress-plugin-component-demo' as any,
    [
      '@vuepress/google-analytics',
      {
        ga: 'G-WP35BEJPHM',
      },
    ],
  ],
});
