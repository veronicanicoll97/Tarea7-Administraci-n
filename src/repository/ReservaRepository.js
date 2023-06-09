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
                            posicionY: true,
                        },
                    },
                    clientes: true,
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
                            posicionY: true,
                        },
                    },
                    clientes: true,
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
                'Busqueda a partir de los datos: ' + JSON.stringify(reserva)
            );
            const [existe] = await pgClient.$queryRaw`
                SELECT count(1) "cantidad"
                FROM restaurante.reservas 
                WHERE id_mesa = ${Number(reserva.idMesa)}
                AND fecha_reserva = ${reserva.fechaReserva}::date
                AND to_char(hora_fin_reserva, 'HH24:mm:ss') = ${
                    reserva.horaFinReserva
                }
                AND to_char(hora_inicio_reserva, 'HH24:mm:ss') = ${
                    reserva.horaInicioReserva
                }
            `;

            return Number(existe.cantidad);
        } catch (error) {
            log.error(error);
            throw error;
        }
    }

    async listarMesasDisponibles(log, params) {
        try {
            log.info(
                'Busqueda a partir de los datos: ' + JSON.stringify(params)
            );
            const {
                fechaReserva,
                horaInicioReserva,
                horaFinReserva,
                idRestaurante,
            } = params;

            return await pgClient.$queryRaw`
                SELECT *
                FROM restaurante.mesas m
                WHERE m.id_restaurante = ${Number(idRestaurante)}
                    AND m.id_mesa NOT IN (
                    SELECT r.id_mesa
                    FROM restaurante.reservas r
                    JOIN restaurante.mesas m ON r.id_mesa = m.id_mesa
                    WHERE id_restaurante = ${Number(idRestaurante)}
                        AND fecha_reserva = ${fechaReserva}::date
                        AND (
                        (hora_inicio_reserva <= ${horaInicioReserva}::time AND hora_fin_reserva >= ${horaFinReserva}::time)
                        OR
                        (hora_inicio_reserva >= ${horaInicioReserva}::time AND hora_fin_reserva <= ${horaFinReserva}::time)
                        OR
                        (hora_inicio_reserva < ${horaInicioReserva}::time AND hora_fin_reserva > ${horaInicioReserva}::time AND hora_fin_reserva <= ${horaFinReserva}::time)
                        OR
                        (hora_fin_reserva > ${horaInicioReserva}::time AND hora_inicio_reserva >= ${horaInicioReserva}::time AND hora_inicio_reserva < ${horaFinReserva}::time)
                        )
                    )
                ORDER BY id_mesa
                `;
        } catch (error) {
            log.error(error);
            throw error;
        }
    }


    async detalleReserva(log, datos) {
        try {
            log.info(
                "Detalle de la reserva. " + 
                JSON.stringify(datos)
            );

            const reserva = await pgClient.reservas.findMany({
                where: { ... datos }
            })

            if(reserva.length === 0)    
                return new Array();
            return reserva
        } catch (error) {
            log.error(error)
            throw new ErrorHandler({
                mensaje: "Error al obtener el detalle de la reserva.",
                detalle: {},
                extensiones: { datos }
            })
        }
    }
}

module.exports = ReservaRepository;
