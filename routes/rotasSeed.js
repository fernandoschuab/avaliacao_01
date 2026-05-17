const express = require('express');
const router = express.Router();
const controllerSeed = require('../controller/controllerSeed');

router.get('/', controllerSeed.seed);

module.exports = router;
