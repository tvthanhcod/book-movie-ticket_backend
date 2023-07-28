const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')


const app = express()
const morgan = require('morgan')
const router = require('./src/routes')
require('dotenv').config()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(morgan('combined'))
app.use('/api/v1', router)



app.listen(process.env.PORT)