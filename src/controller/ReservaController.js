const { ReservaService } = require('../service');
const { RespuestaModelo } = require('../model');

class ReservaController {
    #reservaService;
    constructor() {
        this.#reservaService = new ReservaService();
    }

    async listar(req, res) {
        let respuesta;
        try {
            const listado = await this.#reservaService.listadoDeReserva(
                req.logger
            );
            respuesta = new RespuestaModelo(
                'EXITO',
                'Listado de reservas.',
                listado
            ).toJson();

            return res.json(respuesta);
        } catch (error) {
            respuesta = new RespuestaModelo(
                'NO_EXITO',
                'Error al obtener el listado de reservas.',
                error
            ).toJson();

            res.json(respuesta);
        }
    }

    async crear(req, res) {
        let respuesta;
        try {
            const reservaCreada = await this.#reservaService.crearReserva(
                req.logger,
                req.body
            );
            respuesta = new RespuestaModelo(
                'EXITO',
                'Reserva creada con éxito.',
                reservaCreada
            ).toJson();

            return res.json(respuesta);
        } catch (error) {
            respuesta = new RespuestaModelo(
                'NO_EXITO',
                'Error al crear la reserva.',
                error
            ).toJson();

            res.json(respuesta);
        }
    }

    async getById(req, res) {
        let respuesta;
        try {
            const reservaObtenida = await this.#reservaService.getReserva(
                req.logger,
                req.body
            );
            respuesta = new RespuestaModelo(
                'EXITO',
                'Reserva obtenida con éxito.',
                reservaObtenida
            ).toJson();

            return res.json(respuesta);
        } catch (error) {
            respuesta = new RespuestaModelo(
                'NO_EXITO',
                'Error al obtener la reserva.',
                error
            ).toJson();

            res.json(respuesta);
        }
    }
    
    async listarMesasDisponibles(req, res) {
        let respuesta;
        try {
            const fechaReserva = req.query.fechaReserva;
            const horaInicioReserva = req.query.horaInicioReserva;
            const horaFinReserva = req.query.horaFinReserva;
            const idRestaurante = req.query.idRestaurante;

            const params = {
                fechaReserva: fechaReserva,
                horaInicioReserva: horaInicioReserva,
                horaFinReserva: horaFinReserva,
                idRestaurante: idRestaurante,
            };
            const listadoMesasDisponibles = await this.#reservaService.listadoMesasDisponibles(
                req.logger,
                params
            );
            respuesta = new RespuestaModelo(
                'EXITO',
                'Listado de mesas disponibles.',
                listadoMesasDisponibles
            ).toJson();

            return res.json(respuesta);
        } catch (error) {
            respuesta = new RespuestaModelo(
                'NO_EXITO',
                'Error al obtener el listado de reservas.',
                error
            ).toJson();

            res.json(respuesta);
        }
    }
}

module.exports = ReservaController;
