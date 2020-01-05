import { Router } from 'express'
import { getAllUsers } from '../db/models/users';
import { signInUser, signUpUser } from "../services/users";
import * as jwt from 'jsonwebtoken';
import { config } from '../shared/config';
import { authorize } from '../middlewares/authentication';

export const router = Router();

router.post('/sign-in', (req, res) => {
  signInUser(req.body)
    .then(user => jwt.sign(user, config('JWT_SECRET')))
    .then(token => res.json({ token }))
    .catch(err => res.json({ error: err.message }))
})

router.post('/sign-up', (req, res) => {
  signUpUser(req.body)
    .then(() => res.sendStatus(200))
    .catch(err => res.json({ error: err.msg }))
})

router.get('/users', authorize, (req, res) => {
  getAllUsers()
    .then(users => res.json(users))
    .catch(err => res.json({ error: err.msg }));
})
