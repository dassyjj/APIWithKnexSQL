import { Knex } from 'knex'
import { onUpdateTrigger } from '../../utils/UpdateTrigger'

export async function up(knex: Knex): Promise<void> {
  await knex.schema
    .createTable('projects', (table) => {
      table.increments('id')
      table
        .integer('user_id')
        .references('users.id')
        .notNullable()
        .onDelete('CASCADE')
      table.text('title').notNullable()
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('update_at').defaultTo(knex.fn.now())
    })
    .then(() => {
      knex.raw(onUpdateTrigger('projects'))
    })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('projects')
}
