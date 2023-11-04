import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('projects').del()

  // Inserts seed entries
  await knex('projects').insert([
    { title: 'project01', user_id: 1 },
    { title: 'project02', user_id: 2 },
  ])
}
