const express = require('express')
const routes = express.Router()
const bcrypt = require('bcrypt')
const Truyou = require('../model/thuyou')
const TruyouPassword = require('../model/truyoupassword')
const mongoose = require('mongoose')
const env = require('../config/env')
const jwt = require('jsonwebtoken')
const x509 = require('../services/x509')


let registrationAllow = true
mongoose.connect(env.env.mongoHost)


routes.post('/register', (req, res) => {
    if(registrationAllow){
        if(body.user && body.password){
        user = new Truyou(req.body.user)
        password = req.body.password
        
        let crt = x509.gencert(username, 'Breda', 'Noord-Brabant')
           
        

        bcrypt.genSalt(10, (err, salt) =>{
            bcrypt.hash(password, salt, (err, hash) => {
                user.save()
                .then((user) => {
                     password = new TruyouPassword({"username": user.name, "password": hash})
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
            res.status(400).json({'error': 'bad request, user and password are required'})
        }
    }else{
        res.status(400).json({error: 'registration is not allowed at this time'})
    }
})

routes.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    if(username && password){
        TruyouPassword.findOne({name : username})
        .then((user) => {
            if(user){
                bcrypt.compare(password, user.password, (err, result) => {
               
                    if(err){
                        res.send('jsdfh')
                    }
                    if (result){
                        let token = jwt.sign({data: 'foobar'}, env.env.key, { expiresIn: '24h' })
                        res.status(200).json({'token': token})
                    }else{
                        res.status(402).json({"error": 'unauthorized'})
                    }
                })
            }else{
                res.status(401).json({'error': 'user does not exist'})
            }
        })
    }else{
        res.status(400).json({'error': 'username and password are required'})
    }
})


routes.post('/check', (req, res) => {
    let token = req.body.token
    if (token){
        jwt.verify(token, env.env.key, (err, decode) => {
            if(err){
                res.status(402).json({'error': 'unauthorized, token invalid'})
            }else{
                res.status(200).json({'succes': 'token valid'})
            }
        })
    }else{
        res.status(402).json({'error': 'unauthorized, please supply a token'})
    }
})


routes.post('/test', (req, res) => {
    
})
module.exports = routes