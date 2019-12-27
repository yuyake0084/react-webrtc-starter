import * as Express from 'express'
import * as renderer from './controllers/renderer'

export default function router(app: Express.Application) {
  app.use('/favicon.ico', (req, res) => res.status(200).send())
  app.use('/robots.txt', Express.static('dist/client/robots.txt'))

  app.use('/public', Express.static('dist/client'))

  app.get('*', renderer.get)
}
