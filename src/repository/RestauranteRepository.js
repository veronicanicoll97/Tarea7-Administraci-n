const pgClient = require('../database').database.pgClient;
const { ErrorHandler } = require('../errors');

class RestauranteRepository {
    async listarRestaurantes(log) {
        try {
            return await pgClient.restaurantes.findMany();
        } catch (error) {
            log.error(JSON.stringify(error));
            throw new ErrorHandler(
                'Error al ejecutar la consulta para obtener el listado de restaurantes.',
                error,
                ''
            ).toJson();
        }
    }

    async getRestaurante(log, restaurante) {
        try {
            log.info(
                'Argumentos para la consulta: ' + JSON.stringify(restaurante)
            );
            const params = {
                idRestaurante: !restaurante.idRestaurante
                    ? undefined
                    : restaurante.idRestaurante,
            };

            const [restauranteEnBD] = await pgClient.restaurantes.findMany({
                where: {
                    ...params,
                },
            });

            return restauranteEnBD;
        } catch (error) {
            log.error(JSON.stringify(error));
            throw new ErrorHandler(
                'Error al ejecutar la consulta para obtener el restaurante',
                error,
                { cliente }
            ).toJson();
        }
    }

    async crearRestaurante(log, restaurante) {
        try {
            log.info(
                'Argumentos para la creación de un restaurante: ' +
                    JSON.stringify(restaurante)
            );

            const restauranteEnBD = await pgClient.restaurantes.create({
                data: {
                    ...restaurante,
                },
            });

            return restauranteEnBD;
        } catch (error) {
            log.error(JSON.stringify(error));
            throw new ErrorHandler(
                'Error en la creación del restaurante.',
                error,
                { cliente }
            ).toJson();
        }
    }

    async actualizarRestaurante(log, restaurante) {
        try {
            log.info(
                'Argumentos para la actualización del restaurante: ' +
                    JSON.stringify(restaurante)
            );

            const params = {
                nombre: !restaurante.nombre ? undefined : restaurante.nombre,
                direccion: !restaurante.direccion
                    ? undefined
                    : restaurante.direccion,
            };

            const restauranteEnBD = await pgClient.restaurantes.update({
                where: {
                    idRestaurante: restaurante.idRestaurante,
                },
                data: {
                    ...params,
                },
            });

            return restauranteEnBD;
        } catch (error) {
            log.error(JSON.stringify(error));
            throw new ErrorHandler(
                'Error en la actualización del restaurante.',
                error,
                { restauranteId, restauranteActualizado }
            ).toJson();
        }
    }

    async eliminarRestaurante(log, restaurante) {
        try {
            log.info(
                'Eliminando restaurante con ID: ' + JSON.stringify(restaurante)
            );

            const params = {
                idRestaurante: !restaurante.idRestaurante
                    ? undefined
                    : restaurante.idRestaurante,
            };
            const restauranteEliminado = await pgClient.restaurantes.delete({
                where: {
                    ...params
                },
            });

            return restauranteEliminado;
        } catch (error) {
            log.error(JSON.stringify(error));
            throw new ErrorHandler('Error al eliminar el restaurante.', error, {
                restauranteId,
            }).toJson();
        }
    }
}

module.exports = RestauranteRepository;
