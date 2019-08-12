const express = require('express')
const bodyParser = require('body-parser')
const env = require('dotenv').config()

var app = express()

app.use(bodyParser.json())

app.use('/api', require('./card_controller'))

app.listen(process.env.PORT, () => {
    console.log(`Escutando na porta ${process.env.PORT}...`)
})