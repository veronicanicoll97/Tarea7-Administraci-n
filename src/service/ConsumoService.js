const { 
    MesaRepository,
    ReservaRepository,
    DetalleRepository,
    ClienteRepository
} = require("../repository");
const dayjs = require("dayjs");
const path = require('path');
const fs = require("fs");

class ConsumoService {
    #mesa;
    #detalle;
    #cliente;
    constructor() {
        this.#mesa = new MesaRepository();
        this.#detalle = new DetalleRepository();
        this.#cliente = new ClienteRepository();
    }

    async verificarMesa(log, idMesa) {
        try {
            log.info('Verificando el estado de la mesa');

            const mesa = await this.#mesa.mesaById(log, idMesa)

            if(mesa.estadoMesa === 'RESERVADO') {
                return this.#detalle.detalleCabeceraByIdMesa(
                    log, Number(idMesa), 'ABIERTO'
                )
            }

            return new Object();
        } catch (error) {
            log.error(error);
            throw error;
        }
    }


    async detalleConsumo(log, detalle) {
        try {
            log.info(
                "Proceso de insercion de detalle de consumo."
            );

            const detalleInsertado = await this.#detalle.insertarDetalle(
                log, detalle
            )

            return detalleInsertado;
        } catch (error) {
            log.error(error);
            throw error;            
        }
    }


    async cerrarMesa(log, idMesa) {
        try {
            log.info("Porceso de actualizacion del estado de la mesa.")

            const actualizarMesa = await this.#mesa.actualizarMesa(
                log, { estadoMesa: 'DISPONIBLE'}, idMesa
            );

            log.info("Mesa actualizada: " + JSON.stringify(actualizarMesa))

            const cabeceraDetalle = await this.#detalle.detalleCabeceraByIdMesa(
                log, Number(idMesa), 'ABIERTO'
            )

            // Actualiza el estado de la cabecera.
            const actualizarCabecera = await this.#detalle.actualizarCabecera(
                log, cabeceraDetalle.idCabecera, 'CERRADO'
            )

            return actualizarCabecera
        } catch (error) {
            log.error(error);
            throw error;   
        }
    }


    async generarBase64String(log, idCabecera) {
        try {
            log.info(
                "Detalle de consumo de la cabecera: " + idCabecera
            );

            const consumo = await this.#detalle.detalleCabeceraById(
                log, idCabecera
            );
            
            const keys = ['PRODUCTO', 'CANTIDAD', 'PRECIO', 'TOTAL']
            const values = consumo.detalles.map(item => {
                const { 
                    cantidad, productos
                } = item;

                const { nombreProducto, precioVenta } = productos

                const totalPorProducto = precioVenta * cantidad;
                return {
                    cantidad: String(cantidad),
                    nombreProducto, 
                    precioVenta: String(precioVenta),
                    totalPorProducto: String(totalPorProducto)
                }
            })
            const comprobante = `
                <!DOCTYPE html>
                <html>
                    <head>
                        <h2>COMPROBANTE DE VENTA</h2>
                        <body>
                            <p> NOMBRE CLIENTE: ${consumo?.clientes?.nombres.toUpperCase()} , ${consumo?.clientes?.apellidos.toUpperCase()}</p>
                            <p> NUMERO DOCUMENTO: ${consumo?.clientes?.nroDocumento}</p>
                            <p> FECHA EMISION: ${dayjs(consumo?.fechaHoraInicioConsumo).format('YYYY-MM-DD')}<p/>
                            <table class="default">
                                <tr>
                                    ${
                                        (keys.map(
                                            (key) => `<td> ${key.toUpperCase()} </td>\n`)
                                        ).toString().replaceAll(",", "")
                                    }
                                </tr>
                                ${
                                    (values.map((value) => {
                                        const vals = Object.values(value)
                                            return `<tr> ${vals.map((val) => `<td>${val.toUpperCase()}</td>\n`)}</tr>\n`
                                        })
                                    ).toString().replaceAll(",", "")
                                }
                            </table>
                            <p> TOTAL GENERAL: ${consumo?.total} </>
                        </body>
                    </head>
                </html>
            `
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            
            const outputPath = 
                path.join(__dirname, "..", "comprobantes", `${consumo.idCabecera}-comprobante.pdf`)
            await page.setContent(comprobante, { waitUntil: 'networkidle0' });
            await page.pdf({ path: outputPath, format: 'A4' });
            await browser.close();

            function readFileAsBase64(filePath) {
                return new Promise((resolve, reject) => {
                  fs.readFile(filePath, (error, data) => {
                    if (error) {
                      reject(error);
                    } else {
                      const base64Data = data.toString('base64');
                      resolve(base64Data);
                    }
                  });
                });
            }

            return await readFileAsBase64(outputPath);
        } catch (error) {
            log.error(error);
            throw error;  
        }
    }
}


module.exports = ConsumoService;