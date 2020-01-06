import { Router, Request, Response } from 'express'
import * as authorization from '../services/authorization';

const signInUser = (req: Request, res: Response) => {
  authorization.signInUser(req.body)
    .then(token => res.json({ token }))
    .catch(err => res.json({ error: err.message }))
}

const signUpUser = (req: Request, res: Response) => {
  authorization.signUpUser(req.body)
    .then(() => res.sendStatus(200))
    .catch(err => res.json({ error: err.msg }))
}

export default Router()
  .post('/sign-in', signInUser)
  .post('/sign-up', signUpUser)
