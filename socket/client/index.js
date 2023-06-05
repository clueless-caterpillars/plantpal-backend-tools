'use strict';

require('dotenv').config();
const io = require('socket.io-client');
const PORT = process.env.PORT || 3002;
const SERVER_URL = `${process.env.SERVER_URL}:${PORT}/state`;

const clientSocket = io(SERVER_URL);

const waterPlants = () => {
  //tell raspberry pi watering to turn on.
  clientSocket.emit('startWater', true);

  //get timestamp for when watering happens
  let timestamp = new Date().toUTCString();

  //POST timestamp to API Gateway//
};

module.exports = waterPlants;
