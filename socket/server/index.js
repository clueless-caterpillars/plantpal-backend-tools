'use strict';

require('dotenv').config();
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3002;
const io = new Server(PORT);

//endpoint state
const state = io.of('/state');
console.log('Server socket is up.');

//server socket is listening for client connection
state.on('connection', (socket) => {
  console.log(`Client ${socket.id} has connected.`);

  //listening for watering event from EC2 server.
  socket.on('startWater', (payload) => {
    console.log('yo');
    //code for raspberry pi watering plants//
  });
});