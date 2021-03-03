'use strict'

class ErrorHandler extends Error {
  constructor (status, message) {
    super();
    this.status     = status      || 500;
    this.message    = message     || 'Unexpected error';

  }

  send ( res ) {
    // This method will terminate the HTTP connection by responding with the error
    res.status(this.status).json({
      message: this.status !== 500 ? this.message : 'Internal Server Error!',
      code: this.status
    });
  }

  static get_status_code_message ( code ) {

  }
}

class HTTP_Error extends ErrorHandler {
  constructor(status, message) {
    super(status, message);

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
