const express = require('express')
const router = express.Router()


const movieController = require('../../controllers/movieControllers')

router.get('/', movieController.getAll)

router.post('/add', movieController.insertData)


module.exports = router