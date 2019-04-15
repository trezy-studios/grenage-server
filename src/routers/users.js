// Module imports
import Router from 'koa-router'





// Local imports
import { UserPresenter } from '../presenters'
import { UserModel } from '../models'





// Local constants
const usersRouter = new Router({ prefix: '/users' })





// Get current user
usersRouter.get('/', async (context, next) => {
  if (!context.isAuthenticated()) {
    context.errors.push('User is not authenticated')
    return context.status = 403
  }

  const user = new UserModel(await context.knex('users').where({ id: context.state.user.id }).first())

  context.data = user.render()
})





// Get user by ID
usersRouter.get('/:id', async (context, next) => {
  if (!context.isAuthenticated()) {
    context.errors.push('User is not authenticated')
    return context.status = 403
  }

  const user = new UserModel(await context.knex('users').where({ id: context.params.id }).first())

  context.data = user.render()
})





export { usersRouter }
