const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

function validateCityCreate(req,res,next){
    if(!req.body.name){
      ErrorResponse.message = 'Something went wrong while creating city details';
      ErrorResponse.error = new AppError(['Name of the city not found in the incoming request'],StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}
function validateCityUpdate(req,res,next){
    if(!req.body.name){
      ErrorResponse.message = 'Something went wrong while updating city details';
      ErrorResponse.error = new AppError(['Name of the city not found in the incoming request'],StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}


module.exports = {
  validateCityCreate,
  validateCityUpdate
}