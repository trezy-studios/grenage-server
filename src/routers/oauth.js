// Module imports
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import passport from 'koa-passport'
import Router from 'koa-router'





// Local imports
import {
  OAuthClientModel,
  UserModel,
} from '../models'
import { OAuthClientPresenter } from '../presenters'





// Local constants
const oauthRouter = new Router({ prefix: '/oauth' })





// Create a new OAuth client
oauthRouter.post('/clients/new',
  passport.authenticate('bearer', { session: false }),
  async (context, next) => {
    const {
      name,
      redirectURI,
    } = context.request.body
    const ownerID = context.state.user.id
    const oAuthClient = new OAuthClientModel({
      name,
      ownerID,
      redirectURI,
    })

    try {
      await oAuthClient.save()
      context.data = oAuthClient.render()
    } catch (error) {
      context.status = 500
      context.errors.push(error)
    }
  }
)





// Get all OAuth clients for the current user
oauthRouter.get('/clients',
  passport.authenticate('bearer', { session: false }),
  async (context, next) => {
    const clients = await OAuthClientModel.find({ ownerID: context.state.user.id })

    try {
      context.data = OAuthClientModel.renderList(clients)
    } catch (error) {
      context.status = 401
      context.errors.push(error)
    }
  }
)





// Get OAuth client by ID
oauthRouter.get('/clients/:id',
  passport.authenticate('bearer', { session: false }),
  async (context, next) => {
    try {
      const client = await OAuthClientModel.findByID(context.params.id)
      context.data = client.render()
    } catch (error) {
      context.status = 401
      context.errors.push(error)
    }
  }
)





export { oauthRouter }
