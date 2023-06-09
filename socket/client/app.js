'use strict';

const express = require('express');
const cors = require('cors');
const waterRouter = require('./routes/water');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/water', waterRouter);

module.exports = {
  app, 
  start:(port) => app.listen(port, () => {
    console.log(`Listening to server on port ${port}.`);
  }),
}