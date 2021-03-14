'use strict'

const { ErrorHandler } = require('./error.js');

class Response {
  // A response class for success requests
  constructor() {
      this.status     = 200;
      this.message    = 'The request done successfully';
      this.totalCount = 0;
      this.data       = {};
  }

  send (res, message, data) {
    message = message || this.message;

    if (data) {
      this.data = data;
      this.totalCount = this.getItemsCount();
    }

    try {
      return res.status(200).json({
        message: message,
        data: data,
        totalCount: this.totalCount
      });
    } catch (e) {
      throw new ErrorHandler(500, 'Error trying to send the response', e);
    }
  }

  getItemsCount () {
    if (Array.isArray(this.data)) {
      return this.data.length;
    }

    if ( typeof this.data === 'object' ) {
      return 1;
    }

    return 0;
  }


}

module.exports = { Response: new Response() };
