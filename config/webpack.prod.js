const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(common, {
  plugins: [
    new UglifyJSPlugin(),
  ],
  output: {
    path: path.resolve(__dirname, '../dist/min'),
    filename: 'sval.min.js',
  },
})