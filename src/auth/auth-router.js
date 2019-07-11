const express = require('express')
const AuthService = require('./auth-service')
const {requireAuth} = require('../middleware/jwt-auth')

const authRouter = express.Router()
const jsonParser = express.json()

authRouter
  .route('/token')
  .post(jsonParser, async (req, res, next) => {
    const {username, password} = req.body
    const loginUser = {username, password} 

    for (const [key, value] of Object.entries(loginUser))
      if (value == null) 
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        })

    try {
      let dbUser = await AuthService.getUserWithUserName(
        req.app.get('db'),
        loginUser.username
      )
      dbUser=dbUser[0]

      if (!dbUser)
        return res.status(400).json({
          error: 'Incorrect username or password',
        })

      const compareMatch = await AuthService.comparePasswords(
        loginUser.password,
        dbUser.password
      )

      if (!compareMatch)
        return res.status(400).json({
          error: 'Incorrect username or password'
        })

      const sub = dbUser.username
      const payload = {
        user_id: dbUser.id,
        name: dbUser.name,
        avatar: dbUser.avatar,
        xp: dbUser.xp,
        level: dbUser.level_id,
        xp_threshold: dbUser.xp_threshold
      }
      res.send({
        authToken: AuthService.createJwt(sub, payload),
      })
    } catch (error) {
      next(error)
    }
  })

  .put(requireAuth, (req, res) => {
    const sub = req.user.username
    const payload = {
      user_id: req.user.id,
      name: req.user.name
    }
    res.send({
      authToken: AuthService.createJwt(sub, payload)
    })
  })

  module.exports = authRouter