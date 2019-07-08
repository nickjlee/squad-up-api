
const squadService = {
    getSquadInfo(db, id){
        return db
            .from('squads')
            .select('*')
            .where({ id })
    },
    getSquadName(db, name){
        return db
            .from('squads')
            .select('*')
            .where({ squad_name: name })
    },
    findUserId(db, username){
        return db
            .from('users')
            .select(
                'id'
            )
            .where({ username })
    },
    insertSquad(db, newSquad){
        return db
            .insert(newSquad)
            .into('squads')
            .returning('*')
            .then( ([squad]) => squad)
    }
}

module.exports = squadService;