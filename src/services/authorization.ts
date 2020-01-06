import { pbkdf2 } from 'crypto'
import * as jwt from 'jsonwebtoken'
import { User, createUser, findUser } from '../db/models/users'
import { config } from '../shared/config'
import { AuthenticationError } from '../shared/errors'

const salt = config('HASH_SALT')

const hashPassword = (password: string) => new Promise<string>((resolve, reject) => {
  pbkdf2(password, salt, 1000, 64, 'sha512', (err, key) => (err
    ? reject(err)
    : resolve(key.toString('hex'))))
})

export const signUpUser = (user: User) => hashPassword(user.password)
  .then(hash => ({ ...user, password: hash }))
  .then(createUser)

export const signInUser = async (user: User) => {
  const [password, foundUser] = await Promise.all([
    hashPassword(user.password),
    findUser(user.email),
  ])

  if (!foundUser || password !== foundUser.password) {
    throw new AuthenticationError('email/password is incorrect')
  }

  const token = jwt.sign(foundUser, config('JWT_SECRET'))

  return token
}
