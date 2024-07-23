const express = require('express');
const { pingController} = require('../../controllers');

const router = express.Router();
const airplaneRouter = require('./airplane-routes');

router.get('/ping',pingController.ping);
router.use('/airplanes',airplaneRouter)

module.exports = router;