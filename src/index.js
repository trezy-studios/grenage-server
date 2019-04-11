/* eslint-env node */

// Import variables from .env file.
require('dotenv').config()




// Module imports
import knex from 'knex'
import Koa from 'koa'
import body from 'koa-body'
import compress from 'koa-compress'
import cors from '@koa/cors'
import logger from 'koa-logger'
import noTrailingSlash from 'koa-no-trailing-slash'
import RedisStore from 'koa-redis'
import Router from 'koa-router'
import session from 'koa-session'
import path from 'path'





// Local imports
import {
  bodyBuilder,
  prepareDatabase,
  preparePassport,
} from './middlewares'
import { generateRandomKey } from './helpers'
import { authRouter } from './routers'





// Constants
const app = new Koa()
const router = new Router()

app.keys = [
  generateRandomKey(),
  generateRandomKey(),
]





app.use(noTrailingSlash())
app.use(logger())
app.use(compress())
app.use(cors())
app.use(prepareDatabase())
app.use(session({
  store: new RedisStore({
    host: 'redis',
  }),
}, app))
app.use(body())
app.use(bodyBuilder())

preparePassport()
const passport = require('koa-passport')

app.use(passport.initialize())
app.use(passport.session())

router.use('/auth', authRouter.routes())
app.use(router.routes())

console.log(`HTTP Server listening on port ${process.env.GRENAGE_API_PORT}`)
app.listen(process.env.GRENAGE_API_PORT)
