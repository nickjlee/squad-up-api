require('./setup')
const helpers = require('./test-helpers')
const knex = require('knex')
const app = require('../src/app')
const config = require('../src/config')

describe.only('User Endpoints', () => {
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

  describe('GET /api/user/:user_id', () => {
    context('Given user does not exist', () => {
      beforeEach('seed users', () => helpers.seedUsers(db, testUsers))

      it('responds with 400 and an error "User does not exist"', () => {
        return supertest(app)
          .get(`/api/user/${999}`)
          .set('authorization', helpers.makeAuthHeader(testUser))
          .expect(404, { error: 'User does not exist' })
      })
    })

    context('Given seeded users', () => {
      beforeEach('seed users', () => helpers.seedUsers(db, testUsers))

      it('responds with 200 and user info', () => {
        const expectedUserInfo = {}

        return supertest(app)
          .get(`/api/user/${testUser.id}`)
          .set('authorization', helpers.makeAuthHeader(testUser))
          .expect(200)
      })
    })
  })

  describe('POST /api/user', () => {
    context('Request body validation', () => {
      beforeEach('seed users', () => helpers.seedUsers(db, testUsers))

      const requiredFields = ['name', 'username', 'password']

      requiredFields.forEach(field => {
        const registerAttemptBody = {
          username: 'newTestUser',
          password: '11AAaa!!',
          name: 'Test'
        }

        it(`responds with 400 'Missing '${field}' in request body'`, () => {
          delete registerAttemptBody[field]

          return supertest(app)
            .post('/api/user')
            .send(registerAttemptBody)
            .expect(400, { error: `Missing '${field}' in request body` })
        })
      })
    })

    context('Given non-unique username', () => {
      beforeEach('seed users', () => helpers.seedUsers(db, testUsers))

      const duplicateUser = {
        username: testUser.username,
        password: '11AAaa!!',
        name: 'Test'
      }

      it('responds with 400 and an error "Username already taken"', () => {
        return supertest(app)
          .post('/api/user')
          .send(duplicateUser)
          .expect(400, { error: 'Username already taken' })
      })
    })

    context('Happy Path', () => {
      const newUser = {
        username: 'newTestUser',
        password: '11AAaa!!',
        name: 'Test'
      }

      it('responds with 201 and newly created user info', () => {
        return supertest(app)
          .post('/api/user')
          .send(newUser)
          .expect(201)
          .expect(res => {
            expect(res.body).to.have.property('id')
            expect(res.body.username).to.eql(newUser.username)
            expect(res.body.name).to.eql(newUser.name)
            expect(res.body).to.not.have.property('password')
          })
      })
    })
  })
})
