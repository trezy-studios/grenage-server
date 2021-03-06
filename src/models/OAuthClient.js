// Module imports
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import uuid from 'uuid/v4'





// Local imports
import { BaseModel } from './Base'
import { OAuthClientPresenter } from '../presenters'





// Local constants
const type = 'oauth-clients'





class OAuthClientModel extends BaseModel {
  /***************************************************************************\
    Class Properties
  \***************************************************************************/

  presenter = OAuthClientPresenter

  requiredAttributes = [
    'name',
    'ownerID',
  ]

  static type = type

  type = type





  /***************************************************************************\
    Static Methods
  \***************************************************************************/

  static getBasicAuthFromContext = context => {
    const authorizationHeader = context.get('Authorization')
    const basicAuthHeaderPrefix = 'Basic '

    if (authorizationHeader.startsWith(basicAuthHeaderPrefix)) {
      const authorizationString = Buffer.from(authorizationHeader.substring(basicAuthHeaderPrefix.length), 'base64').toString('utf8')
      return authorizationString.split(':')
    }

    return []
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  beforeSave = () => {
    if (this.isNew) {
      this.secret = crypto.randomBytes(32).toString('hex')
      this.update({ secret: bcrypt.hashSync(this.secret, bcrypt.genSaltSync()) })
    }
  }

  render = () => {
    const { safeAttributes } = this

    if (this.secret) {
      safeAttributes.secret = this.secret
    }

    return this.presenter.render({ ...safeAttributes })
  }





  /***************************************************************************\
    Getters
  \***************************************************************************/

  get safeAttributes () {
    const safeAttributes = { ...this.attributes }

    delete safeAttributes.secret

    return safeAttributes
  }
}





export { OAuthClientModel }
