const express = require('express')
const {requireAuth} = require('../middleware/jwt-auth')
const path = require('path')
const SquadsService = require('./squads-service')
const {grantXp} = require('../middleware/xp-service')

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

      const hasUserWithUserId = await SquadsService.hasUserWithUserId(
        req.app.get('db'),
        req.user.id,
        squadId
      )

      if (hasUserWithUserId)
        return res.status(400).json({
          error: `User already in squad`
        })

      await SquadsService.joinSquad(
        req.app.get('db'),
        req.user.id,
        squadId
      )

      grantXp(
        req.app.get('db'),
        req.user.username,
        200
      )

      return res.status(201).send(`User ${req.user.id} added to squad ${squadId}`)

    } catch (error) {
      next(error)
    }
  })

squadsRouter
  .post('/add', jsonParser, async (req, res, next) => {
    try {
      const {
        capacity=100,
        game_id,
        squad_name, 
        squad_location='somewhere on earth', 
        tags=[]
      } = req.body

      for (const field of ['squad_name', 'game_id'])
        if (!req.body[field])
          return res.status(400).json({
            error: `Missing '${field}' in request body`
          })

      const newSquad = {
        squad_name,
        squad_location,
        leader: req.user.id,
        capacity,
        game_id
      }

      const hasSquadWithSquadName = await SquadsService.hasSquadWithSquadName(
        req.app.get('db'),
        squad_name
      )


      if (hasSquadWithSquadName) 
        return res.status(400).json({
          error: `Squad name already taken`
        })

      const squad = await SquadsService.addSquad(
        req.app.get('db'),
        newSquad
      )

      await tags.forEach(tag => {
        const newTag = {
          tag
        }
        SquadsService.insertTags(
          req.app.get('db'),
          newTag
        )
          .then(insertedTag => {
            return SquadsService.addTagsToSquad(
              req.app.get('db'),
              squad.id,
              insertedTag.id
            )
          })
      })

      await SquadsService.joinSquad(
        req.app.get('db'),
        req.user.id,
        squad.id
      )

      grantXp(
        req.app.get('db'),
        req.user.username,
        400
      )

      const response = {
        ...SquadsService.serializeSquad(squad),
        tags
      }

      return res
        .status(201)
        .json(response)
      
    } catch (error) {
      next(error)
    }
  })

module.exports = squadsRouter