import { Db, ObjectId, FindOneOptions } from 'mongodb'
import { connection } from '../../connection'
import { validateTask } from './schema'

export interface Task {
  _id: string
  userId: string
  title: string
  dueDate: Date
  priority: 'LOW' | 'NORMAL' | 'HIGH'
}

const fromTasksCollection = (db: Db) => db.collection('tasks')

export const create = (task: Task) => validateTask(task)
  .then(() => connection)
  .then(fromTasksCollection)
  .then(tasks => tasks.insert(task))

export const partialUpdate = (id: string, task: Partial<Task>) => connection
  .then(fromTasksCollection)
  .then(tasks => tasks.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: task }))

export const findOne = (id: string) => connection
  .then(fromTasksCollection)
  .then(tasks => tasks.findOne({ _id: new ObjectId(id) }))

export const findAll = (
  filters: Pick<Task, 'userId'>,
  pagination: { page: number, size: number } = { page: 0, size: 10 },
  sort?: { field: keyof Task, order: number },
) => {
  let options: Pick<FindOneOptions, 'limit' | 'skip' | 'sort'> = {
    limit: pagination.size,
    skip: pagination.page * pagination.size,
  }

  if (sort) {
    options = { ...options, sort: { [sort.field]: sort.order } }
  }

  return connection
    .then(fromTasksCollection)
    .then(tasks => Promise.all([
      tasks.find<Task>(filters, options),
      tasks.countDocuments(filters),
    ]))
    .then(tasksAndCount => Promise.all([
      tasksAndCount[0].toArray(),
      tasksAndCount[1],
    ]))
}

export const deleteOne = (id: string) => connection
  .then(fromTasksCollection)
  .then(tasks => tasks.deleteOne({ _id: new ObjectId(id) }))
