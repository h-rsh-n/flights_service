const {StatusCodes} = require('http-status-codes');
const {ErrorResponse} = require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req,res,next){
  if(!req.body.modelNumber){
    ErrorResponse.message = 'Something went wrong while creating airplane';
    ErrorResponse.error = new AppError(['Model number not found in the incoming request'],StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
  }
  next();
}

function validateUpdateRequest(req,res,next){
  if(!req.body.modelNumber && !req.body.capacity){
    ErrorResponse.message = 'Something went wrong while updating the airplane details';
    ErrorResponse.error = new AppError(['No content provided for the updation of the flight details'],StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
  }
  next();
}

module.exports = {
  validateCreateRequest,
  validateUpdateRequest
};
