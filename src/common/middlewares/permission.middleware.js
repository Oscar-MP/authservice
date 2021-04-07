'use strict';

// Checks if the user has permissions to perform an action
const { ErrorHandler } = require('../helpers');

module.exports.required_permissions = ( level, sameUserCan ) => {
  return async (req, res, next ) => {
    if (!req.session) {
      next(new ErrorHandler('403', 'Session not invalid or not found!'))
    }

    var requester_access_level = parseInt(session.permission_level);

    if ( requester_access_level >= level ) {
      return next();
    }

    return res.status(403).send({
      message: `You don't have permissions to access this route`
    });
  }
}

// FALTA TERMINAR ESTE MIDDLEWARE
