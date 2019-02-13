const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')

const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

const config = merge(base, {
  entry: {
    app: ['babel-polyfill', './src/entry-client.js']
  },
  plugins: [
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"'
    }),
    // extract vendor chunks for better caching
    new webpack.optimize.CommonsChunkPlugin({ // CommonsChunkPlugin这个插件是用来提取公共代码的，通过将公共模块提取出来，只在页面加载的时候引入一次，提升应用的加载效率。顺便提一下，chunk其实就是代码块的意思，可能是一个或多个模块，一般就是一个js文件。
      name: 'vendor',
      minChunks: function (module) {
        // a module is extracted into the vendor chunk if...
        return (
          // it's inside node_modules
          /node_modules/.test(module.context) &&
          // and not a CSS file (due to extract-text-webpack-plugin limitation)
          !/\.css$/.test(module.request)
        )
      }
    }),
    // extract webpack runtime & manifest to avoid vendor chunk hash changing
    // on every build.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new VueSSRClientPlugin()
  ]
})

module.exports = config
