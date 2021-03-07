'use strict'
var { ErrorHandler } = require('../helpers/error.js');
var { Logger } = require('../helpers/logger.js');


var handleError = (err, req, res, next) => {
  // This is the centralized error handler for the API

  if (res.headersSent) {
    return next(err)
  }

  if (err instanceof ErrorHandler ) {
    return err.send(res);
  } else {

    let message = err.status >= 500 || !err.status ? 'Internal Server Error!' : (err.message || err._message) || 'Unexpected error happened!';
    return res.status( err.status ? err.status : 500).send({
      message: message
    });
  }
}

var logError = (err, req, res, next) => {
  // Logs every error
  Logger.error('An error has been intercepted by the controller');

  return next(err);
}

var errorNotificator = (err, req, res, next) => {
  // This function will notificate critical errors to the admin via email
}
module.exports = { handleError, logError, errorNotificator }
