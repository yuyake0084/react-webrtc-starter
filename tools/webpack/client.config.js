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
  watch: process.env.NODE_ENV === 'development',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        IS_BROWSER: JSON.stringify(true),
        DOMAIN: JSON.stringify(process.env.DOMAIN)
      }
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  }
}

module.exports = smart(common, base, config)