const express = require('express');
const { pingController} = require('../../controllers');

const router = express.Router();
const airplaneRouter = require('./airplane-routes');
const cityRouter = require('./city-routes');
const airportRouter = require('./airport-routes');
const flightRouter = require('./flight-router');

router.get('/ping',pingController.ping);
router.use('/airplanes',airplaneRouter);
router.use('/cities',cityRouter);
router.use('/airports',airportRouter);
router.use('/flights',flightRouter);

module.exports = router;