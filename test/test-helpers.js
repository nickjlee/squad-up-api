'use strict';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function makeUsersArray() {
  return [
    {
      id: 1,
      name: 'Test user 1',
      username: 'test-user-1',
      password: 'password',
      xp:0,
      level_id:1,
      avatar:'https://image.flaticon.com/icons/svg/78/78373.svg'
    },
    {
        id: 2,
        name: 'Test user 2',
        username: 'test-user-2',
        password: 'password',
        xp:200,
        level_id:1,
        avatar:'https://image.flaticon.com/icons/svg/78/78373.svg'
    },
    {
        id: 3,
        name: 'Test user 3',
        username: 'test-user-3',
        password: 'password',
        xp:400,
        level_id:1,
        avatar:'https://image.flaticon.com/icons/svg/78/78373.svg'
    },
    {
        id: 4,
        name: 'Test user 4',
        username: 'test-user-4',
        password: 'password',
        xp:0,
        level_id:2,
        avatar:'https://image.flaticon.com/icons/svg/78/78373.svg'
    },
  ];
}

function seedUsers(db, users) {
  const preppedUsers = users.map(user => {
    return {...user, password: bcrypt.hashSync(user.password, 1)};
  });
  return db('users').insert(preppedUsers)
    .then(() => {
      db.raw('SELECT setval("users_id_seq", ?)', [users[users.length-1].id]);
    });
}
function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      users CASCADE
    `
  );
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
    const payload = {
        user_id:user.id,
        name:user.name,
        avatar:user.avatar,
        xp:user.xp,
        level:user.level_id
    }
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: payload,
    algorithm: 'HS256',
  });
  return `Bearer ${token}`;
}

module.exports = {
  makeUsersArray,
  makeAuthHeader,
  seedUsers,
  cleanTables
};
