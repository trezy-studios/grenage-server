// Module imports
import Router from 'koa-router'





// Local imports
import { CharacterPresenter } from '../presenters'
import { CharacterModel } from '../models'





// Local constants
const charactersRouter = new Router({ prefix: '/characters' })





// Get characters for current user
charactersRouter.get('/', async (context, next) => {
  if (!context.isAuthenticated()) {
    context.errors.push('User is not authenticated')
    return context.status = 403
  }

  const characters = await context.knex('characters').where({ userID: context.state.user.id })
  const characterModels = characters.map(character => new CharacterModel(character))

  context.data = CharacterPresenter.render(characterModels.map(({ attributes }) => attributes))
})





// Create new character
charactersRouter.post('/new', async (context, next) => {
  if (!context.isAuthenticated()) {
    context.errors.push('User is not authenticated')
    return context.status = 403
  }

  try {
    const characterModel = new CharacterModel({
      ...context.request.body,
      userID: context.state.user.id,
    })
    const [newCharacter] = await context.knex('characters').insert(characterModel.attributes).returning('*')

    characterModel.update(newCharacter)
    context.data = characterModel.render()
  } catch (error) {
    context.errors.push(error)
  }
})





// Get character by ID
charactersRouter.get('/:id', async (context, next) => {
  if (!context.isAuthenticated()) {
    context.errors.push('User is not authenticated')
    return context.status = 403
  }

  const character = new CharacterModel(await context.knex('characters').where({ id: context.params.id }).first())

  context.data = character.render()
})





export { charactersRouter }