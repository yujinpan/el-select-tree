import DefaultTheme from 'vitepress/theme';
import { enhanceApp as enhanceAppDemo } from 'vitepress-plugin-component-demo';

import type { Theme } from 'vitepress';

import enhanceApp from './enhanceApp';

export default {
  extends: DefaultTheme,
  async enhanceApp(context) {
    enhanceAppDemo(context);
    enhanceApp(context);
  },
} as Theme;
