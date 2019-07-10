const express = require('express');
const {requireAuth} = require('../middleware/jwt-auth')
const userInfoService = require('./userInfo-Service')
const userInfoRouter = express.Router()

userInfoRouter
.all(requireAuth)
.get("/:username", async (req, res, next) => {
    try{
        const { username } = req.params
        const userInfo = await userInfoService.getInfoByName(
            req.app.get('db'),
            username
        )

        return res.json(userInfo[0])
    }
    catch(err){
        next(err)
    }
})

module.exports = userInfoRouter
