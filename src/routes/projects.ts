import { Router } from 'express'
import {
  getprojects,
  createproject,
  updateproject,
  deleteproject,
} from '../controllers/projectsController'

export const projects = Router()

projects.get('/projects', getprojects)

projects.post('/projects', createproject)

projects.put('/projects/:id', updateproject)

projects.delete('/projects/:id', deleteproject)
