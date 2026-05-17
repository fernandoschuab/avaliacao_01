const express = require('express');
const router = express.Router();
const controllerProduto = require('../controller/controllerProduto');
const { ehAutenticado, ehAdmin, ehLojista } = require('../middlewares/controleUsuario');

router.get('/cria', ehAutenticado, ehAdmin, controllerProduto.cria_get);
router.post('/cria', ehAutenticado, ehAdmin, controllerProduto.cria_post);
router.get('/consulta/:id', controllerProduto.consulta);
router.post('/venda/:id', ehAutenticado, ehLojista, controllerProduto.venda);
router.post('/compra/:id', ehAutenticado, ehLojista, controllerProduto.compra);

module.exports = router;
