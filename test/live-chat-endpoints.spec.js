'use strict'
/* globals supertest */
require('./setup')
const helpers = require('./test-helpers')
const knex = require('knex')
const app = require('../src/app')
const config = require('../src/config')

describe('Live Chat Endpoints', () => {
  let db
  before('connect to db', () => {
    db = knex({
      client: 'pg',
      connection: config.TEST_DB_URL
    })

    app.set('db', db)
  })

  const testGames = helpers.makeGamesArray()
  const testSquads = helpers.makeSquadsArray()
  const testUsers = helpers.makeUsersArray()
  const testUser = testUsers[0]
  const testChats = helpers.makeChatsArray()

  after('disconnect from db', () => db.destroy())
  before('cleanup', () => helpers.cleanTables(db))
  afterEach('cleanup', () => helpers.cleanTables(db))

  describe('GET /api/chat/:id', () => {
    context('Given no chat', () => {
      beforeEach(() =>
        helpers.seedGamesUsersSquads(db, testGames, testUsers, testSquads)
      )

      const testSquad = testSquads[0]

      const welcomeMsg = {
        message_body: `Welcome to Channel ${testSquad.id}`,
        username: 'Admin',
        squad_name: testSquad.squad_name,
        id: 999999
      }

      it('responds with 200 with Welcome Message', function() {
        return supertest(app)
          .get('/api/chat/1')
          .set('authorization', helpers.makeAuthHeader(testUser))
          .expect(200)
          .expect(res => {
            expect(res.body[0].message_body).to.eql(welcomeMsg.message_body)
            expect(res.body[0].username).to.eql(welcomeMsg.username)
            expect(res.body[0]).to.have.property('time_stamp')
            expect(res.body[0].squad_name).to.eql(welcomeMsg.squad_name)
            expect(res.body[0].id).to.eql(welcomeMsg.id)
          })
      })
    })

    context('Given seeded chat', () => {
      beforeEach(() => {
        return helpers
          .seedGamesUsersSquads(db, testGames, testUsers, testSquads)
          .then(() => helpers.seedChats(db, testChats))
      })

      it('responds with 200 and chats array', () => {
        return supertest(app)
          .get('/api/chat/1')
          .set('authorization', helpers.makeAuthHeader(testUser))
          .expect(200)
          .expect(res => {
            res.body.forEach((chat, index) => {
              expect(chat).to.have.property('id')
              expect(chat.message_body).to.eql(testChats[index].message_body)
              expect(chat.squad_name).to.eql(testSquads[0].squad_name)
              expect(chat).to.have.property('time_stamp')
              expect(chat.username).to.eql(testUsers[index].username)
            })
          })
      })
    })
  })
})
