const { ProductoService } = require('../service');
const { RespuestaModelo } = require('../model');

class ProductoController {
    #producto;
    constructor() {
        this.#producto = new ProductoService();
    }

    async listar(req, res) {
        let respuesta;
        try {
            const listado = await this.#producto.listarProductos(req.logger);
            respuesta = new RespuestaModelo(
                'EXITO',
                'Listado de productos.',
                listado
            ).toJson();

            return res.json(respuesta);
        } catch (error) {
            respuesta = new RespuestaModelo(
                'NO_EXITO',
                'Error al obtener el listado de productos.',
                error
            ).toJson();

            res.json(respuesta);
        }
    }

    async productoPorId(req, res) {
        let respuesta;
        try {
            const idCategoria = Number(
                req?.query?.idCategoria || req?.params?.idCategoria
            );
            const idProducto = Number(
                req?.query?.idProducto || req?.params?.idProducto
            );

            const productoPorId = await this.#producto.productoPorId(
                req.logger,
                idCategoria,
                idProducto
            );

            if (Object.keys(productoPorId).length === 0) {
                respuesta = new RespuestaModelo(
                    'EXITO',
                    'Producto inexistente.',
                    productoPorId
                ).toJson();
            } else {
                respuesta = new RespuestaModelo(
                    'EXITO',
                    'Producto(s) encontrado(s).',
                    productoPorId
                ).toJson();
            }

            return res.json(respuesta);
        } catch (error) {
            respuesta = new RespuestaModelo(
                'NO_EXITO',
                'Error al obtener el detalle de productos.',
                error
            ).toJson();

            res.json(respuesta);
        }
    }

    async eliminarProducto(req, res) {
        let respuesta;
        try {
            const idProducto = Number(
                req.body.idProducto || req.params.idProducto
            );

            const eliminarProducto = await this.#producto.eliminarProducto(
                req.logger,
                idProducto
            );

            if (Object.keys(eliminarProducto).length === 0) {
                respuesta = new RespuestaModelo(
                    'EXITO',
                    'Producto inexistente para eliminar.',
                    eliminarProducto
                ).toJson();
            } else {
                respuesta = new RespuestaModelo(
                    'EXITO',
                    'Producto eliminado.',
                    eliminarProducto
                ).toJson();
            }

            return res.json(respuesta);
        } catch (error) {
            respuesta = new RespuestaModelo(
                'NO_EXITO',
                'Error al eliminar el producto.',
                error
            ).toJson();

            res.json(respuesta);
        }
    }

    async crearProducto(req, res) {
        let respuesta;
        try {
            let datos = {};
            datos.nombreProducto = req.body.nombreProducto.toUpperCase();
            datos.precioVenta = Number(req.body.precioVenta);
            datos.idCategoria = Number(req.body.idCategoria);

            const insertarProducto = await this.#producto.crearProducto(
                req.logger,
                datos
            );

            if (Object.keys(insertarProducto).length === 0) {
                respuesta = new RespuestaModelo(
                    'EXITO',
                    'Producto no creada.',
                    insertarProducto
                ).toJson();
            } else {
                respuesta = new RespuestaModelo(
                    'EXITO',
                    'Producto creado exitosamente.',
                    insertarProducto
                ).toJson();
            }

            return res.json(respuesta);
        } catch (error) {
            respuesta = new RespuestaModelo(
                'NO_EXITO',
                'Error al crear el producto.',
                error
            ).toJson();

            res.json(respuesta);
        }
    }

    async actualizarProducto(req, res) {
        let respuesta;
        try {
            const idProducto = Number(req.body.idProducto);
            const datos = {
                nombreProducto: req.body?.nombreCategoria?.toUpperCase(),
                precioVenta: Number(req.body?.precioVenta),
                idCategoria: Number(req.body?.idCategoria),
            };

            const actualizarProducto = await this.#producto.actualizarProducto(
                req.logger,
                datos,
                idProducto
            );

            if (Object.keys(actualizarProducto).length === 0) {
                respuesta = new RespuestaModelo(
                    'EXITO',
                    'Producto no actualizado.',
                    actualizarProducto
                ).toJson();
            } else {
                respuesta = new RespuestaModelo(
                    'EXITO',
                    'Producto actualizado exitosamente.',
                    actualizarProducto
                ).toJson();
            }

            return res.json(respuesta);
        } catch (error) {
            respuesta = new RespuestaModelo(
                'NO_EXITO',
                'Error al actualizar el producto.',
                error
            ).toJson();

            res.json(respuesta);
        }
    }
}

module.exports = ProductoController;
