const jsrsasign = require('jsrsasign')
const selfsigned = require('self-signed')
const crypto = require('crypto')
const forge = require('node-forge')
const fs = require('fs')


function gencert(name, city, state, country) {
   let CAprivatekey = `-----BEGIN RSA PRIVATE KEY-----
   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
   -----END RSA PRIVATE KEY-----
   `
   let CAcerficate
   let object
    
    

    const promise = new Promise((resolve, reject) => {
        fs.readFile('assets/cert.crt', (err, certdata) => {
                if(err){
                    reject('erron in read file')
                }

                CAcerficate = certdata.toString()
                let keys = forge.pki.rsa.generateKeyPair(2048);
                let cert = forge.pki.createCertificate()
                cert.publicKey = keys.publicKey
                cert.serialNumber = '01'
                cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);
                let attrsIssuer = [{
                 name: 'commonName',
                 value: 'The Circle'
               }, {
                 name: 'countryName',
                 value: 'NL'
               }, {
                 shortName: 'ST',
                 value: 'Noord-Brabant'
               }, {
                 name: 'localityName',
                 value: 'Breda'
               }, {
                 name: 'organizationName',
                 value: 'The Circle'
               }, {
                 shortName: 'OU',
                 value: 'The Circle'
               },{
                 shortName: 'E',
                 value: 'thecircle@the.circle'
               }];
             
               let attrsSubject = [{
                 name: 'commonName',
                 value: name
               }, {
                 name: 'countryName',
                 value: country
               }, {
                 shortName: 'ST',
                 value: state
               }, {
                 name: 'localityName',
                 value: city
               }, {
                 name: 'organizationName',
                 value: 'The Circle'
               }, {
                 shortName: 'OU',
                 value: 'Users'
               }];
             
               cert.setIssuer(attrsIssuer)
               cert.setSubject(attrsSubject)
             
             
               cert.sign(forge.pki.privateKeyFromPem(CAprivatekey))
             
               let pem =  forge.pki.certificateToPem(cert)
               object = {
                    "private": forge.pki.privateKeyToPem(keys.privateKey),
                    "public": forge.pki.publicKeyToPem(keys.publicKey),
                    "cert": pem
                }   
            resolve(object)  
        })
       
    })

    return promise
}

function encryptPEM(PEM, username, password){
   let key = crypto.createHash('sha256').update(username+password, 'utf-8').digest('hex')
   let cipher = crypto.createCipher('AES256', key)
   let ciphered = cipher.update(JSON.stringify(PEM), 'utf-8', 'hex')
   ciphered += cipher.final('hex')
   return ciphered
}

function decryptPEM(ciphertext, username, password){
    let key = crypto.createHash('sha256').update(username+password, 'utf-8').digest('hex')
    let decipher = crypto.createDecipher('AES256', key)
    let deciphered = decipher.update(ciphertext, 'hex', 'utf-8')
    deciphered += decipher.final('utf-8')

    return JSON.parse(deciphered)
 
}

module.exports = { gencert, encryptPEM, decryptPEM}