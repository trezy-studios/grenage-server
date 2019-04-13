require('@babel/register')





// Module imports
const faker = require('faker')





// Local imports
const { UserModel } = require('../src/models/User')





// Local constants
const generateUserObject = () => (new UserModel({
  email: faker.internet.email(),
  password: faker.internet.password(),
})).attributes





module.exports = {
  async seed (knex, Promise) {
    faker.seed(1)

    await knex('users').del()
    await knex('users').insert(Array(100).fill(0).map(generateUserObject))
  }
}
