// Module imports
import passport from 'koa-passport'
import Router from 'koa-router'





// Local imports
import {
  AccessTokenModel,
  UserModel,
} from '../models'





// Local constants
const authRouter = new Router({ prefix: '/auth' })





// Login
authRouter.post('/login',
  async (context, next) => {
    const {
      email,
      password,
    } = context.request.body
    const { id: clientID } = context.state.client || {}

    // if (!clientID) {
    //   context.errors.push('An OAuth client ID must be provided to login.')
    //   context.status = 401

    //   return false
    // }

    await passport.authenticate('local', async (error, user, info, status) => {
      if (user) {
        const accessTokenModel = new AccessTokenModel({
          clientID,
          user,
        })

        await context.login(user)
        await accessTokenModel.save()

        context.data = accessTokenModel.render()
      } else {
        context.status = 401
        context.errors.push(error)
      }
    })(context)
  }
)





// Logout
authRouter.post('/logout',
  passport.authenticate('bearer', { session: false }),
  async context => {
    const { accessToken } = context.state
    await accessToken.delete()
  },
)





// Register
authRouter.post('/register',
  async context => {
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

      await passport.authenticate('local', async (error, user, info, status) => {
        if (user) {
          const accessTokenModel = new AccessTokenModel({ user })

          await accessTokenModel.save()

          context.data = accessTokenModel.render()
        } else {
          context.status = 500
          context.errors.push(error)
        }
      })(context)
    } catch (error) {
      context.status = 500
      context.errors.push(error)
    }
  }
)





export { authRouter }
