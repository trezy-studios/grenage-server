// Module imports
import yayson from 'yayson'





// Local constants
const { Presenter } = yayson({ adapter: 'default' })





class UserPresenter extends Presenter {
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

  relationships = () => {
    return {}
  }
}





export { UserPresenter }
