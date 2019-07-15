const livechatService = {
    getAllChat(db, id){
        return db
            .from('chat AS c')
            .select(
                'c.message_body',
                'u.username',
                'c.time_stamp',
                's.squad_name',
                'c.id'
            )
            .where( { squad_id : id } )
            .leftJoin(
                'squads AS s',
                'c.squad_id',
                's.id'
            )
            .leftJoin(
                'users AS u',
                'c.user_id',
                'u.id'
            )
            

    },
    insertChat(db, newChat){
        return db('chat AS c')
            .insert( newChat )
            .returning(
                '*'
            )     
    },
    validateId(db, id){
        return db
        .from('squads')
        .select('*')
        .where({ id }) 
    },
    findUserId(db, name){
        return db
            .from('users')
            .select('users.id')
            .where({ username: name })
    },
    deleteChat(db, id){
        return db
            .from('chat')
            .where({ id })
            .del()
    },
    findUserName(db, id){
        return db
            .from('users')
            .select('users.username')
            .where({ id })
    },
    getChat(db, id){
        return db
            .from('chat AS c')
            .select(
                'c.message_body',
                'u.username',
                'c.time_stamp',
                's.squad_name',
                'c.id'
            )
            .where('c.id','=',id )
            .leftJoin(
                'squads AS s',
                'c.squad_id',
                's.id'
            )
            .leftJoin(
                'users AS u',
                'c.user_id',
                'u.id'
            )
    },
    findChat(db, id){
        return db('chat')
            .select('chat.user_id')
            .where({ id })
    }
}

module.exports = livechatService;

