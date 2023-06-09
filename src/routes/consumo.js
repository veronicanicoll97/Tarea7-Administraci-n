const express = require('express');
const {  ConsumoController } = require('../controller');

const controller = new ConsumoController();
const router = express.Router();

router.get('/verificarMesa/:idMesa', (req, res) => controller.verificarMesa(req, res));
router.get('/getStringBase64/:idCabecera', (req, res) => controller.getStringBase64(req, res));
router.post('/insertarDetalle', (req, res) =>
    controller.insertarDetalle(req, res)
);
router.post('/verificarCabecera', (req, res) =>
    controller.verificarClienteCabecera(req, res)
);
router.put('/cerrarMesa', (req, res) =>
    controller.cerrarMesa(req, res)
);

module.exports = router;