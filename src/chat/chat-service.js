const ChatService = {
  getChatById(db, chat_id) {
    return db
      .from('chat')
      .select(
        'chat.id',
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
      .where('chat.id', chat_id)
      .first()
  }
}

module.exports = ChatService