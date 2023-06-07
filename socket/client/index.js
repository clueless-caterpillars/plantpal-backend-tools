'use strict';
require('dotenv').config();
const server = require('./app');
const PORT = process.env.PORT || 3003;

server.start(PORT);