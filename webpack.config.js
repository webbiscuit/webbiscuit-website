const path = require('path');
const { join } = require('path')
const paths = require('./config/paths')

const __DEV__ = process.env.NODE_ENV !== 'production'
const __PROD__ = process.env.NODE_ENV === 'production'

module.exports = {
  entry: {
    head: join(paths.webpackSource, 'js', 'head.js'),
    body: join(paths.webpackSource, 'js', 'body.js'),
  },
  output: {
    path: paths.webpackDestination,
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};