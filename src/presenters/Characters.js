// Module imports
import yayson from 'yayson'





// Local constants
const { Presenter } = yayson({ adapter: 'default' })





class CharactersPresenter extends Presenter {
  /***************************************************************************\
    Class Properties
  \***************************************************************************/

  type = 'characters'





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  attributes () {
    return super.attributes.apply(this, arguments)
  }

  relationships = () => ({})
}





export { CharactersPresenter }
