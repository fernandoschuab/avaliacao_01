const express = require('express');
const router = express.Router();
const controllerProduto = require('../controller/controllerProduto');

router.get('/cria', controllerProduto.cria_get);
router.post('/cria', controllerProduto.cria_post);
router.get('/consulta/:id', controllerProduto.consulta);
router.post('/venda/:id', controllerProduto.venda);
router.post('/compra/:id', controllerProduto.compra);

module.exports = router;
