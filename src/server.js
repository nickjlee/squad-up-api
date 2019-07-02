require('dotenv').config()

const knex = require('knex')
const app = require('./app')
const { PORT, DB_URL } = require('./config')
ioService = require('./io-service');


const db = knex({
  client: 'pg',
  connection: DB_URL,
})

app.set('db', db)
ioService.setApp(app)

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})