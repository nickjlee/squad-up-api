const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')

const AuthService = {
  getUserWithUserName(db, username) {
    return db('users AS u')
      .select(
        'u.username',
        'u.name',
        'u.avatar',
        'u.xp',
        'l.xp_threshold',
        'u.level_id',
        'u.password'
      )
      .where("u.username","=",username)
      .leftJoin(
        'level AS l',
        'u.level_id',
        'l.id'
      )
  },
  comparePasswords(password, hash) {
    return bcrypt.compare(password, hash)
  },
  createJwt(subject, payload) {
    return jwt.sign(payload, config.JWT_SECRET, {
      subject,
      expiresIn: config.JWT_EXPIRY,
      algorithm: 'HS256',
    })
  },
  verifyJwt(token) {
    return jwt.verify(token, config.JWT_SECRET, {
      algorithms: ['HS256'],
    })
  },
}

module.exports = AuthService
