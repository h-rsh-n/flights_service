const express = require('express');
const {CityController} = require('../../controllers');
const {CityMiddlewares} = require('../../middlewares');
const router = express.Router()

router.post('/',CityMiddlewares.validateCityCreate,CityController.createCity);
router.delete('/:id',CityController.deleteCity);
router.patch('/:id',CityMiddlewares.validateCityUpdate,CityController.updateCity);

module.exports = router;