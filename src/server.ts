import express from 'express'
import { users } from './routes/users'
import { projects } from './routes/projects'

import { env } from './env'

const app = express()

app.use(express.json())
app.use(users)
app.use(projects)

app.listen(env.PORT, () => {
  console.log('HTTP server is running!')
})
