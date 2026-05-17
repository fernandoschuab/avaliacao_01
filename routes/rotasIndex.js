const express = require('express');
const router = express.Router();
const controllerIndex = require('../controller/controllerIndex');

router.get('/', controllerIndex.tela_principal);

module.exports = router;
