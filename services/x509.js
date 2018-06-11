const jsrsasign = require('jsrsasign')
const selfsigned = require('self-signed')
const crypto = require('crypto-js')

function gencert(name, city, state) {
    let pems = selfsigned.generate({
        name: name,
        city: city,
        state: state,
        organization: 'Test',
        unit: 'Test'
      }, {
        keySize: 1024, // default
        expire: 2 * 365 * 24 * 60 * 60 * 1000 // defaults to exactly 1 year
      });

      return pems
}

// function encryptPEM(pem, username, password){
//     let key = crypto.SHA256(username+password)
//     let cipher = crypto.AES.encrypt(PEM, )
// }

module.exports = { gencert }