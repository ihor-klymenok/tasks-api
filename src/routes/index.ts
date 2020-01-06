import { Router } from 'express'
import authenticationRoutes from './auth'
import tasksRoutes from './tasks'
import { handleErrors } from '../middlewares/error-handler'

export default Router()
  .use('/auth', authenticationRoutes)
  .use('/tasks', tasksRoutes)
  .use(handleErrors)
