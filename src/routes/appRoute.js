const express = require('express')

const router = express.Router()

const loginController = require('../controllers/loginController')


router.use('/login', loginController.login)


module.exports = router