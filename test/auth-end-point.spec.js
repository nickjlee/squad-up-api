'use strict'
/* globals supertest */
require('./setup')
const helpers = require('./test-helpers')
const knex = require('knex')
const app = require('../src/app')
const jwt = require('jsonwebtoken')
const config = require('../src/config')

describe('Auth Endpoints', () => {
  let db
  before('connect to db', () => {
    db = knex({
      client: 'pg',
      connection: config.TEST_DB_URL
    })

    app.set('db', db)
  })

  const testUsers = helpers.makeUsersArray()
  const testUser = testUsers[0]

  after('disconnect from db', () => db.destroy())
  before('cleanup', () => helpers.cleanTables(db))
  afterEach('cleanup', () => helpers.cleanTables(db))

  describe.only('POST /api/auth/token', () => {
    beforeEach('seed users', () => helpers.seedUsers(db, testUsers))
    
    context('Request body validation', () => {

      const requiredFields = ['username', 'password']

      requiredFields.forEach(field => {
        it(`responds with 400 and an error message when the '${field}' is missing`, () => {
          const data = {
            username: testUser.username,
            password: testUser.password
          }

          delete data[field]

          return supertest(app)
            .post('/api/auth/token')
            .send(data)
            .expect(400, { error: `Missing '${field}' in request body` })
        })
      })
    })

    it('returns 400 and an error "Incorrect username or password" when invalid user', () => {
      const data = { username: 'fakeUserName', password: testUser.password }
      return supertest(app)
        .post('/api/auth/token')
        .send(data)
        .expect(400, { error: 'Incorrect username or password' })
    })

    it('returns 400 and an error "Incorrect username or password" when invalid password', () => {
      const data = { username: testUser.username, password: 'badPassword' }
      return supertest(app)
        .post('/api/auth/token')
        .send(data)
        .expect(400, { error: 'Incorrect username or password' })
    })

    it('responds 200 and JWT auth token using secret when valid credentials', () => {
      const userValidCreds = {
        username: testUser.username,
        password: testUser.password
      }

      const sub = testUser.username
      const payload = {
        user_id: testUser.id,
        name: testUser.name,
        avatar: testUser.avatar,
        xp: '' + testUser.xp
      }

      const expectedToken = jwt.sign(payload, config.JWT_SECRET, {
        subject: testUser.username,
        expiresIn: config.JWT_EXPIRY,
        algorithm: 'HS256'
      })

      return supertest(app)
        .post('/api/auth/token')
        .send(userValidCreds)
        .expect(200, {
          authToken: expectedToken
        })
    })
  })
})
