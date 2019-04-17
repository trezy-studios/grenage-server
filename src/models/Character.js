// Module imports
import uuid from 'uuid/v4'





// Local imports
import { BaseModel } from '.'
import { CharactersPresenter } from '../presenters'





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

  type = 'characters'
}





export { CharacterModel }
