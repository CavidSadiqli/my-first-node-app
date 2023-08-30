const ConsoleController = require('./console');

module.exports.SEND_ERROR = (request, response, next) => {
    response.status(404).render('error', {PageTitle: '404 Not Found'});
};