import * as express from 'express'
import * as bodyParser from 'body-parser'
import routes from './routes'

export const initializeServer = () => {
  const app = express()

  app.use(bodyParser.json())
  app.use(routes)

  return app
}
