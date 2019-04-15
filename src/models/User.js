// Module imports
import uuid from 'uuid/v4'





// Local imports
import { BaseModel } from './Base'
import { UserPresenter } from '../presenters'





class UserModel extends BaseModel {
  /***************************************************************************\
    Class Properties
  \***************************************************************************/

  presenter = UserPresenter

  requiredAttributes = [
    'email',
    'password',
  ]

  type = 'users'





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  render = () => {
    const safeAttributes = this.attributes

    delete safeAttributes.password

    return this.presenter.render({
      ...safeAttributes,
      ...this.links,
    })
  }
}





export { UserModel }
