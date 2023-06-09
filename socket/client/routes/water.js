'use strict';

const express = require('express');
const router = express.Router();
const waterPlants = require('../socket');

router.post('/', (req, res, next) => {
  waterPlants();
  res.status(200).send('All good');
});

module.exports = router;