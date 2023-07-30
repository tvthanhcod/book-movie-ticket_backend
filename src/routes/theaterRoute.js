const express = require('express')
const theaterController = require('../controllers/theaterController')
const router = express.Router()

router.get('/', theaterController.getAll)
router.get('/area', theaterController.getArea)
router.get('/detail/:id/:date', theaterController.getTheaterById)
router.get('/:id', theaterController.getAllTheaterByLocation)



module.exports = router