const {CityRepository} = require('../repositories')
const {StatusCodes} = require('http-status-codes');
const AppError = require('../utils/errors/app-error');

const cityRepository = new CityRepository();

async function createCity(data){
  try {
    const city = await cityRepository.create(data);
    return city;
  } catch (error) {
    if(error.name == 'SequelizeUniqueConstraintError'){
      let explanation = [];
      error.errors.forEach(element => {
        explanation.push(element.message);
      });
      throw new AppError(explanation,StatusCodes.BAD_REQUEST);
    }
  }
  throw new AppError('Failed to create a new City object',StatusCodes.INTERNAL_SERVER_ERROR);
}

async function deleteCity(id){
  try {
    const city = await cityRepository.destroy(id);
    return city;
  } catch (error) {
    console.log(error);
    if(error.statusCode == StatusCodes.NOT_FOUND){
      throw new AppError('Requested city not found',error.statusCode);
    }
    throw new AppError('Cannot delete the city details',StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function updateCity(id,data){
  console.log(id,data);
  try {
    const city = await cityRepository.update(id,data);
    return city;
  } catch (error) {
    console.log(error);
    if(error.name == 'SequelizeUniqueConstraintError'){
      let explanation = [];
      error.errors.forEach(element => {
        explanation.push(element.message);
      });
      throw new AppError(explanation,StatusCodes.BAD_REQUEST);
    }

    if(error.statusCode == StatusCodes.NOT_FOUND){
      throw new AppError('Requested city not found',error.statusCode);
    }

    throw new AppError('Cannot update the airplane details',StatusCodes.INTERNAL_SERVER_ERROR)
  }
}


module.exports = {
  createCity,
  deleteCity,
  updateCity
}