const pgClient = require('../database').database.pgClient;
const { ErrorHandler } = require('../errors');

class ClienteRepository {
    async listarClientes(log) {
        try {
            return await pgClient.clientes.findMany();
        } catch (error) {
            log.error(JSON.stringify(error));
            throw new ErrorHandler(
                'Error al ejecutar la consulta para obtener el listado de clientes.',
                error,
                ''
            ).toJson();
        }
    }

    async getCliente(log, cliente) {
        try {
            log.info('Argumentos para la consulta: ' + JSON.stringify(cliente));
            const params = {
                idCliente: !cliente.idCliente
                    ? undefined
                    : Number(cliente.idCliente),
                nroDocumento: !cliente.nroDocumento
                    ? undefined
                    : cliente.nroDocumento,
            };

            const [clienteEnBD] = await pgClient.clientes.findMany({
                where: {
                    ...params,
                },
            });

            return clienteEnBD;
        } catch (error) {
            log.error(JSON.stringify(error));
            throw new ErrorHandler(
                'Error al ejecutar la consulta para obtener el cliente',
                error,
                { cliente }
            ).toJson();
        }
    }

    async crearCliente(log, cliente) {
        try {
            log.info(
                'Argumentos para la creación de un cliente: ' +
                    JSON.stringify(cliente)
            );

            const clienteEnBD = await pgClient.clientes.create({
                data: {
                    ...cliente,
                },
            });

            return clienteEnBD;
        } catch (error) {
            log.error(JSON.stringify(error));
            throw new ErrorHandler('Error en la creación del cliente.', error, {
                cliente,
            }).toJson();
        }
    }
}

module.exports = ClienteRepository;
