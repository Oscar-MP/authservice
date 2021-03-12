'use strict'

const ValidationError = require('mongoose').Error.ValidationError;

class ErrorHandler extends Error {
  constructor (status, message, params) {
    super();
    this.status     = status      || 500;
    this.name       = 'Unknown error';
    this.message    = message     || 'Unexpected error';
    this.stack      = [];
    this.print      = true;

    if ( params ) {

      if ( params instanceof ErrorHandler ) {
        this.stack.push(params.stack);
      } else {
        params.message  ? this.stack.push(params.message) : null;
      }

      this.name = params.errorName ? params.errorName : this.name;

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
    res.status(this.status).json({
      message: this.status !== 500 ? this.message : 'Internal Server Error!',
      code: this.status
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
    // THIS METHOD SHOULD BE CHANGED TO WORK WELL IN EVERY CASE
    const malformed_posible_params = [ '_id' ];

    // Checks if the error comes from the malformed _id
    if (error.path == '_id') return true;


  }
}

const HTTP_STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
}

module.exports =  { ErrorHandler };
