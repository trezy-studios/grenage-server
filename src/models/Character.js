// Module imports
import uuid from 'uuid/v4'





class CharacterModel {
  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  constructor (attributes) {
    this.attributes = attributes
  }

  validate () {
    const errors = []
    const requiredAttributes = [
      'ancestry',
      'name',
      'experiencePoints',
      'hitPoints',
      'userID',
    ]

    for (const requiredAttribute of requiredAttributes) {
      if (this.attributes[requiredAttribute] === 'null') {
        errors.push(`Missing attribute: ${requiredAttribute}`)
      }
    }

    return errors
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





export { CharacterModel }
