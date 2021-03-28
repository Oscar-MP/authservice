'use strict'

const ValidationError = require('mongoose').Error.ValidationError;
const { Utils } = require('../lib');
const { config } = require('../../../config/config.js').getConfig();
const { Logger } = require('.');

class ErrorHandler extends Error {
  constructor (status, message, params) {
    super();
    this.status     = status      || 500;
    this.name       = ErrorHandler.getErrorsName(this.status);
    this.message    = message;
    this.trace      = [];
    this.print      = true;

    if ( params ) {

      if (!message && !Utils.isEmpty(params.message)) {
        this.message = params.message;
      } else {
        this.message = 'Unexpected error!';
      }

      if ( params instanceof ErrorHandler ) {
        this.trace = params.trace;

        if ( this.message != params.message ) {
          this.trace.push(params.message);
        }

      } else {
        params.message  ? this.trace.push(params.message) : null;
      }

      // Temp fix for same vars with diff name
      if (!params.name) {
        this.name = params.errorName ? params.errorName : ErrorHandler.getErrorsName(this.status);
      } else {
        this.name = params.name;
      }

      if (!status) {
        let err_nature = ErrorHandler.checkErrorNature(params);

        if ( err_nature === 'client' ) {
          this.status = 400;
        }
      }

      if (params.print === false) this.print = false;
      if (params.nature) this.nature = params.nature;
    }
  }

  send ( res ) {
    // This method will terminate the HTTP connection by responding with the error
    res.status(this.status).send({
      message: this.status !== 500 ? this.message : 'Internal Server Error!',
      code: this.status,
      error: this.name
    });
  }

  printError() {
    // This function will print the error into the console depending on the verbose level

    if (!config.log_errors) return;
    Logger.info('hel')

  }

  static checkErrorNature ( error ) {

    if ( error instanceof ValidationError ) return 'client';
    if ( error.nature && error.nature === 'client' ) return error.nature;

    return 'server';
  }

  static handleMongoError (e, message) {

    var error;

    if ( ErrorHandler.checkErrorNature(e) == 'client' ) {
      error = new ErrorHandler(400, e._message, e);
    } else {
      error = new ErrorHandler(500, message, e)
    }

    return error;
  }

  static stack ( error, message ) {

    if (error instanceof ErrorHandler) {
      error.trace.push(error.message);
      error.message = message
      return error;
    }

    if (error && error.message) {
      error.message = message + '\n' + error.message;
      return error;
    }

    return error;

  }



  static isAClientError( error ) {
    // This method will be removed in next version
    return ErrorHandler.checkErrorNature() === 'client';


  }

  static getErrorsName ( statusCode ) {
    return HTTP_ERRORS[statusCode] ? HTTP_ERRORS[statusCode] : 'Unknown error';
  }
}

const HTTP_ERRORS = {
  400: 'Bad Request',
  401: 'Unauthorized',
  402: 'Payment Required',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  408: 'Request Timeout',
  500: 'Internal Server Error',
  501: 'Not Implemented',
  503: 'Service Unavaliable'
}
module.exports =  { ErrorHandler };
