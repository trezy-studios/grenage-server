// Module imports
import bcrypt from 'bcryptjs'
import passport from 'koa-passport'
import Router from 'koa-router'





// Local imports
import { UsersPresenter } from '../presenters'
import { UserModel } from '../models'





// Local constants
const authRouter = new Router({ prefix: '/auth' })





// Login
authRouter.post('/login', async (context, next) => {
  const {
    email,
    password,
  } = context.request.body

  return passport.authenticate('local', async (error, user, info, status) => {
    if (user) {
      await context.login(user)

      const userModel = new UserModel(user)

      context.data = userModel.render()
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
    const [newUser] = await context.knex('users').insert(userModel.attributes).returning('*')

    userModel.update(newUser)

    return passport.authenticate('local', async (error, user, info, status) => {
      if (user) {
        await context.login(user)
        context.data = userModel.render()
      } else {
        context.errors = [status]
      }
    })(context)
  } catch (error) {
    context.errors = [error]
  }
})





export { authRouter }
