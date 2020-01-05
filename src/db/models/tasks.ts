import { connection } from '../connection'
import { Db, ObjectId } from 'mongodb'

export interface Task {
  userId: string;
  title: string;
  dueDate: Date;
  priority: 'LOW' | 'NORMAL' | 'HIGH'
}

const fromTasksCollection = (db: Db) => db.collection('tasks');

export const create = (task: Task) =>
  connection
    .then(fromTasksCollection)
    .then(tasks => tasks.insert(task))

export const partialUpdate = (id: string, task: Partial<Task>) =>
  connection
    .then(fromTasksCollection)
    .then(tasks => tasks.findOneAndUpdate({ _id: new ObjectId(id) }, task))

export const findOne = (id: string) =>
  connection
    .then(fromTasksCollection)
    .then(tasks => tasks.findOne({ _id: new ObjectId(id) }))

export const findAll = (userId: string) =>
  connection
    .then(fromTasksCollection)
    .then(tasks => tasks.find({ userId }))
    .then(tasks => tasks.toArray())

export const deleteOne = (id: string) =>
  connection
    .then(fromTasksCollection)
    .then(tasks => tasks.deleteOne({ _id: new ObjectId(id) }))

