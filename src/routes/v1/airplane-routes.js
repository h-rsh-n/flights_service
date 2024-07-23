const express = require('express');

const router = express.Router();
const {AirplaneController} = require('../../controllers');
const {AirplaneMiddlewares} = require('../../middlewares')

router.post('/',AirplaneMiddlewares.validateCreateRequest,AirplaneController.createAirplane);
router.get('/',AirplaneController.getAirplanes);
router.get('/:id',AirplaneController.getAirplane);
router.delete('/:id',AirplaneController.deleteAirplane);

module.exports = router;