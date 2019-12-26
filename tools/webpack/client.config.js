const webpack = require('webpack')
const { resolve } = require('path')
const { smart } = require('webpack-merge')
const common = require('./config')

const config = process.env.NODE_ENV === 'production'
  ? require('./client.prod.config')
  : require('./client.dev.config')

const base = {
  entry: resolve('src', 'client', 'index.tsx'),
  output: {
    path: resolve('dist', 'client'),
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        IS_SERVER: JSON.stringify(false)
      }
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  }
}

module.exports = smart(common, base, config)