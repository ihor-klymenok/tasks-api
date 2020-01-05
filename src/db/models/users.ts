import { connection } from '../connection';
import { Db } from 'mongodb';

export function createUserRepository(dbConnection: Promise<Db>) {

}

export async function getAllUsers() {
  const db = await connection;

  return db.collection('users').find().toArray();
}

export async function createUser(name, surname) {
  const db = await connection;

  return db.collection('users')
    .insertOne({ name, surname })
}
