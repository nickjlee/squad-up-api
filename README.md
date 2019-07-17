# Squad Up (logo)

[SquadUp Live](https://squadup.now.sh "Live Site")

[SquadUp Repo](https://github.com/cgillette12/Squad-up-Client "Front End Repo")

Created by gamers to bring all your gaming communities under one roof. Find new squads to enjoy your favorite activities from competitive FPS and MMO's to classic table-top RPGs, card games and even sports. No more bouncing from app to app to find like-minded gamers. 

## V1 Feature List
* Join squads to play or talk about your favorite games.
* Add new squads to create your very own community within each game.
* Stay connected with your squadmates using the dedicated live chat for each squad. 
* Conveniently keep track of the squads you've joined and the members in each of those squads. 
* Gain XP and level up by being active in the community. Joining and creating squads will give you XP for bragging rights and more (coming soon). 

## V2 Feature List (Coming Soon)
* Send chats directly to other users and create custom chat rooms. 
* Visit other user profiles to compare levels, invite to squads and send messages. 
* Manage squads to remove or block trolls.

## Tech Stack
Created with Node.js, Express, PostgreSQL, Knex.js, Socket.io and JWT. 

## API 

/api

├── /auth
│   └── POST
│   |   └── /token
│   └── PUT
│       └── /token
|
├── /user
│   └── GET /
│   |   └── /:id
│   └── POST
│       └── /:id
|
├── /games
│   └── GET
│       ├── /
│       ├── /:id
│       └── /:id/squads
|
├── /squads
│   └── GET
│   |   ├── /
│   |   └── /members
│   └── POST
│       ├── /join
│       └── /add
|
├── /chat
│   └── GET
│       └── /:id

## Created By
* [Adam](https://github.com/AdamPavlicek "Adam's Github")
* [Cody](https://github.com/cgillette12 "Cody's Github")
* [Cristian](https://github.com/therealcriscam "Cristian's Github")
* [Harrison](https://github.com/hhcgit "Harrison's Github")
* [Nick](https://github.com/nickjlee "Nick's Github")