'use strict'
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeUsersArray() {
  return [
    {
      id: 1,
      name: 'Test user 1',
      username: 'test-user-1',
      password: 'password',
      xp: 0,
      avatar: 'https://image.flaticon.com/icons/svg/78/78373.svg'
    },
    {
      id: 2,
      name: 'Test user 2',
      username: 'test-user-2',
      password: 'password',
      xp: 200,
      avatar: 'https://image.flaticon.com/icons/svg/78/78373.svg'
    },
    {
      id: 3,
      name: 'Test user 3',
      username: 'test-user-3',
      password: 'password',
      xp: 400,
      avatar: 'https://image.flaticon.com/icons/svg/78/78373.svg'
    },
    {
      id: 4,
      name: 'Test user 4',
      username: 'test-user-4',
      password: 'password',
      xp: 0,
      avatar: 'https://image.flaticon.com/icons/svg/78/78373.svg'
    }
  ]
}

function makeGameArray() {
  return [
    {
      game_title: 'testgame1',
      game_type: 'Video Games',
      image: 'testimage1',
      id: 1
    },
    {
      game_title: 'testgame2',
      game_type: 'Board Games',
      image: 'testimage1',
      id: 2
    },
    {
      game_title: 'testgame3',
      game_type: 'Card Games',
      image: 'testimage1',
      id: 3
    },
    {
      game_title: 'testgame4',
      game_type: 'Table Top Games',
      image: 'testimage1',
      id: 4
    }
  ]
}

function makeSquadList() {
  return [
    {
      id: 1,
      squad_name: 'testSquad1',
      squad_location: 'testLocation1',
      game_id: 1,
      leader: 1,
      capacity: 4
    },
    {
      id: 2,
      squad_name: 'testSquad2',
      squad_location: 'testLocation2',
      game_id: 1,
      leader: 2,
      capacity: 4
    },
    {
      id: 3,
      squad_name: 'testSquad3',
      squad_location: 'testLocation3',
      game_id: 3,
      leader: 3,
      capacity: 4
    },
    {
      id: 4,
      squad_name: 'testSquad4',
      squad_location: 'testLocation4',
      game_id: 4,
      leader: 4,
      capacity: 4
    }
  ]
}

function seedUsers(db, users) {
  const preppedUsers = users.map(user => {
    return { ...user, password: bcrypt.hashSync(user.password, 1) }
  })
  
  return db('users')
    .insert(preppedUsers)
    .then(() =>
      db.raw(`SELECT setval('users_id_seq', ?)`, [users[users.length - 1].id])
    )
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
  )
}

function seedGames(db, games) {
  return db('games')
    .insert(games)
    .then(() =>
      db.raw(`SELECT setval('games_id_seq', ?)`, [games[games.length - 1].id])
    )
}

function seedSquads(db, squads) {
  return db('squads')
    .insert(squads)
    .then(() =>
      db.raw(`SELECT setval('squads_id_seq', ?)`, [squads[squads.length - 1].id])
    )
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.username,
    algorithm: 'HS256'
  })

  return `Bearer ${token}`
}

function seedGamesUsers(db, games, users) {
  return db.transaction(async () => {
    await seedGames(db, games)
    await seedUsers(db, users)
  })
}

function seedGamesUsersSquads(db, games, users, squads) {
  return db.transaction(async () => {
    await seedGames(db, games)
    await seedUsers(db, users)
    await seedSquads(db, squads)
    await seedUserSquads(db, users[0], squads)
  })
}

function seedUserSquads(db, user, squads) {
  const userSquads = squads.map((squad, index) => {
    return {
      user_id: user.id,
      squad_id: squad.id
    }
  })

  return db('user_squads')
    .insert(userSquads)
}

function makeExpectedSquadsList(user, squads) {
  return squads.map(squad => {
    return  {
      game_id: squad.game_id,
      leader: squad.leader,
      name: user.name,
      squad_id: squad.id,
      squad_location: squad.squad_location,
      squad_name: squad.squad_name,
      userAvatar: user.avatar,
      user_id: user.id,
      username: user.username
    }
  })
}

module.exports = {
  makeUsersArray,
  makeAuthHeader,
  seedUsers,
  cleanTables,
  makeGameArray,
  seedGames,
  seedGamesUsers,
  makeSquadList,
  seedSquads,
  seedGamesUsersSquads,
  seedUserSquads,
  makeExpectedSquadsList
}
