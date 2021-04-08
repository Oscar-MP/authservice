'use strict'

const { ErrorHandler } = require('../helpers');
const { Token } = require('../../models/token.model');

module.exports.catch_session = async (req, res, next) => {
  // Retrieves the token from the headers, then obtains the session related with that token
  // Verifies the token sign HMAC and once everything is checked appends the session information
  // to the request object
  if (!req.token) {
    // Something failed in the previous error propagation
    next(new ErrorHandler(400, `You don't have access to this API. Invalid token or not provided.`));
  }

  // Decode the token and verify


  next();


}
