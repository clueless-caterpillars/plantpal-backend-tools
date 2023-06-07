'use strict';

const dynamoose = require('dynamoose');

const StatusSchema = new dynamoose.Schema({
  id: {
    type: String,
    required: true,
  },
  soilMoisture: {
    type: Number,
  },
  temperature: {
    type: Number,
  },
  humidity: {
    type: Number,
  },
  timestamp: {
    type: String,
    required: true,
  },
  plantId: {
    type: String,
  },
});

const StatusModel = dynamoose.model('Status', SpotSchema);

exports.handler = async(event) =>{
  let params = event.pathParameters;
  let responseBody = null;
  // console.log('READING SPOT', spot);
  if (params) {
    responseBody = await SpotModel.scan('timestamp').contains(params.id).exec();
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify(responseBody),
  };
  return response;
};