const CrudRepository = require('./crud-repository');
const { where, Sequelize } = require('sequelize');
const {Airplane,Airport,Flight,City} = require('../models');
const { required } = require('nodemon/lib/config');
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
}

module.exports = FlightRepository
