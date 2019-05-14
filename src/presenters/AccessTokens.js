// Module imports
import yayson from 'yayson'





// Local imports
import { UsersPresenter } from '.'





// Local constants
import { BasePresenter } from '.'





class AccessTokensPresenter extends BasePresenter {
  /***************************************************************************\
    Class Properties
  \***************************************************************************/

  type = 'access-tokens'





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  relationships = () => ({ user: UsersPresenter })

  selfLinks = () => {}
}





export { AccessTokensPresenter }
