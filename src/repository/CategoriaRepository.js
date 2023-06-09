const pgClient = require('../database').database.pgClient;
const { ErrorHandler } = require('../errors');

class CategoriaRepository {
    async listadoCategorias(log) {
        try {
            log.info('Listado de categorias.');
            const listadoCategoria = await pgClient.categorias.findMany({});

            if (listadoCategoria.length === 0) return new Array();

            return listadoCategoria;
        } catch (error) {
            log.error(error);
            throw new ErrorHandler({
                mensaje: 'Error al obtener el listado de categorias',
            });
        }
    }

    async categoriaById(idCategoria, log) {
        try {
            log.info('Listado de categorias.');
            const categoriaPorId = await pgClient.categorias.findUnique({
                where: { idCategoria },
            });

            if (!categoriaPorId) return new Object();

            return categoriaPorId;
        } catch (error) {
            log.error(error);
            throw new ErrorHandler({
                mensaje:
                    'Error al obtener la categoria a partir del id: ' +
                    idCategoria,
            });
        }
    }

    async crearCategoria(datos, log) {
        try {
            log.info(
                'Datos recibidos para crear la categoria: ' +
                    JSON.stringify(datos)
            );

            const categoriaCreada = await pgClient.categorias.create({
                data: { ...datos },
            });

            return categoriaCreada;
        } catch (error) {
            log.error(error);
            throw new ErrorHandler({
                mensaje: 'Error al crear la categoria.',
                detalle: {},
                extensiones: { datos },
            });
        }
    }

    async eliminarCategoria(idCategoria, log) {
        try {
            log.info(
                'Inicia el proceso de eliminar la categoria: ' + idCategoria
            );

            const categoriaEliminada = await pgClient.categorias.delete({
                where: { idCategoria },
            });

            return categoriaEliminada;
        } catch (error) {
            log.error(error);
            if (error?.meta?.cause === 'Record to delete does not exist.')
                return undefined;

            throw new ErrorHandler({
                mensaje: 'Error al eliminar la categoria.',
                detalle: {},
                extensiones: {},
            });
        }
    }

    async actualizarCategoria(idCategoria, datos, log) {
        try {
            log.info(
                'Inicia el proceso de actualizar la categoria: ' + idCategoria
            );

            const categoriaActualizada = await pgClient.categorias.update({
                where: { idCategoria },
                data: { ...datos },
            });

            return categoriaActualizada;
        } catch (error) {
            log.error(error);
            throw new ErrorHandler({
                mensaje: 'Error al actualizar la categoria.',
                detalle: {},
                extensiones: { datos },
            });
        }
    }
}

module.exports = CategoriaRepository;
