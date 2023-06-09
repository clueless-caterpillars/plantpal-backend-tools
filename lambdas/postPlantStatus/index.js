const dynamoose = require('dynamoose');

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

const PlantModel = dynamoose.model('caterpillar-plant-status', plantSchema);

exports.handler = async(event) =>{
  console.log('EVENT ', JSON.parse(event.body));
  let plant = JSON.parse(event.body)
  console.log('READING PLANT', plant);
  
  let returnPlant;
  let response;
  
  try{
    returnPlant = await PlantModel.create(plant);
    console.log('RETURN PLANT', returnPlant)
    response = {
    statusCode: 200,
    body: JSON.stringify(returnPlant)
};
  }
  catch(e){
    console.error('ERROR: ', e);
  }

  return response;

}