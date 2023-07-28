const express = require('express')
const uploadCloud = require('../middleware/upLoader')
const router = express.Router()


const movieController = require('../controllers/movieController')

router.get('/:id', movieController.getOne)
router.get('/', movieController.getAll)


router.post('/add', uploadCloud.single('image'), movieController.insertData)


module.exports = router