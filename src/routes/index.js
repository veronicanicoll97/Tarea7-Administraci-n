const { middlewareLog } = require('../middleware');
const cliente = require('./cliente');
const restaurante = require('./restaurante');
const mesa = require('./mesa');
const reserva = require('./reserva');
const categoria = require('./categoria');
const producto = require('./producto');
const consumo = require('./consumo');

const apiRoutes = app => {
    app.use(middlewareLog);
    app.use('/clientes', cliente);
    app.use('/restaurantes', restaurante);
    app.use('/mesas', mesa);
    app.use('/reservas', reserva);
    app.use('/categorias', categoria);
    app.use('/productos', producto);
    app.use('/consumos', consumo);
};

exports.apiRoutes = apiRoutes;
