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
    Public Methods
  \***************************************************************************/

  beforeSave = () => {
    if (this.isNew) {
      this.secret = crypto.randomBytes(32).toString('hex')
      this.update({ secret: bcrypt.hashSync(this.secret, bcrypt.genSaltSync()) })
    }
  }

  render = () => {
    const safeAttributes = { ...this.attributes }

    delete safeAttributes.secret

    if (this.secret) {
      safeAttributes.secret = this.secret
    }

    return this.presenter.render({ ...safeAttributes })
    }





  /***************************************************************************\
    Getters
  \***************************************************************************/

  get secret () {
    return this.attributes.secret
  }
}





export { OAuthClientModel }
