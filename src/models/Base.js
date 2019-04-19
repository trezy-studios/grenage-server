// Module imports
import uuid from 'uuid/v4'
import yayson from 'yayson'





// Module imports
import knex from '../database'





// Local constants
const { Presenter } = yayson({ adapter: 'default' })





class BaseModel {
  /***************************************************************************\
    Class Properties
  \***************************************************************************/

  defaultAttributes = {}

  requiredAttributes = []

  type = 'unknown'





  /***************************************************************************\
    Public Methods
  \***************************************************************************/
  _afterSave = () => {
    if (typeof this.afterSave === 'function') {
      this.afterSave()
    }
  }

  _beforeSave = () => {
    this.validate()

    if (typeof this.beforeSave === 'function') {
      this.beforeSave()
    }
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  constructor (attributes = {}) {
    // super()
    this.isNew = !attributes.id
    this.attributes = attributes
  }

  findByID = async id => {
    try {
      const result = await knex(this.type).where({ id }).first()
      this.update(result)
    } catch (error) {
      throw error
    }
  }

  render = () => this.presenter.render({ ...this.attributes })

  save = async () => {
    try {
      this._beforeSave()

      const [result] = await knex(this.type).insert(this.attributes).returning('*')

      this.update(result)

      if (this.isNew) {
        this.isNew = false
      }

      this._afterSave()
    } catch (error) {
      throw error
    }
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
    return {
      ...this.defaultAttributes,
      ...this._attributes,
    }
  }





  /***************************************************************************\
    Setters
  \***************************************************************************/

  set attributes (attributes) {
    this._originalAttributes = attributes
    this._attributes = {
      ...this.defaultAttributes,
      ...attributes,
    }

    if (!attributes.id) {
      this._attributes.id = uuid()
    }
  }
}





export { BaseModel }
