const { ClienteRepository } = require('../repository');
const { RestauranteRepository } = require('../repository');
const { ErrorHandler } = require('../errors');

class RestauranteService {
    #restauranteRepository;
    constructor() {
        this.#restauranteRepository = new RestauranteRepository();
    }

    /**
     * Listado de restaurantes que se encuentran en base de datos.
     * @param {*} log Instancia de escitura de logs.
     * @returns
     */
    async listadoDeRestaurantes(log) {
        try {
            log.info('Retornando listado de clientes en base de datos.');
            return await this.#restauranteRepository.listarRestaurantes(log);
        } catch (error) {
            log.error(JSON.stringify(error));
            throw error;
        }
    }

    async restauranteById(log, restaurante) {
        try {
            log.info(
                'Búsqueda de restaurante segun argumentos: ' +
                    JSON.stringify(restaurante)
            );
            return await this.#restauranteRepository.getRestaurante(
                log,
                restaurante
            );
        } catch (error) {
            log.error(JSON.stringify(error));
            throw error;
        }
    }

    async crear(log, restaurante) {
        try {
            log.info(
                'Datos recibidos para la creación de un restaurante: ' +
                    JSON.stringify(restaurante)
            );
            const validarDatos = data => {
                Object.entries(data).forEach(([key, value]) => {
                    if (key === 'nombre' && typeof value != 'string')
                        throw new ErrorHandler(
                            'Error en el tipo de dato se esperaba string se mandó un ' +
                                typeof value,
                            { key },
                            ''
                        );
                    if (key === 'direccion' && typeof value != 'string')
                        throw new ErrorHandler(
                            'Error en el tipo de dato se esperaba string se mandó un ' +
                                typeof value,
                            { key },
                            ''
                        );
                });
            };

            log.info(
                'Validación de los datos para la creación de un restaurante.'
            );
            validarDatos(restaurante);

            return await this.#restauranteRepository.crearRestaurante(
                log,
                restaurante
            );
        } catch (error) {
            log.error(JSON.stringify(error));
            throw error;
        }
    }

    async actualizar(log, restaurante) {
        try {
            log.info(
                'Datos recibidos para la actualizacion de un restaurante: ' +
                    JSON.stringify(restaurante)
            );
            const validarDatos = data => {
                Object.entries(data).forEach(([key, value]) => {
                    if (key === 'nombre' && typeof value != 'string')
                        throw new ErrorHandler(
                            'Error en el tipo de dato se esperaba string se mandó un ' +
                                typeof value,
                            { key },
                            ''
                        );
                    if (key === 'direccion' && typeof value != 'string')
                        throw new ErrorHandler(
                            'Error en el tipo de dato se esperaba string se mandó un ' +
                                typeof value,
                            { key },
                            ''
                        );
                });
            };

            log.info(
                'Validación de los datos para la actualizacion de un restaurante.'
            );
            validarDatos(restaurante);

            return await this.#restauranteRepository.actualizarRestaurante(
                log,
                restaurante
            );
        } catch (error) {
            log.error(JSON.stringify(error));
            throw error;
        }
    }

    async eliminarById(log, restaurante) {
        try {
            return await this.#restauranteRepository.eliminarRestaurante(
                log,
                restaurante
            );
        } catch (error) {
            log.error(JSON.stringify(error));
            throw error;
        }
    }
}

module.exports = RestauranteService;
