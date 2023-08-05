const router = require('express').Router()

const checkLogin = require('../middleware/checkLogin')
const ticketController = require('../controllers/ticketController')

router.post('/add', checkLogin, ticketController.insertData)

module.exports = router