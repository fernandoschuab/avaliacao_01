const express = require('express');
const router = express.Router();
const controllerProduto = require('../controller/controllerProduto');

router.get('/cria', controllerProduto.cria_get);
router.post('/cria', controllerProduto.cria_post);

module.exports = router;
