import { connection } from '../connection';
import { Db } from 'mongodb';

export interface User {
  email: string;
  password: string;
}

const fromUsersCollection = (db: Db) => db.collection('users')

export const getAllUsers = () =>
  connection
    .then(fromUsersCollection)
    .then(users => users.find<User>())
    .then(users => users.toArray())

export const createUser = (user: any) =>
  connection
    .then(fromUsersCollection)
    .then(users => users.insertOne(user))

export const findUser = (email: string) =>
  connection
    .then(fromUsersCollection)
    .then(users => users.findOne<User>({ email }))
