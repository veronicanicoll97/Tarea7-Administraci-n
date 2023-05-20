const { MesaService } = require('../service');
const { RespuestaModelo } = require('../model');

class MesaController {
    #mesaController;
    constructor() {
        this.#mesaController = new MesaService();
    }

    async listarMesas(req, res) {
        let respuesta;
        try {
            const listado = await this.#mesaController.listadoDeMesas(
                req.logger
            );
            respuesta = new RespuestaModelo(
                'EXITO',
                'Listado de mesas.',
                listado
            ).toJson();

            return res.json(respuesta);
        } catch (error) {
            respuesta = new RespuestaModelo(
                'NO_EXITO',
                'Error al obtener el listado de mesas.',
                error
            ).toJson();

            res.json(respuesta);
        }
    }

    async getMesa(req, res) {
        let respuesta;
        try {
            const { idMesa, idRestaurante } = req.body;
            let params;
            if (!idMesa) {
                params = { idRestaurante };
            } else {
                params = { idMesa };
            }
            const mesa = await this.#mesaController.mesaById(
                req.logger,
                params
            );
            respuesta = new RespuestaModelo(
                'EXITO',
                'Detalle de mesa(s).',
                mesa
            ).toJson();

            return res.json(respuesta);
        } catch (error) {
            respuesta = new RespuestaModelo(
                'NO_EXITO',
                'Error al obtener la mesa.',
                error
            ).toJson();

            res.json(respuesta);
        }
    }

    async crearMesa(req, res) {
        let respuesta;
        try {
            const crearMesa = await this.#mesaController.crear(
                req.logger,
                req.body
            );
            respuesta = new RespuestaModelo(
                'EXITO',
                'Mesa creada correctamente',
                crearMesa
            ).toJson();

            return res.json(respuesta);
        } catch (error) {
            req.logger.error(JSON.stringify(error));
            respuesta = new RespuestaModelo(
                'NO_EXITO',
                'Error al crear la mesa.',
                error
            ).toJson();

            res.json(respuesta);
        }
    }

    async actualizarMesa(req, res) {
        let respuesta;
        try {
            const idMesa = req.body.mesa.idMesa;
            const data = req.body.mesa.data;
            const actualizarMesa = await this.#mesaController.actualizar(
                req.logger,
                data,
                idMesa
            );
            respuesta = new RespuestaModelo(
                'EXITO',
                'Mesa actualizada correctamente',
                actualizarMesa
            ).toJson();

            return res.json(respuesta);
        } catch (error) {
            req.logger.error(JSON.stringify(error));
            respuesta = new RespuestaModelo(
                'NO_EXITO',
                'Error al actualizar la mesa.',
                error
            ).toJson();

            res.json(respuesta);
        }
    }

    async eliminarMesa(req, res) {
        let respuesta;
        try {
            const eliminarMesa = await this.#mesaController.eliminar(
                req.logger,
                req.body.idMesa
            );
            respuesta = new RespuestaModelo(
                'EXITO',
                'Mesa eliminada correctamente',
                eliminarMesa
            ).toJson();

            return res.json(respuesta);
        } catch (error) {
            req.logger.error(JSON.stringify(error));
            respuesta = new RespuestaModelo(
                'NO_EXITO',
                'Error al eliminar la mesa.',
                error
            ).toJson();

            res.json(respuesta);
        }
    }
}

module.exports = MesaController;
