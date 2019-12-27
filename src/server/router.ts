import * as Express from 'express'
import * as renderer from './controllers/renderer'

export default function router(app: Express.Application) {
  app.get('*', renderer.get)
}
