/// <reference types="vitest" />

import vue2 from '@vitejs/plugin-vue2';
import vue2Jsx from '@vitejs/plugin-vue2-jsx';
import { resolve } from 'path';
import { resolveWithAlias } from 'path-ops';
import { defineConfig } from 'vite';

const alias = {
  '@': resolve('src'),
};

// https://vitejs.dev/config/
export default defineConfig({
  base: '/el-select-tree/',
  plugins: [
    vue2(),
    vue2Jsx({
      // fork from @vue/babel-preset-app
      babelPlugins: [
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        '@babel/plugin-proposal-class-properties',
      ],
    }),
  ],
  resolve: {
    alias,
    extensions: ['.vue', '.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        // ignore external sass warnings for "10px / 2px"
        quietDeps: true,
        // resolve start path for "~", like: "~external/style/var.scss"
        importer: (url: string) => {
          return {
            file: resolveWithAlias(
              url.startsWith('~') ? url.slice(1) : url,
              alias,
            ),
          };
        },
      },
    },
  },
  // https://vitest.dev/config/
  test: {
    dir: 'src',
  },
});
