const { CategoriaRepository } = require('../repository');
const Joi = require('joi');

class CategoriaService {
    #categoria;
    constructor() {
        this.#categoria = new CategoriaRepository();
    }

    async listarCategorias(log) {
        try {
            log.info('Retornando listado de categorias.');
            return await this.#categoria.listadoCategorias(log);
        } catch (error) {
            log.error(JSON.stringify(error));
            throw error;
        }
    }

    async categoriaPorId(log, idCategoria) {
        try {
            log.info('Retornando categoria existente.');
            const categoria = await this.#categoria.categoriaById(
                Number(idCategoria),
                log
            );
            return categoria;
        } catch (error) {
            log.error(JSON.stringify(error));
            throw error;
        }
    }

    async eliminarCategoria(log, idCategoria) {
        try {
            log.info('Retornando categoria eliminada.');
            const categoria = await this.#categoria.eliminarCategoria(
                Number(idCategoria),
                log
            );

            if (!categoria) return new Object();
            return categoria;
        } catch (error) {
            log.error(JSON.stringify(error));
            throw error;
        }
    }

    async crearCategoria(log, datos) {
        try {
            log.info('Retornando categoria creada.');

            const schema = Joi.object({
                nombre: Joi.string(),
            });

            await schema.validateAsync({ nombre: datos.nombreCategoria });

            const categoria = await this.#categoria.crearCategoria(datos, log);
            return categoria;
        } catch (error) {
            log.error(JSON.stringify(error));
            throw error;
        }
    }

    async actualizarCategoria(log, datos, idCategoria) {
        try {
            log.info('Retornando categoria actualizada.');

            const categoria = await this.#categoria.actualizarCategoria(
                Number(idCategoria),
                datos,
                log
            );
            return categoria;
        } catch (error) {
            log.error(JSON.stringify(error));
            throw error;
        }
    }
}

module.exports = CategoriaService;
