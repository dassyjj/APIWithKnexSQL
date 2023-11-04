import { Request, Response } from 'express'
import { z } from 'zod'
import { knex } from '../database/database'

export async function getUsers(req: Request, res: Response) {
  await knex('users')
    .where({ deleted_at: null })
    .then((users) => {
      res.status(200).send({ users })
    })
    .catch((e) => {
      res.status(404).send({ e })
    })
}

export async function createUser(req: Request, res: Response) {
  const userBodySchema = z.object({
    username: z.string(),
  })

  const { username } = userBodySchema.parse(req.body)

  await knex('users')
    .insert({ username })
    .then(() => {
      res.status(201).send()
    })
    .catch((e) => {
      res.status(400).send({ error: e.message })
    })
}

export async function updateUser(req: Request, res: Response) {
  const userBodySchema = z.object({
    username: z.string(),
  })

  const userParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = userParamsSchema.parse(req.params)

  const { username } = userBodySchema.parse(req.body)

  const userToBeChanged = await knex('users').where({ id }).first()

  await knex('users')
    .where({ id })
    .first()
    .update({
      id,
      username,
      created_at: userToBeChanged.created_at,
    })
    .then(() => {
      res.status(201).send()
    })
    .catch((e) => {
      res.status(400).send({ error: e.message })
    })
}

export async function deleteUser(req: Request, res: Response) {
  const userParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = userParamsSchema.parse(req.params)

  await knex('users')
    .where({ id })
    .first()
    .update({
      deleted_at: new Date(),
    })
    .then(() => {
      res.status(204).send()
    })
    .catch((err) => {
      res.status(400).send({ error: err })
    })
}
