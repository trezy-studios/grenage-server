// Module imports
import knex from 'knex'
import knexConfig from '../knexfile'





export default knex(knexConfig[process.env.NODE_ENV || 'development'])
