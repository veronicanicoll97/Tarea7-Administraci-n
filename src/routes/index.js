const { middlewareLog } = require('../middleware');
const cliente = require('./cliente');

const apiRoutes = app => {
    app.use(middlewareLog);
    app.use('/clientes', cliente);
};

exports.apiRoutes = apiRoutes;
