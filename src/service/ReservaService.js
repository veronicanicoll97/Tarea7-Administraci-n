const { ReservaRepository, MesaRepository } = require('../repository');
const dayjs = require('dayjs');
class ReservaService {
    #reservaRepository;
    #mesaRepository
    constructor() {
        this.#reservaRepository = new ReservaRepository();
        this.#mesaRepository = new MesaRepository()
    }

    validarDatos(data) {
        Object.entries(data).forEach(([key, value]) => {
            if (key === 'fechaReversa' && typeof value != 'string')
                throw new ErrorHandler(
                    'Error en el tipo de dato se esperaba string se mandó un ' +
                        typeof value,
                    { key },
                    ''
                );
            if (key === 'horaInicioReversa' && typeof value != 'string')
                throw new ErrorHandler(
                    'Error en el tipo de dato se esperaba string se mandó un ' +
                        typeof value,
                    { key },
                    ''
                );
            if (key === 'horaFinReversa' && typeof value != 'string')
                throw new ErrorHandler(
                    'Error en el tipo de dato se esperaba string se mandó un ' +
                        typeof value,
                    { key },
                    ''
                );
            if (key === 'cantidadMesa' && typeof value != 'string')
                throw new ErrorHandler(
                    'Error en el tipo de dato se esperaba string se mandó un ' +
                        typeof value,
                    { key },
                    ''
                );
            if (key === 'idCliente' && typeof value != 'string')
                throw new ErrorHandler(
                    'Error en el tipo de dato se esperaba string se mandó un ' +
                        typeof value,
                    { key },
                    ''
                );
            if (key === 'idMesa' && typeof value != 'string')
                throw new ErrorHandler(
                    'Error en el tipo de dato se esperaba string se mandó un ' +
                        typeof value,
                    { key },
                    ''
                );
        });
    };

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
            const { 
                fechaReserva, horaInicioReserva, horaFinReserva,
                cantidadMesa, idCliente, idMesa
            } = data

            if(!idMesa){
                log.error("No se ha enviado el dato de la mesa.")
                throw new Error("No se ha enviado el dato de la mesa.")
            }
            if(!idCliente){
                log.error("No se ha enviado el dato del cliente.")
                throw new Error("No se ha enviado el dato del cliente.")
            }

            const mesaEncontrada = await this.#mesaRepository.mesaById(
                log,
                Number(idMesa)
            )

            if(mesaEncontrada.estadoMesa === 'RESERVADO') {
                log.error("La mesa ya se encuentra reservada.")
                throw new Error("La mesa ya se encuentra reservada.")
            }
            
            await this.#mesaRepository.actualizarMesa(
                log,
                {"estadoMesa": "RESERVADO"},
                Number(idMesa)
            )

            const hora = time => {
                const [hours, minutes, seconds] = time.split(":");
                const dateObject = new Date();
                dateObject.setHours(hours);
                dateObject.setMinutes(minutes);
                dateObject.setSeconds(seconds);

                return dateObject;
            }

            const reserva = {
                fechaReserva: new Date(fechaReserva),
                horaInicioReserva: hora(horaInicioReserva),
                horaFinReserva: hora(horaFinReserva),
                cantidadMesa: !cantidadMesa ? undefined : Number(cantidadMesa),
                idCliente: Number(idCliente), idMesa: Number(idMesa)
            }
            return await this.#reservaRepository.crearReserva(log, reserva);
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
