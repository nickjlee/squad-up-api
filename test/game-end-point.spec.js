'use strict'
/*global supertest */
require('./setup')
const helpers = require('./test-helpers')
const knex = require('knex')
const app = require('../src/app')
const config = require('../src/config')

describe('Game Endpoints', () => {
  let db
  before('connect to db', () => {
    db = knex({
      client: 'pg',
      connection: config.TEST_DB_URL
    })

    app.set('db', db)
  })

  const testGames = helpers.makeGamesArray()
  const testUsers = helpers.makeUsersArray()
  const testSquads = helpers.makeSquadsArray()
  const testUser = testUsers[0]

  after('disconnect from db', () => db.destroy())
  before('cleanup', () => helpers.cleanTables(db))
  afterEach('cleanup', () => helpers.cleanTables(db))

  describe('GET /api/games', () => {
    beforeEach('seed games', () => helpers.seedGames(db, testGames))

    const expectedGames = testGames.map(game => {
      return {
        ...game,
        number_of_squads: '0'
      }
    })

    it('responds 200 with the games list', () => {
      return supertest(app)
        .get('/api/games')
        .expect(200, expectedGames)
    })
  })

  describe('GET /api/games/:game_id', () => {
    context('Given no games', () => {
      beforeEach('seed users', () => helpers.seedUsers(db, testUsers))

      it('responds with 404 and "Game does not exist"', () => {
        return supertest(app)
          .get('/api/games/1')
          .set('authorization', helpers.makeAuthHeader(testUser))
          .expect(404, { error: `Game does not exist` })
      })
    })

    context('Given games are seeded', () => {
      beforeEach('insert games', () =>
        helpers.seedGamesUsers(db, testGames, testUsers)
      )

      it('responds with 200 and the game with id 1', () => {
        const game = testGames.filter(g => g.id == 1)

        const expected = {
          ...game[0],
          number_of_squads: '0'
        }

        return supertest(app)
          .get('/api/games/1')
          .set('authorization', helpers.makeAuthHeader(testUser))
          .expect(200, expected)
      })

      it('response with 404 when using invalid game id', () => {
        return supertest(app)
          .get('/api/games/999')
          .set('authorization', helpers.makeAuthHeader(testUser))
          .expect(404, { error: `Game does not exist` })
      })
    })
  })

  describe('GET /api/games/:game_id/squads', () => {
    context('Given no squads', () => {
      beforeEach(() => helpers.seedGamesUsers(db, testGames, testUsers))

      it('responds with 200 and an empty array', () => {
        return supertest(app)
          .get('/api/games/1/squads')
          .set('authorization', helpers.makeAuthHeader(testUser))
          .expect(200, [])
      })
    })

    context('Given seeded squads', () => {
      beforeEach(() =>
        helpers.seedGamesUsersSquads(db, testGames, testUsers, testSquads)
      )

      const squads = testSquads.filter(squad => squad.game_id == 1)

      const expected = squads.map(squad => {
        return {
          id: squad.id,
          squad_name: squad.squad_name,
          squad_location: squad.squad_location,
          userId: squad.leader,
          userName: testUsers[squad.leader - 1].username,
          name: testUsers[squad.leader - 1].name,
          avatar: testUsers[squad.leader - 1].avatar,
          squad_id: squad.id,
          tags: []
        }
      })

      it('responds with 200 and array of squads', () => {
        return supertest(app)
          .get('/api/games/1/squads')
          .set('authorization', helpers.makeAuthHeader(testUser))
          .expect(200, expected)
      })
    })
  })
})
