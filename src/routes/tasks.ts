import { Router, Request, Response } from 'express'
import { authorize } from '../middlewares/authentication'
import * as tasks from '../db/models/tasks';

const getAllTasks = (req: Request, res: Response) => {
  tasks.findAll((<any> req).user._id)
    .then(tasks => res.json({ tasks }))
    .catch(err => res.json({ error: err.messsage }))
}

const getTask = (req: Request, res: Response) => {
  tasks.findOne(req.params.id)
    .then(task => res.json({ task }))
    .catch(err => res.json({ error: err.messsage }))
}

const createTask = (req: Request, res: Response) => {
  tasks.create({ ...req.body, userId: (<any>req).user._id})
    .then(() => res.sendStatus(200))
    .catch(err => res.json({ error: err.messsage }))
}

const partialUpdateTask = (req: Request, res: Response) => {
  tasks.partialUpdate(req.params.id, req.body)
    .then(() => res.sendStatus(200))
    .catch(err => res.json({ error: err.messsage }))
}

const deleteTask = (req: Request, res: Response) => {
  tasks.deleteOne(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(err => res.json({ error: err.messsage }))
}

export default Router()
  .get('/', authorize, getAllTasks)
  .get('/:id', authorize, getTask)
  .post('/', authorize, createTask)
  .patch('/:id', authorize, partialUpdateTask)
  .delete('/:id', authorize, deleteTask)
