import * as convict from 'convict'
import * as dotenv from 'dotenv'

if (process.env.DOTENV) {
  dotenv.config({ path: process.env.DOTENV })
}

const definitions = {
  HASH_SALT: {
    env: 'HASH_SALT',
    format: 'String',
    default: 'SALT',
  },
  JWT_SECRET: {
    env: 'JWT_SECRET',
    format: 'String',
    default: 'SECRET',
  },
  DB_URL: {
    env: 'DB_ENV',
    format: 'String',
    default: 'mongodb://localhost:27017',
  },
  DB_NAME: {
    env: 'DB_NAME',
    format: 'String',
    default: 'tasksApi',
  },
}

const schema = convict(definitions)

schema.validate({ allowed: 'strict' })

export const config = (name: keyof typeof definitions) => {
  if (schema.get(name) !== null) {
    return schema.get(name)
  }

  throw Error(`environment variable ${definitions[name].env} is required`)
}
