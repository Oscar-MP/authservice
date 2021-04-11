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
    var incoming_session  = SessionService.get(decoded_token.sessionId);
    var incoming_user     = UserService.get(decoded_token.userId);

    var session = await Promise.all([incoming_session, incoming_user]);

    const user = session[1];
    session = session[0];

    if ( !(session.userid == user.id && session.userid == decoded_token.userId) ) {
      // We will log this before verifying the token because this could mean that
      // the token has been modified by someone
      Logger.error(`The incoming token has been modified, someone might be trying to impersonate a user!`);
      return next(new ErrorHandler(401, 'Invalid token!'));
    }


  } catch (err) {
    next( ErrorHandler.stack(err, 'Could not get the token user session'));
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

    var token = Token.verify(req.token, session.token_secret);
    req.session = session.toJSON();
    req.user = user.toJSON();
    next();
  } catch ( err ) {

    if (err.name == 'TokenExpiredError') {
        return next(new ErrorHandler(400, 'The token has expired! You need to send the refresh token to renew it.'))
    }

    Logger.error('Could not verify the token', err);
    return next(ErrorHandler.stack(err, 'Could not verify the token'));
  }
}
