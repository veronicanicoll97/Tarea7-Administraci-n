const { ConsumoService } = require('../service');
const { RespuestaModelo } = require('../model');


class ConsumoController {
    #consumo;
    constructor(){
        this.#consumo = new ConsumoService();
    }

    async verificarMesa(req, res) {
        let respuesta;
        try {
            const idMesa = Number(
                req.query.idMesa || req.params.idMesa
            )
            const mesaVerificada = await this.#consumo.verificarMesa(
                req.logger, idMesa
            )
            
            respuesta = new RespuestaModelo(
                'EXITO',
                'Mesa verificada.',
                mesaVerificada
            ).toJson();

            return res.json(respuesta);
        } catch (error) {
            respuesta = new RespuestaModelo(
                'NO_EXITO',
                'Error al verificar la mesa.',
                error
            ).toJson();

            res.json(respuesta);
        }
    }

    async insertarDetalle(req, res) {
        let respuesta;
        try {

            const detalle = await this.#consumo.detalleConsumo(
                req.logger, req.body
            )
            
            respuesta = new RespuestaModelo(
                'EXITO',
                'Detalle insertado.',
                detalle
            ).toJson();

            return res.json(respuesta);
        } catch (error) {
            respuesta = new RespuestaModelo(
                'NO_EXITO',
                'Error al insertar el detalle.',
                error
            ).toJson();

            res.json(respuesta);
        }
    }

    async cerrarMesa(req, res) {
        let respuesta;
        try {

            const detalle = await this.#consumo.cerrarMesa(
                req.logger, Number(req.query.idMesa || req.params.idMesa)
            );
            
            respuesta = new RespuestaModelo(
                'EXITO',
                'Mesa cerrada.',
                detalle
            ).toJson();

            return res.json(respuesta);
        } catch (error) {
            console.log(error);
            respuesta = new RespuestaModelo(
                'NO_EXITO',
                'Error al cerrar la mesa.',
                error
            ).toJson();

            res.json(respuesta);
        }
    }

    async getStringBase64(req, res) {
        let respuesta;
        try {
            const idCabecera = Number(
                req.query.idCabecera || req.params.idCabecera
            )
            const datos = await this.#consumo.generarBase64String(
                req.logger, idCabecera
            )
            
            respuesta = new RespuestaModelo(
                'EXITO',
                'String base64 del PDF.',
                datos
            ).toJson();

            return res.json(respuesta);
        } catch (error) {
            respuesta = new RespuestaModelo(
                'NO_EXITO',
                'Error al generar el string base64.',
                error
            ).toJson();

            res.json(respuesta);
        }
    }


    async verificarClienteCabecera(req, res) {
        let respuesta;
        try {

            const body = req.body;
            const datos = await this.#consumo.verificarClienteCabecera(
                req.logger, body.nroDocumento, 
                body.cliente, body.cabecera    
            )
            
            respuesta = new RespuestaModelo(
                'EXITO',
                'Datos verificados.',
                datos
            ).toJson();

            return res.json(respuesta);
        } catch (error) {
            console.log(error)
            respuesta = new RespuestaModelo(
                'NO_EXITO',
                'Error al verificar los datos.',
                error
            ).toJson();

            res.json(respuesta);
        }
    }
}


module.exports = ConsumoController;