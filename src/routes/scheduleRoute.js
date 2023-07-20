const express = require('express')
const router = express.Router()


const scheduleController = require('../../controllers/scheduleControllers')

router.get('/', scheduleController.getAll)


module.exports = router