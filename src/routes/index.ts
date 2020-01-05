import { Router } from 'express'
import { getAllUsers, createUser } from '../db/models/users';

export const router = Router();

router.get('/users', (req, res) => {
  getAllUsers()
    .then(users => {
      res.json(users)
    })
    .catch(err => res.json({ error: err.msg }));
})

router.post('/users', (req, res) => {
  const { name, surname } = req.body;

  createUser(name, surname)
    .then(() => res.sendStatus(200))
    .catch(err => res.json({ error: err.msg }))
})
