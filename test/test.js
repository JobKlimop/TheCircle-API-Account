process.env.NODE_ENV = 'test'

const mongoose = require('mongoose')
const Truyou = require('../model/thuyou')
const Truyoupassword = require('../model/truyoupassword')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const should = chai.should()
const jwt = require('jsonwebtoken')
const env = require('../config/env')
const assert = require('assert')


chai.use(chaiHttp)

describe('POST login', () => {
    it('Login and get a valid token', (done) => {

        body = {
            "username": "mika",
            "password": "test"
        }

        chai.request(server)
        .post('/api/account/login')
        .send(body)
        .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('token')
            jwt.verify(res.body.token, env.env.key, (err, decode) => {
                assert(decode)
                done()
            })  
            
        })
    })
})