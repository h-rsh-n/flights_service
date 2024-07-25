const { StatusCodes } = require('http-status-codes');
const {AirportRepository} = require('../repositories');
const AppError = require('../utils/errors/app-error');

const airportRepository = new AirportRepository();

async function createAirport(data){
  try {
    const airport = await airportRepository.create(data);
    return airport;
  } catch (error) {
    if(error.name == 'SequelizeUniqueConstraintError'){
      let explanation = [];
      error.errors.forEach(element => {
        explanation.push(element.message);
      });
      //console.log('explain',explanation);
      throw new AppError(explanation,StatusCodes.BAD_REQUEST);
    }
    if(error.name == 'SequelizeForeignKeyConstraintError'){
      throw new AppError(error.parent.sqlMessage,StatusCodes.BAD_REQUEST);
    }
    throw new AppError('Cannot create a new Airport Object',StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function deleteAirport(id){
  try {
    const airport = await airportRepository.destroy(id);
    return airport;
  } catch (error) {
    if(error.statusCode == StatusCodes.NOT_FOUND){
      throw new AppError('Requested Airport Not Found',error.statusCode);
    }
    throw new AppError('Cannot delete the airport details',StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function updateAirport(id,data){
  try {
    const airport = await airportRepository.update(id,data);
    return airport;
  } catch (error) {
    //console.log(error);
    if(error.name == 'SequelizeUniqueConstraintError'){
      let explanation = [];
      error.errors.forEach(element => {
        explanation.push(element.message);
      });
      throw new AppError(explanation,StatusCodes.BAD_REQUEST);
    }

    if(error.statusCode == StatusCodes.NOT_FOUND){
      throw new AppError('Requested Airport not found',error.statusCode);
    }

    if(error.name == 'SequelizeForeignKeyConstraintError'){
      throw new AppError(error.parent.sqlMessage,StatusCodes.BAD_REQUEST);
    }

    throw new AppError('Cannot update the airport details',StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

async function getAirports(){
  try {
    const airports = await airportRepository.getAll();
    return airports;
  } catch (error) {
    throw new AppError('Cannot fetch the airports details',StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getAirport(id){
  try {
    const airport = await airportRepository.get(id);
    return airport
  } catch (error) {
    if(error.statusCode == StatusCodes.NOT_FOUND){
      throw new AppError('Requested airport not found',StatusCodes.NOT_FOUND);
    }
    throw new AppError('Cannot fetch the airport details',StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

module.exports = {
  createAirport,
  deleteAirport,
  updateAirport,
  getAirport,
  getAirports
}