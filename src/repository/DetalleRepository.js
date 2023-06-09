const pgClient = require('../database').database.pgClient;
const { ErrorHandler } = require('../errors');
const ProductoRepository = require('./ProductoRepository');


class DetalleRepository {
    #producto;
    constructor() {
        this.#producto = new ProductoRepository()
    }

    async detalleById(log, idDetalle, idCabecera, idProducto) {
        try {
            log.info(
                "Se consulta el detalle."
            );

            let detalleEncontrado;

            if(idDetalle) {
                detalleEncontrado = await pgClient.detalles.findUnique({
                    where: { idDetalle }
                });
            }

            if(idCabecera) {
                detalleEncontrado = await pgClient.detalles.findMany({
                    where: { idCabecera }
                });
            }


            if(idProducto) {
                detalleEncontrado = await pgClient.detalles.findMany({
                    where: { idProducto }
                });
            }

            return detalleEncontrado;

        } catch (error) {
            log.error(error)
            throw new ErrorHandler({
                mensaje: "Error en la busqueda del detalle.",
                detalle: {},
                extensiones: { idCabecera, idDetalle, idProducto }
            })
        }
    }


    async insertarDetalle(log, detalle) {
        try {
            log.info(
                "Datos recibidos para insertar el detalle: " + 
                JSON.stringify(detalle)
            );

            const detalleInsertado = await pgClient.detalles.create({
                data: { ... detalle }
            });

            // Cada vez que se inserta un nuevo detalle 
            // se debe actualizar el monto de la cabecera.
            const precioProducto = await this.#producto.productoById(
                Number(detalleInsertado.idProducto), log
            )
            
            const total = Number(detalleInsertado.cantidad) * Number(precioProducto.precioVenta)
            await pgClient.$executeRaw`
                UPDATE restaurante.cabeceras
                SET total = total + ${total}
                WHERE id_cabecera = ${detalleInsertado.idCabecera}
            `
            const idCabecera = detalleInsertado.idCabecera;
            const cabecera = await pgClient.cabeceras.findUnique({
                where: { idCabecera }
            });
            detalleInsertado['totalCabecera'] = cabecera.total;
            console.log("detalleInsertado", detalleInsertado);
            return detalleInsertado
        } catch (error) {
            console.log(error)
            log.error(error);
            throw new ErrorHandler({
                mensaje: "Error al insertar el detalle."
            }).toJson()
        }
    }


    async detalleCabeceraByIdMesa(log, idMesa, estado) {
        try {
            
            log.info(
                "Detalle de la cabecera asociada a la mesa: " + 
                JSON.stringify({idMesa, estado})
            )
            const [detalleCabecera] = await pgClient.cabeceras.findMany({
                where: {
                    idMesa, estado
                },
                select: {
                    idCabecera: true,
                    total: true,
                    fechaHoraInicioConsumo: true,
                    fechaHoraFinConsumo: true,
                    estado: true,
                    clientes: true,
                    detalles: true
                }
            })

            return detalleCabecera;

        } catch (error) {
            log.error(error)
            throw new ErrorHandler({
                mensaje: "Error al obtener el detalle asociado a  la cabecera."
            }).toJson()
        }
    }


    async actualizarCabecera(log, idCabecera, estado) {
        try {
            log.info("Actualizacion de la cabecera.")
            const actualizarCabecera = pgClient.cabeceras.update({
                where: { idCabecera },
                data: { estado }
            })

            return actualizarCabecera;
        } catch (error) {
            log.error(error)
            throw new ErrorHandler({
                mensaje: "Error al actualizar la cabecera."
            }).toJson()
        }
    }


    async detalleCabeceraById(log, idCabecera) {
        try {
            
            log.info(
                "Detalle de la cabecera asociada a la mesa: " + 
                JSON.stringify({idCabecera})
            )
            const detalleCabecera = await pgClient.cabeceras.findUnique({
                where: {
                    idCabecera
                },
                select: {
                    idCabecera: true,
                    total: true,
                    fechaHoraInicioConsumo: true,
                    fechaHoraFinConsumo: true,
                    estado: true,
                    clientes: true,
                    detalles: {
                        select: {
                            cantidad: true,
                            productos: true
                        }
                    }
                }
            })

            return detalleCabecera;

        } catch (error) {
            log.error(error)
            throw new ErrorHandler({
                mensaje: "Error al obtener el detalle asociado a  la cabecera."
            }).toJson()
        }
    }

    async detalleCabeceraByIdCliente(log, idCliente, estado) {
        try {
            
            log.info(
                "Detalle de la cabecera asociada a la mesa: " + 
                JSON.stringify({idCliente})
            )
            const [detalleCabecera] = await pgClient.cabeceras.findMany({
                where: {
                    idCliente,
                    estado
                },
                select: {
                    idCabecera: true,
                    total: true,
                    fechaHoraInicioConsumo: true,
                    fechaHoraFinConsumo: true,
                    estado: true,
                    clientes: true,
                    detalles: {
                        select: {
                            cantidad: true,
                            productos: true
                        }
                    }
                }
            })

            return detalleCabecera;

        } catch (error) {
            log.error(error)
            throw new ErrorHandler({
                mensaje: "Error al obtener el detalle asociado a  la cabecera."
            }).toJson()
        }
    }


    async insertarCabecera(log, cabecera) {
        try {
            log.info("Inserta una cabecera: " + JSON.stringify(cabecera))

            return await pgClient.cabeceras.create({
                data: { ... cabecera }
            })
        } catch (error) {
            log.error(error)
            throw new ErrorHandler({
                mensaje: "Error al insertar la cabecera."
            }).toJson()            
        }
    }
}


module.exports = DetalleRepository;