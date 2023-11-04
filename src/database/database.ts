import { knex as setupKnex, Knex } from 'knex'
import { env } from '../env'

export const config: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection: {
    database: env.DATABASE,
    user: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
  },
  migrations: {
    extension: 'ts',
    directory: './src/database/migrations',
  },
  seeds: {
    extension: 'ts',
    directory: './src/database/seeds',
  },
}

export const knex = setupKnex(config)
