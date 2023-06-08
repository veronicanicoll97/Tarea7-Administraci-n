const pgClient = require('../database').database.pgClient;
const { ErrorHandler } = require('../errors');

class ProductoRepository {
    async listadoProductos(log) {
        try {
            log.info('Listado de productos.');
            const listadoCategoria = await pgClient.productos.findMany({});

            if (listadoCategoria.length === 0) return new Array();

            return listadoCategoria;
        } catch (error) {
            log.error(error);
            throw new ErrorHandler({
                mensaje: 'Error al obtener el listado de productos',
            });
        }
    }

    async productoById(idProducto, log) {
        try {
            log.info('Listado de producto por idProducto.');
            const productoById = await pgClient.productos.findUnique({
                where: { idProducto },
            });

            if (!productoById) return new Object();

            return productoById;
        } catch (error) {
            log.error(error);
            throw new ErrorHandler({
                mensaje:
                    'Error al obtener el producto a partir del id: ' +
                    idProducto,
            });
        }
    }

    async productoByIdCategoria(idCategoria, log) {
        try {
            log.info('Listado de producto por categoria.');
            const productoByIdCategoria = await pgClient.productos.findMany({
                where: { idCategoria },
            });

            if (productoByIdCategoria.length === 0) return new Array();

            return productoByIdCategoria;
        } catch (error) {
            log.error(error);
            throw new ErrorHandler({
                mensaje:
                    'Error al obtener el listado de ' +
                    ' producto a partir del idCategoria: ' +
                    idCategoria,
            });
        }
    }

    async crearProducto(datos, log) {
        try {
            log.info(
                'Datos recibidos para crear el producto: ' +
                    JSON.stringify(datos)
            );

            const productoCreado = await pgClient.productos.create({
                data: { ...datos },
            });

            return productoCreado;
        } catch (error) {
            log.error(error);
            throw new ErrorHandler({
                mensaje: 'Error al crear el producto.',
                detalle: {},
                extensiones: { datos },
            });
        }
    }

    async eliminarProducto(idProducto, log) {
        try {
            log.info(
                'Inicia el proceso de eliminar el producto: ' + idProducto
            );

            const productoEliminado = await pgClient.productos.delete({
                where: { idProducto },
            });

            return productoEliminado;
        } catch (error) {
            log.error(error);
            if (error?.meta?.cause === 'Record to delete does not exist.')
                return undefined;

            throw new ErrorHandler({
                mensaje: 'Error al eliminar el producto.',
                detalle: {},
                extensiones: {},
            });
        }
    }

    async actualizarProducto(idProducto, datos, log) {
        try {
            log.info(
                'Inicia el proceso de actualizar el producto: ' + idProducto
            );

            const productoActualizado = await pgClient.productos.update({
                where: { idProducto },
                data: { ... datos },
            });

            return productoActualizado;
        } catch (error) {
            log.error(error);
            throw new ErrorHandler({
                mensaje: 'Error al actualizar el producto.',
                detalle: {},
                extensiones: { datos },
            });
        }
    }
}

module.exports = ProductoRepository;
