// Module imports
import passport from 'koa-passport'
import Router from 'koa-router'





// Local imports
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
      const userModel = new UserModel(user)

      await context.login(user)

      context.data = userModel.render()
    } else {
      context.errors = [error]
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
      email,
      password,
    })

    await userModel.save()

    return passport.authenticate('local', async (error, user, info, status) => {
      if (user) {
        await context.login(user)
        context.data = userModel.render()
      } else {
        context.errors = [status]
      }
    })(context)
  } catch (error) {
    context.errors.push(error)
  }
})





export { authRouter }
