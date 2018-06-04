// funcionalidades express
'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// routes
const api = require('./routes/api.js')

app.use(bodyParser.urlencoded( {extended: false} ))
app.use(bodyParser.json())
app.use('/api', api)

module.exports = app