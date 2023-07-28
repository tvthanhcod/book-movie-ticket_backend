const user = require('../models/User')
const account = require('../models/Account')
const bcrypt = require('bcrypt')
require('dotenv').config()

class userController {

    static async getAll(req, res) {
        const users = await user.findAll()
        users ? res.status(200).json(users) : res.status(500).json('message: system error')
    }

    static async getUser(req, res) {
        const userID = req.params.id
        const userFind = await user.find(userID)
        userFind ? res.status(200).json(userFind) : res.status(500).json('message: system error')
    }

    static async addNew(req, res) {
        const salt = bcrypt.genSaltSync(Number(process.env.SALT))
        const hashPass = bcrypt.hashSync(req.body.password, salt)
        const fields = { ...req.body, password: hashPass }
        const result = await user.insert(fields)
        result ? res.status(200).json({ message: true }) : res.status(500).json({ message: false })
    }

    static updateUser(req, res) {
        const userUpdate = req.body.id
        const dataUpdate = req.body
        const statusUpdate = user.updateUser(userUpdate, dataUpdate)
        statusUpdate ? res.status(200).json("message: update success") : res.status(500).json("message: update fail")
    }

    static async deleteUser(req, res) {
        const userId = req.body.id;
        const status = await user.deleteOne(userId)
        status ? res.status(200).json({ message: "delete success" }) : res.status(500).json({ message: "delete fail" })
    }

    static async changePassword(req, res) {
        const userId = req.body.id
        const changePassword = req.body.password
        const salt = bcrypt.genSaltSync(Number(process.env.SALT))
        const newPassHash = bcrypt.hashSync(changePassword, salt)
        const statusChangePassword = await account.updatePassword(userId, newPassHash)
        statusChangePassword ? res.status(200).json("message: update password success") : res.status(500).json("message: update password fail")
    }
}

module.exports = userController