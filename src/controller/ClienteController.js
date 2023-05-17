const { ClienteService } = require('../service');
const { RespuestaModelo } = require('../model');

class ClienteController {
    #clienteService;
    constructor() {
        this.#clienteService = new ClienteService();
    }

    async getListadoClientes(req, res) {
        let respuesta;
        try {
            const listado = await this.#clienteService.listadoDeClientes(
                req.logger
            );
            respuesta = new RespuestaModelo(
                'EXITO',
                'Listado de clientes.',
                listado
            ).toJson();

            return res.json(respuesta);
        } catch (error) {
            respuesta = new RespuestaModelo(
                'NO_EXITO',
                'Error al obtener el listado de clientes.',
                error
            ).toJson();

            res.json(respuesta);
        }
    }

    async getCliente(req, res) {
        let respuesta;
        try {
            const { idCliente, nroDocumento } = req.body;
            let params;
            if (!idCliente) {
                params = { nroDocumento };
            } else {
                params = { idCliente };
            }

            const cliente = await this.#clienteService.clienteById(
                req.logger,
                params
            );
            respuesta = new RespuestaModelo(
                'EXITO',
                'Cliente encontrado.',
                cliente
            ).toJson();

            return res.json(respuesta);
        } catch (error) {
            req.logger.error(JSON.stringify(error));
            respuesta = new RespuestaModelo(
                'NO_EXITO',
                'Error al obtener el cliente.',
                error
            ).toJson();

            res.json(respuesta);
        }
    }

    async crearCliente(req, res) {
        let respuesta;
        try {
            const clienteCreado = await this.#clienteService.crear(
                req.logger,
                req.body
            );
            respuesta = new RespuestaModelo(
                'EXITO',
                'Cliente creado correctamente',
                clienteCreado
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
}

module.exports = ClienteController;
