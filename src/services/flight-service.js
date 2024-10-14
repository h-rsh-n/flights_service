const { StatusCodes } = require('http-status-codes');
const {FlightRepository} = require('../repositories');
const AppError = require('../utils/errors/app-error');
const compareTime = require('../utils/helper/date-check');
const { Op } = require('sequelize');
const moment = require('moment-timezone');
const e = require('express');

const flightRepository = new FlightRepository();

async function createFlight(data){
  try {
    if(compareTime(data.arrivalTime,data.departureTime)){
      const flight = await flightRepository.create(data);
      return flight
    }else{
      throw new AppError('Departure time and Arrival time violate the condition',StatusCodes.BAD_REQUEST);
    }
  } catch (error) {
    if(error.name == 'SequelizeForeignKeyConstraintError'){
      throw new AppError(error.parent.sqlMessage,StatusCodes.BAD_REQUEST);
    }
    if(error instanceof AppError){
      throw error
    }
    throw new AppError('Cannot create a new Flight Object',StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getAllFlights(query) {
  customFilter = {};
  customSort = [];
  if(query.trips){
    [departureAirportId,arrivalAirportId] = query.trips.split('-');
    if(departureAirportId == arrivalAirportId){
      throw new AppError('Arrival and Departure Airport ID cannot be same',StatusCodes.BAD_REQUEST);
    }
    customFilter.departureAirportId = departureAirportId;
    customFilter.arrivalAirportId = arrivalAirportId;
  }

  if(query.price){
    [minPrice,maxPrice] = query.price.split('-');
    customFilter.price = {
      [Op.between] : [minPrice,((maxPrice == undefined)?20000:maxPrice)]
    }
  }
  if(query.travellers){
    customFilter.totalSeats = {
      [Op.gte] : query.travellers
    }
  }
  if(query.tripDate) {
    
    const timeZone = 'Asia/Kolkata';
    const startOfDay = moment.tz(query.tripDate, timeZone).startOf('day');
    const endOfDay = moment.tz(query.tripDate, timeZone).endOf('day');
    customFilter.departureTime = {
      [Op.between]: [startOfDay, endOfDay]
    };
  }
  if(query.sort){
    const sortItems = query.sort.split(',');
    const sortFilters = sortItems.map((item)=>item.split('_'));
    customSort = sortFilters;
  } 
  try {
    const flights = await flightRepository.getAllFlights(customFilter,customSort);
    return flights;
  } catch (error) {
    console.log(error)
    throw new AppError('Cannot get flights with requested filters',StatusCodes.BAD_REQUEST);
  }
}


module.exports = {
  createFlight,
  getAllFlights
}