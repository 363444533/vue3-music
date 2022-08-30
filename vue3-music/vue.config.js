const { defineConfig } = require('@vue/cli-service')
const path = require("path")
const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');

module.exports = defineConfig({
  publicPath:"./" ,
  transpileDependencies: true,
  devServer: {
    port: 8080,
    host: 'localhost',
  },
  //自动导入vant
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
    ],
  },
  // 设置全局样式
  pluginOptions:{
    "style-resources-loader":{
      preProcessor:"less",
      // 路径，允许多个
      patterns: [
        path.join(__dirname, "./src/styles/variable.less")
      ]
    }
  },
  chainWebpack(config){
    config.module.rules.delete("svg");
    config.module
      .rule('svg')
      .exclude.add(path.join(__dirname, './src/icons'))
      .end()
     config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(path.join(__dirname, './src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader') 
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
});

