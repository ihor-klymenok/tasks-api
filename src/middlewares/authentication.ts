import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import { config } from '../shared/config'
import { AuthenticationError } from '../shared/errors'

export const authorize = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      return next(new AuthenticationError('Authorization header is required'))
    }

    const token = req.get('authorization').split(' ')[1]

    if (!token) {
      return next(new AuthenticationError('Authorization header should be in format `Bearer XXXXX`'))
    }

    const user = jwt.verify(token, config('JWT_SECRET'))
    // @ts-ignore
    req.user = user

    next()
  } catch (err) {
    next(new AuthenticationError(err.message))
  }
}
