import { config } from 'dotenv'
import { join } from 'path'
import { cpus } from 'os'
import cluster from 'cluster'
import { runServer } from './server'

const isProd = process.env.NODE_ENV === 'production'

config({
  path: isProd ? join(__dirname, '../../.env.prod') : join(__dirname, '../../.env.dev'),
})

if (isProd) {
  const numCPUs = cpus().length

  if (cluster.isMaster) {
    ;[...new Array(numCPUs)].forEach(() => {
      const worker = cluster.fork()

      console.log(`CLUSTER: Worker ${worker.id} started`)
    })

    cluster.on('exit', (worker, code, signal) => {
      console.log(`Restarting ${worker.process.pid}. ${code || signal}`)
      cluster.fork()
    })
  } else {
    runServer(numCPUs)
  }
} else {
  runServer(1)
}

process.on('uncaughtException', err => {
  console.error(err)
  process.exit(1)
})

process.on('unhandledRejection', err => {
  console.error(err)
})
