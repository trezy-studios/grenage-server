// Module imports
import yayson from 'yayson'





// Local constants
const { Presenter } = yayson({ adapter: 'default' })





class BasePresenter extends Presenter {
  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  selfLinks = instance => {
    return `/${this.type}/${instance.id}`
  }
}





export { BasePresenter }
