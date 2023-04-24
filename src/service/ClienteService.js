const { ClienteRepository } = require('../repository');
const { ErrorHandler } = require('../errors');

class ClienteService {
    #clienteRepository;
    constructor() {
        this.#clienteRepository = new ClienteRepository();
    }

    /**
     * Listado de clientes que se encuentran en base de datos.
     * @param {*} log Instancia de escitura de logs.
     * @returns
     */
    async listadoDeClientes(log) {
        try {
            log.info('Retornando listado de clientes en base de datos.');
            return await this.#clienteRepository.listarClientes(log);
        } catch (error) {
            log.error(JSON.stringify(error));
            throw error;
        }
    }

    /**
     * Cliente por identificador de BD.
     * @param {*} log Instancia de escitura de logs.
     * @param {Number} cliente.idCliente Identificador del
     * cliente. 
     * @returns 
     */
    async clienteById(log, cliente) {
        try {
            log.info(
                'Búsqueda de cliente segun argumentos: ' + 
                JSON.stringify(cliente)
            );
            return await this.#clienteRepository.getCliente(log, cliente);
        } catch (error) {
            log.error(JSON.stringify(error));
            throw error;
        }
    }

    /**
     * Número de documento del cliente
     * @param {*} log Instancia de escitura de logs.
     * @param {String} cliente.nroDocumento INro de documento
     * del cliente. 
     * @returns 
     */
    async clienteByNroDocumento(log, cliente) {
        try {
            log.info(
                'Búsqueda de cliente segun argumentos: ' + 
                JSON.stringify(cliente)
            );
            return await this.#clienteRepository.getCliente(log, cliente);
        } catch (error) {
            log.error(JSON.stringify(error));
            throw error;
        }
    }

    /**
     * Creación de un cliente.
     * @param {*} log Instancia de escitura de logs.
     * @param {String} cliente.nroDocumento Numero de 
     * documento del cliente.
     * @param {String} cliente.nombres Nombre del cliente
     * @param {String} cliente.apellidos Apellido del cliente
     * @returns 
     */
    async crear(log, cliente) {
        try {

            log.info(
                'Datos recibidos para la creación de un cliente: ' + 
                JSON.stringify(cliente)
            );
            const validarDatos = (data) => {
                Object.entries(data).forEach(
                    ([key, value]) => {
                        if(key === 'nombres' && typeof value != 'string') 
                            throw new ErrorHandler(
                                'Error en el tipo de dato se esperaba string se mandó un ' + typeof value,
                                { key },
                                ''
                            )
                        if(key === 'apellidos' && typeof value != 'string') 
                            throw new ErrorHandler(
                                'Error en el tipo de dato se esperaba string se mandó un ' + typeof value,
                                { key },
                                ''
                            )
                        if(key === 'nroDocumento' && typeof value != 'string') 
                            throw new ErrorHandler(
                                'Error en el tipo de dato se esperaba string se mandó un ' + typeof value,
                                { key },
                                ''
                            )
                    }
                )
            }

            log.info('Validación de los datos para la creación de un cliente.')
            validarDatos(cliente)

            return await this.#clienteRepository.crearCliente(log, cliente);

        }catch(error) {
            log.error(JSON.stringify(error));
            throw error;            
        }
    }
}

module.exports = ClienteService;
