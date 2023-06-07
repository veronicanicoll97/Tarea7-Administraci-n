const express = require('express');
const { CategoriaController } = require('../controller');

const controller = new CategoriaController();
const router = express.Router();

router.get('/', (req, res) => controller.listar(req, res));
router.get('/categoriaById/:idCategoria', (req, res) => controller.categoriaPorId(req, res));
router.get('/categoriaById', (req, res) => controller.categoriaPorId(req, res));
router.delete('/eliminarCategoria/:idCategoria', (req, res) => controller.eliminarCategoria(req, res));
router.delete('/eliminarCategoria', (req, res) => controller.eliminarCategoria(req, res));
router.post('/crearCategoria', (req, res) => controller.crearCategoria(req, res));
router.put('/actualizarCategoria', (req, res) => controller.actualizarCategoria(req, res));


module.exports = router;