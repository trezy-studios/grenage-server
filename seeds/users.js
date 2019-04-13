require('@babel/register')





// Module imports
const faker = require('faker')





// Local imports
const {
  CharacterModel,
  UserModel,
} = require('../src/models')





// Local constants
const generateUserObject = () => (new UserModel({
  email: faker.internet.email(),
  password: faker.internet.password(),
})).attributes

const generateCharacterObject = userID => {
  const character = new CharacterModel({
    ancestry: 'human',
    name: faker.name.findName(),
    experiencePoints: faker.random.number(),
    hitPoints: faker.random.number(),
    userID,
  })

  if (character.validate()) {
    return character.attributes
  }

  return null
}





module.exports = {
  async seed (knex, Promise) {
    faker.seed(1)

    // Empty tables
    await knex('characters').del()
    await knex('users').del()

    // Create users
    const userIDs = await knex('users').insert(Array(100).fill(0).map(generateUserObject)).returning('id')

    for (const userID of userIDs) {
      await knex('characters').insert(Array(6).fill(0).map(() => generateCharacterObject(userID)))
    }
  }
}
