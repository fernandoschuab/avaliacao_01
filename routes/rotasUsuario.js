const express = require('express');
const router = express.Router();
const controllerUsuario = require('../controller/controllerUsuario');
const { ehAutenticado } = require('../middlewares/controleUsuario');

router.get('/cadastro', controllerUsuario.cadastro_get);
router.post('/cadastro', controllerUsuario.cadastro_post);
router.get('/login', controllerUsuario.login_get);
router.post('/login', controllerUsuario.login_post);
router.post('/logout', ehAutenticado, controllerUsuario.logout);

module.exports = router;
