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
import Router from 'koa-router'
import path from 'path'





// Local imports
import {
  bodyBuilder,
  prepareDatabase,
  preparePassport,
  statusCodeGenerator,
  verifyCredentials,
} from './middlewares'
import { generateRandomKey } from './helpers'
import {
  authRouter,
  charactersRouter,
  oauthRouter,
  pingRouter,
  usersRouter,
} from './routers'





// Constants
const {
  GRENAGE_API_PORT,
  GRENAGE_API_SECRET_KEY,
} = process.env
const app = new Koa()
const router = new Router()

app.keys = [GRENAGE_API_SECRET_KEY]





app.use(noTrailingSlash())
app.use(logger())
app.use(compress())
app.use(cors())
app.use(prepareDatabase())
app.use(body())
app.use(statusCodeGenerator())
app.use(bodyBuilder())
app.use(verifyCredentials())

preparePassport()
const passport = require('koa-passport')

app.use(passport.initialize())

router.use(authRouter.routes())
router.use(charactersRouter.routes())
router.use(oauthRouter.routes())
router.use(pingRouter.routes())
router.use(usersRouter.routes())
app.use(router.routes())
app.use(router.allowedMethods())

console.log(`HTTP Server listening on port ${GRENAGE_API_PORT}`)
app.listen(GRENAGE_API_PORT)
