const jsrsasign = require('jsrsasign')
const selfsigned = require('self-signed')
const crypto = require('crypto')
const forge = require('node-forge')
const fs = require('fs')


function gencert(name, city, state, country) {
//    let privatekey
//     fs.readFile('../assets/privatedec.key', (err, data) => {
//         privatekey = data
//     })

    let keys = forge.pki.rsa.generateKeyPair(2048);
    privatekey = keys.privatekey


   let cert = forge.pki.createCertificate()
   cert.publicKey = privatekey
   cert.serialNumber = '01'
   cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);
   let attrsIssuer = [{
    name: 'commonName',
    value: 'The Circle CA'
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
    value: 'Certificate Authority'
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

  cert.setExtensions([{
    name: 'basicConstraints',
    cA: true
  }, {
    name: 'keyUsage',
    keyCertSign: true,
    digitalSignature: true,
    nonRepudiation: true,
    keyEncipherment: true,
    dataEncipherment: true
  }, {
    name: 'extKeyUsage',
    serverAuth: true,
    clientAuth: true,
    codeSigning: true,
    emailProtection: true,
    timeStamping: true
  }, {
    name: 'nsCertType',
    client: true,
    server: true,
    email: true,
    objsign: true,
    sslCA: true,
    emailCA: true,
    objCA: true
  }, {
    name: 'subjectAltName',
    altNames: [{
      type: 6, // URI
      value: 'http://example.org/webid#me'
    }, {
      type: 7, // IP
      ip: '127.0.0.1'
    }]
  }, {
    name: 'subjectKeyIdentifier'
  }]);

  cert.sign(privatekey)
  return cert
  
  

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