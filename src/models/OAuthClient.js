// Module imports
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
      this.update({ secret: crypto.randomBytes(64).toString('hex') })
    }
  }
}





export { OAuthClientModel }
