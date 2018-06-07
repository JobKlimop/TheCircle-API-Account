const express = require('express')
const routes = express.Router()
const bcrypt = require('bcrypt')
const Truyou = require('../model/thuyou')
const TruyouPassword = require('../model/truyoupassword')
const mongoose = require('mongoose')
const env = require('../config/env')
const jwt = require('jsonwebtoken')

let registrationAllow = true
mongoose.connect(env.env.mongoHost)


routes.post('/register', (req, res) => {
    if(registrationAllow){
        user = new Truyou(req.body.user)
        password = req.body.password
        bcrypt.genSalt(10, (err, salt) =>{
            bcrypt.hash(password, salt, (err, hash) => {
                user.save()
                .then((user) => {
                     password = new TruyouPassword({"name": user.name, "password": hash})
                     return password.save()
                })
                .then((password) => {
                    res.status(200).send('account made')
                })
                .catch((error) => {
                   res.status(400).json({error: 'something went wrong'})
                })
            })      
        })
    }else{
        res.status(400).json({error: 'registration is not allowed at this time'})
    }
})

routes.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    TruyouPassword.findOne({name : username})
    .then((user) => {
        bcrypt.compare(password, user.password, (err, result) => {
            if (result){
                let token = jwt.sign({data: 'foobar'}, 'secret', { expiresIn: '1h' })
                res.status(200).json({'token': token})
            }else{
                res.status(402).json({"error": 'unauthorized'})
            }
        })
    })
})

module.exports = routes