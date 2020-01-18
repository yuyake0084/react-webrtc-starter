const webpack = require('webpack')
const ManifestPlugin = require('webpack-manifest-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const RobotstxtPlugin = require('robotstxt-webpack-plugin')

module.exports = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].bundle.js',
    chunkFilename: '[name].[contenthash].[id].bundle.js'
  },
  plugins: [
    new webpack.optimize.AggressiveMergingPlugin(),
    new ManifestPlugin(),
    new RobotstxtPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false
    }),
  ],
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    minimize: true,
    splitChunks: {
      minSize: 10000,
      maxSize: 250000,
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  }
}