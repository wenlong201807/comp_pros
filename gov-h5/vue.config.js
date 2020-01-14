const path = require('path')
const webpack = require('webpack')

function resolve (dir) {
  return path.join(__dirname, dir)
}
const prodExternals = {
  'AMap': 'AMap'
}

function isProd () {
  return process.env.NODE_ENV === 'production' || process.env.VUE_APP_PREVIEW === 'true'
}
const vueConfig = {
  configureWebpack: {
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
    externals: isProd() ? prodExternals : {
      'AMap': 'AMap'
    }
  },
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/', // h-build打包用的
  chainWebpack: (config) => {
    config.resolve.alias
      .set('src', resolve('src'))
      .set('views', resolve('src/views'))
      .set('components', resolve('src/components'))
  },
  devServer: {
    port: 8001,
    proxy: {
      '/oauthSally': {
        target: 'http://47.92.138.8:11008/oauthSally/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/oauthSally': '/'
        }
      },
      '/upmsSally': {
        target: 'http://47.92.138.8:11008/upmsSally/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/upmsSally': '/'
        }
      },
      '/gov': {
        target: 'http://47.92.138.8:11008/gov/',
        // target: 'http://192.168.100.217:10002/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/gov': '/'
        }
      }
    }
  },
  productionSourceMap: false,
  lintOnSave: undefined,
  transpileDependencies: []
}
module.exports = vueConfig
