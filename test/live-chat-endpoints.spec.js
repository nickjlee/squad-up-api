'use strict';
/* globals supertest */
require('./setup');
const helpers = require('./chat-helpers');
const knex = require('knex');
const app = require('../src/app');
const config = require('../src/config')

describe('live chat Endpoints', () => {
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

    beforeEach('seed users and squad', () => {
        helpers.cleanTables(db)
        const users = helpers.makeUserArray()
        const squad = helpers.makeSquadList()
        const message = helpers.makeChatList()
        helpers.seedUsers(db, users)
        helpers.seedSquads(db, squad)
        helpers.seedChat(db,message)

    })

    it('get /api/chat:id when no chat on the server', () =>{
        const chat_id = 999
        const user = helpers.makeUserArray()[0]
        const bearerToken = helpers.makeAuthHeader(user)
        const expect = [
          {
              message_body:"test chat 1",
              user_id:1,
              squad_id:999,
              time_stamp:"2019-07-12 16:39:53.401303"
          }
      ]
        return supertest(app)
        .get(`/api/chat/${chat_id}`)
        .set('Authorization', bearerToken)
        .expect(200, expect)
    })
})