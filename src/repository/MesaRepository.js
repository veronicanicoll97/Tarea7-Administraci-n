const pgClient = require('../database').database.pgClient;
const { ErrorHandler } = require('../errors');

class MesaRepository {
    async listadoMesas(log) {
        try {
            log.info('Listado de mesas.');

            const mesas = await pgClient.mesas.findMany({});
            return mesas;
        } catch (error) {
            log.error(error);
            throw new ErrorHandler({
                message: 'Error al obtener el listado de mesas',
                detail: {
                    message: error,
                },
            });
        }
    }

    async mesaByIdRestaurante(log, idRestaurante) {
        try {
            log.info(
                'Mesa a partir del identificador del restaurante.' +
                    idRestaurante
            );

            const mesas = await pgClient.mesas.findMany({
                where: { idRestaurante },
            });

            return mesas;
        } catch (error) {
            log.error(error);
            throw new ErrorHandler({
                message:
                    'Error al obtener el listado de mesas asociado al restaurante N°: ' +
                    idRestaurante,
                detail: {
                    message: error,
                },
            });
        }
    }

    async mesaById(log, idMesa) {
        try {
            log.info('Obtiene la mesa a partir de su identificador: ' + idMesa);
            const mesa = await pgClient.mesas.findUnique({
                where: { idMesa },
            });
            if (!mesa) return new Object();
            return mesa;
        } catch (error) {
            log.error(error);
            throw new ErrorHandler({
                message: 'Error al obtener la mesa: ' + idMesa,
                detail: {
                    message: error,
                },
            });
        }
    }

    async crearMesa(log, mesa) {
        try {
            log.info('Inicia el proceso de crear una mesa.');
            const mesaCreada = await pgClient.mesas.create({
                data: {
                    ...mesa,
                },
            });

            return mesaCreada;
        } catch (error) {
            log.error(error);
            throw new ErrorHandler({
                message: 'Error al crear la mesa.',
                detail: {
                    message: error,
                },
                extensions: {
                    mesa,
                },
            });
        }
    }

    async actualizarMesa(log, mesa, idMesa) {
        try {
            log.info('Inicia el proceso de actualizacion de la mesa.');
            const mesaActualizada = await pgClient.mesas.update({
                where: { idMesa },
                data: {
                    ...mesa,
                },
            });

            return mesaActualizada;
        } catch (error) {
            log.error(error);
            throw new ErrorHandler({
                message: 'Error al actualizar la mesa.',
                detail: {
                    message: error,
                },
                extensions: {
                    idMesa,
                    mesa,
                },
            });
        }
    }

    async eliminarMesa(log, idMesa) {
        try {
            log.info('Elimina la mesa N°: ', idMesa);
            const mesaEliminada = await pgClient.mesas.delete({
                where: { idMesa },
            });
            return mesaEliminada;
        } catch (error) {
            log.error(error);
            throw new ErrorHandler({
                message: 'Error al eliminar la mesa.',
                detail: {
                    message: error,
                },
                extensions: {
                    idMesa,
                },
            });
        }
    }
}

module.exports = MesaRepository;
