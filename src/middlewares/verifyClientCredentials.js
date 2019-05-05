// Module imports
import bcrypt from 'bcryptjs'





// Local imports
import { OAuthClientModel } from '../models'





const verifyClientCredentials = () => async (context, next) => {
  const [clientID, clientSecret] = OAuthClientModel.getBasicAuthFromContext(context)

  if (clientID) {
    const client = await OAuthClientModel.findByID(clientID)

    if (!client) {
      return context.errors.push(`No OAuth client exists with an ID of ${clientID}`)
    }

    const authorised = await bcrypt.compare(clientSecret, client.secret)

    if (!authorised) {
      return context.errors.push('The OAuth client secret that was provided was incorrect. This action has been logged and the owner of the OAuth client will be notified.')
    }

    context.state.client = await client
  }

  await next()
}





export { verifyClientCredentials }
