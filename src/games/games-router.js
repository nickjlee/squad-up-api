const express = require('express')
const path = require('path')
const GamesService = require('./games-service')

const gamesRouter = express.Router()
const jsonParser = express.json()


