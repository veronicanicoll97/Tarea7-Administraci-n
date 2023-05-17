const { middlewareLog } = require('../middleware');
const cliente = require('./cliente');
const restaurante = require('./restaurante');

const apiRoutes = app => {
    app.use(middlewareLog);
    app.use('/clientes', cliente);
    app.use('/restaurantes', restaurante);
};

exports.apiRoutes = apiRoutes;
