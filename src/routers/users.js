// Module imports
import passport from 'koa-passport'
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
usersRouter.get('/',
  passport.authenticate('bearer', { session: false }),
  async (context, next) => {
    const user = await UserModel.findByID(context.state.user.id)
    const characters = await context.knex('characters').where({ userID: user.id })

    user.update({ characters })

    context.data = user.render()
  }
)





// Get user by ID
usersRouter.get('/:id',
  passport.authenticate('bearer', { session: false }),
  async (context, next) => {
    const user = await UserModel.findByID(context.params.id)

    context.data = user.render()
  }
)





export { usersRouter }
