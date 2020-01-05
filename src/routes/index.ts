import { Router } from 'express'
import authenticationRoutes from './auth'
import tasksRoutes from './tasks'

export default Router()
  .use('/auth', authenticationRoutes)
  .use('/tasks', tasksRoutes)
