const dotenv = require('dotenv');
dotenv.config('.././.env');
const express = require('express');
const http = require('http');
require('./database').database;
const { log } = require('./log');
const { apiRoutes } = require('./routes');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(cors({origin: true}));

const puerto = process.env.PORT || 5000;
const server = http.createServer(app);
apiRoutes(app);

server.listen(puerto, () => {
    const logger = log;
    logger.info(`Servidor listo en http://localhost:${puerto}`);
});
