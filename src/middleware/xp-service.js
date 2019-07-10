async function grantXp(db, username, xp) {
  try {
    const userData = await _getUserXpStatus(db, username)
    const levelCap = await _getLevelCap(db)
    const newXp = Number(userData.xp) + xp
    let newLevel = Number(userData.level_id)

    if(newXp >= userData.xp_threshold && newLevel < Number(levelCap.level)) newLevel++

    const updatedInfo =  await _updateUserXp(db, username, newXp, newLevel)
    
    // returns an object with {user.id, user.username, user.xp, user.level_id}
    return updatedInfo[0]
  } catch (error) {
    console.error(error)
  }
}

function _getLevelCap(db) {
  return db('level')
    .select('level')
    .orderBy('level', 'desc')
    .first()
}

function _getUserXpStatus(db, username) {
  return db
    .from('users')
    .select(
      'users.xp',
      'users.level_id',
      'level.xp_threshold'
    )
    .where({ username })
    .leftJoin(
      'level',
      'users.level_id',
      'level.id'
    )
    .first()
}

function _updateUserXp(db, username, xp, level) {
  return db('users')
    .where({ username })
    .update({ xp, level_id: level }, ['id', 'username', 'xp', 'level_id'])
}

module.exports = {
  grantXp
}