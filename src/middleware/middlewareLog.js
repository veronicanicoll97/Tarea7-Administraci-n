const { log } = require('../log');

module.exports = (req, res, next) => {
    req.logger = log;
    next();
};
