const express = require('express')

const router = express.Router()

const loginController = require('../controllers/loginController')


router.post('/login', loginController.login)
router.post('/refresh-token', loginController.refresh)


module.exports = router