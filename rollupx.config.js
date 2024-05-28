/* eslint-env node */
module.exports = {
  banner:
    '/*!\n' +
    ` * el-select-tree v${require('./package.json').version}\n` +
    ` * (c) 2019-${new Date().getFullYear()} yujinpan\n` +
    ' * Released under the MIT License.\n' +
    ' */\n',
  inputFiles: ['**/*'],
  outputDir: 'lib',

  formats: [
    {
      format: 'es',
      inputFiles: ['**/*'],
      outputDir: 'lib/es',
      outputFile: '[name][ext]',
    },
    {
      format: 'cjs',
      inputFiles: ['**/*'],
      outputDir: 'lib/cjs',
      outputFile: '[name][ext]',
    },
  ],

  typesOutputDir: 'types',
};
