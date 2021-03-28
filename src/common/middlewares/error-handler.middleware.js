'use strict'
const { ErrorHandler, Logger } = require('../helpers');

var handleError = (err, req, res, next) => {
  // This is the centralized error handler for the API

  if (res.headersSent) {

    return next(err)
  }

  if ( !(err instanceof ErrorHandler) ) {
    console.log(err)
    let status  = err.status && err.status > 500 ? err.status : 500;
    let message = status < 500 && err.message ? err.message : 'Internal Server Error.';

    err = new ErrorHandler(status, message, err);
  }

  return err.send(res)
}

var logError = (err, req, res, next) => {
  // Logs every error

  if (err.print)
    Logger.error('An error has been intercepted by the controller', err);
  return next(err);
}

var errorNotificator = (err, req, res, next) => {
  // This function will notificate critical errors to the admin via email
}
module.exports = { handleError, logError, errorNotificator }
