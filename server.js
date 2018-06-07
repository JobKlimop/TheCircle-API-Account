const http = require('https')
const express = require('express')
const bodyParser = require('body-parser')
const env = require('./config/env')
const jwt = require('jsonwebtoken')
const account = require('./api/account')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise;

const app = express();
module.exports = {}

app.use(bodyParser.json())
app.use(bodyParser.json({type: 'application/vnd.api+json'}))

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', process.env.ALLOW_ORIGIN || 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.set('port', env.env.port)
app.set('env', 'development')



// login and register endpoints
app.use('/api/account', account)


// token check
app.use('*', (req, res, next) => {
    let token = req.headers.token
    if (token){
        jwt.verify(token, env.env.key, (err, decode) => {
            if(err){
                res.status(402).json({'error': 'unauthorized, token invalid'})
            }else{
                next()
            }
        })
    }else{
        res.status(402).json({'error': 'unauthorized, please supply a token'})
    }
})

app.listen(env.env.port, () => {
    console.log('server online, listening on port ' + env.env.port)
})

module.exports = app




