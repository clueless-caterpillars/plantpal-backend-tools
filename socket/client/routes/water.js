'use strict';

const express = require('express');
const router = express.Router();
const waterPlants = require('./index');

router.post('/', waterPlants);

module.exports = router;