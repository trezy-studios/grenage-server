// Module imports
import crypto from 'crypto'
import uuid from 'uuid/v4'





// Local imports
import { BaseModel } from './Base'
import { OAuthClientPresenter } from '../presenters'





class OAuthClientModel extends BaseModel {
  /***************************************************************************\
    Class Properties
  \***************************************************************************/

  presenter = OAuthClientPresenter

  requiredAttributes = [
    'name',
    'ownerID',
  ]

  type = 'oauth-clients'





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
