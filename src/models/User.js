// Module imports
import bcrypt from 'bcryptjs'
import uuid from 'uuid/v4'





// Local imports
import { BaseModel } from './Base'
import {
  CharactersPresenter,
  UsersPresenter,
} from '../presenters'





// Local constants
const type = 'users'





class UserModel extends BaseModel {
  /***************************************************************************\
    Class Properties
  \***************************************************************************/

  presenter = UsersPresenter

  requiredAttributes = [
    'email',
    'password',
  ]

  static type = type

  type = type





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  beforeSave = () => {
    if (this.isNew) {
      this.update({ password: bcrypt.hashSync(this.attributes.password, bcrypt.genSaltSync()) })
    }
  }





  /***************************************************************************\
    Getters
  \***************************************************************************/

  get password () {
    return this.attributes.password
  }

  get safeAttributes () {
    const safeAttributes = { ...this.attributes }

    delete safeAttributes.password

    return safeAttributes
  }
}





export { UserModel }
