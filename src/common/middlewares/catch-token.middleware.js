'use strict'
/**
 *  Autor: DonSleider
 *  Date: 20/03/21
 *  Desription: This file will contain the middleware for catching the token from the
 *              request header, verify that is a well-crafted token and append it into the request object
 */

const { ErrorHandler } = require('../helpers');
const { Utils } = require('../lib');

const Config = require('../../../config/config');

module.exports.catch_token = async (req, res, next) => {

  if (!Config.getConfig().use_tokens) next();

  const authHeader = req.headers['authorization'];

  if ( !Utils.isEmpty(authHeader) && authHeader.toLowerCase().startsWith('bearer') ) {
    req.token = authHeader.split(' ')[1];
  } else if ( req.body.token ) {
    return res.status(400).send({
      message: `Token must be send via headers not in the content body`
    });
  } else {
    return res.status(403).send({
      message: `You don't have permissions to access this route`
    });
  }

  // Once we have the token in the request we will check that is well crafted
  next();
}
