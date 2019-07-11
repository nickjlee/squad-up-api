const express = require('express')
const { requireAuth } = ('../middlware/jwt-auth')

const ChatService = require('./chat-service')





const chatRouter = express.Router()
const jsonParser = express.json()

// chatRouter
//   .use(requireAuth)

chatRouter
  .get('/:squad_id', async (req, res, next) => {
    try {
      const db = req.app.get('db')
      const squadChat = await ChatService.getChatById(
        db,
        req.params.squad_id,
      )

      if (squadChat.length === 0) {
        return res.status(200).json({
          message: `No chat messages for this squad yet`
        })
      }
      
      let chatInfo = {
        userName: 'userName',
        message: squadChat.message_body,
        time: squadChat.time_stamp,
      }
  

      return res
        .status(200)
        .json(chatInfo);

    } catch (error) {
      next(error)
    }
  })

chatRouter
  .post('/:squad_id', jsonParser, async (req, res, next) => {
    const { user_id , user_name, message } = req.body;
    try{
      let db = req.app.get('db')
      const squadChat = await ChatService.getChatById(
        db,
        req.params.squad_id,
      )

      const userId = user_id
      const newMessage = message
      const userName = user_name
      const timeStamp = squadChat.time_stamp
      
      
      await ChatService.updateChat(
        db,
        req.params.squad_id,
        userId,
        userName,
        newMessage
      )

      const newChat = {
        message: newMessage,
        name: userName,
        time: timeStamp
      }
      
      res
        .status(200)
        .json(newChat)

    } catch(error){
      next(error)
    }
  })


module.exports = chatRouter
