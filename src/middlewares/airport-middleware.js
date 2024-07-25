const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

function validateAirportCreate(req,res,next){
  if(!req.body.name){
    ErrorResponse.message = 'Something went wrong while creating Airport details';
    ErrorResponse.error = new AppError(['Name of the Airport not found in the incoming request'],StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if(!req.body.code){
    ErrorResponse.message = 'Something went wrong while creating Airport details';
    ErrorResponse.error = new AppError(['Code of the Airport not found in the incoming request'],StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if(!req.body.cityId){
    ErrorResponse.message = 'Something went wrong while creating Airport details';
    ErrorResponse.error = new AppError(['cityId of the Airport not found in the incoming request'],StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

function validateAirportUpdate(req,res,next){
  if(!req.body.name && !req.body.code && !req.body.cityId && !req.body.address){
    ErrorResponse.message = 'Something went wrong while updating the Airport details';
    ErrorResponse.error = new AppError(['No content provided for the updation of the Airport details'],StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
  }
  next();
}

module.exports = {
  validateAirportCreate,
  validateAirportUpdate
}