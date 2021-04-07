'use strict'
/**
 *  Autor: DonSleider
 *  Date: 20/03/21
 *  Desription: This file will contain the middleware for catching the token from the
 *              request header, verify that is a well-crafted token and append it into the request object
 */

const { ErrorHandler } = require('../helpers');
const { Utils } = require('../lib');

module.exports.catch_token = async (req, res, next) => {

  const authHeader = req.headers['authorization'];

  if ( !Utils.isEmpty(authHeader) && authHeader.split(' ')[0] === 'Bearer' ) {
    req.token = authHeader.split(' ')[1];
  } else if ( req.body.token ) {
    req.token = req.body.token;
  } else {
    return res.status(403).send({
      message: `You don't have permissions to access this route`
    });
  }

  // Once we have the token in the request we will check that is well crafted
  next();
}
