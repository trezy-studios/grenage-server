// Module imports
import yayson from 'yayson'





// Local imports
import { CharactersPresenter } from '.'





// Local constants
import { BasePresenter } from '.'





class UsersPresenter extends BasePresenter {
  /***************************************************************************\
    Class Properties
  \***************************************************************************/

  type = 'users'





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  relationships = () => ({ characters: CharactersPresenter })
}





export { UsersPresenter }
