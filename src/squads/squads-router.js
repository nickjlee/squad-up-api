const express = require('express')
const {requireAuth} = require('../middleware/jwt-auth')
const path = require('path')
const SquadsService = require('./squads-service')
const updateXp = require('../middleware/xp-service')

const squadsRouter = express.Router()
const jsonParser = express.json()

squadsRouter
  .use(requireAuth)

squadsRouter
  .get('/', async (req, res, next) => {
    try {
      const userSquads = await SquadsService.getUserSquads(
        req.app.get('db'),
        req.user.id
      ) 

      if (!userSquads) 
        return res.status(200).json({
          message: `No squads joined yet!`
        })

      return res.json(userSquads)

    } catch (error) {
      next(error)
    }
  })

squadsRouter
  .post('/join', jsonParser, async (req, res, next) => {
    try {
      const {squad_id} = req.body
      const squadId = squad_id

      await SquadsService.joinSquad(
        req.app.get('db'),
        req.user.id,
        squadId
      )

      await updateXp(
        req.app.get('db'),
        req.user.id,
        100
      )

      return res.status(201).send(`User ${req.user.id} added to squad ${squadId}`)

    } catch (error) {
      next(error)
    }
  })

module.exports = squadsRouter