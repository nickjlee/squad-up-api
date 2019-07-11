const ChatService = {
  getAllChat(db, squad_id) {
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
      .where('chat.squad_id', squad_id)
  },

  updateChat(db, squad_id,  name, user_id, message_body) {
    return db
      .insert({ squad_id, name, user_id, message_body })
      .into('chat')
      .returning('*')
      .then(([res]) => res)
  }
}



module.exports = ChatService