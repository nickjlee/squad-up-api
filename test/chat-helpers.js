'use strict';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../src/config')

function makeUserArray(){
    return [
        {
            id: 1,
            name: 'Test user 1',
            username: 'test-user-1',
            password: 'password',
            xp:0,
            level_id:1,
            avatar:'https://image.flaticon.com/icons/svg/78/78373.svg'
          }
    ]
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
function makeGameList(){
  return [
    {
      game_title:"testgame1",
      game_type:"test1",
      image:"testimage1",
      id:999,
      game_type:'Video Games'
    }
  ]
}
function makeSquadList(){
    return [
        {
            squad_name:"testSquad4",
            squad_location:"testLocation4",
            leader:1,
            capacity:9999,
            game_id:999
          }
    ]
}
function makeChatList(){
    return [
        {
            message_body:"test chat 1",
            user_id:1,
            squad_id:999,
            time_stamp:"2019-07-12 16:39:53.401303"
        }
    ]
}
function seedChat(db, chat){
    return db('chat').insert(chat)
    .then(
      db.raw('SELECT setval("chat_id_seq", ?', [chat[chat.length-1].id])
    )
}
function cleanTables(db) {
    return db.raw(
      `TRUNCATE
        users,
        squads,
        chat
        RESTART IDENTITY CASCADE
      `
    );
  }
function seedGames(db, games){
    return db('games').insert(games)
      .then(() => {
        db.raw('SELECT setval("games_id_seq", ?', [games[games.length-1].id]);
      })
  }
  function seedSquads(db, squads){
    return db('squads').insert(squads)
    .then(
      db.raw('SELECT setval("squads_id_seq", ?', [squads[squads.length-1].id])
    )
  }

  function makeAuthHeader(user, secret = config.JWT_SECRET) {
    const payload = {
        user_id:user.id,
        name:user.name,
        avatar: user.avatar,
        xp: user.xp
    }
  const token = jwt.sign(payload, secret, {
    subject: user.username,
    algorithm: 'HS256',
  });
  return `Bearer ${token}`;
}

module.exports = {
    makeUserArray,
    makeAuthHeader,
    makeSquadList,
    seedSquads,
    seedUsers,
    cleanTables,
    makeChatList,
    seedChat,
    seedGames,
    makeGameList
}