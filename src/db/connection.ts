import { MongoClient } from 'mongodb'
import { config } from '../shared/config'

const DB_URL = config('DB_URL')
const DB_NAME = config('DB_NAME')

export const connection = MongoClient.connect(DB_URL, { useUnifiedTopology: true })
  .then(c => c.db(DB_NAME))
