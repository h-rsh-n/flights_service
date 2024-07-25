const express = require('express');
const {AirportController} = require('../../controllers');
const {AirportMiddlewares} = require('../../middlewares')

const router = express.Router();

router.post('/',AirportMiddlewares.validateAirportCreate,AirportController.createAirport);
router.delete('/:id',AirportController.deleteAirport);
router.patch('/:id',AirportMiddlewares.validateAirportUpdate,AirportController.updateAirport);
router.get('/',AirportController.getAirports);
router.get('/:id',AirportController.getAirport);

module.exports = router;