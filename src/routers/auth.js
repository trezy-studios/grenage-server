// Module imports
import bcrypt from 'bcryptjs'
import passport from 'koa-passport'
import Router from 'koa-router'





// Local imports
import { UserPresenter } from '../presenters/Users'
import { UserModel } from '../models/User'





// Local constants
const authRouter = new Router





// Login
authRouter.post('/login', async (context, next) => {
  const {
    email,
    password,
  } = context.request.body

  return passport.authenticate('local', async (error, user, info, status) => {
    if (user) {
      await context.login(user)
      context.data = UserPresenter.render(user)
    } else {
      context.errors = [status]
    }
  })(context)
})





// Logout
authRouter.post('/logout', async context => {
  if (context.isAuthenticated()) {
    context.logout()
  }
})





// Register
authRouter.post('/register', async (context, next) => {
  const {
    email,
    password,
  } = context.request.body

  try {
    const userModel = new UserModel({
      email: email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync()),
    })
    const results = await context.knex('users').insert(userModel.attributes).returning('*')

    return passport.authenticate('local', async (error, user, info, status) => {
      if (user) {
        await context.login(user)
        context.data = UserPresenter.render(user)
      } else {
        context.errors = [status]
      }
    })(context, next)
  } catch (error) {
    context.errors = [error]
  }
})





export { authRouter }
