const express = require('express')
const path = require('path')
const UserService = require('./user-service')

const userRouter = express.Router()
const jsonParser = express.json()

userRouter
  .post('/', jsonParser, async (req, res, next) => {
    const {name, username, password} = req.body

    for (const field of ['name', 'username', 'password'])
      if (!req.body[field])
        return res.status(400).json({
          error: `Missing '${field}' in request body`
        })

    try {
      const passwordError = UserService.validatePassword(password)

      if (passwordError)
        return res.status(400).json({error: passwordError})
      
      const hasUserWithUsername = await UserService.hasUserWithUserName(
        req.app.get('db'),
        username
      )

      if (hasUserWithUsername)
        return res.status(400).json({error: `Username already taken`})

      const hashedPassword = await UserService.hashPassword(password)

      const newUser = {
        name,
        username,
        password: hashedPassword
      }

      const user = await UserService.insertUser(
        req.app.get('db'), 
        newUser
      )

      return res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/${user.id}`))
        .json(UserService.serializeUser(user))
    } catch(error) {
      next(error)
    }
  })

  module.exports = userRouter