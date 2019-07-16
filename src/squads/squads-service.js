const xss = require('xss')

const SquadsService = {
  getSquadById(db, squad_id) {
    return db
      .from('squads AS sqd')
      .select('*')
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

  getSquadMembers(db, squad_id) {
    return db
      .from('user_squads AS us')
      .select(
        'us.user_id',
        'us.squad_id',
        'usr.username',
        'usr.name',
        'usr.avatar'
      )
      .leftJoin(
        'users AS usr',
        'us.user_id',
        'usr.id'
      )
      .where('us.squad_id', squad_id)
  },

  addSquad(db, squad) {
    return db 
      .insert(squad)
      .into('squads')
      .returning('*')
      .then(([squad]) => squad)
      .then(squad => 
        SquadsService.getSquadById(db, squad.id) 
      )
  },

  hasSquadWithSquadName(db, squadName) {
    return db
      .from('squads')
      .where({squad_name: squadName})
      .first()
      .then(squad => !!squad)
  },

  insertTags(db, tag) {
    return db
      .insert(tag)
      .into('tags')
      .returning('*')
      .then(([newTag]) => newTag)
  },

  addTagsToSquad(db, squad_id, tags_id) {
    return db
      .insert({squad_id, tags_id})
      .into('squads_tags')
      .returning('*')
  },

  joinSquad(db, user_id, squad_id) {
    return db
      .insert({user_id, squad_id})
      .into('user_squads')
      .returning('*')
  },

  hasUserWithUserId(db, userId, squadId) {
    return db
      .from('user_squads')
      .where({
        user_id: userId,
        squad_id: squadId
      })
      .first()
      .then(userSquad => !!userSquad)
  },

  serializeSquad(squad) {
    return {
      id: squad.id,
      squad_name: xss(squad.squad_name),
      squad_location: xss(squad.squad_location),
      leader: squad.leader,
      game_id: squad.game_id,
    }
  },

  serializeTags(tag) {
    return {
      id: tag.id,
      tag: xss(tag.tag)
    }
  },

}

module.exports = SquadsService