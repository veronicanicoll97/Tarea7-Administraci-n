const { ErrorHandler } = require('../errors');
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
            if (key === 'idRestaurante' && typeof value != 'string')
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
                cantidadMesa, idCliente, idRestaurante
            } = data

            const mesasResto = await this.#mesaRepository.mesaByIdRestaurante(
                log, Number(idRestaurante)
            );

            if(!idCliente){
                log.error("No se ha enviado el dato del cliente.")
                throw new Error("No se ha enviado el dato del cliente.")
            }

            const hora = time => {
                const [hours, minutes, seconds] = time.split(":");
                const dateObject = new Date();
                dateObject.setHours(hours);
                dateObject.setMinutes(minutes);
                dateObject.setSeconds(seconds);

                return dateObject;
            }
            // Obtiene el último elemento disponible
            const mesa = mesasResto.pop();
            
            const existeReserva = await this.#reservaRepository.reservaByFecha(
                log,
                { 
                    idMesa: Number(mesa.idMesa),
                    horaInicioReserva: horaInicioReserva,
                    horaFinReserva: horaFinReserva,
                    fechaReserva: fechaReserva
                }
            );


            if(existeReserva > 0) {
                log.error("No es posible reservar.")
                throw new ErrorHandler({
                    message: "La mesa ya se encuentra reservada en el horario seleccionado.",
                    extensions: { fechaReserva, horaFinReserva, horaInicioReserva }
                })
            }

            const reserva = {
                fechaReserva: new Date(fechaReserva),
                horaInicioReserva: hora(horaInicioReserva),
                horaFinReserva: hora(horaFinReserva),
                cantidadMesa: !cantidadMesa ? undefined : Number(cantidadMesa),
                idCliente: Number(idCliente), idMesa: Number(mesa.idMesa)
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
