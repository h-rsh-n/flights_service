const { StatusCodes } = require('http-status-codes');
const {AirplaneRepository} = require('../repositories');
const AppError = require('../utils/errors/app-error');

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data){
  try {
    const airplane = await airplaneRepository.create(data);
    return airplane
  } catch (error) {
    //console.log(error)
    if(error.name == 'SequelizeValidationError'){
      let explanation = [];
      error.errors.forEach(element => {
        explanation.push(element.message);
      });
      //console.log('explain',explanation);
      throw new AppError(explanation,StatusCodes.BAD_REQUEST);
    }
    throw new AppError('Cannot craete a new Airplane Object',StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getAirplanes(){
  try {
    const airplanes = await airplaneRepository.getAll();
    return airplanes;
  } catch (error) {
    throw new AppError('Cannot fetch the airplanes',StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

module.exports = {
  createAirplane,
  getAirplanes
}