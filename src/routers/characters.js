// Module imports
import passport from 'koa-passport'
import Router from 'koa-router'





// Local imports
import { CharactersPresenter } from '../presenters'
import { CharacterModel } from '../models'





// Local constants
const charactersRouter = new Router({ prefix: '/characters' })





// Get characters for current user
charactersRouter.get('/',
  passport.authenticate('bearer', { session: false }),
  async (context, next) => {
    const characters = await CharacterModel.find({ userID: context.state.user.id })

    context.data = CharacterModel.renderList(characters)
  }
)





// Create new character
charactersRouter.post('/new',
  passport.authenticate('bearer', { session: false }),
  async (context, next) => {
    try {
      const characterModel = new CharacterModel({
        ...context.request.body,
        userID: context.state.user.id,
      })

      characterModel.save()

      context.data = characterModel.render()
    } catch (error) {
      context.status = 401
      context.errors.push(error)
    }
  }
)





// Get character by ID
charactersRouter.get('/:id', async (context, next) => {
  const character = CharacterModel.findByID(context.params.id)

  context.data = character.render()
})





// Get character by ID
charactersRouter.get('/:id/sprite', async (context, next) => {
  const canvasSize = {
    height: 2112,
    width: 1536,
  }

  const characterDisplay = {
    body: {
      type: ['light', 'dark', 'dark2', 'tanned', 'tanned2', 'darkelf', 'darkelf2'],
    },
    gender: 'male',
  }

  const character = new CharacterModel(await context.knex('characters').where({ id: context.params.id }).first())

  context.data = character.render()
})





export { charactersRouter }
