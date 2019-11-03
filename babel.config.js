module.exports = {
  presets: ['@vue/app'],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ],
    ['@babel/plugin-proposal-export-default-from']
  ],
  exclude: 'node_modules/**'
};
