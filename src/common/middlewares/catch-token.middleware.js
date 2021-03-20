'use strict'
/**
 *  Autor: DonSleider
 *  Date: 20/03/21
 *  Desription: This file will contain the middleware for catching the token from the
 *              request header, verify that is a well-crafted token and append it into the request object
 */

const { ErrorHandler } = require('../helpers')

module.exports.catchToken = (req, res, next) => {

  const authheaders = req.headers;

  if (headers.startsWith("Bearer ")) {
    let token = headers.substring
  } else {
    return next(new ErrorHandler(401, `There is no authorization header set`));
  }
}
