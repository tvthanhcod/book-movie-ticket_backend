const jwt = require('jsonwebtoken')
const fs = require('fs')

const secrectKey = fs.readFileSync('src/key/private_key.pem')

const checkLogin = (req, res, next) => {
    const accessToken = req.headers['authorization'].split('Bearer ')[1]
    if (accessToken) {
        try {
            const { user } = jwt.verify(accessToken, secrectKey, { algorithms: 'RS256' })
            if (user) {
                req.body.account_id = user
                next()
            } else {
                res.status(400).json({ errorCode: 3, errorMessage: "ACCESSTOKEN INVALID" })
            }
        } catch (error) {
            res.json({ errorCode: 2, errorMessage: "NOT LOGIN" })
        }
    } else {
        res.json({ errorCode: 2, errorMessage: "NOT LOGIN" })
    }
}


module.exports = checkLogin