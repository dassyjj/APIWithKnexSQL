import { Knex } from 'knex'
import { onUpdateTrigger } from '../../utils/UpdateTrigger'

export async function up(knex: Knex): Promise<void> {
  await knex.schema
    .createTable('users', (table) => {
      table.increments('id')
      table.text('username').unique().notNullable()
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('update_at').defaultTo(knex.fn.now())
    })
    .then(() => {
      knex.raw(onUpdateTrigger('users'))
    })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users')
}
