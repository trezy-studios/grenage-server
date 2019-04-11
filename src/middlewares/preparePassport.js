// Module imports
import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcryptjs'
import passport from 'koa-passport'





// Local imports
import knex from '../database'





const preparePassport = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await knex('users').where({ id }).first()
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
      const user = await knex('users').where({ email }).first()

      if (!user) {
        return done(null, false)
      }

      if (bcrypt.compareSync(password, user.password)) {
        return done(null, user)
      }

      return done(null, false)
    } catch (error) {
      return done(err)
    }
  }))
}





export { preparePassport }
