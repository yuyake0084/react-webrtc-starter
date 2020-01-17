import { createServer } from 'http'
import { cpus } from 'os'
import { config } from 'dotenv'
import { join } from 'path'
import express from 'express'
import sticky from 'sticky-session'
import * as bodyParser from 'body-parser'
import compression from 'compression'

import { router } from './router'
import { connectSocket } from './socket'

const isProd = process.env.NODE_ENV === 'production'

config({
  path: isProd ? join(__dirname, '../../.env.prod') : join(__dirname, '../../.env.dev'),
})

function runServer(): void {
  const app = express()
  const port = process.env.PORT || 3000

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

    if (isProd) {
      const workers = cpus().length
      const isWorker = sticky.listen(server, port as number, {
        workers,
      })

      if (!isWorker) {
        server.once('listening', () => {
          console.log(`[${process.env.NODE_ENV}]: Listening on ${port}🎉`)
        })
      } else {
        connectSocket(server)
      }
    } else {
      server.listen(port, () => {
        console.log(`[${process.env.NODE_ENV}]: Listening on ${port}🎉`)
      })
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

runServer()

process.on('uncaughtException', err => {
  console.error(err)
  process.exit(1)
})

process.on('unhandledRejection', err => {
  console.error(err)
})
