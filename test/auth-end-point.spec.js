'use strict';
/* globals supertest */
require('./setup');
const helpers = require('./test-helpers');
const knex = require('knex');
const app = require('../src/app');
const jwt = require('jsonwebtoken');
const config = require('../src/config')

describe('Auth Endpoints', () => {
  let db;
  before('connect to db', () => {
    db = knex({
      client: 'pg',
      connection: config.TEST_DB_URL
    });

    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());
  before('cleanup', () => helpers.cleanTables(db));
  afterEach('cleanup', () => helpers.cleanTables(db));

  describe('POST /api/auth/token and /api/user', () => {
    const testUsers = helpers.makeUsersArray();
    beforeEach('seed users', () => helpers.seedUsers(db, testUsers));

    const requiredFields = ['username', 'password'];
    const testUser = testUsers[0];
    
    requiredFields.forEach(field => {
      it(`responds with 400 and an error message when the '${field}' is missing`, () => {
        const data = {username: testUser.username, password: testUser.password};
        delete data[field];

        return supertest(app)
          .post('/api/auth/token')
          .send(data)
          .expect(400, {error: `Missing '${field}' in request body`});
      });
    });

    it('returns 400 and an error "Incorrect username or password" when invalid user', () => {
      const data = {username: 'fakeUserName', password: testUser.password};
      return supertest(app)
        .post('/api/auth/token')
        .send(data)
        .expect(400, {error: 'Incorrect username or password'});
    });

    it('returns 400 and an error "Incorrect username or password" when invalid password', () => {
      const data = {username: testUser.username, password: 'badPassword'};
      return supertest(app)
        .post('/api/auth/token')
        .send(data)
        .expect(400, {error: 'Incorrect username or password'});
    });

    it('responds 200 and JWT auth token using secret when valid credentials', () => {
      const userValidCreds = {
        username: testUser.username,
        password: testUser.password,
      };
      const payload = {
          user_id:testUser.id,
          name:testUser.name,
          avatar:testUser.avatar,
          xp:testUser.xp,
          level:testUser.level_id
      }

      const expectedToken = jwt.sign(
        payload,
        config.JWT_SECRET,
        {
          subject: testUser.username,
          algorithm: 'HS256',
        }
      );
      return supertest(app)
        .post('/api/auth/token')
        .send(userValidCreds)
        .expect(200, {
          authToken: expectedToken,
        });
    });
    it(`responds 400 'User name already taken' when username isn't unique`, () => {
        const duplicateUser = {
          username: testUser.user_name,
          password: '11AAaa!!',
          name: 'test user',
        }
        
        return supertest(app)
          .post('/api/user')
          .send(duplicateUser)
          .expect(400, { error: `Username already taken` })
      })
      context(`Happy path`, () => {
        it(`responds 201 when create new user`, () => {
          const newUser = {
            username: 'user999',
            password: '11AAaa!!',
            name: 'test full_name',
          }
          return supertest(app)
            .post('/api/user')
            .send(newUser)
            .expect(201)
            
        })
  });
});
})