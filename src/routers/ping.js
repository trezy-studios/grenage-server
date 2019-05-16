// Module imports
import Router from 'koa-router'





// Local constants
const pingRouter = new Router({ prefix: '/ping' })





// Get current user
pingRouter.get('/', async (context, next) => context.status = 204)





export { pingRouter }
