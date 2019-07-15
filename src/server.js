require('dotenv').config()

const knex = require('knex')
const app = require('./app');
const { PORT, DB_URL } = require('./config');
const livechatService = require('./livechat/livechat-service')
const xss = require('xss')





const db = knex({
  client: 'pg',
  connection: DB_URL,
})

app.set('db', db)


const server = app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})
const io = require('socket.io')(server)
io.on('connection', (socket)=>{
  socket.on("join room", function(squad_id) {
      socket.join(squad_id)
  })

  socket.on("message", async function(data) {
      const { squad_id, message_body, username } = data
      console.log(squad_id)
      const user_id = await livechatService.findUserId(app.get('db'), username)
      
      const newChat = {
          squad_id,
          message_body:xss(message_body),
          user_id:user_id[0].id
      }
      

      const response = await livechatService.insertChat(
          app.get('db'), newChat
      ).then(re => {
          return livechatService.getChat(
              app.get('db'), re[0].id)
      })

      io.in(squad_id).emit("update chat", response[0])
  })

  socket.on("delete chat", async function(data) {
  
      const { id, squad_id, username } = data
      const  user_id = await livechatService.findUserId(
          app.get('db'),
          username
      )
      
      const chat = await livechatService.findChat(
          app.get('db'),
          id
      )
      
      if (chat[0].user_id==user_id[0].id){
          await livechatService.deleteChat(
              app.get('db'),
              id
          )
      io.in(squad_id).emit("delete", id)
      }  
      
  })
})
app.use((req, res, next) => {
  req.io = io;
  next()
})