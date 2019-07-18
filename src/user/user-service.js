const bcrypt = require('bcryptjs')
const xss = require('xss')

const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/

const UserService = {
  hasUserWithUserName(db, username) {
    return db('users')
      .where({ username })
      .first()
      .then(user => !!user)
  },
  insertUser(db, newUser) {
    return db
      .insert(newUser)
      .into('users')
      .returning('*')
      .then(([user]) => user)
  },
  validatePassword(password) {
    if (password.length < 8) {
      return 'Password be longer than 8 characters'
    }
    if (password.length > 72) {
      return 'Password be less than 72 characters'
    }
    if (password.startsWith(' ') || password.endsWith(' ')) {
      return 'Password must not start or end with empty spaces'
    }
    if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
      return 'Password must contain one upper case, lower case, number and special character'
    }
    return null
  },
  hashPassword(password) {
    return bcrypt.hash(password, 12)
  },
  serializeUser(user) {
    return {
      id: user.id,
      name: xss(user.name),
      username: xss(user.username),
    }
  },

  getUserInfo(db, user_id) {
    return db 
      .from('users AS u')
      .select(
        'u.id',
        'u.username',
        'u.name',
        'u.avatar',
        'u.xp',
        'l.level',
        'l.xp_threshold'
      )
      .leftJoin(
        'level as l',
        'u.level_id',
        'l.id'
      )
      .where('u.id', user_id)
      .first()
  }
}

module.exports = UserService
