// Module imports
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import oauth2orize from 'oauth2orize-koa-fr'
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
const oauthServer = oauth2orize.createServer()





// OAuth server setup
oauthServer.serializeClient(client => {
  return client.data.id
})

oauthServer.deserializeClient(async id => {
  const client = await Client.findById(id)

  if (!client) {
    return false
  }

  return client
})

oauthServer.exchange(oauth2orize.exchange.password(async (client, username, password) => {
  const user = await Authentication.passwordAuthenticate({email: username, password})

  if (!user) {
    return false
  }

  const token = await Token.create({
    value: crypto.randomBytes(global.OAUTH_TOKEN_LENTH).toString('hex'),
    clientID: client.id,
    userID: user.id,
    scope: ['*']
  })

  return token.value
}))





// Create a new OAuth client
oauthRouter.post('/clients/new', async (context, next) => {
  if (context.isUnauthenticated()) {
    context.errors.push('User is not authenticated')
    return context.status = 403
  }

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
    context.errors.push(error)
  }
})





// Get all OAuth clients for the current user
oauthRouter.get('/clients', async (context, next) => {
  if (context.isUnauthenticated()) {
    context.errors.push('User is not authenticated')
    return context.status = 403
  }

  const clients = await OAuthClientModel.find({ ownerID: context.state.user.id })

  try {
    context.data = OAuthClientPresenter.render(clients.map(client => client.attributes))
  } catch (error) {
    context.errors.push(error)
  }
})





// Get OAuth client by ID
oauthRouter.get('/clients/:id', async (context, next) => {
  if (context.isUnauthenticated()) {
    context.errors.push('User is not authenticated')
    return context.status = 403
  }

  try {
    const client = await OAuthClientModel.findByID(context.params.id)
    context.data = client.render()
  } catch (error) {
    context.errors.push(error)
  }
})





export { oauthRouter }
