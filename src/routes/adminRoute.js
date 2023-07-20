const express = require('express')

const adminRouter = express.Router()

adminRouter.get('/', (req, res) => {
    res.send("you are admin!")
})

adminRouter.get('/:name', (req, res) => {
    const name = req.params.name
    res.send("welcome admin " + name)
})

module.exports = adminRouter

