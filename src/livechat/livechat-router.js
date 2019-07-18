const express = require('express')
const livechatService = require('./livechat-service')
const { requireAuth } = require('../middleware/jwt-auth')

const livechatRouter = express.Router()

livechatRouter
  .route('/:id')
  .all(requireAuth)
  .get(async (req, res, next) => {
    try {
      const squad_id = req.params.id
      const db = req.app.get('db')
      const squad_name = await livechatService
        .validateId(db, squad_id)
        .then(r => {
          if (r.length == 0) {
            res.status(400).json({
              error: 'Invalid room id'
            })
          }
          return r[0].squad_name
        })
        
      await livechatService.getAllChat(db, squad_id).then(chats => {
        if (chats.length === 0) {
          let time = new Date()
          time = time.toISOString()
          const welcome = [
            {
              message_body: `Welcome to Channel ${squad_id}`,
              username: 'Admin',
              time_stamp: time,
              squad_name,
              id: 999999
            }
          ]
          return res.json(welcome)
        }

        return res.json(chats)
      })
    } catch (error) {
      next(error)
    }
  })

module.exports = livechatRouter
