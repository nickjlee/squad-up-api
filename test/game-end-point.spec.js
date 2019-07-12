'use strict'
/*global supertest */
require('./setup');
const helpers = require('./test-helpers');
const knex = require('knex');
const app =require('../src/app');
const config = require('../src/config');

describe('Game Endpoints', () => {
    let db;
    before('connect to db', () => {
        db= knex({
            client:'pg',
            connection:config.TEST_DB_URL
        })
        app.set('db', db)
    });

    after('disconnect from db', () => db.destroy());
    before('cleanup', () => helpers.cleanTables(db));
    afterEach('cleanup', () => helpers.cleanTables(db));

    describe('get /api/games', () =>{
        const testGames = helpers.makeGameArray()
        beforeEach('seed games', () => helpers.seedGames());

        it('response with the game list', () => {
            return supertest(app)
                .get('/api/games')
                .expect(200, testGames)
        })
    })
    describe('get from protected endpoint /api/games/:id', () => {
        context('Given no Games', () => {
            it('response with 404 and Game does not exist', () => {
                return supertest(app)
                    .get('/api/games/1')
                    .expect(404, {error:`Game does not exist`})
            })
        })
        context('there is game', () =>{
            beforeEach('insert games', () =>{
                const testUsers = helpers.makeUsersArray()
                const testGames = helpers.makeGameArray()
                helpers.seedGamesAndUsers(
                    db, 
                    testUsers,
                    testGames
                    )
            })
            it('responds with 200 and the game with id 1', () => {
                const expectedGame = testGames.filter(g => g.id==1)
                return supertest(app)
                    .get('/api/games/1')
                    .expect(200, expectedGame)
            })
            it('response with 404 when using invalid game id', () => {
                return supertest(app)
                    .get('api/games/9999')
                    .expect(404, {error:`Game does not exist`})
            })
        })
    })    
})