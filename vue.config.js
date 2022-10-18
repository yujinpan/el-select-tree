/**
 * vue config
 * @description
 * vue构建配置文件，[文档地址](https://cli.vuejs.org/zh/config/#vue-config-js)
 * 1. 使用 devServer 的代理模式指向正式接口的域名。
 * 2. 注册 webpack alias 路径。
 */

module.exports = {
  indexPath: '../_layouts/default.html',
  publicPath: process.env.VUE_APP_BASE_URL,
  productionSourceMap: false,

  // webpack config
  configureWebpack: {
    entry: './examples/main.ts'
  }
};
