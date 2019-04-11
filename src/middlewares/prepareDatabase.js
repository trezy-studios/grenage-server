// Module imports
import knex from '../database'





const prepareDatabase = () => async (context, next) => {
  context.knex = knex

  await next()
}





export { prepareDatabase }
