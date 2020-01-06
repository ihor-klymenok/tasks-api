import { Router, Request, Response, NextFunction } from 'express'
import { authorize } from '../middlewares/authentication'
import * as tasks from '../db/models/tasks'
import { buildPaginatedResponse } from '../services/pagination'

const getAllTasks = (req: Request, res: Response, next: NextFunction) => {
  const filters = {
    userId: (<any>req).user._id,
  }

  const pagination = {
    page: Number(req.query.page) - 1 || 0,
    size: Number(req.query.size) || 10,
  }

  const sort = {
    field: req.query.sortBy as keyof tasks.Task || '_id',
    order: Number(req.query.orderBy) || 1,
  }

  tasks.findAll(filters, pagination, sort)
    .then(([tasks, count]) => buildPaginatedResponse({ tasks }, { ...pagination, count }))
    .then(tasks => res.json(tasks))
    .catch(next)
}

const getTask = (req: Request, res: Response, next: NextFunction) => {
  tasks.findOne(req.params.id)
    .then(task => res.json({ task }))
    .catch(next)
}

const createTask = (req: Request, res: Response, next: NextFunction) => {
  tasks.create({ ...req.body, userId: (<any>req).user._id })
    .then(() => res.sendStatus(200))
    .catch(next)
}

const partialUpdateTask = (req: Request, res: Response, next: NextFunction) => {
  tasks.partialUpdate(req.params.id, req.body)
    .then(() => res.sendStatus(200))
    .catch(next)
}

const deleteTask = (req: Request, res: Response, next: NextFunction) => {
  tasks.deleteOne(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(next)
}

export default Router()
  .get('/', authorize, getAllTasks)
  .get('/:id', authorize, getTask)
  .post('/', authorize, createTask)
  .patch('/:id', authorize, partialUpdateTask)
  .delete('/:id', authorize, deleteTask)
