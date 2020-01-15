import { createServer } from 'http'
import express from 'express'
import sticky from 'sticky-session'
import * as bodyParser from 'body-parser'
import compression from 'compression'

import { router } from './router'
import { connectSocket } from './socket'

export const runServer = (workers: number): void => {
  const app = express()
  const port = parseInt(`${process.env.PORT}`, 10) || 3000

  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
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

  router(app)

  if (process.env.NODE_ENV !== 'test') {
    const server = createServer(app)
    const isWorker = sticky.listen(server, port, {
      workers,
    })

    if (isWorker) {
      connectSocket(server)
    }

    server.on('error', (err: NodeJS.ErrnoException) => {
      if (err.syscall !== 'listen') throw err

      const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`

      switch (err.code) {
        case 'EACCES':
          console.error(`${bind} requires elevated privileges`)
          process.exit(1)
          break
        case 'EADDRINUSE':
          console.error(`${bind} is already in use`)
          process.exit(1)
          break
        default:
          throw err
      }
    })
  }
}
