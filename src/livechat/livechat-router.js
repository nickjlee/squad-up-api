const express = require('express');
const livechatService = require('./livechat-service');
const {requireAuth} = require('../middleware/jwt-auth');

const livechatRouter = express.Router();

livechatRouter
    .route('/:id')
    .all(requireAuth)
    .get(async (req, res, next) => {
        try {
            const squad_id = req.params.id
            const db = req.app.get('db')
            await livechatService.validateId(db, squad_id)
                .then(r => {
                    if (r.length ==0){
                        res.status(400).json({
                            error:'Invalid room id'
                        })
                    }
                })
            await livechatService.getAllChat(
                db, 
                squad_id
            ).then(chats => {
                return res.json(chats)
            })
            
        }
        catch (err) {
            next(error)
        }
    })

module.exports = livechatRouter;