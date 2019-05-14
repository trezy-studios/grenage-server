// Module imports
import crypto from 'crypto'





// Local imports
import { BaseModel } from '.'
import { AccessTokensPresenter } from '../presenters'





// Local constants
const type = 'access-tokens'





class AccessTokenModel extends BaseModel {
  /***************************************************************************\
    Static Methods
  \***************************************************************************/

  static getBearerAuthFromContext = context => {
    const authorizationHeader = context.get('Authorization')
    const bearerAuthHeaderPrefix = 'Bearer '

    if (authorizationHeader.startsWith(bearerAuthHeaderPrefix)) {
      return authorizationHeader.substring(bearerAuthHeaderPrefix.length)
    }

    return null
  }





  /***************************************************************************\
    Class Properties
  \***************************************************************************/

  ignoreOnSave = ['user']

  presenter = AccessTokensPresenter

  requiredAttributes = ['user']

  static type = type

  type = type





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  constructor (attributes = {}, options = {}) {
    options.generateID = false

    super(attributes, options)
  }

  delete = async () => {
    try {
      await AccessTokenModel.delete({ token: this.token })
      return true
    } catch (error) {
      throw error
    }
  }





  /***************************************************************************\
    Getters
  \***************************************************************************/

  get attributes () {
    return super.attributes
  }

  get safeAttributes () {
    return {
      token: this.token,
      user: this.user.safeAttributes,
    }
  }

  get user () {
    return this.attributes.user
  }

  get token () {
    return this.attributes.token
  }





  /***************************************************************************\
    Setters
  \***************************************************************************/

  set attributes (attributes) {
    super.attributes = attributes

    if (!attributes.token) {
      this._attributes.token = crypto.randomBytes(32).toString('hex')
    }

    if (attributes.user) {
      this._attributes.userID = attributes.user.id
    }
  }
}





export { AccessTokenModel }
