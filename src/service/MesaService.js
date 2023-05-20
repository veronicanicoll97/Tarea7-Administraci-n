const { MesaRepository } = require('../repository');

class MesaService {
    #mesaRepository;
    constructor() {
        this.#mesaRepository = new MesaRepository();
    }

    async listadoDeMesas(log) {
        try {
            log.info('Retornando el listado de mesas.');
            return await this.#mesaRepository.listadoMesas(log);
        } catch (error) {
            log.error(JSON.stringify(error));
            throw error;
        }
    }

    async mesaById(log, mesa) {
        try {
            log.info(
                'Retornando mesa a partir del indetificador.' +
                    JSON.stringify(mesa)
            );

            let respuesta;
            if (!mesa.idMesa) {
                respuesta = await this.#mesaRepository.mesaByIdRestaurante(
                    Number(mesa.idRestaurante)
                );
            } else {
                respuesta = await this.#mesaRepository.mesaById(
                    Number(mesa.idMesa)
                );
            }

            return mesa;
        } catch (error) {
            log.error(JSON.stringify(error));
            throw error;
        }
    }

    async crear(log, mesa) {
        try {
            log.info('Retorna los datos de la mesa creada.');
            return await this.#mesaRepository.crearMesa(log, mesa);
        } catch (error) {
            log.error(JSON.stringify(error));
            throw error;
        }
    }

    async actualizar(log, mesa, idMesa) {
        try {
            log.info('Se retornan los datos de la mesa actualizada.');
            return await this.#mesaRepository.actualizarMesa(log, mesa, idMesa);
        } catch (error) {
            log.error(JSON.stringify(error));
            throw error;
        }
    }

    async eliminar(log, idMesa) {
        try {
            log.info('Retorno de los datos de la mesa eliminada.');
            return await this.#mesaRepository.eliminarMesa(Number(idMesa));
        } catch (error) {
            log.error(JSON.stringify(error));
            throw error;
        }
    }
}

module.exports = MesaService;
