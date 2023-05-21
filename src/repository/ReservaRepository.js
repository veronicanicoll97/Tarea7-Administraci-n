const pgClient = require('../database').database.pgClient;
const { ErrorHandler } = require('../errors');

class ReservaRepository {
    async listarReservas(log) {
        try {
            log.info('Listado de reservas.');
            const reservas = await pgClient.reservas.findMany({
                select: {
                    idReserva: true,
                    fechaReserva: true,
                    horaInicioReserva: true,
                    horaFinReserva: true,
                    cantidadMesa: true,
                    idMesa: true,
                    idCliente: true,
                    mesas: {
                        select: {
                            idRestaurante: true,
                            restaurantes: true,
                            nroPiso: true,
                            estadoMesa: true,
                            capacidadPorMesa: true,
                            posicionX: true, 
                            posicionY: true
                        },
                    },
                    clientes: true
                },
            });
            return reservas;
        } catch (error) {
            log.error(error);
            throw new ErrorHandler({
                message: 'Error al obtener el listado de reservas',
                detail: {
                    message: error,
                },
            });
        }
    }

    async crearReserva(log, reserva) {
        try {
            log.info('Creación de la reserva.');
            const reservaCreada = await pgClient.reservas.create({
                data: { ...reserva },
            });

            return reservaCreada;
        } catch (error) {
            log.error(error);
            throw new ErrorHandler({
                message: 'Error al crear la reserva',
                detail: {
                    message: error,
                },
            });
        }
    }

    async reservaById(log, reserva) {
        try {
            log.info(
                'Búsqueda de reserva a partir de los datos recibidos: ' +
                    JSON.stringify(reserva)
            );
            const reservaEncontrada = await pgClient.reservas.findMany({
                where: { ...reserva },
                select: {
                    idReserva: true,
                    fechaReserva: true,
                    horaInicioReserva: true,
                    horaFinReserva: true,
                    cantidadMesa: true,
                    idMesa: true,
                    idCliente: true,
                    mesas: {
                        select: {
                            idRestaurante: true,
                            restaurantes: true,
                            nroPiso: true,
                            estadoMesa: true,
                            capacidadPorMesa: true,
                            posicionX: true, 
                            posicionY: true
                        },
                    },
                    clientes: true
                },
            });
            return reservaEncontrada;
        } catch (error) {
            log.error(error);
            throw new ErrorHandler({
                message: 'Error al obtenre la reserva',
                extensions: { reserva },
                detail: {
                    message: error,
                },
            });
        }
    }


    async reservaByFecha(log, reserva) {
        try {
            log.info(
                'Busqueda a partir de los datos: ' + 
                JSON.stringify(reserva)
            )
            const [existe] = await pgClient.$queryRaw`
                SELECT count(1) "cantidad"
                FROM restaurante.reservas 
                WHERE id_mesa = ${Number(reserva.idMesa)}
                AND fecha_reserva = ${reserva.fechaReserva}::date
                AND to_char(hora_fin_reserva, 'HH24:mm:ss') = ${reserva.horaFinReserva}
                AND to_char(hora_inicio_reserva, 'HH24:mm:ss') = ${reserva.horaInicioReserva}
            `

            return Number(existe.cantidad)
        } catch (error) {
            log.error(error)
            throw error;
        }
    }
}

module.exports = ReservaRepository;
