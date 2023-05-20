const { ReservaRepository } = require('../repository');

class ReservaService {
    #reservaRepository;
    constructor() {
        this.#reservaRepository = new ReservaRepository();
    }

    async listadoDeReserva(log) {
        try {
            log.info('Retorna el listado de reversas.');
            return await this.#reservaRepository.listarReservas(log);
        } catch (error) {
            log.error(JSON.stringify(error));
            throw error;
        }
    }

    async crearReserva(log, data) {
        try {
            log.info('Retorna los datos de la reserva creada.');
            return await this.#reservaRepository.crearReversa(log, data);
        } catch (error) {
            log.error(JSON.stringify(error));
            throw error;
        }
    }

    async getReserva(log, data) {
        try {
            log.info('Retorna los datos de la reserva creada.');
            return await this.#reservaRepository.reservaById(log, data);
        } catch (error) {
            log.error(JSON.stringify(error));
            throw error;
        }
    }
}

module.exports = ReservaService;
