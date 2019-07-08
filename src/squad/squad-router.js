const express = require('express')
const squadService = require('./squad-service')
const {requireAuth} = require('../middleware/jwt-auth')
const xss = require('xss')

const jsonBodyParser = express.json()

squadRouter
    .route('/')
    .all(requireAuth)
    .post(jsonBodyParser, async (req, res, next) => {
        const { username, squad_name, capacity , squad_location } = req.body 

        squad_name = xss(squad_name)
        const db = req.app.get('db')

        for (const field of ['username', 'squad_name', 'capacity', 'squad_location'])
            if (!req.body[field])
                return res.status(400).jsoon({
                    error: `Missing '${field}' in request body`
                })
        squadService.getSquadName(db, squad_name)
        .then(r => {
            if (r.length ===0){
                res.status(400).json({
                    error: 'Squad name taken by other player'
                })
            }
        })
        const leader = await squadService.findUserId(db, username)[0]
        
        const squadList = squadService.insertSquad(db, {
            leader,
            squad_name,
            squad_location,
            capacity
        })
        

    })