'use strict'
/*global supertest */
require('./setup')
const helpers = require('./test-helpers')
const knex = require('knex')
const app = require('../src/app')

describe('Squad Endpoints', () => {
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

      it('responds with squad lists empty squad list when not seeded', () => {
        return supertest(app)
          .get('/api/squads')
          .set('authorization', helpers.makeAuthHeader(testUser))
          .expect(200, [])
      })
    })

    context('Given seeded squads', () => {
      beforeEach('seed games, users, and squads', () =>
        helpers.seedGamesUsersSquads(db, testGames, testUsers, testSquads)
      )

      const expected = helpers.makeExpectedSquadsList(testUser, testSquads)

      it('responds with squad list', () => {
        return supertest(app)
          .get('/api/squads')
          .set('authorization', helpers.makeAuthHeader(testUser))
          .expect(200, expected)
      })
    })
  })

  describe('GET /api/squads/:squad_id/members', () => {
    context('Given non-existent squad', () => {
      beforeEach('seed games, users, and squads', () =>
        helpers.seedGamesUsersSquads(db, testGames, testUsers, testSquads)
      )

      it('responds with empty list when squad does not exist', () => {
        return supertest(app)
          .get('/api/squads/999/members')
          .set('authorization', helpers.makeAuthHeader(testUser))
          .expect(200, [])
      })
    })

    context('Given existing squad', () => {
      beforeEach('seed games, users, and squads', () =>
        helpers.seedGamesUsersSquads(db, testGames, testUsers, testSquads)
      )

      it('responds with list of members', () => {
        const expected = [
          {
            user_id: testUser.id,
            squad_id: testSquads[0].id,
            username: testUser.username,
            name: testUser.name,
            avatar: testUser.avatar
          }
        ]

        return supertest(app)
          .get(`/api/squads/${testSquads[0].id}/members`)
          .set('authorization', helpers.makeAuthHeader(testUser))
          .expect(200, expected)
      })
    })
  })

  describe('POST /api/squads/join', () => {
    beforeEach('seed games, users, and squads', () =>
      helpers.seedGamesUsersSquads(db, testGames, testUsers, testSquads)
    )

    const squadToJoin = testSquads[0]

    context('Given user is already a member of squad', () => {
      it('responds with 400 if user is already a member of squad', () => {
        return supertest(app)
          .post('/api/squads/join')
          .set('authorization', helpers.makeAuthHeader(testUser))
          .send({ squad_id: squadToJoin.id })
          .expect(400, { error: 'User already in squad' })
      })
    })

    context('Given user is a new member of squad', () => {
      it('responds with 201 and message', () => {
        const joiningUser = testUsers[1]

        return supertest(app)
          .post('/api/squads/join')
          .set('authorization', helpers.makeAuthHeader(joiningUser))
          .send({ squad_id: squadToJoin.id })
          .expect(
            201,
            `User ${joiningUser.id} added to squad ${squadToJoin.id}`
          )
      })
    })
  })

  describe('POST /api/squads/add', () => {
    context('Given new squad with existing squad name', () => {
      beforeEach('seed games, users, and squads', () =>
        helpers.seedGamesUsersSquads(db, testGames, testUsers, testSquads)
      )

      it('responds with 400 and error message', () => {
        const squadToAdd = testSquads[0]

        return supertest(app)
          .post('/api/squads/add')
          .set('authorization', helpers.makeAuthHeader(testUser))
          .send(squadToAdd)
          .expect(400, { error: 'Squad name already taken' })
      })
    })

    context('Given successful new squad', () => {
      beforeEach('seed games, users, and squads', () =>
        helpers.seedGamesUsersSquads(db, testGames, testUsers, testSquads)
      )
      
      it('responds with 201 and new squad info', () => {
        const squadToAdd = {
          game_id: 1,
          squad_name: 'New Test Squad'
        }

        return supertest(app)
          .post('/api/squads/add')
          .set('authorization', helpers.makeAuthHeader(testUser))
          .send(squadToAdd)
          .expect(201)
      })
    })
  })
})
