'use strict';

// Checks if the user has permissions to perform an action
const { ErrorHandler } = require('../helpers');
const Config = require('../../../config/config');

module.exports.required_permissions = ( level, sameUserCanDoIt ) => {
  return async (req, res, next ) => {

    if (!Config.getConfig().use_session_auth) return next();

    if (!req.session) {
      next(new ErrorHandler('403', 'Session not invalid or not found!'))
    }
    
    var requester_access_level = parseInt(req.user.role.permissionLevel);

    if ( requester_access_level >= level ) {
      return next();
    }

    return res.status(403).send({
      message: `You don't have permissions to access this route`
    });
  }
}

// FALTA TERMINAR ESTE MIDDLEWARE
