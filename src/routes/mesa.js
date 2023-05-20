const express = require('express');
const { MesaController } = require('../controller');

const controller = new MesaController();
const router = express.Router();

router.get('/', (req, res) => controller.listarMesas(req, res));
router.get('/mesaById', (req, res) => controller.getMesa(req, res));
router.post('/crearMesa', (req, res) => controller.crearMesa(req, res));
router.put('/actualizarMesa', (req, res) =>
    controller.actualizarMesa(req, res)
);
router.delete('/eliminarMesa', (req, res) => controller.eliminarMesa(req, res));

module.exports = router;
