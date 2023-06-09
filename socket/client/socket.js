'use strict';

require('dotenv').config();
const io = require('socket.io-client');
const PORT = 3002;
const SERVER_URL = `${process.env.SERVER_URL}:${PORT}/state`;
console.log(SERVER_URL);

const waterPlants = () => {
  const clientSocket = io(SERVER_URL);
  console.log('hit');
  //tell raspberry pi watering to turn on.
  clientSocket.emit('startWater', true);

  //get timestamp for when watering happens
  let timestamp = new Date().toUTCString();

  //POST timestamp to API Gateway//
  let response = {};
};

module.exports = waterPlants;
