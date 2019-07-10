const userInfoService = {
    getInfo(db, id){
        return db('users AS u')
            .select(
                'u.username',
                'u.name',
                'u.avatar',
                'u.xp',
                'l.xp_threshold',
                'u.level_id'
            )
            .where("u.id","=",id)
            .leftJoin(
                'level AS l',
                'u.level_id',
                'l.id'
            )
    }
}

module.exports = userInfoService