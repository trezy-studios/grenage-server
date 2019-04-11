const uuid = require('uuid/v4')

module.exports = {
  up: knex => {
    return knex.schema.createTable('users', table => {
      table.uuid('id').primary()
      table.string('email').unique().notNullable()
      table.string('password').notNullable()
      table.timestamps(false, true)
    })
  },

  down: knex => knex.schema.dropTable('users')
}
