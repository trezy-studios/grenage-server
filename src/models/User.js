// Module imports
import uuid from 'uuid/v4'





// Local imports
import { BaseModel } from './Base'





class UserModel extends BaseModel {
  /***************************************************************************\
    Class Properties
  \***************************************************************************/

  requiredAttributes = [
    'email',
    'password',
  ]

  type = 'users'
}





export { UserModel }
