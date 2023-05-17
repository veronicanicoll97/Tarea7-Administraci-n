class ErrorHandler extends Error {
    constructor(mensaje, detalle, extensiones) {
        super();
        this.mensaje = mensaje;
        this.detalle = detalle;
        this.extensiones = extensiones;
    }

    toJson() {
        return {
            mensaje: this.mensaje,
            detalle: this.detalle,
            extensiones: this.extensiones,
        };
    }

    toString() {
        return JSON.stringify({
            mensaje: this.mensaje,
            detalle: this.detalle,
            extensiones: this.extensiones,
        });
    }
}

module.exports = ErrorHandler;
