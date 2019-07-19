'use strict'
/*global supertest */
require('./setup')
const helpers = require('./test-helpers')
const knex = require('knex')
const app = require('../src/app')

describe.only('Squad Endpoints', () => {
  let db

  const testUsers = helpers.makeUsersArray()
  const testGames = helpers.makeGameArray()
  const testSquads = helpers.makeSquadList()
  const testUser = testUsers[0]

  before('connect to db', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())
  before('cleanup', () => helpers.cleanTables(db))
  afterEach('cleanup', () => helpers.cleanTables(db))

  describe('GET /api/squads', () => {
    context('Given no squads', () => {
      beforeEach('seed users and games', () =>
        helpers.seedGamesUsers(db, testGames, testUsers)
      )

      it('response with squad lists empty squad list when not seeded', () => {
        return supertest(app)
          .get('/api/squads')
          .set('authorization', helpers.makeAuthHeader(testUser))
          .expect(200, [])
      })
    })

    context('Given seeded squads', () => {
      beforeEach('seed users and squads', () =>
        helpers.seedGamesUsersSquads(db, testGames, testUsers, testSquads)
      )

      const expected = helpers.makeExpectedSquadsList(testUser, testSquads)

      it('response with squad list', () => {
        return supertest(app)
          .get('/api/squads')
          .set('authorization', helpers.makeAuthHeader(testUser))
          .expect(200, expected)
      })
    })
  })
})
