// Module imports
import uuid from 'uuid/v4'





// Local imports
import { BaseModel } from '.'
import { CharactersPresenter } from '../presenters'





// Local constants
const type = 'characters'





class CharacterModel extends BaseModel {
  /***************************************************************************\
    Class Properties
  \***************************************************************************/

  presenter = CharactersPresenter

  requiredAttributes = [
    'ancestry',
    'name',
    'experiencePoints',
    'hitPoints',
    'userID',
  ]

  static type = type

  type = type
}





export { CharacterModel }
