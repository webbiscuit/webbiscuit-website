const path = require('path');
const { join } = require('path')
const paths = require('./config/paths')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WriteFilePlugin = require('write-file-webpack-plugin')

const __DEV__ = process.env.NODE_ENV !== 'production'
const __PROD__ = process.env.NODE_ENV === 'production'

const config = {
  entry: {
    head: join(paths.webpackSource, 'js', 'head.js'),
    page: join(paths.webpackSource, 'js', 'page.js'),
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
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, 
          "css-loader"]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
};

if (__DEV__) {
  // Force webpack-dev-middleware to write files to the disk for metalsmith
  config.plugins.push(new WriteFilePlugin({
    log: false
  }));
}

module.exports = config;
