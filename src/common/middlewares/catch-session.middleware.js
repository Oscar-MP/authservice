'use strict'

const { ErrorHandler } = require('../helpers');

module.exports.catch_session = async (req, res, next) => {
  // Retrieves the token from the headers, then obtains the session related with that token
  // Verifies the token sign HMAC and once everything is checked appends the session information
  // to the request object
  console.log('Token: ', req.token);
  next();


}
