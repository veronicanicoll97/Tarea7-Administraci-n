const express = require('express');
const { ProductoController } = require('../controller');

const controller = new ProductoController();
const router = express.Router();

router.get('/', (req, res) => controller.listar(req, res));
router.get('/productoByIdCategoria/:idCategoria', (req, res) =>
    controller.productoPorId(req, res)
);
router.get('/productoByIdProducto/:idProducto', (req, res) =>
    controller.productoPorId(req, res)
);
// puede ser por idCategoria v idProducto como query
router.get('/productoById', (req, res) => controller.productoPorId(req, res));
router.delete('/eliminarProducto/:idProducto', (req, res) =>
    controller.eliminarProducto(req, res)
);
// puede ser por idProducto como query
router.delete('/eliminarProducto', (req, res) =>
    controller.eliminarProducto(req, res)
);
router.post('/crearProducto', (req, res) => controller.crearProducto(req, res));
router.put('/actualizarProducto', (req, res) =>
    controller.actualizarProducto(req, res)
);

module.exports = router;
