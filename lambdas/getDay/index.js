const dynamoose = require('dynamoose');
const moment = require('moment');
const plantSchema = new dynamoose.Schema({
  "id": {
    "type": String,
    "required": true,
  },
  "soilMoisture": {
    "type": Number,
  },
  "temperature": {
    "type": Number,
  },
  "humidity": {
    "type": Number,
  },
  "timeStamp": {
    "type": Number,
    "required": true,
  },
  "plantId": {
    "type": String,
  },
});
const plantModel = dynamoose.model('caterpillar-plant-status', plantSchema);
exports.handler = async(event) => {
  console.log('range', plantSchema.rangeKey);
  console.log('READ PLANT EVENT: ', event);
  // TODO implement
  let params = event.queryStringParameters;
  let responseBody = null;
  if (params) {
    // responseBody = await plantModel.scan('timeStamp').contains(params['date']).exec();
    let startday = moment(Number(params['date']));
    let endday = moment(Number(params['date']));
    
    startday.hours(0,0,0,0);
    endday.hours(23, 59, 59, 999);
    
    let startdate = startday.valueOf();
    let enddate = endday.valueOf();

    responseBody = await plantModel.scan('timeStamp').between(startdate, enddate).exec();
  } else {
    let startdate = moment();
    let prevdate = moment();
    startdate.hours(23, 59, 59, 999);
    prevdate.date(prevdate.date() - 10);
    
    let startday = startdate.valueOf();
    let prevday = prevdate.valueOf();
    
    let days = new Map();
    responseBody = await plantModel.scan('timeStamp').between(prevday, startday).exec();
    for (let i = 0; i < responseBody.length; i++) {
      let log = moment(Number(responseBody[i].timeStamp));
      let day = log.date();
      if (!days.has(day)) {
        days.set(day, log.valueOf());
      }
    }
    responseBody = [...days.values()];
  }
  console.log('PLANT MATCHES YOUR QUERY', responseBody)
  const response = {
    statusCode: 200,
    body: JSON.stringify(responseBody),
  };
  return response;
};