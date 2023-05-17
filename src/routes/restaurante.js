const express = require('express');
const { RestauranteController } = require('../controller');

const controller = new RestauranteController();
const router = express.Router();

router.get('/', (req, res) => controller.getListadoRestaurantes(req, res));
router.get('/restauranteById', (req, res) =>
    controller.getRestaurante(req, res)
);
router.post('/crearRestaurante', (req, res) =>
    controller.crearRestaurante(req, res)
);
router.put('/actualizarRestaurante', (req, res) =>
    controller.actualizarRestaurante(req, res)
);
router.delete('/eliminarRestaurante', (req, res) =>
    controller.eliminarRestaurante(req, res)
);

module.exports = router;
