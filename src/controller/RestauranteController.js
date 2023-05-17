const { RestauranteService } = require('../service');
const { RespuestaModelo } = require('../model');

class RestauranteRepository {
    #restauranteService;
    constructor() {
        this.#restauranteService = new RestauranteService();
    }

    async getListadoRestaurantes(req, res) {
        let respuesta;
        try {
            const listado =
                await this.#restauranteService.listadoDeRestaurantes(
                    req.logger
                );
            respuesta = new RespuestaModelo(
                'EXITO',
                'Listado de restaurantes.',
                listado
            ).toJson();

            return res.json(respuesta);
        } catch (error) {
            respuesta = new RespuestaModelo(
                'NO_EXITO',
                'Error al obtener el listado de restaurantes.',
                error
            ).toJson();

            res.json(respuesta);
        }
    }

    async getRestaurante(req, res) {
        let respuesta;
        try {
            const { idRestaurante, nombre } = req.body;
            let params;
            if (!idRestaurante) {
                params = { nombre };
            } else {
                params = { idRestaurante };
            }

            const restaurante = await this.#restauranteService.restauranteById(
                req.logger,
                params
            );
            respuesta = new RespuestaModelo(
                'EXITO',
                'Restaurante encontrado.',
                restaurante
            ).toJson();

            return res.json(respuesta);
        } catch (error) {
            req.logger.error(JSON.stringify(error));
            respuesta = new RespuestaModelo(
                'NO_EXITO',
                'Error al obtener el restaurante.',
                error
            ).toJson();

            res.json(respuesta);
        }
    }

    async crearRestaurante(req, res) {
        let respuesta;
        try {
            const restauranteCreado = await this.#restauranteService.crear(
                req.logger,
                req.body
            );
            respuesta = new RespuestaModelo(
                'EXITO',
                'Restaurante creado correctamente',
                restauranteCreado
            ).toJson();

            return res.json(respuesta);
        } catch (error) {
            req.logger.error(JSON.stringify(error));
            respuesta = new RespuestaModelo(
                'NO_EXITO',
                'Error al crear el cliente.',
                error
            ).toJson();

            res.json(respuesta);
        }
    }

    async actualizarRestaurante(req, res) {
        let respuesta;
        try {
            const restauranteCreado = await this.#restauranteService.actualizar(
                req.logger,
                req.body
            );
            respuesta = new RespuestaModelo(
                'EXITO',
                'Restaurante actualizado correctamente',
                restauranteCreado
            ).toJson();

            return res.json(respuesta);
        } catch (error) {
            req.logger.error(JSON.stringify(error));
            respuesta = new RespuestaModelo(
                'NO_EXITO',
                'Error al actualizar el restaurante.',
                error
            ).toJson();

            res.json(respuesta);
        }
    }

    async eliminarRestaurante(req, res) {
        let respuesta;
        try {
            const restauranteEliminado =
                await this.#restauranteService.eliminarById(
                    req.logger,
                    req.body
                );
            respuesta = new RespuestaModelo(
                'EXITO',
                'Restaurante eliminado correctamente',
                restauranteEliminado
            ).toJson();

            return res.json(respuesta);
        } catch (error) {
            req.logger.error(JSON.stringify(error));
            respuesta = new RespuestaModelo(
                'NO_EXITO',
                'Error al eliminar el restaurante.',
                error
            ).toJson();

            res.json(respuesta);
        }
    }
}

module.exports = RestauranteRepository;
