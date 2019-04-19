const uuid = require('uuid/v4')

module.exports = {
  up: knex => {
    return knex.schema.createTable('oauth-clients', table => {
      table.uuid('id').primary()
      table.string('name').unique().notNullable()
      table.string('redirectURI').notNullable()
      table.string('secret').unique().notNullable()
      table.uuid('ownerID').notNullable()
      table.foreign('ownerID').references('users.id')
      table.timestamps(false, true)
    })
  },

  down: knex => knex.schema.dropTable('oauth-clients')
}
