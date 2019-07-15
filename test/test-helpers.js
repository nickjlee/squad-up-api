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
function makeGameArray() {
  return [
    {
      game_title:"testgame1",
      game_type:"test1",
      image:"testimage1",
      id:1,
      no_squads:2
    },
    {
      game_title:"testgame2",
      game_type:"test1",
      image:"testimage1",
      id:2,
      no_squads:0
    },
    {
      game_title:"testgame3",
      game_type:"test2",
      image:"testimage1",
      id:3,
      no_squads:1
    },
    {
      game_title:"testgame4",
      game_type:"test3",
      image:"testimage1",
      id:4,
      no_squads:1
    },
  ]
}
function makeSquadList(){
  return [
    {
      squad_name:"testSquad1",
      squad_location:"testLocation1",
      game_id:1,
      leader:1,
      capacity:4
    },
    {
      squad_name:"testSquad2",
      squad_location:"testLocation2",
      game_id:1,
      leader:2,
      capacity:4
    },
    {
      squad_name:"testSquad3",
      squad_location:"testLocation3",
      game_id:3,
      leader:3,
      capacity:4
    },
    {
      squad_name:"testSquad4",
      squad_location:"testLocation4",
      game_id:4,
      leader:2,
      capacity:4
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
function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      users,
      games,
      squads,
      user_squads
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

function seedGamesAndUsers(db, users, games){
  return db.transaction(async () =>{
    await seedUsers(db, users);
    await seedGames(db,games);
  })
}

function seedGameSquadUsers(db, users, games, squads){
  return db.transaction(async () => {
    await seedUsers(db, users);
    await seedGames(db, games);
    await seedSquads(db, squads);
  })
}

module.exports = {
  makeUsersArray,
  makeAuthHeader,
  seedUsers,
  cleanTables,
  makeGameArray,
  seedGames,
  seedGamesAndUsers,
  makeSquadList,
  seedSquads,
  seedGameSquadUsers
};
