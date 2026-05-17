const express = require('express');
const router = express.Router();
const controllerIndex = require('../controller/controllerIndex');

router.get('/', controllerIndex.tela_principal);
router.get('/nossa-historia', controllerIndex.nossa_historia);

module.exports = router;
