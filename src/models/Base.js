// Module imports
import uuid from 'uuid/v4'
import yayson from 'yayson'





// Module imports
import knex from '../database'





// Local constants
const { Presenter } = yayson({ adapter: 'default' })
const type = 'unknown'





class BaseModel {
  /***************************************************************************\
    Static Methods
  \***************************************************************************/

  static async delete (conditions) {
    if (typeof conditions === 'string') {
      conditions = { id: conditions }
    }

    try {
      const deletedItemCount = await knex(this.type).where(conditions).delete()
      return deletedItemCount
    } catch (error) {
      throw error
    }
  }

  static async find (conditions) {
    try {
      const items = await knex(this.type).where(conditions)
      return items.map(item => new this(item))
    } catch (error) {
      throw error
    }
  }

  static async findByID (id) {
    try {
      const item = await knex(this.type).where({ id }).first()
      return new this(item)
    } catch (error) {
      throw error
    }
  }

  static renderList = (list = [], extra = {}) => {
    if (!list.length) {
      return list
    }

    const { presenter } = list[0]

    return presenter.render(list.map(({ safeAttributes }) => safeAttributes), extra)
  }





  /***************************************************************************\
    Class Properties
  \***************************************************************************/

  defaultAttributes = {}

  defaultOptions = {
    generateID: true,
  }

  idAttribute = 'id'

  ignoreOnSave = []

  requiredAttributes = []

  static type = type

  type = type





  /***************************************************************************\
    Private Methods
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

  constructor (attributes = {}, options = {}) {
    this.isNew = !attributes[this.idAttribute]
    this.options = options

    this.attributes = attributes
  }

  delete = async () => {
    try {
      await this.delete(this[this.idAttribute])
      return true
    } catch (error) {
      throw error
    }
  }

  render = (extra = {}) => this.presenter.render({ ...this.safeAttributes }, extra)

  save = async () => {
    try {
      this._beforeSave()

      const attributesToSave = Object.entries(this.attributes).reduce((accumulator, [key, value]) => {
        if (!this.ignoreOnSave.includes(key)) {
          accumulator[key] = value
        }

        return accumulator
      }, {})

      const [result] = await knex(this.type).insert(attributesToSave).returning('*')

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

  get id () {
    return this.attributes[this.idAttribute]
  }

  get options () {
    return {
      ...this.defaultOptions,
      ...this._options,
    }
  }

  get safeAttributes () {
    return { ...this.attributes }
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

    if (this.options.generateID && !attributes[this.idAttribute]) {
      this._attributes[this.idAttribute] = uuid()
    }
  }

  set options (options) {
    this._originalOptions = options
    this._options = {
      ...this.defaultOptions,
      ...options,
    }
  }
}





export { BaseModel }
