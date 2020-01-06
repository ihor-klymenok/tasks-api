import { Router, Request, Response, NextFunction } from 'express'
import * as authorization from '../services/authorization';

const signInUser = (req: Request, res: Response, next: NextFunction) => {
  authorization.signInUser(req.body)
    .then(token => res.json({ token }))
    .catch(next)
}

const signUpUser = (req: Request, res: Response, next: NextFunction) => {
  authorization.signUpUser(req.body)
    .then(() => res.sendStatus(200))
    .catch(next)
}

export default Router()
  .post('/sign-in', signInUser)
  .post('/sign-up', signUpUser)
