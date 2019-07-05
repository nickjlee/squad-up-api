
const GamesService = {
  getAllGames(db) {
    return db
      .from('games AS gm')
      .select(
        'gm.id',
        'gm.game_title',
        'gm.image',
        'gm.game_type',
        db.raw(
          `count(DISTINCT sqd) AS number_of_squads`
        )
      )
      .leftJoin(
        'squads AS sqd',
        'gm.id',
        'sqd.game_id'
      )
  },

  getGameById(db, id) {
    return GamesService.getAllGames(db)
      .where('gm.id', id)
      .first()
  }, 

  getSquadsForGame(db, game_id) {
    return db
      .from('squads as sqd')
      .select(
        'sqd.id',
        'sqd.squad_name',
        'sqd.squad_location',
        ...userFields
      )
      .where('sqd.game_id', game_id)
      .leftJoin(
        'users AS usr',
        'sqd.leader',
        'usr.id'
      )
      .groupBy('sqd.id', 'usr.id')
  }
}

const userFields = [
  'usr.id AS userId',
  'usr.username AS userName',
  'usr.name AS name',
  'usr.avatar AS avatar'
]

module.exports = GamesService

