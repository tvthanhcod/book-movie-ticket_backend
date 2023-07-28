const express = require('express')
const theaterController = require('../controllers/theaterController')
const router = express.Router()


router.get('/area', theaterController.getArea)
router.get('/:id', theaterController.getAllTheater)


module.exports = router