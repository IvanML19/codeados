// funcionalidades express
'use strict';

// modules to require
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

// routes - TODO: it shall be changed asap for startup.js and dev.js
const api = require('./routes/api.js');

const app = express();
app.use(morgan('combine'));
app.use(bodyParser.urlencoded( {extended: false} ));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', api);

module.exports = app;