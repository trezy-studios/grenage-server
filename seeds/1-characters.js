require('@babel/register')





// Module imports
const faker = require('faker')





// Local imports
const { CharacterModel } = require('../src/models/Character')





// Local constants
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

    await knex('characters').del()

    const userIDs = (await knex('users').select('id')).map(({ id }) => id)

    for (const userID of userIDs) {
      await knex('characters').insert(Array(6).fill(0).map(() => generateCharacterObject(userID)))
    }
  }
}
