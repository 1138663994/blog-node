var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

const isProd = process.env.NODE_ENV === 'production'


function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const webpackConfig = {
  devtool: '#source-map',
  output: {
    path: config.build.assetsRoot,
    filename: 'js/[name].[chunkhash].js',
    publicPath: isProd
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'assets': resolve('src/assets'),
      'components': resolve('src/components'),
      'router': resolve('src/router'),
      'store': resolve('src/store')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        exclude: [resolve('src/assets/js/es5')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          resolve('src'),
          resolve('test')
        ],
        exclude: [resolve('src/assets/js/es5')]
      },
      {
        test: /\.css$/,
        use: isProd
        ? ExtractTextPlugin.extract({
            use: [
              {
                loader: 'css-loader',
                options: { minimize: true }
              }
            ],
            fallback: 'vue-style-loader'
          })
        : ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      'jQuery': 'jquery',
      _: 'lodash'
    }),
    new ExtractTextPlugin({
      filename: 'common.[chunkhash].css'
    })
  ]
}

if (isProd) {
  webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  )
}
module.exports = webpackConfig
