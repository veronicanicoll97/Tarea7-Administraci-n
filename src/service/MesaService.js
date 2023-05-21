const { MesaRepository } = require('../repository');

class MesaService {
    #mesaRepository;
    constructor() {
        this.#mesaRepository = new MesaRepository();
    }

    validarDatos(data) {
        Object.entries(data).forEach(([key, value]) => {
            if (key === 'nombreMesa' && typeof value != 'string')
                throw new ErrorHandler(
                    'Error en el tipo de dato se esperaba string se mandó un ' +
                        typeof value,
                    { key },
                    ''
                );
            if (key === 'posicionX' && typeof value != 'string')
                throw new ErrorHandler(
                    'Error en el tipo de dato se esperaba string se mandó un ' +
                        typeof value,
                    { key },
                    ''
                );
            if (key === 'posicionY' && typeof value != 'string')
                throw new ErrorHandler(
                    'Error en el tipo de dato se esperaba string se mandó un ' +
                        typeof value,
                    { key },
                    ''
                );
            if (key === 'capacidadPorMesa' && typeof value != 'string')
                throw new ErrorHandler(
                    'Error en el tipo de dato se esperaba string se mandó un ' +
                        typeof value,
                    { key },
                    ''
                );
            if (key === 'estadoMesa' && typeof value != 'string')
                throw new ErrorHandler(
                    'Error en el tipo de dato se esperaba string se mandó un ' +
                        typeof value,
                    { key },
                    ''
                );
            if (key === 'idRestaurante' && typeof value != 'string')
                throw new ErrorHandler(
                    'Error en el tipo de dato se esperaba string se mandó un ' +
                        typeof value,
                    { key },
                    ''
                );
            if (key === 'nroPiso' && typeof value != 'string')
                throw new ErrorHandler(
                    'Error en el tipo de dato se esperaba string se mandó un ' +
                        typeof value,
                    { key },
                    ''
                );
        });
    };

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
                    log,
                    Number(mesa.idRestaurante)
                );
            } else {
                respuesta = await this.#mesaRepository.mesaById(
                    log,
                    Number(mesa.idMesa)
                );
            }

            return respuesta;
        } catch (error) {
            log.error(JSON.stringify(error));
            throw error;
        }
    }

    async crear(log, mesa) {
        try {
            log.info('Validación de los datos para la creación de una mesa.');
            this.validarDatos(mesa);
            const {
                nombreMesa, posicionX, posicionY,
                capacidadPorMesa, estadoMesa, idRestaurante,
                nroPiso
            } = mesa;

            if(!idRestaurante)
                throw new Error('No se ha proporcionado el identificador del restaurante')
            const data = {
                nombreMesa, posicionX: Number(posicionX),
                posicionY: Number(posicionY), estadoMesa, 
                capacidadPorMesa: Number(capacidadPorMesa),
                idRestaurante: Number(idRestaurante),
                nroPiso: Number(nroPiso)
            }
            
            log.info('Retorna los datos de la mesa creada.');
            return await this.#mesaRepository.crearMesa(log, data);
        } catch (error) {
            log.error(JSON.stringify(error));
            throw error;
        }
    }

    async actualizar(log, mesa, idMesa) {
        try {
            const {
                nombreMesa, posicionX, posicionY,
                capacidadPorMesa, estadoMesa, idRestaurante,
                nroPiso
            } = mesa;

            const data = {
                nombreMesa: !nombreMesa ? undefined : nombreMesa, 
                posicionX: !posicionX ? undefined : Number(posicionX),
                posicionY: !posicionY ? undefined : Number(posicionY), 
                estadoMesa: !estadoMesa ? undefined : estadoMesa, 
                capacidadPorMesa: !capacidadPorMesa ? undefined : Number(capacidadPorMesa),
                idRestaurante: !idRestaurante ? undefined : Number(idRestaurante),
                nroPiso: !nroPiso ? undefined : Number(nroPiso)
            }
            log.info('Se retornan los datos de la mesa actualizada.');
            return await this.#mesaRepository.actualizarMesa(log, data, Number(idMesa));
        } catch (error) {
            log.error(JSON.stringify(error));
            throw error;
        }
    }

    async eliminar(log, idMesa) {
        try {
            log.info('Retorno de los datos de la mesa eliminada.');
            return await this.#mesaRepository.eliminarMesa(log, Number(idMesa));
        } catch (error) {
            log.error(JSON.stringify(error));
            throw error;
        }
    }
}

module.exports = MesaService;
