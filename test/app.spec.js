'use strict'

const app = require('../src/app')

describe('App', () => {
  it('GET / responds with 200 containing welcome message', () => {
    return supertest(app)
      .get('/')
      .expect(200)
  })
})
