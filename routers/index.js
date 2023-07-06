const express = require('express')

const router = express.Router()
const adminRouter = require('./adminRoutes')
const userRouter = require('./userRoutes')

router.use('/admin', adminRouter)
router.use('/user', userRouter)


module.exports = router