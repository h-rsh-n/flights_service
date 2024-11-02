const CrudRepository = require('./crud-repository');
const { where, Sequelize } = require('sequelize');
const {Airplane,Airport,Flight,City} = require('../models');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
const db = require('../models');
const {addLockForUpdate} = require('./queries')
class FlightRepository extends CrudRepository{
  constructor(){
    super(Flight)
  }

  async getAllFlights(filter,sort) {
    const response = await Flight.findAll({
      where:filter,
      order:sort,
      include:[
        {
          model:Airplane,
          as:'AirplaneUsed',
          required: true
        },
        {
          model:Airport,
          as:'departureAirport',
          required:true,
          on:{
            col1:Sequelize.where(Sequelize.col("Flight.departureAirportId"),"=",Sequelize.col("departureAirport.code"))
          },
          include:[
            {
              model:City,
              required:true
            }
          ]
        },
        {
          model:Airport,
          as:'arrivalAirport',
          required:true,
          on:{
            col1:Sequelize.where(Sequelize.col("Flight.arrivalAirportId"),"=",Sequelize.col("arrivalAirport.code"))
          },
          include:[
            {
              model:City,
              required:true
            }
          ]
        }
      ]
    });
    return response;
  }

  async updateFlight(flightId,seats,dec=true){

    const transaction = await db.sequelize.transaction();
    await db.sequelize.query(addLockForUpdate(flightId));
    
    try {
      const flight = await Flight.findByPk(flightId);
      if(+dec){
        await flight.decrement('totalSeats',{by:seats},{transaction:transaction});
      }else{
        await flight.increment('totalSeats',{by:seats},{transaction:transaction})
      }
      flight.save();
      const updatedFlight = await Flight.findByPk(flightId);
      await transaction.commit();
      return updatedFlight;
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      if(error.statusCode == StatusCodes.NOT_FOUND){
        throw new AppError('Requested flight was Not Found',StatusCodes.NOT_FOUND);
      }
      throw new AppError('Something went wrong while updating the flight details',StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}

module.exports = FlightRepository
