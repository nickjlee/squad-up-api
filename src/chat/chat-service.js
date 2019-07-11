const ChatService = {
  getChatById(db, squad_id) {
    return db
      .from('chat')
      .select(
        'chat.id',
        'chat.name',
        'chat.user_id',
        'chat.message_body',
        'chat.time_stamp',
        'chat.pinned',
      )
      .leftJoin(
        'squads AS sqd',
        'chat.id',
        'sqd.chat_id'
      )
      .groupBy('chat.id')
      .where('sqd.id', squad_id)
  },

  updateChat(db, name, user_id, message_body){
    return db
      .insert({ name, user_id, message_body})
      .into('chat')
      .returning('*')
  }
}



module.exports = ChatService