var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.ts'
  },
  output: {
    path: config.example.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'example' ? config.example.assetsPublicPath : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    // {
    //   test: /\.(ts)$/,
    //   loader: 'tslint-loader',
    //   enforce: 'pre',
    //   include: [resolve('src'), resolve('test')],
    //   exclude: /node_modules/,
    //   options: {
    //     /*configuration: {
    //       rules: {
    //         quotemark: [true, 'single']
    //       }
    //     },*/

    //     // can specify a custom config file relative to current directory or with absolute path
    //     // 'tslint-custom.json'
    //     configFile: resolve('tslint.json'),

    //     // tslint errors are displayed by default as warnings
    //     // set emitErrors to true to display them as errors
    //     emitErrors: false,

    //     // tslint does not interrupt the compilation by default
    //     // if you want any file with tslint errors to fail
    //     // set failOnHint to true
    //     failOnHint: true,

    //     // enables type checked rules like 'for-in-array'
    //     // uses tsconfig.json from current working directory
    //     typeCheck: false,

    //     // automatically fix linting errors
    //     fix: false,

    //     // can specify a custom tsconfig file relative to current directory or with absolute path
    //     // to be used with type checked rules
    //     tsConfigFile: resolve('tsconfig.json'),

    //     // name of your formatter (optional)
    //     formatter: 'stylish',

    //     // path to directory containing formatter (optional)
    //     formattersDirectory: 'node_modules/tslint-loader/formatters/',

    //     // These options are useful if you want to save output to files
    //     // for your continuous integration server
    //     fileOutput: {
    //       // The directory where each file's report is saved
    //       dir: './foo/',

    //       // The extension to use for each report's filename. Defaults to 'txt'
    //       ext: 'xml',

    //       // If true, all files are removed from the report directory at the beginning of run
    //       clean: true,

    //       // A string to include at the top of every report file.
    //       // Useful for some report formats.
    //       header: '<?xml version="1.0" encoding="utf-8"?>\n<checkstyle version="5.7">',

    //       // A string to include at the bottom of every report file.
    //       // Useful for some report formats.
    //       footer: '</checkstyle>'
    //     }
    //   }
    // },
    rules: [{
      test: /\.(js|ts|vue)$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      include: [resolve('src'), resolve('test')],
      options: {
        formatter: require('eslint-friendly-formatter')
      }
    }, {
      test: /\.ts$/,
      exclude: /node_modules|vue\/src/,
      loader: 'ts-loader',
      include: [resolve('src'), resolve('test')],
      options: {
        appendTsSuffixTo: [/\.vue$/]
      }
    }, {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: vueLoaderConfig
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      include: [resolve('src'), resolve('test')]
    }, {
      test: /\.pug$/,
      loader: 'pug-loader',
      include: [resolve('src')]
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: utils.assetsPath('img/[name].[hash:7].[ext]')
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
      }
    }]
  }
}
