const dynamoose = require('dynamoose');
const moment = require('moment-timezone');

const plantSchema = new dynamoose.Schema({
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
  timeStamp: {
    type: Number,
    required: true,
  },
  plantId: {
    type: String,
  },
  
});
const plantModel = dynamoose.model('caterpillar-plant-status', plantSchema);
exports.handler = async(event) => {
  console.log('READ PLANT EVENT: ', event);
  let startdate = moment.tz("America/Los_Angeles");
  let enddate = moment.tz("America/Los_Angeles")

  startdate.date(startdate.date() - 3);
  startdate.hour(0).minute(0).second(0);
  enddate.hour(23).minute(59).second(59);
  
  let startday = startdate.valueOf();
  let endday = enddate.valueOf();
  
  let responseBody = await plantModel.scan('timeStamp').between(startday, endday).exec();
  let response = null;
  if (responseBody.length === 0) {
    response = {
      statusCode: 404,
      body: 'No recent log found.'
    }
  } else {
    responseBody.sort((a, b) => {
      return a.timeStamp - b.timeStamp;
    });
    let entry = responseBody.pop();
    response = {
      statusCode: 200,
      body: JSON.stringify(entry)
    }
  }
  
  return response;
};