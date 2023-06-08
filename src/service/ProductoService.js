const { ErrorHandler } = require('../errors');
const { ProductoRepository, CategoriaRepository } = require('../repository');
const Joi = require('joi');

class ProductoService {
    #producto;
    #categoria;
    constructor() {
        this.#producto = new ProductoRepository();
        this.#categoria = new CategoriaRepository();
    }

    async listarProductos(log) {
        try {
            log.info('Retornando listado de productos.');
            return await this.#producto.listadoProductos(log);
        } catch (error) {
            log.error(JSON.stringify(error));
            throw error;
        }
    }

    async productoPorId(log, idCategoria, idProducto) {
        try {
            log.info('Retornando producto existente.');

            if (!isNaN(idCategoria)) {
                const productoByCategoria =
                    await this.#producto.productoByIdCategoria(
                        Number(idCategoria),
                        log
                    );

                return productoByCategoria;
            }

            if (!isNaN(idProducto)) {
                const productoById = await this.#producto.productoById(
                    Number(idProducto),
                    log
                );

                return productoById;
            }
        } catch (error) {
            log.error(JSON.stringify(error));
            throw error;
        }
    }

    async eliminarProducto(log, idProducto) {
        try {
            log.info('Retornando producto eliminado.');
            const productoEliminado = await this.#producto.eliminarProducto(
                Number(idProducto),
                log
            );

            if (!productoEliminado) return new Object();
            return productoEliminado;
        } catch (error) {
            log.error(JSON.stringify(error));
            throw error;
        }
    }

    async crearProducto(log, datos) {
        try {
            log.info('Retornando producto creado.');

            const schema = Joi.object({
                nombreProducto: Joi.string(),
                precioVenta: Joi.number(),
                idCategoria: Joi.number(),
            });

            await schema.validateAsync({
                nombreProducto: datos.nombreProducto,
                precioVenta: datos.precioVenta,
                idCategoria: datos.idCategoria,
            });

            // Verifica la existencia de la categoria.
            const existeCategoria = await this.#categoria.categoriaById(
                datos.idCategoria,
                log
            );

            if (Object.keys(existeCategoria).length === 0)
                throw new ErrorHandler({
                    mensaje: 'No existe la categoria enviada.',
                    detalle: {},
                    extensiones: { idCategoria: datos.idCategoria },
                });

            const productoCreado = await this.#producto.crearProducto(
                datos,
                log
            );

            return productoCreado;
        } catch (error) {
            log.error(JSON.stringify(error));
            throw error;
        }
    }

    async actualizarProducto(log, datos, idProducto) {
        try {
            log.info('Retornando producto actualizado.');

            const producto = await this.#producto.actualizarProducto(
                Number(idProducto),
                datos,
                log
            );
            return producto;
        } catch (error) {
            log.error(JSON.stringify(error));
            throw error;
        }
    }
}

module.exports = ProductoService;
