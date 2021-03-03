'use strict'

const { ErrorHandler } = require('./error.js');

class Response {
  // A response class for success requests
  constructor() {
      this.status   = 200;
      this.message  = 'The request done successfully';
  }

  send (res, message, data) {
    message = message || this.message;

    try {
      return res.status(200).json({
        message: message,
        data: data
      });
    } catch (e) {
      throw new ErrorHandler(500, 'Error trying to send the response', e);
    }
  }


}

module.exports = { Response: new Response() };
