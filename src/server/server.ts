import { createServer } from 'http'
import express from 'express'
import * as bodyParser from 'body-parser'
import compression from 'compression'

export default () => {
  const app = express()
  const port = process.env.PORT || 3000

  app.use(compression({ level: 5 }))

  // HMR
  if (process.env.NODE_ENV === 'development') {
    const webpack = require('webpack')
    const webpackHotMiddleware = require('webpack-hot-middleware')
    const webpackDevMiddleware = require('webpack-dev-middleware')
    const config = require('../../tools/webpack/client.config')
    const compiler = webpack(config)

    compiler.apply(new webpack.ProgressPlugin())

    app.use(webpackHotMiddleware(compiler))
    app.use(
      webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
        writeToDisk: (filePath: string) => /loadable-stats/.test(filePath),
      }),
    )
  }

  if (process.env.NODE_ENV !== 'test') {
    const server = createServer()
  }
}
