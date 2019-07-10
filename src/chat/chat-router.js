const express = require('express')
const { requireAuth } = ('../middlware/jwt-auth')

const ChatService = require('./chat-service')




const chatRouter = express.Router()
const jsonParser = express.json()

// chatRouter
//   .use(requireAuth)

chatRouter
  .get('/', async (req, res, next) => {
    try{
      const squadChat = await ChatService.getChatById(
        req.app.get('db'),
        
      )
      console.log(squadChat)
      
      if(!squadChat){
        return res.status(200).json({
          message: `No chat messages for this squad yet`
        })
      }
      return res.json(squadchat);
    } catch (error){
      next(error)
    }
  })
  

module.exports = chatRouter
