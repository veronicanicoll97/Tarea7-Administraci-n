const { CategoriaService } = require('../service');
const { RespuestaModelo } = require('../model');

class CategoriaController {
    #categoria;
    constructor() {
        this.#categoria = new CategoriaService();
    }

    async listar(req, res) {
        let respuesta;
        try {
            const listado = await this.#categoria.listarCategorias(
                req.logger
            );
            respuesta = new RespuestaModelo(
                'EXITO',
                'Listado de categorias.',
                listado
            ).toJson();

            return res.json(respuesta);
        } catch (error) {
            respuesta = new RespuestaModelo(
                'NO_EXITO',
                'Error al obtener el listado de categorias.',
                error
            ).toJson();

            res.json(respuesta);
        }
    }


    async categoriaPorId(req, res) {
        let respuesta;
        try {
            const idCategoria = Number(req.query.idCategoria || req.params.idCategoria)

            const categoriaPorId = 
                await this.#categoria.categoriaPorId(
                    req.logger, idCategoria
                );

            if(Object.keys(categoriaPorId).length === 0) {
                respuesta = new RespuestaModelo(
                    'EXITO',
                    'Categoria inexistente.',
                    categoriaPorId
                ).toJson();
            }
            else {
                respuesta = new RespuestaModelo(
                    'EXITO',
                    'Categoria encontrada.',
                    categoriaPorId
                ).toJson();
            }

            return res.json(respuesta);
        } catch (error) {
            respuesta = new RespuestaModelo(
                'NO_EXITO',
                'Error al obtener el detalle de categoria solicitado.',
                error
            ).toJson();

            res.json(respuesta);
        }
    }


    async eliminarCategoria(req, res) {
        let respuesta;
        try {
            const idCategoria = Number(
                req.body.idCategoria || req.params.idCategoria
            )

            const eliminarCategoria = 
                await this.#categoria.eliminarCategoria(
                    req.logger, idCategoria
                );

            if(Object.keys(eliminarCategoria).length === 0) {
                respuesta = new RespuestaModelo(
                    'EXITO',
                    'Categoria inexistente para eliminar.',
                    eliminarCategoria
                ).toJson();
            }
            else {
                respuesta = new RespuestaModelo(
                    'EXITO',
                    'Categoria eliminada.',
                    eliminarCategoria
                ).toJson();
            }

            return res.json(respuesta);
        } catch (error) {
            respuesta = new RespuestaModelo(
                'NO_EXITO',
                'Error al eliminar la categoria.',
                error
            ).toJson();

            res.json(respuesta);
        }
    }

    async crearCategoria(req, res) {
        let respuesta;
        try {
            const datos = req.body
            datos.nombre = req.body.nombreCategoria.toUpperCase();
            delete datos.nombreCategoria;

            const insertarCategoria = 
                await this.#categoria.crearCategoria(
                    req.logger, datos
                );

            if(Object.keys(insertarCategoria).length === 0) {
                respuesta = new RespuestaModelo(
                    'EXITO',
                    'Categoria no creada.',
                    insertarCategoria
                ).toJson();
            }
            else {
                respuesta = new RespuestaModelo(
                    'EXITO',
                    'Categoria creada exitosamente.',
                    insertarCategoria
                ).toJson();
            }

            return res.json(respuesta);
        } catch (error) {
            respuesta = new RespuestaModelo(
                'NO_EXITO',
                'Error al crear la categoria.',
                error
            ).toJson();

            res.json(respuesta);
        }
    }


    async actualizarCategoria(req, res) {
        let respuesta;
        try {

            const idCategoria = Number(req.body.idCategoria);
            const datos = { nombre: req.body.nombreCategoria.toUpperCase()}

            const actualizarCategoria = 
                await this.#categoria.actualizarCategoria(
                    req.logger, datos, idCategoria
                );

            if(Object.keys(actualizarCategoria).length === 0) {
                respuesta = new RespuestaModelo(
                    'EXITO',
                    'Categoria no actualizada.',
                    actualizarCategoria
                ).toJson();
            }
            else {
                respuesta = new RespuestaModelo(
                    'EXITO',
                    'Categoria creada exitosamente.',
                    actualizarCategoria
                ).toJson();
            }

            return res.json(respuesta);
        } catch (error) {
            respuesta = new RespuestaModelo(
                'NO_EXITO',
                'Error al actualizar la categoria.',
                error
            ).toJson();

            res.json(respuesta);
        }
    }
}

module.exports = CategoriaController;