const express = require('express');
const {requireAuth} = require('../middleware/jwt-auth')
const userInfoService = require('./userInfo-Service')
const userInfoRouter = express.Router()

userInfoRouter
.all(requireAuth)
.get("/:id", async (req, res, next) => {
    try{
        const { id } = req.params
        const userInfo = await userInfoService.getInfo(
            req.app.get('db'),
            id
        )

        return res.json(userInfo[0])
    }
    catch(err){
        next(err)
    }
})

module.exports = userInfoRouter
