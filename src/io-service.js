const config = require('./config');
const uuid = require('uuid');
const xss = require('xss');
// const { requireSocketAuth } = require('./jwt-auth');

const ioService = {
	setUpIo(ioInstance) {
		io = ioInstance

		io.on("connection", function (socket) {
			// socket.on("leave squad", async function (msg) {
			// 	const db = app.get('db');
			// 	const { id, user_auth } = msg

			// 	try {
			// 		const user_id = await requireSocketAuth(db, user_auth)



			// 	}
			// 	catch{

			// 	}
			// })

			socket.on("join squad", function (id) {
				socket.join(id);
			});

			socket.on("chat message", async function (msg) {
				const { message_body, name,  user_id, id } = msg

				message_body = xss(message_body)
				let db = app.get('db')

				await db('chat')
				.insert({
					message_body,
					name,
					user_id,
					id
				})
				.returning('*')
				.where({ id })
				.then(chats => {
					io.sockets.in(room_id).emit("update chat", chats)
				})


			})
			// socket.on("edit message", function(){

			// })
			// socket.on("delete message", async function(){
			// 	await 
			// })
		})
	},
	setApp(appInstance) {
    app = appInstance;
  }
};

module.exports = ioService;