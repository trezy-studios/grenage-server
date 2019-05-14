// Module imports
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
import bcrypt from 'bcryptjs'
import passport from 'koa-passport'





// Local imports
import {
  AccessTokenModel,
  UserModel,
} from '../models'
import knex from '../database'





const preparePassport = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await UserModel.findByID(id)
      done(null, user)
    } catch (error) {
      done(error, null)
    }
  })

  const options = {
    usernameField: 'email',
  }

  passport.use(new LocalStrategy(options, async (email, password, done) => {
    try {
      const [user] = await UserModel.find({ email })

      if (!user) {
        return done(null, false)
      }

      if (bcrypt.compareSync(password, user.password)) {
        return done(null, user)
      }

      return done(null, false)
    } catch (error) {
      return done(error)
    }
  }))

  passport.use(new BearerStrategy(async (token, done) => {
    try {
      const [accessToken] = await AccessTokenModel.find({ token })

      if (!accessToken) {
        return done(null, false)
      }

      const userModel = await UserModel.findByID(accessToken.attributes.userID)

      done(null, userModel.safeAttributes, { scope: 'all' })
    } catch (error) {
      return done(error)
    }
  }))
}





export { preparePassport }
