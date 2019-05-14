const uuid = require('uuid/v4')

module.exports = {
  up: knex => {
    return knex.schema.createTable('access-tokens', table => {
      table.string('token').primary()
      table.uuid('userID').notNullable()
      table.foreign('userID').references('users.id')
      table.uuid('clientID')
      table.foreign('clientID').references('oauth-clients.id')
      table.timestamps(false, true)
    })
  },

  down: knex => knex.schema.dropTable('access-tokens')
}
