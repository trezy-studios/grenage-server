// Module imports
import uuid from 'uuid/v4'
import yayson from 'yayson'





// Local constants
const { Presenter } = yayson({ adapter: 'default' })





class BaseModel {
  /***************************************************************************\
    Class Properties
  \***************************************************************************/

  requiredProp = []





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  constructor (attributes) {
    // super()
    this.attributes = attributes
  }

  relationships = () => ({})

  render = () => {
    return this.presenter.render({
      ...this.attributes,
      ...this.links,
    })
  }

  update = updates => {
    this.attributes = {
      ...this.attributes,
      ...updates,
    }
  }

  validate = () => {
    const errors = []

    for (const requiredAttribute of this.requiredAttributes) {
      if (this.attributes[requiredAttribute] === 'null') {
        errors.push(`Missing attribute: ${requiredAttribute}`)
      }
    }

    if (errors.length) {
      return errors
    }

    return true
  }





  /***************************************************************************\
    Getters
  \***************************************************************************/

  get attributes () {
    return this._attributes || (this._attributes = {})
  }

  get links () {
    return {
      links: {
        self: `/${this.type}/${this._attributes.id}`,
      },
    }
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





export { BaseModel }
