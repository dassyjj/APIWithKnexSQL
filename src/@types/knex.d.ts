import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    users: {
      id: string
      username: string
      created_at: string
      update_at: string
    }
    projects: {
      id: string
      user_id: string
      title: string
      created_at: string
      update_at: string
      deleted_at: Date
    }
  }
}
