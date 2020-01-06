import { Db } from 'mongodb'
import { connection } from '../../connection'
import { validateUser } from './schema'

export interface User {
  email: string
  password: string
}

const fromUsersCollection = (db: Db) => db.collection('users')

export const createUser = (user: any) => validateUser(user)
  .then(() => connection)
  .then(fromUsersCollection)
  .then(users => users.insertOne(user))

export const findUser = (email: string) => connection
  .then(fromUsersCollection)
  .then(users => users.findOne<User>({ email }))
