const productionError = process.env.NODE_ENV === 'production' ? 'error' : 'warn';

/**
 * eslint + prettier 校验代码
 * 1. [eslint rules](http://eslint.cn/docs/rules/)
 * 2. [prettier rules](https://prettier.io/docs/en/options.html)
 * @description
 * *** 注意：这里的配置修改时，需要将该配置拷贝至 ./.vscode/settings.json/eslint.options 下 ***
 */
module.exports = {
  root: true,

  env: {
    node: true
  },

  rules: {
    'prettier/prettier': [
      'error',
      // 这里自定义 prettier 的规则
      {
        singleQuote: true,
        arrowParens: 'always',
        semi: true
      }
    ],
    'no-debugger': productionError,
    'no-console': productionError,
    eqeqeq: ['error', 'always']
  },

  parserOptions: {
    parser: '@typescript-eslint/parser'
  },

  'extends': [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/prettier',
    '@vue/typescript'
  ]
};
