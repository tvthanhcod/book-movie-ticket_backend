const mysql = require('mysql2')
require('dotenv').config()

const db = mysql.createPool({
    host: process.env.HOST,
    database: process.env.DB,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.SQL_PORT
})

db.getConnection((err) => {
    err ? console.log(err) : console.log('connect to DB success!')
})

module.exports = db