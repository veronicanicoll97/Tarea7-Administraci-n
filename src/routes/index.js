const { middlewareLog } = require('../middleware');
const cliente = require('./cliente');
const restaurante = require('./restaurante');
const mesa = require('./mesa');
const reserva = require('./reserva');

const apiRoutes = app => {
    app.use(middlewareLog);
    app.use('/clientes', cliente);
    app.use('/restaurantes', restaurante);
    app.use('/mesas', mesa);
    app.use('/reservas', reserva);
};

exports.apiRoutes = apiRoutes;
