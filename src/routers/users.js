// Module imports
import Router from 'koa-router'





// Local imports
import { UsersPresenter } from '../presenters'
import {
  CharacterModel,
  UserModel,
} from '../models'





// Local constants
const usersRouter = new Router({ prefix: '/users' })





// Get current user
usersRouter.get('/', async (context, next) => {
  if (context.isUnauthenticated()) {
    context.errors.push('User is not authenticated')
    return context.status = 403
  }

  const user = await context.knex('users').where({ id: context.state.user.id })
  const characters = await context.knex('characters').where({ userID: context.state.user.id })

  const userModel = new UserModel(await context.knex('users').where({ id: context.state.user.id }).first())

  userModel.update({
    characters,
  })

  context.data = userModel.render()
})





// Get user by ID
usersRouter.get('/:id', async (context, next) => {
  if (context.isUnauthenticated()) {
    context.errors.push('User is not authenticated')
    return context.status = 403
  }

  const user = new UserModel(await context.knex('users').where({ id: context.params.id }).first())

  context.data = user.render()
})





export { usersRouter }
