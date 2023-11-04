/* eslint-disable camelcase */
import { Request, Response } from 'express'
import { z } from 'zod'
import { knex } from '../database/database'

export async function getprojects(req: Request, res: Response) {
  const querySchema = z.object({
    user_id: z.string(),
    page: z.coerce.number().default(1),
  })

  const { user_id, page } = querySchema.parse(req.query)

  const [count]: Array<{ count: string }> = await knex('projects')
    .where({ user_id })
    .count()

  await knex('projects')
    .limit(5)
    .offset((page - 1) * 5)
    .where({ user_id })
    .join('users', 'users.id', '=', 'projects.user_id')
    .select('projects.*', 'users.username')
    .where('users.deleted_at', null)
    .then((projects) => {
      res
        .status(200)
        .header('X-amount-projects', count.count)
        .send({ projects })
    })
    .catch((e) => {
      res.status(404).send({ e })
    })
}

export async function createproject(req: Request, res: Response) {
  const querySchema = z.object({
    user_id: z.string(),
  })

  const { user_id } = querySchema.parse(req.query)

  const projectBodySchema = z.object({
    title: z.string(),
  })

  const { title } = projectBodySchema.parse(req.body)

  await knex('projects')
    .insert({
      title,
      user_id,
    })
    .then(() => {
      res.status(201).send()
    })
    .catch((e) => {
      res.status(400).send({ error: e.message })
    })
}

export async function updateproject(req: Request, res: Response) {
  const querySchema = z.object({
    user_id: z.string(),
  })
  const { user_id } = querySchema.parse(req.query)

  const projectParamsSchema = z.object({
    id: z.string(),
  })
  const { id } = projectParamsSchema.parse(req.params)

  const projectBodySchema = z.object({
    title: z.string(),
  })

  const { title } = projectBodySchema.parse(req.body)

  const projectToBeChanged = await knex('projects')
    .where({
      id,
      user_id,
    })
    .first()

  await knex('projects')
    .where({
      id,
      user_id,
    })
    .first()
    .update({
      id,
      user_id,
      title,
      created_at: projectToBeChanged.created_at,
    })
    .then(() => {
      res.status(201).send()
    })
    .catch((e) => {
      res.status(400).send({ error: e.message })
    })
}

export async function deleteproject(req: Request, res: Response) {
  const querySchema = z.object({
    user_id: z.string(),
  })
  const { user_id } = querySchema.parse(req.query)

  const projectParamsSchema = z.object({
    id: z.string(),
  })
  const { id } = projectParamsSchema.parse(req.params)

  await knex('projects')
    .where({
      id,
      user_id,
    })
    .first()
    .del()
    .then(() => {
      res.status(204).send()
    })
    .catch((err) => {
      res.status(400).send({ error: err })
    })
}
