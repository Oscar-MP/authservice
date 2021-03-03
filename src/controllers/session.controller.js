'use strict'

const session_service = require('../services/session.service.js');
const { ErrorHandler }  = require('../common/helpers/error.js');
const { Logger }        = require('../common/helpers/logger.js');

module.exports.list_active_sessions = async (req, res, next) => {
  // Lists all active sessions.

  try {
    var sessions = await session_service.get_active_session();
  } catch (e) {
    Logger.error('Could not list sessions', e);
    next(e);
  }

  let message = !sessions ? 'No active sessions found' : 'The sessions have been listed';

  return res.status(200).send({
    message: message,
    data: sessions
  })

}
