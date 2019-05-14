// Module imports
import bcrypt from 'bcryptjs'





// Local imports
import {
  AccessTokenModel,
  OAuthClientModel,
} from '../models'





const verifyCredentials = () => async (context, next) => {
  const accessToken = AccessTokenModel.getBearerAuthFromContext(context)
  const [clientID, clientSecret] = OAuthClientModel.getBasicAuthFromContext(context)

  if (clientID) {
    const client = await OAuthClientModel.findByID(clientID)

    if (!client) {
      context.status = 400
      return context.errors.push(`No OAuth client exists with an ID of ${clientID}`)
    }

    const authorized = await bcrypt.compare(clientSecret, client.attributes.secret)

    if (!authorized) {
      context.status = 400
      return context.errors.push('The OAuth client secret that was provided was incorrect. This action has been logged and the owner of the OAuth client will be notified.')
    }

    context.state.client = await client
  }

  if (accessToken) {
    const [accessTokenModel] = await AccessTokenModel.find({ token: accessToken })

    if (!accessTokenModel) {
      context.status = 400
      return context.errors.push(`Invalid access token`)
    }

    context.state.accessToken = accessTokenModel
  }

  await next()
}





export { verifyCredentials }
