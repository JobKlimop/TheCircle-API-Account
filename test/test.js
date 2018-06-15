process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const Truyou = require('../model/thuyou');
const Truyoupassword = require('../model/truyoupassword');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
const jwt = require('jsonwebtoken');
const env = require('../config/env');
const assert = require('assert');
const jsrsasign = require('jsrsasign')


chai.use(chaiHttp);


describe('POST login', (done) => {

    let resbody;

    before((done) => {

        body = {
            "username": "mika",
            "password": "test"
        };

        chai.request(server)
        .post('/api/account/login')
        .send(body)
        .end((err, res) => {
            resbody = res.body
            done()
            
        })
    })

    it('Login and get a valid response', (done) => {

        
        body = {
            "username": "mika",
            "password": "test"
        };

        chai.request(server)
            .post('/api/account/login')
            .send(body)
            .end((err, res) => {
                if(err){
                    assert(true == false)
                    done()
                }
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('token');
                res.body.should.have.property('crt');
                res.body.should.have.property('user')
                assert(res.body.user != undefined)
                jwt.verify(res.body.token, env.env.key, (err, decode) => {
                    assert(decode);
                    done()
                })
                
            })
    })

    it('test if a signed message can be verified', (done) => {

        // Setting the test message
        const message = 'test message'


        // Signing the message
        let sigS = new jsrsasign.KJUR.crypto.Signature({'alg': 'SHA256withRSA'});
        sigS.init(resbody.crt.private);
        sigS.updateString(message);
        let signature = sigS.sign();

        // Verifying the message
        let sigV = new jsrsasign.KJUR.crypto.Signature({"alg": "SHA256withRSA"});
        sigV.init(resbody.crt.cert)
        sigV.updateString(message)
        let isvalid = sigV.verify(signature)

        assert(isvalid)
        done()
    })
});