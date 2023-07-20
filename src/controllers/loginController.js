
const account = require('../models/Account')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')
require('dotenv').config()

const user = require('../models/User')





const loginController = {


    login: async (req, res) => {

        const accessTokenExpired = '15m'
        const refreshTokenExpired = '7d'
        const secrectKey = fs.readFileSync('././keys/private_key.pem')

        const username = req.body.username
        const password = req.body.password

        const checkMapPassword = (hash) => {
            return bcrypt.compareSync(password, hash)
        }

        const dataAccount = await account.findAll()
        if (dataAccount.length > 0) {
            dataAccount.forEach((item) => {
                if (item.username === username && checkMapPassword(item.password)) {

                    const accessToken = jwt.sign({ user: item._id }, secrectKey, { expiresIn: accessTokenExpired, algorithm: 'RS256' })
                    const refreshToken = jwt.sign({ user: item._id }, secrectKey, { expiresIn: refreshTokenExpired, algorithm: 'RS256' })
                    if (accessToken.length > 0 && refreshToken.length > 0) {
                        res.status(200).json({
                            accessToken: accessToken,
                            refreshToken: refreshToken
                        })
                    } else {
                        res.status(500).json({ message: "system error" })
                    }
                }
            })
            res.status(403).json({ message: false })
        } else {
            res.status(500).json({ message: "system error" })
        }
    }

}

module.exports = loginController

