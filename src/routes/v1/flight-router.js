const express = require('express');
const {FlightController} = require('../../controllers');
const {FlightMiddlewares} = require('../../middlewares');
const router = express.Router()

router.post('/',FlightMiddlewares.validateFlightCreate,FlightController.createFlight);
router.get('/',FlightController.getAllFlights)
router.get('/:id',FlightController.getFlight)
router.patch('/:id/seats',FlightMiddlewares.validateFlightUpdate,FlightController.updateFlight);
module.exports = router;