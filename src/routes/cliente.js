const express = require('express');
const { ClienteController } = require('../controller');

const controller = new ClienteController();
const router = express.Router();

router.get('/', (req, res) => controller.getListadoClientes(req, res));
router.get('/clienteById', (req, res) => controller.getCliente(req, res));
router.get('/clienteByNroDocumento', (req, res) => controller.getCliente(req, res));
router.get('/crearCliente', (req, res) => controller.crearCliente(req, res));

module.exports = router;
