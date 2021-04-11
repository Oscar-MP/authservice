'use strict'

const { ErrorHandler, Logger } = require('../helpers');
const Config = require('../../../config/config');
const SessionService = require('../../services/session.service');
const UserService = require('../../services/user.service');
const Token = require('../../models/token.model');

module.exports.catch_session = async (req, res, next) => {
  // Retrieves the token from the headers, then obtains the session related with that token
  // Verifies the token sign HMAC and once everything is checked appends the session information
  // to the request object
  const config = Config.getConfig();

  if (!config.use_session_auth) return next();

  if (config.use_tokens && !req.token) {
    // Something failed in the previous error propagation
    next(new ErrorHandler(400, `You don't have access to this API. Invalid token or not provided.`));
  }

  // Decode the token and verify
  var decoded_token = Token.getPayload(req.token);

  try {
    var incoming_session = await SessionService.get(decoded_token.sessionId);
  } catch (err) {
    next( ErrorHandler.stack(err, 'Could not get the token user session'));
  }

  if (incoming_session.userid != decoded_token.userId) {
    // We will log this before verifying the token because this could mean that
    // the token has been modified by someone
    Logger.error(`The incoming token has been modified, someone might be trying to impersonate a user!`);
    return next(new ErrorHandler(401, 'Invalid token!'));
  }

  if ( config.session_ip_address_validation ) {
    // IP VALIDATION
    const client_ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    if (!incoming_session.ip_address || (incoming_session.ip_address != client_ip)) {
      // We close the session and notify the user that somebody is trying to access his account.
      // But that's a future task, for now let's just don't let access to the resource
      return next(new ErrorHandler(403, 'Illegal use of the session'));
    }
  }

  try {
    var token = Token.verify(req.token, incoming_session.token_secret);
    req.session = incoming_session.toJSON();
    let user = await UserService.getById(incoming_session.userid);
    req.user = user.toJSON();
    console.log(req.user)
    next();
  } catch ( err ) {
    Logger.error('Could not verify the token', err);
    return next(ErrorHandler.stack(err, 'Could not verify the token'));
  }
}
