const express = require('express')
const {requireAuth} = require('../middleware/jwt-auth')
const GamesService = require('./games-service')

const gamesRouter = express.Router()

gamesRouter
  .route('/')
  .get(async (req, res, next) => {
    try {
      const games = await GamesService.getAllGames(req.app.get('db'))

      return res.json(games)

    } catch (error) {
      next(error)
    }
  })

gamesRouter
  .route('/:game_id')
  .all(requireAuth)
  .all(checkGameExists)
  .get((req, res) => {
    res.json(res.game)
  })

gamesRouter
  .route('/:game_id/squads/')
  .all(requireAuth)
  .all(checkGameExists)
  .get(async (req, res, next) => {
    try {
      const gameSquads = await GamesService.getSquadsForGame(
        req.app.get('db'),
        req.params.game_id
      )

      
      let count = 0;
      
      await gameSquads.forEach((squad, index) => {
        GamesService.getTagsForSquads(
          req.app.get('db'),
          squad.id
        )
          .then(res => {
            count++
            gameSquads[index].tags = res
            isComplete(count)
          })
      })
      
      const isComplete = (count) => {
        if (count === gameSquads.length) {
          return res.json(gameSquads)
        }
      }

    } catch (error) {
      next(error)
    }
  })


async function checkGameExists(req, res, next) {
  try {
    const game = await GamesService.getGameById(
      req.app.get('db'),
      req.params.game_id
    )

    if (!game)
      return res.status(404).json({
        error: `Game does not exist`
      })

    res.game = game
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = gamesRouter
