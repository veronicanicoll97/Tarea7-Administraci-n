const express = require('express');
const { ReservaController } = require('../controller');

const controller = new ReservaController();
const router = express.Router();

router.get('/', (req, res) => controller.listar(req, res));
router.get('/reservaById', (req, res) => controller.getById(req, res));
router.post('/crearReserva', (req, res) => controller.crear(req, res));

module.exports = router;
