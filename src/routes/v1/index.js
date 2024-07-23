const express = require('express');
const { pingController} = require('../../controllers');

const router = express.Router();
const airplaneRouter = require('./airplane-routes');
const cityRouter = require('./city-routes')

router.get('/ping',pingController.ping);
router.use('/airplanes',airplaneRouter);
router.use('/cities',cityRouter);

module.exports = router;