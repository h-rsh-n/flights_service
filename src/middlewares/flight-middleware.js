const {StatusCodes} = require('http-status-codes')
const {ErrorResponse} = require('../utils/common')
const AppError = require('../utils/errors/app-error')

function validateFlightCreate(req,res,next){
  const requiredFields = ['flightNumber','airplaneId','departureAirportId','arrivalAirportId','arrivalTime','departureTime','price','totalSeats']
  const missingFields = [];

  requiredFields.forEach((field)=>{
    if(!req.body[field]){
      missingFields.push(`${field} is missing in the incoming request`);
    }
  })

  if(missingFields.length>0){
    ErrorResponse.message = 'Something went wrong while creating the flight';
    ErrorResponse.error = new AppError(missingFields,StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

function validateFlightUpdate(req,res,next){
  const requiredFields = ['flightNumber','airplaneId','departureAirportId','arrivalAirportId','arrivalTime','departureTime','price','totalSeats']
  const missingFields = [];

  requiredFields.forEach((field)=>{
    if(!req.body[field]){
      missingFields.push(field);
    }
  })

  if(requiredFields.length == missingFields.length){
    ErrorResponse.message = 'Something went wrong while updating the flight';
    ErrorResponse.error = new AppError(['No content provided for the updation of the flight'],StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

module.exports = {
  validateFlightCreate,
  validateFlightUpdate
}