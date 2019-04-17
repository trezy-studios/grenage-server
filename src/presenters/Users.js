// Module imports
import yayson from 'yayson'





// Local imports
import { CharactersPresenter } from '.'





// Local constants
const { Presenter } = yayson({ adapter: 'default' })





class UsersPresenter extends Presenter {
  /***************************************************************************\
    Class Properties
  \***************************************************************************/

  type = 'users'





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  attributes () {
    const attributes = super.attributes.apply(this, arguments)

    return attributes
  }

  relationships = () => ({ characters: CharactersPresenter })

  selfLinks = instance => {
    return `/${instance.type}/${instance.id}`
  }
}





export { UsersPresenter }
