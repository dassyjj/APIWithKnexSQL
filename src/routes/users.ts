import { Router } from 'express'
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/userController'

export const users = Router()

users.get('/users', getUsers)

users.post('/users', createUser)

users.put('/users/:id', updateUser)

users.delete('/users/:id', deleteUser)
