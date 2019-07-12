'use strict'
/*global supertest */
require('./setup');
const helpers = require('./test-helpers');
const knex = require('knex');
const app =require('../src/app');
const jwt = require('jsonwebtoken');
const config = require('../src/config');

describe('Squad Endpoints', () => {
    let db;
    before('connect to db', () => {
        db= knex({
            client:'pg',
            connection:config.TEST_DB_URL
        })
        app.set('db', db)
    })
    after('disconnect from db', () => db.destroy());
    before('cleanup', () => helpers.cleanTables(db));
    afterEach('cleanup', () => helpers.cleanTables(db));

    describe('get /api/squads', () => {
        beforeEach('seed users and games', () => {
            const users = helpers.makeUsersArray()
            const games = helpers.makeGameArray()
            helpers.seedGamesAndUsers(db, users, games)
        })
        it('response with squad lists empty squad list when not seeded', () => {
            return supertest(app)
                .get('/api/squads')
                .expect(200, {message: `No squads joined yet!`})
        })
        context('seeded squads', () => {
            const expected = helpers.makeSquadList()
            it('response with squad list', () => {
                return supertest(app)
                    .get('api/squads')
                    .expect(200, expected)
            })
        })
    })
})
