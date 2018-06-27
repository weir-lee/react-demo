let path = require('path')

module.exports = {
  mode: 'production',

  entry: path.resolve(__dirname, '../app/main.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'all.js'
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
  }
}