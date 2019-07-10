function updateXp(db, user_id, amount) {
  return db 
    .from('users')
    .where('id', user_id)
    .update('xp', amount)
}

module.exports = updateXp