const express = require('express')
const routes = express.Router()
const bcrypt = require('bcrypt')
const Truyou = require('../model/thuyou')
const TruyouPassword = require('../model/truyoupassword')
const mongoose = require('mongoose')
const env = require('../config/env')
const jwt = require('jsonwebtoken')
const x509 = require('../services/x509')



let registrationAllow = true;
mongoose.connect(env.env.mongoHost);


routes.get('/test', (req, res) => {
   
})

routes.post('/register', (req, res) => {
    if(registrationAllow){
        if(req.body.user && req.body.password){
        user = new Truyou(req.body.user)
        password = req.body.password
        
        x509.gencert(user.username, 'Breda', 'Noord-Brabant','NL')
        .then((crt) => {
            let crt_encrypted = x509.encryptPEM(crt, user.username, password)

            bcrypt.genSalt(10, (err, salt) =>{
                bcrypt.hash(password, salt, (err, hash) => {
                    user.save()
                    .then((user) => {
                         password = new TruyouPassword({"username": user.username, "password": hash, 'pem': crt_encrypted});
                         return password.save()
                    })
                    .then((password) => {
                        res.status(200).send('account made')
                    })
                    .catch((error) => {
                       res.status(400).json({error: error})
                    })
                })      
            })
        })
        }else{
            res.status(400).json({'error': 'bad request, user and password are required'})
        }
    }else{
        res.status(400).json({error: 'registration is not allowed at this time'})
    }
});

routes.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if(username && password){
        TruyouPassword.findOne({username : username})
        .then((user) => {
            if(user){
                bcrypt.compare(password, user.password, (err, result) => {
               
                    if(err){
                        res.status(500).json({'error': 'internal sever error'})
                    }
                    if (result){
                        let token = jwt.sign({data: 'foobar'}, env.env.key, { expiresIn: '24h' })
                        let crt = x509.decryptPEM(user.pem, username, password)
                        Truyou.findOne({'username': username})
                        .then((userObj) => {
                            res.status(200).json({
                                'token': token,
                                "crt":{
                                    "private": crt.private, 
                                    "public": crt.public, 
                                    "cert":crt.cert
                                },
                                'user': userObj})
                        })
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
});


routes.post('/check', (req, res) => {
    let token = req.body.token;
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


