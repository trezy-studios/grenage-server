// Module imports
import uuid from 'uuid/v4'





class UserModel {
  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  constructor (attributes) {
    this.attributes = attributes
  }





  /***************************************************************************\
    Getters
  \***************************************************************************/

  get attributes () {
    return this._attributes || (this._attributes = {})
  }





  /***************************************************************************\
    Setters
  \***************************************************************************/

  set attributes (attributes) {
    this._attributes = { ...attributes }

    if (!attributes.id) {
      this._attributes.id = uuid()
    }

    return this._attributes || (this._attributes = {})
  }
}





export { UserModel }
