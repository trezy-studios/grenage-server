const defaultConfig = {
  client: 'pg',
  connection: {
    database: process.env.GRENAGE_API_DB_NAME,
    host: 'postgres',
    password: process.env.GRENAGE_API_DB_PASS,
    user: process.env.GRENAGE_API_DB_USER,
  },
}





module.exports = {
  development: defaultConfig,
  staging: defaultConfig,
  production: defaultConfig,
}
