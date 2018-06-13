const jsrsasign = require('jsrsasign')
const selfsigned = require('self-signed')
const crypto = require('crypto')


function gencert(name, city, state, country) {
    let pems = selfsigned.generate({
        name: name,
        country: country,
        city: city,
        state: state,
        organization: 'Test',
        unit: 'Test'
      }, {
        keySize: 2048, // default
        expire: 2 * 365 * 24 * 60 * 60 * 1000 // defaults to exactly 1 year
      });

      return pems
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