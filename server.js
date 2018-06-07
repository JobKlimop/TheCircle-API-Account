const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const env = require('./config/env')
const jwt = require('jsonwebtoken')
const account = require('./api/account')

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



app.use('/api/account', account)

app.use('*', (req, res, next) => {
    res.status(404).send('not found')
})

app.listen(env.env.port, () => {
    console.log('server online, listening on port ' + env.env.port)
})

module.exports = app




