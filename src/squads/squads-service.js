const xss = require('xss')

const SquadsService = {
  getSquadById(db, squad_id) {
    return db
      .from('squads AS sqd')
      .select(
        'sqd.id',
        'sqd.squad_name',
        'sqd.squad_location',
        'sqd.leader',
        'sqd.game_id',
        'sqd.chat_id'
      )
      .where('sqd.id', squad_id)
      .first()
  },

  getUserSquads(db, user_id) {
    return db
      .from('user_squads AS us')
      .select(
        'us.user_id',
        'us.squad_id',
        'usr.username',
        'usr.name',
        'usr.avatar as userAvatar',
        'sqd.squad_name',
        'sqd.squad_location',
        'sqd.leader',
        'sqd.game_id'
      )
      .leftJoin(
        'users AS usr',
        'us.user_id',
        'usr.id'
      )
      .rightJoin(
        'squads AS sqd',
        'us.squad_id',
        'sqd.id'
      )
      .where('us.user_id', user_id)
  },

  // create chat functionality will be done at chat endpoint
  // createChat(db, chat_id, squad_id) {

  // },

  addSquad(db, newSquad) {
    return db 
      .insert(newSquad)
      .into('squads')
      .returning('*')
      .then(([squad]) => squad)
      .then(squad =>
        SquadsService.getSquadById(db, squad.id) 
      )
  },

  insertTags(db, squad_id, newTags) {

  },

  joinSquad(db, user_id, squad_id) {
    return db
      .insert({user_id, squad_id})
      .into('user_squads')
      .returning('*')
  },

  updateXP(db, amount) {

  },

  serializeSquad(newSquad) {

  },

  serializeTags(tags) {

  },

}

module.exports = SquadsService