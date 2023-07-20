const fs = require('fs')


const privateKey = fs.readFileSync('./keys/private_key.pem')

console.log(privateKey)