const { respuesta } = require('../utils');

class Respuesta {
    constructor(estado, mensaje, datos) {
        this.estado = estado;
        this.mensaje = mensaje;
        this.datos = datos;
    }

    toJson() {
        return {
            estado: respuesta[this.estado],
            mensaje: this.mensaje,
            datos: this.datos,
        };
    }
}

module.exports = Respuesta;
