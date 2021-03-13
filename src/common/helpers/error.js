'use strict'

const ValidationError = require('mongoose').Error.ValidationError;

class ErrorHandler extends Error {
  constructor (status, message, params) {
    super();
    this.status     = status      || 500;
    this.name       = ErrorHandler.getErrorsName(this.status);
    this.message    = message     || 'Unexpected error';
    this.stack      = [];
    this.print      = true;

    if ( params ) {

      if ( params instanceof ErrorHandler ) {
        this.stack.push(params.stack);
      } else {
        params.message  ? this.stack.push(params.message) : null;
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

    }
  }

  send ( res ) {
    // This method will terminate the HTTP connection by responding with the error
    console.log('hey, sup: ', this)
    res.status(this.status).send({
      message: this.status !== 500 ? this.message : 'Internal Server Error!',
      code: this.status,
      error: this.name
    });
  }

  static checkErrorNature ( error ) {
    if ( error instanceof ValidationError ) return 'client';

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
      error.stack.push(message);
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
