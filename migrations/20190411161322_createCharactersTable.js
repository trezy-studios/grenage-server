const uuid = require('uuid/v4')

module.exports = {
  up: knex => {
    return knex.schema.createTable('characters', table => {
      table.uuid('id').primary()
      table.enum('ancestry', ['dwarf', 'elf', 'human', 'orc']).notNullable()
      table.string('name').unique().notNullable()
      table.integer('experiencePoints').notNullable()
      table.integer('hitPoints').notNullable()
      table.uuid('userID')
      table.foreign('userID').references('users.id')
      table.timestamps(false, true)
    })
  },

  down: knex => {
    knex.schema.dropTable('characters')
  },
}
