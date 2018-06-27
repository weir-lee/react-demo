let path = require('path')
let webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  watch: true,

  mode: "development",

  entry: path.resolve(__dirname, '../app/main.js'),

  output: {
    path: path.resolve(__dirname, '../devDist'),
    // dev开发模式下js被打包到内存里的 /xuni/bundle.js
    publicPath: '/xuni/',
    filename: 'bundle.js'
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react']
        }
      }
    }]
  },

  plugins: [
    // new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Development'
    })
  ],

  devtool: 'inline-source-map',

  devServer: {
    open: true,
    // dev-server启动的服务的根目录
    contentBase: path.resolve(__dirname, "../"),
    port: 8888,
    inline: true,
    hot: true
  },

  resolve: {
    extensions: ['.js', '.jsx']
  }


}